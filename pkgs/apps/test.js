export default {
  name: "Test",
  ver: 0.1, // Compatible with Kernel 0.1
  type: "process",
  privs: 1,
  run: async function (Lib) {
    console.log("starting");
    console.log(Lib);
  },
  onEnd: async function (Lib) {
    // Cleanup elements you might have created
    console.log("ending");
    console.log(Lib);
  },
};
