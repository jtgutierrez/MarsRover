const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

//variables
let grid;
let currentLocation;
let moves;

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
  return input.split(",");
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
  readline.close();
  if (grid) {
    navigateRovers();
  }
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
      readline.question("Enter the moves as R,M,L,L,R...: ", (val) =>
        movesCallback(val, grid, location)
      );
      break;
  }
};

//main
const navigateRovers = () => {
  while (moves.length) {}
};

prompt("start");
