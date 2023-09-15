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
      .class("home")
      .style({
        "backdrop-filter": "blur(0.3vmax)",
        "background-color": "rgba(0,0,0, 0.72)",
        height: "100%",
        display: "flex",
        // "justify-content": "center",
        "align-items": "center",
        "flex-direction": "column",
      })
      .appendTo("body");
    let appMounter = new Html("div")
      .class("app-mounter")
      .style({
        display: "flex",
        width: "100%",
        height: "calc(100% - calc(4vmax + 53px))",
      })
      .appendTo(wrapper);
    let dock = new Html("div")
      .class("dock")
      .style({
        display: "flex",
        "flex-direction": "row",
        gap: "10px",
        "justify-content": "space-between",
        "align-items": "center",
        "max-width": "700px",
        width: "90%",
        height: "53px",
        "border-radius": "10px",
        border: "1px solid #fff2",
        "background-color": "#0009",
        "backdrop-filter": "blur(10px)",
        "-webkit-backdrop-filter": "blur(10px)",
        position: "fixed",
        bottom: "2vmax",
        "z-index": "999",
      })
      .appendTo(wrapper);

    new Html("div")
      .class("start-button")
      .style({
        width: "43px",
        height: "43px",
        "border-radius": "10px",
        "background-color": "#909090",
        "background-color": "#0009",
        "backdrop-filter": "blur(10px)",
        "-webkit-backdrop-filter": "blur(10px)",
        border: "1px solid #fff2",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "margin-left": "5px",
      })
      .html(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-home"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
      )
      .appendTo(dock);

    let startButton = new Html("div")
      .class("start-button")
      .style({
        width: "43px",
        height: "43px",
        "border-radius": "10px",
        "background-color": "#909090",
        "background-color": "#0009",
        "backdrop-filter": "blur(10px)",
        "-webkit-backdrop-filter": "blur(10px)",
        border: "1px solid #fff2",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      })
      .html(
        `
        <svg width="30" height="30" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M169 56.0634C170 62.0634 177 68.5634 186 75.0634" stroke="white" stroke-width="5"/><path d="M160.5 49.0634L151.5 60.5634" stroke="white" stroke-width="5"/><path d="M167.5 48.5634L182.231 38.4623C184.072 37.1994 186.039 36.1182 188.091 35.2385V35.2385C190.683 34.1279 193.409 33.3409 196.194 32.9012V32.9012C199.709 32.3461 203.291 32.3461 206.806 32.9012L207.049 32.9395C209.675 33.3541 212.246 34.0616 214.714 35.0489L223.5 38.5634L241.5 48.0634V48.0634C248.367 51.6074 248.795 61.2664 242.269 65.4047L236.5 69.0634L221.5 77.0634L217.194 78.7037C213.085 80.2692 208.778 81.2566 204.396 81.6376L203.192 81.7423C200.737 81.9558 198.267 81.9154 195.82 81.6218L195.008 81.5243C189.749 80.8932 184.724 78.9873 180.368 75.9723V75.9723C176.181 73.0735 171.372 71.1984 166.328 70.4978L156 69.0634" stroke="white" stroke-width="14"/><path d="M11.0608 200.079L13.6182 195.135C15.533 191.433 17.8698 187.965 20.5821 184.801L23.159 181.795C24.7149 179.979 26.0645 177.997 27.1831 175.884C29.045 172.367 30.2413 168.537 30.7117 164.585L32.5 149.563L37.5 126.563L42.954 110.201C44.642 105.137 47.0715 100.352 50.1632 96.0003L54.8454 89.4105C57.603 85.5295 60.8618 82.0301 64.537 79.0035L69.8602 74.6197C73.9314 71.2669 78.4719 68.5286 83.3369 66.4921L90.7477 63.3899C95.2288 61.5141 99.9424 60.2516 104.761 59.6364L111.899 58.7252C117.923 57.9562 124.034 58.2089 129.974 59.4728L136.387 60.8373C141.764 61.9813 146.935 63.9396 151.721 66.6446L159.984 71.3153C164.963 74.1295 169.463 77.7167 173.317 81.943L178.177 87.2738C181.378 90.7848 184.102 94.703 186.278 98.9268L187.45 101.201C190.132 106.408 191.949 112.016 192.831 117.807L193.736 123.755C194.574 129.261 194.555 134.863 193.68 140.363L192.926 145.099C191.982 151.034 190.054 156.769 187.221 162.069L179.065 177.329C177.029 181.138 174.543 184.689 171.662 187.906L154.5 207.063L138.621 220.957C135.881 223.355 132.905 225.47 129.739 227.269L116.802 234.619C113.94 236.245 110.935 237.606 107.825 238.685L93.8402 243.537C89.9594 244.884 85.9377 245.783 81.853 246.217L64.5 248.063H49.8606C44.9761 248.063 40.1142 247.401 35.4079 246.093L31.0732 244.889C26.7349 243.684 22.6814 241.624 19.1512 238.829L18.1724 238.054C14.4487 235.106 11.5118 231.283 9.62337 226.925C7.26541 221.484 6.6448 215.447 7.84633 209.639L8.09118 208.456C8.69422 205.541 9.69338 202.723 11.0608 200.079Z" stroke="white" stroke-width="14"/><path d="M156.241 51.8224L155.607 52.4566C152.516 55.5478 153.176 60.7257 156.944 62.9423C157.642 63.353 158.409 63.6333 159.208 63.7696L169.729 65.5659C172.677 66.0693 174.631 62.5994 172.672 60.3392C172.235 59.8348 171.968 59.2059 171.907 58.5412L171.731 56.6082C171.58 54.9432 171.885 53.2683 172.613 51.7633L176.731 43.2528C178.238 40.1378 179.366 36.8533 180.092 33.4696L180.5 31.5635L181.5 26.5635L182.5 22.5635L183.5 17.5635L183.844 16.0176C184.28 14.0541 184.5 12.0487 184.5 10.0372V7.14459C184.5 6.09735 184.331 5.05696 184 4.06345C183.729 3.44055 182.593 2.08446 182.5 2.06336C182.45 2.05189 182.274 1.9628 182.061 1.8525C181.688 1.65886 181.311 1.4696 180.918 1.31952C180.614 1.20335 180.254 1.08497 180 1.06345C178.952 0.984178 178.393 0.973682 177.5 1.06345C176.695 1.16641 176.218 1.34967 175.708 1.63496C175.228 1.90354 174.804 2.25983 174.415 2.64875C173.489 3.57446 172.832 4.73435 172.515 6.00441L172.5 6.06345L171.5 12.0635L170 20.5635L167.5 29.0635L163.5 39.0634L157.511 50.1197C157.172 50.7456 156.744 51.3191 156.241 51.8224Z" fill="white" stroke="white"/></svg>
      `
      )
      .on("click", (e) => {
        let opacity = startMenu.elm.style.opacity;
        if (opacity == "1") {
          startMenu.elm.classList.remove("opening");
          opacity = "0";
          startMenu.elm.classList.add("closing");
        } else {
          startMenu.elm.classList.remove("closing");
          opacity = "1";
          startMenu.elm.classList.add("opening");
        }
        startMenu.elm.style.opacity = opacity;
      })
      .appendTo(dock);

    new Html("div")
      .class("start-button")
      .style({
        width: "43px",
        height: "43px",
        "border-radius": "10px",
        "background-color": "#909090",
        "background-color": "#0009",
        "backdrop-filter": "blur(10px)",
        "-webkit-backdrop-filter": "blur(10px)",
        border: "1px solid #fff2",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
        "margin-right": "5px",
      })
      .html(
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-undo-2"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>`
      )
      .appendTo(dock);

    let startMenu = new Html("div")
      .class("start-menu")
      .style({
        display: "flex",
        "max-width": "600px",
        width: "90%",
        height: "50%",
        "border-radius": "10px",
        "background-color": "#909090",
        "background-color": "#0009",
        "backdrop-filter": "blur(10px)",
        "-webkit-backdrop-filter": "blur(10px)",
        border: "1px solid #fff2",
        "flex-direction": "column",
        "align-items": "center",
        position: "fixed",
        bottom: "calc(2vmax + 60px)",
        opacity: "0",
        transition: "all 0.4s cubic-bezier(0.33, 1, 0.68, 1)",
      })
      .appendTo(wrapper);
    let userCard = new Html("div")
      .class("user-card")
      .style({
        width: "90%",
        height: "25%",
        display: "flex",
        gap: "10px",
        padding: "0px 20px",
        "justify-content": "space-between",
        "align-items": "center",
        "flex-direction": "row",
      })
      .appendMany(
        new Html("div")
          .style({
            width: "max-content",
            height: "100%",
            display: "flex",
            "justify-content": "center",
            "align-items": "center",
            "flex-direction": "row",
            gap: "10px",
          })
          .appendMany(
            new Html("img")
              .attr({ src: "https://placekitten.com/200/200" })
              .style({
                height: "50%",
                "border-radius": "50%",
              }),
            new Html("span").text("Mango User").style({ "font-size": "medium" })
          ),

        new Html("span").html(
          `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>`
        )
      )
      .appendTo(startMenu);

    let appList = new Html("div")
      .style({
        width: "90%",
        height: "90%",
        display: "flex",
        gap: "10px",
        "justify-content": "left",
        "align-items": "top",
        "flex-direction": "column",
      })
      .html(`<p style="margin:0">Apps</p>`)
      .appendMany(
        new Html("div")
          .class("apps-grid")
          .style({
            display: "flex",
            "flex-direction": "row",
            width: "100%",
            height: "max-content",
            "flex-wrap": "wrap",
          })
          .appendMany(
            new Html("div")
              .class("app")
              .style({
                width: "70px",
                height: "70px",
                "background-color": "#5efe5e",
                "border-radius": "10px",
              })
              .on("click", (e) => {
                Root.kernel.pkg.run("apps:TestVisualApp");
              })
          )
      )
      .appendTo(startMenu);
    console.log(Root);
  },
  onEnd: async function (Lib) {
    // Cleanup elements you might have created
    console.log("ending");
    console.log(Lib);
  },
};
