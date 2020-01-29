import React from 'react';

class PlayerPaddle extends React.Component{

    componentDidMount(){
        const PlayerPaddle = document.querySelector("#PlayerPaddle");
        this.playerPaddleMovement(PlayerPaddle);
        
    }

    
    playerPaddleMovement(PlayerPaddle){
        document.addEventListener("keydown",(key)=>{
            const KeyCode = key.code;
            const direction = KeyCode === "KeyS" ? "+" : "-";
            this.paddleMove(direction,PlayerPaddle);
        })
    }

    paddleMove(direction,PlayerPaddle){
        const GameBoard = document.querySelector("#GameBoard");
        const { paddleState } = this.props;
        let paddleTop = paddleState.top;
        //which direction to move
        paddleTop = direction === "+" ?
            //check if next move will be over the bottom limit and set it to max limit 
            ((PlayerPaddle.offsetTop + PlayerPaddle.clientHeight) + paddleState.moveSpeed) > GameBoard.clientHeight ?
                    GameBoard.clientHeight - PlayerPaddle.clientHeight
                :   
                    //move normally down..
                    paddleTop + paddleState.moveSpeed
        :
            //check to make sure it wont go out of bounds
            PlayerPaddle.offsetTop - paddleState.moveSpeed < 0 ?
                    //it will go out of bounds so set to 0 instead. 
                    0
                :
                    //move normally up..
                    paddleTop - paddleState.moveSpeed;
        this.props.updatePaddleTop(paddleTop);
        
    }
    

    render(){
        const { paddleState } = this.props;
        const PaddleStyle = {
            top: `${paddleState.top}px`,
            width: `${paddleState.width}px`,
            height: `${paddleState.height}px`
        }
        return(
            <div style = {PaddleStyle} id = 'PlayerPaddle'>

            </div>
        )
    }
}

export default PlayerPaddle;