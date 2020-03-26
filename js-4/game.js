'use strict'


class TilesGame {
  constructor(gameOptions){
    const {sizeX, sizeY, cellsX, cellsY, colors, winPattern} = gameOptions;
    this.cellWidth = sizeX/cellsX
    this.cellHight = sizeY/cellsY
    
    this.cells = []
    this.node = document.createElement('div')
    // this.node.addEventListener('click',this.clickHandler.bind(this))
    this.node.onclick = this.clickHandler.bind(this);
    this.fillCellsRandom(cellsX, cellsY, colors);

    this.render = ()=>{
      this.node.className = 'game-field'
      return this.node
    }
  }

  fillCellsRandom(cellsX, cellsY, colors){
    let colorsPool = colors.flat()
    let randomPoolIndex;
    this.cells = new Array(cellsY);
    for (let y = 0; y<cellsY; y++){
      this.cells[y] = new Array(cellsX)
      for (let x = 0; x<cellsX; x++){
        randomPoolIndex = Math.round( Math.random()*colorsPool.length)-1;
        let randomColor = colorsPool.splice(randomPoolIndex,1);
        this.cells[y][x]= new Cell(randomColor[0], x,y, this.cellWidth, this.cellHight, this.node);
      }
    }
  }
  
  clickHandler(e){
    this.moveCell(+e.target.dataset.x, +e.target.dataset.y)
  }

  moveCell(x,y){
    if ( !isFinite(x) || !isFinite(y) ) return console.log('strange NaN - maybe, misclick');
    if ( this.cells[y][x+1] && this.cells[y][x+1].color==='empty' ){
      console.log('right');

    }else if( this.cells[y+1] && this.cells[y+1][x].color==='empty' ){
      
      console.log('down');

      this.node.onclick=null;
      this.cells[y][x].moveDown()
      setTimeout(()=>{
        this.node.onclick = this.clickHandler.bind(this);
      }, 1000)
        


      
      let tmp = this.cells[y][x]
      this.cells[y][x] = this.cells[y+1][x]
      this.cells[y+1][x] = tmp


    }else if( this.cells[y][x-1] && this.cells[y][x-1].color==='empty' ){
      console.log('left');

    }else if( this.cells[y-1] && this.cells[y-1][x].color==='empty' ){
      console.log('up');

    }
  }


}

class Cell{
  constructor(cellColor, x, y, cellWidth, cellHight, gameField ){

    this.cellWidth = cellWidth
    this.cellHight = cellHight

    this.color = cellColor

    this.node = document.createElement('div')
    this.node.dataset.y = y
    this.node.dataset.x = x

    this.node.className = 'cell color-'+cellColor;
    
    this.node.style.height = cellHight+'px'
    this.node.style.width = cellWidth+'px'
    this.node.style.top = cellHight*y+'px'
    this.node.style.left = cellWidth*x+'px'
    gameField.appendChild(this.node)
  }

  moveDown(){

    this.node.style.top = String(this.node.dataset.y*this.cellHight + this.cellHight) + 'px'
    
  }

}

const gameOptions1 = {
  sizeX:400,
  sizeY:400,
  cellsX: 4,
  cellsY: 4,
  colors: [1,2,3,4].map( n => ['green', 'yellow', 'blue', 'red']),
  winPatterns:[[
    ['yellow', 'any', 'any', 'any'],
    ['yellow', 'any', 'any', 'any'],
    ['yellow', 'any', 'any', 'any'],
    ['yellow', 'any', 'any', 'any'],
  ],
  [
    ['blue', 'blue', 'blue', 'blue'],
    ['any', 'any', 'any', 'any'],
    ['any', 'any', 'any', 'any'],
    ['any', 'any', 'any', 'any'],
  ],
  [
    ['any', 'any', 'any', 'red'],
    ['any', 'any', 'red', 'any'],
    ['any', 'red', 'any', 'any'],
    ['red', 'any', 'any', 'any'],
  ]]
}
gameOptions1.colors[0][0]='empty'

const game = new TilesGame(gameOptions1);
console.log('[game]', game);

document.querySelector('#game-wrapper').appendChild( game.render() )