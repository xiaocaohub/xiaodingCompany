import {
  deliveryView,
  deliverySave,
  searchExpress
} from '@/api/order/orderList'
import ErrorImg from '@/assets/images/default_picture.png'

export default {
  name: 'goodsDelivery',

  data () {
    return {
      goodsTables: [],
      goodsNum: null,
      flag: false,
      courierList: [],
      mydata: [],
      // 弹框数据
      dialogVisible: false,
      ruleForm2: {
        kuaidi_name: null,
        kuaidi_no: ""
      },
      rules2: {
        kuaidi_name: [
          {
            required: true,
            message: this.$t('goodsDelivery.qtxkd'),
            trigger: 'change'
          }
        ],
        kuaidi_no: [
          {
            required: true,
            message: this.$t('goodsDelivery.qtxdh'),
            trigger: 'blur'
          }
        ]
      },
      mynum:[],
      logistics_type:true
    }
  },

  created () {
    this.deliveryViews()
    this.searchExpress()
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
    async deliveryViews () {
      const res = await deliveryView({
        api: 'mch.Mch.Order.DeliverList',
        orderno: this.$route.query.no
      })
      this.goodsTables = res.data.data.goods
      this.goodsTables.forEach(e=>{
          e.open=false
          this.mynum.push(e.deliverNum)
      })
      this.goodsNum = res.data.data.total
      // this.id = res.data.data.goods[0].id
      // this.id = res.data.data.goods.map(item => {
      //     return item.id
      // })
    },
    handleSelecChange(item){
      console.log('快递公司zzzz',item,this.courierList.find(item2=>item2.id==item))
      let obj = this.courierList.find(item2=>item2.id==item)
      // if(obj.logistics_type){
          this.logistics_type = obj.logistics_type
      // }
  },

    async searchExpress () {
      const res = await searchExpress({
        api: 'mch.Mch.Order.GetLogistics',
        sNo: this.$route.query.no
      })
      console.log(res)
      this.courierList = res.data.data.list
    },

    handleSelectionChange (val) {
      console.log(val)
      this.goodsTables.forEach(e=>{
        e.open=false
      })
      if (val.length !== 0) {
        this.flag = true
        // this.id = val.map(item => {
        //   return item.id
        // })
        val.forEach(e=>{
            e.open=true
        })
      } else {
          this.flag = false
      }
      console.log(this.mydata);
    },
    handleChange(e){
        console.log(e)
    },

    // 弹框方法
    dialogShow () {
      if (this.flag) {
        let list=[]
        let isblock=false
        this.goodsTables.forEach((item,index) => {
            if(item.open){
                if(!this.mynum[index]){
                    isblock=true
                }
                list.push({
                    
                    num:this.mynum[index],
                    detailId:item.id
                })
            }
        });
        if(isblock){
            this.$message({
                message: '请输入发货数量',
                type: 'error',
                offset: 100
            })
            return
        }
        this.mydata=list
        this.dialogVisible = true
      } else {
        this.$message({
          message: this.$t('goodsDelivery.zsxz'),
          type: 'error',
          offset: 100
        })
      }
    },

    handleClose (done) {
      this.dialogVisible = false
      this.$refs.ruleForm2.clearValidate()
    },

    // 发货
    determine (formName2) {
      this.$refs[formName2].validate(async valid => {
        console.log(this.ruleForm2)
        if (valid) {
          try {
            if (!this.logistics_type && this.ruleForm2.kuaidi_no.length < 10 ) {
              this.$message({
                message: this.$t('goodsDelivery.gsyw'),
                type: 'warning',
                offset: 100
              })
              return
            } else {
              
              deliverySave({
                api:this.logistics_type?"mch.Mch.order.FaceSheetSend":'mch.Mch.Order.Deliver',
                sNo: this.$route.query.no,
                expressId: this.ruleForm2.kuaidi_name,
                courierNum: this.ruleForm2.kuaidi_no,
                orderListId: JSON.stringify(this.mydata)
              }).then(res => {
                if (res.data.code == '200') {
                  this.$message({
                    message: this.$t('zdata.fhcg'),
                    type: 'success',
                    offset: 100
                  })
                  this.$router.go(-1)
                }
                console.log(res)
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
    }
  }
}
