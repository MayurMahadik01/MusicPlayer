import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchSpotifyData} from "../../redux/spotifyReducer";
import Logo from "../Logo/Logo";
import {MusicList,Profile} from "../index";


export default function SpotifyDashboard() {

  const dispatch = useDispatch();
  const { isLoading,isSuccess,spotifyData } = useSelector((state) => state.spotify);
 
  useEffect(() => {
    dispatch(fetchSpotifyData());
  }, [dispatch]);
  
  console.log('-------->',spotifyData,isLoading);
  return (    
    <div>
      <div className="flex"><Logo/> 
      <MusicList/> 
      
      </div>
      <div>
      <Profile/>
      </div>
    </div>

    
  )
}
