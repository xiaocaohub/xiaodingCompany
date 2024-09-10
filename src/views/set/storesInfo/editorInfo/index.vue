<template>
  <div class="container">
    <div class="store-info">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          class="goods-img"
          required
          :label="$t('storesInfo.dptx')"
          prop="headImg"
        >
          <l-upload
            :limit="1"
            v-model="ruleForm.headImg"
            :text="$t('storesInfo.jy120')"
          >
          </l-upload>
        </el-form-item>
        <el-form-item
          class="goods-img"
          required
          :label="$t('storesInfo.dplg')"
          prop="logo"
        >
          <l-upload
            :limit="1"
            v-model="ruleForm.logo"
            :text="$t('storesInfo.jy64')"
          >
          </l-upload>
        </el-form-item>
        <el-form-item
          class="goods-img"
          required
          :label="$t('storesInfo.dpxct')"
          prop="posterImg"
        >
          <l-upload
            :limit="1"
            v-model="ruleForm.posterImg"
            :text="$t('storesInfo.jy200')"
          >
          </l-upload>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.dpid')">
          <el-input
            class="inputs"
            disabled
            v-model="id"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.dpmc')" prop="store_name">
          <el-input
            class="inputs"
            maxlength="20"
            :placeholder="$t('storesInfo.qsrdpmc')"
            v-model="ruleForm.store_name"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="store_info" :label="$t('storesInfo.dpxx')">
          <el-input
            class="inputs"
            maxlength="50"
            type="textarea"
            :rows="2"
            :placeholder="$t('storesInfo.qsrdpxx')"
            v-model="ruleForm.store_info"
          >
          </el-input>
        </el-form-item>

        <!-- 选择店铺分类 -->
        <!-- <el-form-item
          class="store_info"
          :label="$t('storesInfo.dpfl')"
          prop="mac_choose_fl"
        >
          <el-select
            class="select-input"
            v-model="ruleForm.mac_choose_fl"
            :placeholder="$t('storesInfo.qxzdplx')"
          >
            <el-option
              v-for="(item, index) in choose_fl"
              :key="index"
              :label="item.name"
              :value="item.id"
              v-show="item.is_display"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item :label="$t('storesInfo.jyfw')" prop="business_scope">
          <el-input
            class="inputs"
            maxlength="20"
            :placeholder="$t('storesInfo.qsrjyfw')"
            v-model="ruleForm.business_scope"
          >
          </el-input>
        </el-form-item>
        <!-- 营业状态 -->
        <el-form-item
          class="activity-class"
          :label="$t('storesInfo.yyzt')"
          prop="business_status"
        >
          <el-radio-group v-model="ruleForm.business_status">
            <el-radio
              v-for="activity in businessStatusList"
              :label="activity.value"
              :key="activity.value"
              >{{ activity.name }}</el-radio
            >
          </el-radio-group>

          <!-- 营业状态为营业中-可选择时间 -->
          <div
            style="
              width: 36.25rem;
              padding: 15px 0 1px 20px;
              background-color: #f4f7f9;
            "
            v-if="ruleForm.business_status == 1"
          >
            <el-form-item
              :label="$t('storesInfo.yykssj')"
              prop="startTime"
              label-width="100"
            >
              <el-time-picker
                v-model="ruleForm.startTime"
                :placeholder="$t('DemoPage.yykssj')"
                value-format="HH:mm"
                format="HH:mm"
              >
              </el-time-picker>
            </el-form-item>
            <el-form-item
              :label="$t('storesInfo.yyjssj')"
              prop="endTime"
              label-width="100"
            >
              <el-time-picker
                v-model="ruleForm.endTime"
                :placeholder="$t('DemoPage.yyjssj')"
                value-format="HH:mm"
                format="HH:mm"
              >
              </el-time-picker>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.yhxm')" prop="user_name">
          <el-input
            class="inputs"
            disabled
            :placeholder="$t('storesInfo.qsryhxm')"
            v-model="ruleForm.user_name"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.sfzh')" prop="card_no">
          <el-input
            class="inputs"
            disabled
            :placeholder="$t('storesInfo.qsrsfzh')"
            v-model="ruleForm.card_no"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.lxdh')" prop="phone">
          <el-input
            class="inputs"
            :placeholder="$t('storesInfo.qsrlxdh')"
            v-model="ruleForm.phone"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          class="cascadeAddress"
          :label="$t('storesInfo.xzdq')"
          prop="sheng"
        >
          <div class="cascadeAddress-block">
            <el-select
              class="select-input"
              v-model="ruleForm.sheng"
              :placeholder="$t('storesInfo.sheng')"
            >
              <el-option
                v-for="(item, index) in shengList"
                :key="index"
                :label="item.g_CName"
                :value="item.g_CName"
              >
                <div @click="getShi(item.groupID)">{{ item.g_CName }}</div>
              </el-option>
            </el-select>
            <el-select
              class="select-input"
              v-model="ruleForm.shi"
              :placeholder="$t('storesInfo.shi')"
            >
              <el-option
                v-for="(item, index) in shiList"
                :key="index"
                :label="item.g_CName"
                :value="item.g_CName"
              >
                <div @click="getXian(item.groupID)">{{ item.g_CName }}</div>
              </el-option>
            </el-select>
            <el-select
              class="select-input"
              v-model="ruleForm.xian"
              :placeholder="$t('storesInfo.xian')"
            >
              <el-option
                v-for="(item, index) in xianList"
                :key="index"
                :label="item.g_CName"
                :value="item.g_CName"
              >
                <div>{{ item.g_CName }}</div>
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.lxzd')" prop="address">
          <el-input
            class="inputs"
            maxlength="20"
            :placeholder="$t('storesInfo.qsrlxdz')"
            v-model="ruleForm.address"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.sfzckp')">
          <el-switch
            v-model="ruleForm.isInvoice"
            :active-value="1"
            :inactive-value="0"
            active-color="#00ce6d"
            inactive-color="#d4dbe8"
          >
          </el-switch>
        </el-form-item>
        <div class="form-footer">
          <el-form-item>
            <el-button
              class="bgColor"
              type="primary"
              @click="submitForm('ruleForm')"
              >{{ $t('DemoPage.tableFromPage.save') }}</el-button
            >
            <el-button class="bdColor" @click="$router.go(-1)" plain>{{
              $t('DemoPage.tableFromPage.cancel')
            }}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { index, editorStore } from '@/api/set/storesInfo'
