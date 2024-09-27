import React from 'react'
import NextImg from "../../assets/images/fast-forward.png";

export default function Next() {
  return (
    <div>
         <img
            src={NextImg}
            alt="Next"
            className="w-4 h-4"
            style={{ height: "auto" }}
          />
    </div>
  )
}
