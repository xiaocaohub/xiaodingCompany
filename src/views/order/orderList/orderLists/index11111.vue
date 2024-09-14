<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input
            v-model="inputInfo.orderInfo"
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            :placeholder="$t('orderLists.qsrddh')"
          ></el-input>
          <el-select
            class="select-input"
            v-model="inputInfo.state"
            :placeholder="$t('orderLists.qxzdd')"
          >
            <el-option
              v-for="item in stateList"
              :key="item.brand_id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-select
            class="select-input"
            v-model="inputInfo.type"
            :placeholder="$t('orderLists.qxzys')"
          >
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="select-date">
            <el-date-picker
              v-model="inputInfo.date"
              type="datetimerange"
              :range-separator="$t('DemoPage.zhi')"
              :start-placeholder="$t('DemoPage.ksrq')"
              :end-placeholder="$t('DemoPage.jsrq')"
              value-format="yyyy-MM-dd HH:mm:ss"
              :editable="false"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{
            $t('DemoPage.tableExamplePage.reset')
          }}</el-button>
          <el-button
            class="bgColor"
            type="primary"
            @click="demand"
            v-enter="demand"
            >{{ $t('DemoPage.tableExamplePage.demand') }}</el-button
          >
          <el-button
            class="bgColor export"
            type="primary"
            @click="dialogShow"
            >{{ $t('DemoPage.tableExamplePage.export') }}</el-button
          >
        </div>
      </div>
    </div>

    <div class="jump-list">
      <el-button
        class="bgColor el-icon-printer"
        type="primary"
        @click="print"
        v-if="detectionBtn(button_list, '打印订单')"
        >{{ $t('orderLists.dydd') }}</el-button
      >
      <el-button
        class="fontColor"
        @click="delAll"
        :disabled="is_disabled"
        icon="el-icon-delete"
        v-if="detectionBtn(button_list, '批量删除')"
        >{{ $t('orderLists.plsc') }}</el-button
      >
    </div>

    <div class="menu-list" ref="tableFather">
      <el-table
        :element-loading-text="$t('DemoPage.loading_text')"
        v-loading="loading"
        :data="tableData"
        @selection-change="handleSelectionChange"
        ref="table"
        class="el-table"
        style="width: 100%"
        :height="tableHeight"
      >
        <template slot="empty">
          <div class="empty">
            <img src="../../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column fixed="left" type="selection" width="55">
        </el-table-column>
        <el-table-column
          prop="orderInfo"
          :label="$t('orderLists.ddxx')"
          width="400"
          align="left"
        >
          <template slot-scope="scope">
            <div class="head-info">
              <span class="red-dot" v-if="scope.row.status == '待发货'"></span>
              <span style="margin-right: 1.875rem"
                >{{ $t('orderLists.ddbh') }}：{{ scope.row.orderno }}</span
              >
              <span
                >{{ $t('orderLists.cjsj') }}：{{ scope.row.createDate }}</span
              >
            </div>
            <div class="content-info">
              <div class="img-item">
                <img
                  :src="scope.row.goodsImgUrl"
                  alt=""
                  @error="handleErrorImg"
                />
              </div>
              <div class="goods-item">
                <span class="name">{{ scope.row.goodsName }}</span>
                <span
                  ><span class="arrt-title">{{ $t('orderLists.gg') }}：</span
                  >{{ scope.row.attrStr }}</span
                >
                <span
                  ><span class="arrt-title">{{ $t('orderLists.js') }}：</span
                  >{{ scope.row.needNum }}</span
                >
                <span
                  ><span class="arrt-title">{{ $t('orderLists.jg') }}：</span
                  >{{ scope.row.goodsPrice }}{{ $t('zdata.yuan') }}</span
                >
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderPrice"
          :label="$t('orderLists.ddzj')"
          width="150"
        >
          <template slot-scope="scope">
            <!-- <span>￥{{scope.row.orderPrice}}</span> -->
            <span>￥{{ scope.row.old_total }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="goodsNum"
          :label="$t('orderLists.sl')"
          width="150"
        >
        </el-table-column>
        <!-- <el-table-column prop="price" :label="下单类型" width="150">
          <template slot-scope="scope">
            <span>{{ scope.row.operation_type == '1' ? '用户下单' : scope.row.operation_type == '2' ? '店铺下单' : '平台下单' }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="status"
          :label="$t('orderLists.ddzt')"
          width="150"
        >
          <template slot-scope="scope">
            <span
              v-if="
                scope.row.status == '订单关闭' || scope.row.status == '已关闭'
              "
              >{{ $t('orderLists.orderstate[4]') }}</span
            >
            <span v-if="scope.row.status == '待付款'">{{
              $t('orderLists.orderstate[0]')
            }}</span>
            <span v-if="scope.row.status == '待发货'">{{
              $t('orderLists.orderstate[1]')
            }}</span>
            <span v-if="scope.row.status == '待收货'">{{
              $t('orderLists.orderstate[2]')
            }}</span>
            <span v-if="scope.row.status == '已完成'">{{
              $t('orderLists.orderstate[3]')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('orderLists.ysfs')" width="170">
          <template slot-scope="scope">
            <span v-if="scope.row.selfLiftingName == '快递'">{{
              $t('orderLists.kd')
            }}</span>
            <span v-if="scope.row.selfLiftingName == '自提'">{{
              $t('orderLists.zt')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="volume"
          :label="$t('orderLists.mjxx')"
          width="200"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div class="buyers-information">
              <div class="id">
                <span class="id-item">{{ $t('orderLists.yhid') }}：</span>
                <span>{{ scope.row.userId }}</span>
              </div>
              <div class="name">
                <span class="name-item">{{ $t('orderLists.shr') }}：</span>
                <span>{{ scope.row.userName }}</span>
              </div>
              <div class="name">
                <span class="name-item">{{ $t('orderLists.lxdh') }}：</span>
                <span>{{ scope.row.mobile }}</span>
              </div>
              <div class="name">
                <span
                  class="name-item"
                  v-if="scope.row.selfLiftingName == '快递'"
                  >{{ $t('orderLists.shdz') }}：</span
                >
                <span class="name-item" v-else
                  >{{ $t('orderLists.ztdz') }}：</span
                >
                <span>{{ scope.row.addressInfo }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="payName"
          :label="$t('orderLists.zfff')"
          width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.payName == '支付宝手机支付'">{{
              $t('orderLists.zhifustate[0]')
            }}</span>
            <span v-if="scope.row.payName == '钱包支付'">{{
              $t('orderLists.zhifustate[1]')
            }}</span>
            <span v-if="scope.row.payName == '微信APP支付'">{{
              $t('orderLists.zhifustate[2]')
            }}</span>
            <span v-if="scope.row.payName == '微信小程序支付'">{{
              $t('orderLists.zhifustate[3]')
            }}</span>
            <span v-if="scope.row.payName == '微信公众号支付'">{{
              $t('orderLists.zhifustate[4]')
            }}</span>
            <span v-if="scope.row.payName == '支付宝小程序'">{{
              $t('orderLists.zhifustate[5]')
            }}</span>
            <span v-if="scope.row.payName == '头条支付宝APP支付'">{{
              $t('orderLists.zhifustate[6]')
            }}</span>
            <span v-if="scope.row.payName == '百度小程序支付'">{{
              $t('orderLists.zhifustate[7]')
            }}</span>
            <span v-if="scope.row.payName == '微信二维码支付'">{{
              $t('orderLists.zhifustate[8]')
            }}</span>
            <span v-if="scope.row.payName == '支付宝二维码支付'">{{
              $t('orderLists.zhifustate[9]')
            }}</span>
            <span v-if="scope.row.payName == '手机H5微信支付'">{{
              $t('orderLists.zhifustate[10]')
            }}</span>
            <span v-if="scope.row.payName == '支付宝H5支付'">{{
              $t('orderLists.zhifustate[11]')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="expressStr"
          :label="$t('orderLists.wlxx')"
          width="300"
        >
          <template slot-scope="scope">
            <div class="expressStrs">
              <div class="item">
                <div class="item-title">
                  <span>{{ $t('orderLists.kddh') }}：</span>
                </div>
                <ul v-if="scope.row.expressList">
                  <li
                    v-for="(item, index) in scope.row.expressList"
                    :key="index"
                  >
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div class="item">
                <span class="kuaidi-info">{{ $t('orderLists.yf') }}：</span
                >{{ scope.row.freight }}
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('zdata.cz')" width="120">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button
                  @click="Details(scope.row)"
                  v-if="detectionBtn(button_list, '订单详情')"
                  >{{ $t('orderLists.ddxq') }}</el-button
                >
                <el-button
                  @click="dialogShow3(scope.row)"
                  v-if="
                    scope.row.status == '待收货' &&
                    scope.row.selfLiftingName == '自提' &&
                    detectionBtn(button_list, '核销')
                  "
                  >{{ $t('orderLists.hx') }}</el-button
                >
                <el-button
                  @click="Edit(scope.row)"
                  v-if="
                    ['待付款', '待发货'].includes(scope.row.status) &&
                    detectionBtn(button_list, '编辑订单')
                  "
                  >{{ $t('orderLists.bjdd') }}</el-button
                >
                <el-button
                  @click="Delivery(scope.row)"
                  v-show="
                    ['待发货'].includes(scope.row.status) &&
                    detectionBtn(button_list, '发货')
                  "
                  >{{ $t('orderLists.spfh') }}</el-button
                >
                <el-button
                  @click="dialogShow2(scope.row)"
                  v-if="
                    scope.row.courier_num &&
                    scope.row.courier_num.length > 0 &&
                    detectionBtn(button_list, '查看物流')
                  "
                  class="logistics"
                  >{{ $t('orderLists.ckwl') }}</el-button
                >
                <el-button
                  v-if="
                    scope.row.logistics_type &&
                    detectionBtn(button_list, '电子面单')
                  "
                  @click="goPage(scope.row)"
                  class="logistics"
                  >电子面单</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox" ref="pageBox" v-if="showPagebox">
        <div class="pageLeftText">{{ $t('DemoPage.show') }}</div>
        <el-pagination
          layout="sizes, slot, prev, pager, next"
          :prev-text="$t('DemoPage.prev_text')"
          :next-text="$t('DemoPage.next_text')"
          @size-change="handleSizeChange"
          :page-sizes="pagesizes"
          :current-page="pagination.page"
          @current-change="handleCurrentChange"
          :total="total"
        >
          <div class="pageRightText">
            {{ $t('DemoPage.on_show') }}{{ currpage }}-{{ current_num
            }}{{ $t('DemoPage.twig') }} {{ total }}
            {{ $t('DemoPage.twig_notes') }}
          </div>
        </el-pagination>
      </div>
    </div>

    <div class="dialog-block">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('orderLists.wlxx')"
        :visible.sync="dialogVisible2"
        :before-close="handleClose2"
      >
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="overflow: "
        >
          <div
            class="task-container"
            v-for="(item, index) in logisticsList"
            :key="index"
          >
            <div class="courier-company">
              {{ $t('orderLists.kdgs') }}：<span>{{ item.kuaidi_name }}</span>
            </div>
            <div class="courier-no">
              {{ $t('orderLists.kddh') }}：<span>{{ item.courier_num }}</span>
            </div>
            <div class="logistics" v-if="item.list.length == 0">
              {{ $t('orderLists.wlgz') }}：<span>{{
                $t('orderLists.zwwl')
              }}</span>
            </div>
            <div class="logistics" v-else>
              <span class="logistics-tracking"
                >{{ $t('orderLists.wlgz') }}：</span
              >
              <div
                style="height: 350px; overflow-x: scroll; padding-right: 10px"
              >
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in item.list"
                    :key="index"
                    :timestamp="item.time"
                  >
                    {{ item.context }}
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <div class="dialog-verification">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('orderLists.hx')"
        :visible.sync="dialogVisible3"
        :before-close="handleClose3"
      >
        <el-form
          :model="ruleForm3"
          :rules="rules3"
          ref="ruleForm3"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="task-container">
            <el-form-item
              class="integral"
              :label="$t('orderLists.yzm')"
              prop="verification"
            >
              <el-input
                v-model="ruleForm3.verification"
                :placeholder="$t('orderLists.qsrzt')"
              ></el-input>
            </el-form-item>
          </div>
          <div class="form-footer">
            <el-form-item>
              <el-button class="bgColor" @click="handleClose3()">{{
                $t('zdata.off')
              }}</el-button>
              <el-button
                class="bdColor"
                type="primary"
                @click="submitForm3('ruleForm3')"
                >{{ $t('zdata.ok') }}</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>

    <div class="dialog-export">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('DemoPage.export_data')"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <div class="item" @click="exportPage">
          <i class="el-icon-document"></i>
          <span>{{ $t('DemoPage.export_page') }}</span>
        </div>
        <div class="item item-center" @click="exportAll">
          <i class="el-icon-document-copy"></i>
          <span>{{ $t('DemoPage.export_all') }}</span>
        </div>
        <div class="item" @click="exportQuery">
          <i class="el-icon-document"></i>
          <span>{{ $t('DemoPage.export_query') }}</span>
        </div>
      </el-dialog>
    </div>
    <div class="dialog-orderInfo">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('orderLists.hxddxx')"
        :visible.sync="dialogVisible4"
        :before-close="handleClose4"
      >
        <div class="orderBox">
          <div class="one">{{ $t('orderLists.hxddbh') }}：{{ ruleForm4.sNo }}</div>
          <div class="two">
            <div class="widOne">{{ $t('orderLists.hxyhmc') }}：{{ ruleForm4.name }}</div>
            <div>{{ $t('orderLists.hxyhsj') }}：{{ ruleForm4.mobile }}</div>
          </div>
          <div class="three">
            <div class="widOne">{{ $t('orderLists.hxspsl') }}：{{ ruleForm4.num }}</div>
            <div>{{ $t('orderLists.hxddje') }}：￥{{ ruleForm4.old_total }}</div>
          </div>
          <el-table
            class="el-table"
            :data="orInfoList"
            style="width: 100%;"
            height="300"
          >
            <el-table-column
              align="center"
              prop="name"
              :label="$t('orderLists.hxspmc')"
              width="280"
            >
              <template slot-scope="scope">
                <div class="div_center">
                  <img :src="scope.row.img" width="40" height="40" />
                  <span class="span_center">{{ scope.row.product_title }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="size" :label="$t('orderLists.hxgg')">
            </el-table-column>
            <el-table-column align="center" prop="num" :label="$t('orderLists.hxsl')">
            </el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="form-footer">
          <el-button class="bgColor" @click="handleClose4"
            >{{
                $t('zdata.off')
              }}</el-button
          >
          <el-button class="submit" type="primary" @click="submit"
            >{{ $t('orderLists.hxqrhx') }}</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import orderLists from '@/webManage/js/order/orderList/orderLists'
export default orderLists
</script>

<style scoped lang="less">
@import '../../../../webManage/css/order/orderList/orderLists.less';
</style>
