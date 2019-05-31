<template>
    <div class="index">
        <top-bar></top-bar>
        <div class="webui-menu-vertical">
            <div style="width: 220px;margin-top:60px">
                <vipmro-menu-vertical
                    :menu-list="menuList"></vipmro-menu-vertical>
            </div>
	    </div>
        
    </div>
</template>

<script>
import TopBar  from "@/components/TopBar"
export default {
    name:'index',
    components: {
       TopBar,
    },
    data(){
        return{
            width:'300px',
            menuList: []
        }
    },

    methods: {

        setMenuList: function(list){

            let menuTree = list.reduce(function (prev, item) {
                prev[item.pId] ? prev[item.pId].push(item) : prev[item.pId] = [item];
                return prev;
            }, {});
            for (let parentItem in menuTree) {
                menuTree[parentItem].forEach(function (item, i) {
                    item.children = menuTree[item.id] ? menuTree[item.id] : null;
                });
            };
            return menuTree[0]
        },
    },
    beforeCreate:function () {
        this.$fetch('/emro_boss/staff/staffauth/findPages?staffNo=00649').then( res => {
            this.menuList = res.authList.map(({id,symbol,pId,forward,isLeaf,resName})=>{
                return{
                    id,
                    symbol,
                    pId,
                    forward,
                    label:resName,
                    // icon: isLeaf'el-icon-document',
                }
            });
            this.menuList = this.setMenuList(this.menuList);
            console.log(this.menuList);
        })
      }
}
</script>

<style scoped>
.left-nav {
    margin-top: 60px;
}
</style>

