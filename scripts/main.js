$(() => {

  console.log('hello')

  const gameGridTotal = 240
let gameSpeed = 750

  let gridLocationsOccupied = []

  // const startPosition = 34
  const gameGridArray = []
  const tetriSequence = []
  let tetriCount = 0
  const $gridSquares = $('.square')
  const gridShift = 40


  class Tetrimino {
    constructor(tetriName){
      this.tetriName = tetriName
      this.tetriFalling = true
    }

    // showLocation(){
    //   const tempArray = []
    //   for (let i=0; i<this.shape.length; i++) {
    //     tempArray.push(this.anchor+this.shape[i])
    //   }
    //   return `${tempArray}`
    // }


    hitSomething() {
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        const gridLocationBelow = this.shape[i]+10 //every pixel below
        if (gridLocationBelow >= 240) {
          return true
        } else if (gridLocationsOccupied.includes(gridLocationBelow)) {
          return true
        }
      }
      return false
    }


    fall(){
      for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
        this.shape[i] += 10 //every pixel below
      }
      if (this.hitSomething()) {
        this.tetriFalling = false //stop block falling

        for (let i=0; i<this.shape.length; i++) { //loop through each shape pixel
          gridLocationsOccupied.push(this.shape[i]) //and to occupied list
        }
        console.log(`Occupied: ${gridLocationsOccupied}`)
      }
    }


    move(direction){
      console.log('Anchor: '+this.anchor)
      switch (direction) {
        case 'left':
          if (gameGridArray[this.anchor-1]===0){
            console.log(`${this.type} << Moving left`)
            gameGridArray[this.anchor]=0 //declare empty
            this.anchor--
          }
          break
        case 0:
          console.log(`${this.type} - Not Moving -`)
          break
        case 'right':
          if (gameGridArray[this.anchor+1]===0){
            console.log(`${this.type} Moving Right >>`)
            gameGridArray[this.anchor]=0 //declare empty
            this.anchor++
          }
          break
      }
    }

    drawTeri() {

      const gridLocations = []
      for (let i=0; i<this.shape.length; i++) {
        gridLocations.push(this.shape[i])
        const gridLocationShifted = this.shape[i]-gridShift

        if (gridLocationShifted >= 0) {
          $gridSquares.siblings().eq(gridLocationShifted).addClass(`${this.color}`)
        }
      }
      console.log(`Tetri @ ${gridLocations}`)
    }

    destroy() {
      // tetriSequence = tetriSequence.filter( u => {
      //   return u.
      // })
    }

  }


  class TetriA extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'red'
      this.shape = [30, 20, 21, 31]
    }
  }

  class TetriB extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'green'
      this.shape = [30,31,21,11]
    }
  }

  class TetriC extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'blue'
      this.shape = [30,20,10,0]
    }
  }

  class TetriD extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'orange'
      this.shape = [30,31,21,32]
    }
  }

  class TetriE extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'pink'
      this.shape = [30,31,20,10]
    }
  }


  class TetriF extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'cyan'
      this.shape = [30,31,21,22]
    }
  }

  class TetriG extends Tetrimino{
    constructor(teriName, tetriFalling){
      super(teriName, tetriFalling)
      this.color = 'purple'
      this.shape = [31,32,20,21]
    }
  }



  function tetriNew() {
    let tetriBaby = 0
    const tetriNum = (Math.floor(Math.random() * 7)+1) //find random
    // console.log('New Tetrimino Type: '+ tetriNum)
    switch (tetriNum) {
      case 1:
        tetriBaby = new TetriA('a')
        break
      case 2:
        tetriBaby = new TetriB('b')
        break
      case 3:
        tetriBaby = new TetriC('c')
        break
      case 4:
        tetriBaby = new TetriD('d')
        break
      case 5:
        tetriBaby = new TetriE('e')
        break
      case 6:
        tetriBaby = new TetriF('f')
        break
      case 7:
        tetriBaby = new TetriG('g')
        break
    }
    tetriSequence.push(tetriBaby)
    tetriCount++
    console.log('Total Tetriminos: '+ tetriCount)
  }


  function anyFalling() {
    // console.log('tetriSequence.length: '+ tetriSequence.length)
    if (tetriSequence.length === 0) {
      return false // New game coniditon
    } else if (tetriSequence[tetriSequence.length-1].tetriFalling) {
      return true
    } else {
      return false
    }
  }





  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
        tetriSequence[(tetriSequence.length-1)].move('left')
        console.log('left')
        break
      case 38:
        console.log('up')
        clearInterval(gameLoop)
        break
      case 39: // right
        tetriSequence[tetriSequence.length-1].move('right')
        console.log('right')
        break
      case 40: // down
        console.log('down')
        break
      default: return // exit this handler for other keys
    }
    e.preventDefault() // prevent the default action (scroll / move caret)
  })


  function linearArray(array, length, defaultValue){
    for(var i=0; i < length; i++){
      array.push(defaultValue)
    }
  }

  linearArray(gameGridArray,gameGridTotal,0)

  function gridClear(){
    $gridSquares.siblings().removeClass('red')
    $gridSquares.siblings().removeClass('green')
    $gridSquares.siblings().removeClass('blue')
    $gridSquares.siblings().removeClass('orange')
    $gridSquares.siblings().removeClass('cyan')
    $gridSquares.siblings().removeClass('pink')
    $gridSquares.siblings().removeClass('purple')
    $gridSquares.siblings().addClass('empty')
  }




  //
  // function gameOver(){
  //   // console.log('Lowest value: '+ Math.min(...occupiedArray))
  // }
  //
  // function listNonZero() {
  //   occupiedArray = []
  //   for(var i=0; i < gameGridArray.length; i++){
  //     if (gameGridArray[i] != 0) {
  //       occupiedArray.push(i)
  //     }
  //   }
  //   console.log('Occupied: '+occupiedArray)
  // }

  function clockTick() {
    console.log('--------------')
    if (anyFalling()=== false) {
      tetriNew()
    }

    gridClear()


    tetriSequence[tetriSequence.length-1].fall()

    //draws all block
    for (var i=0; i < tetriSequence.length; i++) {
      // console.log(i + ': '+ tetriSequence[i].tetriName)
      tetriSequence[i].drawTeri()
    }

    //draw Move bloc


    //Draw non-moving shapes
    // for(var i=0; i < tetriSequence.length-1; i++) {
    //   console.log(i + ': '+tetriSequence[i].showLocation(gameGridArray))
    //   tetriSequence[i].draw(gameGridArray, $gridSquares)
    // }
    //
    // //Draw moving shape
    // tetriSequence[tetriSequence.length-1].clearGridLocation(gameGridArray)
    // tetriSequence[tetriSequence.length-1].fall(gameGridArray)
    // tetriSequence[tetriSequence.length-1].draw(gameGridArray, $gridSquares)
    // listNonZero(gameGridArray)
    // gameOver()
  }

  console.log(gameGridArray)

const gameLoop = setInterval(clockTick,gameSpeed)








})
