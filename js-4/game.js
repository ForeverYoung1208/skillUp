'use strict'

class TilesGame {
  constructor(gameOptions){
    const {sizeX, sizeY, colors, winPattern} = gameOptions;
    
    this.cells = new Array(sizeY);
    this.fillCellsRandom(sizeX, sizeY, colors);
    this.gameOptions = gameOptions;

    this.render = ()=>{
      const gameField = document.createElement('div')
      gameField.className = 'gameField__wrapper'
      gameField.cells = this.cells
      return gameField
    }
  }

  fillCellsRandom(sizeX, sizeY, colors){
    let colorsPool = colors.flat()
    let randomPoolIndex;
    for (let i = 0; i<sizeY; i++){
      this.cells[i] = new Array(sizeX)
      for (let j = 0; j<sizeX; j++){
        randomPoolIndex = Math.round( Math.random()*colorsPool.length)-1;
        let randomColor = colorsPool.splice(randomPoolIndex,1);
        this.cells[i][j]= new Cell(randomColor[0]);
      }
    }

  }

}

class Cell{
  constructor(cellColor){
    this.cellColor = cellColor;
  }
}

const gameOptions1 = {
  sizeX: 4,
  sizeY: 4,
  colors: [1,2,3,4].map( n => ['green', 'yellow', 'blue', 'red']),
  winPattern:[
    ['yellow', 'any', 'any', 'any'],
    ['yellow', 'any', 'any', 'any'],
    ['yellow', 'any', 'any', 'any'],
    ['yellow', 'any', 'any', 'any'],
  ]
}
gameOptions1.colors[0][0]='empty'

const game = new TilesGame(gameOptions1);
console.log('[game]', game);

document.querySelector('body').appendChild( game.render())