<template>
    <div class="order-list">
        <page-list :totalCount="totalCount" 
                    :pagingPage="pagingPage"
                    @getList="getList">
            <template v-slot:searchContiditions>
                <div class="webui-input" style="display:flex;flex-wrap:wrap">
                    <vipmro-input :width="220" :title-left="10"
                                    :title="'订单号/客户名称'"
                                     v-model="idName"  
                                    ></vipmro-input>
                    
                    <vipmro-select :width="110" :title-left="10"
                                   :title="'店铺'"
                                   :options="orderStore"
                                   v-model="selectOrderStore"           
                                   ></vipmro-select>

                    <vipmro-select :width="110" :title-left="10"
                                   :title="'订单状态'"
                                   :options="orderStatus"
                                   v-model="selectOrderStatus"
                                   ></vipmro-select>

                    <vipmro-select :width="110"
                                   :title-left="10"
                                   :title="'订单来源'"
                                   :options="orderSource"
                                   v-model="selectorderSource"
                                   ></vipmro-select>

                    <vipmro-select :width="110"
                                   :title-left="10"
                                   :title="'下单渠道'"
                                   :options="orderChannel"
                                   v-model="selectOrderChannel"
                                   ></vipmro-select>

                    <vipmro-select :width="110"
                                   :title-left="10"
                                   :options="hasPushed"
                                   v-model="selectHasPushed"
                                   :title="'是否推送'"
                                   ></vipmro-select>
                    <vipmro-select :width="110"
                                   :title-left="10"
                                   :options="hasPushed"
                                   v-model="selectHasPushedOMS"
                                   :title="'是否推送OMS'"
                                   ></vipmro-select>

                    <vipmro-select :options="serviceList"
                                    v-model="serviceId"
                                    :title="'按客服查询'"
                                    :width="110"
                                    :title-left="10"
                                    ></vipmro-select>

                    <vipmro-select :options="managerList"
                                    v-model="managerId"
                                    :title="'按客户查询'"
                                    :width="110"
                                    :title-left="10"
                                    ></vipmro-select>

                    <vipmro-input :width="110" :title="'收件人'"  :title-left="10"
                                    v-model="consignee"></vipmro-input>
                    <vipmro-input :width="110" :title="'联系电话'"  :title-left="10"
                                    v-model="mobile"></vipmro-input>
            
                    <div class="webui-datepicker">
                        <vipmro-datepicker
                            v-model="orderTime"
                            width="300"
                            :range="range"
                            :title="'下单时间'"
                        ></vipmro-datepicker>
                    </div>

                    <div class="webui-datepicker">
                        <vipmro-datepicker
                            v-model="payTime"
                            width="300"
                            :range="range"
                            :title="'付款时间'"
                        ></vipmro-datepicker>
                    </div>
                
                    <vipmro-select :options="orderType"
                                    v-model="selectOrderType"
                                    :title="'订单类型'"
                                    :width="110"
                                    :title-left="10"
                                    ></vipmro-select>
                                        
                    <vipmro-select :options="sellerType"
                                    v-model="sellerId"
                                    :title="'供应商'"
                                    :width="110"
                                    :title-left="10"
                                    ></vipmro-select>

                    <vipmro-select :options="hasInvoice"
                    v-model="selectHasInvoice"
                    :title="'发票情况'"
                    :width="110"
                    :title-left="10"
                    ></vipmro-select>
                </div>
                <div class="webui-button">
                    <vipmro-button :title="'查询'" @click="getList()"></vipmro-button>
                    <vipmro-button :title="'导出订单'" @click="exportOrder()"></vipmro-button>
                    <vipmro-button :title="'导出商品明细'" ></vipmro-button>
                </div>
            </template>

            <template v-slot:tableBlock>
                <div class="leftContent">
                    <table class="table table-border table-nowrap table-hover table-striped">
                    <thead>
                        <tr>
                            <th>订单号</th>
                            <th>客户名称</th>
                            <th>操作</th>
                            <th>收件人</th>
                            <th>收件地址</th>
                            <th>处理时间</th>
                            <th>订单状态</th>
                            <th>应付金额</th>
                            <th>已付金额</th>
                            <th>白条支付</th>
                            <th>收款账户</th>
                            <th>客服备注</th>
                            <th>客户备注</th>
                            <th>代发</th>
                            <th>货品合计</th>
                            <th>退款金额</th>
                            <th>运费</th>
                            <th>抵用券抵扣</th>
                            <th>余额抵扣</th>
                            <th>货返抵扣</th>
                            <th>优惠金额</th>
                            <th>团购优惠</th>
                            <th>工豆抵扣</th>
                            <th>优惠券抵扣</th>
                            <th>运费抵扣</th>
                            <th>订单来源</th>
                            <th>下单渠道</th>
                            <th>商铺</th>
                            <th>客服</th>
                            <th>客户专员</th>
                            <th>原始单号</th>
                            <th>原单号</th>
                            <th>供应商</th>
                            <th>建单时间</th>
                            <th>付款时间</th>
                            <th>发货时间</th>
                            <th>确认收货时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in orderList" v-bind:key="item.id" @click="toggleProductsTable(item.id,item.originalOrderId)">
                            <td style="min-width:180px;">
                                <input type="checkbox" style="float:left;margin-right:.3rem" :value="item" :id="item.id" v-model="checkedIds"/>
                                <span style="float:left">{{item.childId}}</span>
                                <i class="iconfont icon-zeng"
                                   v-if="item.giftExchangeId"></i>
                            </td>
                            <td>{{item.crmName}}</td>
                            <td style="world-break:break-all">
                                <a @click="showContract(item.eContractHtml, item.eContractPdf, item.id, item.sourceOrderId)">合同模板</a>
                                <a v-show="item.orderStatusView == '已发货'|| item.orderStatusView == '已收货'|| item.orderStatusView == '对账中'|| item.orderStatusView == '已完成' || item.orderStatusView == '退货中'"
                                    @click="logisticsInfo(item.id, item.buyerId, item.sourceOrderId)">物流跟踪</a>
                                <a v-show="item.thirdId == 2">ABB发货查询</a>
                                <a v-show="item.isHaveReceipt !='0' && (item.orderStatus ==2 || item.orderStatus ==3 || item.orderStatus ==4|| item.orderStatus ==5 || item.orderStatus ==6)">发票物流</a>
                                <a v-show="item.orderStatusView == '已发货'|| item.orderStatusView == '已收货'|| item.orderStatusView == '对账中'|| item.orderStatusView == '已完成' || item.orderStatusView == '退货中'">导出包裹信息</a>
                                <a v-if="!!item.omsOrderId && item.settleFlg==1 && (item.orderStatus ==2 || item.orderStatus ==3 || item.orderStatus ==4|| item.orderStatus ==5)">{{item.pushFinishStatusText}}</a>

                                <!--推送E助按钮:当未推送E助并且未推送OMS且不是菲尼克斯且不是ABB的订单时,显示"推送E助";若已推送E助,则显示已推送E助且不可点击-->
                                <a v-show="!item.omsOrderId && item.isPhoenix !=1 && item.isAbb !=1 && (item.orderStatus ==2 || item.orderStatus ==3 || item.orderStatus ==4 || item.orderStatus ==5 || item.orderStatus ==6)"
                                   v-bind:class="[item.thirdId?'for-disabled':'']">{{item.thirdId?'已推送E助':'推送E助'}}</a>

                                <!--若是菲尼克斯订单且未推送,则显示推送菲尼克斯(OMS)按钮,若已推送,则显示已推送菲尼克斯(OMS)且不可点击-->
                                <a v-show="item.isPhoenix==1 && !item.omsOrderId && (item.orderStatus ==2 || item.orderStatus ==3 || item.orderStatus ==4 || item.orderStatus ==5 || item.orderStatus ==6)"
                                   v-bind:class="[item.thirdId == 1?'for-disabled':'']">{{item.thirdId == 1?"已推送菲尼克斯(OMS)":"推送菲尼克斯(OMS)"}}</a>

                                <!--若是ABB订单且未推送,则显示推送ABB(OMS)按钮,若已推送,则显示已推送ABB(OMS)且不可点击-->
                                <a v-show="item.isAbb==1 && !item.omsOrderId && (item.orderStatus ==2 || item.orderStatus ==3 || item.orderStatus ==4 || item.orderStatus ==5 || item.orderStatus ==6)"
                                   v-bind:class="[item.thirdId == 2?'for-disabled':'']">{{item.thirdId == 2?"已推送ABB(OMS)":"推送ABB(OMS)"}}</a>

                                <!--推送OMS按钮:未推送E助且未推送OMS;若推送了OMS,则显示已推送OMS和取消推送OMS-->
                                <a v-show="!item.thirdId && (item.orderStatus ==2 || item.orderStatus ==3 || item.orderStatus ==4|| item.orderStatus ==5 || item.orderStatus ==6)"
                                   >{{item.omsOrderId?'取消推送OMS': '推送OMS'}}</a>
                                <a class="for-disabled" v-show="!item.thirdId && (item.orderStatus ==2 || item.orderStatus ==3 || item.orderStatus ==4|| item.orderStatus ==5 || item.orderStatus ==6) && item.omsOrderId"
                                   >已推送OMS</a>

                            </td>
                            <td>{{item.consignee}}</td>
                            <td>{{item.address}}</td>
                            <td>{{item.handleTime | formatSeconds}}</td>
                            <td>{{item.orderStatusView}}</td>
                            <td>{{item.actualAmount}}</td>
                            <td>{{item.paidAmount}}</td>
                            <td>{{item.iousStatus==0?'':item.creditAmount}}</td>
                            <td>{{item.optText}}</td>
                            <td>
                                <span>{{item.serviceRemark}}</span>
                            </td>
                            <td style="color:red">{{item.buyerRemark}}</td>
                            <td>{{item.isDropShipping==1?'是':'否'}}</td>
                            <td>{{item.goodsAmount}}</td>
                            <td>{{item.refundAmount}}</td>
                            <td>{{item.freightAmount}}</td>
                            <td>{{item.scoreDeductionAmout}}</td>
                            <td>{{item.balanceDeduction}}</td>
                            <td>{{item.extraBalanceDeduction}}</td>
                            <td>{{item.discountAmount}}</td>
                            <td>{{item.groupOrderSale}}</td>
                            <td>{{item.beanDeduction}}</td>
                            <td>{{item.couponGoodsAmount}}</td>
                            <td>{{item.couponFreightAmount}}</td>
                            <td>{{item.orderSourceView}}</td>
                            <td>{{item.orderChannelView}}</td>
                            <td>{{item.storeName}}</td>
                            <td>{{item.customerService}}</td>
                            <td>{{item.customerManager}}</td>
                            <td>{{item.originalOrderId}}</td>
                            <td>{{item.id}}</td>
                            <td>{{item.shortName}}</td>
                            <td style="min-width:160px;">{{item.orderTime | date}}</td>
                            <td style="min-width:160px;">{{item.payTime | date}}</td>
                            <td style="min-width:160px;">{{item.shippingTime | date}}</td>
                            <td style="min-width:160px;">{{item.consignTime | date}}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                <div class="rightNav">
                    <ul>
                        <li><a @click="createRefundSheet()">生成退款单</a></li>
                        <li><a>取消E助推送</a></li>
                    </ul>
                </div>
                
            </template>

        </page-list>

        <!-- 商品信息 -->
        <products-list :productsShow = "productsShow" :productsList = "productsList"></products-list>

        <!-- 合同模板弹框 -->
        <div class="webui-dialog">
            <vipmro-dialog :title="'合同模板'"
                            v-model="contractVisible"
                            :is-hide-cancel="true"
                            :confirm-text="'下载'"
                            :inner-height ="600"
                            @confirm="downContract">
                <iframe style="width:100%;height:600px" :src="currUrl" ></iframe>
            </vipmro-dialog>
            </div>
        <!-- 物流跟踪 -->
        <div class="webui-dialog">
            <vipmro-dialog :title="'物流跟踪'"
            v-model="logisticsVisible"
            :is-hide-cancel="true"
            :is-hide-confirm="true">
            <p v-show="parcel.length == 0">暂无物流信息</p>
            </vipmro-dialog>
            </div>

        <!-- 生成退款单 -->
        <div class="webui-dialog">
            <vipmro-dialog :title="'生成退款单'"
                            v-model="refundSheetVisible">
                <div class="webui-tab">
                    <vipmro-tab v-model="tabPosition" :list="tabList">
                        <template :slot="'mianOrder'" >
                            <div>1
                            </div>
                        </template>
                        <template :slot="'sourceOrder'" >
                            <div>2
                            </div>
                        </template>
                    </vipmro-tab>
                </div>
            </vipmro-dialog>
            </div>
        </div>
