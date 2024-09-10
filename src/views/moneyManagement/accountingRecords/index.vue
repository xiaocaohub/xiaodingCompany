<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
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
          <el-button class="bgColor" type="primary" @click="demand" v-enter="demand">{{
            $t('DemoPage.tableExamplePage.demand')
          }}</el-button>
          <el-button
            class="bgColor export"
            type="primary"
            @click="dialogShow"
            >{{ $t('DemoPage.tableExamplePage.export') }}</el-button
          >
        </div>
      </div>
    </div>

    <div class="menu-list" ref="tableFather">
      <el-table
        :element-loading-text="$t('DemoPage.loading_text')"
        v-loading="loading"
        :data="tableData"
        ref="table"
        class="el-table"
        style="width: 100%"
        :height="tableHeight"
      >
        <template slot="empty">
          <div class="empty">
            <img src="../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column
          prop="id"
          :label="$t('accountingRecords.xh')"
          width="125"
        >
        </el-table-column>
        <el-table-column prop="price" :label="$t('accountingRecords.rzje')">
          <template slot-scope="scope">
            <span v-if="scope.row.price">{{ scope.row.price.toFixed(2) }}</span>
            <span v-else>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="typeName" :label="$t('accountingRecords.rzlx')">
        </el-table-column>
        <el-table-column
          prop="addtime"
          :label="$t('accountingRecords.rzsj')"
          width="185"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.addtime | dateFormat }}</span>
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
  </div>
</template>

<script>
import { revenueRecords } from '@/api/moneyManagement/accountingRecords'
import { exports } from '@/api/export/index'
import { mixinstest } from '@/mixins/index'
export default {
  name: 'accountingRecords',
  mixins: [mixinstest],
  data () {
    return {
      inputInfo: {
        date: null
      },

      tableData: [
        {
          price: 11,
          type: '订单',
          time: '2021-10-18 14:56:47'
        }
      ],
      loading: true,

      // table高度
      tableHeight: null,
      // 导出弹框数据
      dialogVisible: false
    }
  },

  created () {
    this.revenueRecords()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
    async revenueRecords () {
      const res = await revenueRecords({
        api: 'mch.Mch.Finance.RevenueRecords',
        pageSize: this.pageSize,
        pageNo: this.dictionaryNum,
        status: 1,
        // type: 1,
        startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
        endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
      })
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
    },

    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },

    // 重置
    reset () {
      this.inputInfo.date = null
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.revenueRecords().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.revenueRecords().then(() => {
        this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1
        this.current_num =
          this.tableData.length === this.pageSize
            ? this.dictionaryNum * this.pageSize
            : this.total
        this.loading = false
      })
    },

    //点击上一页，下一页
    handleCurrentChange (e) {
      this.loading = true
      this.dictionaryNum = e
      this.currpage = (e - 1) * this.pageSize + 1
      this.revenueRecords().then(() => {
        this.current_num =
          this.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
      })
    },

    // 导出弹框方法
    dialogShow () {
      this.dialogVisible = true
    },

    handleClose (done) {
      this.dialogVisible = false
    },

    async exportPage () {
      exports(
        {
          api: 'mch.Mch.Finance.RevenueRecords',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          status: 1,
          type: 1,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'pageorder'
      )
    },

    async exportAll () {
      exports(
        {
          api: 'mch.Mch.Finance.RevenueRecords',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          type: 1,
          status: 1
        },
        'allorder'
      )
    },

    async exportQuery () {
      exports(
        {
          api: 'mch.Mch.Finance.RevenueRecords',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          status: 1,
          type: 1,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'queryorder'
      )
    }
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  /deep/.Search {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 16px;
    .Search-condition {
      display: flex;
      align-items: center;
      .query-input {
        display: flex;
        margin-right: 10px;
      }
    }
  }

  .menu-list {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    /deep/.el-table {
      border-radius: 4px;
    }
    /deep/.el-table__header {
      thead {
        tr {
          th {
            height: 61px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: #414658;
          }
        }
      }
    }
    /deep/.el-table__body {
      tbody {
        tr {
          td {
            height: 92px;
            text-align: center;
            font-size: 14px;
            color: #414658;
            font-weight: 400;
          }
        }
      }
    }
  }
}
</style>
