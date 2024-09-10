<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input
            v-model="inputInfo.account_number"
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            :placeholder="$t('adminList.qsrglyzh')"
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
        class="bgColor laiketui laiketui-add"
        type="primary"
        @click="add()"
        >{{ $t('adminList.tjgly') }}</el-button
      >
      <el-button
        class="fontColor"
        @click="delAll"
        :disabled="is_disabled"
        icon="el-icon-delete"
        >{{ $t('storesLists.plsc') }}</el-button
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
        <el-table-column prop="account_number" :label="$t('adminList.zh')">
        </el-table-column>
        <el-table-column prop="last_time" :label="$t('adminList.zhdlsj')">
          <template slot-scope="scope">
            <span>{{ scope.row.last_time }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="add_date" :label="$t('adminList.tjsj')">
          <template slot-scope="scope">
            <span>{{ scope.row.add_date }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('zdata.cz')" width="240">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="Edit(scope.row)">{{
                  $t('zdata.bj')
                }}</el-button>
                <el-button @click="Delete(scope.row)">{{
                  $t('zdata.sc')
                }}</el-button>
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
        :title="adTitle"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="auto"
          class="demo-ruleForm"
        >
          <el-form-item :label="$t('adminList.gylzh')" prop="account_number">
            <el-input
              :disabled="editId != ''"
              v-model="ruleForm.account_number"
              :placeholder="$t('adminList.qsrzh')"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('adminList.glymm')" prop="password">
            <el-input
              v-model="ruleForm.password"
              show-password
              :placeholder="$t('adminList.qsrmm')"
            ></el-input>
          </el-form-item>
          <div class="form-footer">
            <el-form-item>
              <el-button class="bgColor" @click="handleClose">{{
                $t('zdata.off')
              }}</el-button>
              <el-button type="primary" @click="submit('ruleForm')">{{
                $t('zdata.ok')
              }}</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getAdmin, addAdmin, delAdmin } from '@/api/stores/storesList'
