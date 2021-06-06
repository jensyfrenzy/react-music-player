import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioRef,
  currentSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  songs,
  setSongs,
  setCurrentSong,
  setSongInfo,
}) => {
  // event handlers

  const activeLibraryHandler = (nextPrevSong) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrevSong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });

    setSongs(newSongs);
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const getFormattedTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const skipTrackHandler = async (skipForward) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let destinationIndex = skipForward
      ? (currentIndex + 1) % songs.length
      : currentIndex - 1;

    if (destinationIndex < 0) {
      destinationIndex = songs.length - 1;
    }

    await setCurrentSong(songs[destinationIndex]);
    activeLibraryHandler(songs[destinationIndex]);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  // animation styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{getFormattedTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p>{getFormattedTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <div className="skip-back">
          <FontAwesomeIcon
            onClick={() => skipTrackHandler(false)}
            size="2x"
            icon={faAngleLeft}
          />
        </div>
        <div className="play">
          <FontAwesomeIcon
            onClick={playSongHandler}
            size="2x"
            icon={isPlaying ? faPause : faPlay}
          />
        </div>
        <div className="skip-forward">
          <FontAwesomeIcon
            onClick={() => skipTrackHandler(true)}
            size="2x"
            icon={faAngleRight}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
