import React, { useState, useEffect, useRef } from "react";
import Previous from "../Buttons/Previous";
import Play from "../Buttons/Play";
import Pause from "../Buttons/Pause";
import Next from "../Buttons/Next";
import Volume from "../Buttons/Volume";
import More from "../Buttons/More";

export default function AudioPlayerCard(props) {
  const { spotifyData, activeTab, musicId } = props;
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMusic, setCurrentMusic] = useState([]);
  const [activeMusicId, setActiveMusicId] = useState("");
  const [activeButton, setActiveButton] = useState(null);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => {
      const newState = !prevState;
      if (newState) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      return newState;
    });
  };

  const handlePrevious = () => {
    setActiveButton("previous");
    document.body.style.background = "linear-gradient(108.18deg, #201606 2.46%, #000000 99.84%)";
    if (activeTab === "Top Tracks") {
      let topTrack = spotifyData.filter((val) => val.top_track === true);
      let index = topTrack.findIndex((item) => item.id === activeMusicId);

      if (index !== 0) {
        let previousIndex = index - 1;
        let selectedSong = topTrack.filter((_, index) => index === previousIndex);
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0]?.id ?? topTrack[0].id);
        setIsPlaying(true);
      }
    } else {
      let index = spotifyData.findIndex((item) => item.id === activeMusicId);
      if (index !== 0) {
        let previousIndex = index - 1;
        let selectedSong = spotifyData.filter((_, index) => index === previousIndex);
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0].id);
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    setActiveButton("next");
    document.body.style.background = "linear-gradient(108.18deg, #33425E99 2.46%, #000000 99.84%)";

    if (activeTab === "Top Tracks") {
      let topTrack = spotifyData.filter((val) => val.top_track === true);
      let index = topTrack.findIndex((item) => item.id === activeMusicId);

      if (index !== topTrack.length - 1) {
        let nextIndex = index + 1;
        let selectedSong = topTrack.filter((_, index) => index === nextIndex);
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0]?.id ?? topTrack[0].id);
        setIsPlaying(true);        
      }
    } else {
      let index = spotifyData.findIndex((item) => item.id === activeMusicId);
      if (index !== spotifyData.length - 1) {
        let nextIndex = index + 1;
        let selectedSong = spotifyData.filter((_, index) => index === nextIndex);
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0].id);
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    let selectedMusic = spotifyData.filter((value) => value.id === musicId);
    setCurrentMusic(selectedMusic);
    setActiveMusicId(musicId);
    
    const timeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [activeTab, musicId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [activeMusicId]);

  useEffect(() => {
    console.log("Active Button Changed:", activeButton); // Debug log
    if (activeButton === "previous") {
      document.body.style.background = "linear-gradient(108.18deg, #201606 2.46%, #000000 99.84%)"; 
    } else if (activeButton === "next") {
      document.body.style.background = "linear-gradient(108.18deg,#33425E99 2.46%, #000000 99.84% )";
    } else {
      document.body.style.backgroundColor = ""; 
    }

    return () => {
      document.body.style.backgroundColor = ""; // Reset background on unmount
    };
  }, [activeButton]);

  return (
    <div className="flex flex-col bg-transparent">
      <div className="ml-40 w-96 h-100 p-3">
        {currentMusic.length > 0 && currentMusic.map((val) => (
          <div key={val.id} className="flex flex-col">
            {/* Song Info */}
            <div className="text-left">
              <h5 className="mb-1 text-3xl font-bold text-gray-900 dark:text-white">
                {val.name}
              </h5>
              <p className="mb-2 text-xs text-gray-700 dark:text-gray-400">
                {val.artist}
              </p>
            </div>

            {/* Image */}
            <div>
              <img
                className="mt-3 object-cover rounded-lg h-80 w-80"
                src={`https://cms.samespace.com/assets/${val.cover}`}
                alt={val.name}
              />
            </div>
            <div>
              <audio ref={audioRef} src={val.url} />
            </div>
          </div>
        ))}

        {/* Control Buttons */}
        <div className="flex justify-between items-center mt-4 w-full max-w-lg mx-auto">
          {/* Left-aligned More button */}
          <div className="flex-shrink-2">
            <button className="w-14">
              <More />
            </button>
          </div>

          <div className="flex justify-center items-center">
            {/* Center-aligned Previous, Play/Pause, and Next buttons */}
            <div className="flex gap-2 justify-center items-center">
              {/* Previous button */}
              <button onClick={handlePrevious} className="w-14">
                <Previous />
              </button>

              {/* Play/Pause button */}
              <button onClick={handlePlayPause} className="w-14">
                {isPlaying ? <Pause /> : <Play />}
              </button>

              {/* Next button */}
              <button onClick={handleNext} className="w-14">
                <Next />
              </button>
            </div>
          </div>

          {/* Right-aligned Volume button */}
          <div className="flex-shrink-0">
            <button className="w-14">
              <Volume />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
