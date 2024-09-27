import React from "react"
import LogoImg from "../../assets/images/logo.png";

export default function Logo() {
  return (
    <div>
       <div>
       <img
            src={LogoImg}
            alt="My Logo"
            className="w-24 h-16 md:w-34 md:h-16 lg:w-40 lg:h-24"
            style={{ height: "auto" }}
          />
       </div>       
    </div>
  )
}
