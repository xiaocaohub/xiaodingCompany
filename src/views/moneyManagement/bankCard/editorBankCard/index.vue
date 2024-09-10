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
        <el-form-item :label="$t('addBankCard.yhkh')" prop="bank_no">
          <el-input
            :placeholder="$t('addBankCard.qsrkh')"
            @keyup.native="ruleForm.bank_no = oninput2(ruleForm.bank_no)"
            v-model="ruleForm.bank_no"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('addBankCard.khyh')" prop="k_bank">
          <el-input
            :placeholder="$t('addBankCard.qsryh')"
            v-model="ruleForm.k_bank"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('addBankCard.khzh')" prop="kz_bank">
          <el-input
            :placeholder="$t('addBankCard.qsrzh')"
            v-model="ruleForm.kz_bank"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('addBankCard.khr')" prop="user">
          <el-input
            :placeholder="$t('addBankCard.qsrkhr')"
            v-model="ruleForm.user"
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
import { addBank, bankList } from '@/api/moneyManagement/bankCard'
export default {
  name: 'editorBankCard',
  data () {
    return {
      ruleForm: {
        bank_no: '',
        k_bank: '',
        kz_bank: '',
        user: ''
      },
      rules: {
        bank_no: [
          {
            required: true,
            message: this.$t('addBankCard.qsrkh'),
            trigger: 'blur'
          }
        ],
        k_bank: [
          {
            required: true,
            message: this.$t('addBankCard.qsryh'),
            trigger: 'blur'
          }
        ],
        kz_bank: [
          {
            required: true,
            message: this.$t('addBankCard.qsrzh'),
            trigger: 'blur'
          }
        ],
        user: [
          {
            required: true,
            message: this.$t('addBankCard.qsrkhr'),
            trigger: 'blur'
          },
          {
            validator: function(rule, value, callback) {
              if (/^[\u4e00-\u9fa5]+$/.test(value) == false) {
                callback(new Error("请输入合法的姓名"));
              } else {
                //校验通过
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    }
  },

  created () {
    this.bankList()
  },

  methods: {
    async bankList () {
      const res = await bankList({
        api: 'mch.Mch.Finance.BankList',
        pageNo: this.dictionaryNum,
        pageSize: this.total,
        id: this.$route.query.id
      })
      console.log(res)
      this.ruleForm.bank_no = res.data.data.list[0].Bank_card_number
      this.ruleForm.k_bank = res.data.data.list[0].Bank_name
      this.ruleForm.kz_bank = res.data.data.list[0].branch
      this.ruleForm.user = res.data.data.list[0].Cardholder
    },

    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          addBank({
            api: 'mch.Mch.Finance.AddBank',
            bankCardNumber: this.ruleForm.bank_no,
            bankName: this.ruleForm.k_bank,
            branchName: this.ruleForm.kz_bank,
            cardholder: this.ruleForm.user,
            id: this.$route.query.id,
            isDefault: this.$route.query.is_default
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.bjcg'),
                offset: 100
              })
              this.$router.go(-1)
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
