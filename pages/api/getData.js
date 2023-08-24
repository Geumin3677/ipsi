const fs = require('fs')

export default function handler(req, res) {

    var dataBuffer = fs.readFileSync('./pages/data/data.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    res.status(200).json(data.userData)
    res.end();
}