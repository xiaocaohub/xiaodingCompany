<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-select
            class="select-input"
            v-model="inputInfo.state"
            :placeholder="$t('withdrawalDetails.qxztxzt')"
          >
            <el-option
              v-for="item in stateList"
              :key="item.brand_id"
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
            v-if="detectionBtn(button_list, '导出')"
            >{{ $t('DemoPage.tableExamplePage.export') }}</el-button
          >
        </div>
      </div>
    </div>
    <div class="statistical">
      <div class="left-block">
        <img src="../../../../assets/imgs/withdrawal1.png" alt="" />
        <div class="balance">
          <span class="title">{{ $t('withdrawalDetails.zhje') }}</span>
          <span class="price">{{ withdrawal_amount }}</span>
        </div>
      </div>
      <div class="center"></div>
      <div class="right-block">
        <img src="../../../../assets/imgs/withdrawal2.png" alt="" />
        <div class="can-carry">
          <span class="title">{{ $t('withdrawalDetails.ktxje') }}</span>
          <span class="price">{{ account_balance }}</span>
        </div>
      </div>
    </div>
    <div class="jump-list">
      <el-button
        class="bgColor el-icon-wallet"
        type="primary"
        @click="applyWithdrawal"
        v-if="detectionBtn(button_list, '申请提现')"
        >{{ $t('withdrawalDetails.sqtx') }}</el-button
      >
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
        <el-table-column
          prop="id"
          :label="$t('withdrawalDetails.xh')"
          width="125"
        >
        </el-table-column>
        <el-table-column prop="money" :label="$t('withdrawalDetails.txje')">
          <template slot-scope="scope">
            <span v-if="scope.row.money">{{ scope.row.money.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="s_charge" :label="$t('withdrawalDetails.sxf')">
          <template slot-scope="scope">
            <span v-if="scope.row.s_charge">{{
              scope.row.s_charge.toFixed(2)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="arrivalMoney"
          :label="$t('withdrawalDetails.dzje')"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.arrivalMoney">{{
              scope.row.arrivalMoney.toFixed(2)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="Bank_card_number"
          :label="$t('withdrawalDetails.yhkh')"
        >
        </el-table-column>
        <el-table-column prop="Bank_name" :label="$t('withdrawalDetails.khyh')">
        </el-table-column>
        <el-table-column prop="type_name" :label="$t('withdrawalDetails.zt')">
          <template slot-scope="scope">
            <span
              class="status"
              :class="[
                scope.row.status == 1
                  ? 'actives'
                  : scope.row.status == 2
                  ? 'actives2'
                  : ''
              ]"
              >{{ scope.row.type_name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="add_date"
          :label="$t('withdrawalDetails.txsj')"
          width="185"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.add_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="refuse"
          :label="$t('withdrawalDetails.bz')"
          width="185"
        >
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
import {
  withdrawList,
  isWithdraw
} from '@/api/moneyManagement/withdrawalDetails'
import { exports } from '@/api/export/index'
import { mixinstest } from '@/mixins/index'
import { getStorage } from '@/utils/storage'

export default {
  name: 'detailsList',
  mixins: [mixinstest],
  data () {
    return {
      button_list: [],
      account_balance: '', // 账户余额
      withdrawal_amount: '', // 可提现金额
      inputInfo: {
        state: '',
        date: null,
        id: ''
      },
      stateList: [
        {
          value: '0',
          label: this.$t('withdrawalDetails.dsh')
        },
        {
          value: '1',
          label: this.$t('withdrawalDetails.shtg')
        },
        {
          value: '2',
          label: this.$t('withdrawalDetails.shbtg')
        }
      ], // 提现状态

      tableData: [],
      loading: true,

      // table高度
      tableHeight: null,
      // 导出弹框数据
      dialogVisible: false,
      is_Payment: true,
      isPromiseExamine:true,
    }
  },

  created () {
    if (this.$route.query.billId) {
      this.inputInfo.id = this.$route.query.billId
    }
    this.withdrawList()
    // 获取按钮权限
    this.getButtonList()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
    // 获取按钮权限
    getButtonList () {
      let routeList = getStorage('route')
      let list = routeList.filter(item => item.path == 'withdrawalDetails')[0]
        .children
      this.button_list = list.map(item => {
        return {
          text: item.name,
          path: item.path,
          url: item.url,
          checked: item.checked
        }
      })
      console.log('routeList', routeList, this.button_list)
    },
    async withdrawList () {
      const res = await withdrawList({
        api: 'mch.Mch.Finance.WithdrawList',
        pageSize: this.pageSize,
        pageNo: this.dictionaryNum,
        status: this.inputInfo.state,
        startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
        endDate: this.inputInfo.date ? this.inputInfo.date[1] : null,
        id: this.inputInfo.id
      })
      console.log(res)
      this.total = res.data.data.total
      this.is_Payment = res.data.data.is_Payment
      this.isPromiseExamine = res.data.data.isPromiseExamine
      this.tableData = res.data.data.list
      this.account_balance = res.data.data.money
      this.withdrawal_amount = res.data.data.cashable_money
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
      this.inputInfo.state = null
      this.inputInfo.date = null
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.withdrawList().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    applyWithdrawal () {
      if (!this.is_Payment) {
        this.$confirm(
          this.$t('physicalgoods.wjnbzja'),
          this.$t('physicalgoods.tsa'),
          {
            confirmButtonText: this.$t('physicalgoods.zdla'),
            showCancelButton: false,
            type: 'warning'
          }
        )
          .then(() => {})
          .catch(() => {})
      }else if (!this.isPromiseExamine) {
        this.$confirm(
          this.$t('physicalgoods.ndbzjzzthshza'),
          this.$t('physicalgoods.tsa'),
          {
            confirmButtonText: this.$t('physicalgoods.zdla'),
            showCancelButton: false,
            type: 'warning'
          }
        )
          .then(() => {})
          .catch(() => {})
      } else {
        // 调用接口
        isWithdraw({ api: 'mch.Mch.Finance.WithdrawList' }).then(res => {
          if (res.data.code == 200 && res.data.data.PopUpContent == '') {
            this.$router.push({
              path: '/moneyManagement/withdrawalDetails/applyWithdrawal',
              query: {
                money: this.withdrawal_amount
              }
            })
          } else {
            this.$confirm(res.data.data.PopUpContent, this.$t('smsList.ts'), {
              confirmButtonText: this.$t('supplierOrder.zdl'),
              showCancelButton: false,
              type: 'warning'
            })
          }
          return console.log('是否可以去其他界面xxxx', res)
        })
      }
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.withdrawList().then(() => {
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
      this.withdrawList().then(() => {
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
          api: 'mch.Mch.Finance.WithdrawList',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          status: this.inputInfo.state,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'pageorder'
      )
    },

    async exportAll () {
      exports(
        {
          api: 'mch.Mch.Finance.WithdrawList',
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
          api: 'mch.Mch.Finance.WithdrawList',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          status: this.inputInfo.state,
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
      .select-input {
        margin-right: 8px;
        width: 180px;
      }
    }
  }

  .statistical {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .left-block {
      display: flex;
      align-items: center;
      flex: 1;
      background-color: #fff;
      padding: 30px 20px;
      border-radius: 4px;
      .balance {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
        .title {
          font-size: 16px;
          color: #97a0b4;
        }
        .price {
          font-size: 30px;
          color: #414658;
        }
      }
    }
    .center {
      width: 16px;
      height: 100%;
    }
    .right-block {
      display: flex;
      align-items: center;
      flex: 1;
      background-color: #fff;
      padding: 30px 20px;
      border-radius: 4px;
      .can-carry {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-left: 20px;
        .title {
          font-size: 16px;
          color: #97a0b4;
        }
        .price {
          font-size: 30px;
          color: #414658;
        }
      }
    }
  }

  /deep/.jump-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .el-icon-wallet:before {
      font-size: 14px;
      margin-right: 8px;
      position: relative;
      top: 1px;
    }
    button {
      min-width: 120px;
      height: 40px;
      background: #28b6ff;
      border-radius: 4px;
      padding: 0 10px;
      border: none;
      &:hover {
        opacity: 0.8;
      }
      span {
        font-size: 14px;
      }
      .el-icon-wallet:before {
        margin-right: 8px;
      }
    }

    .fontColor {
      height: 42px;
      color: #6a7076;
      background-color: #fff;
      border-radius: 4px;
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
      .cell {
        .status {
          &.actives {
            color: #13ce66;
          }
          &.actives2 {
            color: #ff453d;
          }
        }
      }
    }
  }
}
</style>
