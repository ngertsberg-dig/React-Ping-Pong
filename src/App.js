import React from 'react';
import logo from './logo.svg';
import './App.css';
import './index.sass';
import PlayerPaddle from './components/PlayerPaddle';
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
      moveSpeed: 5,
      ballCollision: false
    },
    paddle: {
      top: 0,
      height: 100,
      width: 10,
      moveSpeed: 30,
    }
  }

  constructor(){
    super();
    this.updatePaddleTop = this.updatePaddleTop.bind(this);
    this.updateBall = this.updateBall.bind(this);
    this.checkPlayerCollision = this.checkPlayerCollision.bind(this);
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
    let newBall = {...this.state.ball};
    newBall.top = (Board.clientHeight / 2) - (newBall.top / 2);
    newBall.left = (Board.clientWidth / 2) - (newBall.left / 2);

    let newPaddle = {...this.state.paddle};
    newPaddle.top = (Board.clientHeight / 2) - (newPaddle.height / 2);
    this.setState({ ball:newBall, paddle:newPaddle });
    
  }

  updatePaddleTop(newTop){
    this.setState(state => {
      let newPaddle = {...state.paddle};
      newPaddle.top = newTop;
      return { paddle: newPaddle }
    })
  }

  checkPlayerCollision(){
    this.setState(state=>{
      let newBall = {...state.ball}
      newBall.ballCollision = true;
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
                  <PlayerPaddle updatePaddleTop = {this.updatePaddleTop} paddleState = {this.state.paddle} />
                  <Ball checkPlayerCollision = {this.checkPlayerCollision} updateBall = {this.updateBall} ballState = {this.state.ball} paddleState = {this.state.paddle} />
                </React.Fragment>
        }
        </div>
    );
  }
}

export default App;
