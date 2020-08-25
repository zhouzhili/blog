function checkArray(arr) {
  if(!arr && arr.length<2) {
    return
  }
}

function swap(array,left,right) {
  const temp = array[right]
  array[right] = array[left]
  array[left] = temp
}

module.exports = {
  checkArray,
  swap
}