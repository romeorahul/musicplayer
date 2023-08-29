"use client";
import React from "react";
import styles from "./left.module.css";
import Image from "next/image";
import spotify from "public/spotifylogo.png";
import { useMyContext } from "../context/MyContext";

const songTypeMapping = {
  "Favourites": "FAVOURITES",
  "For You": "FOR_YOU",
  "Top Tracks": "TOP_TRACKS",
  "Recently Played": "RECENTLY_PLAYED",
};

function Leftsidebar() {
  const { updateSelectedItem } = useMyContext(); // Access the context

  const handleListItemClick = (text) => {
    const mappedValue = songTypeMapping[text];

    // Update the selectedItem state using the context function
    updateSelectedItem(mappedValue);
  };

  return (
    <div className={styles.container}>
      <img src={spotify} width={200} alt="logo" className={styles.sitelogo}/>
      <ul>
        <ListItem text="Favourites" onItemClick={handleListItemClick} />
        <ListItem text="For You" onItemClick={handleListItemClick} />
        <ListItem text="Top Tracks" onItemClick={handleListItemClick} />
        <ListItem text="Recently Played" onItemClick={handleListItemClick} />
      </ul>
    </div>
  );
}

const ListItem = ({ text, onItemClick }) => {
  const handleClick = () => {
    onItemClick(text);
  };

  return <li onClick={handleClick}>{text}</li>;
};

export default Leftsidebar;
