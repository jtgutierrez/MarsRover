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
  return [Number(x), Number(y), z.toUpperCase()];
};
const formatMoves = (input) => {
  return input.split("").join("");
};

//callbacks
let gridCallback = (northeastCorner) => {
  grid = createGrid(northeastCorner);
  prompt("location", grid);
};
let locationCallback = (location, grid) => {
  currentLocation = formatLocation(location);
  prompt("move", grid, currentLocation);
};
let movesCallback = (move, grid, currentLocation) => {
  moves = formatMoves(move);
  if (grid) {
    navigateRovers();
  }
  readline.pause();
};

//prompts
const prompt = (option, grid, location) => {
  switch (option) {
    case "start":
      readline.question(
        "Enter the northeast corner coordinates as x,y: ",
        gridCallback
      );
      break;
    case "location":
      readline.question("Enter the location as x,y,z: ", (val) =>
        locationCallback(val, grid)
      );
      break;
    case "move":
      readline.question("Enter the moves as RMLLR...: ", (val) =>
        movesCallback(val, grid, location)
      );
      break;
  }
};

//variables
let grid;
let currentLocation;
let moves;

//main
const navigateRovers = () => {
  let direction = currentLocation.pop();
  let [x, y] = currentLocation;
  let allDirections = ["N", "E", "S", "W"];
  let idx = allDirections.indexOf(direction);
  let map = { N: 1, S: -1, E: 1, W: -1 };

  for (let i = 0; i < moves.length; i++) {
    let move = moves[i];

    if (move === "L" || move === "R") {
      move === "L" ? (idx -= 1) : (idx += 1);
      idx < 0
        ? (idx = (idx % allDirections.length) + allDirections.length)
        : (idx = idx % allDirections.length);
      direction = allDirections[idx];
    } else if (move === "M") {
      if (direction === "N" || direction === "S") {
        y += map[direction];
      } else {
        x += map[direction];
      }
    }
    // console.log([x, y, direction]);
  }
  console.log(x, y, direction);
};

prompt("start");
