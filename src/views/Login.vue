<template>
    <div class="login">
        <div class="background-shape">
             <div class="shape-white"></div>
        </div>
        <div class="login-content">
            <div class="login-form">
                <!--logo-->
                <div class="title">
                    <img src="@/assets/login-logo.png">
                    <p>BOSS管理系统</p>
                </div>
                <!--用户名-->
                <div class="form-item form-inline"><input type="text" maxlength="10" :style="userNameImg" v-model="username"/></div>
                <!--钉钉验证码-->
                <div class="form-item input-button">
                    <input type="password" maxlength="6" :style="psdImg" v-model="psd"/>
                    <button class="primary" 
                            :disabled="!username || !dingClick" 
                            :class="{ disabled: !username || !dingClick}" 
                            @click="getDingMessage">{{countDown}}</button>
                </div>
                <!--登录按钮-->
                <button class="primary form-item" 
                        :disabled="!username || !psd" 
                        :class="{ disabled: !username || !psd }" 
                        @click="login">登录</button>
                <!--错误信息-->
                <div class="error-msg" v-show="errMsg">
                    {{errMsg}}
                </div>

            </div>
        </div>
        
        <div class="login-bottom">
            <div class="link">
                <a>vipmro.net</a>
                <a>vipmro.com</a>
                <a>crm客户管理系统</a> 
            </div>
            <p>2019 © 苏州工品汇信息科技有限公司</p>
        </div>
    </div>
</template>

<script>
import userNameImg from '@/assets/icons/login-userName.svg'
import psdImg from '@/assets/icons/login-password.svg'
import { setInterval, clearInterval } from 'timers';
export default {
    data(){
        return{
            username:'',
            psd:'',
            countDown:'获取钉钉验证码',
            errMsg:'',
            userNameImg:{
                background: "url(" + userNameImg + ") left 8px center no-repeat " ,
                width:'100%',
                backgroundSize:'24px',
                paddingLeft:'48px'
            },
            psdImg:{
                 background: "url(" + psdImg + ") left 8px center no-repeat " ,
                 width: '246px',
                 backgroundSize:'26px',
                 paddingLeft:'48px'
            },
            timer: '',
            dingClick:true, //发送请求获取钉钉验证码时按钮置灰
        }
    },
    methods:{
        //获取钉钉验证码
        getDingMessage:function(){
            let loginName = this.username;
            let randomNum = Math.floor(Math.random() * 999999);
            let data = {
                loginName:loginName,
                randomNum:randomNum
            };
            this.dingClick = false;
            this.axios.post('/emro_boss/staff/login/sendMessage',this.$qs.stringify(data))
            .then( (res) => {
               
                let result = res.data;
                if(result.code != 0) {
                    this.errMsg = result.msg;
                    this.dingClick = true;
                } else {
                    let that = this;
                    let seconds = 60;
                    this.countDown = seconds+ 's';
                    clearInterval(that.timer);
                    that.timer = setInterval(function(){
                        if(seconds >1 ){
                            -- seconds;
                            that.countDown = seconds+'s';
                        } else {
                            that.countDown = '获取钉钉验证码';
                            that.dingClick = true;
                        }
                        
                    }, 1000)
                }
            })
        },
        login: function(){
            let data = {
                loginName:this.username,
                message:this.psd,	
                rand:''	
            };
            this.axios.post("/emro_boss/staff/login",this.$qs.stringify(data))
            .then((res) => {
                if(res.data.code != 0){
                    this.errMsg = res.data.msg;
                } else {
                    this.$router.push('/pageCenter')
                }
            })
        },
    }
    
}
</script>

<style scoped>

.shape-white {
    width: 0; 
    height: 0; 
    border-bottom: 25vh solid #ffffff; 
    border-right: 100vw solid transparent; 
    position: absolute;
    bottom: 0;
}

.login-content {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 120px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}

.login-bottom {
    height: 120px;
    position: fixed;
    right: 0;
    bottom: 0;
    left:0;
    box-shadow: 0px 10px 36px 0px rgba(6,31,61,0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login-bottom a{
    font-size: 15px;
}
.login-bottom p {
    text-align: center;
    font-size: 14px;
    color: #aaaaaa;
}
.login-form {
    /* margin-top: -120px; */
    width: 360px;
    /* border: 1px solid #aaa; */
    border-radius: 12px;
    background-color: #ffffff;
    padding: 20px 26px;
    display: flex;
    flex-direction: column;
    position: relative;
    box-shadow: 0px 10px 36px 0px rgba(6,31,61,0.12)
}

.form-item {
    margin-bottom: 20px;
}

.form-inline {
    display: flex;
    justify-content: space-between;
}

.login-form .title {
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
}

.login-form .title p{
    color: #aaa;
    font-size: 22px;
    /* font-weight: bold; */
    font-family: Helvetica;
}

input {
    height: 40px;
    line-height: 40px;
    padding: 2px;
}

button{
    height: 40px;
    line-height: 40px;
    background-color: #24704e
}

.input-button {
    display: flex;
    align-items: center;
}

.input-button input{
    border-radius: 4px 0 0 4px;
    border-right:0;
}

.input-button button {
    border-radius: 0 4px 4px 0;
    margin-bottom: 0;
    width: 112px
}

.error-msg {
    position: absolute;
    bottom: 8px;
    color: red;
    font-size: 14px
}

.link {
    text-align: center;
    margin-top: 10px;
}
</style>
