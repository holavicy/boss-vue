<template>
    <div class="top-bar">
        <div class="top-bar-left">
            <!-- <div class="left-bar-toggle">
                <svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                </svg>
            </div> -->
            <div>
                <img src="@/assets/login-logo.png">
            </div>
        </div>
        <div class="top-bar-right">
            <div >登录人信息和操作</div>
            <!-- <div>
                <el-color-picker v-model="currColor" @change = "colorChanged()"></el-color-picker>
            </div> -->
        </div>
        
    </div>
</template>

<script>
export default {
    name:'top-bar',
    data() {
        return {
            currColor:'#409EFF'
        }
    },
    methods: {
        colorChanged(){
            this.$store.commit('setColor', {
                currColor: this.currColor
            })
        }
    },
    created(){
        this.$store.commit('setColor', {
                currColor: this.currColor
            })
    },
    computed: {
        selectedColor(){
            return this.$store.state.currColor
        }
    }
}
</script>


<style scoped>
.top-bar{
    height: 60px;
    border-bottom: 1px solid #efefef;
    padding: 2px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 100001;
    background-color: #fafafa;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.3)
}

.top-bar-left, .top-bar-right{
    display: flex;
    align-items: center
}

.left-bar-toggle {
    width: 30px;
    height: 30px;
    margin: 0 20px;
    cursor: pointer;
}
</style>
