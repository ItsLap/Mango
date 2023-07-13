// Output Text (OuTe)
// for mango

let oute = {
  log(text) {
    console.log(`%cMango %clog %c${text}`,'color: #ff8242;','text-transform:uppercase; color: #ff33dd', 'color:auto')
  },
  warn(text) {
    console.log(`%cMango %cwarn %c${text}`,'color: #ff8242;','text-transform:uppercase; color: #f67b00', 'color:auto')
  },
  info(text) {
    console.log(`%cMango %cinfo %c${text}`,'color: #ff8242;','text-transform:uppercase; color: #3f66dc', 'color:auto')
  },
  error(text) {
    console.log(`%cMango %cerror %c${text}`,'color: #ff8242;','text-transform:uppercase; color: #eb090f', 'color:auto')
  }
}