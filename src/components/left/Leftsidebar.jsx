import React from 'react'
import styles from "./left.module.css";
import Image from 'next/image';
import spotify from 'public/spotifylogo.png';

function Leftsidebar() {
  return (
    <div className={styles.container}>
      <Image src={spotify} width={200}/>
      <ul>
        <li>For You</li>
        <li>Top Tracks</li>
        <li>Favourites</li>
        <li>Recently Played</li>
      </ul>
    </div>
  )
}

export default Leftsidebar
