import { getRefundList, examine } from '@/api/order/salesReturn'
import { deliveryView } from '@/api/order/orderList'
import { exports } from '@/api/export/index'
import { mixinstest } from '@/mixins/index'
import { getStorage } from "@/utils/storage";

export default {
  name: 'salesReturnList',
  mixins: [mixinstest],
  data () {
    return {
      button_list:[],
      stateList: [
        {
          value: '0',
          label: this.$t('salesReturnList.dsh')
        },
        {
          value: '1',
          label: this.$t('salesReturnList.tkz')
        },
        {
          value: '2',
          label: this.$t('salesReturnList.tkcg')
        },
        {
          value: '3',
          label: this.$t('salesReturnList.tksb')
        },
        {
          value: '4',
          label: this.$t('salesReturnList.hhz')
        },
        {
          value: '5',
          label: this.$t('salesReturnList.hhcg')
        },
        {
          value: '6',
          label: this.$t('salesReturnList.hhsb')
        }
      ], // 订单状态
      inputInfo: {
        orderNo: null,
        state: null,
        date: null
      },

      tableData: [],
      loading: true,

      // 弹框数据
      dialogVisible2: false,
      ruleForm: {
        y_refund: '',
        s_refund: '',
        price: '',
        reason: '',
        kuaidi_name: null,
        kuaidi_no: null
      },

      id: null,
      toggle: null,

      type: '',

      content: '',

      courierList: [],

      // table高度
      tableHeight: null,

      // 导出弹框数据
      dialogVisible: false
    }
  },

  created () {
    if(this.$route.query.sNo){
      this.inputInfo.orderNo = this.$route.query.sNo
    }
    this.getRefundLists()
    this.deliveryViews()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
      // 获取按钮权限
      getButtonList(){
        let routeList = getStorage('route')
        let list =  routeList.filter(item=>item.path=="salesReturn")[0].children
        this.button_list = list.map(item=>{
          return {text:item.name,path:item.path,url:item.url,checked:item.checked}
        })
        console.log('routeList',routeList,this.button_list);
      },
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
      console.log(this.$refs.tableFather.clientHeight)
    },
    async getRefundLists () {
      const res = await getRefundList({
        api: 'mch.Mch.Order.ReturnList',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        orderno: this.inputInfo.orderNo ? this.inputInfo.orderNo : null,
        orderStauts: this.inputInfo.state ? this.inputInfo.state : null,
        startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
        endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
      })
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
    },

    async deliveryViews () {
      const res = await deliveryView({
        api: 'mch.Mch.Order.DeliveryList'
      })
      this.courierList = res.data.data.express
        this.getButtonList()
    },

    // 重置
    reset () {
      ;(this.inputInfo.orderNo = null),
        (this.inputInfo.state = null),
        (this.inputInfo.date = null)
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.getRefundLists().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    View (value, type) {
      console.log(value, type)
      this.$router.push({
        path: '/order/salesReturn/salesReturnDetails',
        query: {
          params: JSON.stringify({
            value: value,
            type: type
          })
        }
        // name: 'salesReturnDetails',
        // params: {
        //         value: value,
        //         type:type
        //     },
      })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.getRefundLists().then(() => {
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
      this.getRefundLists().then(() => {
        this.current_num =
          this.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
      })
    },

    // 弹框方法
    dialogShow2 (value, toggle) {
      console.log(value)
      this.dialogVisible2 = true
      this.id = value.id
      this.toggle = toggle
      this.ruleForm.y_refund = ''
      this.ruleForm.s_refund = ''
      this.ruleForm.reason = ''

      if (this.toggle == 1 || this.toggle == 3) {
        this.ruleForm.y_refund = value.re_money
        this.ruleForm.s_refund = value.re_money
        if (value.r_type == '0') {
          if (value.re_type == '1') {
            this.type = 1
            this.content = '确定要通过该用户的申请,并让用户寄回?'
          } else if (value.re_type == '2') {
            this.type = 9
            this.content = '审核通过钱款将原路返还,确认通过?'
          } else if (value.re_type == '3') {
            this.type = 1
            this.content = '确定要通过该用户的申请,并让用户寄回?'
          } else {
            this.type = 6
            this.content = '确定要通过该用户的申请,并让用户寄回?'
          }
        } else if (value.r_type == '3' && value.r_type != '11') {
          if (parseInt(value.re_type) < 3) {
            this.type = 4
            this.content = '确定已到货并退款到用户?'
          } else {
            this.type = 11
            this.content = '确定要通过该用户的申请,并让用户寄回?'
            // this.zxfahuo(item.sNo,item.id,item.re_type)
            // return
          }
        }
      } else {
        if (value.r_type == '0') {
          if (value.re_type == '1') {
            this.type = 2
          } else if (value.re_type == '2') {
            this.type = 8
          } else {
            this.type = 10
          }
        } else if (value.r_type == '3') {
          this.type = 5
        }
      }
    },

    handleClose2 (done) {
      this.dialogVisible2 = false
      this.id = null
      this.toggle = null
      this.$refs['ruleForm'].clearValidate()
    },

    submitForm2 (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.ruleForm)
        if (valid) {
          try {
            if (this.toggle === 1 || this.toggle == 3) {
              if (this.type == 4 || this.type == 9) {
                examine({
                  api: 'mch.Mch.Order.Examine',
                  id: this.id,
                  type: this.type,
                  price: this.ruleForm.s_refund
                }).then(res => {
                  console.log(res)
                  if (res.data.code == '200') {
                    this.dialogVisible2 = false
                    this.getRefundLists()
                    this.$message({
                      type: 'success',
                      message: '成功!',
                      offset: 100
                    })
                  }
                })
              } else if (this.type == 11) {
                examine({
                  api: 'mch.Mch.Order.Examine',
                  id: this.id,
                  type: this.type,
                  // price: this.ruleForm.s_refund,
                  expressId: this.ruleForm.kuaidi_name,
                  courierNum: this.ruleForm.kuaidi_no
                }).then(res => {
                  console.log(res)
                  if (res.data.code == '200') {
                    this.dialogVisible2 = false
                    this.getRefundLists()
                    this.$message({
                      type: 'success',
                      message: '成功!',
                      offset: 100
                    })
                  }
                })
              } else {
                examine({
                  api: 'mch.Mch.Order.Examine',
                  id: this.id,
                  price: this.ruleForm.s_refund,
                  type: this.type
                }).then(res => {
                  console.log(res)
                  if (res.data.code == '200') {
                    this.dialogVisible2 = false
                    this.getRefundLists()
                    this.$message({
                      type: 'success',
                      message: '成功!',
                      offset: 100
                    })
                  }
                })
              }
            } else {
              examine({
                api: 'mch.Mch.Order.Examine',
                id: this.id,
                text: this.ruleForm.reason,
                type: this.type
              }).then(res => {
                console.log(res)
                if (res.data.code == '200') {
                  this.dialogVisible2 = false
                  this.getRefundLists()
                  this.$message({
                    type: 'success',
                    message: '成功!',
                    offset: 100
                  })
                }
              })
            }
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
    },

    // 导出弹框方法
    dialogShow () {
      this.dialogVisible = true
    },

    handleClose (done) {
      this.dialogVisible = false
    },

    async exportPage () {
      exports(
        {
          api: 'mch.Mch.Order.GetRefundList',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          orderno: this.inputInfo.orderNo ? this.inputInfo.orderNo : null,
          status: this.inputInfo.state ? this.inputInfo.state : null,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'pageorder'
      )
    },

    async exportAll () {
      exports(
        {
          api: 'mch.Mch.Order.GetRefundList',
          pageNo: 1,
          pageSize: 999999,
          exportType: 1
        },
        'allorder'
      )
    },

    async exportQuery () {
      exports(
        {
          api: 'mch.Mch.Order.GetRefundList',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          orderno: this.inputInfo.orderNo ? this.inputInfo.orderNo : null,
          status: this.inputInfo.state ? this.inputInfo.state : null,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'queryorder'
      )
    }
  }
}
