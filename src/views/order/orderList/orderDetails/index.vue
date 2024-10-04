<template>
    <div class="order_detail_page">
        <div class="big_title">基本信息</div>

        <ul class="info_list_con">
           
            <li>
                <div class="item">
                    <div class="tit">订单编号 </div>
                    <div class="txt">{{this.orderInfon.orderNo}}</div>
                </div>
                <div class="item">
                    <div class="tit">订单状态</div>
                    <div class="txt">{{  this.orderInfon.statusRemark?this.orderInfon.statusRemark:"--" }}</div>
                </div>
                <div class="item">
                    <div class="tit">结算金额</div>
                    <div class="txt">{{ this.orderInfon.settlementAmount?this.orderInfon.settlementAmount:0 }} 元</div>
                </div>
                <div class="item">
                    <div class="tit">渠道</div>

                    <div class="txt">{{   this.orderInfon.channel?this.orderInfon.channel:"--" }}</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="tit">预计发货时间</div>
                    <div class="txt">{{  this.orderInfon.estimatedDeliveryTime? this.orderInfon.estimatedDeliveryTime:"--" }}</div>
                </div>
                <div class="item">
                    <div class="tit">期望发货时间</div>
                    <div class="txt">{{   this.orderInfon.expectedDeliveryTime?this.orderInfon.expectedDeliveryTime:"--"  }}</div>
                </div>
                <div class="item">
                    <div class="tit">指定发货时间</div>
                    <div class="txt">{{  this.orderInfon.specifyDeliveryTime?this.orderInfon.specifyDeliveryTime:"--" }}</div>
               
               
                </div>
                <div class="item">
                    <div class="tit">客户留言</div>
                    <div class="txt">{{  this.orderInfon.remark?this.orderInfon.remark:"--" }}</div>
                </div>
                


                <div class="item">
                    <div class="tit">是否需要质检</div>
                    <div class="txt">{{  this.orderInfon.qualityInspectionRemark?this.orderInfon.qualityInspectionRemark:"--" }}</div>
                </div>
                <div class="item">
                    <div class="tit">工厂备注</div>
                    <div class="txt">{{  this.orderInfon.mchRemark?this.orderInfon.mchRemark:"--"  }}</div>
                </div>
            </li>
            <li>
                <div class="item">
                    <div class="tit">工厂送货至</div>
                    <div class="txt">
                        <p>{{ this.orderInfon.warehouseDTO.warehouseName?this.orderInfon.warehouseDTO.warehouseName:"--" }}</p>
                        <p>
                            {{  this.orderInfon.warehouseDTO.name?this.orderInfon.warehouseDTO.name:"--" }}
                            {{ this.orderInfon.warehouseDTO.mobile?this.orderInfon.warehouseDTO.mobile:"--" }}
                        </p>
                        
                        <p>
                            {{this.orderInfon.warehouseDTO.provice?this.orderInfon.warehouseDTO.provice:"--"}} 
                            {{ this.orderInfon.warehouseDTO.city?this.orderInfon.warehouseDTO.city:"--" }}     
                            {{ this.orderInfon.warehouseDTO.area?this.orderInfon.warehouseDTO.area:"--" }} 
                            {{ this.orderInfon.warehouseDTO.address?this.orderInfon.warehouseDTO.address:"--" }}
                        </p>
                    </div>
                </div>
                <div class="item">
                    <div class="tit">客户名</div>
                    <div class="txt">{{  this.orderInfon.warehouseDTO.name?this.orderInfon.warehouseDTO.name:"--" }}</div>
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
                    <div>{{  scope.row.productName?scope.row.productName:"--" }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="型号/规格" width="200" >
                <template slot-scope="scope">
                    <div>{{  scope.row.attribute?scope.row.attribute:"--" }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="采购价(元)" width="150">
                <template slot-scope="scope">
                    <div>{{  scope.row.settlementPrice?scope.row.settlementPrice:"--" }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="采购数"  width="100">
                <template slot-scope="scope">
                    <div>{{  scope.row.num?scope.row.num:"--" }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="address" label="退货数"></el-table-column>
            <el-table-column prop="address" label="是否定制"  ></el-table-column> -->
            <el-table-column prop="address" label="状态"  width="200">
                <template slot-scope="scope">
                    <div>{{  scope.row.status?scope.row.status:"--" }}</div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="address" label="售后状态"  ></el-table-column> -->
            <!-- <el-table-column prop="address" label="BOM信息"  ></el-table-column> -->
            <el-table-column prop="address" label="操作"  ></el-table-column>
        </el-table>
        
        <div class="beihuo_btn_group">
            <!-- <el-button type="success" class="btn" v-if="confirmGoodStatus && multipleSelection.length == goodArr.length" @click="sendGoodsFn">安排发货</el-button>
            <el-button type="primary" class="btn" v-else @click="stockUpGoodFn">工厂备货完成</el-button>    
            <el-button class="btn" v-if="confirmGoodStatus" @click="cancelGoodFn">撤销工厂备货完成</el-button> -->
            <el-button type="primary" class="btn" v-if="sendGoodStatus==1 || sendGoodStatus==1.5" @click="stockUpGoodFn">工厂备货完成</el-button>   
            <el-button type="success" class="btn" v-if="sendGoodStatus==2 && multipleSelection.length == goodArr.length" @click="sendGoodsFn">安排发货</el-button>
        


            
            <el-button class="btn" v-if="sendGoodStatus==2 || sendGoodStatus==1.5" @click="cancelGoodFn">撤销工厂备货完成</el-button>
        </div>

        <div class="big_title">发货记录</div>
        
        <div class="send_good_title_con">
            <div class="info">
                <span>YS2408290000021-1</span>

                <span>安排时间: 2024-08-27  13:52:15</span>
                <span>发货时间: - -</span>
            </div>


            <div class="btn_con" >
                <p class="title_msg" v-if="sendGoodStatus == 3">注：先打印标签，后打印发货单，确保标签与发货单件数一致！</p>
                <div class="btn_group" v-if="sendGoodStatus == 3">
                    <el-button type="success">批量打印标签</el-button>
                    <el-button type="primary">打印发货单</el-button>
                    <el-button type="danger" @click="cancelSendGoodsFn">取消安排</el-button>
                    <el-button type="danger" @click="confirmSendGoodDialogVisible = true">确认发货</el-button>
                </div>
                <el-button type="success" v-if="sendGoodStatus==5" class="edit_send_good" @click="confirmSendGoodDialogVisible=true">编辑发货单</el-button>

            </div>
        </div>
        <el-table :data="sendGoodTableData"  style="width: 100%" class="send_good_table" v-if="sendGoodStatus==3">

            <el-table-column  label="发货单/签收单" width="290">
                <template slot-scope="scope">
                    <div> <img :src=" confirmSendGoodForm.sendGoodPictures[0] " alt="" class="send_good_img"/> </div>
                </template>
            </el-table-column>
            <el-table-column prop="date" label="型号/规格" width="400">
                <template slot-scope="scope">
                    <div> 
                        <img :src=" scope.row.img " class="good_img" alt=""/>

                        <p>编码: {{  scope.row.productCode  }}</p>
                        <p>规格：{{  scope.row.attribute }}</p>
                        <p>型号: {{  scope.row.marque  }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="num" label="发货数量" width="150">
                <template slot-scope="scope">
                    <div> 


                        {{  scope.row.num }}
                    </div>
                </template>
            </el-table-column>

            <el-table-column prop="date" label="操作" width="150">
                <template slot-scope="scope">
                    <div class="btn_group">
                        <div class="btn">打印标签</div>
                    </div>
                </template>
            </el-table-column>
        </el-table>

    
        <!-- <div class="big_title">订单处理流程</div> -->
    
        <!-- <div class="record_con">
            <el-timeline>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                <el-card>
                    <h4>提交</h4>
                    <p> 提交于 2018/4/12 20:46</p>
                    
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
                    <p>提交于 2018/4/3 20:46</p>
                </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/2" placement="top">
                <el-card>
                    <h4>提交</h4>
                    <p> 提交于 2018/4/2 20:46</p>
                </el-card>
                </el-timeline-item>
            </el-timeline>
        </div> -->


            <el-dialog
                title="确认发货,上传发货单"
                :visible.sync="confirmSendGoodDialogVisible"
                width="30%"
                :before-close="handleClose">
               
               


                <el-form ref="form" :model="confirmSendGoodForm" label-width="80px">
                    <el-form-item label="发货清单:">
                        <l-upload :limit="5" v-model="confirmSendGoodForm.sendGoodPictures" text="最多上传5张, 商品白底图尺寸450*450像素, 每张图限500K以内">
                        </l-upload>
                    </el-form-item>



                   

                    <el-form-item label="发货备注:">
                      
                        <el-input type="textarea" :rows="2" placeholder="请输入物流单号或其他备注信息" v-model="confirmSendGoodForm.remark"> </el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="confirmSendGoodDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="confirmGoodFn">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
import {  orderDetailsInfo, stockUpGood, sendGoods, confirmSendGood } from '@/api/order/orderList';
import { setStorage, getStorage } from "@/utils/storage";
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
            orderInfon: "",
            // 备货状态
            confirmGoodStatus: false,
            //  确认发货商品
            sendGoodTableData: [
                {
                    date: '2016-05-02'
                }
            ],
            confirmSendGoodDialogVisible: false,
            confirmSendFlag: true,
            // 确认发货 form
            confirmSendGoodForm: {
                sendGoodPictures: "",
                remark: ""
            },
            sendGoodFlag: false, // 确认发货
            sendGoodStatus: 1  //  发货状态 1备货中,  2安排发货, 3确认发货
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
                    _this.sendGoodTableData = resData.details;
          
                    if (resData.status<3) {
                        _this.sendGoodStatus = "";
                    }
                    if (resData.status == 5) {
                        _this.sendGoodStatus = resData.status;
                    }
                     
                    console.log(" _this.goodArr")

                    console.log( _this.goodArr)
                    console.log(" _this.goodArr")
                }
            })              
        },
        handleSelectionChange(val) {
            console.log("val")
            console.log(val)
            console.log("val")
        
            this.multipleSelection = val;
        },
        
        // 备货完成
        stockUpGoodFn: function () {
            let _this = this;

            let goodArr = this.goodArr;

            let detailNos = "";
           
            if (this.multipleSelection.length == 0) {
           
                this.$message.error('请选择商品');    
                return ;
            }
            this.confirmGoodStatus = true;

            if (this.multipleSelection.length > 0 && this.multipleSelection.length<goodArr.length) { 
                this.sendGoodStatus = 1.5;
            }
            if (this.multipleSelection.length == goodArr.length) { 
                this.sendGoodStatus = 2;
            }
            goodArr.forEach((item)=> {
                detailNos += item.detailNo + ",";
            })
            stockUpGood({
                api: "mch.App.orderV2.ready",
                orderNo: this.orderNo,
                detailNos: detailNos

            }).then((res)=> {
                if (res.data.code == 200) {
                    _this.$message({
                        showClose: true,
                        message: res.data.message,
                        type: 'success'
                    });
                } else {
                    _this.$message({
                        showClose: true,
                        message: res.data.message,         
                        type: 'error'
                    });
                }
            })
        },
        // 撤销工厂备货完成
        cancelGoodFn: function () {
            this.sendGoodStatus = 1;
            this.confirmGoodStatus = false;

            this.$refs.multipleTable.clearSelection()
        },
        // 安排发货
        sendGoodsFn: function () {
            let _this = this;
            _this.sendGoodStatus = 3;
            sendGoods({
                api: "mch.App.orderV2.shipment",
                orderNo: this.orderNo
            }).then((res)=> { 
        
                if (res.data.code == 200) {
                    _this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    _this.sendGoodStatus = 3;
                } else {   
                    _this.$message({
                        message: res.data.message,                
                        type: 'error'
                    });
                }
            })          
        },
        // 取消安排
        cancelSendGoodsFn: function () {
            this.sendGoodStatus = 2;
        },

        // 确认发货
        confirmGoodFn: function () {
           let _this = this;
            this.confirmSendGoodDialogVisible = false;
            this.sendGoodFlag = true;
            confirmSendGood({
                api: "mch.App.orderV2.sendUpdate",   
                orderNo: this.orderNo,
                photo:  this.confirmSendGoodForm.sendGoodPictures[0]
            }).then((res)=>{
                if (res.data.code == 200) {
                    _this.sendGoodStatus = 5; 
                    _this.$message({
                        message: res.data.message,
                        type: 'success'
                    });
                    _this.sendGoodFlag = true;
                } else {
                    _this.$message({
                        message: res.data.message,                
                        type: 'error'
                    });
                }
            })
        }        
    }
}
</script>


<style>
@import "./index.css";
</style>
