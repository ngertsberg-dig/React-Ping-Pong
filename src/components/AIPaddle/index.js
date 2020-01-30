import React from 'react';

class AIPaddle extends React.Component{
    componentDidMount(){
        setInterval(()=>{
            this.moveAI();
        },100)
    }
    moveAI(){
        
        const AIPaddle = document.querySelector("#AIPaddle");
        const PaddleMiddle = (AIPaddle.clientHeight / 2) + AIPaddle.offsetTop;
        const { paddleState } = this.props;
        const BallTop = this.props.ballState.top;
        const BallHeight = this.props.ballState.height;
        const BallMiddle = (BallHeight / 2) + BallTop;
        const PaddleTop = paddleState.top;
        let newTop = PaddleTop;
        
// paddleState:
//     top: 261
//     height: 100
//     width: 10
//     moveSpeed: 30
//     left: 383
        console.log(this.props.ballState)
        if(BallMiddle > PaddleMiddle){
            //move aipaddle down
            newTop = PaddleTop + paddleState.moveSpeed;
            
        }
        else if(BallMiddle < PaddleMiddle){
            //move paddle up
            newTop = PaddleTop - paddleState.moveSpeed;
        }
        this.props.updateAI(newTop);
        
    }
    render(){
        const { paddleState } = this.props;
        const PaddleStyle = {
            top: `${paddleState.top}px`,
            width: `${paddleState.width}px`,
            height: `${paddleState.height}px`,
            left: `${paddleState.left}px`,
        }
        return(
            <div style = {PaddleStyle} id = 'AIPaddle'>

            </div>
        )
    }
}

export default AIPaddle;