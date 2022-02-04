import React, { useState } from "react";
import "./SortingVisualizer.css";
// import useWindowDimensions from "./WindowDimensions";

let arrayLength = 400;

const SortingVisualizer = () => {
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const resetArray = () => {
    const arr = [];
    for (let i = 0; i < arrayLength; i++) {
      arr.push(randomIntFromInterval(5, 900));
    }
    return arr;
  };

  //HANDLERS
  const handleGenerateNewArray = () => {
    const newArr = resetArray();
    setArray(newArr);
  };

  const mergeSort = () => {};

  //STATES
  const [array, setArray] = useState(resetArray());
  //   const { winWidth, winHeight } = useWindowDimensions(); //unused for now.
  return (
    <>
      <div className="app-ctr">
        <div className="control-banner">
          <div className="button-ctr">
            <button
              id="generate-array-btn"
              onClick={() => {
                handleGenerateNewArray();
              }}
            >
              Generate New Array
            </button>
            <button
              className="algo-btn"
              onClick={() => {
                mergeSort();
              }}
            >
              Merge Sort
            </button>
          </div>
        </div>
        <div className="array-ctr">
          {array.map((value, idx) => {
            return <div className="array-bar" key={idx} style={{ height: `${value}px` }}></div>;
          })}
        </div>
      </div>
    </>
  );
};

export default SortingVisualizer;
