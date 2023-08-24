const fs = require('fs')

async function dataSave(data, name) {
    const datastr = JSON.stringify(data, null, '\t');
    fs.writeFileSync(`./pages/data/${name}.json`, datastr);
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
 
    if(id in nfcdata) {
        for(var a of Object.keys(data)){
            data[a].forEach((element, index) => {
                if(element.uid === nfcdata[id])
                {
                    data[a][index].state = "출석"
                    dataSave(data, "data")
                }
            });
            
            res.socket?.server?.io?.emit('refresh', 200)

            res.status(200)
            res.end();
        }
    }
    else {
        res.status(404)
        res.end();
    }

    
    
}