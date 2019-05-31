<template>
    <div class="import-cate-attrs">
        <div class="first-part">
            <div class="left-part"></div>
            <div class="cate-selector">
                <div class="cate-group" v-for="(group,index) in cateFormedList" :key="index">
                    <ul>
                        <li v-for="i in group" :key="i.id" @click="getChildGroup(i)">{{i.name}}</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="second-part">
            <table class="table table-border">
                <thead>
                    <tr>
                        <th>属性名称</th>
                        <th>属性说明</th>
                        <th>参考值</th>
                        <th>描述</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name:'import-cate-attrs',
    data(){
        return{
            categoryList: [],
            cateFormedList: [],
            selctedCateList: [],
        }
    },
    methods:{
        getChildGroup:function(item){
            this.selctedCateList.push(item);
            console.log(this.selctedCateList);
        },
    },
    created: function(){
        let formedList = [];
        this.getAllCategory().then((res)=>{
            this.categoryList = res.data.categoryLists;
            let list = [];
            this.categoryList.forEach((i) => {
                if(i.parentId == 0){
                    list.push(i)
                }
                })
            formedList.push(list);
            this.cateFormedList = formedList;
        })
    }
}
</script>

<style scoped>
.first-part {
    display: flex
}

.cate-group {
    width:300px;
    height:400px;
    overflow-y: auto;
    font-size: 14px;
}

.cate-group ul{
    box-sizing: border-box;
    border: 1px solid #cecece;
}

.cate-group ul li {
    border-bottom: 1px solid #cecece;
    padding: 6px 10px;
}

.cate-group ul li:hover{
    background-color: #4395ff;
    color: #ffffff;
    cursor: pointer;
}
</style>
