const util = require('./utils')

const arr = [1, 3, 6, 5, 8, 2, 4, 9]

function bubble(arr) {
  util.checkArray(arr)
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        util.swap(arr, i, j)
      }
    }
  }
}

bubble(arr)

console.log(arr)