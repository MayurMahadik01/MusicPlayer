import React, { useState } from 'react';
import ForYou from '../MusicList/MusicList';

export default function MusicList() {
  const [activeButton, setActiveButton] = useState('For You');

  const buttonStyles = {
    active: 'text-white',
    inactive: 'text-gray-500'
  };

  return (
   <div>
     <div className="flex ml-28">
      <ul className="flex flex-wrap text-sm font-medium text-center">
        <li className="me-2">
          <button
            className={`font-family-Inter text-xl font-weight-700 leading-32px text-left py-2 px-4 ${activeButton === 'For You' ? buttonStyles.active : buttonStyles.inactive}`}
            onClick={() => setActiveButton('For You')}
          >
            For You
          </button>
        </li>
        <li className="me-2">
          <button
            className={`font-family-Inter text-xl font-weight-700 leading-32px text-left py-2 px-4 ${activeButton === 'Top Tracks' ? buttonStyles.active : buttonStyles.inactive}`}
            onClick={() => setActiveButton('Top Tracks')}
          >
            Top Tracks
          </button>
        </li>
      </ul>
    </div>
    <div>
        <ForYou activeButton={activeButton}/>
    </div>
   </div>
   
  );
}
