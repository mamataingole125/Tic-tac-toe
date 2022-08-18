import React from 'react'
import { useState } from 'react'
import { calculateWinner } from './helper';
import Board from './Board';


const Game = () => {
    const [history,setHistory]=useState([Array(9).fill(null)]);
    // console.log(history)
    const [stepNumber,setStepNumber]=useState(0);
    // console.log(stepNumber)
    const [xIsNext,setXisNext]=useState(true);
    // console.log(xIsNext)
   
    const winner=calculateWinner(history[stepNumber])
    const xO=xIsNext ? "X" : "O"

    const handleClick=(i)=>{
        const histryPoint=history.slice(0,stepNumber+1);
        const current=histryPoint[stepNumber];
        const squares=[...current];
        //return if won or occupied
        if(winner || squares[i]){
            return
        }
        //select square
        squares[i]=xO;
        setHistory([...histryPoint,squares]);
        setStepNumber(histryPoint.length);
        setXisNext(!xIsNext)

    };
   

    const jumpTo=(step)=>{
        setStepNumber(step)
        setXisNext(step %2 ===0);

    }

    const renderMoves=()=>
    //dont use curly braces here in line 38
        history.map((step,move)=>{
            
            const destination =move ? `Go to Move #${move}` : "Go to Start" ;
            return (
                <li key={move}>
                    <button onClick={()=>jumpTo(move)}>
                        {destination}
                    </button>

                </li>
            )

        })
    
  return (
    <div>
        <h1>TIC TAC TOE</h1>
        <Board squares={history[stepNumber]}  onClick={handleClick}/>
        <div className='info-wrapper'>
           <div>
           <h3>History</h3>
            {renderMoves()}
           </div>
            <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
        </div>
      

    </div>
  )
}

export default Game

