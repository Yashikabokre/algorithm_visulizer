import React, { useState, useEffect } from "react";
import Button from "./designing/Button";
import Dropdown from "./designing/DropDown";

const ARRAYSIZE = 35;
const animationSpeed = 700;

const Visualizer = () => {
  const [primaryArray, setPrimaryArray] = useState([]);
  const [algorithm, setAlgorithm] = useState("bubbleSort");

  const [disableOptions, setDisableOptions] = useState(false);

  const randomizeArray = () => {
    for (let i = 0; i < primaryArray.length; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = "#ff7f50";
    }
    let array = [];
    for (let i = 0; i < ARRAYSIZE; i++) {
      array.push(randomVals(20, 400));
    }

    setPrimaryArray(array);
  };

  const randomVals = (min, max) => {
    let randomVal = Math.floor(Math.random() * (max - min + 1) + min);
    return randomVal;
  };

  useEffect(() => {
    randomizeArray();
  }, []);

  const sleep = (milliSeconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
  };

  const finishedAnimation = async () => {
    for (let i = 0; i < primaryArray.length; i++) {
      let bar = document.getElementById(i).style;
      bar.backgroundColor = "green";

      await sleep(150);
    }
    setDisableOptions(false);
  };

  const handleSorting = () => {
    setDisableOptions(true);
    switch (algorithm) {
      case "bubbleSort":
        bubbleSort();
        break;
      case "selectionSort":
        selectionSort();
        break;
      case "insertionSort":
        insertionSort();
        break;
      case "mergeSort":
        mergeSort();
        break;
      case "quickSort":
        quickSort();
        break;
      case "heapSort":
        heapSort();
        break;
      default:
        break;
    }
  };

  // ------------ ALGORITHMS ------------ //

  // Bubble Sort
  const bubbleSort = async () => {
    let currentArr = primaryArray;
    let sorted = false;
    setAlgorithm({ name: "Bubble Sort", timeComplexity: "O(n^2)" });

    while (!sorted) {
      sorted = true;

      for (let i = 0; i < currentArr.length - 1; i++) {
        for (let j = 0; j < currentArr.length - i - 1; j++) {
          if (currentArr[j] > currentArr[j + 1]) {
            let temp = currentArr[j];
            currentArr[j] = currentArr[j + 1];
            currentArr[j + 1] = temp;
            setPrimaryArray([...primaryArray, currentArr]);

            let bar1 = document.getElementById(j).style;
            let bar2 = document.getElementById(j + 1).style;
            bar1.backgroundColor = "#DC143C";
            bar2.backgroundColor = "#6A5ACD";

            await sleep(animationSpeed);

            bar1.backgroundColor = "#FF7F50";
            bar2.backgroundColor = "#FF7F50";

            sorted = false;
          }
        }
      }
      if (sorted) finishedAnimation();
    }
  };

  // Selection Sort
  const selectionSort = async () => {
    let currentArr = primaryArray;
    let sorted = false;
    setAlgorithm({ name: "Selection Sort", timeComplexity: "O(n^2)" });

    while (!sorted) {
      sorted = true;

      for (let i = 0; i < currentArr.length - 1; i++) {
        for (let j = i + 1; j < currentArr.length; j++) {
          if (currentArr[i] > currentArr[j]) {
            let swap1 = currentArr[i];
            let swap2 = currentArr[j];
            currentArr[i] = swap2;
            currentArr[j] = swap1;
            setPrimaryArray([...primaryArray, currentArr]);

            let bar1 = document.getElementById(i).style;
            let bar2 = document.getElementById(j).style;
            bar1.backgroundColor = "#DC143C";
            bar2.backgroundColor = "#6A5ACD";

            await sleep(animationSpeed);

            bar1.backgroundColor = "#FF7F50";
            bar2.backgroundColor = "#FF7F50";

            sorted = false;
          }
        }
      }
      if (sorted) finishedAnimation();
    }
  };

  // Insertion Sort
  const insertionSort = async () => {};

  // Merge Sort
  const mergeSort = async () => {
    let currentArr = primaryArray;
    setAlgorithm({ name: "Merge Sort", timeComplexity: "O(n log(n))" });

    await sort(currentArr, 0, currentArr.length - 1);
    finishedAnimation();
  };

  const sort = async (arr, low, high) => {
    if (low < high) {
      let mid = Math.floor((low + high) / 2);
      await sort(arr, low, mid);
      await sort(arr, mid + 1, high);
      await merge(arr, low, mid, high);
    }
  };

  const merge = async (arr, low, mid, high) => {
    let i = low;
    let j = mid + 1;
    let k = 0;
    let tempArr = [];

    while (i <= mid && j <= high) {
      if (arr[i] < arr[j]) {
        tempArr[k] = arr[i];
        i++;
        k++;
      } else {
        tempArr[k] = arr[j];
        j++;
        k++;
      }
      setPrimaryArray([...primaryArray, tempArr]);

      let bar1 = document.getElementById(i).style;
      let bar2 = document.getElementById(j).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";

      await sleep(animationSpeed);

      bar1.backgroundColor = "#FF7F50";
      bar2.backgroundColor = "#FF7F50";
    }

    while (i <= mid) {
      tempArr[k] = arr[i];

      setPrimaryArray([...primaryArray, tempArr]);

      let bar1 = document.getElementById(i).style;
      let bar2 = document.getElementById(j).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";

      await sleep(animationSpeed);

      bar1.backgroundColor = "#FF7F50";
      bar2.backgroundColor = "#FF7F50";

      i++;
      k++;
    }

    while (j <= high) {
      tempArr[k] = arr[j];

      setPrimaryArray([...primaryArray, tempArr]);

      let bar1 = document.getElementById(i).style;
      let bar2 = document.getElementById(j).style;
      bar1.backgroundColor = "#DC143C";
      bar2.backgroundColor = "#6A5ACD";

      await sleep(animationSpeed);

      bar1.backgroundColor = "#FF7F50";
      bar2.backgroundColor = "#FF7F50";

      j++;
      k++;
    }

    for (let i = low; i <= high; i++) {
      arr[i] = tempArr[i - low];
      setPrimaryArray([...primaryArray, arr]);
    }
  };

  // Quick Sort
  const quickSort = async () => {
    setAlgorithm({ name: "Quick Sort", timeComplexity: "O(n log(n))" });
    let currentArr = primaryArray;

    await sorts(currentArr, 0, currentArr.length - 1);
    finishedAnimation();
  };

  const sorts = async (arr, left, right) => {
    if (left < right) {
      let partitionIndex = partition(arr, left, right);

      setPrimaryArray([...primaryArray, arr]);
      await sleep(animationSpeed);

      await sorts(arr, left, partitionIndex - 1);
      await sorts(arr, partitionIndex + 1, right);
    }
  };

  const partition = (arr, left, right) => {
    let pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
      if (arr[j] < pivot) {
        i++;
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        let bar1 = document.getElementById(i).style;
        let bar2 = document.getElementById(j).style;
        bar1.backgroundColor = "#DC143C";
        bar2.backgroundColor = "#6A5ACD";

        setTimeout(() => {
          bar1.backgroundColor = "#ff7f50";
          bar2.backgroundColor = "#ff7f50";
        }, 200);

        setPrimaryArray([...primaryArray, arr]);
      }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[right];
    arr[right] = temp;

    return i + 1;
  };

  // Heap Sort
  const heapSort = async () => {};

  return (
    <div>
      <div className="header">
        <Button
          type="NEWARRAY"
          name="New Array"
          onClick={randomizeArray}
          disabled={disableOptions}
        />
        <Dropdown
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={disableOptions}
        />
        <Button
          onClick={handleSorting}
          type="SORT"
          name="Sort"
          disabled={disableOptions}
        />
      </div>
      <div className="sortingBars">
        {primaryArray &&
          primaryArray.map((val, key) => {
            return (
              <div
                className="bars"
                id={key}
                key={key}
                style={{ height: val }}
              ></div>
            );
          })}
      </div>
      {algorithm.name !== undefined && (
        <div className="algoInfo">
          <div>Algorithm: {algorithm.name}</div>
          <div>Time Complexity: {algorithm.timeComplexity}</div>
        </div>
      )}
    </div>
  );
};

export default Visualizer;
