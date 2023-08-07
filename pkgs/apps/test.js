export default {
  name: 'Test',
  ver: 0.1, // Compatible with Kernel 0.1
  type: 'process',
  run: async function(Lib) {
    console.log(Lib)
  },
  onEnd: async function(Lib) {
    // Cleanup elements you might have created
    console.log(Lib)
  }
}