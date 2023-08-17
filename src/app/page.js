import React from "react";
import styles from "./page.module.css";
import Leftsidebar from "@/components/left/leftsidebar";
import Rightsidebar from "@/components/right/Rightsidebar";
import Center from "@/components/center/Center";

function page() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Leftsidebar />
      </div>
      <div className={styles.middle}>
        <Center />
      </div>
      <div className={styles.right}>
        <Rightsidebar />
      </div>
    </div>
  );
}

export default page;
