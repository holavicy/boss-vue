<template>
    <div class="manual-order">

        <!--客户信息-->
        <div class="customer-block">
            <div class="input-block">
                <label class="label-mini">公司名称:</label>
                <el-input placeholder="请选择客户" class="input-with-select"
                          v-model="selectedCus.name" 
                          :disabled="true"
                          size="mini">
                    <el-button slot="append" icon="el-icon-search" @click="chooseCustomer()"></el-button>
                </el-input>
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
           
            <table class="table table-border table-nowrap table-striped selectedGoodsTable">
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
                    <th>金额</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in selectedGoodsList" :key="index">
                    <td>{{item.title}}</td>
                    <td>{{item.buyNo}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.brandNameCn}}</td>
                    <td>{{item.series}}</td>
                    <td style="text-align:center">{{item.measure}}</td>
                    <td><input type="text" style="width:100%" v-show="item.id" v-model="item.num"/></td>
                    <td style="text-align:center">{{item.stock}}</td>
                    <td style="text-align:center">{{item.couponPrice}}</td>
                    <td style="text-align:center">{{item.unitPrice}}</td>
                    <td><input type="text" style="width:100%" v-show="item.id" v-model="item.discount"/></td>
                    <td><input type="text" style="width:100%" v-show="item.id" v-model="item.saleUnitPrice"/></td>
                    <td style="text-align:center">{{item.id?item.num*item.saleUnitPrice || 0:''}}</td>
                    <td style="text-align:center"><a v-show="item.id" @click="deleteGoods(index)">删除</a></td>
                </tr>
            </tbody>
            </table>
        </div>

        <!--订单信息-->
        <div class="order-block content-block">
    
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
                <label class="label-mini">收货人:</label>
                <el-input placeholder="请选择收货人" class="input-with-select"
                          v-model="selectedConsignee.name" 
                          :disabled="true"
                          size="mini">
                    <el-button slot="append" icon="el-icon-search" @click="chooseCustomer()"></el-button>
                </el-input>
            </div>
            <div class="input-block">
                <label class="label-mini">客户备注:</label>
                <el-input placeholder="请填写客户备注" class="input-with-select"
                          v-model="remark" 
                          size="mini">
                </el-input>
            </div>

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
        <div class="bottom-buttons">
            <el-button type="primary" >保存</el-button>
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
                                    <tr v-for="item in goodsList" :key="item.id">
                                        <td>
                                            <input type="checkbox" v-model="checkedGoodsList" :value="item"> {{item.brandNameCn}}
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
                    that.goodsList = res.data.goodsList;
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

        //设置选择的商品
        setGoods: function(){
            let that = this;
            if( that.checkedGoodsList.length == 0 ){
                alert('请选择商品');
                return false;
            }
            that.checkedGoodsList.forEach(element=>{
                let length = that.delList.length;
                that.selectedGoodsList[length] = element;
                that.delList.push(element.id);
            });
            that.chooseGoodsVisible = false;
        },

        //删除商品
        deleteGoods:function(index){
             this.selectedGoodsList.splice(index, 1);
             this.delList.splice(index, 1);
             if(this.delList.length<8){
                 for (let i=0;i<8;i++){
                    //  console.log(this.selectedGoodsList[i]);
                     if(!this.selectedGoodsList[i] || !this.selectedGoodsList[i].id){
                         this.selectedGoodsList[i] = i;
                     }
                 }
             }
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
    height: 20px;
}

.bottom-buttons {
    margin-top: 10px;
}
.goods-block .el-button {
    height: 26px;
    border-radius: 0 6px 6px 0;
    padding: 8px;
}

.store >>> .el-input__inner {
    border-radius: 6px 0 0 6px !important;
}

.input-block label {
    width: 100px;
}
</style>
