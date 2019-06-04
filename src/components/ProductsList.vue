<template>
    <div class="products-list" v-show="productsShow">
        <h4>商品明细:</h4>
        <table class="table table-border table-nowrap" v-show="formalProductsList.length>0">
            <thead>
                <tr>
                    <th>序列</th>
                    <th>品牌</th>
                    <th>订货号</th>
                    <th>商品型号</th>
                    <th>商品名称</th>
                    <th>库存</th>
                    <th>库存明细</th>
                    <th>仓库</th>
                    <th>数量</th>
                    <th>价格</th>
                    <th>合计</th>
                    <th>退款数量</th>
                    <th>预计交货时间</th>
                    <th>备注</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in formalProductsList" :key="item.id">
                    <td style="text-align:center" 
                    :rowspan="item.rowSpan"
                    v-if="item.isShow">{{item.indexNo + 1}}</td>
                    <td>{{item.brandName}}</td>
                    <td>{{item.buyNo}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.goodName}}</td>
                    <td>{{item.stock}}</td>
                    <td></td>
                    <td>{{item.storage}}</td>
                    <td>{{item.num}}</td>
                    <td>{{item.realUnitPrice}}</td>
                    <td>{{item.realPrice.toFixed(2)}}</td>
                    <td>{{item.refundNum}}</td>
                    <td>{{item.remarkDelivery}}</td>
                    <td>{{item.remark}}</td>
                </tr>
            </tbody>
        </table>
        <p v-show="formalProductsList.length == 0">该订单没有商品</p>
    </div>
</template>

<script>
export default {
    name:'products-list',
    props: {
        productsShow: Boolean,
        productsList:Array
    },
    computed: {
        formalProductsList(){
            let productsList = this.productsList;
            let formalProductsList = [];
            productsList.forEach(element => {
                if(!element.childList) {
                    element.childList = [];
                }
                element.indexNo = productsList.indexOf(element);
                element.isMainGoods = true;
                element.rowSpan = element.childList.length+1;
                element.isShow = true;
                formalProductsList.push(element);

                element.childList.forEach( childItem => {
                    childItem.mainGoodsId = element.id;
                    formalProductsList.push(childItem);
                })
                
            });
            
            return formalProductsList;

        }
    }
}
</script>

<style>
.products-list {
    padding: 0 20px;
    margin-bottom: 20px;
}

.products-list p {
    font-size: 14px;
    color: red;
}
</style>
