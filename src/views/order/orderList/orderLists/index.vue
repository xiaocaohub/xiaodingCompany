<template>
    <div class="order_list_page">
        <ul class="nav_list_con">

            <li v-for="(navItem, index) in tabNav" :class="{'on': tabIndex==index}" @click="selectNavFn(index)">{{navItem.title}}</li>    
            
          
        </ul>
        <el-table :data="orderList" style="width: 100%;margin:0 20px;">
            <el-table-column prop="orderNoInfo" label="子订单号" width="200">
                <template slot-scope="scope">
                    <div>
                        <p>{{ scope.row.orderNoInfo.orderNo }}</p>
                        <p>--</p>
                        <p>{{ scope.row.orderNoInfo.orderType | orderTypeFn }}</p>
             
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="sourceName" label="订单来源" width="150"></el-table-column>
            <el-table-column prop="channel" label="渠道" width="150"></el-table-column>
            <el-table-column prop="payPrice" label="订单金额(元)" width="150"></el-table-column>
            
            <el-table-column  prop="addressInfo" label="送货地址" width="250">
                <template slot-scope="scope">
                    <div>
                        
                        <p>{{ scope.row.addressInfo.warehouseName?scope.row.addressInfo.warehouseName:"----" }}</p>
                        <p>{{ scope.row.addressInfo.name?scope.row.addressInfo.name:"----" }}  {{  scope.row.addressInfo.mobile?scope.row.addressInfo.mobile:"----" }}</p>
                        <p>{{ scope.row.addressInfo.provice?scope.row.addressInfo.provice:"----" }} {{  scope.row.addressInfo.city?scope.row.addressInfo.city:"----" }} {{ scope.row.addressInfo.area?scope.row.addressInfo.area:"----" }} {{ scope.row.addressInfo.address?scope.row.addressInfo.address:"----" }}</p>
                        
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="times" label="时间管理" width="250">
                
                
                
                
                
                <template slot-scope="scope">
                    <div>
                        <p>期望发货时间: {{ scope.row.times.expectedDeliveryTime?scope.row.times.expectedDeliveryTime:"----" }}</p> 
                        <p>预计发货时间: {{  scope.row.times.estimatedDeliveryTime?scope.row.times.estimatedDeliveryTime:"----" }}</p>
                        
                        <p>指定发货时间: {{ scope.row.times.specifyDeliveryTime?scope.row.times.specifyDeliveryTime:"----"}}</p>
                    </div>
                </template>
                
            </el-table-column>

            <el-table-column prop="name" label="客户名" width="110"></el-table-column>
            <el-table-column prop="statusRemark" label="订单状态" width="200"></el-table-column>
            <el-table-column prop="name" label="操作" width="200">
                <template slot-scope="scope">
                    <div class="operate_btn_group">
                        
                        <div class="btn" @click="confirmOrderFn(scope.row)" v-if="scope.row.status == 2">确认订单</div>
                        <router-link :to="'/order/orderList/orderDetails?orderNo=' +  scope.row.orderNoInfo.orderNo">订单详情 </router-link>
                        <div class="btn">导出订单</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>


        <div class="page_con">
            <!-- <el-pagination background layout="prev, pager, next" :total="this.total" @current-change="changePageFn"></el-pagination> -->
            <el-pagination background layout="prev, pager, next" :current-page="pageNum" :total="50" @current-change="changePageFn"></el-pagination>
        </div>

        <el-dialog
            title="预计发货时间"
            :visible.sync="orderDialogVisible"
            width="31%"
            
            :center="true"
            :before-close="handleClose">
            
            <div class="order_info_item">
                <div class="title">发货时间:</div>
                <el-date-picker v-model="dateStr" type="datetime" placeholder="选择日期" class="text" @change="selectDateFn"></el-date-picker>
            </div>
            <div class="order_info_item">
                <div class="title">跟单备注:</div>
                
                <el-input type="textarea"  :autosize="{ minRows: 5}" placeholder="请输入内容" v-model="remark" class="text"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="orderDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmFn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {  orderList, confirmOrder } from '@/api/order/orderList';
