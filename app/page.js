'use client'

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { socket } from "./socket.js";
import io from 'socket.io-client';
import Tile from "./tile.js";

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

  async function cardFactory() {
    const res = await axios.get(`http://34.80.142.151:4001/api/getData`)
    setD(res.data)
  }

  function redirect() {
    window.location = "/admin"
  }


  window.matchMedia(
    '(display-mode: standalone)'
  ).matches

  return (
    <div className="background">
      <h2 className="title">이매고 아침 자습 출석자 현황</h2>
      <div className="adcxt">
        <button style={{margin:10}}  onClick={cardFactory} >새로고침</button>
        <button style={{margin:10}} onClick={redirect.bind(this)} >학생 관리</button>
      </div>
      <div className="cxt">
        {data.map((element, index) => {
          return (
            <Tile e={element} index={index}/>
          )
        })}
      </div>
    </div>
  )
}
