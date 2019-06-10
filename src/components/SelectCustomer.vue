<template>
     <!--选择客户弹框-->
        <el-dialog
            title="选择客户"
            :visible.sync="showFalg"
            width="50%">
            
            <page-list :totalCount="customerCount"
                        :pagingPage="pagingPage"
                        @getList="getCustomerList">
                <template v-slot:searchContiditions>
                    <div style="display:flex">
                        <div class="input-block">
                            <label class="label-mini">公司名称:</label>
                            <el-input size="mini" v-model="nameSearch"></el-input>
                        </div>
                        <div class="input-block">
                            <label class="label-mini">联系人:</label>
                            <el-input size="mini" v-model="linkmanSearch"></el-input>
                        </div>
                        <div class="input-block">
                            <label class="label-mini">电话:</label>
                            <el-input size="mini" v-model="mobileSearch"></el-input>
                        </div>
                        <div class="input-block">
                            <el-button type="primary" @click="getCustomerList()">搜索</el-button>
                        </div>
                    </div>
                    
                </template>
                    <template v-slot:tableBlock>
                        <div class="table-block">
                            <table class="table table-border table-nowrap table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>联系人</th>
                                        <th>公司名称</th>
                                        <th>电话</th>
                                        <th>客户专员</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in customerList" :key="item.id">
                                        <td><el-radio v-model="selectedCusId" :label="item.id">{{item.linkMan}}</el-radio></td>
                                        <td>{{item.name}}</td>
                                        <td>{{item.mobile}}</td>
                                        <td>{{item.customerManagerName}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </template>
            </page-list>
            
            <span slot="footer" class="dialog-footer">
                <el-button @click="showFalg = false">取消</el-button>
                <el-button type="primary" @click="setCustomer()">确定</el-button>
            </span>
        </el-dialog>
</template>

<script>
import PageList from '@/components/PageList'
export default {
    name:'select-customer',
    components:{PageList},
    data(){
        return {
            nameSearch:'',
            linkmanSearch:'',
            mobileSearch:'',
            selectedCusId:'',
        }
    },
    props:{
        //控制弹框显示和隐藏
        chooseCustomerVisible: {
            type: Boolean,
            required: true,
            default: false,
        },
        //客户总个数--分页显示
        customerCount: {
            type:Number,
            required: true,
            default: 0
        },
        //当前页数--分页显示
        pagingPage: {
            type: Number,
            required: true,
            default: 1
        },
        //客户列表
        customerList: {
            type:Array,
            required: true,
        }
    },
    methods: {
        getCustomerList: function(page, size){
            let that = this;
            let data ={
                linkMan:that.linkmanSearch,
                name:that.nameSearch,
                mobile:that.mobileSearch,
                page:page?page-1:0,
                rows:size || 20,
            }
            this.$emit('get-customer-list', data);
        },
        setCustomer: function(){
            let selectedCus = {};
            this.customerList.forEach(element => {
                if (element.id == this.selectedCusId) {
                    selectedCus = element;
                }
            });
            this.$emit('set-customer', selectedCus);
        },
    },

    computed:{
        showFalg:{
            get: function () {
                return this.chooseCustomerVisible
            },
 
            set: function (newValue) {
                this.$emit('update:chooseCustomerVisible', newValue)
            }
        }
    }
}
</script>

<style scoped>

.el-input {
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
.goods-block .el-button {
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
.sub-goods{
    /* background-color: #DCDFE6; */
    color: #C0C4CC
}
</style>
