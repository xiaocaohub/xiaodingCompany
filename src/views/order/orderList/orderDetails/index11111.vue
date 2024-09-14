<template>
  <div class="container">
    <div class="basic-info" v-if="dataInfo">
      <div class="header">
        <span>{{ $t("orderDetails.jcxx") }}</span>
      </div>
      <div class="basic-block">
        <ul class="items">
          <li>
            <span>{{ $t("orderDetails.ddbh") }}：</span
            ><span class="span_kip">{{ dataInfo.sNo }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.ddzt") }}：</span
            ><span class="span_kip">{{ dataInfo.status }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.ddlx") }}：</span
            ><span class="span_kip"
              >{{ dataInfo.orderTypeName }}{{ $t("orderDetails.dd") }}</span
            >
          </li>
          <li>
            <span>{{ $t("orderDetails.ddly") }}：</span
            ><span class="span_kip">{{ $myGetSource(dataInfo.source) }}</span>
          </li>
        </ul>
        <ul class="items">
          <li>
            <span>{{ $t("orderDetails.zffs") }}：</span
            ><span class="span_kip">{{ dataInfo.paytype }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.xdsj") }}：</span
            ><span class="span_kip">{{ dataInfo.add_time | dateFormat }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.fksj") }}：</span
            ><span class="span_kip">{{ dataInfo.pay_time }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.fhsj") }}：</span
            ><span class="span_kip">{{
              dataInfo.deliver_time | dateFormat
            }}</span>
          </li>
        </ul>
        <ul class="items">
          <li>
            <span>{{ $t("orderDetails.shsj") }}：</span
            ><span class="span_kip">{{
              dataInfo.arrive_time | dateFormat
            }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.yhid") }}：</span
            ><span class="span_kip">{{ dataInfo.user_id }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.yhmc") }}：</span
            ><span class="span_kip">{{ dataInfo.user_name }}</span>
          </li>
          <li class="notes">
            <!-- <span>订单备注：</span> -->
            <!-- <ul class="remaks" v-if="noteList">
                          <li v-for="(item,index) in noteList" :key="index">
                              {{ item }}
                          </li>
                      </ul> -->
            <span>{{ $t("orderDetails.ddbz") }}：</span
            ><span class="span_kip">{{
              dataInfo.remarks ? dataInfo.remarks : ""
            }}</span>
          </li>
        </ul>
        <ul class="items">
          <li>
            <span>{{ $t("orderDetails.kddh") }}：</span
            ><span class="span_kip">{{ totleInfo.expressStr }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="consignee-info" v-if="dataInfo">
      <div class="header">
        <span>{{ $t("orderDetails.shrxx") }}</span>
      </div>
      <div class="consignee-block">
        <ul class="items">
          <li>
            <span>{{ $t("orderDetails.shr") }}：</span
            ><span class="span_kip">{{ dataInfo.name }}</span>
          </li>
          <li>
            <span>{{ $t("orderDetails.xldh") }}：</span
            ><span class="span_kip">{{ dataInfo.mobile }}</span>
          </li>
          <li v-if="totleInfo.selfLifting == 1">
            <span>{{ $t("orderDetails.ztdz") }}：</span
            ><span class="span_kip">{{ dataInfo.address }}</span>
          </li>
          <li v-if="totleInfo.selfLifting != 1">
            <span>{{ $t("orderDetails.shdz") }}：</span
            ><span class="span_kip">{{ dataInfo.address }}</span>
          </li>
          <!-- <li>
                      <span>订单备注：</span>{{ Object.keys(dataInfo.remarks).length === 0 ? '' : '' }}
                  </li> -->
        </ul>
      </div>
    </div>
    <div class="goods-info" v-if="dataInfo">
      <div class="header">
        <span>{{ $t("orderDetails.spxx") }}</span>
      </div>
      <div class="goods-block">
        <div class="dictionary-list">
          <el-table
            :data="goodsTables"
            ref="table"
            class="el-table"
            style="width: 100%"
          >
            <el-table-column
              prop="p_id"
              :label="$t('orderDetails.spbh')"
              width="152"
            >
            </el-table-column>
            <el-table-column
              prop="p_name"
              :label="$t('orderDetails.spmc')"
              width="400"
            >
              <template slot-scope="scope">
                <div class="name-info">
                  <img :src="scope.row.pic" alt="" @error="handleErrorImg" />
                  <span>{{ scope.row.p_name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="size"
              :label="$t('orderDetails.spgg')"
              width="158"
            >
            </el-table-column>

            <el-table-column
              prop="p_price"
              :label="$t('orderDetails.dj')"
              width="152"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.p_price">{{
                  scope.row.p_price.toFixed(2)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="num"
              :label="$t('orderDetails.sl')"
              width="152"
            >
            </el-table-column>
            <el-table-column
              prop="stockNum"
              :label="$t('orderDetails.kc')"
              width="152"
            >
            </el-table-column>
            <el-table-column
              prop="p_price"
              :label="$t('orderDetails.xj')"
              width="152"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.p_price">{{
                  (Number(scope.row.p_price) * Number(scope.row.num)).toFixed(2)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              prop="returnStatus"
              :label="$t('orderDetails.tkzt')"
              v-if="totleInfo.returnStatus&&totleInfo.returnStatus!=''"
            >
              <template v-if="scope.row.returnInfo" slot-scope="scope">
                <el-link
                  @click="nato(scope.row)"
                  type="primary"
                  :underline="false"
                  >{{ scope.row.returnInfo.statusName }}</el-link
                >
              </template>
            </el-table-column>
            <!-- <el-table-column :label="$t('orderDetails.cz')" align="center" width="140">
                          <template>
                              <div class="OP-button">
                                  <div class="OP-button-top">
                                      <el-button icon="el-icon-view" @click="$router.push('/goods/inventoryManagement/inventoryList')">{{$t('orderDetails.ck')}}</el-button>
                                  </div>
                              </div>
                          </template>
                      </el-table-column> -->
          </el-table>
        </div>

        <div class="statistical">
          <div class="goods-totalprice">
            <span class="title name">{{ $t("orderDetails.spzj") }}：</span>
            <span class="price">￥{{ totleInfo.spz_price.toFixed(2) }}</span>
          </div>
          <div class="goods-totalprice" v-if="totleInfo.z_freight">
            <span class="title name">{{ $t("orderDetails.yf") }}：</span>
            <span class="price">￥{{ totleInfo.z_freight.toFixed(2) }}</span>
          </div>
          <div class="discount-stores">
            <span class="title name">{{ $t("orderDetails.dpyh") }}：</span>
            <span class="price">￥{{ totleInfo.coupon_price.toFixed(2) }}</span>
          </div>
          <div class="discount-platform">
            <span class="title name">{{ $t("orderDetails.ptyh") }}：</span>
            <span class="price"
              >￥{{ totleInfo.preferential_amount.toFixed(2) }}</span
            >
          </div>
          <!-- <div class="discount-platform">
                      <span class="title name">{{$t('orderDetails.hyyh')}}：</span>
                      <span class="price">￥{{ totleInfo.grade_rate_amount.toFixed(2) }}</span>
                  </div> -->
          <div class="totle-pay">
            <span
              v-if="
                dataInfo.status == '待付款' ||
                (dataInfo.status == '订单关闭' && !dataInfo.pay_time)
              "
              class="title-totle name"
              >应支付：</span
            >
            <span v-else class="title-totle name"
              >{{ $t("orderDetails.hjzf") }}：</span
            >
            <!-- <span class="red price">￥{{ totleInfo.pay_price.toFixed(2) }}</span> -->
            <span class="red price">￥{{ totleInfo.old_total }}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%; height: 20px; padding-bottom: 20px"></div>
  </div>
</template>

<script>
import orderDetails from "@/webManage/js/order/orderList/orderDetails";
export default orderDetails;
</script>

<style scoped lang="less">
@import "../../../../webManage/css/order/orderList/orderDetails.less";
</style>
