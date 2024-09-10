<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input
            size="medium"
            v-model="search.condition"
            class="Search-input"
            :placeholder="$t('ledgerList.qsrddbh')"
          ></el-input>
        </div>
        <div class="query-inputs">
          <el-date-picker
            v-model="search.date"
            type="datetimerange"
            :range-separator="$t('DemoPage.zhi')"
            :start-placeholder="$t('DemoPage.ksrq')"
            :end-placeholder="$t('DemoPage.jsrq')"
          >
          </el-date-picker>
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
            @click="isExportBox = !isExportBox"
            >{{ $t('DemoPage.tableExamplePage.export') }}</el-button
          >
        </div>
      </div>
    </div>

    <div class="merchants-list" ref="tableFather">
      <el-table
        :element-loading-text="$t('DemoPage.loading_text')"
        v-loading="page.loading"
        :data="page.tableData"
        ref="table"
        class="el-table"
        style="width: 100%"
        :height="tableHeight"
      >
        <el-table-column prop="order_no" :label="$t('ledgerList.ddbh')">
        </el-table-column>
        <el-table-column prop="z_price" :label="$t('ledgerList.ddje')">
        </el-table-column>
        <el-table-column prop="refund_price" :label="$t('ledgerList.tdje')">
        </el-table-column>
        <el-table-column prop="account" :label="$t('ledgerList.fzdx')">
        </el-table-column>
        <el-table-column prop="amount" :label="$t('ledgerList.fzje')">
        </el-table-column>
        <el-table-column prop="z_freight" :label="$t('ledgerList.yf')">
        </el-table-column>
        <el-table-column :label="$t('ledgerList.clsj')">
          <template slot-scope="scope">
            {{ scope.row.add_date }}
          </template>
        </el-table-column>

        <el-table-column fixed="right" :label="$t('ledgerList.cz')" width="200">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button icon="el-icon-view" @click="See(scope.row)">{{
                  $t('ledgerList.ckdd')
                }}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pageBox" ref="pageBox" v-if="page.showPagebox">
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

    <div class="dialog-export">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('DemoPage.export_data')"
        :visible.sync="isExportBox"
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
  </div>
</template>

<script>
import { index } from '@/api/order/ledgerList'
import { exports } from '@/api/export'
import pageData from '@/api/constant/page'
import { isEmpty } from 'element-ui/src/utils/util'
import { getStorage } from '@/utils/storage'
import { mixinstest } from '@/mixins/index'

export default {
  name: 'ledgerRecords',
  mixins: [mixinstest],
  //初始化数据
  data () {
    return {
      page: pageData.data(),
      search: {},
      mainData: {},
      //导出弹窗
      isExportBox: false,
      // table高度
      tableHeight: null
    }
  },
  //组装模板
  created () {
    this.loadData()
  },
  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },
  methods: {
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },
    async loadData () {
      await index({
        api: 'mch.Mch.DivideAccount.divideRecord',
        mchId: getStorage('mchId'),
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        condition: this.search.condition,
        startDate: this.search.date?.[0] ?? '',
        endDate: this.search.date?.[1] ?? ''
      }).then(data => {
        if (!isEmpty(data)) {
          let total = data.data.data.total
          data = data.data.data.list

          this.page.tableData = data
          this.total = total
          this.sizeMeth()
          this.page.loading = false
        }
      })
    },
    sizeMeth () {
      this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1
      this.current_num =
        this.page.tableData.length === this.pageSize
          ? this.dictionaryNum * this.pageSize
          : this.total
    },
    tbl (tblId) {
      this.loadData()
    },
    //选择一页多少条
    handleSizeChange (e) {
      this.page.loading = true
      this.pageSize = e
      this.loadData().then(() => {
        this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1
        this.current_num =
          this.page.tableData.length === this.pageSize
            ? this.dictionaryNum * this.pageSize
            : this.total
        this.page.loading = false
      })
    },
    // 查询
    demand () {
      this.showPagebox = false
      this.page.loading = true
      this.dictionaryNum = 1
      this.loadData().then(() => {
        this.page.loading = false
        if (this.page.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },
    //点击上一页，下一页
    handleCurrentChange (e) {
      this.page.loading = true
      this.dictionaryNum = e
      this.currpage = (e - 1) * this.pageSize + 1
      this.loadData().then(() => {
        this.current_num =
          this.page.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.page.loading = false
      })
    },
    // 重置
    reset () {
      this.search = { condition: null, date: null }
    },
    See (row) {
      this.$router.push({
        path: '/order/orderList/orderLists',
        query: {
          orderNo: row.order_no
        }
      })
    },
    //导出
    async exportPage () {
      await exports(
        {
          api: 'mch.Mch.DivideAccount.divideRecord',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          mchId: getStorage('mchId'),
          condition: this.search.condition,
          startDate: this.search.date?.[0] ?? '',
          endDate: this.search.date?.[1] ?? ''
        },
        '分账记录_导出本页'
      )
    },
    async exportAll () {
      console.log(this.total)
      await exports(
        {
          api: 'mch.Mch.DivideAccount.divideRecord',
          mchId: getStorage('mchId'),
          pageNo: 1,
          pageSize: 999999,
          exportType: 1
        },
        '分账记录_导出全部'
      )
    },
    async exportQuery () {
      await exports(
        {
          api: 'mch.Mch.DivideAccount.divideRecord',
          mchId: getStorage('mchId'),
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          condition: this.search.condition,
          startDate: this.search.date?.[0] ?? '',
          endDate: this.search.date?.[1] ?? ''
        },
        '分账记录_导出查询'
      )
    },
    handleClose () {
      this.isExportBox = false
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../common/commonStyle/form';
.container {
  display: flex;
  flex-direction: column;
  .merchants-list {
    flex: 1;
    .OP-button-top {
      justify-content: center;
    }
  }
  .OP-button-top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .el-button {
      width: 88px;
      margin-left: 0 !important;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
  tr td:last-child {
    z-index: -999;
  }

  .query-inputs {
    margin-right: 10px;
  }
  .Search-input {
    width: 250px;
  }
}
</style>
