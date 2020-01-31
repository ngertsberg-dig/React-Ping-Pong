import React from 'react';

class AIPaddle extends React.Component{
    componentDidMount(){
        const AIMovements = setInterval(()=>{
            this.moveAI();
            if(this.props.gameOver){
                clearInterval(AIMovements);
            }
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
        console.log(paddleState.moveSpeed)
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
        const { moveSpeed } = paddleState;
        let PaddleColor;
        let boxShadow = "none";
        if(moveSpeed == 10){
            PaddleColor = "rgba(0,255,0)";
        }
        if(moveSpeed === 15){
            PaddleColor = "green";
        }
        if(moveSpeed === 18){
            PaddleColor = "rgb(240, 128, 31)"
        }
        if(moveSpeed > 20){
            PaddleColor = "red";
        }
        if(moveSpeed === 30){
            boxShadow = "4px 0px 61px 24px rgba(255,0,0,0.92)"
        }
        
       
        const PaddleStyle = {
            top: `${paddleState.top}px`,
            width: `${paddleState.width}px`,
            height: `${paddleState.height}px`,
            left: `${paddleState.left}px`,
            backgroundColor: PaddleColor,
            boxShadow
            
        }
        return(
            <div style = {PaddleStyle} id = 'AIPaddle'>

            </div>
        )
    }
}

export default AIPaddle;