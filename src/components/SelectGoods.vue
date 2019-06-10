<template>
    <el-dialog title="选择商品"
        :visible.sync="showFlag"
        width="50%">
        
        <page-list :totalCount="goodsCount"
                    :pagingPage="pagingPageGoods"
                    @getList="getGoodsList">
            <template v-slot:searchContiditions>
                <div style="display:flex">
                    <div class="input-block">
                        <label class="label-mini">订货号:</label>
                        <el-input size="mini" v-model="buyNoSearch"></el-input>
                    </div>
                    <div class="input-block">
                        <label class="label-mini">型号:</label>
                        <el-input size="mini" v-model="modelSearch"></el-input>
                    </div>
                    <div class="input-block">
                        <label class="label-mini">名称/品牌:</label>
                        <el-input size="mini" v-model="titleSearch"></el-input>
                    </div>
                    <div class="input-block">
                        <el-button type="primary" @click="getGoodsList()">搜索</el-button>
                    </div>
                </div>
                
            </template>
                <template v-slot:tableBlock>
                    <div class="table-block">
                        <table class="table table-border table-nowrap table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>品牌</th>
                                    <th>订货号</th>
                                    <th>型号</th>
                                    <th>名称</th>
                                    <th>单位</th>
                                    <th>类别</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in goodsList" :key="index">
                                    <td :style="{paddingLeft:item.isMainGoods?'':'24px'}">
                                        <input type="checkbox" 
                                        v-model="checkedGoodsList" 
                                        :value="item" 
                                        v-if="item.isMainGoods"> {{item.brandNameCn}}
                                        </td>
                                    <td>{{item.buyNo}}</td>
                                    <td>{{item.model}}</td>
                                    <td>{{item.title}}</td>
                                    <td style="text-align:center">{{item.measure}}</td>
                                    <td style="text-align:center">{{item.cateName}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            </template>
        </page-list>
        
        <span slot="footer" class="dialog-footer">
            <el-button @click="showFlag = false">取消</el-button>
            <el-button type="primary" @click="setGoods()">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import PageList from '@/components/PageList'
export default {
    name:'select-goods',
    components:{ PageList},
    data(){
        return{
            buyNoSearch:'',
            modelSearch:'',
            titleSearch:'',
            checkedGoodsList: []
        }
    },
    props:{
        chooseGoodsVisible:{
            type:Boolean,
            required: true,
            default: false
        },
        goodsCount: {
            type: Number,
            required: true,
            default: 0,
        },
        pagingPageGoods: {
            type: Number,
            required: true,
            default: 1,
        },
        goodsList: {
            type: Array,
            required: true,
        }
    },
    methods:{
        getGoodsList: function(page, size){
            this.checkedGoodsList = [];
            let data = {
                title: this.titleSearch,
                buyNo:this.buyNoSearch,
                model:this.modelSearch,
                page:page?page-1:0,
                size:size || 20,
            };
            this.$emit('get-goods-list', data);
        },
        setGoods: function(){
            this.$emit('set-goods', this.checkedGoodsList);
            this.checkedGoodsList = [];
        }
    },
    computed: {
        showFlag:{
            get: function(){
                return this.chooseGoodsVisible
            },
            set: function( newValue ){
                this.$emit('update:chooseGoodsVisible', newValue)
            }
        }
    }
}
</script>

<style scoped>
.order-block {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
}

.customer-block {
    margin-top: 10px;
    display: flex;
}

.customer-block .input-block {
    width: 50%;
}

.el-select, .el-input {
    width: auto;
}

.table-block {
    width: 100%;
}

.el-dialog__body {
    box-sizing: border-box;
}

.el-button {
    line-height: 0;
}

.customer-block .el-input-group{
    width: 80%;
}

.goods-block {
    margin-top: 10px;
}
.selectedGoodsTable{
    margin-top: 10px;
}
.selectedGoodsTable td {
    height: 24px;
}

.bottom-buttons {
    margin-top: 10px;
}
.goods-block .el-button, .customer-block .el-button {
    height: 26px;
    border-radius: 0 6px 6px 0;
    padding: 8px;
}

.store >>> .el-input__inner, .cus-name >>> .el-input__inner {
    border-radius: 6px 0 0 6px !important;
}

.input-block label {
    width: auto;
}

.customer-block .el-input{
    width:192px;
}

.sub-goods{
    /* background-color: #DCDFE6; */
    color: #C0C4CC
}
</style>
