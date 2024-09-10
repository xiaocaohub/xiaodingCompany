<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input
            v-model="inputInfo.fileName"
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            :placeholder="$t('bulkDeliveryRecord.qsrwjm')"
          ></el-input>
          <el-select
            class="select-input"
            v-model="inputInfo.fileStatus"
            :placeholder="$t('bulkDeliveryRecord.qxzwjz')"
          >
            <el-option
              v-for="item in fileStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="select-date">
            <el-date-picker
              v-model="inputInfo.date"
              type="datetimerange" :range-separator="$t('DemoPage.zhi')"
              :start-placeholder="$t('DemoPage.ksrq')"
              :end-placeholder="$t('DemoPage.jsrq')" value-format="yyyy-MM-dd HH:mm:ss"
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
          <el-button class="bgColor export" type="primary" @click="dialogShow"
            >{{$t('DemoPage.tableExamplePage.export')}}</el-button
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
            <img src="../../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column prop="id" :label="$t('bulkDeliveryRecord.wjid')" width="200">
        </el-table-column>
        <el-table-column prop="name" :label="$t('bulkDeliveryRecord.wjmc')"> </el-table-column>
        <el-table-column prop="status" :label="$t('bulkDeliveryRecord.wjzt')">
          <template slot-scope="scope">
            <span
              class="status"
              :class="[scope.row.status == 0 ? 'actives' : '']"
              >{{ scope.row.status == 0 ? $t('bulkDeliveryRecord.fhsb') : $t('bulkDeliveryRecord.fhcg') }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="add_date" :label="$t('bulkDeliveryRecord.plfhsj')">
          <template slot-scope="scope">
            <span>{{ scope.row.add_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="text" :label="$t('bulkDeliveryRecord.sbyy')">
          <!-- <template slot-scope="scope">
            <p class="text-renson">{{ scope.row.text }}</p>
          </template> -->
        </el-table-column>
        <el-table-column fixed="right" :label="$t('zdata.cz')" width="150" class="hhh">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="Delet(scope.row)">{{$t('zdata.sc')}}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox" ref="pageBox" v-if="showPagebox">
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
        :visible.sync="dialogVisible"
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
import { deliverList, delDelivery } from '@/api/order/sendGoods'
import { exports } from '@/api/export/index'
import { mixinstest } from '@/mixins/index'
export default {
  name: 'bulkDeliveryRecord',
  mixins: [mixinstest],
  data () {
    return {
      fileStatus: [], // 订单状态
      inputInfo: {
        fileName: null,
        fileStatus: null,
        date: null
      },

      tableData: [],
      loading: true,

      // table高度
      tableHeight: null,

      // 导出弹框数据
      dialogVisible: false
    }
  },

  created () {
    this.fileStatus=[
        {
          value: '1',
          label:this.$t('bulkDeliveryRecord.fhcg')
        },
        {
          value: '0',
          label: this.$t('bulkDeliveryRecord.fhsb')
        }
      ]
    this.deliverList()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
    async deliverList () {
      const res = await deliverList({
        api: 'mch.Mch.Order.DeliveryList',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        fileName: this.inputInfo.fileName,
        status: this.inputInfo.fileStatus,
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
      console.log(this.$refs.tableFather.clientHeight)
    },

    // 重置
    reset () {
      ;(this.inputInfo.fileName = null),
        (this.inputInfo.fileStatus = null),
        (this.inputInfo.date = null)
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.deliverList().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    Delet (value) {
      this.$confirm(this.$t('bulkDeliveryRecord.qdsc'), $t('zdata.ts'), {
        confirmButtonText: $t('zdata.ok'),
        cancelButtonText: $t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delDelivery({
            api: 'mch.Mch.Order.DelDelivery',
            id: value.id
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: $t('zdata.cg'),
                offset: 100
              })
              this.deliverList()
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          //   offset: 100
          // })
        })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.deliverList().then(() => {
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
      this.deliverList().then(() => {
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
          api: 'mch.Mch.Order.DeliveryList',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          fileName: this.inputInfo.fileName,
          status: this.inputInfo.fileStatus,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'pageorder'
      )
    },

    async exportAll () {
      exports(
        {
          api: 'mch.Mch.Order.DeliveryList',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1
        },
        'allorder'
      )
    },

    async exportQuery () {
      exports(
        {
          api: 'mch.Mch.Order.DeliveryList',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          fileName: this.inputInfo.fileName,
          status: this.inputInfo.fileStatus,
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
        .Search-input {
          width: 280px;
          margin-right: 10px;
        }
        .select-input {
          margin-right: 8px;
          width: 180px;
        }
      }
    }
  }

  .menu-list {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
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
      .cell {
        .status {
          &.actives {
            color: #ff453d;
          }
        }
      }
      .cell {
        img {
          width: 60px;
          height: 60px;
        }
      }
    }

    /deep/.el-table {
      .add {
        .cell {
          overflow: visible !important;
        }
      }
      .cell {
        .text-renson {
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .OP-button {
        .OP-button-top {
          .el-button {
            width: 88px;
            margin-left: 0px;
          }
        }
      }
    }
  }
}
</style>
