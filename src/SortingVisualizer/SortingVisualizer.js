import React, { useState } from "react";
import BarRange from "./BarRange";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../SortingAlgorithms/MergeSort";
import { getQuickSortAnimations } from "../SortingAlgorithms/QuickSort";
import { getBubbleSortAnimations } from "../SortingAlgorithms/BubbleSort";
// import useWindowDimensions from "./WindowDimensions";

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 2;

// Change this value for the number of bars (value) in the array.
const INIT_NUMBER_OF_ARRAY_BARS = 400;

// This is the main color of the array bars.
const INITIAL_COLOR = "#06d6a0";

// This is the color of array bars that are being compared throughout the animations.
const FOCUS_COLOR = "#ef476f";

const SORTED_COLOR = "#ffd166";

const PIVOT_COLOR = "#118ab2";

const SortingVisualizer = () => {
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const resetArray = () => {
    const arr = [];
    for (let i = 0; i < numArrayBars; i++) {
      arr.push(randomIntFromInterval(5, 900));
    }
    return arr;
  };

  //HANDLERS
  const handleGenerateNewArray = () => {
    const newArr = resetArray();
    const arrayBars = document.getElementsByClassName("array-bar");
    for (const bar of arrayBars) {
      bar.style.backgroundColor = INITIAL_COLOR;
      bar.style.width = `${1200 / numArrayBars - 1}px`;
    }
    setArray(newArr);
  };

  const handleNewBars = (numBars) => {
    setNumArrayBars(numBars);
    handleGenerateNewArray();
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
        const color = i % 3 === 0 ? FOCUS_COLOR : SORTED_COLOR;
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

  const quickSort = () => {
    const animations = getQuickSortAnimations(array);
    let prevPivotIdx = 0;
    let prevLRIdx = 0;
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");

      if (animations[i].type === "swap") {
        const [barOneIdx, barTwoIdx] = animations[i].index;
        const [newHeightOne, newHeightTwo] = animations[i].newHeight;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].type === "pivot") {
        const barIdx = animations[i].index;
        const prevBarStyle = arrayBars[prevPivotIdx].style;
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          prevBarStyle.backgroundColor = INITIAL_COLOR;
          barStyle.backgroundColor = PIVOT_COLOR;
        }, i * ANIMATION_SPEED_MS);
        prevPivotIdx = barIdx;
      } else {
        const barIdx = animations[i].index;
        const prevBarStyle = arrayBars[prevLRIdx].style;
        const currPivotStyle = arrayBars[prevPivotIdx].style;
        const barStyle = arrayBars[barIdx].style;
        setTimeout(() => {
          prevBarStyle.backgroundColor = INITIAL_COLOR;
          barStyle.backgroundColor = FOCUS_COLOR;
          currPivotStyle.backgroundColor = PIVOT_COLOR;
        }, i * ANIMATION_SPEED_MS);
        prevLRIdx = barIdx;
      }
    }
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      if (animations[i].type === "focus") {
        const barIdx = animations[i].index;
        const prevIdx = barIdx === 0 ? array.length - 1 : barIdx - 1;
        const barStyle = arrayBars[barIdx].style;
        const prevStyle = arrayBars[prevIdx].style;
        setTimeout(() => {
          prevStyle.backgroundColor = INITIAL_COLOR;
          barStyle.backgroundColor = FOCUS_COLOR;
        }, i * ANIMATION_SPEED_MS);
      } else if (animations[i].type === "swap") {
        const [barOneIdx, barTwoIdx] = animations[i].index;
        const [newHeightOne, newHeightTwo] = animations[i].newHeight;
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        setTimeout(() => {
          barOneStyle.height = `${newHeightOne}px`;
          barTwoStyle.height = `${newHeightTwo}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  };

  //STATES
  const [numArrayBars, setNumArrayBars] = useState(INIT_NUMBER_OF_ARRAY_BARS);
  const [array, setArray] = useState(resetArray());
  //   const { winWidth, winHeight } = useWindowDimensions(); //unused for now.
  return (
    <>
      <div className="app-ctr">
        <div className="control-banner">
          <div id="bar-slider">
            <BarRange defaultBars={INIT_NUMBER_OF_ARRAY_BARS} handleNewBars={handleNewBars} />
          </div>
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
            <button
              className="algo-btn"
              onClick={() => {
                quickSort();
              }}
            >
              Quick Sort
            </button>
            <button
              className="algo-btn"
              onClick={() => {
                bubbleSort();
              }}
            >
              Bubble Sort
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
