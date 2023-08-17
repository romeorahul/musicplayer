import React from 'react'
import styles from "./left.module.css";
import Image from 'next/image';
import spotify from 'public/spotifylogo.png';

function Leftsidebar() {
  return (
    <div className={styles.container}>
      <Image src={spotify} width={200}/>
      <ul>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
        <li>Home</li>
      </ul>
    </div>
  )
}

export default Leftsidebar
