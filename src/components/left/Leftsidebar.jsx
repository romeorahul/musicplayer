"use client";
import React, { useState } from "react";
import styles from "./left.module.css";
import Image from "next/image";
import spotify from "public/spotifylogo.png";
import GetSongs from "../GetSongs";
import Center from "../center/Center";

const songTypeMapping = {
  Favourites: "FAVOURITES",
  "For You": "FOR_YOU",
  "Top Tracks": "TOP_TRACKS",
  "Recently Played": "RECENTLY_PLAYED",
};

function Leftsidebar() {
  const [selectedItem, setSelectedItem] = useState("");

  const handleListItemClick = (text) => {
    const mappedValue = songTypeMapping[text];

    // here iam setting the value for passing in center component below
    setSelectedItem(mappedValue);
  };

  return (
    <div className={styles.container}>
      <Image src={spotify} width={200} alt="logo" />
      <ul>
        <ListItem text="Favourites" onItemClick={handleListItemClick} />
        <ListItem text="For You" onItemClick={handleListItemClick} />
        <ListItem text="Top Tracks" onItemClick={handleListItemClick} />
        <ListItem text="Recently Played" onItemClick={handleListItemClick} />
      </ul>

      {/* here iam passing the prop to the center component */}
      <Center selectedItem={selectedItem} />
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
