"use client"
import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styles from "./right.module.css";
import album from "public/album.jpg";
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

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const playNextSong = () => {
    // Increment the current song index, and loop back to the start if necessary
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songList.length);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    // Decrement the current song index, and loop back to the end if necessary
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songList.length - 1 : prevIndex - 1
    );
    setIsPlaying(true);
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
          <Image
            src={album}
            width={400}
            height={400}
            alt="album image"
          />
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
