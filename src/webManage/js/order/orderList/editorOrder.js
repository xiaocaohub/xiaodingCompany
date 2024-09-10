import { editOrderView, saveEditOrder } from '@/api/order/orderList'
import cascade from '@/api/publics/cascade'
import { isEmpty } from 'element-ui/src/utils/util'
import ErrorImg from '@/assets/images/default_picture.png'

export default {
  name: 'editorOrder',
  data () {
    return {
      dataInfo: null,
      goodsTables: [],
      totleInfo: null,

      ruleForm: {
        status: null,
        name: '',
        mobile: '',
        sheng: '',
        shi: '',
        xian: '',
        r_address: '',
        remarks: '',
        pay_price: ''
      },

      rules: {
        name: [{ required: true, message: '请填写收货人', trigger: 'blur' }],
        mobile: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请输入联系方式'))
              } else {
                const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
                if (reg.test(value)) {
                  callback()
                } else {
                  return callback(new Error('请输入正确的电话'))
                }
              }
            },
            trigger: 'blur'
          }
        ],
        xian: [
          { required: true, message: '请选择联系地址', trigger: 'change' }
        ],
        r_address: [
          { required: true, message: '请填写详细地址', trigger: 'blur' }
        ]
      },

      stateList: [
        {
          value: '0',
          label: '待付款'
        },
        {
          value: '1',
          label: '待发货'
        }
      ], // 订单状态

      //省市级联集
      shengList: {},
      shiList: {},
      xianList: {}
    }
  },

  created () {
    this.getSheng()
    this.editOrderViews().then(() => {
      this.cascadeAddress()
    })
  },

  beforeRouteLeave (to, from, next) {
    if (to.name == 'orderLists') {
      to.params.dictionaryNum = this.$route.query.dictionaryNum
      to.params.pageSize = this.$route.query.pageSize
      to.params.radio1 = this.$route.query.radio1
    }
    next()
  },

  methods: {
    // 图片错误处理
    handleErrorImg (e) {
      console.log('图片报错了', e.target.src)
      e.target.src = ErrorImg
    },
    async editOrderViews () {
      const res = await editOrderView({
        api: 'mch.Mch.Order.EditeOrderInfo',
        sNo: this.$route.query.no
      })
      console.log(res)
      this.dataInfo = res.data.data.data
      this.goodsTables = res.data.data.detail
      this.totleInfo = res.data.data

      ;(this.ruleForm.name = res.data.data.data.name),
        (this.ruleForm.mobile = res.data.data.data.mobile),
        (this.ruleForm.sheng = res.data.data.data.sheng),
        (this.ruleForm.shi = res.data.data.data.shi),
        (this.ruleForm.xian = res.data.data.data.xian),
        (this.ruleForm.r_address = res.data.data.data.r_address),
        (this.ruleForm.remarks = res.data.data.data.remarks)
      this.ruleForm.pay_price = this.totleInfo.pay_price
      if (this.dataInfo.status == '待付款') {
        // this.ruleForm.pay_price = this.totleInfo.pay_price
        this.ruleForm.status = '0'
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

    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.ruleForm)
        if (valid) {
          try {
            if (this.ruleForm.remarks.length > 50) {
              this.$message({
                message: '订单备注长度不能大于50个字符',
                type: 'error',
                offset: 100
              })
              return
            }
            saveEditOrder({
              api: 'mch.Mch.Order.SaveEditOrder',
              orderNo: this.$route.query.no,
              userName: this.ruleForm.name,
              tel: this.ruleForm.mobile,
              shen: this.ruleForm.sheng,
              shi: this.ruleForm.shi,
              xian: this.ruleForm.xian,
              address: this.ruleForm.r_address,
              remarks: this.ruleForm.remarks,
              orderStatus:
                this.dataInfo.status == '待付款' ? this.ruleForm.status : null,
              orderAmt: this.dataInfo.isManyMch ? null : this.ruleForm.pay_price
            }).then(res => {
              console.log(res)
              if (res.data.code == '200') {
                this.$message({
                  message: this.$t('zdata.bjcg'),
                  type: 'success',
                  offset: 100
                })
                this.$router.go(-1)
              }
            })
          } catch (error) {
            this.$message({
              message: error.message,
              type: 'error',
              showClose: true
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
