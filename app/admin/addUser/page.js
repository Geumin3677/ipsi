'use client'

import axios from "axios";
import { useEffect, useState } from "react"

export default function Home() {

  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
      setHydrated(true)
  }, [])

  if(!hydrated) {
    return null
  }


  async function addUser() {
    const res = await axios.post('http://34.81.117.111:4001/api/addUser', {
      name: document.getElementById('name').value,
      gcinfo: document.getElementById('gcinfo').value,
      ssid: document.getElementById('ssid').value
    })
    if(res.status === 200)
    {
      window.alert('학생 추가 성공')
      document.location.href = "/admin"
    }
  }


  window.matchMedia(
    '(display-mode: standalone)'
  ).matches

  function asdf() {
    window.location = "/admin0918"
  }

  function asdfe(event) {
    event.preventDefault()
  }

  return (
    <div className="background">
      <input className="backbtn" type="button" onClick={asdf.bind(this)} value="<-"></input>
        <div  className="title">학생등록!!!!</div>
      <form className="addform" onSubmit={asdfe.bind(this)}>
        {/* {/* <label for="grade">학년 : </label>
        <select id="grade" name="grade">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
        </select>
        <label for="cls">반 : </label>
        <select id="cls" name="cls">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select> */}
        {/* <br></br>  */}
        <label for="name">이름 : </label>
        <input 
            id="name"
            name="name"
            placeholder="이름"
            required
        />
        <br></br>
        <label for="gcinfo">학번 : </label>
        <input 
            id="gcinfo"
            name="gcinfo"
            placeholder="학번"
            required
        />
        <br></br>
        <label for="ssid">ssid : </label>
        <input 
            id="ssid"
            name="ssid"
            placeholder="ssid"
            required
        />
        <br></br>
        <button className="submit" onClick={addUser}>추가</button>
    </form>
    </div>
  )
}
