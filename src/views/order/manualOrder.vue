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
                <el-select class="store" v-model="orderStore" :disabled="!!orderStore"  placeholder="请选择" size="mini">
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
                <tr v-for="(item,index) in selectedFormedList" :key="index" :class="[item.isMainGoods || !item.id?'':'sub-goods']">
                    <td>{{item.title}}</td>
                    <td>{{item.buyNo}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.brandNameCn}}</td>
                    <td>{{item.series}}</td>
                    <td style="text-align:center">{{item.measure}}</td>
                    <td style="width:100px;text-align:center">
                        <input type="text" style="width:100%;text-align:center" 
                        oninput="value=value.replace(/[^\d]/g,'')"
                        v-show="item.id && item.isMainGoods" 
                        v-model="item.num"/>
                        <span v-show="item.id && !item.isMainGoods">{{item.num}}</span>
                    </td>
                    <!--商品数量-->
                    <td style="text-align:center">
                        <span  v-show="item.storesCnt==0">{{item.stock}}</span>
                         <select v-model="item.stockSelId" v-show="item.storesCnt&&item.storesCnt!=0">
                            <option v-for="i in item.dealerStoreList" :key="i.dealerStoreId" :value="i.dealerStoreId">{{i.storeNm}}</option>
                        </select>
                    </td>
                    <td style="text-align:center">{{item.couponPrice}}</td>
                    <td style="text-align:center">{{item.unitPrice}}</td>
                    <!--商品折扣-->
                    <td style="width:140px;text-align:center">
                        <input type="text" style="width:100%;text-align:center" 
                                v-show="item.id && item.isMainGoods" 
                                v-model="item.discount" @keyup="discountChange(item)"/>
                        <span v-show="item.id && !item.isMainGoods">{{item.discount}}</span>
                    </td>
                    <!--商品单价-->
                    <td style="width:140px;text-align:center">
                        <input type="text" style="width:100%;text-align:center" 
                                v-show="item.id && item.isMainGoods" 
                                v-model="item.saleUnitPrice" 
                                @keyup="saleUnitPrice(item)"/>
                        <span v-show="item.id && !item.isMainGoods">{{item.saleUnitPrice}}</span>
                    </td>
                    <td style="text-align:center">{{item.id?item.num*item.saleUnitPrice || 0:''}}</td>
                    <td style="text-align:center"><a v-show="item.id && item.isMainGoods" @click="deleteGoods(item.indexNo)">删除</a></td>
                </tr>
            </tbody>
            </table>
        </div>

        <!--订单信息-->
        <div class="content-block">
            <div class="order-block">
                <div class="input-block">
                    <label class="label-mini">货款合计:</label>
                    <el-input placeholder="" class="input-with-select" disabled
                            v-model="goodsTotalAmount" 
                            size="mini">
                    </el-input>
                </div>

                <div class="input-block">
                    <label class="label-mini">邮资:</label>
                    <el-input placeholder="" class="input-with-select"
                            v-model="freightAmount" 
                            size="mini">
                    </el-input>
                </div>

                <div class="input-block">
                    <label class="label-mini">合计金额:</label>
                    <el-input placeholder="" class="input-with-select" disabled
                            v-model="totalAmount" 
                            size="mini">
                    </el-input>
                </div>
            </div>
                    
            <div class="order-block">
                <div class="input-block">
                    <label class="label-mini">订单来源:</label>
                    <el-select v-model="orderSource" placeholder="请选择" size="mini">
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
                        <el-button slot="append" icon="el-icon-search" @click="chooseCustomer()"></el-button>
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
        <div class="bottom-buttons">
            <el-button type="primary" @click="submitOrder()">保存</el-button>
            <el-button type="info">重置</el-button>
        </div>

        <!--选择客户弹框-->
        <el-dialog
            title="选择客户"
            :visible.sync="chooseCustomerVisible"
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
                <el-button @click="chooseCustomerVisible = false">取消</el-button>
                <el-button type="primary" @click="setCustomer()">确定</el-button>
            </span>
        </el-dialog>

        <!--选择商品弹框-->
        <el-dialog
            title="选择商品"
            :visible.sync="chooseGoodsVisible"
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
                <el-button @click="chooseGoodsVisible = false">取消</el-button>
                <el-button type="primary" @click="setGoods()">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import PageList from '@/components/PageList'
