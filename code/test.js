
async function start() {
  const array = [1, 2, 3, 4, 5]

  for (const a in array) {
    const result = await Promise.resolve(array[a])
    console.log(result)
  }
  console.log('end')
}
start()

async function start() {
  const array = [1, 2, 3, 4, 5]

  await Promise.all(array.map(async a => {
    const result = await Promise.resolve(a)
    console.log(result)
  }))
  console.log('end')
}
start()