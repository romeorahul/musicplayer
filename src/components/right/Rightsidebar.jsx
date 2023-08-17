import React from "react";
import styles from "./right.module.css";
import album from "public/album.jpg"
import Image from "next/image";
import Controls from '../playercontrol/Controls';

function Rightsidebar() {
  return <div className={styles.container}>
    <h1>
      Top from the bottom
    </h1>
    <p>Music by : AR Rahman</p>
    <Image src={album} width={400} alt="album image"/>
    <Controls />
  </div>;
}

export default Rightsidebar;
