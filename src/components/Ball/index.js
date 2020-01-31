import React from 'react';

class Ball extends React.Component{

    componentDidMount(){
        const Ball = document.querySelector("#Ball");
        const moveBall = setInterval(() => {
            this.ballMove(Ball);
            if(this.props.gameOver){
                setTimeout(()=>{
                    clearInterval(moveBall);
                },100)
            }
        },25);
    }

    checkWin(BallTop,BallMiddle,BallBottom,whoToCheck){
        const PlayerPaddle = whoToCheck === "player" ? document.querySelector("#PlayerPaddle") : document.querySelector("#AIPaddle");
        const PaddleTop = PlayerPaddle.offsetTop;
        const PaddleBottom = PlayerPaddle.offsetTop + PlayerPaddle.clientHeight;
        const PaddleMiddle = (PlayerPaddle.clientHeight / 2) + PaddleTop; 
        
        const BallPoints = [BallTop,BallMiddle,BallBottom];
        
        let CollidedWithPaddle = false;

        BallPoints.forEach(point=>{
            if(point >= PaddleTop && point <= PaddleBottom || point <= PaddleBottom && point >= PaddleTop){
                CollidedWithPaddle = true;
            }
        })
        //collided with player
        if(CollidedWithPaddle){
            let newY;
            //check where it collided

            //direct middle collision
            if(BallMiddle === PaddleMiddle){
                newY = "none";
            }
            BallPoints.forEach(point=>{
                //collided somewhere on the top
                if(point < PaddleMiddle && point > PaddleTop){
                    newY = "-";
                }
                //collided somewhere on the bottom
                else if(point > PaddleMiddle && point < PaddleBottom){
                    newY = "+";
                }
            })
            whoToCheck === "player" ? this.props.collidedWithPlayer(newY) : this.props.collidedWithAI(newY);
        }
        else{
            //did not collide
            whoToCheck === "player" ? this.props.playerLost() : this.props.aiLost();
        }
    }

    ballMove(Ball){
        const { ballState } = this.props;
        
        let { left, top, direction, directionY} = ballState;
        const { moveSpeed, ballCollision, directionYSpeed } = ballState;
        
        const BallTop = Ball.offsetTop;
        const BallBottom = Ball.offsetTop + Ball.clientHeight;
        const BallMiddle = (BallTop + BallBottom) / 2;
       
        const { paddleState } = this.props; 

        //move left to right
        left = direction === "-" ?
                left - moveSpeed
            :
                left + moveSpeed

        //move up and down
        if(directionY !== "none"){
            top = directionY === "-" ?
                    top - directionYSpeed
                :
                    top + directionYSpeed
        }

        //check for player collision
        if(left <= paddleState.width){
            this.checkWin(BallTop,BallMiddle,BallBottom,"player");
        }

        //check for wall collisions
        const GameBoard = document.querySelector("#GameBoard");
        const GameBoardTop = GameBoard.offsetTop;
        const GameBoardBottom = GameBoard.offsetTop + GameBoard.clientHeight;
        const GameBoardBorder = parseInt(getComputedStyle(GameBoard).borderTop);
        if(BallTop <= (GameBoardTop - (GameBoardBorder * 2)) && directionY === "-"|| BallBottom >= (GameBoardBottom - (GameBoardBorder * 2)) && directionY === "+"){
            this.props.collideWithWall();
        }
        if(!ballCollision){
            this.props.updateBall(left,top)
        }

        //check for ai collision
        const { aiPaddleState } = this.props;
        const AITop = aiPaddleState.top;
        const AIHeight = aiPaddleState.height;
        const AIMiddle = (aiPaddleState.height / 2) + AITop;
        const AIBottom = AITop + aiPaddleState.height;
        const AIPoints = [AITop,AIMiddle,AIBottom];
        
        if(left >= GameBoard.clientWidth - (Ball.clientWidth + aiPaddleState.width)){
            this.checkWin(BallTop,BallMiddle,BallBottom,"ai");
        }
    }

    render(){
        const { ballState } = this.props;
        const BallStyle = {
            width: `${ballState.width}px`,
            height: `${ballState.height}px`,
            top: `${ballState.top}px`,
            left: `${ballState.left}px`
        }
        return(
            <div id = 'Ball' style = {BallStyle} >

            </div>
        )
    }
}

export default Ball;