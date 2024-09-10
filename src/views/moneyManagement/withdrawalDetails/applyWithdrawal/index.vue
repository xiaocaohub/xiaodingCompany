<template>
  <div class="container">
    <div class="operation-prompt">
      <div class="logo">
        <img src="@/assets/imgs/czts.png" alt="" />
        <span>{{ $t('applyWithdrawal.txsm') }}</span>
      </div>
      <div class="prompt-content">
        <p>
          ① {{ $t('applyWithdrawal.dczxt') }}{{ min_charge
          }}{{ $t('applyWithdrawal.yzdyx') }}{{ max_charge
          }}{{ $t('applyWithdrawal.ytxsx') }}{{ service_charge }}%。
        </p>
        <p>② {{ $t('applyWithdrawal.txqts') }}</p>
      </div>
    </div>
    <div class="add-bank">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          class="Select"
          :label="$t('提现方式')"
        >
          <el-radio-group v-model="ruleForm.sellType">
            <el-radio :label="1">{{
              $t('微信零钱')
            }}</el-radio>
            <el-radio :label="2">{{
              $t('银行卡')
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 微信零钱 -->
        <el-form-item
          v-if="ruleForm.sellType==1"
          class="Select"
          :label="$t('微信')"
          prop="poundage"
        >
          <el-input
            disabled
            class="select-input-wx"
            :placeholder="$t('您还未绑定微信，请前往移动端绑定')"
            v-model="ruleForm.wx_name"
          >
          </el-input>
        </el-form-item>
        <!-- 选择银行卡 -->
        <el-form-item
          v-if="ruleForm.sellType==2"
          class="Select"
          :label="$t('applyWithdrawal.xzthk')"
          prop="bank"
        >
          <el-select
            class="select-input"
            v-model="ruleForm.bank"
            :placeholder="$t('applyWithdrawal.qxzthk')"
          >
            <el-option
              v-for="item in bankList"
              :key="item.id"
              :label="item.banks_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button
            class="add-bankCard"
            type="primary"
            @click="$router.push('/moneyManagement/bankCard/addBankCard')"
            >{{ $t('applyWithdrawal.tjyhk') }}</el-button
          >
        </el-form-item>
        <!-- 提现金额 -->
        <el-form-item
          class="Select input-withdrawal"
          :label="$t('applyWithdrawal.txje')"
          prop="withdrawal"
        >
          <el-input
            :placeholder="$t('applyWithdrawal.qsrtx')"
            v-model="ruleForm.withdrawal"
            @keyup.native="
              ruleForm.withdrawal = oninput(ruleForm.withdrawal, 2)
            "
          >
            <template slot="append">{{ $t('zdata.yuan') }}</template>
          </el-input>
        </el-form-item>
        <!-- 手续费 -->
        <el-form-item
          class="Select input-poundage"
          :label="$t('applyWithdrawal.sxf')"
          prop="poundage"
        >
          <el-input
            disabled
            :placeholder="$t('applyWithdrawal.qsrsxf')"
            v-model="ruleForm.poundage"
          >
            <template slot="append">{{ $t('zdata.yuan') }}</template>
          </el-input>
        </el-form-item>
        <!-- 手机号 -->
        <el-form-item
          v-if="ruleForm.sellType==2"
          class="Select"
          :label="$t('applyWithdrawal.sjhm')"
          prop="phone"
        >
          <el-input
            disabled
            :placeholder="$t('applyWithdrawal.qsrsj')"
            v-model="ruleForm.phone"
          >
          </el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item
          v-if="ruleForm.sellType==2"
          class="Select get-code"
          :label="$t('applyWithdrawal.yzm')"
          prop="code"
        >
          <el-input
            :placeholder="$t('applyWithdrawal.qsryzm')"
            v-model="ruleForm.code"
          >
            <template v-if="countdownShow" slot="append"
              ><span class="getcode" @click="startCountdown">{{
                $t('applyWithdrawal.hqyzm')
              }}</span></template
            >
            <template v-else slot="append"
              >{{ countdown
              }}<span>{{ $t('applyWithdrawal.mhcxhq') }}</span></template
            >
          </el-input>
        </el-form-item>
        <!-- 保存/取消 -->
        <div class="form-footer">
          <el-form-item>
            <el-button
              class="bgColor"
              type="primary"
              @click="_submitForm('ruleForm')"
              >{{ $t('DemoPage.tableFromPage.save') }}</el-button
            >
            <el-button class="bdColor" @click="$router.go(-1)" plain>{{
              $t('DemoPage.tableFromPage.cancel')
            }}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 弹框组件 -->
    <div class="dialog-block">
      <el-dialog
        :title="adTitle"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" class="demo-ruleForm">
          <el-form-item :label="$t('真实姓名')" prop="zsName">
            <el-input v-model="ruleForm.zsName" :placeholder="$t('请输入真实姓名')"></el-input>
          </el-form-item>
          <div class="form-footer">
            <el-form-item>
              <el-button class="bgColor" @click="handleClose">{{$t('zdata.off')}}</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('zdata.ok')}}</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  withdrawals,
  withdrawPage,
  withdrawalsSms
} from '@/api/moneyManagement/withdrawalDetails'
export default {
  name: 'applyWithdrawal',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value < this.min_charge) {
        callback(new Error('输入金额不能小于最小提现金额!'))
      } else if (value > this.$route.query.money) {
        callback(new Error('输入金额不能大于最大提现金额!'))
      } else if (value > this.max_charge) {
        callback(new Error('输入金额不能大于最大提现额度!'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,//身份校验弹窗
      adTitle: '身份校验',//身份校验弹窗 标题
      ruleForm: {
        sellType: 1,//1微信零钱 2银行卡
        wx_name: '',//已绑定的微信名称
        wx_withdraw: false,//是否绑定微信
        zsName: '',//微信提现>=2000，需要身份校验，填写真实姓名。
        bank: '',
        withdrawal: '',
        poundage: '0.00',
        phone: '',
        code: ''
      },
      rules: {
        zsName: [
          {
            required: true,
            message: this.$t('请输入真实姓名'),
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        bank: [
          {
            required: true,
            message: this.$t('applyWithdrawal.xzthk'),
            trigger: 'change'
          }
        ],
        withdrawal: [
          {
            required: true,
            message: this.$t('applyWithdrawal.qsrtx'),
            trigger: 'blur'
          },
          { validator: validatePass, trigger: 'blur' }
        ],
        poundage: [
          {
            required: true,
            message: this.$t('applyWithdrawal.qsrsxf'),
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('applyWithdrawal.qsrsj'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: this.$t('applyWithdrawal.qsryzm'),
            trigger: 'blur'
          }
        ],
      },
      bankList: [],
      min_charge: '',
      max_charge: '',
      service_charge: '',

      countdown: 60,
      countdownShow: true
    }
  },

  created () {
    this.withdrawPage()
  },

  watch: {
    'ruleForm.withdrawal': {
      handler () {
        this.ruleForm.poundage = (
          (this.ruleForm.withdrawal * this.service_charge) /
          100
        ).toFixed(2)
      }
    }
  },

  methods: {
    handleClose(){
      this.dialogVisible = false
    },

    async withdrawPage () {
      const res = await withdrawPage({
        api: 'mch.Mch.Finance.WithdrawPage'
      })
      console.log(res)
      this.bankList = res.data.data.list.map(item => {
        return {
          ...item,
          banks_name: `${item.Bank_name}  尾号：${item.Bank_card_number}`
        }
      })
      // this.ruleForm.poundage = res.data.data.service_charge
      this.ruleForm.wx_withdraw = res.data.data.wx_withdraw
      this.ruleForm.wx_name = res.data.data.wx_name
      this.ruleForm.phone = res.data.data.tel
      this.min_charge = res.data.data.min_charge
      this.max_charge = res.data.data.max_charge
      this.service_charge = res.data.data.service_charge
    },

    startCountdown () {
      if (this.ruleForm.phone) {
        withdrawalsSms({
          api: 'mch.Mch.Finance.WithdrawalsSms'
        }).then(res => {
          console.log(res)
          if (res.data.data) {
            this.countdownShow = !this.countdownShow
            var timer = setInterval(() => {
              if (this.countdown == 1) {
                this.countdownShow = true
                this.countdown = 60
                clearTimeout(timer)
                return
              }
              this.countdown--
            }, 1000)
          } else {
            // this.$message.error('请填写正确的手机号')
          }
        })
      } else {
        // this.$message.error(this.$t('applyWithdrawal.qsrsj') )
        return
      }
    },
    _submitForm(){
      if(this.ruleForm.sellType==1){
        if(this.ruleForm.withdrawal>=2000){
          this.dialogVisible = true
        } else {
          this.submitForm('ruleForm')
        }
      } else if(this.ruleForm.sellType==2){
        this.submitForm('ruleForm')
      }
    },
    submitForm () {
      this.handleClose()
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.commit('loading/SET_LOADING')
          withdrawals({
            api: 'mch.Mch.Finance.Withdrawals',
            bankId: this.ruleForm.bank,
            amoney: this.ruleForm.withdrawal,
            mobile: this.ruleForm.phone,
            keyCode: this.ruleForm.code,
            withdrawStatus: this.ruleForm.sellType==1?2:1,//1银行卡 2微信余额
            userName: this.ruleForm.zsName,
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.txcg'),
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
    },

    oninput (num, limit) {
      var str = num
      var len1 = str.substr(0, 1)
      var len2 = str.substr(1, 1)
      //如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 == 0 && len2 != '.') {
        str = str.substr(1, 1)
      }
      //第一位不能是.
      if (len1 == '.') {
        str = ''
      }
      //限制只能输入一个小数点
      if (str.indexOf('.') != -1) {
        var str_ = str.substr(str.indexOf('.') + 1)
        if (str_.indexOf('.') != -1) {
          str = str.substr(0, str.indexOf('.') + str_.indexOf('.') + 1)
        }
      }
      //正则替换
      str = str.replace(/[^\d^\.]+/g, '') // 保留数字和小数点
      if (limit / 1 === 1) {
        str = str.replace(/^\D*([0-9]\d*\.?\d{0,1})?.*$/, '$1') // 小数点后只能输 1 位
      } else {
        str = str.replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1') // 小数点后只能输 2 位
      }

      if (
        this.ruleForm.price_type == 1 &&
        this.totlePrice !== 0 &&
        parseInt(this.ruleForm.price) > this.totlePrice
      ) {
        str = this.totlePrice
      }
      return str
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
  .operation-prompt {
    width: 100%;
    height: 114px;
    background: #e9f4ff;
    border: 1px dashed #2890ff;
    border-radius: 4px;
    padding: 17px 0 0 17px;
    margin-bottom: 20px;
    .logo {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        padding-left: 5px;
        font-size: 14px;
        font-weight: bold;
        color: #2890ff;
      }
    }
    .prompt-content {
      padding-left: 23px;
      p {
        color: #6a7076;
        &:not(:first-child) {
          margin-top: 8px;
        }
      }
    }
  }
  .add-bank {
    width: 100%;
    flex: 1;
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    border-radius: 4px;
    /deep/.el-form {
      .el-form-item__label {
        font-weight: normal;
      }
      .Select {
        .select-input-wx {
          width: 578px;
        }
        .select-input {
          width: 474px;
        }
        .el-button {
          // width: 96px;
          height: 38px;
          border: 1px solid #2890ff;
          border-radius: 4px;
          background-color: #fff;
          color: #2890ff;
          margin-left: 10px;
        }
        .add-bankCard {
          text-align: center;
        }
      }

      .input-withdrawal {
        .el-input-group__append {
          border-color: #d5dbe8 !important;
        }
      }

      .input-poundage {
        .el-input-group__append {
          border-color: #e9ecef !important;
        }
      }

      .get-code {
        .el-input-group__append {
          color: #97a0b4;
          background-color: #fff;
          cursor: pointer;
          border: 1px solid #b2bcd4;
          border-left: none;
        }
        .getcode {
          color: #2890ff;
        }
        .el-input-group__append {
          border-color: #d5dbe8 !important;
        }
      }
    }
  }
}
// 弹框样式
.dialog-block {
  /deep/.el-dialog {
    width: auto;
    min-width: 580px;
    height: 310px;
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
      padding: 41px 60px 0px 60px !important;
      .el-form-item__label {
        font-weight: normal;
      }
      .demo-ruleForm {
        .el-form-item {
          display: flex;
        }
        .el-form-item__content {
          margin-left: 0 !important;
        }
      }
      .form-footer {
        width: 100%;
        height: 72px;
        position: absolute;
        bottom: 0;
        right: 0;
        border-top: 1px solid #e9ecef;
        .el-form-item {
          text-align: right;
          margin-right: 10px;
          padding: 0 !important;
          height: 100%;
          display: block !important;
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
      .el-input {
        width: 360px;
      }
    }
  }
}
</style>
