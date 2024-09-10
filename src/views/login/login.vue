<template>
  <div class="container">
    <div class="mch-login" v-if="changes">
      <div class="login-bg">
        <img src="../../assets/imgs/loginbg.png" alt="" />
      </div>
      <div class="card">
        <div class="card-main">
          <div class="login-title">
            <img :src="logo" alt="" />
            <span>{{ $t('login.qjht') }}</span>
          </div>
          <el-form
            v-if="togLogin"
            :model="ruleForm"
            label-position="top"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- <el-form-item :label="商城" prop="mall">
                        <el-select class="select-input" v-model="ruleForm.mall" placeholder="请选择商城">
                            <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
            <!-- 账号 -->
            <el-form-item :label="$t('login.zh')" prop="account">
              <el-input
                v-model="ruleForm.account"
                :placeholder="$t('login.qsrzh')"
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item :label="$t('login.mm')" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
                :placeholder="$t('login.qsrmm')"
                @keyup.enter.native="submitForm('ruleForm')"
              ></el-input>
            </el-form-item>
            <!-- 账号 图形校验码 -->
            <el-form-item
              prop="imgCode"
              style="position: relative"
              :label="$t('login.txyzm')"
            >
              <el-input
                @keyup.enter.native="submitForm('ruleForm')"
                :placeholder="$t(`login.qsryzm`)"
                v-model="ruleForm.imgCode"
              >
              </el-input>
              <div
                class="login-code"
                @click="handleVerificationCode"
                v-loading="is_img_loading"
              >
                <img :src="codeImg" alt="" />
                <!-- 图形验证码过期提示 -->
                <div class="codeImgGQ" v-if="codeImgGQ">
                  <i class="el-icon-refresh-right"></i>
                </div>
              </div>
            </el-form-item>
            <!-- 账号 登录 -->
            <el-form-item>
              <el-button
                type="primary"
                @click.native.prevent="submitForm('ruleForm')"
              >
                {{ $t('login.dl') }}
              </el-button>
            </el-form-item>
          </el-form>
          <el-form
            v-else
            :model="ruleForm"
            label-position="top"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- <el-form-item :label="商城" prop="mall">
                        <el-select class="select-input" v-model="ruleForm.mall" placeholder="请选择商城">
                            <el-option v-for="item in mallList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
            <!-- 手机号 -->
            <el-form-item :label="$t('login.sj')" prop="tel">
              <el-input
                v-model="ruleForm.tel"
                :placeholder="$t('login.qsrsj')"
              ></el-input>
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item class="getCode" :label="$t('login.yzm')" prop="code">
              <el-input
                v-model="ruleForm.code"
                :placeholder="$t('login.qsryzm')"
              ></el-input>
              <div class="codes">
                <span
                  class="get-codes"
                  v-if="countdownShow"
                  @click="startCountdown"
                >
                  {{ $t('login.hqyzm') }}
                </span>
                <span class="again" v-else>
                  {{ countdown }}
                  <span>{{ $t('login.mhcxh') }}</span>
                </span>
              </div>
            </el-form-item>
            <!-- 验证码 图形校验码 -->
            <el-form-item
              prop="imgCode"
              style="position: relative"
              :label="$t('login.txyzm')"
            >
              <el-input
                @keyup.enter.native="submitForm('ruleForm')"
                :placeholder="$t(`login.qsryzm`)"
                v-model="ruleForm.imgCode"
              >
              </el-input>
              <div
                class="login-code"
                @click="handleVerificationCode"
                v-loading="is_img_loading"
              >
                <img :src="codeImg" alt="" />
                <!-- 图形验证码过期提示 -->
                <div class="codeImgGQ" v-if="codeImgGQ">
                  <i class="el-icon-refresh-right"></i>
                </div>
              </div>
            </el-form-item>
            <!-- 验证码 登录 -->
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">
                {{ $t('login.dl') }}
              </el-button>
            </el-form-item>
          </el-form>
          <div class="disFlex">
            <!-- 验证码登录 -->
            <div class="CodeLogin" @click="toggleLogin">
              <img src="" alt="" />
              <!-- 验证码登录 -->
              <!-- <span v-if="togLogin">{{ $t('login.yzmdl') }}</span> -->
              <!-- 密码登录 -->
              <!-- <span v-else>{{ $t('login.mmdl') }}</span> -->
            </div>
            <!-- 忘记密码 -->
            <!-- <div class="forgot-password" @click="returnLogin">
              <span>{{ $t('login.wjmm') }}</span>
            </div> -->
          </div>
          <!-- <div class="foot-info">
            <span>{{ $t('login.lkt') }}</span>
            <span
              >{{ copyright_information }} {{ $t('login.bqsy') }}
              {{ record_information }}</span
            >
          </div> -->
        </div>
      </div>
    </div>
    <!-- 找回密码 -->
    <div class="retrieve-password" v-else>
      <div class="header-item">
        <img :src="logo" alt="" />
        <div class="hr"></div>
        <p>{{ $t('login.zhsz') }}</p>
      </div>
      <div class="main-item">
        <div class="item-title">
          <span>{{ $t('login.zhmm') }}</span>
        </div>
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          class="demo-ruleForm2"
        >
          <el-form-item prop="phone">
            <el-input
              v-model="ruleForm2.phone"
              :placeholder="$t('login.qsrsjh')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phoneCode" class="getCode">
            <el-input
              v-model="ruleForm2.phoneCode"
              :placeholder="$t('login.qsryzm')"
            ></el-input>
            <div class="codes">
              <span
                class="get-codes"
                v-if="countdownShow2"
                @click="startCountdown2"
                >{{ $t('login.hqyzm') }}</span
              >
              <span class="again" v-else
                >{{ countdown2 }}<span>{{ $t('login.mhcxh') }}</span></span
              >
            </div>
          </el-form-item>
          <!-- 输入密码 -->
          <el-form-item prop="psw1">
            <!-- 只能输入字母或数字 -->
            <el-input
              @input="
                v => (ruleForm2.psw1 = v.replace(/[^\a-\z\A-\Z0-9]/g, ''))
              "
              v-model="ruleForm2.psw1"
              show-password
              :placeholder="$t('login.qsr6')"
            ></el-input>
          </el-form-item>
          <!-- 确认密码 -->
          <el-form-item prop="psw2">
            <!-- 只能输入字母或数字 -->
            <el-input
              @input="
                v => (ruleForm2.psw2 = v.replace(/[^\a-\z\A-\Z0-9]/g, ''))
              "
              v-model="ruleForm2.psw2"
              show-password
              :placeholder="$t('login.zcsr')"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="imgCode" class="getCodeImg">
                    <el-input v-model="ruleForm2.imgCode" :placeholder="$t('login.qsrtxy')请输入图形验证码"></el-input>
                    <div class="codeImg" @click="getCodeImgs">
                        <img :src="codePath" alt="" v-if="codePath">
                        <img src="" alt="" v-else>
                    </div>
                </el-form-item> -->
          <!-- 找回密码 保存 -->
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm2('ruleForm2')">{{
              $t('zdata.save')
            }}</el-button>
          </el-form-item>
        </el-form>
        <!-- 找回密码 返回登录 -->
        <div class="item-footer" @click="returnLogin">
          <span>{{ $t('login.fhdl') }}</span>
        </div>
      </div>
      <div class="footerr-item">
        <span>
          Copyright 2019 ©来客店铺端管理平台 {{ record_information }}</span
        >
      </div>
    </div>

      <!-- 弹窗提示 -->
      <div class="mask" v-if="versionUpdate">
      <div class="mask-content">
        <div class="margin-left">
          <img src="../../assets/imgs/bg_1314.png" class="mask_bg" alt="">
        </div>
        <div class="margin-right">
          <h1>{{ systemMsgTitle }}</h1>
          <div class="title-content">
            <h2>公告内容</h2>
            <div class="content">
              <p v-html="content"></p>
            </div>
          </div>
          <el-button @click="closeVersion" type="primary" style="width: 113px;">我知道了</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getInfo,
  getStoreList,
  sendSMS,
  getCode,
  forgetPwd,
  getImgCode,
  getAdmin
} from '@/api/login/index'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
// import axios from "axios";

