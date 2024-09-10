import { orderDetailsInfo } from '@/api/order/orderList'
import ErrorImg from '@/assets/images/default_picture.png'

export default {
  name: 'orderDetails',

  data () {
    return {
      dataInfo: null,
      goodsTables: [],
      totleInfo: null,
      noteList: [],
      remaks: null
    }
  },

  created () {
    this.orderDetailsInfos()
  },

  methods: {
    nato(e){
      const  oldkey = 'pic'
      const  newkey = 'imgurl'
      e[newkey] = e[oldkey]
      delete e[oldkey];
      console.log(e)
     this.$router.push({
         path: '/order/salesReturn/salesReturnList',
         query: {
             sNo:e.sNo
         }
     })
   },
    // 图片错误处理
    handleErrorImg (e) {
      console.log('图片报错了', e.target.src)
      e.target.src = ErrorImg
    },
    async orderDetailsInfos () {
      const res = await orderDetailsInfo({
        api: 'mch.Mch.Order.EditeOrderInfo',
        sNo: this.$route.query.no
      })
      this.dataInfo = res.data.data.data
      this.goodsTables = res.data.data.detail
      this.totleInfo = res.data.data
      this.remaks = res.data.data.data.remarks
      // if(remarksList) {
      //     for(let key in remarksList){
      //         this.noteList.push(remarksList[key])
      //     }
      // }
      console.dir(this.goodsTables)
    },

    
  }
}
