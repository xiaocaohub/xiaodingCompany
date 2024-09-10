<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-select
            class="select-input"
            v-model="inputInfo.status"
            :placeholder="$t('freight.list.xzzt')"
          >
            <el-option :label="$t('freight.list.wsy')" value="0"></el-option>
            <el-option :label="$t('freight.list.ysy')" value="1"></el-option>
          </el-select>
          <el-select
            class="select-input"
            v-model="inputInfo.type"
            :placeholder="$t('freight.list.qxzj')"
          >
            <!-- <el-option :label="默认" value="2"></el-option> -->
            <el-option :label="$t('freight.list.jian')" value="0"></el-option>
            <el-option :label="$t('freight.list.zl')" value="1"></el-option>
          </el-select>
          <el-input
            v-model="inputInfo.name"
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            :placeholder="$t('freight.list.qsrmb')"
          ></el-input>
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
        v-if="detectionBtn(button_list, '添加模板')"
        class="bgColor laiketui laiketui-add"
        type="primary"
        @click="$router.push('/goods/freight/addtemplate')"
        >{{ $t('freight.list.tjmb') }}</el-button
      >
      <el-button
        v-if="detectionBtn(button_list, '批量删除')"
        class="fontColor"
        @click="delAll"
        :disabled="is_disabled"
        icon="el-icon-delete"
        >{{ $t('freight.list.plsc') }}</el-button
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
        <el-table-column prop="name" :label="$t('freight.list.mbmc')">
        </el-table-column>
        <el-table-column prop="type" :label="$t('freight.list.jsfs')">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">{{ $t('freight.list.zl') }}</span>
            <span v-if="scope.row.type == 0">{{
              $t('freight.list.jian')
            }}</span>
            <span v-if="scope.row.type == 2">{{ $t('freight.list.mr') }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="business_hours" :label="营业时间">
          </el-table-column>
          <el-table-column prop="address" :label="门店地址">
            <template slot-scope="scope">
              <span>{{ `${scope.row.sheng}${scope.row.shi}${scope.row.xian}${scope.row.address}` }}</span>
            </template>
          </el-table-column> -->
        <el-table-column prop="is_default" :label="$t('freight.list.swmr')">
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
        <el-table-column prop="is_use" :label="$t('freight.list.zt')">
          <template slot-scope="scope">
            <span>{{
              scope.row.is_use == 1
                ? $t('freight.list.ysy')
                : $t('freight.list.wsy')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="add_time"
          :label="$t('freight.list.tjsj')"
          width="185"
        >
          <!-- <template slot-scope="scope">
              <span>{{ scope.row.add_date | dateFormat }}</span>
            </template> -->
        </el-table-column>
        <el-table-column :label="$t('zdata.cz')" width="150">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button
                  v-if="detectionBtn(button_list, '编辑')"
                  icon="el-icon-edit-outline"
                  v-show="scope.row.is_use !== 1"
                  @click="Edit(scope.row)"
                  >{{ $t('zdata.bj') }}</el-button
                >
                <!-- :disabled="scope.row.is_use === 1" -->
                <el-button
                  icon="el-icon-delete"
                  v-if="
                    scope.row.is_use != 1 && detectionBtn(button_list, '删除')
                  "
                  @click="Delete(scope.row)"
                  >{{ $t('zdata.sc') }}</el-button
                >
                <el-button
                  v-if="detectionBtn(button_list, '查看')"
                  icon="el-icon-view"
                  v-show="scope.row.is_use === 1"
                  @click="details(scope.row)"
                  >{{ $t('freight.list.ck') }}</el-button
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
  </div>
</template>

<script>
import { index, delStore, setDefaultStore } from '@/api/stores/storesList'
import { mixinstest } from '@/mixins/index'
import { getStorage } from '@/utils/storage'
export default {
  name: 'storesLists',
  mixins: [mixinstest],
  data () {
    return {
      button_list: [],
      inputInfo: {
        name: null,
        status: '',
        type: ''
      },

      tableData: [],
      loading: true,

      is_disabled: true,
      idList: [],

      // table高度
      tableHeight: null
    }
  },

  created () {
    if (this.$route.params.pageSize) {
      this.pagination.page = this.$route.params.dictionaryNum
      this.dictionaryNum = this.$route.params.dictionaryNum
      this.pageSize = this.$route.params.pageSize
    }
    this.index()
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
      let list = routeList.filter(item => item.path == 'freight')[0].children
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
    async index () {
      const res = await index({
        api: 'mch.Mch.Freight.GetFreightInfo',
        name: this.inputInfo.name,
        mchId: getStorage('mchId'),
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        type: this.inputInfo.type,
        status: this.inputInfo.status
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
      this.inputInfo.name = null
      this.inputInfo.status = ''
      this.inputInfo.type = ''
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.index().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    // 选框改变
    handleSelectionChange (val) {
      if (val.length == 0) {
        this.is_disabled = true
      } else {
        this.is_disabled = false
      }
      console.log(val)
      this.idList = val.map(item => {
        return item.id
      })
      this.idList = this.idList.join(',')
    },

    delAll (value) {
      this.$confirm(this.$t('freight.list.scqr'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delStore({
            api: 'mch.Mch.Freight.DelFreight',
            shopId: value.store_id,
            freightIds: this.idList
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.sccg'),
                offset: 102
              })
              this.index()
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          //   offset: 102
          // });
        })
    },

    switchs (value) {
      setDefaultStore({
        api: 'mch.Mch.Freight.FreightSetDefault',
        id: value.id
      }).then(res => {
        if (res.data.code == '200') {
          console.log(res)
          this.index()
          this.$message({
            type: 'success',
            message: this.$t('zdata.czcg'),
            offset: 102
          })
        } else {
          this.index()
        }
      })
    },

    Edit (value) {
      this.$router.push({
        path: '/goods/freight/editortemplate',
        query: {
          id: value.id
        }
      })
    },
    details (value) {
      this.$router.push({
        path: '/goods/freight/addtemplate',
        query: {
          name: 'view',
          id: value.id
        }
      })
    },

    Delete (value) {
      this.$confirm(this.$t('freight.list.scqr'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delStore({
            api: 'mch.Mch.Freight.DelFreight',
            shopId: value.store_id,
            freightIds: value.id
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.sccg'),
                offset: 102
              })
              this.index()
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          //   offset: 102
          // });
        })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.index().then(() => {
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
      this.index().then(() => {
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
  /deep/.el-table__fixed::before {
    display: none;
  }
  /deep/.Search {
    margin-bottom: 16px;
    .select-input {
      margin-right: 10px;
    }
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
      // padding: 0;
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
      min-width: 120px;
      height: 40px;
      color: #6a7076;
      background-color: #fff;
      border-radius: 4px;
      &:hover {
        color: #2890ff;
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
