<template>
    <div class="manual-order">

        <!--客户信息-->
        <div class="customer-block">
            <div class="input-block">
                <label class="label-mini">公司名称:</label>
                <el-input placeholder="请选择客户" class="cus-name"
                          v-model="selectedCus.name" 
                          :disabled="true"
                          size="mini">
                </el-input>
                <el-button type="primary" @click="chooseCustomer()">选择客户</el-button>
            </div>
        </div>

        <!--订单商品信息-->
        <div class="goods-block">
            <div class="input-block">
                <label class="label-mini">店铺:</label>
                <el-select class="store" placeholder="请选择"
                    v-model="orderStore" 
                    :disabled="!!orderStore"
                    size="mini">
                    <el-option v-for="item in storeList"  
                        :key="item.id"
                        :label="item.optText"
                        :value="item.optValue">
                    </el-option>
                </el-select>
                 <el-button type="primary" :disabled="!orderStore" @click="chooseGoods()">选择商品</el-button>
            </div>
           
            <table class="table table-border table-nowrap selectedGoodsTable">
            <thead>
                <tr>
                    <th>品名</th>
                    <th>订货号</th>
                    <th>型号</th>
                    <th>品牌</th>
                    <th>系列</th>
                    <th>单位</th>
                    <th>数量</th>
                    <th>库存</th>
                    <th>券后价</th>
                    <th>面价</th>
                    <th>折扣</th>
                    <th>单价</th>
                    <th>金额(元)</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in selectedFormedList" 
                    :key="index" 
                    :class="[item.isMainGoods || !item.id?'':'sub-goods']">
                    <td>{{item.title}}</td>
                    <td>{{item.buyNo}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.brandNameCn}}</td>
                    <td>{{item.series}}</td>
                    <td style="text-align:center">{{item.measure}}</td>
                     <!--商品数量-->
                    <td style="width:100px;text-align:center">
                        <input type="text" style="width:100%;text-align:center" 
                            oninput="value=value.replace(/[^\d]/g,'')"
                            v-show="item.id && item.isMainGoods" 
                            v-model="item.num"/>
                        <span v-show="item.id && !item.isMainGoods">{{item.num}}</span>
                    </td>
                   <!--库存-->
                    <td style="text-align:center">
                        <span  v-show="item.storesCnt==0">{{item.stock}}</span>
                        <select v-model="item.stockSelId" 
                            v-show="item.storesCnt && item.storesCnt!=0">
                            <option v-for="i in item.dealerStoreList" :key="i.dealerStoreId" :value="i.dealerStoreId">{{i.storeNm}}</option>
                        </select>
                    </td>
                    <td style="text-align:center">{{item.couponPrice}}</td>
                    <td style="text-align:center">{{item.unitPrice}}</td>
                    <!--商品折扣-->
                    <td style="width:140px;text-align:center">
                        <input type="text" style="width:100%;text-align:center" 
                            v-show="item.id && item.isMainGoods" 
                            v-model="item.discount"
                            oninput="value=value.replace(/[^\d|.]/g,'')"
                            @keydown="inputFixed(item.discount)"
                            @keyup="discountChange(item)"/>
                        <span v-show="item.id && !item.isMainGoods">{{item.discount}}</span>
                    </td>
                    <!--商品单价-->
                    <td style="width:140px;text-align:center">
                        <input type="text" style="width:100%;text-align:center" 
                            v-show="item.id && item.isMainGoods" 
                            v-model="item.saleUnitPrice" 
                            oninput="value=value.replace(/[^\d|.]/g,'')"
                            @keyup="saleUnitPrice(item)"/>
                        <span v-show="item.id && !item.isMainGoods">{{item.saleUnitPrice}}</span>
                    </td>
                    <td style="text-align:center" v-show="!item.id"></td>
                    <td style="text-align:center" v-show="item.id">{{item.num*item.saleUnitPrice|toFixed(2)}}</td>
                    <td style="text-align:center">
                        <a v-show="item.id && item.isMainGoods" 
                            @click="deleteGoods(item.indexNo)">删除</a>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>

        <!--订单信息-->
        <div class="content-block">
            <div class="order-block">
                <div class="input-block">
                    <label class="label-mini">货款合计:</label>
                    <el-input class="input-with-select" disabled
                        v-model="goodsTotalAmount" 
                        size="mini">
                    </el-input>
                </div>

                <div class="input-block">
                    <label class="label-mini">邮资:</label>
                    <el-input class="input-with-select"
                        v-model="freightAmount" 
                        size="mini">
                    </el-input>
                </div>

                <div class="input-block">
                    <label class="label-mini">合计金额:</label>
                    <el-input class="input-with-select" disabled
                        v-model="totalAmount" 
                        size="mini">
                    </el-input>
                </div>
            </div>
                    
            <div class="order-block">
                <div class="input-block">
                    <label class="label-mini">订单来源:</label>
                    <el-select placeholder="请选择"
                        v-model="orderSource"
                        size="mini">
                        <el-option v-for="item in sourceList" 
                            :key="item.id"
                            :label="item.optText"
                            :value="item.optValue">
                        </el-option>
                    </el-select>
                </div>

                <div class="input-block">
                    <label class="label-mini">是否属于大单:</label>
                    <el-radio v-model="isBigOrder" label="1">是</el-radio>
                    <el-radio v-model="isBigOrder" label="0">否</el-radio>
                </div>
            </div>
            
            <div class="order-block">
                <div class="input-block">
                    <label class="label-mini">收货人:</label>
                    <el-input placeholder="请选择收货人" class="input-with-select"
                        v-model="selectedConsignee.name" 
                        :disabled="true"
                        size="mini">
                        <el-button slot="append" icon="el-icon-search" 
                            @click="chooseConsignee()"></el-button>
                    </el-input>
                </div>

                <div class="input-block">
                    <label class="label-mini">是否选择发票:</label>
                    <el-radio v-model="isInvoice" label="1">是</el-radio>
                    <el-radio v-model="isInvoice" label="0">否</el-radio>
                </div>

                <div class="input-block" v-show="isInvoice == 1">
                    <label class="label-mini">发票抬头:</label>
                    <el-input placeholder="请选择发票" class="input-with-select"
                        v-model="selectedConsignee.name" 
                        :disabled="true"
                        size="mini">
                        <el-button slot="append" icon="el-icon-search" @click="chooseCustomer()"></el-button>
                    </el-input>
                </div>
            </div>

            <div class="order-block">
                <div class="input-block">
                    <label class="label-mini">客户备注:</label>
                    <el-input placeholder="请填写客户备注" class="input-with-select"
                        v-model="remark" 
                        size="mini">
                    </el-input>
                </div>

                <div class="input-block">
                    <label class="label-mini">客服备注:</label>
                    <el-input placeholder="请填写客服备注" class="input-with-select"
                        v-model="serviceRemark" 
                        size="mini">
                    </el-input>
                </div>
            </div>
            
        </div>

        <!--表单提交-->
        <div class="bottom-buttons">
            <el-button type="primary" @click="submitOrder()">保存</el-button>
            <el-button type="info">重置</el-button>
        </div>

        <!--选择客户-->
        <select-customer :chooseCustomerVisible.sync="chooseCustomerVisible"
            :customerCount="customerCount" 
            :pagingPage="pagingPage" 
            :customerList="customerList"
            @get-customer-list="getCustomerList"
            @set-customer="setCustomer"></select-customer>

        <!--选择商品弹框-->
        <select-goods :chooseGoodsVisible.sync="chooseGoodsVisible"
            :goodsCount="goodsCount"
            :pagingPageGoods="pagingPageGoods"
            :goodsList="goodsList"
            @get-goods-list="getGoodsList"
            @set-goods="setGoods"></select-goods>

    </div>