export default {
  data () {
    var validateCode = (rule, value, callback) => {
      if (value == '') {
        callback(new Error(this.$t('login.qsryzm')))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.qsrmm')))
      } else {
        if (this.ruleForm2.psw1 !== '') {
          this.$refs.ruleForm2.validateField('psw1')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('login.zcsr')))
      } else if (value !== this.ruleForm2.psw1) {
        callback(new Error(this.$t('login.lcsrb')))
      } else {
        callback()
      }
    }
    return {
      systemMsgTitle:"",
      content: "",
      versionUpdate:false,
      ruleForm: {
        mall: 1,
        account: '',
        password: '',
        tel: '',
        code: '',
        imgCodeToken: '',
        imgCode: ''
      },
      codeImg: '',
      rules: {
        imgCode: [
          {
            validator: validateCode,
            trigger: 'blur'
          }
        ],
        mall: [
          {
            required: true,
            message: this.$t('login.qxzsc'),
            trigger: 'change'
          }
        ],
        account: [
          {
            required: true,
            message: this.$t('login.qsrzh'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('login.qsrmm'),
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            message: this.$t('login.qsrsj'),
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: this.$t('login.qsryzm'),
            trigger: 'blur'
          }
        ]
      },
      ruleForm2: {
        phone: '',
        phoneCode: '',
        psw1: '',
        psw2: '',
        imgCode: ''
      },
      rules2: {
        imgCode: [
          {
            validator: validateCode,
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: this.$t('login.qsrsj'),
            trigger: 'blur'
          }
        ],
        phoneCode: [
          {
            required: true,
            message: this.$t('login.qsryzm'),
            trigger: 'blur'
          }
        ],
        psw1: [
          {
            required: true,
            message: this.$t('login.qsrmm'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: this.$t('login.cdz6'),
            trigger: 'blur'
          },
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        psw2: [
          {
            required: true,
            message: this.$t('login.qsrmm'),
            trigger: 'blur'
          },
          {
            min: 6,
            max: 16,
            message: this.$t('login.cdz6'),
            trigger: 'blur'
          },
          {
            validator: validatePass2,
            trigger: 'blur'
          }
        ]
        // imgCode: [
        //     { required: true, message: '请输入图形验证码', trigger: 'blur' }
        // ],
      },

      mallList: [],

      changes: true,

      togLogin: true,
      setTime: '', //定时器变量，用于销毁定时器
      codeImgGQ: false, //判断图形验证是否过期，后台写死120秒过期。
      countdown: 60,
      countdownShow: true,

      logo: '',
      copyright_information: '',
      record_information: '',
      link_to_landing_page: {},

      codePath: '',
      codeToken: '',
      token: '',
      countdown2: 60,
      countdownShow2: true,
      is_img_loading: false,
    }
  },

  created () {
    this.getBase()
    if (this.$route.query.token) {
      setStorage('token', this.$route.query.token)
      this.$store.dispatch('user/getAdmin').then(res => {
        console.log('res-->', res)
        if (res == 200) {
          this.$router.push({
            path: '/goods/optional/optionalGoods',
            query: { loginType: 'PC商城入口进入' }
          })
        } else {
          this.$message({
            type: 'error',
            message: this.$t('自动登录失败，请手动登录'),
            offset: 100
          })
        }
      })
    }
    this.getInfos()
    this.handleVerificationCode()
  },
  mounted () {
    //this.getBase();
  },

  watch: {},

  methods: {
    closeVersion() {
        this.showVersion = false
        this.versionUpdate = false
        localStorage.clear();
        window.location.reload();
      },
    async handleVerificationCode () {
      this.codeImgGQ = false //初始化隐藏 图形验证码过期显示
      this.is_img_loading = true
      try {
        const res = await getImgCode()
        if (res.data.code == 200) {
          let reg = new RegExp('gw')
          // process.env.VUE_APP_PROXY_API?.replace(reg, "")
          // console.log('425425425,',process.env.VUE_APP_PROXY_API.indexOf('gw'));
          let codeImg1 = ''
          let tmpCodeImg = res?.data?.data?.code_img;

          if(tmpCodeImg && tmpCodeImg.indexOf("http") == -1){
              if (process.env.VUE_APP_PROXY_API.indexOf('gw') !== -1) { 
                codeImg1 = process.env.VUE_APP_PROXY_API?.replace(reg, '') +
                res.data.data.code_img
              } else {
                codeImg1 = process.env.VUE_APP_PROXY_API?.replace(reg, '') + '/' + res.data.data.code_img
              }
              
          } else {
            codeImg1 = tmpCodeImg
          }
          this.codeImg = codeImg1
          //如果存在定时器 先清除原有️定时器
          if (this.setTime != '') {
            clearTimeout(this.setTime)
          }
          //开启新的定时器
          this.setTime = setTimeout(() => {
            this.codeImgGQ = true
          }, 120000)
          this.ruleForm.imgCodeToken = res.data.data.code
        } else {
          console.log('res', res)
        }
      } catch (error) {
        console.log('error', error)
      } finally {
        this.is_img_loading = false
      }
    },
    getBase () {
      if (process.env.NODE_ENV == 'development') {
        this.ruleForm.mall = process.env.VUE_APP_STORE
      } else if (process.env.NODE_ENV == 'production') {
        this.ruleForm.mall = process.env.VUE_APP_STORE
      }
      setStorage('rolesInfos', {
        storeId: this.ruleForm.mall
      })
    },
    async getInfos () {
      const res = await getInfo()
      console.log(res)
      let info = res.data.data.config
      this.logo = info.logo
      this.copyright_information = info.copyright_information
      this.record_information = info.record_information
      if (info.link_to_landing_page) {
        this.link_to_landing_page = JSON.parse(info.link_to_landing_page)
      }
    },

    async getStoreLists () {
      const res = await getStoreList({
        api: 'admin.mch.home.storeList'
      })
      console.log(res)
      this.mallList = res.data.data.list
      this.ruleForm.mall = res.data.data.list[0].id
    },
    /**
     * 登录
     * @param {Object} ruleForm forData
     */
    submitForm (ruleForm) {
      console.log('查看下数据~~~', ruleForm);
      if (this.togLogin) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.$store
              .dispatch('user/loginUser', this.ruleForm)
              .then((res) => {
                if(res.data.data.systemMsg && res.data.data.systemMsgTitle){
                  this.content = res.data.data.systemMsg
                  this.systemMsgTitle =  res.data.data.systemMsgTitle
                  if (this.content.length > 0 && res.data.data.systemMsgType == 1) {
                    this.versionUpdate = true
                    this.loading = false;
                    return
                  }
                }
                console.log('查看下数据359', res);
                this.$router.push({
                  path: this.redirect || '/'
                })
              })
              .catch(() => {
                this.handleVerificationCode()
              })
          } else {
            console.log('error submit!!')
            this.handleVerificationCode()
            return false
          }
        })
      } else {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.$store.dispatch('user/loginBySms', this.ruleForm).then((res) => {
              if(res.data.data.systemMsg && res.data.data.systemMsgTitle){
                this.content = res.data.data.systemMsg
                this.systemMsgTitle =  res.data.data.systemMsgTitle
                if (this.content.length > 0 && res.data.data.systemMsgType == 1) {
                  this.versionUpdate = true
                  this.loading = false;
                  return
                }
              }
              console.log('查看下数据359', res);
              this.$router.push({
                path: this.redirect || '/'
              })
            })
            .catch(() => {
              this.handleVerificationCode()
            })
          } else {
            console.log('error submit!!')
            this.handleVerificationCode()
            return false
          }
        })
      }
    },

    submitForm2 (ruleForm) {
      console.log(123)
      console.log(this.ruleForm2)
      forgetPwd({
        api: 'mch.Mch.User.ForgetPwd',
        phone: this.ruleForm2.phone,
        pcode: this.ruleForm2.phoneCode,
        pwd: this.ruleForm2.psw1,
        rpwd: this.ruleForm2.psw2,
        imgCode: this.ruleForm2.imgCode ?? '',
        accessId: this.codeToken,
        storeId: this.ruleForm.mall ? this.ruleForm.mall : 1
      }).then(res => {
        console.log(res)
        if (res.data.code !== '200') {
          getCode().then(res => {
            console.log(res)
            this.codePath = res.data.data.codePath
            this.codeToken = res.data.data.codeToken
          })
        } else {
          this.$message({
            type: 'success',
            message: this.$t('zdata.cg'),
            offset: 100
          })
          this.returnLogin()
        }
      })
    },

    toggleLogin () {
      this.togLogin = !this.togLogin
      this.ruleForm.account = ''
      this.ruleForm.password = ''
      this.ruleForm.tel = ''
      this.ruleForm.code = ''
      this.handleVerificationCode()
      setTimeout(() => {
        this.$refs['ruleForm'].clearValidate()
      }, 100)
    },

    startCountdown () {
      if (this.ruleForm.tel) {
        sendSMS({
          api: 'mch.Mch.User.SendSms',
          phone: this.ruleForm.tel,
          storeId: this.ruleForm.mall ? this.ruleForm.mall : 1
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
            //多余提示 显示了2个
            //this.$message.error(this.$t("login.qsrzqs"));
          }
        })
      } else {
        this.$message.error(this.$t('login.qsrsj'))
        return
      }
    },

    startCountdown2 () {
      if (this.ruleForm2.phone) {
        sendSMS({
          api: 'mch.Mch.User.SendSmsForgetPwd',
          phone: this.ruleForm2.phone,
          storeId: this.ruleForm.mall ? this.ruleForm.mall : 1
        }).then(res => {
          console.log(res)
          if (res.data.data) {
            this.countdownShow2 = !this.countdownShow2
            var timer = setInterval(() => {
              if (this.countdown2 == 1) {
                this.countdownShow2 = true
                this.countdown2 = 60
                clearTimeout(timer)
                return
              }
              this.countdown2--
            }, 1000)
          } else {
            // this.$message.error('请填写正确的手机号')
          }
        })
      } else {
        this.$message.error(this.$t('login.qsrzqs'))
        return
      }
    },

    /**
     * 忘记密码
     */
    returnLogin () {
      //这里只要做初始化，图形验证码第一次 必提示 图形验证码错误
      // this.ruleForm = {
      //   mall: 1,  //这里做初始化 mall 不能为空
      //   account: "",
      //   password: "",
      //   tel: "",
      //   code: ""
      // }
      this.ruleForm2 = {
        phone: '',
        phoneCode: '',
        psw1: '',
        psw2: '',
        imgCode: ''
      }
      //显示 忘记密码 输入框
      this.changes = !this.changes
      //清除表单校验
      this.$refs['ruleForm'].clearValidate()
      this.$refs['ruleForm2'].clearValidate()
    },

    getCodeImgs () {
      getCode().then(res => {
        console.log(res)
        this.codePath = res.data.data.codePath
        this.codeToken = res.data.data.codeToken
      })
    }
  }
}
</script>

