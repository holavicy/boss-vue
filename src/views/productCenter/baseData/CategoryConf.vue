<template>
    <div class="category-onf">
       <div class="webui-button"><vipmro-button :title="'导出分类'" @click="exportAllCategory()"></vipmro-button>
       <div class="table-tree">
           <table class="table table-border">
               <thead>
                   <tr>
                       <th>名称</th>
                       <th>编号</th>
                       <th>是否末级分类</th>
                       <th>操作</th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="item in categoryList" :key="item.id"
                   v-show="item.parentId ==0 || item.isShow"
                   @click="toggle(item)">
                       <td :style="{'padding-left':item.deepLength*20+'px'}"><i :class="[item.isColspan?'el-icon-caret-bottom':'el-icon-caret-right']" v-show="!item.isLeaf"></i>{{item.name}}</td>
                       <td style="text-align:center;">{{item.cateNo}}</td>
                       <td style="text-align:center;">{{item.isLeaf | status}}</td>
                       <td>
                           <a @click.stop="editCate(item)">编辑</a>
                           <a @click.stop="editCate(item)">添加分类</a>
                           <a @click.stop="editCate(item)">删除</a>
                           <a @click.stop="editCate(item)">显示</a>
                           <a @click.stop="editCate(item)">上传图片</a>
                           <a @click.stop="editCate(item)">查看图片</a>
                       </td>
                   </tr>
               </tbody>
           </table>
       </div>
	</div>
    </div>
</template>

<script>

export default {
    name:'category-conf',
    data(){
        return{
            categoryList: [],
        }
    },
    methods: {
        exportAllCategory: function(){
            console.log('导出分类');
        },
        toggle: function(item){

            let list = this.categoryList;

            function getAllChild (node){
                if(!node.isLeafe){
                    list.forEach((i) => {
                        if(i.parentId == node.id) {
                            i.isShow = false ;
                            i.isColspan = false ;
                            getAllChild(i);
                        }
                    })
                }        
            }

            //若是展开,则展开该级的下一级
            if(!item.isColspan){
               
                this.categoryList.forEach((i)=>{
                    if(i.parentId == item.id){
                        i.isShow = true;
                    }
                })
                item.isColspan = !item.isColspan
            } else {//若是收起,则收起该级下的所有
        
                getAllChild(item);
                this.categoryList = list;
                item.isColspan = !item.isColspan;
            }
            
        },
        //编辑分类
        editCate: function(item){
            console.log(item);
        }
    },
    created:function(){
        this.getAllCategory().then((res)=>{
            let listOri = res.data.categoryLists;
            let list = listOri.reduce(function(prev, item){
                item.isShow = false;
                item.isColspan = false;
                prev[item.parentId]?prev[item.parentId].push(item):prev[item.parentId] = [item];
                return prev
            },{});
            
            for (let parentItem in list) {
                list[parentItem].forEach(function (item) {
                    item.children = list[item.id] ? list[item.id] : [];
                    });
            }

            this.cateListTree = list[0];
           
            //深度优先算法
            let cateList=[];
            function deepTraversal(node,deepLength){
                if(node!=null){
                    if(node.parentId == 0){
                        deepLength = 0;
                    }
                    node.deepLength = deepLength;
                    cateList.push(node);
                    let childrens=node.children;
                    deepLength ++;
                    for(let i=0;i<childrens.length;i++){
                        deepTraversal(childrens[i], deepLength);
                    }
                    
                }
            }
            this.cateListTree.forEach(function(item){
                deepTraversal(item)
            })
            this.categoryList = cateList;
        });
    },
    filters: {
        status:function(val){
            let result = '';
            switch(val){
                case 0:
                    result = '否';
                    break;
                case 1:
                    result = '是';
                    break;
                    default:
                        result = '';
                        break
            }
            return result
        }
    }
}
</script>

<style scoped>
.table-tree {
    margin-top: 10px;
}

.table-tree table tr{
    cursor: pointer;
}
</style>
