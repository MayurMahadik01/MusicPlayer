import React from 'react'
import MoreImg from "../../assets/images/more.png"
export default function More() {
  return (
    <div>
        <img
            src={MoreImg}
            alt="More"
            className="w-4 h-4"
            style={{ height: "auto" }}
          />
    </div>
  )
}
