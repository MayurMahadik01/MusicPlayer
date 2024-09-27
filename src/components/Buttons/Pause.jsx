import React from 'react'
import PauseImg from "../../assets/images/pause.png"

export default function Pause() {
  return (
    <div>
        <img
            src={PauseImg}
            alt="Pause"
            className="w-8 h-8"
            style={{ height: "auto" }}
          />
    </div>
  )
}
