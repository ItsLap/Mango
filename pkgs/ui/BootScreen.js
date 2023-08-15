let Html;

export default {
  name: "Loading Screen",
  ver: 0.1, // Compatible with Kernel 0.1
  type: "library",
  init: async function (l) {
    let HtmlLib = await l.launchLib("Html");
    Html = HtmlLib.html;
  },

  lib: {
    loader() {
      const x = new Html("div")
        .html('<div class="logo">mango</div><span>loading...</span>')
        .class("loading-screen")
        .appendTo("body");

      return x;
    },
  },
};
