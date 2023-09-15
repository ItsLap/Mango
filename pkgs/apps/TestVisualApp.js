let wrapper;

export default {
  name: "Test",
  ver: 0.1, // Compatible with Kernel 0.1
  type: "process",
  privs: 0,
  run: async function (Root) {
    let Html = await Root.lib.launchLib("Html");
    Html = Html.html;
    wrapper = new Html("div")
      .style({
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        width: "100%",
        height: "100%",
      })
      //   .style({ "background-color": "blue", width: "100%", height: "100%" })
      .html("<h1>Hello World</h1>")
      .appendTo(".app-mounter");
  },
  onEnd: async function (Lib) {
    wrapper.cleanup();
  },
};
