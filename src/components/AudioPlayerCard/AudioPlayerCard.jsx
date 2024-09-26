import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function AudioPlayerCard(props) {
  const { spotifyData, activeTab, musicId } = props;
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMusic, setCurrentMusic] = useState([]);
  const [activeMusicId, setActiveMusicId] = useState(musicId);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying((prevState) => !prevState); // Toggle between play and pause

    // Control the audio playback
    if (!isPlaying) {
      audioRef.current.play(); // Play the audio if not already playing
    } else {
      audioRef.current.pause(); // Pause the audio if it's playing
    }
  };

  const playAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
  };

  const handlePrevious = () => {
    if (activeTab === "Top Tracks") {
      let topTrack = spotifyData.filter((val) => val.top_track === true);
      let index = topTrack.findIndex((item) => item.id === activeMusicId);

      if (index !== 0) {
        let previousIndex = index - 1;
        let selectedSong = topTrack.filter(
          (_, index) => index === previousIndex
        );
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0]?.id ?? topTrack[0].id);
        setIsPlaying(true);
      }else{
        let topTrack = spotifyData.filter((val) => val.top_track === true);
        setActiveMusicId(topTrack[topTrack.length - 1].id)
      }
    } else {
      let index = spotifyData.findIndex((item) => item.id === activeMusicId);
      if (index !== 0) {
        let previousIndex = index - 1;
        let selectedSong = spotifyData.filter(
          (_, index) => index === previousIndex
        );
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0].id);
        setIsPlaying(true);
        console.log("--->", index, previousIndex, selectedSong);
      } else {
        let topTrack = spotifyData.filter((val) => val.top_track === true);
        setActiveMusicId(topTrack[topTrack.length - 1].id);
      }
    }
  };

  const handleNext = () => {
    console.log("---> Yoou have clicked next");
    if (activeTab === "Top Tracks") {
      let topTrack = spotifyData.filter((val) => val.top_track === true);
      let index = topTrack.findIndex((item) => item.id === activeMusicId);

      if (index !== topTrack.length - 1) {
        let previousIndex = index + 1;
        let selectedSong = topTrack.filter(
          (_, index) => index === previousIndex
        );
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0]?.id ?? topTrack[0].id);
        setIsPlaying(true);
      } else {
        let topTrack = spotifyData.filter((val) => val.top_track === true);
        setActiveMusicId(topTrack[0].id);
      }
    } else {
      let index = spotifyData.findIndex((item) => item.id === activeMusicId);
      if (index !== spotifyData.length - 1) {
        let previousIndex = index + 1;
        let selectedSong = spotifyData.filter(
          (_, index) => index === previousIndex
        );
        setCurrentMusic(selectedSong);
        setActiveMusicId(selectedSong[0].id);
        setIsPlaying(true);
        console.log("--->", index, previousIndex, selectedSong);
      } else {
        setActiveMusicId(spotifyData[0].id);
      }
    }
  };

  useEffect(() => {
    let selectedMusic = spotifyData.filter(
      (value) => value.id === activeMusicId
    );
    setCurrentMusic(selectedMusic);
    setActiveMusicId(musicId)
    const timeout = setTimeout(() => {
      if (audioRef.current) {
        playAudio();
      }
    }, 100); // Slight delay to ensure audio element is rendered

    return () => clearTimeout(timeout); // Clean up the timeout
    
  }, [activeMusicId, activeTab,musicId]);
  console.log(currentMusic);

  return (
    <div className="flex flex-col items-center justify-center bg-transparent">
      <div className="w-full max-w-md">
        {currentMusic.length &&
          currentMusic.map((val) => (
            <div key={val.id} className="flex flex-col items-center">
              {/* Song Info */}
              <div className="p-4 text-center">
                <h5 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                  {val.name}
                </h5>
                <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                  {val.artist}
                </p>
              </div>

              {/* Image */}
              <div className="h-5/6 w-2/4">
                <img
                  className="object-cover rounded-lg"
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
        <div className="flex justify-center items-center mt-4 gap-4">
          {/* Previous button */}
          <button onClick={handlePrevious}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M11 12L22 3v18L11 12zM2 21h4V3H2v18z" />
            </svg>
          </button>

          {/* Play/Pause button */}
          <button onClick={handlePlayPause}>
            {isPlaying ? (
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 22h4V2H6v20zM14 2v20h4V2h-4z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 22V2l18 10L3 22z" />
              </svg>
            )}
          </button>

          {/* Next button */}
          <button onClick={handleNext}>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M2 3v18l11-9L2 3zm13 18h4V3h-4v18z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