import { mixinstest } from '@/mixins/index'
export default {
  name: 'adminList',
  mixins: [mixinstest],
  data () {
    return {
      inputInfo: {
        account_number: null
      },
      ruleForm: {
        account_number: '',
        password: ''
      },
      rules: {
        account_number: [
          {
            required: true,
            message: this.$t('adminList.qsrzh'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('adminList.qsrmm'),
            trigger: 'blur'
          }
        ]
      },
      adTitle: '',
      dialogVisible: false,
      tableData: [],
      loading: true,

      is_disabled: true,
      idList: [],

      // table高度
      tableHeight: null,
      editId: ''
    }
  },

  created () {
    this.getList()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
    async getList () {
      const res = await getAdmin({
        api: 'mch.Mch.Store.AdminList',
        mch_store_id: this.$route.query.id,
        account_number: this.inputInfo.account_number,
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize
      })
      console.log('res', res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      this.current_num =
        this.tableData.length === this.pageSize
          ? this.dictionaryNum * this.pageSize
          : this.total
    },
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },

    // 重置
    reset () {
      this.inputInfo.account_number = null
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.getList().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },
    add () {
      this.dialogVisible = true
      this.adTitle = this.$t('adminList.tjgly')
    },
    handleClose () {
      this.dialogVisible = false
      this.ruleForm.account_number = ''
      this.ruleForm.password = ''
      this.editId = ''
      this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
    },
    submit (formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            addAdmin({
              api: 'mch.Mch.Store.AddAdmin',
              id: this.editId ?? '',
              mch_store_id: this.$route.query.id,
              account_number: this.ruleForm.account_number,
              password: this.ruleForm.password
            }).then(res => {
              if (res.data.code == '200') {
                if(this.editId){
                  this.$message({
                    message: this.$t('zdata.bjcg'),
                    type: 'success',
                    offset: 102
                  })
                }else{
                  this.$message({
                  message: this.$t('zdata.tjcg'),
                  type: 'success',
                  offset: 102
                })
                }
                this.handleClose()
                this.getList()
              }
            })
          } catch (error) {
            this.$message({
              message: error.message,
              type: 'error',
              showClose: true
            })
          }
        } else {
          console.log('error submit!!')
          return false
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
      console.log('idList', this.idList)
    },
    isFillList () {
      let totalPage = Math.ceil((this.total - 1) / this.pageSize)
      let dictionaryNum =
        this.dictionaryNum > totalPage ? totalPage : this.dictionaryNum
      this.dictionaryNum = dictionaryNum < 1 ? 1 : dictionaryNum
      this.currpage = this.dictionaryNum
      this.getList() //数据初始化方法
    },
    delAll () {
      this.$confirm(this.$t('adminList.sfscgly'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delAdmin({
            api: 'mch.Mch.Store.DelAdmin',
            mch_store_id: this.$route.query.id,
            id: this.idList
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.sccg'),
                offset: 102
              })
              this.isFillList()
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

    Edit (row) {
      this.ruleForm.account_number = row.account_number
      this.ruleForm.password = row.password
      this.editId = row.id
      this.dialogVisible = true
      this.adTitle = this.$t('adminList.bjgly')
    },

    Delete (row) {
      this.$confirm(this.$t('adminList.sfscgly'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      }).then(() => {
        delAdmin({
          api: 'mch.Mch.Store.DelAdmin',
          mch_store_id: this.$route.query.id,
          id: row.id
        }).then(res => {
          if (res.data.code == '200') {
            this.$message({
              type: 'success',
              message: this.$t('zdata.sccg'),
              offset: 102
            })
            this.isFillList()
          }
        })
      })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.getList().then(() => {
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
      this.getList().then(() => {
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
        .Search-input {
          width: 240px;
          input {
            width: 240px;
          }
        }
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
      width: 120px;
      height: 40px;
      background: #28b6ff;
      border-radius: 4px;
      padding: 0;
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
      height: 40px;
      color: #6a7076;
      background-color: #fff;
      border-radius: 4px;
      &:hover {
        color: #2890ff;
      }
    }
  }
  .dialog-block {
    // 弹框样式
    /deep/.el-dialog {
      width: auto;
      min-width: 580px;
      height: 310px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
      .el-dialog__header {
        width: 100%;
        height: 58px;
        line-height: 58px;
        font-size: 16px;
        margin-left: 19px;
        font-weight: bold;
        border-bottom: 1px solid #e9ecef;
        box-sizing: border-box;
        margin: 0;
        padding: 0 0 0 19px;
        .el-dialog__headerbtn {
          font-size: 18px;
          top: 0 !important;
        }
        .el-dialog__title {
          font-weight: normal;
        }
      }

      .el-dialog__body {
        padding: 41px 60px 0px 60px !important;
        .el-form-item__label {
          font-weight: normal;
        }
        .demo-ruleForm {
          .el-form-item {
            display: flex;
          }
          .el-form-item__content {
            margin-left: 0 !important;
          }
        }
        .form-footer {
          width: 100%;
          height: 72px;
          position: absolute;
          bottom: 0;
          right: 0;
          border-top: 1px solid #e9ecef;
          .el-form-item {
            text-align: right;
            margin-right: 10px;
            padding: 0 !important;
            height: 100%;
            display: block !important;
            .el-form-item__content {
              height: 100%;
              line-height: 72px;
              margin: 0 !important;
            }
          }
          .bgColor:hover {
            background-color: #fff;
            color: #2890ff;
            border: 1px solid #2890ff;
          }
        }
        .el-input {
          width: 360px;
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
    }
    /deep/.el-table {
      .OP-button {
        .OP-button-top {
          display: flex;
          // flex-direction: column;
          justify-content: center;
          align-items: center;
          .el-button {
            width: 88px;
            &:not(:last-child) {
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
