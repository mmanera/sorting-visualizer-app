import React from 'react';
import './SortingVisualizer.css'
import {getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'
import {getSelectionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'
import {getInsertionSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'
import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'
import {getQuickSortAnimations} from '../sortingAlgorithms/sortingAlgorithms'

// debug
// const ANIMATION_SPEED_MS = 1500;
// const NUMBER_OF_BARS = 50;
const ANIMATION_SPEED_MS = 1.5;
const NUMBER_OF_BARS = 150;

const BAR_COLOR = 'green';
const HIGHLIGHT_COLOR = 'white';			

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [],
		};
	}

	componentDidMount() {			
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < NUMBER_OF_BARS; i++) {		
			array.push(randomIntFromInterval(5,500));
		}
		this.setState({array});
	}

	// todo option for almost sorted array.

	bubbleSort() {
		const animations = getBubbleSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;
			if(isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? HIGHLIGHT_COLOR : BAR_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				if(animations[i][0] === true) {
					setTimeout(() => {
						const [holder, barTwoIdx, newHeight] = animations[i];
						const barTwoStyle = arrayBars[barTwoIdx].style;
						const barOneStyle = arrayBars[barTwoIdx - 1].style;
						barOneStyle.height = barTwoStyle.height;
						barTwoStyle.height = `${newHeight}px`;
					}, i * ANIMATION_SPEED_MS);	
				}
			}
		}
	}

	selectionSort() {
		const animations = getSelectionSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			if(animations[i][0] === "color") {
				const [holder, barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 2 === 0 ? HIGHLIGHT_COLOR : BAR_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				if(animations[i][0] === true) {
					setTimeout(() => {
						const [holder, barOneIdx, newHeight, lastIndex] = animations[i];
						const barTwoStyle = arrayBars[lastIndex].style;
						const barOneStyle = arrayBars[barOneIdx].style;
						barOneStyle.height = barTwoStyle.height;
						barTwoStyle.height = `${newHeight}px`;
					}, i * ANIMATION_SPEED_MS);	
				}
			}
		}
	}

	insertionSort() {
		const animations = getInsertionSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			if(animations[i][0] === "color") {
				const [holder, barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 2 === 0 ? HIGHLIGHT_COLOR : BAR_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				if(animations[i][0] === true) {
					setTimeout(() => {
						const [holder, barIIdx, barMinusOneIdx] = animations[i];
						const barIStyle = arrayBars[barIIdx].style;
						const barMinusOneStyle = arrayBars[barMinusOneIdx].style;
						barIStyle.height = barMinusOneStyle.height;
					}, i * ANIMATION_SPEED_MS);	
				} else if (animations[i][0] === "insert"){
					setTimeout(() => {
						const [holder, idxToInsert, heightToInsert] = animations[i];
						const barIStyle = arrayBars[idxToInsert].style;
						barIStyle.height = `${heightToInsert}px`;
					}, i * ANIMATION_SPEED_MS);	
				}
			}
		}
	}
	
	quickSort() {
		const animations = getQuickSortAnimations(this.state.array);
		console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			if(animations[i][0] === "color") {
				const [holder, barIIdx, barPivot] = animations[i];
				const barIStyle = arrayBars[barIIdx].style;
				const barPivotStyle = arrayBars[barPivot].style;
				const color = i % 2 === 0 ? HIGHLIGHT_COLOR : BAR_COLOR;
				setTimeout(() => {
					barIStyle.backgroundColor = color;
					barPivotStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				if(animations[i][0] === true) {
					setTimeout(() => {
						const [holder, barIIdx, barPartitionIdx, newHeight] = animations[i];
						const barIIdxStyle = arrayBars[barIIdx].style;
						const barPartitionIdxStyle = arrayBars[barPartitionIdx].style;
						barPartitionIdxStyle.height = barIIdxStyle.height;
						barIIdxStyle.height = `${newHeight}px`;
					}, i * ANIMATION_SPEED_MS);	
				}
			}
		}
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;										// T T F T T F T T F T T F T T F
			if (isColorChange) {
				const [barOneIdx, barTwoIdx] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = i % 3 === 0 ? HIGHLIGHT_COLOR : BAR_COLOR;   			// T F F T F F T F F T F F T F F
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
	}

	// todo radix() {}

	// todo bogosort() {}

	render() {
		const {array} = this.state;
	
		return (
			<div className="array-container">
			{array.map((value, idx) => (
				<div 
				className="array-bar"
				key={idx}
				style={{
					backgroundColor: BAR_COLOR,
					height: `${value}px`
				}}></div>			
			))}
				<div>
				<button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
				<button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
				<button className="button" onClick={() => this.selectionSort()}>Selection Sort</button>
				<button className="button" onClick={() => this.insertionSort()}>Insertion Sort</button>
				<button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
				<button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
				</div>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length !== arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
	  if (arrayOne[i] !== arrayTwo[i]) {
		return false;
	  }
	}
	return true;
}

// function testSortingAlgorithms() {
// 	for (let i = 0; i < 200; i++) {
// 	  const array = [];
// 	  const length = randomIntFromInterval(1, 1000);
// 	  for (let i = 0; i < length; i++) {
// 		array.push(randomIntFromInterval(-1000, 1000));
// 	  }
// 	  const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
// 	  const sortedArray = CHOOSE_SORT_ALGO(array.slice());
// 	  console.log(arraysAreEqual(javaScriptSortedArray, sortedArray));
// 	//   console.log('system: ' + javaScriptSortedArray);
// 	//   console.log('algo: ' + sortedArray);
// 	}
// }