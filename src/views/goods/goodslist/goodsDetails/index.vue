<template>
  <div class="container" id="hhhh">
    <el-form
      ref="ruleForm"
      class="form-search"
      :rules="rules"
      :model="ruleForm"
      label-width="auto"
    >
      <div class="basic-info">
        <div class="header">
          <span>{{ $t('releasephysical.jbxx') }}</span>
        </div>
        <div class="basic-block">
          <div class="basic-items">
            <el-form-item :label="$t('releasephysical.spbt')" prop="goodsTitle">
              <el-input
                disabled
                v-model="ruleForm.goodsTitle"
                :placeholder="$t('releasephysical.qsrspbt')"
              ></el-input>
            </el-form-item>

            <el-form-item :label="$t('releasephysical.fbt')" prop="subtitle">
              <el-input
                disabled
                v-model="ruleForm.subtitle"
                :placeholder="$t('releasephysical.qsrfbt')"
              ></el-input>
            </el-form-item>

            <el-form-item :label="$t('releasephysical.gjc')" prop="keywords">
              <el-input
                disabled
                v-model="ruleForm.keywords"
                :placeholder="$t('releasephysical.qsrspgjc')"
              ></el-input>
            </el-form-item>
          </div>
          <div class="basic-items">
            <el-form-item
              :label="$t('releasephysical.spfl')"
              class="goods-class"
              prop="goodsClass"
            >
              <el-cascader
                disabled
                v-model="ruleForm.goodsClass"
                class="select-input"
                ref="myCascader"
                :placeholder="$t('releasephysical.qsrspfl')"
                :options="classList"
                :props="{ checkStrictly: true }"
                @change="changeProvinceCity"
                clearable
              >
              </el-cascader>
              <!-- <el-button type="primary" @click="dialogShow1">{{$t('releasephysical.tjfl')}}</el-button> -->
            </el-form-item>

            <el-form-item
              class="goods-brand"
              :label="$t('releasephysical.sppp')"
              prop="goodsBrand"
            >
              <el-select
                disabled
                class="select-input"
                v-model="ruleForm.goodsBrand"
                :placeholder="$t('releasephysical.qxzsppp')"
              >
                <el-option
                  v-for="item in brandList"
                  :key="item.brand_id"
                  :label="item.brand_name"
                  :value="item.brand_id"
                >
                </el-option>
              </el-select>
              <!-- <el-button type="primary" @click="dialogShow2">{{$t('releasephysical.tjpp')}}</el-button> -->
            </el-form-item>

            <el-form-item :label="$t('releasephysical.zl')" prop="weight">
              <el-input
                disabled
                @keyup.native="ruleForm.weight = oninput(ruleForm.weight, 2)"
                v-model="ruleForm.weight"
                :placeholder="$t('releasephysical.qsrzl')"
              ></el-input>
            </el-form-item>
          </div>
          <el-form-item
            class="goods-img"
            required
            :label="$t('releasephysical.spfmt')"
            prop="goodsCover"
          >
            <l-upload
              disabled
              :limit="1"
              v-model="ruleForm.goodsCover"
              :text="$t('releasephysical.spfmtbz')"
            >
            </l-upload>
          </el-form-item>

          <el-form-item
            class="goods-img"
            required
            :label="$t('releasephysical.spzst')"
            prop="goodsShow"
          >
            <l-upload
              disabled
              :limit="ruleForm.goodsShow.length"
              :mainImg="true"
              v-model="ruleForm.goodsShow"
              :text="$t('releasephysical.spzxtbz')"
            >
            </l-upload>
          </el-form-item>
          <el-form-item :label="$t('releasephysical.zssp')">
            <div class="upload-box">
              <div class="avatar-uploader-box">
                <!-- 图片预览 -->
                <div
                  :key="index"
                  class="video-preview"
                  v-for="(item, index) in videoList"
                >
                  <!-- controls="controls" -->
                  <video
                    :src="item.url"
                    @mouseover.stop="item.isShowPopup = true"
                    class="avatar"
                  >
                    {{ $t('releasephysical.bzcspbf') }}
                  </video>
                  <!-- 显示查看和删除的按钮弹窗 -->
                  <div
                    @mouseleave="item.isShowPopup = false"
                    class="avatar-uploader-popup"
                    v-show="item.url && item.isShowPopup"
                  >
                    <i @click="previewVideo(item)" class="el-icon-view"></i>
                    <!-- <i @click="deleteVideo(index)" class="el-icon-delete"></i> -->
                  </div>
                </div>

                <!-- 方框样式 -->
                <el-upload
                  :action="actionUrl"
                  :auto-upload="false"
                  :on-change="handleAvatarChange"
                  :show-file-list="false"
                  class="avatar-uploader"
                  ref="avatarUploader"
                  v-show="this.videoList.length == 0"
                >
                  <span style="display: block" v-loading="videoLoading">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </span>
                </el-upload>

                <!-- 上传提示文字样式 -->
                <div class="upload-tip">
                  <slot>{{ $t('releasephysical.sptext') }}</slot>
                </div>
              </div>

              <!-- 查看大图 -->
              <el-dialog
                :visible.sync="dialogVisible_video"
                append-to-body
                center
                :title="$t('releasephysical.spck')"
                :before-close="handleClose"
              >
                <video
                  :src="videoSrc"
                  ref="video"
                  controls
                  alt
                  width="100%"
                  style="height: 500px"
                >
                  {{ $t('releasephysical.bzcspbf') }}
                </video>
              </el-dialog>
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="goods-attribute">
        <div class="header">
          <span>{{ $t('releasephysical.spsx') }}</span>
        </div>
        <div class="attribute-block">
          <div class="attribute-items">
            <el-form-item :label="$t('releasephysical.cbj')" prop="cbj">
              <el-input
                disabled
                v-model="ruleForm.cbj"
                @keyup.native="ruleForm.cbj = oninput(ruleForm.cbj, 2)"
                :placeholder="$t('releasephysical.qsrmrcbj')"
              ></el-input>
            </el-form-item>

            <el-form-item :label="$t('releasephysical.yj')" prop="yj">
              <el-input
                disabled
                v-model="ruleForm.yj"
                @keyup.native="ruleForm.yj = oninput(ruleForm.yj, 2)"
                :placeholder="$t('releasephysical.qsrmryj')"
              ></el-input>
            </el-form-item>

            <el-form-item :label="$t('releasephysical.sj')" prop="sj">
              <el-input
                disabled
                v-model="ruleForm.sj"
                @keyup.native="ruleForm.sj = oninput(ruleForm.sj, 2)"
                :placeholder="$t('releasephysical.qsrmrsj')"
              ></el-input>
            </el-form-item>
          </div>
          <div class="attribute-items">
            <el-form-item :label="$t('releasephysical.dw')" prop="unit">
              <el-select
                disabled
                class="select-input"
                v-model="ruleForm.unit"
                :placeholder="$t('releasephysical.qxzdw')"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.id"
                  :label="item.text"
                  :value="item.text"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              :label="$t('releasephysical.kc')"
              class="inventory"
              prop="kucun"
            >
              <el-input
                disabled
                @keyup.native="ruleForm.kucun = oninput2(ruleForm.kucun)"
                v-model="ruleForm.kucun"
                :placeholder="$t('releasephysical.qszmrkc')"
              >
              </el-input>
            </el-form-item>
            <el-form-item label=""> </el-form-item>
          </div>
          <!-- <el-form-item :label="$t('releasephysical.cpgg')" class="add-attribute" prop="attr">
            <el-button type="primary" @click="addAttr">{{$t('releasephysical.szsx')}}</el-button>
          </el-form-item> -->
          <div class="attribute-items">
            <el-form-item
              class="goods-img"
              style="pointer-events: none"
              required
              :label="$t('releasephysical.spsxtp')"
            >
              <l-upload :limit="1" v-model="ruleForm.attrImg" text="">
              </l-upload>
            </el-form-item>
          </div>
          <el-form-item
            class="attribute-table"
            :label="$t('releasephysical.szsx')"
          >
            <el-table
              v-if="strArr.length > 0"
              :data="strArr"
              ref="table"
              style="width: 90%"
              max-height="340"
            >
              <el-table-column
                v-for="(item, index) of attrTitle"
                :key="index"
                prop="attr_name"
                :label="item.attr_group_name"
                align="center"
                show-overflow-tooltip
                column-key="attr_name"
                :filters="filterTable[index]"
                :filter-method="filterHandler"
              >
                <template slot-scope="scope">
                  <div v-text="scope.row.attr_list[index].attr_name"></div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('releasephysical.cbj')"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      disabled
                      v-model="scope.row.cbj"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('releasephysical.yj')"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      disabled
                      v-model="scope.row.yj"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('releasephysical.sj')"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      disabled
                      v-model="scope.row.sj"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('releasephysical.kc')"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      disabled
                      v-model="scope.row.kucun"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="unit"
                :label="$t('releasephysical.dw')"
                align="center"
              >
              </el-table-column>
              <el-table-column
                :label="$t('releasephysical.txm')"
                align="center"
                width="200"
              >
                <template slot-scope="scope">
                  <div style="display: flex; align-items: center">
                    <el-input disabled v-model="scope.row.bar_code"></el-input>
                    <el-link
                      style="
                        white-space: nowrap;
                        margin-left: 10px;
                        color: #2890ff;
                      "
                      >{{ $t('releasephysical.sm') }}</el-link
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                :label="$t('releasephysical.sctp')"
                width="140"
              >
                <template slot-scope="scope">
                  <div @click="clickImage">
                    <l-upload
                      disabled
                      :limit="1"
                      :is_small_img="true"
                      v-model="scope.row.img"
                      text=""
                      :size="40"
                      :heightSize="40"
                    ></l-upload>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </div>

      <div class="goods-set">
        <div class="header">
          <span>{{ $t('releasephysical.spsz') }}</span>
        </div>
        <div class="set-block">
          <el-form-item
            class="inventory-warning"
            :label="$t('releasephysical.kcyj')"
            prop="inventoryWarning"
          >
            <el-input disabled v-model="ruleForm.inventoryWarning"></el-input>
          </el-form-item>

          <el-form-item
            class="freight-set"
            :label="$t('releasephysical.yfsz')"
            prop="freight"
          >
            <el-select
              disabled
              class="select-input"
              v-model="ruleForm.freight"
              :placeholder="$t('releasephysical.qxzyf')"
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

          <el-form-item :label="$t('releasephysical.xsbq')" prop="checkedLabel">
            <el-checkbox-group disabled v-model="ruleForm.checkedLabel">
              <el-checkbox
                v-for="label in labelList"
                :label="label.id"
                :key="label.id"
                >{{ label.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <!-- <el-form-item
            class="activity-class"
            :label="$t('releasephysical.zchd')"
            prop="checkedActivity"
          >
            <el-radio-group disabled v-model="ruleForm.checkedActivity">
              <el-radio
                :disabled="togdisable"
                v-for="activity in activityList"
                :label="activity.value"
                :key="activity.value"
                >{{ activity.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item> -->

          <el-form-item
            class="show-local2"
            :label="$t('releasephysical.qdxs')"
            prop="checked"
          >
            <!-- <el-checkbox-group disabled v-model="ruleForm.checked">
              <el-checkbox
                v-for="label in showAdrList"
                :label="label.value"
                :key="label.value"
                >{{ label.text }}</el-checkbox
              >
            </el-checkbox-group> -->
            <el-radio-group disabled v-model="ruleForm.checked">
              <el-radio v-for="label in showAdrList"
                :label="label.value"
                :key="label.value">{{ label.text }}</el-radio>
            </el-radio-group>
            <span class="show-font">{{ $t('releasephysical.rgbx') }}</span>
          </el-form-item>

          <el-form-item :label="$t('releasephysical.xnxl')" prop="virtualSales">
            <el-input
              disabled
              v-model="ruleForm.virtualSales"
              @keyup.native="
                ruleForm.virtualSales = oninput2(ruleForm.virtualSales)
              "
              placeholder="请设置商品的虚拟销量"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('releasephysical.pxh')">
            <el-input
              v-model="ruleForm.mch_sort"
              disabled
              @keyup.native="ruleForm.mch_sort = oninput2(ruleForm.mch_sort)"
            ></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="detail-container">
        <div class="header">
          <span>{{ $t('releasephysical.xxnr') }}</span>
        </div>
        <div class="detail-block">
          <el-form-item
            :label="$t('releasephysical.spsp')"
            style="margin-bottom: 0 !important"
          >
            <div class="upload-box">
              <div class="avatar-uploader-box">
                <div
                  :key="index"
                  class="video-preview"
                  v-for="(item, index) in videoList2"
                >
                  <video
                    :src="item.url"
                    @mouseover.stop="item.isShowPopup = true"
                    class="avatar"
                  >
                    {{ $t('releasephysical.bzcspbf') }}
                  </video>
                  <div
                    @mouseleave="item.isShowPopup = false"
                    class="avatar-uploader-popup"
                    v-show="item.url && item.isShowPopup"
                  >
                    <i @click="previewVideo2(item)" class="el-icon-view"></i>
                    <!-- <i @click="deleteVideo2(index)" class="el-icon-delete"></i> -->
                  </div>
                </div>
                <el-upload
                  :action="actionUrl"
                  :auto-upload="false"
                  :on-change="handleAvatarChange2"
                  :show-file-list="false"
                  class="avatar-uploader"
                  ref="avatarUploader2"
                  v-show="this.videoList2.length == 0"
                >
                  <span style="display: block" v-loading="videoLoading2">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </span>
                </el-upload>

                <div class="upload-tip">
                  <slot>{{ $t('releasephysical.sptext2') }}</slot>
                </div>
              </div>
              <el-dialog
                :visible.sync="dialogVisible_video2"
                append-to-body
                center
                :title="$t('releasephysical.spck')"
                :before-close="handleClose5"
              >
                <video
                  :src="videoSrc2"
                  ref="video"
                  controls
                  alt
                  width="100%"
                  style="height: 500px"
                >
                  {{ $t('releasephysical.bzcspbf') }}
                </video>
              </el-dialog>
            </div>
          </el-form-item>

          <!-- <el-form-item :label="$t('releasephysical.spxq')" prop="content" >
            <vue-editor
              disabled
              v-model="ruleForm.content"
              useCustomImageHandler
              @image-added="handleImageAdded"
              :readonly="true"
            ></vue-editor>
          </el-form-item> -->
          <el-form-item :label="$t('releasephysical.spjs')">
            <!-- <el-button class="add" type="primary"   :disabled="true"
              >{{ $t('releasephysical.tjjsa') }}</el-button
            > -->
            <div
              class="add_box"
              v-for="(item, index) in IntroList"
              :key="index"
            >
              <div class="delet-box">
                <span>{{ item.name }}</span>
                <!-- <el-button
                  icon="el-icon-delete"
                  type="text"
                  @click="delIntro(index)"
                  >{{ $t('releasephysical.sc') }}</el-button
                > -->
              </div>
              <el-form-item>
                <vue-editor
                  v-model="item.content"
                  :disabled="true"
                  useCustomImageHandler
                  @image-added="handleImageAdded"
                ></vue-editor>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
      </div>

      <!-- <div class="footer-button">
        <el-button plain class="footer-cancel fontColor" @click="$router.go(-1)">{{$t('zdata.off')}}</el-button>
        <el-button type="primary" class="footer-save bgColor mgleft" @click="submitForm('ruleForm')">{{$t('zdata.save')}}</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>
import $ from 'jquery'
import { VueEditor } from 'vue2-editor'
import {
  getGoodsActiveList,
  label,
  choiceClass,
  goodsUnit,
  getGoodsInfoById
} from '@/api/goods/goodsList'
import { getFreightInfo } from '@/api/goods/freightManagement'
import { dictionaryList } from '@/api/Platform/numerical'
import Config from '@/packages/apis/Config'
import { getStorage } from '@/utils/storage'
import axios from 'axios'
import loading from '@/store/modules/loading'
var attrFlag = true
export default {
  name: 'goodsDetails',

  components: {
    VueEditor
  },

  data () {
    return {
      signboard: 'common',
      IntroList: [],
      ruleForm: {
        // 基本信息
        goodsTitle: '',
        subtitle: '',
        keywords: '',
        goodsClass: '',
        goodsBrand: '',
        goodsCover: '',
        goodsShow: '',
        weight: '',
        // 商品属性
        cbj: '',
        yj: '',
        sj: '',
        unit: '',
        kucun: '',
        attr: '',
        attrImg: '',

        // 商品设置
        inventoryWarning: '',
        freight: '',
        checkedLabel: [],
        checkedActivity: 1,
        checked: '',
        virtualSales: '',
        mch_sort: '',

        // 详细内容
        content: ''
      },

      rules: {
        // 基本信息
        goodsTitle: [
          { required: true, message: '请输入商品标题', trigger: 'blur' }
        ],
        // subtitle: [
        //   { required: true, message: '请输入商品描述', trigger: 'blur' }
        // ],
        keywords: [
          { required: true, message: '请输入商品关键词', trigger: 'blur' }
        ],
        goodsClass: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ],
        goodsBrand: [
          { required: true, message: '请选择商品品牌', trigger: 'blur' }
        ],
        goodsCover: [
          { required: true, message: '请上传商品封面图', trigger: 'change' }
        ],
        goodsShow: [
          { required: true, message: '请上传商品展示图', trigger: 'change' }
        ],

        // 商品属性
        cbj: [
          {
            required: true,
            message: '请设置商品的默认成本价',
            trigger: 'blur'
          }
        ],
        yj: [
          { required: true, message: '请设置商品的默认原价', trigger: 'blur' }
        ],
        sj: [
          { required: true, message: '请设置商品的默认售价', trigger: 'blur' }
        ],
        unit: [{ required: true, message: '请选择单位', trigger: 'change' }],
        kucun: [
          { required: true, message: '请设置商品的默认库存', trigger: 'blur' }
        ],
        kucun: [{ required: true, message: '请设置商品属性', trigger: 'blur' }],
        attr: [
          { required: true, message: '请设置商品属性', trigger: 'change' }
        ],

        // 商品设置
        inventoryWarning: [
          { required: true, message: '请输入库存预警', trigger: 'blur' }
        ],
        freight: [
          { required: true, message: '请选择运费模板', trigger: 'change' }
        ],
        checkedActivity: [
          { required: true, message: '请选择支持活动类型', trigger: 'change' }
        ]
      },

      check_attr: [], // 编辑复制选中回显属性数据

      showAdrList: [], // 商品展示位置

      // 添加属性弹框数据
      imgArr: [],
      attrTitle: JSON.parse('[]', true), //可选规格数据
      strArr: JSON.parse('[]', true), //已选规格数据
      // strArr: [{"cbj":"11","yj":"1","sj":"1","unit":"根","kucun":"1","image":"https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1624863705554.jpg","bar_code":"","attr_list":[{"attr_id":"","attr_name":"银灰色","attr_group_name":"颜色"}],"cid":""}],
      unitList: [],

      // 商品分类列表
      classList: [],

      // 商品分类列表
      brandList: [],

      // 支持活动类型
      activityList: [],

      // 标签
      labelList: [],

      // 运费
      freightList: [],

      togdisable: false,

      actionUrl: Config.baseUrl,

      goodsEditorBase: '',
      storeIds: '',
      mchid: '',

      emptyAttr: false,

      classIds: [],
      videoList: [],
      videoList2: [],
      videoSrc: '',
      videoSrc2: '',
      dialogVisible_video: false,
      dialogVisible_video2: false,
      videoUp: '',
      videoUp2: '',
      videoLoading: false,
      videoLoading2: false
    }
  },

  created () {
    this.signboard = this.$route.query.signboard
      ? this.$route.query.signboard
      : 'common'
    this.getDictionaryList()
    this.getGoodsActiveLists()
    this.labels()
    this.classIds = this.$route.query.classId
      .split('-')
      .filter(item => {
        if (item !== '') {
          return item
        }
      })
      .map(item => {
        return parseInt(item)
      })
    this.choiceClasss().then(() => {
      if (this.$route.query.id) {
        this.allClass(this.classList)
      }
    })
    this.goodsUnits()
    if (
      this.$route.query.name == 'editor' &&
      this.$route.query.status !== '待上架'
    ) {
      this.togdisable = true
    }
    if (
      this.$route.query.name == 'editor' ||
      this.$route.query.name == 'copy'
    ) {
      getGoodsInfoById({
        api: 'mch.Mch.Goods.GetGoodsInfoById',
        goodsId: this.$route.query.id,
        isZx: this.$route.query.isZx ? true : null
      })
        .then(res => {
          if (this.$route.query.name == 'editor') {
            this.mchid = res.data.data.list.mch_id
          }
          let goodsAttribute = res.data.data.list
          // if(this.signboard=='common'){
          //   if(goodsAttribute.content){
          //     try {
          //       this.IntroList=JSON.parse(goodsAttribute.content)
          //     } catch (error) {
          //       this.IntroList=[]
          //     }
          //   }
          // }

          // 数据回显
          this.IntroList = JSON.parse(goodsAttribute.content)

          if (res.data.data.video) {
            this.videoList.push({
              videoFile: res.data.data.video,
              url: res.data.data.video,
              isShowPopup: false
            })
            this.videoUp = res.data.data.video
          }
          if (res.data.data.proVideo) {
            this.videoList2.push({
              videoFile: res.data.data.proVideo,
              url: res.data.data.proVideo,
              isShowPopup: false
            })
            this.videoUp2 = res.data.data.proVideo
          }
          this.ruleForm.goodsTitle = goodsAttribute.product_title
          this.ruleForm.subtitle = goodsAttribute.subtitle
          this.ruleForm.keywords = goodsAttribute.keyword
          this.ruleForm.weight = res.data.data.weight
          this.ruleForm.goodsClass = goodsAttribute.product_class
            .split('-')
            .filter(item => {
              if (item !== '') {
                return item
              }
            })
            .map(item => {
              return parseInt(item)
            })
          this.ruleForm.goodsBrand = goodsAttribute.brand_id
          this.ruleForm.goodsCover = res.data.data.cover_map
          this.ruleForm.goodsShow = res.data.data.imgurls
          this.ruleForm.inventoryWarning = parseInt(
            res.data.data.initial.stockWarn
          )
          if (res.data.data.freight_list1) {
            this.freightList.push(res.data.data.freight_list1)
          }
          this.ruleForm.freight = parseInt(goodsAttribute.freight)
          if (goodsAttribute.s_type) {
            if (goodsAttribute.s_type.length <= 1) {
              this.ruleForm.checkedLabel.push(parseInt(goodsAttribute.s_type))
            } else {
              this.ruleForm.checkedLabel = goodsAttribute.s_type
                .split(',')
                .map(item => {
                  return parseInt(item)
                })
            }
          }
          this.ruleForm.checkedLabel = this.ruleForm.checkedLabel.filter(
            item => {
              if (item) {
                return item
              }
            }
          )
          this.ruleForm.checkedActivity = parseInt(goodsAttribute.active)
          // this.ruleForm.checked = `${goodsAttribute.distributor_id}`
          // if (res.data.data.show_adr[0].status) {
          //   this.ruleForm.checked.push(res.data.data.show_adr[0].value)
          // }
          //禅道46076
          res.data.data.show_adr.forEach(item =>{
            if(item.status == true){
                // this.ruleForm.checked.push(item.value)
                this.ruleForm.checked = item.value.toString()

            }
          })
          this.ruleForm.virtualSales = goodsAttribute.volume
          this.ruleForm.content = goodsAttribute.content
          this.ruleForm.cbj = res.data.data.initial.cbj
          this.ruleForm.yj = res.data.data.initial.yj
          this.ruleForm.sj = res.data.data.initial.sj
          this.ruleForm.unit = res.data.data.initial.unit
          this.ruleForm.kucun = res.data.data.initial.kucun
          this.ruleForm.attrImg = res.data.data.initial.attrImg
          this.attrTitle = res.data.data.attr_group_list
          this.strArr = res.data.data.checked_attr_list
          // if(this.$route.query.name == 'copy') {
          //   this.strArr = this.strArr.map(item => {
          //     item.cid = ''
          //     return item
          //   })
          // }

          this.ruleForm.mch_sort = res.data.data.list.mch_sort
          choiceClass({
            api: 'mch.Mch.Goods.GetClass',
            classId: res.data.data.class_id
          }).then(res => {
            this.brandList = res.data.data.list.brand_list
          })

          this.check_attr = res.data.data.checked_attr_list.map(item => {
            return item.attr_list[0]
          })

          this.check_attr = this.check_attr.map(item => {
            return {
              label: item.attr_group_name + ':' + item.attr_name,
              name1: item.attr_group_name + ':' + item.attr_name,
              name: item.attr_group_name,
              sname: item.attr_name
            }
          })
        })
        .then(() => {
          this.getFreightInfos()
        })
    } else {
      this.togdisable = false
      this.getFreightInfos()
    }
  },

  mounted () {
    this.getBase()
    this.storeIds = getStorage('rolesInfos').storeId
  },

  beforeRouteLeave (to, from, next) {
    if (
      (to.name == 'physicalgoods' || to.name == 'optional') &&
      (this.$route.query.name == 'editor' || this.$route.query.name == 'copy')
    ) {
      to.params.dictionaryNum = this.$route.query.dictionaryNum
      to.params.pageSize = this.$route.query.pageSize
      to.params.inputInfo = this.$route.query.inputInfo
    }
    if (to.name == 'addGoods') {
      to.params.ChangeProList = this.$route.query.ChangeProList
    }
    next()
  },

  watch: {
    strArr: {
      handler (newName, oldName) {
        if (newName && newName.length > 0) {
          this.ruleForm.attr = 1
          if (this.strArr && this.strArr.length > 0) {
            this.ruleForm.attrImg = this.strArr[0].img
          }
          this.$refs.ruleForm.clearValidate('attr')
        } else {
          this.ruleForm.attr = ''
        }
        console.log(123)
      },
      deep: true,
      immediate: true
    },
    'ruleForm.cbj' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0 && oldVal) {
        this.strArr.filter(item => {
          item.cbj = val
        })
      }
    },

    'ruleForm.yj' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0 && oldVal) {
        this.strArr.filter(item => {
          item.yj = val
        })
      }
    },

    'ruleForm.sj' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0 && oldVal) {
        this.strArr.filter(item => {
          item.sj = val
        })
      }
    },

    'ruleForm.unit' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0 && oldVal) {
        this.strArr.filter(item => {
          item.unit = val
        })
      }
    },

    'ruleForm.kucun' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0 && oldVal) {
        this.strArr.filter(item => {
          item.kucun = val
        })
      }
    },

    checkAll () {
      if (this.checkAll === true) {
        this.checkedCities = this.cities
      }
    }
  },

  computed: {
    filterTable () {
      let arr = []
      if (this.attrTitle.length > 0) {
        this.attrTitle.filter((items, indexs) => {
          arr.push([])
          items.attr_list.filter(item => {
            arr[indexs].push({
              text: item.attr_name,
              value: item.attr_name
            })
          })
        })
      }
      return arr
    },

    uploadData () {
      {
        return {
          api: 'resources.file.uploadFiles',
          storeId: getStorage('laike_store_uaerInfo').storeId,
          groupId: -1,
          uploadType: 2,
          accessId: this.$store.getters.token
        }
      }
    }
  },

  methods: {
    beforeAvatarUpload (file) {
      return new Promise((resolve, reject) => {
        if (
          [
            'video/mp4',
            'video/webm',
            'video/flv',
            'video/avi',
            'video/wmv',
            'video/rmvb',
            'video/mov'
          ].indexOf(file.raw.type) == -1
        ) {
          return this.$message.warning(this.$t('releasephysical.qsczcdspgs'))
        }

        if (file.size / 1024 / 1024 > 100) {
          return this.$message.warning(this.$t('releasephysical.spdxbncg'))
        }
        resolve()
      })
    },
    // 上传改变
    async handleAvatarChange (file, fileList) {
      try {
        await this.beforeAvatarUpload(file)
        this.uploadImgApi(file)
      } catch (e) {
        this.$message.warning(JSON.stringify(e))
      }
    },
    // 上传改变
    async handleAvatarChange2 (file, fileList) {
      try {
        await this.beforeAvatarUpload(file)
        this.uploadImgApi2(file)
      } catch (e) {
        console.log('e', e)

        this.$message.warning(JSON.stringify(e))
      }
    },
    // 上传视频准备
    uploadImgApi (file) {
      this.videoLoading = true
      console.log('file', file)
      const videoSrc = URL.createObjectURL(file.raw)
      var formData = new FormData()
      formData.append('file', file.raw) //第一个file 后台接收的参数名
      axios({
        url: this.actionUrl, //上传路径
        method: 'POST',
        params: {
          api: 'resources.file.uploadFiles',
          storeId: getStorage('rolesInfos').storeId,
          groupId: -1,
          uploadType: 2,
          accessId: this.$store.getters.token
        },
        data: formData
      })
        .then(res => {
          this.videoList.push({
            videoFile: file,
            url: videoSrc,
            isShowPopup: false
          })
          this.videoUp = res.data.data.imgUrls[0]
          console.log('videoUp', this.videoUp)
          setTimeout(() => {
            this.videoLoading = false
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 上传视频准备
    uploadImgApi2 (file) {
      console.log('file', file)
      this.videoLoading2 = true
      const videoSrc = URL.createObjectURL(file.raw)
      var formData = new FormData()
      formData.append('file', file.raw) //第一个file 后台接收的参数名
      axios({
        url: this.actionUrl, //上传路径
        method: 'POST',
        params: {
          api: 'resources.file.uploadFiles',
          storeId: getStorage('rolesInfos').storeId,
          groupId: -1,
          uploadType: 2,
          accessId: this.$store.getters.token
        },
        data: formData
      })
        .then(res => {
          this.videoList2.push({
            videoFile: file,
            url: videoSrc,
            isShowPopup: false
          })
          this.videoUp2 = res.data.data.imgUrls[0]
          setTimeout(() => {
            this.videoLoading2 = false
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 预览视频
    previewVideo (data) {
      this.videoSrc = data.url
      this.dialogVisible_video = true
    },
    // 预览视频
    previewVideo2 (data) {
      this.videoSrc2 = data.url
      this.dialogVisible_video2 = true
    },
    // 删除视频
    deleteVideo (index) {
      this.videoList.splice(index, 1)
      this.videoUp = ''
    },
    // 删除视频
    deleteVideo2 (index) {
      this.videoList2.splice(index, 1)
      this.videoUp2 = ''
    },
    handleClose () {
      const video = document.getElementsByTagName('video')[1]
      if (!video.paused) {
        video.currentTime = 0
        video.pause()
      }
      this.dialogVisible_video = false
    },
    handleClose5 () {
      const video = document.getElementsByTagName('video')[1]
      if (!video.paused) {
        video.currentTime = 0
        video.pause()
      }
      this.dialogVisible_video2 = false
    },
    getBase () {
      if (process.env.NODE_ENV == 'development') {
        this.goodsEditorBase = process.env.VUE_APP_PROXY_API
      } else if (process.env.NODE_ENV == 'production') {
        this.goodsEditorBase = process.env.VUE_APP_PROXY_API
      }
    },

    async getDictionaryList () {
      const res = await dictionaryList({
        api: 'saas.dic.getDictionaryInfo',
        key: '商品展示位置'
      })

      console.log(res)
      this.showAdrList = res.data.data.list
    },

    // 加载所有分类
    async allClass (value) {
      for (let i = 0; i < value.length; i++) {
        if (this.classIds.includes(value[i].value)) {
          choiceClass({
            api: 'mch.Mch.Goods.GetClass',
            classId: value[i].value
          }).then(res => {
            if (res.data.data.list.class_list.length !== 0) {
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

    filterHandler (value, row) {
      let flag = row.attr_list.some(item => {
        return item.attr_name == value
      })
      return flag
    },

    clickImage () {
      $('.el-table__body-wrapper').css('height', '1000000')
      setTimeout(() => {
        $(document)
          .off()
          .on('click', function () {
            $('.el-table__body-wrapper').css('height', '265px')
          })
      }, 1000)
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
          children: []
        })
      })
    },

    // 根据商品类别id获取商品品牌
    changeProvinceCity (value) {
      this.ruleForm.goodsBrand = []
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

    // 获取支持活动类型
    async getGoodsActiveLists () {
      const res = await getGoodsActiveList({
        api: 'mch.Mch.Goods.GetGoodsActive'
      })
      this.activityList = res.data.data.filter(item => {
        if (item.status) {
          return item
        }
      })
    },

    // 获取商品标签
    async labels () {
      const res = await label({
        api: 'mch.Mch.Goods.GetGoodsLabel',
        pageSize: 9999
      })
      // this.labelList = res.data.data.list.splice(0,2)
      this.labelList = res.data.data.list
    },

    // 获取商品单位
    async goodsUnits () {
      const res = await goodsUnit({
        api: 'mch.Mch.Home.GetDictionaryInfo',
        pageSize: 20,
        key: '单位'
      })

      this.unitList = res.data.data.list
    },

    // 获取运费列表
    async getFreightInfos () {
      const res = await getFreightInfo({
        api: 'mch.Mch.Freight.Index',
        pageSize: 999
      })
      this.freightList = this.freightList.concat(res.data.data.list)
      console.log(this.freightList, 'this.freightList')
      if (!this.ruleForm.freight) {
        this.ruleForm.freight = this.freightList[0].id
      }
    },

    // 商品详情
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData()
      formData.append('file', file) //第一个file 后台接收的参数名
      axios({
        url: this.actionUrl, //上传路径
        method: 'POST',
        params: {
          api: 'resources.file.uploadFiles',
          storeId: getStorage('laike_store_uaerInfo').storeId,
          groupId: -1,
          uploadType: 2,
          accessId: this.$store.getters.token
        },
        data: formData
      })
        .then(result => {
          let url = result.data.data.imgUrls[0] // 返回给你的图片路径
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 添加属性弹框方法 //

    /* 添加属性 */
    addAttr () {
      var imgattr = $('.attr-table .file-input')
      let page = this
      page.imgArr = []
      for (var j = 0; j < imgattr.length; j++) {
        page.strArr[j].img = $(imgattr).eq(j).val()
      }

      page.imgArr = JSON.parse(JSON.stringify(page.strArr))

      page.imgArr.filter(items => {
        items.attrStr = ''

        items.attr_list.filter(item => {
          items.attrStr += ',' + item.attr_name
        })

        items.attrStr = items.attrStr.replace(',', '')
      })

      if (attrFlag) {
        var price1 = this.ruleForm.cbj //成本价
        var price2 = this.ruleForm.yj //原价
        var price3 = this.ruleForm.sj //售价
        var size = this.ruleForm.unit //单位
        var kucun = this.ruleForm.kucun //库存
        let that = this
        // if (!(price1 && price2 && price3 && size != 0 && kucun)) {
        //   this.$message({
        //     message: '请先完善商品价格、单位和库存！',
        //     type: 'error'
        //   })
        //   attrFlag = true
        //   return
        // }
        if ($('body', parent.document).find('#maskClass').length > 0) {
          $('body', parent.document).find('#maskClass').css('display', '')
          $('body', parent.document).find(
            '#maskClass iframe'
          )[0].contentWindow.app.filterText = ''
          $('body', parent.document).find(
            '#maskClass iframe'
          )[0].contentWindow.app.loadFlag = false
          if (this.emptyAttr) {
            $('body', parent.document).find(
              '#maskClass iframe'
            )[0].contentWindow.app.checkAll = []
          }
        } else {
          var str = `
						<div class="maskNew" id="maskClass" style="z-index: 9999;">
							<div style="width:724px;height:540px;background:rgba(255,255,255,1);border-radius:4px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
								<div style="display: flex;justify-content: space-between;align-items: center;height: 60px;box-sizing: border-box;padding-left: 20px;color: #414658;font-weight: bold;font-size: 16px;border-bottom: 2px solid #E9ECEF;">
									设置属性
									<a class="maskClose" href="javascript:void(0);" style="padding: 20px;"><img src="/bounced/img/gb.png"/></a>
								</div>
			
								<iframe ref="iframe" scrolling="yes" frameborder="0" src="/bounced/Choose.html" style="width: 100%;height: 410px"></iframe>
			
								<div style="height: 70px;box-sizing: border-box;border-top: 1px solid #E9ECEF;display: flex;align-items: center;justify-content: flex-end;">
									<a class="maskClose" href="javascript:;" style="width:112px; height:36px; border:1px solid rgba(40,144,255,1); border-radius:2px;display: flex;align-items: center;justify-content: center;color: #2890FF;margin-right: 10px;box-sizing: border-box;background-color: #FFFFFF;">取消</a>
									<a id="maskSave" href="javascript:;" style="width:112px;height:36px;background:rgba(40,144,255,1);border-radius:2px;display: flex;align-items: center;justify-content: center;color: #FEFEFE;margin-right: 20px;">确定</a>
								</div>
			
			
							</div>
						</div>
					`
          $('body', parent.document).append(str)
        }

        $('#maskSave')
          .unbind()
          .bind('click', function () {
            let checkAll = $('#maskClass iframe')[0].contentWindow.app.checkAll
            if (checkAll.length == 0) {
              that.$message({
                message: '请选择商品属性',
                type: 'error',
                customClass: 'zZindex'
              })
              return
            }
            console.log(888888888888888888)
            console.log($('#maskClass iframe')[0].contentWindow.app)

            $('#strArr').html(JSON.stringify(checkAll))
            // classDivAppend()
            let attrTitle = []
            // page.attrTitle

            checkAll.filter(items => {
              if (attrTitle.length == 0) {
                let obj = {
                  attr_group_name: items.name,
                  attr_list: [
                    {
                      attr_name: items.sname
                      // chooseMe: true,
                    }
                  ]
                  // isShow: false
                }
                attrTitle.push(obj)
              } else {
                let index = attrTitle.findIndex(item => {
                  return item.attr_group_name == items.name
                })

                if (index < 0) {
                  let obj = {
                    attr_group_name: items.name,
                    attr_list: [
                      {
                        attr_name: items.sname
                        // chooseMe: true,
                      }
                    ]
                    // isShow: false
                  }
                  attrTitle.push(obj)
                } else {
                  attrTitle[index].attr_list.push({
                    attr_name: items.sname
                    // chooseMe: true,
                  })
                }
              }
            })

            page.attrTitle = attrTitle
            var strArr = []

            var listX = 0
            for (var i = 0; i < attrTitle.length; i++) {
              var attr_list = attrTitle[i].attr_list
              if (listX == 0) {
                listX = attr_list.length
              } else {
                listX = attr_list.length > 0 ? attr_list.length * listX : listX
              }
            }

            for (var i = 0; i < listX; i++) {
              //如果strarr原本有数据
              if (page.strArr[i]) {
                strArr.push({
                  cbj: price1,
                  yj: price2,
                  sj: price3,
                  unit: size,
                  kucun: kucun,
                  img: page.strArr[i].image, //图片
                  bar_code: '', // 条形码
                  attr_list: [],
                  cid: page.strArr[i].cid
                })
              } else {
                //没有数据的时候新增商品属性值
                strArr.push({
                  cbj: price1,
                  yj: price2,
                  sj: price3,
                  unit: size,
                  kucun: kucun,
                  img: '', //图片
                  bar_code: '', // 条形码
                  attr_list: [],
                  cid: ''
                })
              }
            }

            var th_title = JSON.parse(JSON.stringify(attrTitle))

            digui(th_title, 0, listX)

            strArr.filter(items => {
              var attrStr = ''
              var attrStr1 = ''

              items.attr_list.filter(item => {
                attrStr += ',' + item.attr_name
              })

              let attr_list = items.attr_list

              attr_list.filter(item => {
                attrStr1 += ',' + item.attr_name
              })

              attrStr = attrStr.replace(',', '')
              attrStr1 = attrStr1.replace(',', '')

              page.imgArr.filter(its => {
                // debugger
                if (its.attrStr == attrStr) {
                  items.image = its.image
                }
              })
            })

            let newAttrTitle = []
            strArr[0].attr_list.filter(items => {
              attrTitle.filter(item => {
                if (items.attr_group_name == item.attr_group_name) {
                  newAttrTitle.push(item)
                }
              })
            })
            page.attrTitle = newAttrTitle

            page.strArr = []
            setTimeout(function () {
              page.strArr = strArr

              console.log(page.attrTitle)
              console.log(page.strArr)
            }, 5)

            function digui (th_title, i, _listX) {
              // 如果该循环的子项没有东西则停止递归
              if (!th_title[i]) {
                if (i < th_title.length - 1) {
                  th_title.splice(i, 1)
                  digui(th_title, i, _listX)
                  return
                }
                return
              }

              // 如果该项属性的没有属性值，则删除该项重新递归
              if (th_title[i].attr_list.length == 0) {
                th_title.splice(i, 1)
                digui(th_title, i, _listX)
                return
              }

              var xx = 0
              if (i == 0) {
                // 第一个规格属性的格式是白色白色白色,黑色黑色黑色
                for (var j = 0; j < th_title[i].attr_list.length; j++) {
                  var value = th_title[i].attr_list[j].attr_name
                  for (
                    var x = 0;
                    x < listX / th_title[i].attr_list.length;
                    x++
                  ) {
                    var name = th_title[i].attr_group_name
                    strArr[xx].attr_list.push({
                      attr_id: '',
                      attr_name: value,
                      attr_group_name: name
                    })
                    xx++
                  }
                }
              } else if (i < th_title.length - 1) {
                _listX = Math.round(_listX / th_title[i - 1].attr_list.length)
                // 外面这层循环代表当前属性在内循环完成之后进入新的循环,比如白色白色黑色黑色红色红色,完成之后再次白色白色黑色黑色红色红色循环,总行数除以前一个属性每个属性有多少行,得出总循环数
                for (var l = 0; l < listX / _listX; l++) {
                  for (var j = 0; j < th_title[i].attr_list.length; j++) {
                    var value = th_title[i].attr_list[j].attr_name
                    // 当前规格的前一个每个属性行数,除当前
                    for (
                      var x = 0;
                      x < _listX / th_title[i].attr_list.length;
                      x++
                    ) {
                      var name = th_title[i].attr_group_name
                      strArr[xx].attr_list.push({
                        attr_id: '',
                        attr_name: value,
                        attr_group_name: name
                      })
                      xx++
                    }
                  }
                }
              } else {
                // 后面的规格属性格式是x,l,xl x,l,xl循环
                for (var x = 0; x < listX / th_title[i].attr_list.length; x++) {
                  for (var j = 0; j < th_title[i].attr_list.length; j++) {
                    var value = th_title[i].attr_list[j].attr_name
                    var name = th_title[i].attr_group_name
                    strArr[xx].attr_list.push({
                      attr_id: '',
                      attr_name: value,
                      attr_group_name: name
                    })
                    xx++
                  }
                }
              }
              i++
              if (i < th_title.length) {
                digui(th_title, i, _listX)
              }
            }
            $('#maskClass').css('display', 'none')
          })

        $('body', parent.document)
          .find('.maskClose')
          .unbind()
          .bind('click', function () {
            $('body', parent.document).find('#maskClass').remove()
          })
        this.emptyAttr = false
      }
    },

    // 发布商品
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.ruleForm)
        console.log(this.strArr)
        if (valid) {
          try {
            var strList = []
            var attrList = []
            if(this.strArr.length <= 0){
              strList = [{"cbj":this.ruleForm.cbj,"yj":this.ruleForm.yj,"sj":this.ruleForm.sj,"unit":this.ruleForm.unit,"kucun":this.ruleForm.kucun,"img":this.ruleForm.attrImg,"bar_code":"","attr_list":[{"attr_id":"","attr_name":"默认","attr_group_name":"默认"}],"cid":""}]
            }else{
              strList = this.strArr
            }
            if(this.attrTitle.length <= 0){
              attrList = [{"attr_group_name":"默认","attr_list":[{"attr_name":"默认"}]}]
            }else{
              attrList = this.attrTitle
            }
            console.log(this.strArr)
            $.ajax({
              cache: true,
              type: 'POST',
              dataType: 'json',
              url: this.goodsEditorBase,
              data: {
                api: 'mch.Mch.Goods.AddGoods',
                storeId: getStorage('rolesInfos').storeId,
                accessId: getStorage('token'),
                storeType: 7,
                pId:
                  this.$route.query.name && this.$route.query.name !== 'copy'
                    ? this.$route.query.id
                    : null,
                // mch_id: this.$route.query.name && this.$route.query.name == 'copy' ? getStorage('laike_store_uaerInfo').mchId : null,
                // 基本信息
                productTitle: this.ruleForm.goodsTitle,
                subtitle: this.ruleForm.subtitle,
                keyword: this.ruleForm.keywords,
                productClassId:
                  this.ruleForm.goodsClass[this.ruleForm.goodsClass.length - 1],
                brandId: this.ruleForm.goodsBrand,
                coverMap: this.ruleForm.goodsCover,
                showImg: this.ruleForm.goodsShow.join(','),
                // 商品属性
                initial: `cbj=${this.ruleForm.cbj},yj=${this.ruleForm.yj},sj=${this.ruleForm.sj},kucun=${this.ruleForm.kucun},unit=${this.ruleForm.unit},stockWarn=${this.ruleForm.inventoryWarning},msrp=${this.ruleForm.sj},attrImg=${this.ruleForm.attrImg}`,
                attrGroup: JSON.stringify(attrList),
                attrArr: JSON.stringify(strList),
                // 商品设置
                stockWarn: this.ruleForm.inventoryWarning,
                freightId: this.ruleForm.freight,
                sType: this.ruleForm.checkedLabel.join(),
                active: parseInt(this.ruleForm.checkedActivity),
                displayPosition: this.ruleForm.checked
                  ? this.ruleForm.checked
                  : '3',
                volume: this.ruleForm.virtualSales,
                mchSort: this.ruleForm.mch_sort,
                // 产品内容
                content: this.ruleForm.content,
                unit: this.ruleForm.unit,
                video: this.videoUp,
                proVideo: this.videoUp2
              },
              async: true,
              success: res => {
                this.$store.commit('loading/SET_LOADING')
                console.log(res)
                if (res.code == '200') {
                  this.$message({
                    message: '成功',
                    type: 'success',
                    offset: 100
                  })
                  this.$router.go(-1)
                  this.$store.commit('loading/SET_LOADING')
                } else {
                  this.$store.commit('loading/SET_LOADING')
                  this.$message({
                    message: res.message,
                    type: 'error',
                    offset: 100
                  })
                }
              }
            })
          } catch (error) {
            this.$message({
              message: error.message,
              type: 'error',
              offset: 100
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  .upload-box {
    .avatar-uploader-box {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-bottom: 20px;
      min-width: 350px;
      .avatar-uploader {
        margin-right: 15px;
        pointer-events: none;
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover {
            border-color: #409eff;
          }
        }
        .avatar-uploader-icon {
          font-size: 1.25rem;
          color: #8c939d;
          width: 80px;
          height: 80px;
          text-align: center;
          border: 0.0625rem dashed #c0ccda;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-uploader-icon:hover {
          border: 0.0625rem dashed #409eef;
          cursor: pointer;
        }
      }
      .video-preview {
        position: relative;
        padding-right: 20px;
        .avatar {
          width: 80px;
          height: 80px;
          display: block;
          border-radius: 6px;
        }
        .avatar-uploader-popup {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          width: 80px;
          height: 80px;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #fff;
          font-size: 1.25rem;
          border-radius: 6px;
          transition: 3s;
          i {
            font-size: 1.25rem;
          }
        }
      }
      .upload-tip {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 400;
        color: #97a0b4;
      }
    }
  }
  /deep/.el-form {
    .header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e9ecef;
      padding-left: 20px;
      span {
        font-weight: 400;
        font-size: 16px;
        color: #414658;
      }
    }
    .el-input {
      width: 400px;
      height: 40px;
      input {
        width: 400px;
        height: 40px;
      }
    }
    .composite {
      input {
        width: 345px !important;
      }
    }

    .basic-info {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 4px;
      .basic-block {
        margin-top: 40px;
        padding: 0 20px 20px 20px;
        .goods-img {
          width: 100%;
          pointer-events: none;
          .img-item {
            margin-right: 15px !important;
          }
        }
        .basic-items {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          .el-form-item {
            width: 33.3%;
          }
        }
      }
    }

    .goods-attribute {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 4px;
      .attribute-block {
        margin-top: 40px;
        padding: 0 20px 20px 20px;
        .attribute-items {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          .el-form-item {
            width: 33.3%;
          }
        }
        .add-attribute {
          width: 100%;
          button {
            width: 96px;
            height: 38px;
            border: 1px solid #2890ff;
            border-radius: 4px;
            background-color: #fff;
            color: #2890ff;
            margin-left: 10px;
            margin: 0;
            padding: 0;
          }
        }
      }
    }

    .goods-set {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 4px;
      .set-block {
        margin-top: 40px;
        padding: 0 20px 20px 20px;
        .freight-set {
          button {
            width: 96px;
            height: 38px;
            border: 1px solid #2890ff;
            border-radius: 4px;
            background-color: #fff;
            color: #2890ff;
            margin-left: 8px !important;
            margin: 0;
            padding: 0;
          }
        }

        .activity-class {
          .el-checkbox__inner {
            border-radius: 50px;
          }
        }

        .show-local {
          .el-form-item__content {
            display: flex;
          }
          .show-font {
            color: #97a0b4;
            margin-left: 20px;
          }
        }
        .show-local2 {
          .el-form-item__content {
            display: flex;
            align-items: center
          }
          .show-font {
            color: #97a0b4;
            margin-left: 20px;
          }
        }
      }
    }

    .detail-container {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 4px;
      // pointer-events: none;
      .detail-block {
        margin-top: 40px;
        padding: 0 20px 70px 20px;
        background-color: #fff;
        border-radius: 0 0 4px 4px;
        .add_box {
          width: 1476px;
          height: 460px;
          padding: 10px 20px 20px 20px;
          background: #f4f7f9;
          border-radius: 4px;
          padding-bottom: 40px;
          margin-bottom: 16px;
          // margin-left: 26px;
          .ql-toolbar {
            pointer-events: none;
          }
        }
        .add {
          width: 96px;
          height: 38px;
          border: 1px solid #2890ff;
          border-radius: 4px;
          background-color: #fff;
          color: #2890ff;
          margin-left: 10px;
          margin: 0;
          padding: 0;
          margin-bottom: 16px;
        }
        .el-form-item {
          .quillWrapper {
            width: 1396px;
            height: 385px;
            background: #ffffff;
            .quillWrapper {
              .ql-container {
                height: 343px !important;
              }
            }
            .ql-container {
              height: 343px !important;
            }
          }
        }
      }
    }

    .el-form-item__label {
      font-weight: normal;
    }
  }

  /deep/.el-form-item__label {
    color: #414658;
  }
  /deep/.el-input__inner {
    border: 1px solid #d5dbe8;
  }
  /deep/.el-input__inner:hover {
    border: 1px solid #b2bcd4;
  }
  /deep/.el-input__inner:focus {
    border-color: #409eff;
  }
  /deep/.el-input__inner::-webkit-input-placeholder {
    color: #97a0b4;
  }

  .model {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 2000;
  }
}
</style>

<style>
.zZindex {
  z-index: 99999999 !important;
}
.maskNew {
  position: fixed;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: block;
}

/* 添加属性弹窗 */
.maskNew .mask-content {
  position: relative;
  background-color: #fff;
  display: flex !important;
  flex-direction: column;
  padding-top: 0;
  width: 680px;
  height: 510px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
}
.maskNew .mask-title {
  line-height: 58px;
  border-bottom: 2px solid #e9ecef;
  font-size: 16px;
  color: #414658;
  font-weight: bold;
  padding-left: 19px;
  margin-bottom: 0;
}
.maskNew .mask-content-data {
  padding: 40px 40px 0;
  overflow: hidden;
  flex: 1;
}
.maskNew .mask-content-data > div {
  display: flex;
}
.maskNew .shooser_attrDiv {
  width: 520px;
  height: 272px;
  background: #f4f7f9;
  margin-top: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.maskNew .shooser_attrDiv select {
  width: 240px;
  height: 36px;
  font-size: 14px;
  color: #414658 !important;
}
.maskNew .shooser_attrDiv > div,
#choose_attrDiv .custom_attr {
  display: flex;
  align-items: center;
}
.maskNew .shooser_attrDiv ul,
.shooser_attrDiv label {
  margin-bottom: 0;
}
.maskNew .shooser_attrDiv ul {
  width: 100%;
  max-height: 171px;
  position: absolute;
  background: #ffffff;
  border: 1px solid #d3dae3;
  border-top: 0;
  overflow-y: auto;
  background: #ffffff;
  z-index: 99;
}
.maskNew .shooser_attrDiv li {
  height: 34px;
}
.maskNew .shooser_attrDiv li:hover {
  background: #f4f7f9;
}
.maskNew .shooser_attrDiv li > label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.maskNew .attr_title {
  width: 90px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2890ff;
  border-radius: 2px;
  color: #2890ff;
  position: relative;
  margin: 20px 0;
  background: #ffffff;
}
.maskNew .attr_title img {
  position: absolute;
  right: 0;
  top: 0;
  width: 12px;
  height: 12px;
}
.maskNew .attr_content {
  display: flex;
  flex-wrap: wrap;
}
.maskNew .attr_content label {
  margin-right: 20px;
  margin-bottom: 10px;
}
.maskNew .custom_attrDiv .left_text {
  display: inline-block;
  width: 70px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.maskNew .custom_attrDiv input[type='text'] {
  padding-left: 10px;
}
.maskNew .custom_attrDiv a.addBtn,
.custom_attrDiv a.removeBtn {
  display: inline-block;
  width: 88px;
  height: 36px;
  box-sizing: border-box;
  line-height: 34px;
  text-align: center;
  margin-left: 10px;
}
.maskNew .custom_attrDiv a.addBtn {
  color: #2890ff;
  border: 1px solid #2890ff;
}
.maskNew .custom_attrDiv a.removeBtn {
  color: #828b97;
  border: 1px solid #828b97;
}
.maskNew .custom_attrVlue {
  flex-wrap: wrap;
}
.maskNew .custom_attr {
  display: flex;
}
.maskNew .custom_attrVlue a {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  background: #ffffff;
  color: #414658;
  border: 1px dashed #b2bcd1;
  margin-bottom: 10px;
  margin-right: 10px;
}
.maskNew .custom_attrVlue a img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}

.maskNew .mask-bottom {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e9ecef;
  margin-top: auto;
}
.maskNew .mask-bottom input[type='button'] {
  width: 112px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 16px 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}
.maskNew .mask-bottom input[type='button']:first-child {
  border: 1px solid #2890ff;
  color: #2890ff;
  margin-right: 10px;
  background: #ffffff;
}
.maskNew .mask-bottom input[type='button']:last-child {
  background: #2890ff;
  color: #ffffff;
  margin-right: 20px;
}

.maskNew .maskContent1 input[type='submit'] {
  width: 100px;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #008def;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  display: inline-block;
}

.maskNew .closeMaskBtn {
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background: #fff;
  color: #008def;
  border: 1px solid #008def;
  font-size: 16px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 10px;
}

.maskNew .closeA {
  position: absolute;
  right: 10px;
  top: 15px;
  width: 30px;
  height: 30px;
  color: #eee;
}

.maskNew .checkbox {
  position: relative;
  display: inline-block;
  color: #414658;
  font-size: 14px;
  line-height: 14px;
  padding-left: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.maskNew .checkbox i {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #b2bcd1;
  border-radius: 2px;
  box-sizing: border-box;
}
</style>

<style scoped lang="less">
/deep/.attribute-table {
  width: 100% !important;
  .el-table__header {
    thead {
      height: 50px !important;
      tr {
        height: 50px !important;
        th {
          height: 50px !important;
          padding: 0 !important;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          color: #414658;
        }
      }
    }
  }
  .el-form-item__content {
    width: 100%;
    margin-left: 0 !important;
    img {
      width: 40px;
      height: 40px;
    }
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: auto;
  }
  .el-table .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }
  .el-table--fit td.gutter,
  .el-table--fit th.gutter {
    border-right-width: 1px;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: auto;
  }
  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-y: auto;
  }
  .el-table thead {
    color: #414658;
    font-weight: 500;
  }
  .el-table thead.is-group th {
    background: #f4f7f9;
  }
  .el-table td,
  .el-table th {
    padding: 12px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: center;
  }

  .el-table {
    .el-input {
      text-align: center;
      width: 140px;
      input {
        width: 140px;
        text-align: center;
      }
    }
  }

  .el-table .l-upload {
    display: flex;
    justify-content: center;
  }

  .el-table th {
    background-color: #f4f7f9;
  }
}
</style>
