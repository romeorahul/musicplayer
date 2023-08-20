"use client"
import React from "react";
import styles from "./center.module.css";
import SearchForm from "../searchform/Searchform";
import GetSongs from "../GetSongs";

function Center({ selectedItem }) {

  // this console is properly showing the value which is passed from leftsidebar
  console.log(`Center Component - Selected Item: ${selectedItem}`);
  return (
    <div className={styles.container}>
      <h1>Recently Played</h1>
      <SearchForm />
      {selectedItem ? (
        <GetSongs selectedItem={selectedItem} />
      ) : (
        <p>Please select an item from the sidebar.</p>
      )}
    </div>
  );
}

export default Center;
