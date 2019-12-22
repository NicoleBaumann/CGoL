var row = document.getElementById('height').value
var column = document.getElementById('width').value
var cellSize = document.getElementById('cellSize').value + 'px'
var grid = new Array(row)
var dead = 'rgb(255, 255, 255)'
var alive = 'rgb(19, 105, 180)'
var lived = 'rgb(111, 179, 240)'
var play = true
var stoppGenCount = true
var generationCount = 0

var gamefieldGrid = document.getElementById('gamefield')
document.getElementById('gamefield').innerHTML = ''

var divGrid = document.createElement('div')

for (var i = 0; i < column; i++) {
  grid[i] = new Array(row)
};

for (var h = 0; h < column; h++) {
  var gridrow = document.createElement('div')
  gridrow.className = 'row'

  for (var j = 0; j < row; j++) {
    var gridButton = document.createElement('button')
    gridButton.style.width = cellSize
    gridButton.style.height = cellSize
    gridButton.className = 'button'
    gridButton.onclick = changeState
    gridButton.style.backgroundColor = dead
    grid[h][j] = gridButton

    gridrow.appendChild(grid[h][j])
  }
  divGrid.appendChild(gridrow)
};

gamefieldGrid.appendChild(divGrid)

function resize () {
  gamefieldGrid = document.getElementById('gamefield')
  document.getElementById('gamefield').innerHTML = ''

  divGrid = document.createElement('div')

  grid = new Array(row)
  for (var i = 0; i < column; i++) {
    grid[i] = new Array(row)
  };

  for (var k = 0; k < column; k++) {
    var gridrow = document.createElement('div')
    gridrow.className = 'row'

    for (var j = 0; j < row; j++) {
      var gridButton = document.createElement('button')
      gridButton.style.width = cellSize
      gridButton.style.height = cellSize
      gridButton.className = 'button'
      gridButton.onclick = changeState
      gridButton.style.backgroundColor = dead
      grid[k][j] = gridButton

      gridrow.appendChild(grid[k][j])
    }
    divGrid.appendChild(gridrow)
  };

  gamefieldGrid.appendChild(divGrid)
}

function changeState () {
  if (this.style.backgroundColor === dead) {
    this.style.backgroundColor = alive
  } else if (this.style.backgroundColor === alive) {
    this.style.backgroundColor = dead
  }
}

function checkCellStates () {
  if (play === true) {
    var tempGrid = copyGrid()
    var compareTempGrid = copyGrid()

    for (var j = 0; j < row; j++) {
      var countAliveNeighbours = 0

      for (var i = 0; i < column; i++) {
        for (var k = -1; k < 2; k++) {
          for (var l = -1; l < 2; l++) {
            if (k === 0 && l === 0) {

            } else {
              var tempK = j + k
              var tempL = i + l

              if (j === 0 && tempK === -1) {
                tempK = row - 1
              }

              if (i === 0 && tempL === -1) {
                tempL = column - 1
              }

              if (j === parseInt(row) - 1 && tempK === parseInt(row)) {
                tempK = 0
              }

              if (i === parseInt(column) - 1 && tempL === parseInt(column)) {
                tempL = 0
              }

              if (tempGrid[tempK][tempL] === alive) {
                countAliveNeighbours++
              }

              if (play === false) {
                return
              }
            }
          }
        }

        if (countAliveNeighbours === 2 && tempGrid[j][i] === alive) {
          grid[j][i].style.backgroundColor = alive
          compareTempGrid[j][i] = alive
          stoppGenCount = false
        } else if (countAliveNeighbours === 3) {
          grid[j][i].style.backgroundColor = alive
          compareTempGrid[j][i] = alive
          stoppGenCount = false
        } else if (tempGrid[j][i] === alive) {
          grid[j][i].style.backgroundColor = lived
          compareTempGrid[j][i] = lived
        }

        countAliveNeighbours = 0
      };
    }
    if (JSON.stringify(tempGrid) === JSON.stringify(compareTempGrid)) {
      play = false
    }
  }

  if (stoppGenCount === false) {
    generationCount++
  }
  document.getElementById('generation').innerHTML = generationCount
  setTimeout(function () {
    checkCellStates()
  }, 500)
}

function copyGrid () {
  var secondGrid = new Array(row)

  for (var i = 0; i < column; i++) {
    secondGrid[i] = new Array(row)
  };

  for (var h = 0; h < column; h++) {
    for (j = 0; j < row; j++) {
      secondGrid[h][j] = grid[h][j].style.backgroundColor
    }
  }
  return secondGrid
}

function clearGrid () {
  play = false
  stoppGenCount = true
  generationCount = 0
  document.getElementById('generation').innerHTML = generationCount
  resize()
}

function pauseGame () {
  play = false
  stoppGenCount = true
}

function startGame () {
  play = true
  checkCellStates()
}

function insertLevel () {
  clearGrid()
  var inputLevel = document.getElementById('level').value
  var levelArray = inputLevel.split('\n')
  var tempColumn = 0
  for (var h = 0; h < levelArray.length; h++) {
    if (levelArray[h][0] === '0' || levelArray[h][0] === '1') {
      tempColumn++
    }
  }
  if (tempColumn > column) {
    column = tempColumn
    resize()
  }

  var tempRow = 0
  for (var k = 0; k < levelArray.length; k++) {
    for (var l = 0; l < levelArray[k].length; l++) {
      if (levelArray[k][l] === '0' || levelArray[k][l] === '1') {
        tempRow++
      }
    }
    if (tempRow > row) {
      if (levelArray[k] !== '') {
        row = tempRow
        resize()
      }
    }
  }

  for (var i = 0; i < levelArray.length; i++) {
    for (var j = 0; j < levelArray[i].length; j++) {
      if (levelArray[i][j] === '1') {
        grid[i][j].style.backgroundColor = alive
      }
    }
  }
  // for (var i = 0; i < )
}

function setSize () {
  row = document.getElementById('width').value
  column = document.getElementById('height').value
  cellSize = document.getElementById('cellSize').value + 'px'
  resize()
}