</template>

<script>
import PageList from '@/components/PageList'
import ProductsList from '@/components/ProductsList' 
import { Loading } from 'vipmro-webui';
export default {
    name:'order-list',
    components: {
        PageList,
        ProductsList,
     },
    data(){
        return{
            
                totalCount:0,
                pagingPage:1,
                orderList:[],
                orderStore: [],
                orderStatus: [],
                orderSource: [],
                orderChannel: [],
                managerList:[],
                serviceList:[],
                orderType:[
                    {
                        value:'',
                        text:'请选择'
                    },{
                        value:'1',
                        text:'团购'
                    }],
                hasPushed:[
                    {
                        value:'',
                        text:'请选择',
                    },{
                        value:'1',
                        text:'已推送',
                    },{
                        value:'2',
                        text:'未推送',
                    }],
                sellerType:[
                    {
                        value:'',
                        text:'请选择'
                    },{
                        value:'939798',
                        text:'南京朗驰'
                    },{
                        value:'939817',
                        text:'苏州工品汇'
                    }],
                hasInvoice: [
                    {
                        value:'',
                        text:'请选择'
                    },{
                        value:'1',
                        text:'已开票'
                    },{
                        value:'0',
                        text:'未开票'
                    }],
                
                idName:'',
                selectOrderStore:'',
                selectOrderStatus:'',
                selectorderSource:'',
                selectOrderChannel:'',
                selectHasPushed:'',
                selectHasPushedOMS:'',
                serviceId:'',
                managerId:'',
                consignee:'',
                mobile:'',
                orderTime: [],
                payTime:[],
                selectOrderType:'',
                sellerId:'',
                selectHasInvoice:'',
                
                range: true,
                
                contractVisible:false,
                currUrl:'',
                downloadSouId:'',
                pdfUrl:'',

                logisticsVisible:false,
                parcel: [],

                loading:'',

                checkedIds:[],

                refundSheetVisible: false,

                tabPosition: 'mainOrder',
                
                tabList: [{
                    title: '主订单',
                    name: 'mainOrder'
                }, {
                    title: '原始订单',
                    name: 'sourceOrder'
                }],

                productsShow: false,

                productsList: [],
            }
     },
    methods:{
        getList: function(page,size){
            this.pagingPage = page || 1;
            
            this.showLoading();
            //封装查询条件
           let data = {
               queryTxt: this.idName,
               orderStore: this.selectOrderStore,
               orderStatus: this.selectOrderStatus,
               orderSource: this.selectorderSource,
               orderChannel: this.selectOrderChannel,
               thirdId: this.selectHasPushed,
               pushOmsFlag: this.selectHasPushedOMS,
               customerServiceId: this.serviceId,
               customerManagerId: this.managerId,
               consignee: this.consignee,
               mobile: this.mobile,
               startOrderTimeView: this.orderTime[0],
               endOrderTimeView: this.orderTime[1],
               startPayTimeView: this.payTime[0],
               endPayTimeView: this.payTime[1],
               orderType: this.selectOrderType,
               sellerId: this.sellerId,
               isHaveReceipt: this.selectHasInvoice,
               page: page?page-1:0,
               rows:size?size:20,
           };
            this.axios.get('/emro_boss/order/getOrder', {params:data})
            .then((res) => {
                this.totalCount = res.data.total;
                this.orderList = res.data.orderList;
                this.closeLoading();
            }).catch(()=>{
                this.closeLoading();
            })},

        // 获取配置
        getOptions: function(){
            let defaultOption = [{
                value:'',
                text:'请选择'
            }]
            this.axios.get('/emro_boss/order/getOptions')
            .then( (res) => {
                let data = res.data;
                this.orderStore = defaultOption.concat(data.orderStore);
                this.orderStatus = defaultOption.concat(data.orderStatus);
                this.orderSource = defaultOption.concat(data.orderSource);
                this.orderChannel = defaultOption.concat(data.orderChannel);
            })},

        //获取客户专员
        getManager: function () {
             let defaultOption = [{
                value:'',
                text:'请选择'
            }]
            this.axios.get('/emro_boss/order/getCustomerManager')
            .then( (res) => {
                let data = res.data;
                this.managerList = data.cmList.map(({id, staffName})=>{
                    return{
                        value:id,
                        text:staffName
                    }
                });
                this.managerList = defaultOption.concat(this.managerList);
            })},

        //获取商务专员
        getService: function () {
             let defaultOption = [{
                value:'',
                text:'请选择'
            }]
            this.axios.get('/emro_boss/order/getCustomerService')
            .then( (res) => {
                let data = res.data;
                this.serviceList = data.csList.map(({id, staffName})=>{
                    return{
                        value:id,
                        text:staffName
                    }
                });
                this.serviceList = defaultOption.concat(this.serviceList);
            })
         },
        //合同模板
        showContract: function (html,pdf,id,sourceOrderId) {
            this.contractVisible = true;
            this.currUrl = html;
            this.pdfUrl = pdf;
            this.downloadSouId = sourceOrderId?sourceOrderId:id
          },
        //物流跟踪
        logisticsInfo:function (id, buyerId, sourceOrderId) {
            this.showLoading();
            let data = {
                id:sourceOrderId?sourceOrderId:id,
                buyerId:buyerId
            }
            this.axios.get('emro_boss/order/getOrderTrackByInterface', {params:data})
            .then((res)=>{
                this.closeLoading();
                let data = res.data;
                if(data.code == 0){
                    this.logisticsVisible = true;
                    // this.parcel = data.parcelList;
                }
            })
           
        },
        //下载合同
        downContract: function () {
            window.open('emro_boss/electronContract/exportEContractPdf?pdf='+encodeURIComponent(this.pdfUrl)+'&sourceOrderId='+this.downloadSouId);
         },
        //打开loading
        showLoading: function () {
            this.loading = Loading.service();
         },
        //关闭loading
        closeLoading: function () {
            this.loading.close();
        },
        //生成退款单
        createRefundSheet: function(){
            if(this.checkedIds.length == 0){
                alert('请选择一条订单');
                return false;
                }
            if(this.checkedIds.length>1){
                alert('只能选择一条订单');
                return false;
                }

                 console.log(this.checkedIds);

            if(this.checkedIds[0].orderStatus!="2" && this.checkedIds[0].orderStatus!="3" && this.checkedIds[0].orderStatus!="4" && this.checkedIds[0].orderStatus!="6"){
                alert("当前状态不可退款!");
                return false;
                }
            if(this.checkedIds[0].payType == "7"){
                alert("1贷通支付的订单暂不支持退货!");
                return false;
                }

                this.refundSheetVisible = true; 
        },

        //导出订单
        exportOrder: function(){

        },

        //展示商品行
        toggleProductsTable: function(id, originalOrderId){
            this.productsShow = true;
            let data = {
                id:id,
                originalOrderId: originalOrderId
            };
            this.axios.get('/emro_boss/order/getOrderGoods', {params:data})
            .then( (res) => {
                this.productsList = res.data.orderGoods
            })
        }
    },
    created:function(){
        this.getList();
        this.getOptions();
        this.getManager();
        this.getService();
    },
    filters: {
        formatSeconds:function (value) {
            let result = '';
            let days = Math.floor(value/86400);
            let hours = Math.floor((value-days*86400)/3600);
            let min = Math.floor((value - days*86400 - hours*3600)/60);
            result = (days?days+'天':'')+(hours?hours+'小时':'')+(min?min+'分钟':days||hours?'':'0分钟')
            return result;
          },

    },
}
</script>

<style scoped>
.leftContent{
    width:94%;
    overflow-x:auto;
    border:1px solid #CCC;
    margin-right: .3rem
}
.rightNav {
    width: 6%;
    margin-top:20px;
}

.rightNav ul li{
    border: 1px solid #cccccc;
    text-align: center;
    margin-bottom: .3rem;
}

.rightNav ul li a {
    font-size: 14px;
}
</style>
