import React from "react";

const LibrarySong = ({
  audioRef,
  id,
  isPlaying,
  song,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const songSelectHandler = async () => {
    const selectedSong = songs.filter((stateSong) => stateSong.id === song.id);
    await setCurrentSong(selectedSong[0]);

    const newSongs = songs.map((song) => {
      if (song.id === id) {
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
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={songSelectHandler}
    >
      <img src={song.cover} alt={song.name} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
