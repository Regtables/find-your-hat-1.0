const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let playing = true;


class Field {
  constructor(field){
    this.field = field;
    this.positionX = 0;
    this.positionY = 0;
    //this.position = this.field[this.positionX][this.positionY];
  }

  //generates a field based on user input (width/height/amount of holes)
  static generateField(width, height, percentageHoles){
    
    const newField = [];
    let Xindex = 0;
    let Yindex = 0;

    //amount of holes field should have
    let amountHoles = Math.floor((percentageHoles/100)*(width*height));
    
    //creating and populating the two dimensional array
    for(let i = 0; i < width; i++){
      //creating two dimenstional array
      newField[i] = [];
      //populating with field characters('░')
      for(let j = 0; j < height; j++){
        newField[i][j] = fieldCharacter;
      }
    }

    //populating with holes('O')
    for(let i = 0; i < amountHoles; i++){
      
      //to ensure a hole does not created at the same place twice
      while(newField[Xindex][Yindex] === hole){

        Xindex = Math.floor(Math.random()*width)
        Yindex = Math.floor(Math.random()*height) 
      }
      newField[Xindex][Yindex] = hole
    }

    //populing with hat('^')
    do{
      //to ensure a hat doesnt get placed on a hole (keeps exact spesified % of holes)
      Xindex = Math.floor(Math.random()*width)
      Yindex = Math.floor(Math.random()*height)
      newField[Xindex][Yindex] = hat;
    }while(newField[Xindex][Yindex] === hole)

    //populating with player ('*')
    newField[0][0] = pathCharacter;
    //this.generateRandomStartingPosition(width, height)
  
    return newField;
  }

  //generates random starting player position
  static generateRandomStartingPosition(width, height){

    do{
      //to ensure a hat doesnt get placed on a hole (keeps exact spesified % of holes)
      this.positionX = Math.floor(Math.random()*width)
      this.positionY = Math.floor(Math.random()*height)
      newField[this.positionX][this.positionY] = pathCharacter;
    }while(newField[this.positionX][this.positionY] === hole || newField[this.positionX][this.positionY] === hat)
  }

  //prints the field to the console
  print(field = this.field){
    for(let i = 0; i < field.length; i++){
       console.log(field[i].join());
    } 
  }

  //updates field according to player movement
  updatePosition(){
    this.field[this.positionX][this.positionY] = pathCharacter;
  }

  //evaluates if player wins or loses
  winLoseCondition(){

    //player falls into a hole (current position = 'O')
    if(this.field[this.positionX][this.positionY] === hole){

      this.updatePosition();
      this.print();
      console.log('You lost! You you fell in a hole :((((')
      playing = false;

    //Player falls out of bounds / X or Y = negative // current position = undefined
    } else if(this.field[this.positionX][this.positionY] === undefined){

      this.updatePosition();
      this.print();
      console.log('You lost! You fell off the map :((((')
      playing = false;

    //Player finds hat (current position = '^')
    } else if(this.field[this.positionX][this.positionY] === hat){

      this.updatePosition();
      this.print();
      console.log('You won! You found your hat :))))')
      playing = false;
    }
  }

  //continues to print field and promt for input while user is still alive or has not yet won
  play(){
    
    while(playing === true){
      this.print();
      let move = prompt('What is your move?');
      
      //player moves up
      if(move === 'u'){

        this.positionX -= 1
        this.winLoseCondition();
        this.updatePosition();

      //player moves down
      } else if(move === 'd'){

        this.positionX += 1
        this.winLoseCondition();
        this.updatePosition();
      
      //player moves right
      } else if(move === 'r'){

        this.positionY += 1
        this.winLoseCondition();
        this.updatePosition();
      
      //player moves left
      } else if(move === 'l'){

        this.positionY -= 1
        this.winLoseCondition(); 
        this.updatePosition();

      } else{
        console.log('Please enter a valid move(u(up), d(down), l(left), r(right)');
      }
    }
  }
}

//generate field
let field = Field.generateField(5, 5, 30);
const myField2 = new Field(field);

//play game
myField2.play();

