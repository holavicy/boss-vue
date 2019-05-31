<template>
    <div class="page-center">
        <top-bar></top-bar>
        <div class="webui-menu-vertical left-nav"  v-bind:style="{ width:colspan?'100px':'220px' }">
            <vipmro-menu-vertical
                :menu-list="menuList"
                @flexMenuClick="flexMenuClick"
                @menuClick="menuClick"></vipmro-menu-vertical>
                </div>
        <div class="right-content"  v-bind:style="{ marginLeft: colspan?'100px':'220px' }">
            <bread-crumb></bread-crumb>
            <div class="content">
                <router-view></router-view>
            </div>
            
        </div>
        
    </div>
</template>

<script>
import TopBar from "@/components/TopBar"
import BreadCrumb from '@/components/BreadCrumb'

export default {
    name:'page-center',
    components: {
       TopBar,
       BreadCrumb
    },
    data(){
        return{
            width:'300px',
            colspan:false,
        }
    },

    methods: {

        flexMenuClick: function(col){
            this.colspan = col;
        },
        menuClick: function(item){
            this.$router.push('/pageCenter/'+item.symbol)
        }
    },
    computed: {
        menuList(){
            return this.$store.state.menuList
        }
    },

}
</script>

<style scoped>
.left-nav {
    position: fixed;
    top:60px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    padding: 20px 10px;
    box-shadow:6px 0 6px rgba(0,0,0,.1);
    box-sizing: border-box;
    background-color: #ffffff;
}

.right-content {
    height:100%;
    /* padding: 0 20px; */
    /* padding: 10px; */
    box-sizing: border-box;
    margin-top: 60px;
}

.right-content .content{
    margin: 0 20px;
}
</style>

