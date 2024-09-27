import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpotifyData } from "../../redux/spotifyReducer";
import { AudioPlayerCard } from "../index";

export default function ForYou(props) {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, spotifyData } = useSelector(
    (state) => state.spotify
  );

  const [isMusicPlaying, setMusicPlaying] = useState(false);

  const [musicId, setMusicId] = useState("");

  useEffect(() => {
    dispatch(fetchSpotifyData());
  }, [dispatch]);

  const showActiveMusic = (id) => {
    setMusicPlaying(true);
    setMusicId(id);
  };

  return (
    <div className=" ml-32 min-w-full flex justify-start items-start  bg-transparent  ">
      {/* Left column: Search and Music List */}
      <div className="flex flex-col">
        {/* Search bar */}
        <div className="w-64 h-8 mt-4  bg-transparent rounded-md ">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="bg-white bg-opacity-20 block w-full h-10 pl-4 pr-10 text-sm text-gray-900 rounded-md outline-none dark:placeholder-gray-400 dark:text-white"
              placeholder="Search Songs, Artist"
              required
            />
          </div>
        </div>

        {/* Music List */}
        <div className="mt-4 flex-grow ">
          <div
            className="hide-scrollbar"
            style={{
              height: "75vh", // Adjust as needed
              overflowY: "scroll",
              overflowX: "hidden",
              scrollbarWidth: "none",
            }}
          >
            <div>
              {spotifyData?.length
                ? spotifyData
                    ?.filter((val) =>
                      props?.activeButton === "Top Tracks"
                        ? val.top_track === true
                        : true
                    )
                    .map((data) => (
                      <ul
                        key={data.id}
                        className="max-w-md mt-4 divide-gray-200 dark:divide-gray-700"
                      >
                        <li
                          onClick={() => showActiveMusic(data.id)}
                          className="pb-3 sm:pb-4 cursor-pointer"
                        >
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="flex-shrink-0">
                              <img
                                className="w-8 h-8 rounded-full"
                                src={`https://cms.samespace.com/assets/${data.cover}`}
                                alt="Album cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                {data.name}
                              </p>
                              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                {data.artist}
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    ))
                : "No Records Found"}
            </div>
          </div>
        </div>
      </div>

      {/* Right column: Audio Player */}
      {isMusicPlaying && (
        <div className="ml-4 w-1/3">
          <AudioPlayerCard
            spotifyData={spotifyData}
            musicId={musicId}
            activeTab={props?.activeButton}
          />
        </div>
      )}
    </div>
  );
}
