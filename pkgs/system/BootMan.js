export default {
  name: 'Boot Manager',
  ver: 1, // Compatible with Kernel 0.1
  type: 'process',
  run: async function(Lib) {
    console.log(Lib)
  },
  onEnd: async function(Lib) {

  }
}