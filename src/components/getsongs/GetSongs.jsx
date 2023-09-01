"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useMyContext } from "../context/MyContext";
import Image from "next/image";
import styles from "./getsongs.module.css";

// here receiving the value from the props in selectedItem
const GetSongs = () => {
  const { selectedItem } = useMyContext();
  const query = gql`
    query GetSongs($songType: SongType!) {
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

  if (loading) return "Loading";
  if (error) return `Error ${error.message}`;

  // console.log("data is", data);
  function formatDuration(duration) {
    // Assuming duration is in seconds, you can format it as "mm:ss"
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    
    // Use String formatting to ensure leading zeros for single-digit seconds
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div>
      {data.getSongs.map((song) => (
        <div key={song.id} className={styles.mainbox}>
          <div className={styles.leftside}>
            <div className={styles.imgbox}>
              {/* <Image
                src={song.photoUrl}
                width={50}
                height={50}
                alt="songphoto"
              /> */}

              <img
                src={`https://song-tc.pixelotech.com${song.photoUrl}`}
                alt="photo"
                width={50}
                height={50}
              />
            </div>

            <div className={styles.albuminfo}>
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
          </div>
          <div className={styles.duration}>{formatDuration(song.duration)}</div>
        </div>
      ))}
    </div>
  );
};

export default GetSongs;
