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
  return input.split("");
};

//callbacks
let gridCallback = (northeastCorner) => {
  grid = createGrid(northeastCorner);
  return prompt("location", grid);
};
let locationCallback = (location, grid) => {
  currentLocation = formatLocation(location);
  return prompt("move", grid, currentLocation);
};
let movesCallback = (move, grid, currentLocation) => {
  moves = formatMoves(move);
  readline.pause();
  if (grid) {
    navigateRovers();
  }
};

//prompts
const prompt = (option, grid, location) => {
  switch (option) {
    case "start":
      return readline.question(
        "Enter the northeast corner coordinates as x,y: ",
        gridCallback
      );
    case "location":
      return new Promise((resolve) => {
        readline.question("Enter the location of the rover as x,y,z: ", (val) =>
          resolve(locationCallback(val, grid))
        );
      });
    case "move":
      return new Promise((resolve) => {
        readline.question("Enter the move instructions as RMLLR...: ", (val) =>
          resolve(movesCallback(val, grid, location))
        );
      });
  }
};

//variables
let grid;
let currentLocation;
let moves;

//main
const navigateRovers = async () => {
  let allDirections = ["N", "E", "S", "W"];
  let map = { N: 1, S: -1, E: 1, W: -1 };
  while (moves.length) {
    let [x, y, direction] = currentLocation;
    let idx = allDirections.indexOf(direction);
    let move = moves.shift();

    if (move === "L" || move === "R") {
      move === "L" ? (idx -= 1) : (idx += 1);
      idx < 0
        ? (idx = (idx % allDirections.length) + allDirections.length)
        : (idx = idx % allDirections.length);
      direction = allDirections[idx];
    } else if (move === "M") {
      if (direction === "N" || direction === "S") {
        let newYCoords = y + map[direction];
        if (newYCoords >= 0 && newYCoords < grid.length) {
          y += map[direction];
        }
      } else {
        let newXCoords = x + map[direction];
        if (newXCoords >= 0 && newXCoords < grid[0].length) {
          x += map[direction];
        }
      }
    }
    currentLocation = [x, y, direction];

    if (!moves.length) {
      console.log(x, y, direction);
      await prompt("location");
    }
  }
};

prompt("start");
