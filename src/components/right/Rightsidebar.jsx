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
  const [volume, setVolume] = useState(50);
  const [songList, setSongList] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsPlaying(false);
    }
  }, [data, loading, error, selectedItem]);

  useEffect(() => {
    if (currentSongIndex < 0) {
      setCurrentSongIndex(0);
    } else if (currentSongIndex >= songList.length) {
      setCurrentSongIndex(songList.length - 1);
    }
  }, [currentSongIndex, songList]);

  useEffect(() => {
    if (songList.length > 0) {
      const newSong = songList[currentSongIndex];
      audioRef.current.src = `https://song-tc.pixelotech.com${newSong.audioUrl}`;
      setIsLoading(true);

      audioRef.current.addEventListener("canplaythrough", () => {
        audioRef.current.play();
        setIsLoading(false);
        setIsPlaying(true); // Update isPlaying state when the song starts playing
      });
    }
  }, [songList, currentSongIndex]);

  const changeSong = (newIndex) => {
    setCurrentSongIndex(newIndex);
    setIsLoading(true); // Set loading state when changing songs

    const newSong = songList[newIndex];
    audioRef.current.src = `https://song-tc.pixelotech.com${newSong.audioUrl}`;

    // Add an event listener to play the song when it can play through
    audioRef.current.addEventListener("canplaythrough", () => {
      audioRef.current.play();
      setIsLoading(false); // Turn off loading state once the song starts playing
      setIsPlaying(true); // Update isPlaying state when the song starts playing
    });
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songList.length;
    changeSong(nextIndex);
  };

  const playPreviousSong = () => {
    const prevIndex =
      currentSongIndex === 0 ? songList.length - 1 : currentSongIndex - 1;
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

          <audio
            ref={audioRef}
            src={`https://song-tc.pixelotech.com${songList[currentSongIndex].audioUrl}`}
            onEnded={playNextSong}
          />
        </>
      )}
      <div className={styles.controlContainer}>
        <div className={styles.greyBtn}>
          <FiMoreHorizontal />
        </div>
        <div className={styles.centerPlaybtns}>
          <FaChevronLeft
            onClick={() => {
              playPreviousSong();
              console.log("Previous button clicked");
            }}
          />
          <div
            className={styles.playbtn}
            onClick={() => {
              togglePlayPause();
              console.log("Play/Pause button clicked");
            }}
          >
            {isLoading ? "loading" : isPlaying ? <FaPause /> : <FaPlay />}
          </div>
          <FaChevronRight
            onClick={() => {
              playNextSong();
              console.log("Next button clicked");
            }}
          />
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
