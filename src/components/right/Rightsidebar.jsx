"use client";

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
  // console.log("iam from the center" + selectedItem);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50); // Initial volume
  const [currentSongId, setCurrentSongId] = useState(1); // Initial song ID
  const [songData, setSongData] = useState(null); // State to hold song data

  const query = gql`
    query GetSongById($songType: SongType!, $id: ID!) {
      getSong(songType: $songType, id: $id) {
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
    variables: { songType: selectedItem, id: currentSongId },
  });

  useEffect(() => {
    if (!loading && !error) {
      setSongData(data.getSong);
    }
  }, [data, loading, error]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const playNextSong = () => {
    setCurrentSongId(currentSongId + 1);
  };

  const playPreviousSong = () => {
    if (currentSongId > 1) {
      setCurrentSongId(currentSongId - 1);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {songData && (
          <>
            <h1>{songData.title}</h1>
            <p>{songData.artist}</p>
            <Image
              src={songData.photoUrl}
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
          <div className={styles.greyBtn}>
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Rightsidebar;
