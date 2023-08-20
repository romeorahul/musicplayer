"use client";
import React from "react";
import { gql, useQuery } from "@apollo/client";

// here receiving the value from the props in selectedItem
const GetSongs = ({ selectedItem }) => {
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

  return (
    <div>
      <h1>Data is:</h1>
      <ul>
        {data.getSongs.map((song) => (
          <li key={song.id}>
            <h2>{song.title}</h2>
            <p>Artist: {song.artist}</p>
            <p>Duration: {song.duration}</p>
            {/* You can display other song information here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetSongs;
