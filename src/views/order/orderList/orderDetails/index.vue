<template>
    <div class="order_detail_page">
        <div class="big_title">基本信息</div>

        <ul class="info_list_con">
           
            <li>
                <div class="item">
                    <div class="tit">订单编号</div>
                    <div class="txt">{{this.orderInfon.orderParentNo}}</div>
                </div>
                <div class="item">
                    <div class="tit">订单状态</div>
                    <div class="txt">{{  this.orderInfon.statusRemark?this.orderInfon.statusRemark:"----" }}</div>
                </div>
                <div class="item">
                    <div class="tit">结算金额</div>
                    <div class="txt">{{ this.orderInfon.settlementAmount?this.orderInfon.settlementAmount:0 }} 元</div>
                </div>
                <div class="item">
                    <div class="tit">渠道</div>

                    <div class="txt">{{   this.orderInfon.channel?this.orderInfon.channel:"----" }}</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="tit">预计发货时间</div>
                    <div class="txt">{{  this.orderInfon.estimatedDeliveryTime? this.orderInfon.estimatedDeliveryTime:"----" }}</div>
                </div>
                <div class="item">
                    <div class="tit">期望发货时间</div>
                    <div class="txt">{{   this.orderInfon.expectedDeliveryTime?this.orderInfon.expectedDeliveryTime:"----"  }}</div>
                </div>
                <div class="item">
                    <div class="tit">指定发货时间</div>
                    <div class="txt">{{  this.orderInfon.specifyDeliveryTime?this.orderInfon.specifyDeliveryTime:"----" }}</div>
               
               
                </div>
                <div class="item">
                    <div class="tit">客户留言</div>
                    <div class="txt">{{  this.orderInfon.remark?this.orderInfon.remark:"----" }}</div>
                </div>
                


                <div class="item">
                    <div class="tit">是否需要质检</div>
                    <div class="txt">{{  this.orderInfon.qualityInspectionRemark?this.orderInfon.qualityInspectionRemark:"----" }}</div>
                </div>
                <div class="item">
                    <div class="tit">工厂备注</div>
                    <div class="txt">{{  this.orderInfon.mchRemark?this.orderInfon.mchRemark:"----"  }}</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="tit">工厂送货至</div>
                    <div class="txt">
                        <p>{{ this.orderInfon.warehouseDTO.warehouseName?this.orderInfon.warehouseDTO.warehouseName:"----" }}</p>
                        <p>{{  this.orderInfon.warehouseDTO.name?this.orderInfon.warehouseDTO.name:"----" }}  {{ this.orderInfon.warehouseDTO.mobile?this.orderInfon.warehouseDTO.mobile:"----" }}</p>
                        <p>{{this.orderInfon.warehouseDTO.provice?this.orderInfon.warehouseDTO.provice:"----"}} {{ this.orderInfon.warehouseDTO.city?this.orderInfon.warehouseDTO.city:"----" }} {{ this.orderInfon.warehouseDTO.area?this.orderInfon.warehouseDTO.area:"----" }} {{ this.orderInfon.warehouseDTO.address?this.orderInfon.warehouseDTO.address:"----" }}</p>
                    </div>
                </div>
                <div class="item">
                    <div class="tit">客户名</div>
                    <div class="txt">{{  this.orderInfon.warehouseDTO.name?this.orderInfon.warehouseDTO.name:"----" }}</div>
                </div>
            </li>
        </ul>

        <div class="big_title">商品信息</div>
         
        <el-table ref="multipleTable" :data="goodArr" tooltip-effect="dark" style="width: 100%"  
        
            :header-cell-style="{textAlign:'center'}"
            :cell-style="{textAlign:'center'}"
            @selection-change="handleSelectionChange" class="order_good_table">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column  props="productCode" label="商品编码" width="200">
                <template slot-scope="scope">
                    <div>{{ scope.row.productCode }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品图片" width="200">
                <template slot-scope="scope">
                    <img :src= "scope.row.img " alt="" class="good_img"/>
                </template>
            </el-table-column>
            <el-table-column prop="subtitle" label="商品名称" width="200">
                <template slot-scope="scope">
                    <div>{{  scope.row.productName?scope.row.productName:"----" }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="型号/规格" width="200" >
                <template slot-scope="scope">
                    <div>{{  scope.row.attribute?scope.row.attribute:"----" }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="采购价(元)" width="150">
                <template slot-scope="scope">
                    <div>{{  scope.row.costPrice?scope.row.costPrice:"----" }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="采购数"  width="100">
                <template slot-scope="scope">
                    <div>{{  scope.row.num?scope.row.num:"----" }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="address" label="退货数"></el-table-column>
            <el-table-column prop="address" label="是否定制"  ></el-table-column> -->
            <el-table-column prop="address" label="状态"  width="200">
                <template slot-scope="scope">
                    <div>{{  scope.row.status?scope.row.status:"----" }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="address" label="售后状态"  ></el-table-column> -->
            <!-- <el-table-column prop="address" label="BOM信息"  ></el-table-column> -->
            <el-table-column prop="address" label="操作"  ></el-table-column>
        </el-table>
        
        <div class="beihuo_btn_group">
            <el-button class="btn">安排发货</el-button>
            <el-button class="btn">撤销工厂备货完成</el-button>

            <el-button class="btn">工厂备货完成</el-button>
        </div>
        <div class="big_title">订单处理流程</div>
        <div class="record_con">
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                    <h4>提交</h4>
                    <p>王小虎 提交于 2018/4/12 20:46</p>
                    
                    <el-table :data="orderTimeGoodTable" style="width: 29%;margin-top:10px;" :border="true">
                        <el-table-column
                            prop="goodName"
                            label="商品"
                            width="250">
                        </el-table-column>
                        <el-table-column
                            prop="count"
                            label="数量">
                        </el-table-column>
                    </el-table>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/3" placement="top">
                <el-card>
                    <h4>提交</h4>
                    <p>王小虎 提交于 2018/4/3 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>提交</h4>
                    <p>王小虎 提交于 2018/4/2 20:46</p>
                </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>


import {  orderDetailsInfo } from '@/api/order/orderList';
export default {
    data () {
        return {

            orderNo: "",
            goodArr: [],
            orderTimeGoodTable: [
                {
                    goodName: 'LKS8821-E+F+E-3RW',
                    count: 1
                }, 
                {  
                    goodName: 'LK-X2208-XXY',
                    count: 1
                }

            ],
            multipleSelection: [],
            activities: [
                {
                    content: '活动按期开始',
                    timestamp: '2018-04-15'
                }, 
                {
                    content: '通过审核',
                    timestamp: '2018-04-13'
                }, 
                {
                    content: '创建成功',
                    timestamp: '2018-04-11'
                }
            ],

            orderInfon: ""
        }
    },
    mounted () {  
        this.$nextTick(function () {
            this.init()
        })
    },
    methods: {
        init: function () {
            let orderNo = window.location.href.split("orderNo=")[1];   
            this.orderNo = orderNo;
            
            this.getOrderInfoFn()
        },
        getOrderInfoFn: function () {
            let _this = this;
            orderDetailsInfo({
                api: "mch.App.orderV2.info",
                status: this.status,
                keyWords: this.keyWords,
                orderNo: this.orderNo
            }).then((res)=> {
                let resData = res.data.data;   
                if (resData) {
                     _this.orderInfon = resData;
                  _this.goodArr = resData.details;
                }
            })              
        }    
    }
}
</script>


<style>
@import "./index.css";
</style>
