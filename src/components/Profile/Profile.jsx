import React from "react";
import ProfileImg from "../../assets/Profile/Profile.png"

export default function Profile() {
  return (
    <div className="">
    <div className="absolute bottom-7"> 
      <img
        className="w-14 h-8 rounded-full bg-customBlack"
        src={ProfileImg}
        alt="Rounded avatar"
      />
    </div>
  </div>
  );
}
