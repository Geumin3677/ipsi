const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}

function createId(data) {
    var id = Math.random().toString(36).substr(2, 16)
    while(id in data)
    {
        id = Math.random().toString(36).substr(2, 16)
    }
    return id
}

export default function handler(req, res) {
    const { grade, cls, name, ssid } = req.query
    var dataBuffer = fs.readFileSync('./pages/data/nfcData.json')
    var dataJSON = dataBuffer.toString()
    var nfcdata = JSON.parse(dataJSON)

    dataBuffer = fs.readFileSync('./pages/data/data.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)

    var uid = createId(Object.values(nfcdata))

    nfcdata[ssid] = uid
    data.userData.push({
        name : name,
        uid : uid,
        state: "미출석",
        grade: `${grade}학년`,
        cls: `${cls}학년`
    })

    dataSave(nfcdata, "nfcData")
    dataSave(data, "data")

    res.status(200)
    res.end();
}