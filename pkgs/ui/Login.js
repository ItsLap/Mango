export default {
  name: "Login",
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
        "backdrop-filter": "blur(1vmax)",
        "background-color": "rgba(0,0,0, 0.72)",
        height: "100%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "flex-direction": "column",
        gap: "45%",
      })
      .on("click", async function (e) {
        await Root.kernel.pkg.run("ui:Home", "privs");
        Root.kernel.processList[Root.pid].proc.end();
        this.remove();
      })
      .appendTo("body");

    let h1 = new Html("h1")
      .style({
        "font-weight": "300",
        "font-size": "6vmax",
        margin: 0,
      })
      .text("12:54")
      .appendTo(wrapper);

    let h2 = new Html("h2")
      .style({
        "font-weight": "300",
        "font-size": "1.5vmax",
        margin: 0,
      })
      .text("Saturday, 31 October")
      .appendTo(wrapper);

    let div = new Html("div")
      .style({
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "flex-direction": "column",
        gap: "0.75vmax",
      })
      .appendMany(h1, h2)
      .appendTo(wrapper);

    let svg = new Html("span")
      .html(
        `<svg width="66" height="72" viewBox="0 0 66 72" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.8334 32.875V20.0417C16.8334 15.7872 18.5235 11.7069 21.5319 8.6985C24.5403 5.6901 28.6205 4 32.875 4C37.1296 4 41.2098 5.6901 44.2182 8.6985C47.2266 11.7069 48.9167 15.7872 48.9167 20.0417V32.875M10.4167 32.875H55.3333C58.8772 32.875 61.75 35.7478 61.75 39.2917V61.75C61.75 65.2938 58.8772 68.1667 55.3333 68.1667H10.4167C6.87284 68.1667 4 65.2938 4 61.75V39.2917C4 35.7478 6.87284 32.875 10.4167 32.875Z" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      )
      .style({
        width: "3vmax",
        height: "3vmax",
      })
      .appendTo(wrapper);

    svg.elm.querySelector("svg").style.width = "3vmax";
    svg.elm.querySelector("svg").style.height = "3vmax";

    // let previousX = 0,
    //   previousY = 0;

    // setInterval(() => {
    //   const top = Math.random() * (Math.random() * 50);
    //   const left = Math.random() * (Math.random() * 100);
    //   h1.style({
    //     position: "fixed",
    //     top: top + "vmax",
    //     left: left + "vmax",
    //   }).html(
    //     Math.abs(top) >= Math.abs(previousY) ? "YES" : "No"
    //     // Math.abs(left) >= Math.abs(previousX)
    //     // ? "weeee"
    //     // : Math.abs(top) >= Math.abs(previousY)
    //     // ? "weee"
    //     // : Math.abs(left) >= Math.abs(previousX)
    //     // ? "wait where are we going"
    //     // : "WAIT"
    //   );
    //   previousY = top * 1;
    //   previousX = left * 1;
    // }, 1000);

    /*
    
    function loop() {
    requestAnimationFrame(loop);
    }

    */

    console.log(Root);
  },
  onEnd: async function (Lib) {
    // Cleanup elements you might have created
    console.log("ending");
    console.log(Lib);
  },
};
