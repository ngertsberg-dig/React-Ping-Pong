import React from 'react';

import './index.sass';
import PlayerPaddle from './components/PlayerPaddle';
import AIPaddle from './components/AIPaddle';
import Ball from './components/Ball';

class App extends React.Component{
  state={
    gameWinner: null,
    gameOver: false,
    gameLoading: true,
    ball:{
      width: 20,
      height: 20,
      top: 0,
      left: 0,
      direction: "-",
      moveSpeed: 15,
      ballCollision: false,
      directionY: "none",
      directionYSpeed: 5
    },
    paddle: {
      top: 0,
      height: 100,
      width: 10,
      moveSpeed: 5,
      movingDown: false,
      movingUp: false
    },
    AIPaddle: {
      top: 0,
      height: 100,
      width: 10,
      moveSpeed: 0,
      left: 0
    }
  }

  constructor(){
    super();
    this.updatePaddleTop = this.updatePaddleTop.bind(this);
    this.updateBall = this.updateBall.bind(this);
    this.collidedWithPlayer = this.collidedWithPlayer.bind(this);
    this.stopBall = this.stopBall.bind(this);
    this.collideWithWall = this.collideWithWall.bind(this);
    this.updateAI = this.updateAI.bind(this);
    this.collidedWithAI = this.collidedWithAI.bind(this);
    this.playerLost = this.playerLost.bind(this);
    this.aiLost = this.aiLost.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.playerPaddleMovementStart= this.playerPaddleMovementStart.bind(this);
    this.playerPaddleMovementStop = this.playerPaddleMovementStop.bind(this);
  }

  componentDidMount(){
    const Player = document.querySelector("#PlayerPaddle");
    const Board = document.querySelector("#GameBoard");
    const Ball = document.querySelector("#Ball");
    this.setPositions(Board);
  }
  incrementBallSpeed(){
    this.setState(state=>{
      let newBall = {...state.ball};
      newBall.moveSpeed = state.ball.moveSpeed + 2;
      return { ball: newBall }
    })
  }
  setDifficulty(e){
    const difficulty = parseInt(e.target.getAttribute("data-level"));
    this.setState(state=>{
      let newAI = {...state.AIPaddle};
      newAI.moveSpeed = difficulty;
      return { AIPaddle: newAI }
    },()=>{this.startGame()});
    
  }
  playerPaddleMovementStop(key){
    const keyCode = key.keyCode;
    const moveUpKeyCode = 87;
    const moveDownKeyCode = 83;
    this.setState(state=>{
      let newPaddle = { ...state.paddle};
      if(keyCode === moveUpKeyCode){
        newPaddle.movingUp = false;
      }
      if(keyCode === moveDownKeyCode){
        newPaddle.movingDown = false;
      }
      return { paddle: newPaddle }
    })
  }

  playerPaddleMovementStart(key){
    const keyCode = key.keyCode;
    const moveUpKeyCode = 87;
    const moveDownKeyCode = 83;
    this.setState(state=>{
      let newPaddle = { ...state.paddle};
      if(keyCode === moveUpKeyCode){
        newPaddle.movingUp = true;
      }
      if(keyCode === moveDownKeyCode){
        newPaddle.movingDown = true;
      }
      return { paddle: newPaddle }
    })
  }

  startGame(){
    this.setState({ gameLoading: false });
    setTimeout(()=>{
      setInterval(()=>{
        this.incrementBallSpeed();
      },3000)
    },10000)
  }
  setPositions(Board){
    //set initial positions
    let newBall = {...this.state.ball};
    newBall.top = (Board.clientHeight / 2) - (newBall.top / 2);
    newBall.left = (Board.clientWidth / 2) - (newBall.left / 2);

    let newPaddle = {...this.state.paddle};
    newPaddle.top = (Board.clientHeight / 2) - (newPaddle.height / 2);

    let newAIPaddle = {...this.state.AIPaddle};
    newAIPaddle.top = (Board.clientHeight / 2) - (newPaddle.height / 2);
    newAIPaddle.left = Board.clientWidth - newAIPaddle.width;
    this.setState({ ball:newBall, paddle:newPaddle, AIPaddle: newAIPaddle });
  }

