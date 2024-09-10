<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-cascader
            v-model="inputInfo.goodsClass"
            class="select-input"
            ref="myCascader"
            :placeholder="$t('optionalGoods.qxzspfl')"
            :options="classList"
            :props="{ checkStrictly: true }"
            @change="changeProvinceCity"
            clearable
          >
          </el-cascader>
          <el-select
            class="select-input"
            v-model="inputInfo.brand"
            :placeholder="$t('optionalGoods.qxzsppp')"
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
            :placeholder="$t('optionalGoods.qxzspzt')"
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
            :placeholder="$t('optionalGoods.qsrspmc')"
          ></el-input>
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
            >{{ $t('DemoPage.tableExamplePage.export') }}</el-button
          >
        </div>
      </div>
    </div>
    <div class="jump-list">
      <el-button
        v-if="
          commodity_setup &&
          commodity_setup.length &&
          commodity_setup.includes('2') &&
          detectionBtn(button_list, '添加商品')
        "
        class="bgColor laiketui laiketui-add"
        type="primary"
        @click="releaseGoods"
        >{{ $t('optionalGoods.tjsp') }}</el-button
      >
      <el-button
        v-if="
          standUpDown == $t('optionalGoods.spsj') &&
          detectionBtn(button_list, '商品上下架')
        "
        class="shelves laiketui laiketui-shangjia"
        type="primary"
        @click="shelves"
        >{{ standUpDown }}</el-button
      >
      <el-button
        v-if="
          standUpDown == $t('optionalGoods.spxj') &&
          detectionBtn(button_list, '商品上下架')
        "
        class="shelves laiketui laiketui-xiajia"
        type="primary"
        @click="shelves"
        >{{ standUpDown }}</el-button
      >
      <el-button
        v-if="detectionBtn(button_list, '批量删除')"
        class="fontColor"
        @click="delAll"
        :disabled="is_disabled"
        icon="el-icon-delete"
        >{{ $t('optionalGoods.plsc') }}</el-button
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
        <el-table-column prop="id" :label="$t('physicalgoods.spbh')">
        </el-table-column>
        <el-table-column prop="imgurl" :label="$t('physicalgoods.sptp')">
          <template slot-scope="scope">
            <img :src="scope.row.imgurl" alt="" @error="handleErrorImg" />
          </template>
        </el-table-column>
        <el-table-column
          prop="product_title"
          :label="$t('physicalgoods.spbt')"
          width="244"
        >
          <template slot-scope="scope">
            <p class="product-title">{{ scope.row.product_title }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="pname" :label="$t('physicalgoods.spfl')">
        </el-table-column>
        <el-table-column prop="brand_name" :label="$t('physicalgoods.pp')">
        </el-table-column>
        <el-table-column prop="price" :label="$t('optionalGoods.jylsj')">
          <template slot-scope="scope">
            <span style="color: #ff453d" v-if="scope.row.price">{{
              scope.row.price.toFixed(2)
            }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="supplyPrice" :label="供货价">
          <template slot-scope="scope">
            <span style="color: #FF453D;" v-if="scope.row.supplyPrice">{{ scope.row.supplyPrice.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="supplier_name" :label="所属供应商">
        </el-table-column> -->
        <el-table-column prop="num" :label="$t('physicalgoods.kc')">
        </el-table-column>
        <el-table-column :label="$t('physicalgoods.spzt')">
          <template slot-scope="scope">
            <span
              class="status_name"
              :class="{
                actives: scope.row.status === 1 || scope.row.status === 3,
                active: scope.row.status === 2
              }"
            >
              {{ getStatusName(scope.row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="volume" :label="$t('physicalgoods.xl')">
        </el-table-column>
        <el-table-column
          prop="upper_shelf_time"
          :label="$t('physicalgoods.sjsj')"
          width="200"
        >
          <template slot-scope="scope">
            <span></span>
            <span v-if="scope.row.upper_shelf_time">{{
              scope.row.upper_shelf_time | dateFormat
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mch_sort" :label="$t('physicalgoods.px')">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.mch_sort"
              @keyup.native="scope.row.mch_sort = oninput2(scope.row.mch_sort)"
              @change="Sort(scope.row, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('zdata.cz')" width="240">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="standdown(scope.row)">
                  {{
                    scope.row.status === 2
                      ? $t('physicalgoods.xj')
                      : $t('physicalgoods.sj')
                  }}
                </el-button>
                <el-button @click="addInventory(scope.row)">{{
                  $t('physicalgoods.tjkc')
                }}</el-button>
              </div>
              <div class="OP-button-bottom">
                <el-button
                  @click="Details(scope.row)"
                  v-if="scope.row.status == 2"
                  >{{ $t('physicalgoods.ckxq') }}</el-button
                >
                <el-button @click="Edit(scope.row)" v-else>{{
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

    <el-dialog
      :title="$t('physicalgoods.tjkc')"
      class="dialog-size"
      :visible.sync="dialogVisible3"
      :before-close="handleClose3"
      width="920px"
    >
      <div class="meau-list">
        <div class="Table">
          <el-table
            :data="ProList"
            ref="multipleTable"
            style="width: 100%"
            height="350"
          >
            <el-table-column
              prop="attr"
              align="center"
              :label="$t('physicalgoods.gg')"
            >
            </el-table-column>
            <el-table-column
              prop="num"
              align="center"
              :label="$t('physicalgoods.spkc')"
            >
            </el-table-column>
            <el-table-column
              prop="min_inventory"
              align="center"
              :label="$t('physicalgoods.kcyj')"
            >
            </el-table-column>
            <el-table-column
              prop="upNums"
              align="center"
              :label="$t('physicalgoods.tjkc')"
            >
              <template slot-scope="scope">
                <el-input-number
                  type="number"
                  v-model="scope.row.upNums"
                  :precision="0"
                  :label="$t('physicalgoods.mswz')"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="bgColor" @click="handleClose3()">{{
          $t('zdata.off')
        }}</el-button>
        <el-button type="primary" @click="AddProconfirm">{{
          $t('zdata.ok')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  index,
  delGoodsById,
  goodsMovePosition,
  upperAndLowerShelves,
  isOpen,
  goodsByTop,
  choiceClass,
  getCommoditySetup,
  getAttrByGoodsId,
  editSort
} from '@/api/goods/goodsList'
import { exports } from '@/api/export/index'
import { mixinstest } from '@/mixins/index'
import $ from 'jquery'
import { getStorage } from '@/utils/storage'
import { getFreightInfo } from '@/api/goods/freightManagement'
import ErrorImg from '@/assets/images/default_picture.png'

export default {
  name: 'optionalGoods',
  mixins: [mixinstest],
  data () {
    return {
      button_list: [],
      activeName: 'third',
      classList: [],
      brandList: [],
      statusList: [
        {
          value: '1',
          label: this.$t('physicalgoods.dsj')
        },
        {
          value: '2',
          label: this.$t('physicalgoods.sj')
        },
        {
          value: '3',
          label: this.$t('physicalgoods.xj')
        }
      ],

      standUpDown: this.$t('optionalGoods.spsj'),

      inputInfo: {
        goodsClass: '',
        brand: '',
        type: '',
        state: '',
        name: ''
      },

      type: '',
      value: true,
      is_disabled: true,
      idList: [],

      tableData: [],
      loading: true,

      // 添加库存弹框数据
      dialogVisible3: false,
      ProList: [],
      id: '',

      // 弹框数据
      dialogVisible: false,

      // table高度
      tableHeight: null,

      classIds: [],

      goodsEditorBase: '',

      commodity_setup: [],
      freightList: [],
      is_Payment: true,
      isPromiseExamine:true,
    }
  },

  created () {
    // this.choiceClasss().then(() => {
    //   if(this.$route.params.inputInfo.goodsClass && this.$route.params.inputInfo.goodsClass.length > 1) {
    //     this.classIds = this.$route.params.inputInfo.goodsClass
    //     this.allClass(this.classList)
    //   }
    // })
    if (this.$route.params.pageSize) {
      this.pagination.page = this.$route.params.dictionaryNum
      this.dictionaryNum = this.$route.params.dictionaryNum
      this.pageSize = this.$route.params.pageSize
      // this.inputInfo = this.$route.params.inputInfo
    }
    this.indexs()
    this.choiceClasss()
    this.getBase()
    this.getCommoditySetups()
    // 运费模板
    this.handleGetFreightInfo()
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
      let list = routeList.filter(item => item.path == 'optional')[0].children
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
    // 获取运费列表
    async handleGetFreightInfo () {
      const res = await getFreightInfo({
        api: 'mch.Mch.Freight.Index',
        pageSize: 999
      })
      this.freightList = res.data.data.list
    },
    // 图片错误处理
    handleErrorImg (e) {
      console.log('图片报错了', e.target.src)
      e.target.src = ErrorImg
    },
    // 获取上传方式
    async getCommoditySetups () {
      const res = await getCommoditySetup({
        api: 'mch.Mch.Goods.GetCommoditySetup'
      })
      console.log(res)
      this.commodity_setup = res.data.data.commodity_setup
    },

    getBase () {
      if (process.env.NODE_ENV == 'development') {
        this.goodsEditorBase = process.env.VUE_APP_PROXY_API
      } else if (process.env.NODE_ENV == 'production') {
        this.goodsEditorBase = process.env.VUE_APP_PROXY_API
      }
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
      this.inputInfo.brand = ''
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
        api: 'mch.Mch.Goods.Index',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        commodityType: -2,
        cid: this.inputInfo.goodsClass[this.inputInfo.goodsClass.length - 1],
        brandId: this.inputInfo.brand,
        status: this.inputInfo.state ? parseInt(this.inputInfo.state) : null,
        productTitle: this.inputInfo.name
      })
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.is_Payment = res.data.data.is_Payment
      this.isPromiseExamine = res.data.data.isPromiseExamine
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
      this.$nextTick(function () {
        this.getHeight()
      })
    },
    //修改序号
    async Sort (row, index) {
      if (row.mch_sort)
        editSort({
          api: 'mch.Mch.Goods.editSort',
          id: row.id,
          sort: row.mch_sort
        }).then(res => {
          if (res.data.code == '200') {
            this.indexs()
            this.$message({
              type: 'success',
              message: this.$t('zdata.czcg'),
              offset: 102
            })
          }
        })
    },
    releaseGoods () {
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
      } else if (!this.isPromiseExamine) {
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
      }else if (this.freightList.length <= 0) {
        this.$confirm(
          this.$t('physicalgoods.wltishi'),
          this.$t('physicalgoods.ts'),
          {
            confirmButtonText: this.$t('physicalgoods.okk'),
            cancelButtonText: this.$t('physicalgoods.ccel'),
            type: 'warning'
          }
        )
          .then(() => {
            this.$router.push('/goods/freight/addtemplate')
          })
          .catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消继续添加模板'
            // });
          })
      } else {
        this.$router.push('/goods/optional/addGoods')
      }
    },

    // 是否线上下架商品
    async isOpens () {
      const res = await isOpen({
        api: 'admin.goods.isOpen'
      })
      console.log(res)
      this.indexs()
      this.$message({
        type: 'success',
        message: this.$t('zdata.cg'),
        offset: 102
      })
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

    Details (value) {
      this.$router.push({
        path: '/goods/goodslist/goodsDetails',
        query: {
          id: value.id,
          name: 'editor',
          classId: value.product_class,
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          toType: 'optionalGoods'
          // isZx: true
        }
      })
    },

    // 添加库存
    addInventory (value) {
      console.log(value)
      this.id = value.id
      this.dialogVisible3 = true
      getAttrByGoodsId({
        api: 'mch.Mch.Goods.GetAttrByGoodsId',
        goodsId: value.id
      }).then(res => {
        console.log(res)
        this.ProList = res.data.data.list
      })
    },

    handleClose3 () {
      this.dialogVisible3 = false
      this.id = ''
      this.ProList = []
    },
    checkEmpty (arr) {
      for (const item of arr) {
        if (!item.upNums) {
          return true
        }
      }
      return false
    },
    AddProconfirm () {
      let rule = this.checkEmpty(this.ProList)
      if (rule) {
        this.$message({
          type: 'error',
          message: this.$t('physicalgoods.qsrzjkcz'),
          offset: 102
        })
        return
      }
      let json = this.ProList.map(item => {
        return {
          id: item.id,
          addNum: item.upNums,
          pid: item.pid
        }
      })

      $.ajax({
        cache: true,
        type: 'POST',
        dataType: 'json',
        url: this.goodsEditorBase,
        data: {
          api: 'mch.Mch.Goods.AddStock',
          storeId: getStorage('rolesInfos').storeId,
          accessId: getStorage('token'),
          storeType: 7,
          stock: JSON.stringify(json)
        },
        async: true,
        success: res => {
          console.log(res)
          if (res.code == '200') {
            console.log(res)
            this.$message({
              type: 'success',
              message: this.$t('zdata.tjcg'),
              offset: 102
            })
            this.ProList = []
            this.indexs()
            this.dialogVisible3 = false
          } else {
            this.$message({
              message: res.message,
              type: 'error',
              offset: 102
            })
          }
        }
      })
    },

    Edit (value) {
      this.$router.push({
        path: '/goods/goodslist/releasephysical',
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
      this.$confirm(this.$t('optionalGoods.scsp'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
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
                offset: 102
              })
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

    moveUp (value) {
      if (value !== 0) {
        goodsMovePosition({
          api: 'admin.goods.goodsMovePosition',
          moveGoodsId: this.tableData[value - 1].id,
          goodsId: this.tableData[value].id
        }).then(res => {
          if (res.data.code == '200') {
            this.indexs()
            console.log(res)
            this.$message({
              type: 'success',
              message: this.$t('zdata.cg'),
              offset: 102
            })
          }
        })
      } else {
        goodsMovePosition({
          api: 'admin.goods.goodsMovePosition',
          moveGoodsId: this.tableData[value + 1].id,
          goodsId: this.tableData[value].id
        }).then(res => {
          if (res.data.code == '200') {
            this.indexs()
            console.log(res)
            this.$message({
              type: 'success',
              message: this.$t('zdata.cg'),
              offset: 102
            })
          }
        })
      }
    },

    placedTop (value) {
      goodsByTop({
        api: 'admin.goods.goodsByTop',
        goodsId: value.id
      }).then(res => {
        console.log(res)
        this.indexs()
        this.$message({
          type: 'success',
          message: this.$t('zdata.cg'),
          offset: 102
        })
      })
      console.log(value)
    },

    // 商品上下架
    standdown (value) {
      console.log(value)
      if (value.status === 2) {
        upperAndLowerShelves({
          api: 'mch.Mch.Goods.UpperAndLowerShelves',
          goodsIds: value.id,
          status: 0
        }).then(res => {
          if (res.data.code == '200') {
            console.log(res)
            this.indexs()
            this.$message({
              type: 'success',
              message: this.$t('physicalgoods.xjcg'),
              offset: 102
            })
          }
        })
      } else {
        upperAndLowerShelves({
          api: 'mch.Mch.Goods.UpperAndLowerShelves',
          goodsIds: value.id,
          status: 1
        }).then(res => {
          if (res.data.code == '200') {
            console.log(res)
            this.indexs()
            this.$message({
              type: 'success',
              message: this.$t('physicalgoods.sjcg'),
              offset: 102
            })
          }
        })
      }
    },

    // 批量上架
    shelves () {
      if (this.idList.length === 0) {
        this.$message({
          type: 'success',
          message: this.$t('optionalGoods.qxzsp'),
          offset: 102
        })
      } else {
        if (this.standUpDown == this.$t('optionalGoods.spxj')) {
          this.idList = this.idList.map(item => {
            return item.id
          })
          this.idList = this.idList.join(',')
          upperAndLowerShelves({
            api: 'mch.Mch.Goods.UpperAndLowerShelves',
            goodsIds: this.idList,
            status: 0
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.indexs()
              this.$message({
                type: 'success',
                message: this.$t('physicalgoods.xjcg'),
                offset: 102
              })
            }
          })
        } else {
          this.idList = this.idList.map(item => {
            return item.id
          })
          this.idList = this.idList.join(',')
          upperAndLowerShelves({
            api: 'mch.Mch.Goods.UpperAndLowerShelves',
            goodsIds: this.idList,
            status: 1
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.indexs()
              this.$message({
                type: 'success',
                message: this.$t('physicalgoods.sjcg'),
                offset: 102
              })
            }
          })
        }
      }
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
        this.standUpDown = this.$t('optionalGoods.spsj')
      } else {
        this.is_disabled = false
        let is_up = []
        val.map(item => {
          if (item.status_name == '待上架' || item.status_name == '下架') {
            this.standUpDown = this.$t('optionalGoods.spsj')
          } else {
            is_up.push(item)
          }
        })
        if (is_up.length == val.length) {
          this.standUpDown = this.$t('optionalGoods.spxj')
        }
      }
      this.idList = val
      console.log(val)
    },

    // 批量删除
    delAll () {
      if (this.idList.length === 0) {
        this.$message({
          type: 'error',
          message: this.$t('optionalGoods.qxzsp'),
          offset: 102
        })
      } else {
        this.$confirm(this.$t('optionalGoods.sfsc'), this.$t('zdata.ts'), {
          confirmButtonText: this.$t('zdata.ok'),
          cancelButtonText: this.$t('zdata.off'),
          type: 'warning'
        })
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
                  message: this.$t('zdata.sccg'),
                  offset: 102
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
      if (value === 1) {
        return this.$t('optionalGoods.dsj')
      } else if (value === 2) {
        return this.$t('optionalGoods.ysj')
      } else {
        return this.$t('optionalGoods.yxj')
      }
    },

    // 弹框方法
    dialogShow () {
      this.dialogVisible = true
    },

    handleClose (done) {
      this.dialogVisible = false
    },

    async exportPage () {
      await exports(
        {
          api: 'mch.Mch.Goods.Index',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          commodityType: -2,
          cid: this.inputInfo.goodsClass[this.inputInfo.goodsClass.length - 1],
          brandId: this.inputInfo.brand,
          status: this.inputInfo.state ? parseInt(this.inputInfo.state) : null,
          productTitle: this.inputInfo.name
        },
        'pagegoods'
      )
    },

    async exportAll () {
      console.log(this.total)
      await exports(
        {
          api: 'mch.Mch.Goods.Index',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          commodityType: -2
        },
        'allgoods'
      )
    },

    async exportQuery () {
      await exports(
        {
          api: 'mch.Mch.Goods.Index',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          commodityType: -2,
          cid: this.inputInfo.goodsClass[this.inputInfo.goodsClass.length - 1],
          brandId: this.inputInfo.brand,
          status: this.inputInfo.state ? parseInt(this.inputInfo.state) : null,
          productTitle: this.inputInfo.name
        },
        'querygoods'
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
    .laiketui-xiajia:before {
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

    .shelves {
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
          width: 58px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          display: inline-block;
          border-radius: 10px;
          font-size: 14px;
          color: #fff;
          &.active {
            background-color: #13ce66;
          }
          &.actives {
            background-color: #97a0b4;
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
          margin-bottom: 8px;
          display: flex;
          // justify-content: center;
        }
        .OP-button-bottom {
          display: flex;
          // justify-content: center;
          .laiketui-jinru:before {
            margin-right: 6px;
          }
          .laiketui-add:before {
            margin-right: 5px;
            font-size: 10px;
          }
          .laiketui-zhiding:before {
            margin-right: 5px;
            color: #888f9e;
            font-weight: 600;
          }
          .laiketui-shangjia:before,
          .laiketui-xiajia:before {
            position: relative;
            top: 2px;
          }
        }
        .el-button {
          width: 88px !important;
          border: 1px solid #d5dbe8;
          border-radius: 2px;
        }
      }
    }
  }

  /deep/.dialog-size {
    .el-dialog__footer {
      border-top: 1px solid #e9ecef;
      padding: 16px 20px !important;
    }

    .el-dialog__header {
      border-bottom: 1px solid #e9ecef;
    }

    .el-dialog__body {
      width: 100%;
      padding: 0px 20px !important;
      .meau-list {
        width: 100%;
        padding: 40px 0;
        .Table {
          .el-table {
            border: 1px solid #e9ecef;
            .el-table__body {
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
      }
    }

    .el-icon-close {
      color: #888f9e !important;
      font-size: 20px !important;
    }
  }
}
</style>
