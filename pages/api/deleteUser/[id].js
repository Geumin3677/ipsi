const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
}

function getKeyByValue(obj, value) {
    return Object.keys(obj).find(key => obj[key] === value);
  }

export default function handler(req, res) {
    const { id } = req.query

    var dataBuffer = fs.readFileSync('./pages/data/nfcData.json')
    var dataJSON = dataBuffer.toString()
    var nfcdata = JSON.parse(dataJSON)

    dataBuffer = fs.readFileSync('./pages/data/data.json')
    var dataJSON = dataBuffer.toString()
    var data = JSON.parse(dataJSON)
    
    console.log(id)
 

    data.userData.forEach((element, index) => {
        if(element.uid === id)
        {
            data.userData.splice(index, 1)
        }
    });

    var key = getKeyByValue(nfcdata, id)
    delete nfcdata[key]

    dataSave(data, 'data')
    dataSave(nfcdata, 'nfcData')

    res.socket?.server?.io?.emit('refresh', 200)
    res.status(200)
    res.end();
    
}