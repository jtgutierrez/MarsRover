const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

//helper functions
const createGrid = (northeastCorner) => {
  let [x, y] = northeastCorner.split(",");
  let grid = [];
  for (let i = 0; i <= Number(y); i++) {
    grid.push(new Array(Number(x) + 1).fill(0));
  }
  return grid;
};

const formatLocation = (input) => {
  let [x, y, z] = input.split(",");
  return [Number(x), Number(y), z];
};
const formatMoves = (input) => {
  return input.split(",");
};

//callbacks
let gridCallback = (northeastCorner) => {
  readline.close();
  grid = createGrid(northeastCorner);
  navigateRovers();
};
let locationCallback = (location) => {
  readline.close();
  currentLocation = formatLocation(location);
};
let movesCallback = (moves) => {
  readline.close();
  moves = formatMoves(moves);
};

//prompts
const prompt = (option) => {
  switch (option) {
    case "start":
      readline.question(
        "Enter the northeast corner coordinates as x,y: ",
        gridCallback
      );
      break;
    case "location":
      readline.question("Enter the location as x,y,z", locationCallback);
      break;
    case "move":
      readline.question("Enter the moves as R,M,L,L,R...", movesCallback);
      break;
  }
};

// variables
let grid;
let currentLocation;
let moves;

//main
const navigateRovers = () => {
  console.log(grid);
};

prompt("start");
