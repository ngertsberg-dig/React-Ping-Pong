import React from 'react';

import './index.sass';
import PlayerPaddle from './components/PlayerPaddle';
import AIPaddle from './components/AIPaddle';
import Ball from './components/Ball';

class App extends React.Component{
  state={
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
      moveSpeed: 30,
    },
    AIPaddle: {
      top: 0,
      height: 100,
      width: 10,
      moveSpeed: 30,
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
  }

  componentDidMount(){
    const Player = document.querySelector("#PlayerPaddle");
    const Board = document.querySelector("#GameBoard");
    const Ball = document.querySelector("#Ball");
    this.setPositions(Board);
    this.startGame();
  }
  startGame(){
    this.setState({ gameLoading: false })
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

  render(){
    return (
      <div className="App" id = 'GameBoard'>
        {
          this.state.gameLoading ? 
                null 
              :
                <React.Fragment>

                  <PlayerPaddle 
                    updatePaddleTop = {this.updatePaddleTop} 
                    paddleState = {this.state.paddle} 
                  />

                  <Ball 
                    collideWithWall={this.collideWithWall} 
                    stopBall = {this.stopBall} 
                    collidedWithPlayer = {this.collidedWithPlayer} 
                    updateBall = {this.updateBall} 
                    ballState = {this.state.ball} 
                    paddleState = {this.state.paddle} 
                    aiPaddleState = {this.state.AIPaddle}
                    collidedWithAI = {this.collidedWithAI}
                  />

                  <AIPaddle 
                    updateAI = {this.updateAI}
                    paddleState = {this.state.AIPaddle} 
                    ballState = {this.state.ball}
                  />
                </React.Fragment>
        }
        </div>
    );
  }
}

export default App;
