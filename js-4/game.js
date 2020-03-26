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
    this.fillCellsRandom(cellsY, cellsX, colors);

    this.render = ()=>{
      this.node.className = 'game-field'
      return this.node
    }
  }

  fillCellsRandom(cellsY, cellsX, colors){
    let colorsPool = colors.flat()
    let randomPoolIndex;
    this.cells = new Array(cellsY);
    for (let y = 0; y<cellsY; y++){
      this.cells[y] = new Array(cellsX)
      for (let x = 0; x<cellsX; x++){
        randomPoolIndex = Math.round( Math.random()*colorsPool.length)-1;
        let randomColor = colorsPool.splice(randomPoolIndex,1);
        this.cells[y][x]= new Cell(randomColor[0], y, x, this.cellWidth, this.cellHight, this.node);
      }
    }
  }
  
  clickHandler(e){
    this.moveCell(+e.target.dataset.y, +e.target.dataset.x)
  }

  moveCell(y,x){
    if ( !isFinite(x) || !isFinite(y) ) return console.log('strange NaN - maybe, misclick');
    if ( this.cells[y][x+1] && this.cells[y][x+1].color==='empty' ){
      console.log('right');
      this.cells[y][x].animateRight()
      this.swapCells({y, x}, {y, x:x+1})             //includes timeout for finish animation

    }else if( this.cells[y+1] && this.cells[y+1][x].color==='empty' ){
      console.log('down');      
      this.cells[y][x].animateDown()
      this.swapCells({y, x}, {y: y+1, x})             //includes timeout for finish animation
      
    }else if( this.cells[y][x-1] && this.cells[y][x-1].color==='empty' ){
      console.log('left');
      this.cells[y][x].animateLeft()
      this.swapCells({y, x}, {y, x:x-1})             //includes timeout for finish animation

    }else if( this.cells[y-1] && this.cells[y-1][x].color==='empty' ){
      console.log('up');
      this.cells[y][x].animateUp()
      this.swapCells({y, x}, {y: y-1, x})             //includes timeout for finish animation

    }
  }

  swapCells(c1, c2){
    // disable click handling to prevent simulatinous moves
    this.node.onclick=null;

    //swap in cells array
    let tmp = this.cells[c1.y][c1.x]
    this.cells[c1.y][c1.x] = this.cells[c2.y][c2.x]
    this.cells[c2.y][c2.x] = tmp

    // swap in DOM after animation ends through deleting nodes
    // and then rebuild them from cells array
    
    setTimeout(()=>{
      
      this.cells[c1.y][c1.x].removeNode();
      this.cells[c2.y][c2.x].removeNode();
      
      this.cells[c1.y][c1.x].buildNode(c1.y, c1.x, this.node);
      this.cells[c2.y][c2.x].buildNode(c2.y, c2.x, this.node);
      
      //re-bind click handler to enable new turns
      this.node.onclick = this.clickHandler.bind(this);
    }, 150)    

  }
}





class Cell{
  constructor(cellColor, y, x,  cellWidth, cellHight, gameFieldNode ){

    this.cellWidth = cellWidth
    this.cellHight = cellHight
    this.color = cellColor
    this.buildNode(y,x,gameFieldNode)
  }

  removeNode(){
    this.node.remove();
  }

  buildNode(y,x,gameFieldNode){
    this.node = document.createElement('div')
    this.node.dataset.y = y
    this.node.dataset.x = x

    this.node.className = 'cell color-'+this.color;
    
    this.node.style.height = this.cellHight+'px'
    this.node.style.width = this.cellWidth+'px'
    this.node.style.top = this.cellHight*y+'px'
    this.node.style.left = this.cellWidth*x+'px'
    gameFieldNode.appendChild(this.node)
  }

  animateDown(){
    this.node.style.top = String(this.node.dataset.y*this.cellHight + this.cellHight) + 'px'
  }

  animateUp(){
    this.node.style.top = String(this.node.dataset.y*this.cellHight - this.cellHight) + 'px'
  }

  animateLeft(){
    this.node.style.left = String(this.node.dataset.x*this.cellWidth - this.cellWidth) + 'px'
  }

  animateRight(){
    this.node.style.left = String(this.node.dataset.x*this.cellWidth + this.cellWidth) + 'px'
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