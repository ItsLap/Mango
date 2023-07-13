let mouseX = 0;
let mouseY = 0;
let mouseDown = false;
let winRef = null;
var savedWindowedDimensions = []

class WsWindow {
  constructor(options) {
    if (options === undefined) {
      options = {};
    }
    this.options = options;
    if (!this.options.id) {
      this.options.id = "ws-window-" + Math.floor(Math.random() * 100000);
    }
    if (!this.options.width) {
      this.options.width = 300;
    }
    if (!this.options.height) {
      this.options.height = 200;
    }
    if (!this.options.title) {
      this.options.title = "Window";
    }
    if (!this.options.content) {
      this.options.content = "This is my content";
    }
    if (!this.options.left) {
      this.options.left = 0;
    }
    if (!this.options.top) {
      this.options.top = 0;
    }
    if (!this.options.parent) {
      this.options.parent = "body";
    }
    this.maximized = 0;
    this.minimized
    this.init();
  }

  init() {
    this.createWindow();
    this.bindEvent();
  }

  createWindow() {
    // clone the #wsTemplate and append to body
    let template = document.querySelector("#wsTemplate").content;
    let clone = document.importNode(template, true);
    let window = clone.querySelector(".ws-window");

    window.id = this.options.id;
    window.style.width = this.options.width + "px";
    window.style.height = this.options.height + "px";
    window.style.left = this.options.left + "px";
    window.style.top = this.options.top + "px";

    let titlebar = window.querySelector(".ws-titlebar .title");
    titlebar.innerHTML = this.options.title;

    let content = window.querySelector(".ws-content");
    content.innerHTML = this.options.content;

    this.window = window;

    document.querySelector(this.options.parent).appendChild(window);
  }

  bindEvent() {
    this.window.querySelector(".ws-maximize").addEventListener("click", () => {
      this.maximize();
    });
    this.window.querySelector(".ws-minimize").addEventListener("click", () => {
      this.minimize();
    });
    this.window.querySelector(".ws-close").addEventListener("click", () => {
      this.close();
    });
  }

  resize(width, height) {
    this.window.style.width = width + "px";
    this.options.width = width

    this.window.style.height = height + "px";
    this.options.height = height
  }

  move(x, y) {
    this.window.style.left = x + "px";
    this.options.left = x

    this.window.style.top = y + "px";
    this.options.top = y

  }

  maximize() {
    savedWindowedDimensions = [this.window.style.width, this.window.style.height, this.window.style.top, this.window.style.left]
    this.window.style.width = "100%";
    this.options.width = "100%"
    this.window.style.height = "100%";
    this.options.height = "100%"
    this.window.style.left = "0";
    this.options.left = "0"
    this.window.style.top = "0";
    this.options.top = "0"
  }

  minimize() {
    this.window.style.width = savedWindowedDimensions[0];
    this.options.width = savedWindowedDimensions[0]

    this.window.style.height = savedWindowedDimensions[1];
    this.options.height = savedWindowedDimensions[1]

    this.window.style.top = savedWindowedDimensions[2];
    this.options.top = savedWindowedDimensions[2]

    this.window.style.left = savedWindowedDimensions[3];
    this.options.left = savedWindowedDimensions[3]


  }

  close() {
    this.window.remove();
  }
}

document.addEventListener("mousedown", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  var x = document.elementFromPoint(mouseX, mouseY).closest(".title");
  if (x === null) {
    return;
  }
  x = x.parentElement.parentElement;
  document.querySelectorAll(".ws-window").forEach((i) => {
    if (Number(i.style.zIndex) >= Number(x.style.zIndex)) {
      console.log(i.style.zIndex);
      x.style.zIndex = Number(i.style.zIndex) + 1;
    }
  });
  x.style.zIndex = Number(x.style.zIndex) + 1;
  x.classList.add("dragging")
  mouseDown = true;
  winRef = x;
});

document.addEventListener("mouseup", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  var x = document.elementFromPoint(mouseX, mouseY).closest(".title");
  if (x === null) {
    return;
  }
  x = x.parentElement.parentElement;
  x.classList.remove("dragging")
  mouseDown = false;
  winRef = null;
});

document.addEventListener("mousemove", (e) => {
  if (winRef !== null) {
    if (mouseDown) {
      let x = e.clientX;
      let y = e.clientY;
      let dx = x - mouseX;
      let dy = y - mouseY;
      winRef.style.left = parseInt(winRef.style.left) + dx + "px";
      winRef.style.top = parseInt(winRef.style.top) + dy + "px";
      mouseX = x;
      mouseY = y;
      if (winRef.style.left < 0) {
        winRef.style.left = 0;
      }
      if (winRef.style.top < 0) {
        winRef.style.top = 0;
      }
    }
  }
});
