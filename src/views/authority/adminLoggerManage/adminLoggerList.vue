<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input size="medium" v-model="search.adminName" class="Search-input" :placeholder="$t('adminLoggerList.glyzh')"></el-input>
        </div>
        <div class="query-input">
          <el-select class="select-input"  v-model="search.logOperationType" :placeholder="$t('adminLoggerList.qxzczlx')">
            <el-option v-for="item in operateList" :key="item.value" :label="item.text" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="query-input">
          <el-date-picker 
            v-model="search.time" 
            type="datetimerange" 
            :range-separator="$t('DemoPage.zhi')"
              :start-placeholder="$t('DemoPage.ksrq')"
              :end-placeholder="$t('DemoPage.jsrq')"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        

        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{$t('DemoPage.tableExamplePage.reset')}}</el-button>
          <el-button class="bgColor" type="primary" @click="demand" v-enter="demand">{{$t('DemoPage.tableExamplePage.demand')}}</el-button>
          <el-button class="bgColor export" type="primary" @click="isExportBox=!isExportBox">{{$t('DemoPage.tableExamplePage.export')}}</el-button>
        </div>
      </div>
    </div>

    <div class="jump-list">
      <el-button class="fontColor" @click="Del" icon="el-icon-delete">{{$t('DemoPage.tableExamplePage.Batch_delete')}}</el-button>
    </div>

    <div class="merchants-list" ref="tableFather">
      <el-table :element-loading-text="$t('DemoPage.loading_text')" v-loading="page.loading" :data="page.tableData" ref="table"
        class="el-table"
        style="width: 100%"
        :height="tableHeight" @selection-change="Chose">
        <template slot="empty">
          <div class="empty">
            <img src="../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column type="selection" >
        </el-table-column>
        <el-table-column prop="zhanghao" :label="$t('adminLoggerList.glyzh')">
        </el-table-column>
        <el-table-column prop="operation_type" :label="$t('adminLoggerList.czlx')">
        </el-table-column>
        <el-table-column prop="event" :label="$t('adminLoggerList.sj')">
        </el-table-column>
        
        <el-table-column :label="$t('adminLoggerList.time')">
          <template slot-scope="scope" v-if="scope.row.add_date!=null">
            {{ scope.row.add_date | dateFormat}}
          </template>
        </el-table-column>

      </el-table>

      <div class="pageBox" ref="pageBox" v-if="page.showPagebox">
        <div class="pageLeftText">{{$t('DemoPage.show')}}</div>
        <el-pagination layout="sizes, slot, prev, pager, next" 
        :prev-text="$t('DemoPage.prev_text')" 
        :next-text="$t('DemoPage.next_text')" @size-change="handleSizeChange"
        :page-sizes="pagesizes" 
        :current-page="pagination.page" 
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
import main from "@/webManage/js/authority/adminLoggerManage/adminLoggerList";
export default main;
</script>

<style scoped lang="less">
@import "../../../common/commonStyle/form";
@import "../../../webManage/css/authority/adminLoggerManage/adminLoggerList.less";
</style>
