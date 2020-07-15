const fs = require('fs')





const data = JSON.parse(fs.readFileSync('me.json').toString())
data.name = 'Vlado'
data.age = 33

const dataJson = JSON.stringify(data)
fs.writeFileSync('me.json', dataJson)
// const dataParsed = data.parse()
// console.log(data)