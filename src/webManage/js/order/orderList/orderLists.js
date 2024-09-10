import {
  orderList,
  delOrder,
  kuaidishow,
  verificationExtractionCode
} from '@/api/order/orderList'
import { exports } from '@/api/export/index'
import { mixinstest } from '@/mixins/index'
import ErrorImg from '@/assets/images/default_picture.png'
import { getStorage } from '@/utils/storage'
export default {
  name: 'orderLists',
  mixins: [mixinstest],
  data () {
    return {
      button_list: [],
      stateList: [
        {
          value: '0',
          label: this.$t('orderLists.orderstate[0]')
        },
        {
          value: '1',
          label: this.$t('orderLists.orderstate[1]')
        },
        {
          value: '2',
          label: this.$t('orderLists.orderstate[2]')
        },
        {
          value: '5',
          label: this.$t('orderLists.orderstate[3]')
        },
        {
          value: '7',
          label: this.$t('orderLists.orderstate[4]')
        }
      ], // 订单状态
      typeList: [
        {
          value: '1',
          label: this.$t('orderLists.kd')
        },
        {
          value: '2',
          label: this.$t('orderLists.zt')
        }
      ], // 订单类型
      inputInfo: {
        orderInfo: null,
        state: null,
        type: null,
        date: null
      },
      is_disabled: true, // 批量删除按钮
      goodsListType: null, // 商品列表类型
      orderList: [], // 订单号集合

      tableData: [],
      loading: true,

      // 弹框数据
      dialogVisible2: false,
      ruleForm: {
        courier_company: '',
        courier_no: '',
        logistics: ''
      },

      logisticsList: [],

      // logisticsTracking: [],

      // 核销弹框数据
      dialogVisible3: false,
      ruleForm3: {
        verification: ''
      },

      rules3: {
        verification: [
          {
            required: true,
            message: this.$t('orderLists.qsrzt'),
            trigger: 'blur'
          }
        ]
      },

      verificationId: '',

      // 导出弹框数据
      dialogVisible: false,
      // table高度
      tableHeight: null,
      dialogVisible4:false,
      rules4:{},
      ruleForm4:{
        name:'',
        mobile:'',
        num:'',
        sNo:'',
        old_total:'',
      },
      orInfoList:[]
    }
  },

  created () {
    if (this.$route.query.no) {
      orderList({
        api: 'mch.Mch.Order.Index',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        id: this.$route.query.no,
        selfLifting: this.goodsListType
      }).then(res => {
        console.log(res)
        this.total = res.data.data.total
        this.tableData = res.data.data.list
        this.loading = false
        if (this.total < this.current_num) {
          this.current_num = this.total
        }
      })
    } else if (this.$route.query.orderNo) {
      orderList({
        api: 'mch.Mch.Order.Index',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        KeyWord: this.$route.query.orderNo,
        selfLifting: this.goodsListType
      }).then(res => {
        console.log(res)
        this.total = res.data.data.total
        this.tableData = res.data.data.list
        this.loading = false
        if (this.total < this.current_num) {
          this.current_num = this.total
        }
      })
    } else {
      this.orderLists()
      // this.$store.dispatch('orderNum/getOrderCount')
    }
    // 获取按钮权限
    this.getButtonList()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },
  watch: {
    '$route.query.no': {
      handler: function () {
        orderList({
          api: 'mch.Mch.Order.Index',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          id: this.$route.query.no,
          selfLifting: this.goodsListType
        }).then(res => {
          console.log(res)
          this.total = res.data.data.total
          this.tableData = res.data.data.list
          this.loading = false
          if (this.total < this.current_num) {
            this.current_num = this.total
          }
        })
      }
    }
  },
  methods: {
    // 跳转电子面单
    goPage (val) {
      this.$router.push({
        path: '/order/electronicSheetList/electronicList',
        query: {
          no: val.orderno
        }
      })
    },
    // 获取按钮权限
    getButtonList () {
      let routeList = getStorage('route')
      let list = routeList.filter(item => item.path == 'orderList')[0].children
      this.button_list = list.map(item => {
        return {
          text: item.name,
          path: item.path,
          url: item.url,
          checked: item.checked
        }
      })
      console.log('routeList', routeList, this.button_list)
    },
    // 图片错误处理
    handleErrorImg (e) {
      console.log('图片报错了', e.target.src)
      e.target.src = ErrorImg
    },
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
      console.log(this.$refs.tableFather.clientHeight)
    },
    async orderLists () {
      const res = await orderList({
        api: 'mch.Mch.Order.Index',
        pageSize: this.pageSize,
        pageNo: this.dictionaryNum,
        keyWord: this.inputInfo.orderInfo ? this.inputInfo.orderInfo : null,
        status: this.inputInfo.state ? this.inputInfo.state : null,
        selfLifting: this.inputInfo.type ? this.inputInfo.type : null,
        startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
        endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
      })
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.pagination.page = this.dictionaryNum
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },

    // 重置
    reset () {
      ;(this.inputInfo.orderInfo = null),
        (this.inputInfo.state = null),
        (this.inputInfo.type = null),
        (this.inputInfo.date = null)
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.orderLists().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    // 打印
    print () {
      if (this.orderList.length == 0) {
        this.$message({
          message: this.$t('orderLists.qxzdydd'),
          type: 'warning',
          offset: 100
        })
      } else {
        let routeData = this.$router.resolve({
          path: '/print',
          query: {
            orderId: this.orderList
          }
        })
        window.open(routeData.href, '_blank')
      }
    },

    // 批量删除
    delAll () {
      this.$confirm(this.$t('orderLists.scqr'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delOrder({
            api: 'mch.Mch.Order.DelOrder',
            ordernos: this.orderList
          }).then(res => {
            console.log(res)
            if (res.data.code == '200') {
              this.$message({
                message: this.$t('zdata.cg'),
                type: 'success',
                offset: 100
              })
              this.orderLists()
              // this.$store.dispatch('orderNum/getOrderCount')
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          //   offset: 100
          // });
        })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      console.log(e)
      // this.current_num = e
      this.pageSize = e
      this.orderLists().then(() => {
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
      this.orderLists().then(() => {
        this.current_num =
          this.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
      })
    },

    // 订单详情
    Details (value) {
      this.$router.push({
        path: '/order/orderList/orderDetails',
        query: {
          no: value.orderno
        }
      })
    },

    // 编辑订单
    Edit (value) {
      this.$router.push({
        path: '/order/orderList/editorOrder',
        query: {
          no: value.orderno,
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          radio1: this.radio1
        }
      })
    },

    // 商品发货
    Delivery (value) {
      this.$router.push({
        path: '/order/orderList/goodsDelivery',
        query: {
          no: value.orderno,
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          radio1: this.radio1
        }
      })
    },

    // 查看物流
    Logistics (value) {},

    // 选框改变
    handleSelectionChange (val) {
      if (val.length == 0) {
        this.is_disabled = true
      } else {
        this.is_disabled = false
      }
      console.log(val)
      this.orderList = val.map(item => {
        return item.orderno
      })
      this.orderList = this.orderList.join(',')
    },

    handleClose4(){
      this.dialogVisible4 = false
    },
    // 弹框方法
    dialogShow2 (value) {
      this.dialogVisible2 = true
      kuaidishow({
        api: 'mch.Mch.Order.Kuaidishow',
        orderno: value.orderno
      }).then(res => {
        console.log(res)
        this.logisticsList = res.data.data.list
        this.ruleForm.courier_company = res.data.data.list[0].courier_num
        this.ruleForm.courier_no = res.data.data.list[0].kuaidi_name
        this.ruleForm.logistics = ''
        // this.logisticsTracking = res.data.data.list[0].list
      })
      console.log(value)
    },

    handleClose2 (done) {
      this.dialogVisible2 = false
    },

    // 弹框方法
    dialogShow3 (value) {
      console.log(value)
      this.verificationId = value.id
      this.dialogVisible3 = true
    },

    handleClose3 (done) {
      this.dialogVisible3 = false
      this.ruleForm3.verification = ''
      this.verificationId = ''
      setTimeout(() => {
        this.$refs['ruleForm3'].clearValidate()
      }, 100)
    },
    submit(){
      verificationExtractionCode({
        api: 'mch.Mch.Order.VerificationExtractionCode',
        orderId: this.verificationId,
        extractionCode: this.ruleForm3.verification
      }).then(res => {
        console.log('res',res)
        if (res.data.code == '200') {
          this.orderLists()
          this.$message({
            type: 'success',
            message: this.$t('zdata.hxcg'),
            offset: 100
          })
          this.handleClose4()
          this.handleClose3()
        }
      })
      this.handleClose4()
    },
    submitForm3 (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.ruleForm3)
        if (valid) {
          try {
            verificationExtractionCode({
              api: 'mch.Mch.Order.getGoodsInfoByExtractionCode',
              orderId: this.verificationId,
              extractionCode: this.ruleForm3.verification
            }).then(res => {
              console.log('res',res)
              if (res.data.code == '200') {
                this.ruleForm4 = res.data.data.orderInfo
                this.orInfoList = res.data.data.por_list
                this.dialogVisible3 = false
                setTimeout(() =>{
                  this.dialogVisible4 = true
                },200)
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
          api: 'mch.Mch.Order.Index',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          keyWord: this.inputInfo.orderInfo ? this.inputInfo.orderInfo : null,
          status: this.inputInfo.state ? this.inputInfo.state : null,
          selfLifting: this.inputInfo.type ? this.inputInfo.type : null,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'pageorder'
      )
    },

    async exportAll () {
      exports(
        {
          api: 'mch.Mch.Order.Index',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1
        },
        'allorder'
      )
    },

    async exportQuery () {
      exports(
        {
          api: 'mch.Mch.Order.Index',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1,
          keyWord: this.inputInfo.orderInfo ? this.inputInfo.orderInfo : null,
          status: this.inputInfo.state ? this.inputInfo.state : null,
          selfLifting: this.inputInfo.type ? this.inputInfo.type : null,
          startDate: this.inputInfo.date ? this.inputInfo.date[0] : null,
          endDate: this.inputInfo.date ? this.inputInfo.date[1] : null
        },
        'queryorder'
      )
    }
  }
}