import cascade from '@/api/publics/cascade'
import { setStorage } from '@/utils/storage'
export default {
  name: 'editorInfo',

  data () {
    return {
      ruleForm: {
        logo: '',
        headImg: '',
        posterImg: '',
        store_name: '',
        store_info: '',
        business_scope: '',
        business_status: 1,
        user_name: '',
        card_no: '',
        phone: '',
        sheng: '',
        shi: '',
        xian: '',
        address: '',
        isInvoice: 1,
        mac_choose_fl: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        headImg: [
          {
            required: true,
            message: this.$t('storesInfo.qscdptx'),
            trigger: 'change'
          }
        ],
        logo: [
          {
            required: true,
            message: this.$t('storesInfo.qscdplg'),
            trigger: 'change'
          }
        ],
        posterImg: [
          {
            required: true,
            message: this.$t('storesInfo.qscdpxc'),
            trigger: 'change'
          }
        ],
        store_name: [
          {
            required: true,
            message: this.$t('storesInfo.qsrdpmc'),
            trigger: 'blur'
          }
        ],
        // store_info: [
        //   {
        //     required: true,
        //     message: this.$t("storesInfo.qsrdpxx"),
        //     trigger: "blur"
        //   }
        // ],
        mac_choose_fl: [
          {
            required: true,
            message: this.$t('storesInfo.qxzdplx'),
            trigger: 'change'
          }
        ],
        business_scope: [
          {
            required: true,
            message: this.$t('storesInfo.qsrjyfw'),
            trigger: 'blur'
          }
        ],
        business_status: [
          {
            required: true,
            message: this.$t('storesInfo.qxzyyzt'),
            trigger: 'change'
          }
        ],
        user_name: [
          {
            required: true,
            message: this.$t('storesInfo.qsryhxm'),
            trigger: 'blur'
          }
        ],
        startTime: [
          {
            required: true,
            message: this.$t('addStores.qsryykssj'),
            trigger: 'blur'
          }
        ],
        endTime: [
          {
            required: true,
            message: this.$t('addStores.qsryyjssj'),
            trigger: 'blur'
          }
        ],
        card_no: [
          {
            required: true,
            message: this.$t('storesInfo.qsrsfzh'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('storesInfo.qsrlxdh'),
            trigger: 'blur'
          }
        ],
        sheng: [
          {
            required: true,
            message: this.$t('storesInfo.qsrlxdz'),
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: this.$t('storesInfo.qsrlxdz'),
            trigger: 'blur'
          }
        ]
      },

      businessStatusList: [
        {
          value: 1,
          name: this.$t('storesInfo.yysj')
        },
        {
          value: 2,
          name: this.$t('storesInfo.dy')
        }
      ], //营业状态

      //省市级联集
      shengList: {},
      shiList: {},
      xianList: {},

      id: '',

      //店铺分类
      choose_fl: []
    }
  },

  created () {
    this.getMchFls()
    this.getSheng()
    this.index().then(res => {
      this.cascadeAddress()
    })
  },

  methods: {
    //获取店铺分类
    async getMchFls () {
      const res = await index({
        api: 'mch.Mch.Set.MchClassList'
      })
      console.log('店铺分类res', res)
      if (res.data.code == 200) {
        this.choose_fl = res.data.data.list
      } else {
        console.log(res.data.message)
      }
    },

    async index () {
      const res = await index({
        api: 'mch.Mch.Set.Index'
      })
      console.log(res)
      let info = res.data.data.res
      this.id = info.id
      this.ruleForm.logo = info.logo
      this.ruleForm.headImg = info.head_img
      this.ruleForm.posterImg = info.poster_img
      this.ruleForm.store_name = info.name
      this.ruleForm.store_info = info.shop_information
      this.ruleForm.business_scope = info.shop_range
      this.ruleForm.business_status = parseInt(info.is_open)
      this.ruleForm.user_name = info.realname
      this.ruleForm.card_no = info.iD_number
      this.ruleForm.phone = info.tel
      this.ruleForm.sheng = info.sheng
      this.ruleForm.shi = info.shi
      this.ruleForm.xian = info.xian
      this.ruleForm.address = info.address
      this.ruleForm.isInvoice = info.is_invoice
      this.ruleForm.mac_choose_fl = info.cid
      this.ruleForm.startTime = info.business_hours.split('~')[0]
      this.ruleForm.endTime = info.business_hours.split('~')[1]
    },
    // 获取省级
    async getSheng () {
      const res = await cascade.getSheng()
      this.shengList = res.data.data
    },

    // 获取市级
    async getShi (sid, flag) {
      const res = await cascade.getShi(sid)
      this.shiList = res.data.data
      if (!flag) {
        this.ruleForm.shi = ''
        this.ruleForm.xian = ''
      }
    },

    // 获取县级
    async getXian (sid, flag) {
      const res = await cascade.getXian(sid)
      this.xianList = res.data.data
      if (!flag) {
        this.ruleForm.xian = ''
      }
    },

    //省市级联回显
    async cascadeAddress () {
      //省市级联
      for (const sheng of this.shengList) {
        if (sheng.g_CName === this.ruleForm.sheng) {
          await this.getShi(sheng.groupID, true)
          for (const shi of this.shiList) {
            if (shi.g_CName === this.ruleForm.shi) {
              await this.getXian(shi.groupID, true)
              break
            }
          }
          break
        }
      }
    },

    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (!this.ruleForm.shi) {
            this.$message({
              type: 'error',
              message: this.$t('storesInfo.qxzs'),
              offset: 100
            })
            return
          } else if (!this.ruleForm.xian) {
            this.$message({
              type: 'error',
              message: this.$t('storesInfo.qxzx'),
              offset: 100
            })
            return
          }
          if (
            this.ruleForm.startTime === this.ruleForm.endTime &&
            this.ruleForm.business_status !== 2
          ) {
            this.$message({
              type: 'error',
              message: this.$t('storesInfo.sjtsy'),
              offset: 100
            })
            return
          }
          this.$store.commit('loading/SET_LOADING')
          editorStore({
            api: 'mch.Mch.Set.Edit',
            id: this.id,
            logo: this.ruleForm.logo,
            headImg: this.ruleForm.headImg,
            posterImg: this.ruleForm.posterImg,
            mchName: this.ruleForm.store_name,
            mchInfo: this.ruleForm.store_info,
            confines: this.ruleForm.business_scope,
            tel: this.ruleForm.phone,
            shen: this.ruleForm.sheng,
            shi: this.ruleForm.shi,
            xian: this.ruleForm.xian,
            address: this.ruleForm.address,
            isOpen: this.ruleForm.business_status,
            isInvoice: this.ruleForm.isInvoice,
            cid: this.ruleForm.mac_choose_fl,
            businessHours: `${this.ruleForm.startTime}~${this.ruleForm.endTime}`
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.bjcg'),
                offset: 100
              })
              setStorage('storeName', this.ruleForm.store_name)
              setStorage('head_img', this.ruleForm.headImg)
              setStorage('logo', this.ruleForm.logo)
              this.$store.commit('user/SET_HEADIMG', this.ruleForm.headImg)
              this.$store.commit('user/SET_LOGO', this.ruleForm.logo)
              this.$store.commit('user/SET_STORENAME', this.ruleForm.store_name)
              this.$store.commit('loading/SET_LOADING')
              this.$router.go(-1)
            } else {
              this.$store.commit('loading/SET_LOADING')
            }
          })
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
/deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 26.75rem;
}
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .store-info {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    padding-top: 40px;
    border-radius: 4px;
    .demo-ruleForm {
      // width: 60%;
    }
    /deep/.el-form {
      .el-form-item {
        margin-bottom: 20px;
      }
      .el-form-item__label {
        font-weight: normal;
      }
      .inputs {
        width: 580px;
      }
      .store_info {
        .el-textarea {
          height: 60px;
          textarea {
            height: 60px;
          }
        }
      }

      .cascadeAddress {
        .el-form-item__content {
          .cascadeAddress-block {
            .el-select {
              width: 188px;
              &:not(:first-child) {
                margin-left: 8px;
              }
              .el-input {
                width: 188px;
              }
              .el-input {
                width: 188px;
                input {
                  width: 188px;
                }
              }
            }
          }
        }
      }

      .form-footer {
        padding-bottom: 20px;
      }
    }
  }
}
</style>
