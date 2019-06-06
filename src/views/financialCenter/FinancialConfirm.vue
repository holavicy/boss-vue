<template>
    <div class="financial-confirm">
        <div>
            <label>公司名称:</label>
            <input type="text" v-model="dealerName"/>
        </div>
        <div>
            <label>付款卡号:</label>
            <input type="text" v-model="payAccount"/>
        </div>
        <el-button @click="submitForm()">提交</el-button>
    </div>
</template>

<script>
import { Validator } from '@/validate.js'

export default {
    name:'financial-confirm',
    data(){
        return{
            dealerName:'',
            payAccount:'',
        }
    },
    methods:{
        submitForm: function(){

            const validator = new Validator();

            validator.check(this.dealerName,[{strategy:'isEmpty',errMsg:'公司名称不能为空'},{strategy:'maxLength:6',errMsg:'公司名称最多6个字符'}]);
            validator.check(this.payAccount,[{strategy:'isEmpty',errMsg:'付款户名不能为空'},{strategy:'maxLength:10',errMsg:'付款户名最多10个字符'}]);
            let errMsg =  validator.checkResult();

            if(errMsg) {
                alert(errMsg);
                return
            }

            // let strategyList = [];

            // let strategys = {
            //    isEmpty: function(value, errMsg){
            //        if(!value){
            //            return errMsg
            //         }
            //    },
            //    maxLength: function(value, length, errMsg){
            //        if (value.trim().length > length){
            //            return errMsg
            //         }
            //     }
            // }

            // function add(value, rules){
            //     for (let i=0;i<rules.length;i++) {
            //         let rule = rules[i];
            //         let strategyArry = rule.strategy.split(':');
            //         let errMsg = rule.errMsg;
            //         strategyList.push(function(){
            //             let strategy = strategyArry.shift();
            //             strategyArry.unshift(value);
            //             strategyArry.push(errMsg);
            //             return strategys[strategy].apply(value,strategyArry)
            //         })

            //     }

            // }

            // function checkStrategy(){
            //     for(let i=0; i<strategyList.length; i++){
            //         let errMsg = strategyList[i]();
            //         if(errMsg){
            //             return errMsg
            //         }
            //     }
            // }  


            //校验表单数据

            //公司名称不能为空且长度不能超过6
            // add(this.dealerName,[{strategy:'isEmpty',errMsg:'公司名称不能为空'},{strategy:'maxLength:6',errMsg:'公司名称最多6个字符'}]);

            //付款卡号不能为空且长度不能超过10
            // add(this.payAccount,[{strategy:'isEmpty',errMsg:'付款户名不能为空'},{strategy:'maxLength:10',errMsg:'付款户名最多10个字符'}]);

            // let errMsgF =  checkStrategy(strategyList);

            // if(errMsgF) {
            //     alert(errMsgF);
            //     return
            // }

            //校验通过,封装表单数据

            let data ={
                dealerName: this.dealerName,
                payAccount: this.payAccount
            }

            //提交表单数据
            console.log(data);

            //提交成功,清空表单数据
            this.dealerName = '';
            this.payAccount = '';
        }
    }
}
</script>

<style>

</style>
