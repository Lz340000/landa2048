import React from 'react'

const Index = ({board}) => {
const emptyDemmy = [0,0,0,0];

return (
    <div className='bg-gray-100 rounded-lg drop-shadow-lg p-8 space-y-3'>
        {board?(
            board.map((row)=>{
                return <div className='flex space-x-3'>
                    {row.map((col)=>{
                        return <div className={`bg-${col} h-20 w-20 flex justify-center items-center rounded-sm drop-shadow-sm text-3xl font-bold ${col>4?'text-white':'text-gray-900'}`}>{col===0?'':col}</div>
                    })}
                </div>
            })
        ):(
            emptyDemmy.map(()=>{
                return <div className='flex space-x-3'>
                    {emptyDemmy.map((col)=>{
                        return <div className='bg-0 h-20 w-20 flex justify-center items-center rounded-sm drop-shadow-sm'>{col===0?'':col}</div>
                    })}
                </div>
            })
        )}
    </div>
)
}

export default Index