<style scoped lang="less">
 .mask {
    position: fixed;
    z-index: 99999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    display: block;

    .mask-content {
      display: flex;
      top: 50% !important;
      background: none;
      width: 1140px;
      height: auto !important;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 12px;

      .margin-left {
        width: 667px;
        height: 636px;
        padding: 0;

        // background-color: pink;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          margin: 0;
        }
      }

      .margin-right {
        flex: 1;
        background-color: #fff;
        padding-left: 75px;
        border-radius: 0 12px 12px 0;

        h1 {
          margin-top: 85px;
          // text-align: center;
          color: #333333;
          font-size: 32px;
        }

        .title-content {
          height: 350px;
          width: 322px;
          padding-top: 56px;
          margin-bottom: 40px;

          img {
            width: 100%;
          }

          .content {
            height: 267px;
            overflow-y: scroll;
          }

          h2 {
            font-size: 18px;
            margin-bottom: 12px;
            color: #333;
          }

          p {
            color: #666;
            font-size: 16px;
            word-wrap: break-word;
          }
        }
      }
    }
  }
.codeImgGQ {
  width: 100%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #ffffff;
}
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;

  .mch-login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .login-bg {
      width: 50%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .card {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .el-form-item__content {
        position: relative;
      }

      .login-code {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 30px;
        width: 77px;
        height: 36px;
        // border-radius: 20px;
        // background-color: pink;
        overflow: hidden;
        line-height: 1;
        // padding-top: 12px;
        z-index: 99999;

        img {
          // border-radius: 20px;
          width: 77px;
          height: 36px;
        }
      }

      .card-main {
        width: 432px;
        height: 100%;

        .login-title {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 70px;

          img {
            width: 150px;
            height: 50px;
            margin-bottom: 25px;
          }

          span {
            font-size: 26px;
            font-weight: bold;
            color: #323544;
          }
        }

        /deep/.demo-ruleForm {
          margin-top: 40px;

          .el-input {
            height: 62px;

            input {
              height: 62px;
            }
          }

          .el-select {
            width: 100%;
            height: 62px;

            input {
              height: 62px;
            }
          }

          .el-button {
            width: 100%;
            height: 62px;
            font-size: 16px;
            color: #fff;
            background-color: #2890ff;
            border-radius: 4px;
            margin-top: 28px;
            border: none;
          }

          .getCode {
            .el-form-item__content {
              position: relative;

              .codes {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 11px;
                font-size: 14px;

                .get-codes {
                  cursor: pointer;
                  font-size: 14px;
                  color: #2890ff;
                }

                .again {
                  color: #2890ff;
                  font-size: 14px;

                  span {
                    color: #666666;
                  }
                }
              }
            }
          }
        }

        .disFlex {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .CodeLogin {
            cursor: pointer;

            span {
              font-size: 14px;
              color: #2890ff;
            }
          }

          .forgot-password {
            cursor: pointer;

            span {
              font-size: 14px;
              color: #6a7583;
            }
          }
        }

        .foot-info {
          margin-top: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #969da8;

          span {
            margin-bottom: 10px;
            text-align: center;
          }
        }
      }
    }
  }

  .retrieve-password {
    width: 100%;
    height: 100%;
    background-color: #ebeef2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .header-item {
      width: 100%;
      height: 80px;
      background-color: #fff;
      padding-left: 358px;
      display: flex;
      align-items: center;
      align-items: center;

      img {
        width: 140px;
        height: 47px;
      }

      .hr {
        width: 1px;
        height: 48px;
        background: #dddddd;
        margin: 0 24px;
      }

      p {
        font-size: 26px;
        color: #323544;
      }
    }

    .main-item {
      width: 1000px;
      height: 720px;
      background-color: #fff;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;

      .item-title {
        font-size: 30px;
        color: #323544;
        margin: 50px 0;
      }

      /deep/.demo-ruleForm2 {
        width: 412px;

        .el-form-item {
          margin-bottom: 20px;
        }

        .btn {
          margin-top: 30px;
        }

        .el-input {
          height: 56px;

          input {
            height: 56px;
          }
        }

        .el-button {
          width: 100%;
          height: 56px;
          font-size: 16px;
          color: #fff;
          background-color: #2890ff;
          border-radius: 4px;
          border: none;
        }

        .getCode {
          .el-form-item__content {
            position: relative;

            .codes {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 11px;
              font-size: 14px;

              .get-codes {
                cursor: pointer;
                font-size: 14px;
                color: #2890ff;
              }

              .again {
                color: #2890ff;
                font-size: 14px;

                span {
                  color: #666666;
                }
              }
            }
          }
        }

        .getCodeImg {
          .el-form-item__content {
            position: relative;

            .codeImg {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              right: 11px;
              line-height: 1;

              img {
                width: 90px;
                height: 40px;
              }
            }
          }
        }
      }

      .item-footer {
        font-size: 14px;
        color: #2890ff;
        display: flex;
        justify-content: center;
        margin-bottom: 60px;
        cursor: pointer;
      }
    }

    .footerr-item {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  }

  /deep/.el-form {
    .el-form-item__label {
      font-size: 14px;
      display: initial;
    }

    input::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 14px;
    }

    input::-moz-placeholder {
      /* Firefox 19+ */
      font-size: 14px;
    }

    input:-ms-input-placeholder {
      /* IE 10+ */
      font-size: 14px;
    }

    input:-moz-placeholder {
      /* Firefox 18- */
      font-size: 14px;
    }
  }
}
</style>
