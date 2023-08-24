
export default function Tile(element) {
    return (
        <>
        {
            (element.e.state=="출석")? (
                <div className="card green" key={element.e.index} style={((element.index+1) % 8 == 2 || (element.index+1) % 8 == 6)?({marginRight:30}):({marginRight:15})}>
                    <div className="stugc">{element.e.gcinfo}</div>
                    <div className="stuName">{element.e.name}</div>
                    <div className="stuState">{element.e.state}</div>
                </div>
            ) : (
                <div className="card red" key={element.index} style={((element.index+1) % 8 == 2 || (element.index+1) % 8 == 6)?({marginRight:30}):({marginRight:15})}>
                    <div className="stugc">{element.e.gcinfo}</div>
                    <div className="stuName">{element.e.name}</div>
                    <div className="stuState">{element.e.state}</div>
                </div>
            )
        }
        </>
    )
}