import React from 'react';

class Ball extends React.Component{

    componentDidMount(){
        const Ball = document.querySelector("#Ball");
        const moveBall = setInterval(() => {
            this.ballMove(Ball); 
        },25);
    }

    ballMove(Ball){
        const { ballState } = this.props;
        
        let { left, top, direction} = ballState;
        const { moveSpeed, ballCollision } = ballState;
        
       
        const { paddleState } = this.props;   
        left = direction === "-" ?
                left - moveSpeed
            :
                left + moveSpeed

        //check for player collision
        if(left <= paddleState.width){
            const PlayerPaddle = document.querySelector("#PlayerPaddle");
            const PaddleTop = PlayerPaddle.offsetTop;
            const PaddleBottom = PlayerPaddle.offsetTop + PlayerPaddle.clientHeight;
            const PaddleMiddle = (PaddleTop + PaddleBottom) / 2; 

            const BallTop = Ball.offsetTop;
            const BallBottom = Ball.offsetTop + Ball.clientHeight;
            const BallMiddle = (BallTop + BallBottom) / 2;
            
            const BallPoints = [BallTop,BallMiddle,BallBottom];
            const PlayerPoints = [PaddleTop,PaddleMiddle,PaddleBottom];
            
            let CollidedWithPaddle = false;

            BallPoints.forEach(point=>{
                if(point >= PaddleTop && point <= PaddleBottom || point <= PaddleBottom && point >= PaddleTop){
                    CollidedWithPaddle = true;
                }
            })
            //collided with player
            if(CollidedWithPaddle){
                let newY;
                this.props.collidedWithPlayer();
                //check where it collided

                //direct middle collision
                if(BallMiddle === PaddleMiddle){
                    newY = 0;
                }
            }
            //did not collide
        }
        if(!ballCollision){
            this.props.updateBall(left,top)
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