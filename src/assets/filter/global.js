let date = (value) => {
    let result = ''
    if(value){
 let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    month = month<10?'0'+month:month;
    let day = date.getDate();
    day = day<10?'0'+day:day;
    let hour = date.getHours();
    hour = hour<10?'0'+hour:hour;
    let minute = date.getMinutes();
    minute = minute<10?'0'+minute:minute;
    let second = date.getSeconds();
    second = second<10?'0'+second:second;

    result = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;
    }
   
    return result
}

let toFixed = (value, num)=>{
    if (value){
        return parseFloat(value).toFixed(num)
    } else return 0
}

export { date, toFixed}