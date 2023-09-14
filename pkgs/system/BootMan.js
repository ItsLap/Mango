let services = [];

let bootApps = [];

export default {
  name: "Boot Manager",
  ver: 0.1, // Compatible with Kernel 0.1
  type: "process",
  run: async function (Lib) {
    console.log(Lib);
    oute.info("Starting Mango Boot Manager");
    let Html = Lib.lib.launchLib("Html");
    let Kernel = Lib.kernel;

    let bsp = await Kernel.pkg.run("ui:BootScreen");
    let bs = await bsp.loader();
    await Lib.kernel.pkg.run("ui:Login");

    await bs.cleanup();

    function el() {
      document.documentElement.requestFullscreen();
      document.body.removeEventListener("click", el);
    }

    document.body.addEventListener("click", el);

    window.bs = bs;
  },
  onEnd: async function (Lib) {},
};
