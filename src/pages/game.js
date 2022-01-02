import React, { useState, useEffect, useCallback } from 'react';
import { setMove, initGlobal } from '../utils/arrayManipulation';
import Board from '../components/board';



const Index = () => {
    const [board, setBoard] = useState(null);
    const [score, setScore] = useState(0);
    const [gameIsOn, setGameIsOn] = useState(false);

    const initNewGame = (n) => {
         setGameIsOn(true);
         setScore(0);
         initGlobal();
         const temp = Array.from({
            length: n
          }, () => new Array(n).fill(0))
          let count = 0;
          while(count < 2){
              const i = Math.floor(Math.random() * n)
              const j = Math.floor(Math.random() * n);
            if(temp[i][j]!==2){
                temp[i][j] = 2;
                count++;
            }
          }

          setBoard(temp);
    }

    const keyPressHandler = useCallback((e) => {
        if(gameIsOn){
        const { key } = e;
        const temp = setMove(board, key)
        const {matrix, score: scoreGame} = temp;
        setScore(scoreGame);
        setBoard(matrix);

    }
      },[board, gameIsOn]);
    

      useEffect(() => {
        window.addEventListener("keydown", keyPressHandler);
        return () => {
            window.removeEventListener("keydown", keyPressHandler);
        };
      }, [keyPressHandler]);

    return (
        <div className='bg-white h-screen w-full flex justify-center'>
            <div className='md:w-11/12 lg:w-8/12 py-20'>
               <div className='flex space-x-6 items-center'>
                    <button className='bg-gray-200 rounded text-lg px-5 py-2 drop-shadow hover:drop-shadow-lg hover:bg-gray-300 cursor-pointer' onClick={()=>initNewGame(4)}>start</button>
                    <h1 className='text-2xl text-blue-900'>Score: {score}</h1>
               </div>
               <div className='flex justify-center py-20'>
                   <div><Board board={board}/></div>
               </div>
            </div>
        </div>
    )
}

export default Index;