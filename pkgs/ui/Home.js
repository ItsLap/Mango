export default {
  name: "Home",
  ver: 0.1, // Compatible with Kernel 0.1
  type: "process",
  privs: 1,
  run: async function (Root) {
    console.log("starting");
    let Html = await Root.lib.launchLib("Html");
    Html = Html.html;
    let wrapper = new Html("div")
      .class("login")
      .style({
        "backdrop-filter": "blur(0.3vmax)",
        "background-color": "rgba(0,0,0, 0.72)",
        height: "100%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "flex-direction": "column",
      })
      .appendTo("body");

    console.log(Root);
  },
  onEnd: async function (Lib) {
    // Cleanup elements you might have created
    console.log("ending");
    console.log(Lib);
  },
};
