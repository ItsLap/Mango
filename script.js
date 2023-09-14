"use strict";

(async () => {
  let kernelExtensions = ["windowsystem"];

  const SecurityLib = {
    // async ConfirmLaunch() {

    // },

    // async ConfirmAdmin() {

    // },

    async CheckPrivs(pkg, pkgtype) {
      let allowedPkgs = ["system", "ui"];
      let SHA256 = new Hashes.SHA256();
      if (allowedPkgs.includes(pkgtype)) {
        return "privs";
      } else {
        let launchPkg = confirm("Launch Package");
        console.log(launchPkg);
        if (launchPkg) {
          let launchPkgPrivs = confirm("Launch Package with Privileges?");
          if (launchPkgPrivs) {
            if (
              localStorage.getItem("kernelPassword") === null ||
              !localStorage.getItem("kernelPassword")
            ) {
              SecurityLib.SetPassword(
                prompt("Please enter your Kernel Password you want to save.")
              );
            }
            let passPrompt = prompt(
              "Please enter your Kernel Password to run the package with privledges"
            );
            if (
              SHA256.hex(passPrompt) == localStorage.getItem("kernelPassword")
            ) {
              return "privs";
            } else {
              return false;
            }
          } else {
            return "noPrivs";
          }
        } else {
          return false;
        }
      }
    },
    async SetPassword(pass) {
      let SHA256 = new Hashes.SHA256();
      let hash = SHA256.hex(pass);
      localStorage.setItem("kernelPassword", hash);
    },
  };

  const ProcLib = {
    findEmptyPID: async function () {
      let r = Kernel.processList.findIndex((p) => p === null);
      return r !== -1 ? r : Kernel.processList.length;
    },

    cleanupProcess: async function (pid) {
      let proc = Kernel.processList
        .filter((p) => p !== null)
        .find((p) => p.pid === pid);
      console.log(proc);
      console.group("Process cleanup (" + pid + ")");
      console.debug(
        `%cProcess ${proc.proc.name} (${proc.pid}) was ended.`,
        "color:green;font-weight:bold"
      );
      console.groupEnd();
      Kernel.processList[pid] = null;
    },
  };

  const appLib = {
    async launchApp(app) {
      await Kernel.pkg.run("apps:" + app);
    },
    async launchLib(app) {
      return await Kernel.pkg.run("lib:" + app);
    },
  };

  const Kernel = {
    version: 0.16,
    processList: [],

    async loadKernelExtension(url) {
      // ONLY USE "loadKernelExtension" for extensions and not normal apps as it provides 100% control to the system!!!
      oute.info("loading kernel extension " + url);
      let script = document.createElement("script");
      script.src = "./src/" + url;
      document.body.appendChild(script);
      oute.info("loaded " + url);
    },
    async init() {
      for (let i = 0; i < kernelExtensions.length; i++) {
        await this.loadKernelExtension(kernelExtensions[i] + ".js");
      }
    },

    pkg: {
      async run(app, CheckPrivs = false) {
        // Converts package string to url that is loadable
        if (typeof app == "string") {
          let subAppType = app.split(":")[0];
          let appName = app.split(":")[1];
          let url = `./pkgs/${subAppType}/${appName}.js`;
          let thepkg = await this.startPkgFromURL(url, subAppType, CheckPrivs);
          return thepkg;
        } else {
          return false;
        }
      },

      async startPkgFromURL(url, appType = undefined, CheckPrivs = false) {
        let pkg;
        try {
          // Import Package

          pkg = await import(url);

          if (!pkg.default)
            throw new Error('No "default" specified in package');
          pkg = pkg.default;

          console.log(pkg.ver, Kernel.version);

          if (pkg.ver <= Kernel.version) {
            if (pkg.type === "process" && typeof pkg.run === "function") {
              let check;
              if (CheckPrivs == false) {
                check = await SecurityLib.CheckPrivs(pkg, appType);
              } else {
                check = CheckPrivs;
              }
              if (check == "privs") {
                oute.info("Allow package privileges");
                // Get avaliable PID
                let appPid = await ProcLib.findEmptyPID();

                // Mount the process on the process list
                Kernel.processList[appPid] = {
                  appType,
                  pid: appPid,
                  proc: {
                    name: pkg.name,
                    end: () => {
                      pkg.onEnd();
                      ProcLib.cleanupProcess(appPid);
                    },
                  },
                };

                // General library attached to processes
                let PrivAppLib = {
                  info: {
                    kernelVersion: Kernel.version,
                  },
                  proc: Kernel.processList[appPid],
                  pid: appPid,
                  processList: Kernel.processList,
                  lib: appLib,
                  kernel: Kernel,
                  // other privleged functions / variables
                };

                // Run the package
                await pkg.run(PrivAppLib);
              } else if (check == "noPrivs") {
                oute.info("Denied package privileges");
                // Get avaliable PID
                let appPid = await ProcLib.findEmptyPID();

                // Mount the process on the process list
                Kernel.processList[appPid] = {
                  appType,
                  proc: {
                    name: pkg.name,
                    pid: appPid,
                    end: () => {
                      pkg.onEnd();
                      ProcLib.cleanupProcess(appPid);
                    },
                  },
                };

                // General library attached to processes
                let NoPrivAppLib = {
                  info: {
                    kernelVersion: Kernel.version,
                  },
                  proc: Kernel.processList[appPid],
                  pid: appPid,
                  lib: appLib,
                };

                // Run the package
                await pkg.run(NoPrivAppLib);
              } else {
                // Package doesnt run
                oute.error("User denied package run");
              }
            } else if (pkg.type === "library" && typeof pkg.lib === "object") {
              if (pkg.init && typeof pkg.init === "function") {
                await pkg.init(appLib);
              }
              return pkg.lib;
            } else {
              oute.error(
                "Package may not contain sufficient details for app to run."
              );
              return false;
            }
          } else if (pkg.ver > Kernel.version) {
            oute.warn(
              "Package is too new for Kernel Version, Please update or contact the app publisher."
            );
            return false;
          }
        } catch (e) {
          console.group("App Error");
          oute.error("Package does not exist!");
          oute.error(e.stack);
          oute.error(e);
          console.groupEnd();
          return false;
        }
      },
    },
  };
  window.Kernel = Kernel;
  await Kernel.init().then(async () => {
    await Kernel.pkg.run("system:BootMan");
  });
})();
