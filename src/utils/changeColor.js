export function changeColor(turnColor, playersArr){
    for(let i = 0; i<playersArr.length; i++)
    {
      const c = playersArr[i]
      if(c === turnColor){
        const temp = (playersArr.length-1 === i) ? 0 : i + 1;
        return playersArr[temp]
      }

    } 
}