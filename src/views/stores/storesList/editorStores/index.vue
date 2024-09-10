<template>
  <div class="container">
    <div class="add-bank">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="110px"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('addStores.dpmc')" prop="store_name">
          <el-input
            :placeholder="$t('addStores.qsrdpmc')"
            v-model="ruleForm.store_name"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('addStores.lxdh')" prop="phone">
          <el-input
            :placeholder="$t('addStores.qsrlxdh')"
            v-model="ruleForm.phone"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item class="date" :label="$t('addStores.yysj')" prop="date">
          <el-time-picker
            is-range
            v-model="ruleForm.date"
            :range-separator="$t('DemoPage.zhi')"
            :start-placeholder="$t('DemoPage.ksrq')"
            :end-placeholder="$t('DemoPage.jsrq')"
            value-format="HH:mm">
          </el-time-picker>
        </el-form-item> -->
        <!-- 更替优化 -->
        <el-form-item
          class="startTime"
          :label="$t('DemoPage.yykssj')"
          prop="startTime"
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
          class="endTime"
          :label="$t('DemoPage.yyjssj')"
          prop="endTime"
        >
          <el-time-picker
            v-model="ruleForm.endTime"
            :placeholder="$t('DemoPage.yyjssj')"
            value-format="HH:mm"
            format="HH:mm"
          >
          </el-time-picker>
        </el-form-item>

        <!-- <el-form-item class="radio" :label="$t('DemoPage.yylable')" prop="radio">
          <el-radio-group v-model="ruleForm.radio">
            <el-radio :label="1">{{ $t("DemoPage.yyz") }}</el-radio>
            <el-radio :label="2">{{ $t("DemoPage.dayang") }}</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item
          class="cascadeAddress"
          :label="$t('addStores.xzdq')"
          prop="sheng"
        >
          <div class="cascadeAddress-block">
            <el-select
              class="select-input"
              v-model="ruleForm.sheng"
              :placeholder="$t('addStores.sheng')"
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
              :placeholder="$t('addStores.shi')"
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
              :placeholder="$t('addStores.xian')"
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
        <el-form-item :label="$t('addStores.xxdz')" prop="address">
          <el-input
            :placeholder="$t('addStores.qsrxxdz')"
            v-model="ruleForm.address"
          >
          </el-input>
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
import { addStore, index } from '@/api/stores/storesList'
import cascade from '@/api/publics/cascade'
export default {
  name: 'editorStores',

  data () {
    return {
      ruleForm: {
        store_name: '',
        phone: '',
        date: '',
        sheng: '',
        shi: '',
        xian: '',
        address: '',
        startTime: '',
        endTime: '',
        radio: 1
      },
      rules: {
        store_name: [
          {
            required: true,
            message: this.$t('addStores.qsrdpmc'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('addStores.qsrlxdh'),
            trigger: 'blur'
          },
          {
            pattern: /^((0\d{2,3}-\d{7,8})|(1[35847]\d{9}))$/,
            message: this.$t('addStores.qsrzq')
          }
        ],
        date: [
          {
            required: true,
            message: this.$t('addStores.qsryysj'),
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
        sheng: [
          {
            required: true,
            message: this.$t('addStores.qsrlxdz'),
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: this.$t('addStores.qsrxxdz'),
            trigger: 'blur'
          }
        ]
      },

      //省市级联集
      shengList: {},
      shiList: {},
      xianList: {}
    }
  },

  created () {
    this.getSheng()
    this.index().then(res => {
      this.cascadeAddress()
    })
  },

  methods: {
    async index () {
      const res = await index({
        api: 'mch.Mch.Store.Index',
        mchStoreId: this.$route.query.id
      })
      console.log(res)
      let info = res.data.data.list[0]
      this.ruleForm.store_name = info.name
      this.ruleForm.phone = info.mobile
      this.ruleForm.date = info.business_hours.split('~')
      this.ruleForm.startTime = info.business_hours.split('~')[0]
      this.ruleForm.endTime = info.business_hours.split('~')[1]
      this.ruleForm.sheng = info.sheng
      this.ruleForm.shi = info.shi
      this.ruleForm.xian = info.xian
      this.ruleForm.address = info.address
      console.log(info.business_hours.split('~'))
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
          if (this.ruleForm.store_name.length > 20) {
            this.$message({
              type: 'error',
              message: this.$t('addStores.mdmccd'),
              offset: 100
            })
            return
          }
          if (this.ruleForm.address.length > 20) {
            this.$message({
              type: 'error',
              message: this.$t('addStores.xxdzcd'),
              offset: 100
            })
            return
          }
          if (this.ruleForm.startTime === this.ruleForm.endTime) {
            this.$message({
              type: 'error',
              message: this.$t('addStores.sjtsy'),
              offset: 100
            })
            return
          }
          this.$store.commit('loading/SET_LOADING')
          addStore({
            api: 'mch.Mch.Store.AddStore',
            name: this.ruleForm.store_name,
            mobile: this.ruleForm.phone,
            // businessHours: `${this.ruleForm.date[0]}~${this.ruleForm.date[1]}`,
            businessHours: `${this.ruleForm.startTime}~${this.ruleForm.endTime}`,
            cityAll: `${this.ruleForm.sheng}-${this.ruleForm.shi}-${this.ruleForm.xian}`,
            address: this.ruleForm.address,
            id: this.$route.query.id
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: '编辑成功',
                offset: 100
              })
              this.$router.go(-1)
              this.$store.commit('loading/SET_LOADING')
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
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .add-bank {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    border-radius: 4px;
    /deep/.el-form {
      .el-form-item__label {
        font-weight: normal;
      }
      .el-input {
        width: 580px;
      }
      .el-date-editor {
        width: 580px;
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
    }
  }
}
</style>
