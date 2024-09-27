import React from 'react'
import PlayImg from "../../assets/images/play-button.png"

export default function Play() {
  return (
    <div>
        <img
            src={PlayImg}
            alt="Play"
            className="w-8 h-8"
            style={{ height: "auto" }}
          />
    </div>
  )
}
