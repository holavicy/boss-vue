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
        totalCount:Number,
        pagingPage:Number
    },

    methods:{
        getList:function (page, size) {
            this.$emit('getList', page, size)
         }
    },
}
</script>

<style scoped>
.page-list {
    /* margin-top: 10px; */
}
.search-block{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    /* box-shadow: 0 2px 2px rgba(10,16,20,.24),0 0 2px rgba(10,16,20,.12) */
}

.table-block{
    overflow-x: auto;
    padding-bottom: 10px;
    box-sizing: border-box;
    display: flex;
    overflow-y: hidden;
}
</style>
