import { useState, useEffect } from "react";

const BarRange = ({ defaultBars, handleNewBars }) => {
  const [numBars, setNumBars] = useState(defaultBars);

  useEffect(() => {
    const input = document.getElementById("num-bars");
    input.value = 400;
  }, []);

  const handleBarChange = (event) => {
    setNumBars(event.target.value);
    handleNewBars(numBars);
  };

  return (
    <>
      <label>Array Size</label>
      <input
        type="range"
        id="num-bars"
        name="num-bars"
        min="5"
        max="400"
        onChange={handleBarChange}
        onMouseUp={handleBarChange}
      />
      <label>{numBars}</label>
    </>
  );
};

export default BarRange;