</template>

<script>
import SelectCustomer from '@/components/SelectCustomer'
import SelectGoods from '@/components/SelectGoods'

import { Promise } from 'q';
import { Validator } from '@/validate.js';

export default {
    name:'manual-order',
    components:{SelectCustomer, SelectGoods},
    data(){
        return{
            dealerId:'',
            orderStore:'',
            orderSource:'',
            storeList:[],
            sourceList:[],
            remark:'',

            //选择客户弹框
            chooseCustomerVisible:false,
            customerList:[],
            customerCount:0,
            pagingPage:1,
            selectedCus: {},

            //选择商品
            selectedGoodsList:[0,1,2,3,4,5,6,7],
            selectedFormedList:[0,1,2,3,4,5,6,7],
            chooseGoodsVisible: false,
            buyNoSearch:'',
            modelSearch:'',
            titleSearch:'',
            pagingPageGoods:1,
            goodsCount:0,
            goodsList:[],
            checkedGoodsList:[],
            delList:[],

            //选择收货人
            selectedConsignee:{},

            //订单信息
            freightAmount:0,
            isInvoice:'0',
            isBigOrder:'0',
            serviceRemark:'',

        }
    },
    methods:{
        //选择客户按钮
        chooseCustomer:function(){
            this.getCustomerList().then( ()=> {
                this.chooseCustomerVisible = true;
            });
        },

        //获取客户列表数据
        getCustomerList:function(data){
            let that = this;

            if(data) {
                that.pagingPage = data.page+1
            } else {
                that.pagingPage = 1;
            }
            let loadingInstance = Loading.service(that.loading);
       
            return new Promise(function(resolve){
                that.axios.get('/emro_boss/orderbymanual/newcustomerlist', {params:data || {page:0,rows:20}})
                .then( (res) => {
                    
                    that.customerList = res.data.crmcList;
                    that.customerCount = res.data.count;
                    resolve(res.data);
                    that.$nextTick(() => {
                        loadingInstance.close();
                    });
                    })
                    .catch(()=>{
                        alert('获取客户信息失败')
                        that.$nextTick(() => {
                            loadingInstance.close();
                        });
                    })
            })
          
        },

        //设置已选客户
        setCustomer:function(item){
            if(!item.dealerId) {
                alert('请选择客户');
                return
            }

            this.selectedCus = item;
            this.dealerId = this.selectedCus.dealerId;
            this.chooseCustomerVisible = false;
        },

        //选择商品按钮
        chooseGoods:function(){
            this.getGoodsList().then(()=>{
                this.chooseGoodsVisible = true;
            })
        },

        //获取商品列表数据
        getGoodsList: function(data){
            let that = this;
            let requestData = data;
            if(!requestData) {
                requestData = {
                    page:0,
                    size:20
                }
            }
            requestData.channel=this.orderStore;
            requestData.delList=this.delList.join(',');
            
            that.pagingPageGoods = requestData.page+1;
            let loadingInstance = Loading.service(that.loading);
            return new Promise(function( resolve){
                that.axios.get('/emro_boss/orderbymanual/goodslist', {
                    params:requestData
                }).then( (res)=> {
                    that.goodsCount = Number(res.data.count) ;
                    that.goodsList = that.formGoodsData(res.data.goodsList);
                    that.$nextTick(() => {
                        loadingInstance.close();
                    });
                     resolve(res);
                })
                .catch(()=>{
                    that.$nextTick(() => {
                        loadingInstance.close();
                    });
                   alert('获取商品数据失败')
                })
            })
        },

        //格式化数据
        formGoodsData: function(list){
            let formedData = [];
            if(list.length>0){
                list.forEach(element => {
                    let indexNo = list.indexOf(element);
                    if(element.id){
                        element.childList =  element.childList?element.childList:[];
                        element.isMainGoods = true;
                        element.colSpan = element.childList.length;
                        element.indexNo = indexNo;
                        formedData.push(element);
                        element.childList.forEach( child => {
                            let itemChild = child;
                            itemChild.isMainGoods = false;
                            itemChild.indexNo = indexNo;
                            formedData.push(itemChild)
                            })
                    } else {
                        formedData.push(element)
                    }
                    
                })
            }
            return formedData;
        },

        //设置选择的商品
        setGoods: function(list){
            let that = this;
   
            if( list.length == 0 ){
                alert('请选择商品');
                return false;
            }

            list.forEach(element=>{
                let length = that.delList.length;
                that.$set(that.selectedGoodsList, length, element);
                that.delList.push(element.id);
            });
            that.selectedFormedList = that.formGoodsData(that.selectedGoodsList);
            that.chooseGoodsVisible = false;
        },

        //删除商品
        deleteGoods:function(index){
            let that = this;
             that.selectedGoodsList.splice(index, 1);
             that.delList.splice(index, 1);
             if(that.delList.length<8){
                 for (let i=0;i<8;i++){
                     if(!that.selectedGoodsList[i] || !that.selectedGoodsList[i].id){
                         that.selectedGoodsList[i] = i;
                     }
                 }
             }
             that.selectedFormedList = that.formGoodsData(that.selectedGoodsList);
        },

        inputFixed:function(value){
            if(value.slice(value.indexOf('.') + 1).length>=2){
                value=value.slice(0, -1);
            }
        },
        //折扣发生变化
        discountChange: function(item){
            item.saleUnitPrice = this.mul(item.discount, item.unitPrice).toFixed(2);
        },

        //单价发生变化
        saleUnitPrice: function(item){
            item.discount = this.div(item.unitPrice, item.saleUnitPrice);
        },

        //提交表单
        submitOrder: function(){
          const validator = new Validator();

            validator.check(this.dealerId,[{strategy:'isEmpty',errMsg:'请选择客户'}]);
            validator.check(this.orderStore,[{strategy:'isEmpty',errMsg:'请选择店铺'}]);
            validator.check(this.delList,[{strategy:'isEmpty',errMsg:'请选择商品'}]);
            // validator.check(this.orderStore,[{strategy:'isEmpty',errMsg:'请选择店铺'}]);
            let errMsg =  validator.checkResult();

            if(errMsg) {
                alert(errMsg);
                return
            }
        },
   
    },

    computed:{
        goodsTotalAmount: function(){
            let that = this;
            let totalAmount = 0;
            that.selectedGoodsList.forEach( element => {
                if(element.id){
                    totalAmount =this.add(totalAmount,  this.mul(element.num, element.saleUnitPrice));
                }
            })
            return totalAmount;
        },

        totalAmount: function(){
            return this.add(Number(this.freightAmount), Number(this.goodsTotalAmount))
        }
    },

    created:function(){

        //获取配置信息
        this.axios.get('/emro_boss/sysoptions/sysoptionslist/')
        .then( (res)=>{
            this.storeList  = res.data.storeList;
            this.sourceList  = res.data.sourceList
        })
    },

    beforeRouteLeave(to, from, next){
        const answer = window.confirm('离开当前页面信息将不会保存,确认离开?')

        if(answer){
            next()
        } else {
            next(false)
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
    display: flex;
    justify-content: center;
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
    color: #C0C4CC
}
</style>
