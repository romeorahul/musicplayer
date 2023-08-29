// contexts/MyContext.js
import { createContext, useState, useContext } from "react";

const initialState = {
  myProperty: "",
};

// Create the context
const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [myState, setMyState] = useState(initialState);
  const [selectedItem, setSelectedItem] = useState("");

  const updateMyState = (newState) => {
    setMyState(newState);
  };

  const updateSelectedItem = (newSelectedItem) => {
    setSelectedItem(newSelectedItem);
  };

  return (
    <MyContext.Provider
      value={{ myState, updateMyState, selectedItem, updateSelectedItem }}
    >
      {children}
    </MyContext.Provider>
  );
}

// Create a custom hook to access the context
export function useMyContext() {
  return useContext(MyContext);
}
