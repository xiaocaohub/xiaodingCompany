<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input size="medium" v-model="search.orderNo" class="Search-input" :placeholder="$t('orderSettlementList.qsrjs')"></el-input>
        </div>
        <!-- <div class="query-input">
          <el-input size="medium" v-model="search.mchName" class="Search-input" :placeholder="$t('orderSettlementList.qsrdp')"></el-input>
        </div> -->
        <div class="query-input">
          <el-select class="select-input" v-model="search.type" :placeholder="$t('orderSettlementList.qxzzt')">
            <el-option :label="$t('orderSettlementList.yjs')" value="1">
              <div>{{$t('orderSettlementList.yjs')}}</div>
            </el-option>
            <el-option :label="$t('orderSettlementList.djs')" value="0">
              <div>{{$t('orderSettlementList.djs')}}</div>
            </el-option>
          </el-select>
        </div>

        <div class="query-inputs">
          <el-date-picker v-model="search.time" type="datetimerange" :range-separator="$t('DemoPage.zhi')"
              :start-placeholder="$t('DemoPage.ksrq')"
              :end-placeholder="$t('DemoPage.jsrq')">
          </el-date-picker>
        </div>

        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{$t('DemoPage.tableExamplePage.reset')}}</el-button>
          <el-button class="bgColor" type="primary" @click="demand" v-enter="demand">{{$t('DemoPage.tableExamplePage.demand')}}</el-button>
          <el-button class="bgColor export" @click="isExportBox=!isExportBox" v-if="detectionBtn(button_list,'导出')">{{$t('DemoPage.tableExamplePage.export')}}</el-button>
        </div>
      </div>
    </div>

    <div class="merchants-list" ref="tableFather">
      <el-table :element-loading-text="$t('DemoPage.loading_text')" v-loading="page.loading" :data="page.tableData" ref="table"
        class="el-table"
        style="width: 100%"
        :height="tableHeight">
        <template slot="empty">
          <div class="empty">
            <img src="../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column prop="id" :label="$t('orderSettlementList.sddh')" width="170">
        </el-table-column>
        <el-table-column prop="settlementPrice" :label="$t('orderSettlementList.sjje')" width="170">
        </el-table-column>
        <!-- <el-table-column prop="commission" :label="$t('orderSettlementList.yj')" width="100">
        </el-table-column>
        <el-table-column prop="r_commission" :label="$t('orderSettlementList.thyj')" width="100">
        </el-table-column> -->
        <el-table-column prop="sNo" :label="$t('orderSettlementList.ddbh')" width="170">
        </el-table-column>
        <el-table-column prop="z_price" :label="$t('orderSettlementList.ddje')"width="170">
        </el-table-column>
        <!-- <el-table-column prop="shopName" :label="$t('orderSettlementList.dpmc')" width="150">
        </el-table-column> -->
        <el-table-column prop="return_money" :label="$t('orderSettlementList.tdje')" width="170">
        </el-table-column>
        <el-table-column prop="status_name" :label="$t('orderSettlementList.jszt')" width="170">
        </el-table-column>
        <el-table-column :label="$t('orderSettlementList.jssj')" width="170">
          <template slot-scope="scope" v-if="scope.row.arrive_time!=null">
            {{ scope.row.arrive_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="z_freight" :label="$t('orderSettlementList.yf')" >
        </el-table-column>
        <el-table-column prop="mch_discount" :label="$t('orderSettlementList.spyh')" width="170">
        </el-table-column>
        <el-table-column prop="preferential_amount" :label="$t('orderSettlementList.ptyh')" width="170">
        </el-table-column>
        <el-table-column :label="$t('orderSettlementList.ddsc')" width="200">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat}}
          </template>
        </el-table-column>

        <el-table-column fixed="right" :label="$t('orderSettlementList.cz')" width="170">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="See(scope.row)" v-if="detectionBtn(button_list,'查看')">{{$t('orderSettlementList.ck')}}</el-button>
                <el-button @click="Del(scope.row.id)" v-if="detectionBtn(button_list,'删除')">{{$t('orderSettlementList.shanchu')}}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pageBox" ref="pageBox" v-if="page.showPagebox">
        <div class="pageLeftText">{{$t('DemoPage.show')}}</div>
        <el-pagination layout="sizes, slot, prev, pager, next"
        :prev-text="$t('DemoPage.prev_text')"
        :next-text="$t('DemoPage.next_text')" @size-change="handleSizeChange"
        :page-sizes="pagesizes"
        :current-page="dictionaryNum"
        @current-change="handleCurrentChange"
        :total="total">
          <div class="pageRightText">{{$t('DemoPage.on_show')}}{{currpage}}-{{current_num}}{{$t('DemoPage.twig')}} {{total}} {{$t('DemoPage.twig_notes')}}</div>
        </el-pagination>
      </div>
    </div>

    <div class="dialog-export">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('DemoPage.export_data')"
        :visible.sync="isExportBox"
        :before-close="handleClose"
      >
        <div class="item" @click="exportPage">
          <i class="el-icon-document"></i>
          <span>{{$t('DemoPage.export_page')}}</span>
        </div>
        <div class="item item-center" @click="exportAll">
          <i class="el-icon-document-copy"></i>
          <span>{{$t('DemoPage.export_all')}}</span>
        </div>
        <div class="item" @click="exportQuery">
          <i class="el-icon-document"></i>
          <span>{{$t('DemoPage.export_query')}}</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import main from "@/webManage/js/order/orderSettlement/orderSettlementList";
export default main;
</script>

<style scoped lang="less">
@import "../../../common/commonStyle/form";
@import "../../../webManage/css/order/orderSettlement/orderSettlementList.less";
</style>
