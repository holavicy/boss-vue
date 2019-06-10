<template>
    <div class="page-list">
        <!--查询条件-->
        <div class="search-block">
           <slot name="searchContiditions"></slot>
        </div>
        <!--列表-->
        <div class="table-block">
          <slot name="tableBlock"></slot>
        </div>
        <!--分页-->
        <div class="pagination-block">
            <vipmro-paging :page="pagingPage"
                            :total ="totalCount"
                            :page-size="20"
                            @getList="getList"></vipmro-paging>
        </div>
    </div>
</template>

<script>
export default {
    name:'page-list',
    props:{
        totalCount:{
            type: Number,
            required: true,
            default:0
        },
        pagingPage:{
            type: Number,
            required:true,
            default:1
        }
    },

    methods:{
        getList:function (page, size) {
            this.$emit('getList', page, size);
         }
    },
}
</script>

<style scoped>
.search-block{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
}

.table-block{
    overflow-x: auto;
    padding-bottom: 10px;
    box-sizing: border-box;
    display: flex;
    overflow-y: hidden;
}
</style>
