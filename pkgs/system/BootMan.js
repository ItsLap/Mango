let services = []

let bootApps = []

let main = (Lib) => {
  console.log("hi")
}

export default {
  name: 'Boot Manager',
  ver: 0.1, // Compatible with Kernel 0.1
  type: 'process',
  run: main,
  onEnd: async function(Lib) {

  }
}