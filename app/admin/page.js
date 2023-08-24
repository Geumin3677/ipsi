'use client'

import axios from "axios";
import { useEffect, useState } from "react"
import { socket } from "../socket";

export default function Home() {

  const [hydrated, setHydrated] = useState(false);
  const [data, setD] = useState([])

  useEffect(async () => {
    cardFactory()
    const socketInitializer = async () => {
      socket.on('connect', () => {
        console.log('connected', socket);
      });

      socket.on('error', (error) => {
        console.log(error);
      });

      socket.on('refresh', (message) => {
        if(message === 200) {
          cardFactory()
        }
      });
    };
    socketInitializer();

    setHydrated(true)

    // 브라우저가 꺼지면 소켓 연결 종료
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    
}, [])

  if(!hydrated) {
    return null
  }


  window.matchMedia(
    '(display-mode: standalone)'
  ).matches


  async function cardFactory() {
    const res = await axios.get(`http://34.81.117.111:4001/api/getData`)
    setD(res.data)
  }

  async function redirect() {
    window.location = "/admin/addUser"
  }

  async function resetState() {
    if(window.confirm('정말로 초기화 하겠습니까?')) {
      const res = await axios.get(`http://34.81.117.111:4001/api/reset`)
      if(res.status === 200) {
        window.alert('리셋 성공')
      }
    }
  }

  async function deleteUser(e) {
    console.log(e.target.id)
    await axios.get(`http://34.81.117.111:4001/api/deleteUser/${e.target.id}`)
  }

  function asdf() {
    window.location = "/"
  }

  return (
    <div className="background">
      <input className="backbtn" type="button" onClick={asdf.bind(this)} value="<-"></input>
        <div className="title">학생 관리</div>
        <div className="adcxt">
            <button style={{margin:10}}  onClick={cardFactory} >새로고침</button>
            <button style={{margin:10}} onClick={redirect.bind(this)} >학생 추가</button>
            <button style={{margin:10, backgroundColor:'red', color:'whi'}} onClick={resetState.bind(this)} >출석 리셋</button>
        </div>
        <div className="cxt">
            {data.map((element, index) => {
            return(
                <div className="card" key={index}>
                    <div className="stugc">{element.gcinfo}</div>
                    <div className="stuName" style={{marginBottom:5}}>{element.name}</div>
                    <button id={element.uid} onClick={deleteUser.bind(element)} className="delete">X</button>
                </div>
            )
            })}
        </div>
    </div>
  )
}
