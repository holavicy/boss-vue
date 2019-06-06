class Validator{
    validateResult = [];

    strategys = {
        isEmpty: function(value, errMsg){
            if(!value){
                return errMsg
            }
        },

        maxLength: function(value, length, errMsg){
            if (value.trim().length > length){
                return errMsg
            }
        }
    }

    check(value,rules){
        for( let i=0; i<rules.length; i++){
            let rule = rules[i];
            let strategyArry = rule.strategy.split(':');
            let errMsg = rule.errMsg;
            let strategy = strategyArry.shift();
            strategyArry.unshift(value);
            strategyArry.push(errMsg);
            this.validateResult.push( this.strategys[strategy].apply(value,strategyArry));
        }
        
    }

    checkResult(){
        for(let i=0; i<this.validateResult.length; i++){
            let errMsg = this.validateResult[i];
            if(errMsg){
                return errMsg
            }
        }
    } 
}

export{
    Validator
 }