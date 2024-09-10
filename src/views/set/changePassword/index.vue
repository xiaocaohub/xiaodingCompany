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
        <el-form-item
          :label="$t('changePassword.ymm')"
          prop="original_password"
        >
          <el-input
            :placeholder="$t('changePassword.qsrymm')"
            show-password
            v-model="ruleForm.original_password"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('changePassword.xmm')" prop="new_password">
          <el-input
            @input="
              ruleForm.new_password = ruleForm.new_password.replace(/[\W]/g, '')
            "
            :placeholder="$t('changePassword.qsrxmm')"
            show-password
            v-model="ruleForm.new_password"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('changePassword.qrmm')" prop="sure_password">
          <el-input
            @input="
              ruleForm.sure_password = ruleForm.sure_password.replace(
                /[\W]/g,
                ''
              )
            "
            :placeholder="$t('changePassword.qzcsr')"
            show-password
            v-model="ruleForm.sure_password"
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
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { setPassword } from '@/api/set/changePassword'
export default {
  name: 'addBankCard',

  data () {
    var validatePass = (rule, value, callback) => {
      if (value == this.ruleForm.original_password) {
        callback(new Error(this.$t('changePassword.ymmhxmm')))
      } else {
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.new_password) {
        callback(new Error(this.$t('changePassword.lcsrb')))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        original_password: '',
        new_password: '',
        sure_password: ''
      },
      rules: {
        original_password: [
          {
            required: true,
            message: this.$t('changePassword.qsrymm'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: this.$t('changePassword.cd616'),
            trigger: 'blur'
          }
        ],
        new_password: [
          {
            required: true,
            message: this.$t('changePassword.qsrxmm'),
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: this.$t('changePassword.cd616'),
            trigger: 'blur'
          }
        ],
        sure_password: [
          {
            required: true,
            message: this.$t('changePassword.qzcsr'),
            trigger: 'blur'
          },
          { validator: validatePass2, trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: this.$t('changePassword.cd616'),
            trigger: 'blur'
          }
        ]
      }
    }
  },

  created () {},

  methods: {
    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          setPassword({
            api: 'mch.Mch.Set.SetPassword',
            pwdOld: this.ruleForm.original_password,
            pwd: this.ruleForm.new_password
          }).then(res => {
            console.log(res)
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.cg'),
                offset: 100
              })
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
    }
  }
}
</style>
