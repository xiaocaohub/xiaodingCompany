<template>
  <div class="container" id="hhhh">
    <el-form
      ref="ruleForm"
      class="form-search"
      :model="ruleForm"
      label-width="100px"
    >
      <div class="basic-info">
        <div class="header">
          <span>{{ $t('addGoods.xzypt') }}</span>
        </div>
        <div class="basic-block">
          <div class="addGoods-item">
            <el-radio-group v-model="tabKey" @change="layoutChange()">
              <el-radio-button label="0">{{
                $t('addGoods.cxsp')
              }}</el-radio-button>
              <el-radio-button label="1">{{
                $t('addGoods.yxsp')
              }}</el-radio-button>
            </el-radio-group>
            <div class="Search" style="margin-top: 20px" v-if="tabKey == '0'">
              <el-cascader
                v-model="goodsClass"
                class="select-input"
                ref="myCascader"
                :placeholder="$t('addGoods.qxzspf')"
                :options="classList"
                :props="{ checkStrictly: true }"
                @change="changeProvinceCity"
                clearable
              >
              </el-cascader>
              <el-select
                class="Search-select"
                v-model="brand"
                :placeholder="$t('addGoods.qxzspp')"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.brand_id"
                  :label="item.brand_name"
                  :value="item.brand_id"
                >
                </el-option>
              </el-select>
              <el-input
                class="Search-input"
                :placeholder="$t('addGoods.qsrspm')"
                v-model="Proname"
              ></el-input>
              <el-button @click="Reset" plain>{{
                $t('DemoPage.tableExamplePage.reset')
              }}</el-button>
              <el-button @click="query" type="primary" v-enter="query">{{
                $t('DemoPage.tableExamplePage.demand')
              }}</el-button>
            </div>
            <div class="Table" v-show="tabKey == '0'">
              <el-table
                ref="multipleTable"
                :data="ProList"
                :row-key="rowKeys"
                style="width: 100%"
                @selection-change="handleSelectionChange2"
                height="300"
              >
                <el-table-column
                  :reserve-selection="true"
                  align="center"
                  type="selection"
                  width="55"
                ></el-table-column>
                <el-table-column prop="id" align="center" label="商品编号">
                </el-table-column>
                <el-table-column
                  prop="ProName"
                  align="center"
                  :label="$t('addGoods.spmc')"
                >
                  <template slot-scope="scope">
                    <div class="Info">
                      <img
                        :src="scope.row.imgurl"
                        width="40"
                        height="40"
                        alt=""
                      />
                      <span>{{ scope.row.product_title }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="pname"
                  align="center"
                  :label="$t('addGoods.fl')"
                >
                </el-table-column>
                <el-table-column
                  prop="brand_name"
                  align="center"
                  :label="$t('addGoods.pp')"
                >
                </el-table-column>
                <el-table-column
                  prop="cbj"
                  align="center"
                  :label="$t('addGoods.cbj')"
                >
                </el-table-column>
                <el-table-column
                  prop="price"
                  align="center"
                  :label="$t('addGoods.sj')"
                >
                </el-table-column>
                <el-table-column
                  prop="num"
                  align="center"
                  :label="$t('addGoods.kc')"
                >
                </el-table-column>
                <el-table-column :label="$t('zdata.cz')" align="center">
                  <template slot-scope="scope">
                    <div class="OP-button">
                      <div class="OP-button-top">
                        <el-button @click="Details(scope.row)">{{
                          $t('addGoods.ckxq')
                        }}</el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pageBox">
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
            <div class="Table" v-show="tabKey == '1'">
              <el-table height="300" :data="ChangeProList">
                <el-table-column
                  prop="ProName"
                  align="center"
                  :label="$t('addGoods.spmc')"
                >
                  <template slot-scope="scope">
                    <div class="Info">
                      <img
                        :src="scope.row.imgurl"
                        width="40"
                        height="40"
                        alt=""
                      />
                      <span>{{ scope.row.product_title }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="pname"
                  align="center"
                  :label="$t('addGoods.fl')"
                >
                </el-table-column>
                <el-table-column
                  prop="brand_name"
                  align="center"
                  :label="$t('addGoods.pp')"
                >
                </el-table-column>
                <el-table-column
                  prop="num"
                  align="center"
                  :label="$t('addGoods.kc')"
                >
                </el-table-column>
                <el-table-column
                  prop="cbj"
                  align="center"
                  :label="$t('addGoods.cbj')"
                >
                </el-table-column>
                <el-table-column
                  prop="sj"
                  align="center"
                  :label="$t('addGoods.sj')"
                >
                </el-table-column>
                <el-table-column :label="$t('zdata.cz')" align="center">
                  <template slot-scope="scope">
                    <div class="OP-button">
                      <div class="OP-button-top">
                        <el-button @click="Details(scope.row)">{{
                          $t('addGoods.ckxq')
                        }}</el-button>
                      </div>
                      <div class="OP-button-bottom">
                        <el-button @click="Delete(scope.row, scope.$index)">{{
                          $t('zdata.sc')
                        }}</el-button>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- <el-select class="select-input" v-model="freight" placeholder="请选择运费">
                <el-option v-for="item in freightList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select> -->
          </div>
        </div>
      </div>
      <div class="footer-button">
        <el-button
          plain
          class="footer-cancel fontColor"
          @click="$router.go(-1)"
          >{{ $t('zdata.off') }}</el-button
        >
        <el-button
          type="primary"
          class="footer-save bgColor mgleft"
          @click="AddProconfirm"
          >{{ $t('addGoods.tj') }}</el-button
        >
      </div>
    </el-form>
    <!-- <div style="width: 100%;height: 88px;background-color: #edf1f5;"></div> -->

    <div class="dialog-block">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('addGoods.spsz')"
        :visible.sync="dialogVisible2"
        :before-close="handleClose2"
      >
        <el-form
          :model="ruleForm2"
          ref="ruleForm2"
          :rules="rules2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="task-container">
            <el-form-item
              class="integral"
              :label="$t('addGoods.yfmb')"
              prop="freight"
            >
              <el-select
                class="select-input"
                v-model="ruleForm2.freight"
                :placeholder="$t('addGoods.qxzyf')"
              >
                <el-option
                  v-for="item in freightList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <div class="form-footer">
            <el-form-item>
              <el-button class="bgColor" @click="handleClose2()">{{
                $t('zdata.off')
              }}</el-button>
              <el-button class="bdColor" type="primary" @click="submitForm">{{
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
import { mapState } from 'vuex'
import { mixinstest } from '@/mixins/index'
import { index, choiceClass, addOptionalGoods } from '@/api/goods/goodsList'
import { getFreightInfo } from '@/api/goods/freightManagement'
export default {
  name: 'addGoods',
  mixins: [mixinstest],
  computed: {
    ...mapState({
      selection: 'selection'
    })
  },
  data () {
    return {
      ruleForm: {
        name: '',
        tel: '',
        sheng: '',
        city: '',
        quyu: '',
        address_xq: ''
      },
      tableRadio: '',
      total: 0,
      total2: 0,
      tabKey: '0',
      BrandList: [],
      ProList: [],
      ChangeProList: [],
      BrandValue: '',
      sendClass: '',
      Proname: '',
      options: [],

      classList: [],
      brandList: [],
      goodsClass: '',
      brand: '',

      // 弹框数据
      ruleForm2: {
        freight: ''
      },
      rules2: {
        freight: [
          {
            required: true,
            message: this.$t('addGoods.xzyf'),
            trigger: 'change'
          }
        ]
      },
      dialogVisible2: false,
      freightList: []
    }
  },

  created () {
    this.indexs()
    this.choiceClasss()
    this.getFreightInfos()
  },

  methods: {
    // 获取商品类别
    async choiceClasss () {
      const res = await choiceClass({
        api: 'mch.Mch.Goods.GetClass'
      })
      res.data.data.list.class_list[0].forEach((item, index) => {
        let obj = item
        this.classList.push({
          value: obj.cid,
          label: obj.pname,
          index: index,
          children: []
        })
      })
    },

    // 根据商品类别id获取商品品牌
    changeProvinceCity (value) {
      this.brand = ''
      this.brandList = []
      choiceClass({
        api: 'mch.Mch.Goods.GetClass',
        classId: value.length > 1 ? value[value.length - 1] : value[0]
      }).then(res => {
        let num = this.$refs.myCascader.getCheckedNodes()[0].data.index
        this.brandList = res.data.data.list.brand_list
        if (res.data.data.list.class_list[0].length !== 0) {
          this.$refs.myCascader.getCheckedNodes()[0].data.children = []
          res.data.data.list.class_list[0].forEach((item, index) => {
            let obj = item
            this.$refs.myCascader.getCheckedNodes()[0].data.children.push({
              value: obj.cid,
              label: obj.pname,
              index: index,
              children: []
            })
          })
        }
      })
    },

    // 获取运费列表
    async getFreightInfos () {
      const res = await getFreightInfo({
        api: 'mch.Mch.Freight.Index',
        pageSize: 999
      })
      this.freightList = res.data.data.list
    },

    // 获取产品列表
    async indexs () {
      const res = await index({
        api: 'mch.Mch.Goods.Index',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        commodityType: 2,
        cid: this.goodsClass[this.goodsClass.length - 1],
        brandId: this.brand,
        productTitle: this.Proname
      })
      console.log(res)
      this.ProList = res.data.data.list
      this.total = res.data.data.total
      if (this.total < this.current_num) {
          this.current_num = this.total
        }
      if (this.$route.params.ChangeProList) {
        this.ChangeProList = this.$route.params.ChangeProList
        this.ChangeProList.map(items => {
          this.$refs.multipleTable.toggleRowSelection(
            this.ProList.find(item => {
              return items.id == item.id
            }),
            true
          )
        })
      }
    },

    rowKeys (row) {
      return row.id
    },

    Reset () {
      this.BrandValue = ''
      this.BrandList = []
      this.brand = ''
      this.brandList = []
      ;(this.cid = ''), (this.goodsClass = ''), (this.brand = '')
      this.Proname = ''
    },

    query () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.indexs().then(() => {
        this.loading = false
      })
    },

    Details (value) {
      this.$router.push({
        path: '/goods/goodslist/goodsDetails',
        query: {
          id: value.id,
          name: 'editor',
          isZx: true,
          classId: value.product_class,
          ChangeProList: this.ChangeProList,
          toType: 'optionalGoods'
        }
      })
    },
    layoutChange () {
      // this.$nextTick(() => {
      //   this.$refs.multipleTable.doLayout();
      //   this.$refs.ProName.doLayout();
      // });
      // this.query()
    },
    Delete (value, index) {
      this.ChangeProList.splice(index, 1)
      // this.$refs.multipleTable.toggleRowSelection(
      //   this.ProList.find(item => {
      //     return value.id == item.id
      //   }),
      //   false
      // )
      this.$refs.multipleTable.selection.forEach(item => {
        if (value.id == item.id) {
          this.$refs.multipleTable.toggleRowSelection(item, false)
        }
      })
    },

    handleSelectionChange (e) {
      this.tableRadio = e
      this.userchangedata = e
    },
    handleSelectionChange2 (e) {
      this.ChangeProList = e
    },
    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.dictionaryNum = 1
      // this.current_num = e
      this.pageSize = e
      this.indexs().then(() => {
        this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1
        this.current_num =
          this.ProList.length === this.pageSize
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
      this.indexs().then(() => {
        this.current_num =
          this.ProList.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
      })
    },

    AddProconfirm () {
      this.dialogVisible2 = true
    },

    handleClose2 () {
      this.dialogVisible2 = false
    },

    submitForm () {
      if (!this.ChangeProList.length) {
        this.$message({
          message: this.$t('addGoods.qxzsp'),
          type: 'error',
          offset: 100
        })
      } else if (!this.ruleForm2.freight) {
        this.$message({
          message: '请选择运费模板',
          type: 'error',
          offset: 100
        })
      } else {
        this.dialogVisible2 = false
        let ids = this.ChangeProList.map(item => {
          return item.id
        })
        this.$store.commit('loading/SET_LOADING')
        addOptionalGoods({
          api: 'mch.Mch.Goods.AddZxGoods',
          goodsIds: ids.join(','),
          yunFeiId: this.ruleForm2.freight
        }).then(res => {
          if (res.data.code == '200') {
            this.$message({
              message: this.$t('zdata.tjcg'),
              type: 'success',
              offset: 100
            })
            this.$router.go(-1)
            this.$store.commit('loading/SET_LOADING')
          } else {
            this.$store.commit('loading/SET_LOADING')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  // background-color: #fff;
  border-radius: 4px;
  // margin-bottom: 70px;
  // height: 666px !important;
  /deep/.el-form {
    // background-color: #fff;
    .header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e9ecef;
      padding-left: 20px;
      border-radius: 4px 4px 0 0;
      span {
        font-weight: 400;
        font-size: 16px;
        color: #414658;
      }
    }

    .basic-info {
      width: 100%;
      background-color: #fff;
      // margin-bottom: 16px;
      margin-bottom: 91px;

      border-radius: 4px;
      padding-bottom: 10px;
      .basic-block {
        margin-top: 40px;
        padding: 0 20px 90px 20px;
        display: flex;
        justify-content: center;
        background: #ffffff;
        // margin-bottom: 50px;
        .addGoods-item {
          width: 100%;
          .Search {
            display: flex;
            padding-left: 0;
          }

          .el-cascader {
            width: 180px;
            margin-right: 8px;
          }

          .Search-select {
            width: 180px;
            margin-right: 8px;
          }

          .Search-input {
            width: 280px;
            margin-right: 8px;
          }

          .Table {
            margin-top: 14px;
            border: 1px solid #e9ecef;
          }

          .demo-ruleForm {
            width: 520px;
          }

          .el-dialog__footer {
            border-top: 1px solid #e9ecef;
            padding: 16px 20px !important;
          }

          .el-dialog__header {
            border-bottom: 1px solid #e9ecef;
          }

          .el-icon-close {
            color: #888f9e !important;
            font-size: 20px !important;
          }

          .Info {
            display: flex;
            align-items: center;
            color: #414658;
          }
          .Info span {
            width: 150px;
            display: inline-block;
            white-space: normal;
            text-align: left;
            padding-left: 10px;
          }
          .box-card {
            height: 100%;
            overflow: auto;
          }
          .delete {
            width: 56px;
            height: 22px;
            line-height: 22px;
            border: 1px solid #d5dbe8;
            border-radius: 2px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #888f9e;
            margin: 0;
            padding: 0;
          }

          .freight {
            .el-input {
              width: 240px;
            }
          }

          .el-table {
            .OP-button {
              .OP-button-top {
                margin-bottom: 8px;
                display: flex;
                justify-content: center;
              }
              .OP-button-bottom {
                display: flex;
                justify-content: center;
              }
              .el-button {
                width: 88px !important;
                border: 1px solid #d5dbe8;
                border-radius: 2px;
              }
            }
          }
        }
      }
    }

    .footer-button {
      position: fixed;
      right: 0;
      bottom: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 15px 20px;
      border-top: 1px solid #e9ecef;
      background: #ffffff;
      width: 300%;
      z-index: 10;
      button {
        width: 70px;
        height: 40px;
        padding: 0;
      }
      .bgColor {
        margin-left: 14px;
      }
      .bgColor:hover {
        opacity: 0.8;
      }

      .fontColor {
        color: #6a7076;
        border: 1px solid #d5dbe8;
        margin-left: 14px;
      }
      .fontColor:hover {
        color: #2890ff;
        border: 1px solid #2890ff;
      }
    }
  }

  .dialog-block {
    // 弹框样式
    /deep/.el-dialog {
      width: 580px;
      height: 252px;
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
        border-bottom: 2px solid #e9ecef;
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
        padding: 0 !important;
        .el-form {
          width: 100%;
          .task-container {
            padding: 41px 0px 0px 60px !important;
            width: 100%;
            .integral {
              display: flex;
              .select-input {
                width: 340px;
              }
              .el-form-item__content {
                margin-left: 0px !important;
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
        }
      }
    }
  }
}
</style>
