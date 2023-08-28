"use client";
import React, { useState, useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import styles from "./right.module.css";
import Image from "next/image";
import {
  FaPlay,
  FaPause,
  FaChevronRight,
  FaChevronLeft,
  FaVolumeUp,
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMyContext } from "../context/MyContext";

function Rightsidebar() {
  const { selectedItem } = useMyContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Initial volume
  const [songList, setSongList] = useState([]); // State to hold song list
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Initial song index
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const audioRef = useRef(null);

  const query = gql`
    query GetSongsByType($songType: SongType!) {
      getSongs(songType: $songType) {
        id
        photoUrl
        audioUrl
        duration
        title
        artist
      }
    }
  `;

  const { loading, error, data } = useQuery(query, {
    variables: { songType: selectedItem },
  });

  useEffect(() => {
    if (!loading && !error) {
      setSongList(data.getSongs);
    }
  }, [data, loading, error, selectedItem]);

  useEffect(() => {
    // If song list or selected item changes, reset the current song index
    setCurrentSongIndex(0);
  }, [songList, selectedItem]);

  const changeSong = (newIndex) => {
    // Pause the current song
    audioRef.current.pause();

    // Set the new current song index
    setCurrentSongIndex(newIndex);

    // Play the new song if it was paused
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  const playNextSong = () => {
    // Calculate the index of the next song
    const nextIndex = (currentSongIndex + 1) % songList.length;

    // Change to the next song
    changeSong(nextIndex);
  };

  const playPreviousSong = () => {
    // Calculate the index of the previous song
    const prevIndex =
      currentSongIndex === 0 ? songList.length - 1 : currentSongIndex - 1;

    // Change to the previous song
    changeSong(prevIndex);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    setVolume(newVolume);
    audioRef.current.volume = newVolume / 100;
  };

  const toggleVolumeVisibility = () => {
    setIsVolumeVisible(!isVolumeVisible);
  };

  return (
    <div className={styles.container}>
      {songList.length > 0 && (
        <>
          <h1>{songList[currentSongIndex].title}</h1>
          <p>{songList[currentSongIndex].artist}</p>

          <img
            src={`https://song-tc.pixelotech.com${songList[currentSongIndex].photoUrl}`}
            alt="photo"
            width={400}
            height={400}
          />

          {/* Audio element */}
          <audio
            ref={audioRef}
            src={`https://song-tc.pixelotech.com${songList[currentSongIndex].audioUrl}`}
            onEnded={playNextSong} // Automatically play next song when the current one ends
          ></audio>
        </>
      )}
      <div className={styles.controlContainer}>
        <div className={styles.greyBtn}>
          <FiMoreHorizontal />
        </div>
        <div className={styles.centerPlaybtns}>
          <FaChevronLeft onClick={playPreviousSong} />
          <div className={styles.playbtn} onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </div>
          <FaChevronRight onClick={playNextSong} />
        </div>
        <div className={styles.greyBtn} onClick={toggleVolumeVisibility}>
          <FaVolumeUp />
          <input
            className={isVolumeVisible ? styles.volumebtn : styles.hidden}
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Rightsidebar;
