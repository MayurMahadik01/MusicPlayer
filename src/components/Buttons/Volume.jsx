import React from 'react';
import VolumeImg from "../../assets/images/volume.png"

export default function Volume() {
  return (
    
    <div>
        <img
            src={VolumeImg}
            alt="Volume"
            className="w-4 h-4"
            style={{ height: "auto" }}
          />
    </div>
  )
}
