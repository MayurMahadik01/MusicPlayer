import React from "react";

export default function Profile() {
  return (
    <div className=""> {/* Adjust height as needed */}
    <div className="absolute bottom-0"> {/* Positions the child at the bottom */}
      <img
        className="w-10 h-10 rounded-full border border-solid border-white"
        src="/docs/images/people/profile-picture-5.jpg"
        alt="Rounded avatar"
      />
    </div>
  </div>
  );
}
