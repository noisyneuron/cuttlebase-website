const wget = require("node-wget")
const archieml = require("archieml")
const fs = require('fs')

const gdoc = "" // insert link to gdoc here

wget({ url: gdoc, dest: 'google-doc.txt' }, (err, response, body) => {
  const parsed = archieml.load(body)
  const string = JSON.stringify(parsed).replace(/[“‘”’]/g, "'")
  fs.writeFileSync('src/data/content.json', string)
})


