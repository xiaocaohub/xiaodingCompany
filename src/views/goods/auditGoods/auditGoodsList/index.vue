<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-cascader
            v-model="inputInfo.goodsClass"
            class="select-input"
            ref="myCascader"
            :placeholder="$t('auditGoods.auditGoodsList.qxzspfl')"
            :options="classList"
            :props="{ checkStrictly: true }"
            @change="changeProvinceCity"
            clearable
          >
          </el-cascader>
          <el-select
            class="select-input"
            v-model="inputInfo.brand"
            :placeholder="$t('auditGoods.auditGoodsList.qxzsppp')"
          >
            <el-option
              v-for="item in brandList"
              :key="item.brand_id"
              :label="item.brand_name"
              :value="item.brand_id"
            >
            </el-option>
          </el-select>
          <el-select
            class="select-input"
            v-model="inputInfo.state"
            :placeholder="$t('auditGoods.auditGoodsList.qxzspzt')"
          >
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-input
            class="input-name"
            @keyup.enter.native="demand"
            v-model="inputInfo.name"
            :placeholder="$t('auditGoods.auditGoodsList.qsrspmc')"
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
        v-if="detectionBtn(button_list, '批量撤销')"
        class="undo"
        icon="el-icon-back"
        type="primary"
        @click="allUndo"
        >{{ $t('auditGoods.auditGoodsList.plcx') }}</el-button
      >
      <el-button
        v-if="detectionBtn(button_list, '批量提交')"
        class="present"
        icon="el-icon-upload2"
        type="primary"
        @click="allPresent"
        >{{ $t('auditGoods.auditGoodsList.pltj') }}</el-button
      >
      <el-button
        v-if="detectionBtn(button_list, '批量删除')"
        class="fontColor"
        @click="delAll"
        :disabled="is_disabled"
        icon="el-icon-delete"
        >{{ $t('auditGoods.auditGoodsList.plsc') }}</el-button
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
        <el-table-column fixed="left" type="selection"> </el-table-column>
        <el-table-column
          prop="id"
          :label="$t('auditGoods.auditGoodsList.spbh')"
        >
        </el-table-column>
        <el-table-column
          prop="imgurl"
          :label="$t('auditGoods.auditGoodsList.sptp')"
        >
          <template slot-scope="scope">
            <img :src="scope.row.imgurl" alt="" @error="handleErrorImg" />
          </template>
        </el-table-column>
        <el-table-column
          prop="product_title"
          :label="$t('auditGoods.auditGoodsList.spbt')"
          width="244"
        >
          <template slot-scope="scope">
            <p class="product-title">{{ scope.row.product_title }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="pname"
          :label="$t('auditGoods.auditGoodsList.spfl')"
        >
        </el-table-column>
        <el-table-column
          prop="brand_name"
          :label="$t('auditGoods.auditGoodsList.pp')"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          :label="$t('auditGoods.auditGoodsList.jg')"
        >
        </el-table-column>
        <el-table-column prop="num" :label="$t('auditGoods.auditGoodsList.kc')">
        </el-table-column>
        <el-table-column :label="$t('auditGoods.auditGoodsList.spzt')">
          <template slot-scope="scope">
            <span
              class="status_name"
              :class="[scope.row.mch_status === 1 ? 'active' : 'actives']"
            >
              {{ getStatusName(scope.row.mch_status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="volume"
          :label="$t('auditGoods.auditGoodsList.xl')"
        >
        </el-table-column>
        <el-table-column
          prop="upper_shelf_time"
          :label="$t('auditGoods.auditGoodsList.tjsj')"
          width="200"
        >
          <template slot-scope="scope">
            <span></span>
            <span v-if="scope.row.add_date">{{
              scope.row.add_date | dateFormat
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mch_sort"
          :label="$t('physicalgoods.px')"
        >
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.mch_sort"
              @keyup.native="scope.row.mch_sort = oninput2(scope.row.mch_sort)"
              @change="Sort(scope.row, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('zdata.cz')" width="200">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <!-- v-if="detectionBtn(button_list, '批量删除')" -->
                <el-button
                  @click="Detail(scope.row)"
                  v-if="scope.row.mch_status === 1&&detectionBtn(button_list, '查看详情')"
                  >{{ $t('physicalgoods.ckxq') }}</el-button
                >
                <el-button
                  @click="undoAudit(scope.row)"
                  v-if="scope.row.mch_status === 1&&detectionBtn(button_list, '撤销审核')"
                  >{{ $t('auditGoods.auditGoodsList.cxsh') }}</el-button
                >
                <el-button
                  @click="audit(scope.row)"
                  v-if="scope.row.mch_status === 4&&detectionBtn(button_list, '提交审核')"
                  >{{ $t('auditGoods.auditGoodsList.tjsh') }}</el-button
                >
                <el-button
                  @click="dialogShow2(scope.row)"
                  v-if="scope.row.mch_status === 3&&detectionBtn(button_list, '查看原因')"
                  >{{ $t('auditGoods.auditGoodsList.ckyy') }}</el-button
                >
                <el-button
                  @click="Edit(scope.row)"
                  v-if="
                    (scope.row.mch_status === 4 || scope.row.mch_status === 3)&&(detectionBtn(button_list, '编辑')||detectionBtn(button_list, '编辑商品'))
                  "
                  >{{ $t('zdata.bj') }}</el-button
                >
              </div>
              <div class="OP-button-bottom">
                <el-button
                  @click="Delete(scope.row)"
                  v-if="
                    (scope.row.mch_status === 4 || scope.row.mch_status === 3)&&detectionBtn(button_list, '删除')
                  "
                  >{{ $t('zdata.sc') }}</el-button
                >
                <div
                  v-if="
                    scope.row.mch_status === 4 || scope.row.mch_status === 3
                  "
                  style="min-width: 82px; min-height: 24px; margin-left: 0.5rem"
                ></div>
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
        :title="$t('auditGoods.auditGoodsList.ckyy')"
        :visible.sync="dialogVisible2"
        :before-close="handleClose2"
      >
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          class="demo-ruleForm"
          label-width="90px"
        >
          <div class="task-container">
            <el-form-item
              class="integral"
              :label="$t('auditGoods.auditGoodsList.sbyy')"
              prop="reason"
            >
              <span>{{ ruleForm.reason }}</span>
            </el-form-item>
          </div>
          <div class="form-footer">
            <el-form-item>
              <el-button
                class="bdColor"
                type="primary"
                @click="handleClose2()"
                >{{ $t('zdata.ok') }}</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  index,
  delGoodsById,
  choiceClass,
  getCommoditySetup,
  submitAudit,
  editSort
} from '@/api/goods/goodsList'
import { mixinstest } from '@/mixins/index'
import ErrorImg from '@/assets/images/default_picture.png'
import { getStorage } from '@/utils/storage'

export default {
  name: 'auditGoods',
  mixins: [mixinstest],
  data () {
    return {
      button_list: [],
      activeName: 'fourth',
      classList: [],
      brandList: [],
      statusList: [
        {
          value: '5',
          label: this.$t('auditGoods.auditGoodsList.shz')
        },
        {
          value: '3',
          label: this.$t('auditGoods.auditGoodsList.shsb')
        },
        {
          value: '4',
          label: this.$t('auditGoods.auditGoodsList.dtj')
        }
      ],

      standUpDown: '商品上架',

      inputInfo: {
        goodsClass: '',
        brand: '',
        type: '',
        state: '',
        name: '',
        goodsId:""
      },

      type: '',
      value: true,
      is_disabled: true,
      idList: [],

      tableData: [],
      loading: true,

      // 弹框数据
      dialogVisible2: false,
      ruleForm: {
        reason: ''
      },

      // table高度
      tableHeight: null,

      classIds: [],

      showGoodsList: true,
      showOptionalGoods: true
    }
  },

  created () {
    // this.choiceClasss().then(() => {
    //   if(this.$route.params.inputInfo.goodsClass && this.$route.params.inputInfo.goodsClass.length > 1) {
    //     this.classIds = this.$route.params.inputInfo.goodsClass
    //     this.allClass(this.classList)
    //   }
    // })
    // if(this.$route.params.pageSize) {
    //   this.pagination.page = this.$route.params.dictionaryNum
    //   this.dictionaryNum = this.$route.params.dictionaryNum
    //   this.pageSize = this.$route.params.pageSize
    //   this.inputInfo = this.$route.params.inputInfo
    // }
    //
    if(this.$route.query.billId){
      this. inputInfo.goodsId = this.$route.query.billId
    }
    this.indexs()
    this.choiceClasss()
    // 获取按钮权限
    this.getButtonList()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  watch: {
    value () {
      this.isOpens()
    }
  },

  methods: {
    // 获取按钮权限
    getButtonList () {
      let routeList = getStorage('route')
      let list = routeList.filter(item => item.path == 'auditGoods')[0].children
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
    // 图片错误处理
    handleErrorImg (e) {
      console.log('图片报错了', e.target.src)
      e.target.src = ErrorImg
    },
    Detail (value) {
      this.$router.push({
        path: '/goods/goodslist/goodsDetails',
        query: {
          id: value.id,
          name: 'editor',
          signboard: 'trial', //待审详情
          classId: value.product_class
        }
      })
    },
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },
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
          level: obj.level,
          children: []
        })
      })
    },

    // 根据商品类别id获取商品品牌
    changeProvinceCity (value) {
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
              level: obj.level,
              children: []
            })
          })
        }
      })
    },

    // 加载所有分类
    async allClass (value) {
      for (let i = 0; i < value.length - 1; i++) {
        if (this.classIds.includes(value[i].value)) {
          choiceClass({
            api: 'mch.Mch.Goods.GetClass',
            classId: value[i].value
          }).then(res => {
            if (res.data.data.list.class_list.length !== 0) {
              this.brandList = res.data.data.list.brand_list
              res.data.data.list.class_list[0].forEach((item, index) => {
                let obj = item
                value[i].children.push({
                  value: obj.cid,
                  label: obj.pname,
                  index: index,
                  children: []
                })
              })

              this.allClass(value[i].children)
            }
          })
        } else {
          continue
        }
      }
    },

    async indexs () {
      const res = await index({
        api: 'mch.Mch.Goods.GetGoodsExamineInfo',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        // commodityType: 3,
        classId:
          this.inputInfo.goodsClass[this.inputInfo.goodsClass.length - 1],
        brandId: this.inputInfo.brand,
        examineStatus: this.inputInfo.state
          ? parseInt(this.inputInfo.state)
          : null,
        productTitle: this.inputInfo.name,
        goodsId:this.inputInfo.goodsId
      })
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
      this.$nextTick(function () {
        this.getHeight()
      })
    },
    //修改序号
    async Sort(row, index) {
      if (row.mch_sort)
        editSort({
          api: "mch.Mch.Goods.editSort",
          id: row.id,
          sort: row.mch_sort,
        }).then((res) => {
          if (res.data.code == "200") {
            this.indexs();
            this.$message({
              type: "success",
              message: this.$t("zdata.czcg"),
              offset: 102,
            });
          }
        });
    },
    reset () {
      ;(this.inputInfo.goodsClass = ''),
        (this.inputInfo.brand = ''),
        (this.inputInfo.type = ''),
        (this.inputInfo.state = ''),
        (this.inputInfo.name = '')
      this.brandList = []
    },

    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.indexs().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    allUndo () {
      if (!this.idList.length) {
        this.$message({
          type: 'error',
          message: this.$t('auditGoods.auditGoodsList.qxzshz'),
          offset: 100
        })
      } else {
        let ids = this.idList
          .map(item => {
            if (item.mch_status == 1) {
              return item.id
            }
          })
          .filter(item => {
            if (item) {
              return item
            }
          })
        if (ids.length) {
          submitAudit({
            api: 'mch.Mch.Goods.SubmitAudit',
            pIds: ids.join(',')
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.indexs()
              this.$message({
                type: 'success',
                message: this.$t('zdata.cg'),
                offset: 100
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('auditGoods.auditGoodsList.qxzshz'),
            offset: 100
          })
        }
      }
    },

    allPresent () {
      if (!this.idList.length) {
        this.$message({
          type: 'error',
          message: this.$t('auditGoods.auditGoodsList.qxzdtj'),
          offset: 100
        })
      } else {
        let ids = this.idList
          .map(item => {
            if (item.mch_status == 4) {
              return item.id
            }
          })
          .filter(item => {
            if (item) {
              return item
            }
          })
        console.log(ids)
        if (ids.length) {
          submitAudit({
            api: 'mch.Mch.Goods.SubmitAudit',
            pIds: ids.join(',')
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.indexs()
              this.$message({
                type: 'success',
                message: this.$t('zdata.tjiaocg'),
                offset: 100
              })
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('auditGoods.auditGoodsList.qxzdtj'),
            offset: 100
          })
        }
      }
    },

    undoAudit (value) {
      this.$confirm(
        this.$t('auditGoods.auditGoodsList.qrcx'),
        this.$t('zdata.ts'),
        {
          confirmButtonText: this.$t('zdata.ok'),
          cancelButtonText: this.$t('zdata.off'),
          type: 'warning'
        }
      )
        .then(() => {
          submitAudit({
            api: 'mch.Mch.Goods.SubmitAudit',
            pIds: value.id
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.indexs()
              this.$message({
                type: 'success',
                message: this.$t('zdata.cxcg'),
                offset: 100
              })
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消审核',
          //   offset: 100
          // });
        })
    },

    audit (value) {
      this.$confirm(
        this.$t('auditGoods.auditGoodsList.qrtj'),
        this.$t('zdata.ts'),
        {
          confirmButtonText: this.$t('zdata.ok'),
          cancelButtonText: this.$t('zdata.off'),
          type: 'warning'
        }
      )
        .then(() => {
          submitAudit({
            api: 'mch.Mch.Goods.SubmitAudit',
            pIds: value.id
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.indexs()
              this.$message({
                type: 'success',
                message: this.$t('zdata.tjiaocg'),
                offset: 102
              })
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消审核',
          //   offset: 100
          // });
        })
    },

    Edit (value) {
      this.$router.push({
        path: '/goods/auditGoods/editorGoods',
        query: {
          id: value.id,
          name: 'editor',
          status: value.status_name,
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          classId: value.product_class,
          inputInfo: this.inputInfo
        }
      })
    },

    Delete (value) {
      this.$confirm(
        this.$t('auditGoods.auditGoodsList.qrsc'),
        this.$t('zdata.ts'),
        {
          confirmButtonText: this.$t('zdata.ok'),
          cancelButtonText: this.$t('zdata.off'),
          type: 'warning'
        }
      )
        .then(() => {
          delGoodsById({
            api: 'mch.Mch.Goods.DelGoodsById',
            goodsIds: value.id
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.indexs()
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
      console.log(e)
      // this.dictionaryNum = 1
      // this.current_num = e
      this.pageSize = e
      this.indexs().then(() => {
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
      this.indexs().then(() => {
        this.current_num =
          this.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
      })
    },

    // 选框改变
    handleSelectionChange (val) {
      if (val.length == 0) {
        this.is_disabled = true
      } else {
        this.is_disabled = false
      }
      this.idList = val
      console.log(val)
    },

    // 批量删除
    delAll () {
      if (this.idList.length === 0) {
        this.$message({
          type: 'error',
          message: this.$t('auditGoods.auditGoodsList.qxzsp'),
          offset: 100
        })
      } else {
        this.$confirm(
          this.$t('auditGoods.auditGoodsList.sfsc'),
          this.$t('zdata.ts'),
          {
            confirmButtonText: this.$t('zdata.ok'),
            cancelButtonText: this.$t('zdata.off'),
            type: 'warning'
          }
        )
          .then(() => {
            let ids = this.idList.map(item => {
              return item.id
            })
            delGoodsById({
              api: 'mch.Mch.Goods.DelGoodsById',
              goodsIds: ids.join(',')
            }).then(res => {
              if (res.data.code == '200') {
                console.log(res)
                this.indexs()
                this.$message({
                  type: 'success',
                  message: this.$t('zdata.cg'),
                  offset: 100
                })
              }
            })
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });
          })
      }
    },

    getStatusName (value) {
      if (value == 1) {
        return this.$t('auditGoods.auditGoodsList.shz')
      } else if (value == 3) {
        return this.$t('auditGoods.auditGoodsList.shsb')
      } else {
        return this.$t('auditGoods.auditGoodsList.dtj')
      }
    },

    // 弹框方法
    dialogShow2 (value) {
      console.log(value)
      this.dialogVisible2 = true
      this.ruleForm.reason = value.refuse_reasons
    },

    handleClose2 (done) {
      this.dialogVisible2 = false
      this.ruleForm.reason = ''
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
        .select-input {
          margin-right: 10px;
          &:not(:first-child):not(:last-child) {
            width: 180px;
          }
        }
        .input-name {
          width: 300px;
          height: 40px;
          margin-right: 10px;
          input {
            width: 300px;
            height: 40px;
          }
        }
        .el-input__inner {
          height: 40px;
          line-height: 40px;
          border: 1px solid #d5dbe8;
        }
        .el-input__inner:hover {
          border: 1px solid #b2bcd4;
        }
        .el-input__inner:focus {
          border-color: #409eff;
        }
        .el-input__inner::-webkit-input-placeholder {
          color: #97a0b4;
        }
      }

      .btn-list {
        .bgColor {
          background-color: #2890ff;
        }
        .bgColor:hover {
          background-color: #70aff3;
        }
        .fontColor {
          color: #6a7076;
          border: 1px solid #d5dbe8;
          background-color: #fff;
        }
        .fontColor:hover {
          color: #2890ff;
          border: 1px solid #2890ff;
          background-color: #fff;
        }
        .export {
          position: absolute;
          right: 30px;
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
    .laiketui-shangjia:before {
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
      // padding: 0;
      border: none;
      &:hover {
        opacity: 0.8;
      }
      span {
        font-size: 14px;
      }
    }

    .undo {
      background-color: #28b6ff;
    }

    .present {
      background-color: #13ce66;
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
      .cell {
        .status_name {
          min-width: 60px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          display: inline-block;
          border-radius: 10px;
          font-size: 14px;
          color: #fff;
          &.active {
            background-color: #13ce66;
            color: #fff;
          }
          &.actives {
            background-color: #969da8;
            color: #fff;
          }
          &.actives3 {
            background-color: #ffffff;
            color: #ff453d;
          }
        }
        .product-title {
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
      }
      .cell {
        img {
          width: 60px;
          height: 60px;
        }
      }

      .cell {
        .el-input {
          width: 82px;
          input {
            width: 82px;
            text-align: center;
          }
        }
      }
    }

    /deep/.el-table {
      border-radius: 4px;
      .OP-button {
        .OP-button-top {
          display: flex;
          // justify-content: flex-start;
          justify-content: center;
          align-items: center;
          button {
            width: 82px;
            min-height: 24px;
            padding: 5px;
          }
        }
        .OP-button-bottom {
          display: flex;
          // justify-content: flex-start;
          justify-content: center;
          align-items: center;
          margin-top: 8px;
          button {
            width: 82px;
            min-height: 24px;
            padding: 5px;
          }
        }
      }
    }
  }

  .dialog-block {
    // 弹框样式
    /deep/.el-dialog {
      width: 580px;
      min-height: 252px;
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
        padding: 0 !important;
        .el-form {
          width: 100%;
          .task-container {
            padding: 40px 0px 40px 40px !important;
            width: 100%;
            .integral {
              display: flex;
              .el-form-item__content {
                width: 400px;
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
