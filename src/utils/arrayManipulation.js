var score = 0;

export const initGlobal = () => {
    score = 0;
}

export const setMove = (matrix,key) => {
    let temp = matrix.slice();
    switch (key) {
        case 'ArrowLeft':
            for(let i=0;i<temp.length;i++){
                moveZero(temp[i]);
            }
            break;
        case 'ArrowRight':
            for(let i=0;i<temp.length;i++){
                moveZeroRev(temp[i]);
            }
            break;
        case 'ArrowUp':
            const tu = transpose(matrix);
            
            for(let i=0;i<tu.length;i++){
                moveZero(tu[i]);
            }
            temp = transpose(tu);
            break;
        case 'ArrowDown':
            const td = transpose(matrix);
            for(let i=0;i<td.length;i++){
                moveZeroRev(td[i]);
            }
            temp= transpose(td);
            break;
        default:
            break;
    }
    addNewElement(temp);
    return {matrix: temp, score};
}

const addNewElement =(matrix)=>{
    if(!isGameOver(matrix)){
        const n = matrix.length;
        let isNewTwo = false;
        while(!isNewTwo){
            const i = Math.floor(Math.random() * n)
            const j = Math.floor(Math.random() * n);
        if(matrix[i][j]===0){
            matrix[i][j] = 2;
            isNewTwo=true;
        }
        }
    }
}

const transpose = (matrix) => {
    const rows = matrix.length, cols = matrix[0].length;
    const grid = [];
    for (let j = 0; j < cols; j++) {
        grid[j] = Array(rows);
    }
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        grid[j][i] = matrix[i][j];
        }
    }
    return grid;
}

const moveZero = (arr) => {
    
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === 0) {
            arr.splice(i, 1);
            arr.push(0);
        }
    }
    let noMoreConnection = false;
    while(noMoreConnection===false){
        for(let i=0; i<=arr.length-1; i++){
            if(arr[i]===arr[i+1]&&arr[i]!==0){
                arr[i]=arr[i]+arr[i+1];
                score+=arr[i];
                arr.splice(i+1, 1);
                arr.push(0);
                break;
            }
            noMoreConnection=true;
        }
    }
    return arr;
}

const moveZeroRev = (arr) => {
    for (let i = 0; i <= arr.length - 1; i++)  {
        if (arr[i] === 0) {
            arr.splice(i, 1);
            arr.unshift(0);
        }
    }
    let noMoreConnection = false;
    while(noMoreConnection===false){
        for(let i=arr.length-1; i >= 0; i--){
            if(arr[i]===arr[i+1]&&arr[i]!==0){
                arr[i]=arr[i]+arr[i+1];
                score+=arr[i];
                arr.splice(i+1, 1);
                arr.unshift(0);
                break;
            }
            noMoreConnection=true;
        }
    }
    return arr;
}

const isGameOver = (arr) => {
     return !arr.some(row => row.includes(0));
}