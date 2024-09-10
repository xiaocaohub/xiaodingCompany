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
        </div>
      </div>
    </div>
    <div class="jump-list">
      <el-button
      v-if="detectionBtn(button_list,'添加银行卡')"
        class="bgColor laiketui laiketui-add"
        type="primary"
        @click="$router.push('/moneyManagement/bankCard/addBankCard')"
        >{{ $t('bankCardList.tjyhk') }}</el-button
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
        <el-table-column prop="id" :label="$t('bankCardList.xh')" width="125">
        </el-table-column>
        <el-table-column
          prop="Bank_card_number"
          :label="$t('bankCardList.yhkh')"
        >
        </el-table-column>
        <el-table-column prop="Bank_name" :label="$t('bankCardList.khyh')">
        </el-table-column>
        <el-table-column prop="branch" :label="$t('bankCardList.khzh')">
        </el-table-column>
        <el-table-column prop="Cardholder" :label="$t('bankCardList.khr')">
        </el-table-column>
        <el-table-column prop="is_default" :label="$t('bankCardList.swmr')">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.is_default"
              @change="switchs(scope.row)"
              :active-value="1"
              :inactive-value="0"
              active-color="#00ce6d"
              inactive-color="#d4dbe8"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="add_date"
          :label="$t('bankCardList.tjsj')"
          width="185"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.add_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('zdata.cz')" width="150">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="Edit(scope.row)" v-if="detectionBtn(button_list,'编辑')"> {{$t('zdata.bj')}}</el-button>
                <el-button @click="Delete(scope.row)" v-if="detectionBtn(button_list,'删除')">{{$t('zdata.sc')}}</el-button>
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
  </div>
</template>

<script>
import { bankList, delBank, setDefault } from '@/api/moneyManagement/bankCard'
import { mixinstest } from '@/mixins/index'
import { getStorage } from "@/utils/storage";

export default {
  name: 'bankCardList',
  mixins: [mixinstest],
  data () {
    return {
      button_list:[],

      inputInfo: {
        date: null
      },

      tableData: [],
      loading: true,

      // table高度
      tableHeight: null
    }
  },

  created () {
    this.bankList()
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
    getButtonList(){
      let routeList = getStorage('route')
      let list =  routeList.filter(item=>item.path=="bankCard")[0].children
      this.button_list = list.map(item=>{
        return {text:item.name,path:item.path,url:item.url,checked:item.checked}
      })
      console.log('routeList',routeList,this.button_list);
    },
    async bankList () {
      const res = await bankList({
        api: 'mch.Mch.Finance.BankList',
        pageNo: this.dictionaryNum,
        pageSize: this.total,
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
      this.bankList().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    switchs (value) {
      setDefault({
        api: 'mch.Mch.Finance.SetDefault',
        bankId: value.id
      }).then(res => {
        if (res.data.code == '200') {
          this.bankList()
          this.$message({
            type: 'success',
            message: this.$t('zdata.czcg'),
            offset: 100
          })
        } else {
          this.bankList()
        }
      })
    },

    Edit (value) {
      this.$router.push({
        path: '/moneyManagement/bankCard/editorBankCard',
        query: {
          id: value.id,
          is_default: value.is_default
        }
      })
    },

    Delete (value) {
      this.$confirm(this.$t('bankCardList.qrsc'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delBank({
            api: 'mch.Mch.Finance.DelBank',
            id: value.id
          }).then(res => {
            if (res.data.code == '200') {
              this.bankList()
              this.$message({
                type: 'success',
                message: this.$t('zdata.sccg'),
                offset: 100
              })
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          //   offset: 100
          // });
        })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.bankList().then(() => {
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
      this.bankList().then(() => {
        this.current_num =
          this.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
      })
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

  /deep/.jump-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .laiketui-add:before {
      font-size: 14px;
      margin-right: 8px;
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
      width: 120px;
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
    }
    /deep/.el-table {
      .OP-button {
        .OP-button-top {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .el-button {
            width: 88px;
            margin-left: 0px;
            &:not(:last-child) {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
