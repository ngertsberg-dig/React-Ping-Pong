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
            this.props.checkPlayerCollision();
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