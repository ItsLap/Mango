"use strict";

(async () => {
  let kernelExtensions = ["windowsystem"];

  const ProcLib = {
    findEmptyPID: async function () {
      let r = Kernel.processList.findIndex((p) => p === null);
      return r !== -1 ? r : Kernel.processList.length;
    },
    cleanupProcess: async function (pid) {
      let proc = Kernel.processList
        .filter((p) => p !== null)
        .find((p) => p.pid === pid);
      console.group("Process cleanup (" + pid, proc.name + ")");
      console.debug(
        `%cProcess ${proc.name} (${proc.pid}) was ended.`,
        "color:green;font-weight:bold"
      );
      console.groupEnd();
      Kernel.processList[pid] = null;
    },
  };

  const Kernel = {
    version: 0.16,
    processList: [],

    async loadKernelExtension(url) {
      // ONLY USE "loadKernelExtension" for extensions and not normal apps as it provides 100% control to the system!!!
      oute.info("loading kernel extension " + url);
      let script = document.createElement("script");
      script.src = "/src/" + url;
      document.body.appendChild(script);
      oute.info("loaded " + url);
    },
    async init() {
      for (let i = 0; i < kernelExtensions.length; i++) {
        await this.loadKernelExtension(kernelExtensions[i] + ".js");
      }
    },

    pkg: {
      async run(app) {
        // Converts package string to url that is loadable
        if (typeof app == "string") {
          let subAppType = app.split(":")[0];
          let appName = app.split(":")[1];
          let url = `/pkgs/${subAppType}/${appName}.js`;
          await this.startPkgFromURL(url);
          return true;
        } else {
          return false;
        }
      },

      async startPkgFromURL(url) {
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
              // Get avaliable PID
              let appPid = await ProcLib.findEmptyPID();

              // Mount the process on the process list
              Kernel.processList[appPid] = {
                end: () => {
                  pkg.onEnd();
                  ProcLib.cleanupProcess(appPid);
                },
              };

              // General library attached to processes
              let AppLib = {
                info: {
                  kernelVersion: Kernel.version,
                },
                proc: Kernel.processList[appPid],
                pid: appPid,
              };

              // Run the package
              await pkg.run(AppLib);
            } else {
              oute.error(
                "Package may not contain sufficient details for app to run."
              );
            }
          } else if (pkg.ver > Kernel.version) {
            oute.warn(
              "Package is too new for Kernel Version, Please update or contact the app publisher."
            );
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
