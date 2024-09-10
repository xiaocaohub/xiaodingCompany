<template>
  <div class="container1">
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
      </div>
    </div>
    <div class="consignee-info" v-if="dataInfo">
      <div class="header">
        <span>{{ $t("orderDetails.shrxx") }}</span>
      </div>
      <div class="consignee-block">
        <el-form
          ref="ruleForm"
          :rules="rules"
          class="form-search"
          :model="ruleForm"
          label-width="auto"
        >
          <el-form-item :label="$t('orderDetails.shr')" prop="name" required>
            <el-input
              v-model="ruleForm.name"
              :placeholder="$t('orderDetails.qsrshr')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('orderDetails.xldh')" prop="mobile" required>
            <el-input
              v-model="ruleForm.mobile"
              :placeholder="$t('orderDetails.qsrlxdh')"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="cascadeAddress"
            :label="$t('orderDetails.shdz')"
            prop="xian"
          >
            <div class="cascadeAddress-block">
              <el-select
                class="select-input"
                v-model="ruleForm.sheng"
                :placeholder="$t('orderDetails.sheng')"
              >
                <el-option
                  v-for="(item, index) in shengList"
                  :key="index"
                  :label="item.g_CName"
                  :value="item.g_CName"
                >
                  <div @click="getShi(item.groupID)">{{ item.g_CName }}</div>
                </el-option>
              </el-select>
              <el-select
                class="select-input"
                v-model="ruleForm.shi"
                :placeholder="$t('orderDetails.shi')"
              >
                <el-option
                  v-for="(item, index) in shiList"
                  :key="index"
                  :label="item.g_CName"
                  :value="item.g_CName"
                >
                  <div @click="getXian(item.groupID)">{{ item.g_CName }}</div>
                </el-option>
              </el-select>
              <el-select
                class="select-input"
                v-model="ruleForm.xian"
                :placeholder="$t('orderDetails.xian')"
              >
                <el-option
                  v-for="(item, index) in xianList"
                  :key="index"
                  :label="item.g_CName"
                  :value="item.g_CName"
                >
                  <div>{{ item.g_CName }}</div>
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="" prop="r_address" required>
            <el-input v-model="ruleForm.r_address" placeholder=""></el-input>
          </el-form-item>
          <!-- <el-form-item :label="订单备注" prop="remarks">
                <el-input v-model="ruleForm.remarks" placeholder="请输入订单备注"></el-input>
              </el-form-item> -->
        </el-form>
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
              prop="p_id"
              :label="$t('orderDetails.spbh')"
              width="152"
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
              :label="$t('orderDetails.cz')"
              align="center"
              width="140"
            >
              <template>
                <div class="OP-button">
                  <div class="OP-button-top">
                    <el-button
                      icon="el-icon-view"
                      @click="$router.push('/goods/goodslist')"
                      >{{ $t("orderDetails.ck") }}</el-button
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
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
    <div class="footer-button">
      <el-button
        plain
        class="footer-cancel fontColor"
        @click="$router.go(-1)"
        >{{ $t("DemoPage.tableFromPage.cancel") }}</el-button
      >
      <el-button
        type="primary"
        class="footer-save bgColor mgleft"
        @click="submitForm('ruleForm')"
        >{{ $t("DemoPage.tableFromPage.save") }}</el-button
      >
    </div>
  </div>
</template>

<script>
import orderDetails from "@/webManage/js/order/orderList/editorOrder";
export default orderDetails;
</script>

<style scoped lang="less">
@import "../../../../webManage/css/order/orderList/editorOrder.less";
</style>