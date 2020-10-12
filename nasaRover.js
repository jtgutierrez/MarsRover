const { create } = require("domain");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const navigateRover = (northeastCorner) => {
  const grid = createGrid(northeastCorner);
  console.log(grid);
};

const createGrid = (northeastCorner) => {
  let [x, y] = northeastCorner.split(",");

  let grid = [];

  for (let i = 0; i <= Number(y); i++) {
    grid.push(new Array(Number(x) + 1).fill(0));
  }

  return grid;
};

readline.question(
  "Enter the northeast corner coordinates as x,y: ",
  (northeastCorner) => {
    readline.close();
    return navigateRover(northeastCorner);
  }
);
