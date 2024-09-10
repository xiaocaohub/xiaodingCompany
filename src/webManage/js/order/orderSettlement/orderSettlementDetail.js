import { save, index } from '@/api/order/orderSettlement'
import { isEmpty } from 'element-ui/src/utils/util'
import { del } from '@/api/order/comment'

export default {
  name: 'orderSettlementDetail',
  //初始化数据
  data () {
    return {
      mainData: {},
      orderInfo: {},
      goodsList: [],
      source: this.$myGetSource()
    }
  },
  //组装模板
  created () {
    this.loadData()
  },
  mounted () {},
  methods: {
    async loadData () {
      await index({
        api: 'mch.Mch.Settlement.Detail',
        orderNo: this.$route.query.orderNo
      }).then(data => {
        console.log(data)
        if (data.status == '200') {
          this.orderInfo = data.data.data
          this.mainData = this.orderInfo.data
          this.goodsList = this.orderInfo.detail
        }
      })
    },

    
  }
}
