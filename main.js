import { Tile } from './Tile.js';

// Setup Canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 2;

// Setup Grid & Tile Properties
let tiles = [];
let selectedTile = {};

const grid = {
  width: 5,
  height: 5,
};
const tileProps = {
  size: 50,
  height: 25,
};

function makeGrid(grid, selectedTile) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  tiles = [];

  for (var row = 0; row < grid.width; row++) {
    for (var col = 0; col < grid.height; col++) {
      let tileX =
        canvas.width / 2 + row * tileProps.size - col * tileProps.size;
      let tileY =
        tileProps.size * 1.5 +
        row * tileProps.size * 0.5 +
        col * tileProps.size * 0.5;
      let tileColor = row == 0 || row == grid.width - 1 ? 'green' : 'gray';
      if (col == 0 || col == grid.height - 1) {
        tileColor = 'green';
      }
      let rightWall = row == grid.width - 1;
      let leftWall = col == grid.height - 1;

      const tile = new Tile(
        `${row}${col}`,
        tileX,
        tileY,
        tileProps.size,
        tileProps.height,
        tileColor,
        leftWall,
        rightWall,
        ctx
      );
      tiles.push(tile);
      tile.draw();
    }
  }
  if (selectedTile?.id) {
    ctx.strokeStyle = 'red';
    ctx.stroke(tiles.find((tile) => tile.id === selectedTile.id));
    ctx.strokeStyle = 'black';
  }
}

makeGrid(grid);

canvas.addEventListener('mousemove', (e) => handleMove(e));
canvas.addEventListener('click', (e) => handleClick(e));

function handleClick(e) {
  const canvasInfo = canvas.getBoundingClientRect();
  let tileClicked = false;

  tiles.forEach((tile) => {
    if (
      ctx.isPointInPath(
        tile,
        e.clientX - canvasInfo.left,
        e.clientY - canvasInfo.top
      )
    ) {
      tileClicked = true;
      selectedTile = tile;
      makeGrid(grid, selectedTile);
    }
  });

  if (!tileClicked) {
    selectedTile = null;
    makeGrid(grid, selectedTile);
  }
}

function handleMove(e) {
  const canvasInfo = canvas.getBoundingClientRect();
  let hightlightTile;

  tiles.forEach((tile) => {
    if (
      ctx.isPointInPath(
        tile,
        e.clientX - canvasInfo.left,
        e.clientY - canvasInfo.top
      )
    ) {
      hightlightTile = tile;
    }
  });

  makeGrid(grid, selectedTile);

  // if highlightTile is already the selected tile, don't paint anything yellow
  if (hightlightTile && hightlightTile?.id != selectedTile?.id) {
    ctx.strokeStyle = 'yellow';
    ctx.stroke(hightlightTile);
    ctx.strokeStyle = 'black';
  }

  // Set highlightTile to null since it's already been painted
  hightlightTile = null;
}
