<template>
  <div class="container">
    <div class="add-bank">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item :label="$t('systemManagement.dymc')" prop="printName">
          <el-input
            v-model="ruleForm.printName"
            maxlength="30"
            :placeholder="$t('systemManagement.dymcts')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('systemManagement.dywz')" prop="printUrl">
          <el-input
            v-model="ruleForm.printUrl"
            maxlength="30"
            :placeholder="$t('systemManagement.dywzts')"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="cascadeAddress"
          :label="$t('systemManagement.dydzssx')"
          prop="sheng"
        >
          <div class="cascadeAddress-block">
            <el-select
              class="select-input"
              v-model="ruleForm.sheng"
              :placeholder="$t('addAdminUser.qxz')"
            >
              <el-option
                v-for="(item, index) in shengList"
                :key="index"
                :label="item.g_CName"
                :value="item.g_CName"
              >
                <div @click="getShi(item.groupID)">
                  {{ item.g_CName }}
                </div>
              </el-option>
            </el-select>
            <el-select
              class="select-input"
              v-model="ruleForm.shi"
              :placeholder="$t('addAdminUser.qxz')"
            >
              <el-option
                v-for="(item, index) in shiList"
                :key="index"
                :label="item.g_CName"
                :value="item.g_CName"
              >
                <div @click="getXian(item.groupID)">
                  {{ item.g_CName }}
                </div>
              </el-option>
            </el-select>
            <el-select
              class="select-input"
              v-model="ruleForm.xian"
              :placeholder="$t('addAdminUser.qxz')"
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
        <el-form-item :label="''" prop="address">
          <el-input
            v-model="ruleForm.address"
            maxlength="30"
            :placeholder="$t('systemManagement.dydzts')"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('systemManagement.dydh')" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            maxlength="30"
            :placeholder="$t('systemManagement.dydhts')"
          ></el-input>
          <div
            style="
              color: #97a0b4;
              font-size: 14px;
              height: 14px;
              margin-bottom: 18px;
            "
          >
            {{ $t('systemManagement.dypzts') }}
          </div>
        </el-form-item>
        <div class="form-footer">
          <el-form-item>
            <el-button
              class="bgColor"
              type="primary"
              @click="submitForm('ruleForm')"
              >{{ $t('DemoPage.tableFromPage.save') }}</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addStore } from '@/api/stores/storesList'
import cascade from '@/api/publics/cascade'
import { getPlotSet, editPlotSet } from '@/api/set/plot.js'
export default {
  name: 'Plot',
  data () {
    return {
      ruleForm: {
        sheng: '',
        shi: '',
        xian: '',
        address: '',
        printName: '',
        printUrl: '',
        phone: ''
      },
      //省市级联集
      shengList: [],
      shiList: [],
      xianList: [],
      rules: {
        printName: [
          {
            required: true,
            message: this.$t('systemManagement.dymcts'),
            trigger: 'blur'
          }
        ],
        printUrl: [
          {
            required: true,
            message: this.$t('systemManagement.dywzts'),
            trigger: 'blur'
          }
        ],
        sheng: [
          {
            required: true,
            message: this.$t('systemManagement.qsrs'),
            trigger: 'change'
          }
        ],
        shi: [
          {
            required: true,
            message: this.$t('systemManagement.qsrs'),
            trigger: 'change'
          }
        ],
        xian: [
          {
            required: true,
            message: this.$t('systemManagement.qsrs'),
            trigger: 'change'
          }
        ],
        address: [
          {
            required: true,
            message: this.$t('systemManagement.dydzts'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('systemManagement.dydhts'),
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created () {
    this.getSheng()
    this.handleGetplotSet()
  },

  methods: {
    isEmpty (data) {
      for (let [key, value] of entries(data)) {
        if (value !== null && value !== '' && value !== undefined) {
          return true
        } else {
          return false
        }
      }
    },

    // 获取打印设置
    async handleGetplotSet () {
      let { entries } = Object
      const res = await getPlotSet({ api: 'mch.Mch.Set.GetMchPrintSetup' })
      console.log('获取打印设施数据回显', res)
      if (res.data.code == 200) {
        // this.ruleForm = res.data.data.printSetupConfig;
        // change事件回显数据的时候，为null和undefind会触发一次校验
        for (let [key, value] of entries(res.data.data.printSetupConfig)) {
          if (value == null || value == undefined) {
            this.ruleForm[key] = ''
          } else {
            this.ruleForm[key] = value
          }
        }
        console.log('206206206206', this.ruleForm)
        this.cascadeAddress()
      }
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
          editPlotSet({
            api: 'mch.Mch.Set.SetMchPrintSetup',
            ...this.ruleForm
          }).then(res => {
            console.log(res)
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.cg'),
                offset: 100
              })
              this.handleGetplotSet()
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