import { data } from 'jquery';
export default {
    data () {
        return {
            tabNav: [
                {
                    id: 0, 
                    title: "全部订单",
                    status: ""
                },
                {

                    id: 0, 
                    title: "待确认",
                    status: 2
                },
                {
                    id: 0, 
                    title: "待发货",
                    status: 3
                },
                {
                    id: 0, 
                    title: "可发货",
                    status: 4
                },
                {
                    id: 0, 
                    title: "已发货",
                    status: 5
                }
            ],
            tabIndex: 0,
            status: "",
            keyWords: "",
            orderNo: "",
            pageNum: 1,
            pageSize: 10,
            orderList: [],
            
            
            total: 0,
            orderDialogVisible: false,
            dateStr: "",
            date: "",
            time: "",
            remark: "",
            
            currentOrder: ""
        }
    },
    mounted () {
         this.$nextTick(function () {
             this.getOrderListFn()
         })
    },
    methods: {

        selectNavFn: function (index) {
            let _this = this;
            if (this.tabIndex != index) {
        
                this.tabIndex = index;
            }
            this.status = this.tabNav[index].status;
            this.pageNum = 1;
            this.getOrderListFn()
        },
        getOrderListFn: function () {
            let _this = this;
            orderList({
                api: "mch.App.orderV2.list",
                status: this.status,
                keyWords: this.keyWords,
                orderNo: this.orderNo,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }).then((res)=> {
                let resData = res.data.data;
                if (resData) { 
                    _this.total = resData.total;
                    let resOrderArr  = resData.records;
                    let orderArr = [];
                    resOrderArr.forEach((orderItem, index)=> {
                        let item = {

                            orderNoInfo: {
                                orderNo: orderItem.orderNo,
                                name: "-----",
                                orderType: orderItem.orderType
                            },
                            sourceName: orderItem.sourceName,
                            channel: orderItem.channel,
                            payPrice: orderItem.payPrice,
                            addressInfo: {
                                warehouseName: orderItem.warehouseDTO.warehouseName,
                                name: orderItem.warehouseDTO.name,
                                mobile: orderItem.warehouseDTO.mobile,
                                provice: orderItem.warehouseDTO.provice,
                                city: orderItem.warehouseDTO.city,
                                area: orderItem.warehouseDTO.area,
                                address: orderItem.warehouseDTO.address
                            },
                            times: {
                                expectedDeliveryTime: orderItem.expectedDeliveryTime,
                                estimatedDeliveryTime: orderItem.estimatedDeliveryTime,
                                specifyDeliveryTime: orderItem.specifyDeliveryTime
                            }, 
                            name: orderItem.name,
                            statusRemark: orderItem.statusRemark,
                            status: orderItem.status
                        }
                        orderArr.push(item);
                    })
                    _this.orderList = orderArr;
                }
            })
        },
        changePageFn: function (page) {
            this.pageNum = page;
            this.getOrderListFn()
        },
        confirmOrderFn: function (orderItem) {
            console.log(orderItem)
            this.currentOrder = orderItem;
            this.orderDialogVisible = true;
        },        
        selectDateFn: function (date) {
            let dateString = new Date(date);
            let year = dateString.getFullYear();
            let Month = dateString.getMonth() + 1;
            let day = dateString.getDate();
            let hours = dateString.getHours();
            let minutes = dateString.getMinutes();
            let seconds = dateString.getSeconds();
         
            this.dateStr = date;
            this.date = year + "年" + Month + "月" + day + "日" ;
            this.time = hours + "时" + minutes + "分" + seconds + "秒";
        },
        handleClose(done) {

            done();
        },
        confirmFn: function () {
            this.orderDialogVisible = false;
            let _this = this;
            let orderNo = this.currentOrder.orderNoInfo.orderNo;
            confirmOrder({
                api: "mch.App.orderV2.confirm",
                orderNo: orderNo,
                estimatedDeliveryTime: this.dateStr,
                remark: this.remark
            }).then((res)=> {
                //let resData = res.data.data;   
                console.log("confirm order")
                console.log(res)
                console.log("confirm order")
                _this.getOrderListFn()

                if (res.data.code == 200) {
                    _this.$message.success(res.data.message)
                    _this.getOrderListFn()
                } else {
                    _this.$message.error(res.data.message)
                }
                
            })            
        }
    },
    filters: {
        orderTypeFn: function (status) {
            switch (status) {
                case 1:
                    return "自营订单";
                    break ;
                case 2:
                    return "pop";
                    break ;
            }
        }
    }
}
</script>


<style>

@import "./index.css";
</style>