import { Promise } from 'q';
import { Loading } from 'element-ui';
import { Validator } from '@/validate.js';
export default {
    name:'manual-order',
    components:{PageList},
    data(){
        return{
            storeList:[],
            sourceList:[],
            orderStore:'',
            orderSource:'',
            dealerId:'',
            remark:'',
            test:true,

            loading: {
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
                customClass:'top-mask'
            },

            //选择客户弹框
            chooseCustomerVisible:false,
            customerList:[],
            customerCount:0,
            pagingPage:1,
            nameSearch:'',
            linkmanSearch:'',
            mobileSearch:'',
            selectedCusId:'',
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
            }).catch(()=>{
                alert('获取客户信息失败')
            });
        },

        //获取客户列表数据
        getCustomerList:function(page,size){
    
            let that = this;
    
           let loadingInstance = Loading.service(that.loading);
            let data ={
                linkMan:that.linkmanSearch,
                name:that.nameSearch,
                mobile:that.mobileSearch,
                page:page?page-1:0,
                rows:size || 20,
            }
            return new Promise(function(resolve, reject){
                that.axios.get('/emro_boss/orderbymanual/newcustomerlist', {params:data})
                .then( (res) => {
                    
                    that.customerList = res.data.crmcList;
                    that.customerCount = res.data.count;
                    resolve(res.data);
                    that.$nextTick(() => {
                        loadingInstance.close();
                    });
                    })
                    .catch((rej)=>{
                        reject(rej);
                        that.$nextTick(() => {
                            loadingInstance.close();
                        });
                    })
            })
          
        },

        //设置已选客户
        setCustomer:function(){
            console.log(this.selectedCusId);
            this.customerList.forEach(element => {
                if (element.id == this.selectedCusId) {
                    this.selectedCus = element;
                }
                
            });
            this.chooseCustomerVisible = false;
        },

        //选择商品按钮
        chooseGoods:function(){
            this.getGoodsList().then(()=>{
                this.chooseGoodsVisible = true;
            })
            .catch(()=>{
                alert('获取商品数据失败')
            })
        },

        //获取商品列表数据
        getGoodsList: function(page, size){
            let that = this;
            that.checkedGoodsList = [];
            let data = {
                title: this.titleSearch,
                buyNo:this.buyNoSearch,
                model:this.modelSearch,
                channel:this.orderStore,
                delList:this.delList.join(','),
                page:page?page-1:0,
                size:size || 20,
            };
            
            let loadingInstance = Loading.service(that.loading);
            return new Promise(function( resolve, reject){
                that.axios.get('/emro_boss/orderbymanual/goodslist', {
                    params:data
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
                    reject();
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
        setGoods: function(){
            let that = this;
            if( that.checkedGoodsList.length == 0 ){
                alert('请选择商品');
                return false;
            }

            that.checkedGoodsList.forEach(element=>{
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

        //折扣发生变化
        discountChange: function(item){
            item.saleUnitPrice = this.mul(item.discount, item.unitPrice);
        },

        //单价发生变化
        saleUnitPrice: function(item){
            item.discount = this.div(item.unitPrice, item.saleUnitPrice);
        },

        //提交表单
        submitOrder: function(){
          const validator = new Validator();

            validator.check(this.dealerName,[{strategy:'isEmpty',errMsg:'公司名称不能为空'},{strategy:'maxLength:6',errMsg:'公司名称最多6个字符'}]);
            validator.check(this.payAccount,[{strategy:'isEmpty',errMsg:'付款户名不能为空'},{strategy:'maxLength:10',errMsg:'付款户名最多10个字符'}]);
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
