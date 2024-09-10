<template>
  <div class="container">
    <div class="merchants-list">
      <el-form :model="mainData" element-loading-text="拼命加载中..." ref="ruleForm" class="demo-ruleForm">
        <div class="card">
          <div class="title">{{$t('orderDetails.jcxx')}}</div>
          <el-row :gutter="4">
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.ddbh')+':'">
                {{mainData.sNo}}
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.ddzt')+':'">
                {{mainData.status}}
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.ddlx')+':'">
                {{mainData.orderTypeName}}订单
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.ddly')+':'">
                <template>
                  {{ $myGetSource(mainData.source) }}
                </template>
              </el-form-item>
            </el-col>
            <!-- <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.psfy')+':'">
                {{orderInfo.z_freight}}
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row :gutter="4">

            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.zffs')+':'">
                {{mainData.paytype}}
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.xdsj')+':'">
                {{mainData.add_time | dateFormat}}
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.fksj')+':'">
                {{mainData.pay_time | dateFormat}}
              </el-form-item>
            </el-col>
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.fhsj')+':'" v-if="mainData.arrive_time!=null">
                {{mainData.deliver_time | dateFormat}}
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="2">
          <el-col :lg="6">
            <el-form-item :label="$t('orderDetails.shsj')+':'">
              {{mainData.arrive_time | dateFormat}}
            </el-form-item>
          </el-col>
          <el-col :lg="6">
            <el-form-item :label="$t('orderDetails.yhid')+':'">
              {{mainData.user_id}}
            </el-form-item>
          </el-col>
          <el-col :lg="6">
            <el-form-item :label="$t('orderDetails.yhmc')+':'">
              {{mainData.user_name}}
            </el-form-item>
          </el-col>
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.ddbz')+':'">
                {{mainData.remark}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1" style="padding-bottom:8px">
            <el-col :lg="6">
              <el-form-item :label="$t('orderDetails.kddh')+':'">
                {{orderInfo.expressStr}}
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </div>

    <div class="merchants-list">
      <el-form :model="mainData" element-loading-text="拼命加载中..." ref="ruleForm"
              class="demo-ruleForm">
        <div class="card">
          <div class="title">{{$t('orderDetails.shrxx')}}</div>
          <el-row :gutter="1">
            <el-col :lg="12">
              <el-form-item :label="$t('orderDetails.shr')+':'">
                {{mainData.user_name}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :lg="12">
              <el-form-item :label="$t('orderDetails.xldh')+':'">
                {{mainData.mobile}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :lg="12">
              <el-form-item :label="$t('orderDetails.shdz')+':'">
                {{mainData.address}}
              </el-form-item>
            </el-col>
          </el-row>
         <!-- <el-row :gutter="1" style="padding-bottom:8px">
            <el-col :lg="12">
              <el-form-item :label="$t('orderDetails.ddbz')+':'">
                {{mainData.remark}}
              </el-form-item>
            </el-col>
          </el-row> -->
        </div>
      </el-form>
    </div>

    <div class="merchants-list">
      <div class="card">
        <div class="title">{{$t('orderDetails.spxx')}}</div>
        <div class="dictionary-list">
          <el-table
            :header-cell-style="{ background:'#f4f7f9',height:'50px'}"
            :data="goodsList" ref="table" class="el-table" style="width: 100%">
            <el-table-column prop="p_name" align="center" :label="$t('orderDetails.spmc')" width="400">
              <template slot-scope="scope">
                <div class="name-info">
                  <img :src="scope.row.pic" alt="">
                  <span>{{ scope.row.p_name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="size" align="center" :label="$t('orderDetails.spgg')">
            </el-table-column>
            <el-table-column prop="p_id" align="center" :label="$t('orderDetails.spbh')">
            </el-table-column>
            <el-table-column prop="p_price" align="center" :label="$t('orderDetails.dj')">
            </el-table-column>
            <el-table-column prop="num" align="center" :label="$t('orderDetails.sl')">
            </el-table-column>
            <el-table-column prop="stockNum" align="center" :label="$t('orderDetails.kc')">
            </el-table-column>
            <el-table-column prop="p_price" align="center" :label="$t('orderDetails.xj')">
              <template slot-scope="scope">
                {{scope.row.p_price*scope.row.num}}
              </template>
            </el-table-column>
            <el-table-column align="center" prop="returnStatus" :label="$t('orderDetails.tkzt')">
              <template slot-scope="scope">
                {{ scope.row.returnInfo.statusName }}
              </template>
            </el-table-column>

            <!-- <el-table-column :label="$t('orderDetails.cz')" align="center" fixed="right" width="140">
              <template>
                <div class="OP-button">
                  <div class="OP-button-top" @click="$router.push('/goods/inventoryManagement/inventoryList')">
                    <el-button icon="el-icon-view">{{$t('orderDetails.ck')}}</el-button>
                  </div>
                </div>
              </template>
            </el-table-column> -->

          </el-table>
        </div>
      </div>
    </div>
    <div class="statistical"  style="margin-bottom: 0;">
      <div class="goods-totalprice">
        <span class="title name">{{$t('orderDetails.spzj')}}：</span>
        <span class="price">￥{{orderInfo.spz_price.toFixed(2)}}
        </span>
      </div>
      <div class="discount-stores" >
        <span class="title name">{{$t('orderDetails.yf')}}：</span>
        <span class="price">￥{{orderInfo.z_freight.toFixed(2)}}</span>
      </div>
      <div class="discount-stores">
        <span class="title name">{{$t('orderDetails.dpyh')}}：</span>
        <span class="price">￥{{orderInfo.reduce_price.toFixed(2)}}</span>
      </div>
      <div class="discount-platform">
        <span class="title name">{{$t('orderDetails.ptyh')}}：</span>
        <span class="price">￥{{orderInfo.preferential_amount.toFixed(2)}}</span>
      </div>
      <div class="totle-pay">
        <span class="title-totle  name">{{$t('orderDetails.hjzf')}}：</span>
        <span class="red price">￥{{mainData.z_price.toFixed(2)}}</span>
      </div>
    </div>
    <div class="statistical" style="margin-bottom: 0;">
      <div class="hr"></div>
    </div>
  </div>
</template>

<script>
import main from "@/webManage/js/order/orderSettlement/orderSettlementDetail";

export default main;
</script>


<style scoped lang="less">
  @import "../../../webManage/css/order/orderSettlement/orderSettlementDetail";
</style>
