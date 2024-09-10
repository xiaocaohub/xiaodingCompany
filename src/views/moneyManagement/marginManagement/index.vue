<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-select class="select-input" v-model="inputInfo.type" :placeholder="$t('marginManagement.qxzbzjlx')">
            <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select class="select-input" v-model="inputInfo.status" :placeholder="$t('marginManagement.qxzshzt')">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
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
    <div class="jump-list">
      <el-button
        class="bgColor laiketui"
        type="primary"
        icon="el-icon-bzj"
        @click="open()"
        >{{ $t('marginManagement.thbzj') }}</el-button
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
            <img src="../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column prop="id" :label="$t('marginManagement.xh')">
        </el-table-column>
        <el-table-column prop="money" :label="$t('marginManagement.bzjje')">
        </el-table-column>
        <el-table-column prop="type" :label="$t('marginManagement.thjn')">
          <template slot-scope="scope">
            <span v-if="scope.row.type == 1">{{
              $t('marginManagement.jn')
            }}</span>
            <span v-if="scope.row.type == 2">{{
              $t('marginManagement.th')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('marginManagement.shzt')">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">{{
              $t('marginManagement.shz')
            }}</span>
            <span v-if="scope.row.status == 1">{{
              $t('marginManagement.shcg')
            }}</span>
               <span v-if="scope.row.status == 2" style="color: #FF453D;">{{
              $t('marginManagement.shsb')
            }}</span>
            <span v-if="scope.row.status == ''">
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="add_date" :label="$t('marginManagement.czsj')">
          <template slot-scope="scope">
            <span>{{ scope.row.add_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" :label="$t('marginManagement.bz')">
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
        :title="$t('marginManagement.thbzj')"
        :visible.sync="dialogVisible2"
        :before-close="handleClose2"
      >
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="task-container">
            <el-form-item
              class="promisePrice"
              :label="$t('marginManagement.ytje')"
            >
              <el-input v-model="ruleForm.promisePrice" disabled></el-input>
              <div class="explain">
                <img src="../../../assets/imgs/ts3.png" alt="" />
                <span class="red">{{ $t('marginManagement.text1') }}</span>
              </div>
            </el-form-item>
          </div>
          <div class="form-footer">
            <el-form-item>
              <el-button class="qx_bt" @click="handleClose2()">{{
                $t('adminLoggerList.ccel')
              }}</el-button>
              <el-button class="bdColor" type="primary" @click="submitForm">{{
                $t('adminLoggerList.okk')
              }}</el-button>
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
  </div>
</template>

<script>
import { getPromise, rePromise } from '@/api/moneyManagement/marginManagement'
import { exports } from '@/api/export/index'
import { mixinstest } from '@/mixins/index'
export default {
  name: 'marginManagement',
  mixins: [mixinstest],
  data () {
    return {
      inputInfo: {
        type:'',
        status:'',
        date: null
      },

      tableData: [],
      loading: true,

      // table高度
      tableHeight: null,
      // 导出弹框数据
      dialogVisible: false,

      dialogVisible2: false,
      ruleForm: {
        promisePrice: ''
      },
      typeList:[
        {
          value:1,
          label:this.$t('marginManagement.jn')
        },
        {
          value:2,
          label:this.$t('marginManagement.th')
        },
      ],
      statusList:[
        {
          value:0,
          label:this.$t('marginManagement.shz')
        },
        {
          value:1,
          label:this.$t('marginManagement.shcg')
        },
        {
          value:2,
          label:this.$t('marginManagement.shsb')
        },
      ],
      isPromiseExamine: true, //判断保证金是否在退还中   false 在退还在  true 没
      isPromisePay: true, // 是否缴纳保证金   false 未缴纳   true 已缴纳
      haveOrder: true, //是否有未完成的订单   false 有未完成的订单  true 没有
      haveProduct: true, //有上架商品不能退还保证金  false 有上架商品  true 没有
      promisePrice: '' //可退还保证金金额
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
      const res = await getPromise({
        api: 'mch.Mch.Promise.PromiseList',
        pageSize: this.pageSize,
        pageNo: this.dictionaryNum,
        type:this.inputInfo.type,
        status:this.inputInfo.status,
        startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
        endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
      })
      console.log('res', res)
      var arr = res.data.data
      this.ruleForm.promisePrice = arr.promisePrice
      this.isPromiseExamine = arr.isPromiseExamine
      this.isPromisePay = arr.isPromisePay
      this.haveOrder = arr.haveOrder
      this.haveProduct = arr.haveProduct
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
    },

    handleClose2 () {
      this.dialogVisible2 = false
    },
    open () {
      if (
        this.isPromiseExamine == false ||
        this.isPromisePay == false ||
        this.haveOrder == false ||
        this.haveProduct == false
      ) {
        var title
        if (this.isPromiseExamine == false) {
          title = this.$t('marginManagement.text3')
        } else if (this.isPromisePay == false) {
          title = this.$t('marginManagement.text2')
        } else if (this.haveOrder == false) {
          title = this.$t('marginManagement.text4')
        } else if (this.haveProduct == false) {
          title = this.$t('marginManagement.text5')
        }
        this.$confirm(title, this.$t('marginManagement.ts'), {
          confirmButtonText: this.$t('marginManagement.zdl'),
          showCancelButton:false,
          type: 'warning'
        })
          .then(() => {})
          .catch(() => {})
      } else {
        this.dialogVisible2 = true
      }
    },
    submitForm () {
      rePromise({
        api: 'mch.Mch.Promise.InsertPromisePrice'
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            type: 'success',
            message: this.$t('zdata.sqcg'),
            offset: 102
          })
          this.handleClose2()
          this.getList()
        }
      })
    },
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },

    // 重置
    reset () {
      this.inputInfo.type = ''
      this.inputInfo.status = ''
      this.inputInfo.date = null
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
          api: 'mch.Mch.Promise.PromiseList',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          type:this.inputInfo.type,
          status:this.inputInfo.status,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'pageorder'
      )
    },

    async exportAll () {
      exports(
        {
          api: 'mch.Mch.Promise.PromiseList',
          pageNo: 1,
          pageSize: 999999,
          exportType: 1
        },
        'allorder'
      )
    },

    async exportQuery () {
      exports(
        {
          api: 'mch.Mch.Promise.PromiseList',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          type:this.inputInfo.type,
          status:this.inputInfo.status,
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
  /deep/.el-icon-bzj {
    background: url('../../../assets/images/bzj.png') center center no-repeat;
    background-size: 13px;
  }

  /deep/.el-icon-bzj:before {
    content: '替';
    font-size: 13px;
    visibility: hidden;
  }
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
      .select-input{
        width: 180px;
        margin-right: 10px;
        input{
          width: 180px;
          margin-right: 10px;
        }
      }
    }
  }
  .dialog-block {
    // 弹框样式
    /deep/.el-dialog {
      width: 580px;
      height: 290px;
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
        padding: 40px 60px 40px 60px !important;

        .el-form {
          width: 100%;

          .task-container {
            // padding: 41px 0px 0px 0px !important;
            .el-form-item {
              margin-bottom: 0 !important;
            }

            width: 100%;

            .promisePrice,
            .integral,
            .level {
              display: flex;
              justify-content: center;

              .el-form-item__content {
                margin-left: 0px !important;
                display: flex;
                flex-direction: column;

                .el-input {
                  width: 360px;
                }

                .explain {
                  display: flex;
                  align-items: center;
                  margin-top: 10px;

                  img {
                    width: 12px;
                    height: 12px;
                    margin-right: 5px;
                    margin-bottom: 18px;
                  }

                  .red {
                    color: #6a7076;
                    font-size: 12px;
                    line-height: 20px;
                  }
                }
              }
            }
          }
        }

        .el-form-item__label {
          font-weight: normal;
        }

        .form-footer {
          width: 100%;
          height: 72px;
          position: absolute;
          bottom: 0;
          right: 0;
          border-top: 1px solid #e9ecef;

          .el-form-item {
            padding: 0 !important;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            margin-right: 17px;

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

          .qx_bt:hover {
            background-color: #fff;
            color: #2890ff;
            border: 1px solid #2890ff;
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
  }
}
</style>
