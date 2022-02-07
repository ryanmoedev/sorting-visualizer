import React, { useState } from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort";
// import useWindowDimensions from "./WindowDimensions";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 400;

// This is the main color of the array bars.
const PRIMARY_COLOR = "#06d6a0";

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = "#ef476f";

const SORTED_COLOR = "#ffd166";

const SortingVisualizer = () => {
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const resetArray = () => {
    const arr = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      arr.push(randomIntFromInterval(5, 900));
    }
    return arr;
  };

  //HANDLERS
  const handleGenerateNewArray = () => {
    const newArr = resetArray();
    const arrayBars = document.getElementsByClassName("array-bar");
    for (const bar of arrayBars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
    setArray(newArr);
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : SORTED_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

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