  updateAI(newTop){
    this.setState(state => {
      let newPaddle = {...state.AIPaddle};
      newPaddle.top = newTop;
      return { AIPaddle: newPaddle }
    })
  }

  updatePaddleTop(newTop){
    this.setState(state => {
      let newPaddle = {...state.paddle};
      newPaddle.top = newTop;
      return { paddle: newPaddle }
    })
  }

  stopBall(){
    this.setState(state=>{
      let newBall = {...state.ball}
      newBall.ballCollision = true;
      return { ball: newBall };
    })
  }

  collideWithWall(){
    this.setState(state=>{
      let newBall = {...state.ball}
      newBall.directionY = newBall.directionY === "+" ? "-" : "+";
      return { ball: newBall };
    })
  }

  collidedWithAI(newY){
    this.setState(state=>{
      let newBall = {...state.ball}
      newBall.direction = "-";
      newBall.directionY = newY;
      return { ball: newBall };
    })
  }

  collidedWithPlayer(newY){
    this.setState(state=>{
      let newBall = {...state.ball}
      newBall.direction = "+";
      newBall.directionY = newY;
      return { ball: newBall };
    })
  }
  
  updateBall(x,y){
    this.setState(state => {
      let newBall = {...state.ball};
      newBall.top = y;
      newBall.left= x;
      return { ball: newBall }
    })
  }

  playerLost(){
    this.setState({gameOver:true,gameWinner:"AI"});
  }
  aiLost(){
    this.setState({gameOver:true, gameWinner:"Player"})
  }

  restartGame(){
    window.location.reload()
  }

  render(){
    return (
      <div className="App" id = 'GameBoard'>
        {
          this.state.gameLoading ? 
                null 
              :
                <React.Fragment>

                  <PlayerPaddle
                    gameOver = {this.state.gameOver} 
                    updatePaddleTop = {this.updatePaddleTop} 
                    paddleState = {this.state.paddle} 
                    playerPaddleMovementStart = {this.playerPaddleMovementStart}
                    playerPaddleMovementStop = {this.playerPaddleMovementStop}
                  />

                  <Ball
                    playerLost = {this.playerLost}
                    gameOver = {this.state.gameOver} 
                    collideWithWall={this.collideWithWall} 
                    stopBall = {this.stopBall} 
                    collidedWithPlayer = {this.collidedWithPlayer} 
                    updateBall = {this.updateBall} 
                    ballState = {this.state.ball} 
                    paddleState = {this.state.paddle} 
                    aiPaddleState = {this.state.AIPaddle}
                    collidedWithAI = {this.collidedWithAI}
                    aiLost = {this.aiLost}
                  />

                  <AIPaddle
                    gameOver = {this.state.gameOver} 
                    updateAI = {this.updateAI}
                    paddleState = {this.state.AIPaddle} 
                    ballState = {this.state.ball}
                  />
                </React.Fragment>
        }
        { this.state.gameLoading && (
          <div id = 'select-difficulty'>
            <div id = 'gameControls'>
              <div id = 'keys'>
                <span><div data-key='65' className='key__button'>W</div> Move Paddle Up</span>
                <span><div data-key='65' className='key__button'>S</div> Move Paddle Down</span>
              </div>
            </div>
            <p>Select an AI difficulty</p>
            <ul>
              <li onClick = {(e)=>this.setDifficulty(e)} data-level = "10">Super easy..</li>
              <li onClick = {(e)=>this.setDifficulty(e)} data-level = "15">Medium</li>
              <li onClick = {(e)=>this.setDifficulty(e)} data-level = "18">Hard</li>
              <li onClick = {(e)=>this.setDifficulty(e)} data-level = "21">Harder.</li>
              <li onClick = {(e)=>this.setDifficulty(e)} data-level = "30">Boss Mode</li>
            </ul>
          </div>
        )}
        {
          this.state.gameOver &&(
            <div id = 'gameOver'>
              <h1>{this.state.gameWinner == "Player" ? "You won!": "You Lost..."}</h1>
              <button onClick = {this.restartGame} id = 'restartGame'>Restart</button>
            </div>
          )
        }
        </div>
    );
  }
}

export default App;
