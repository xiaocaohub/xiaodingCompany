import { getInfo } from '@/api/moneyManagement/InvoiceManagement'
export default {
  name: 'viewStore',

  data () {
    return {
      storeInfo: null,
      invoice_header: null
    }
  },

  created () {
    this.getInfo()
  },

  beforeRouteLeave (to, from, next) {
    if (to.name == 'auditList' || to.name == 'store') {
      to.params.dictionaryNum = this.$route.query.dictionaryNum
      to.params.pageSize = this.$route.query.pageSize
    }
    next()
  },

  methods: {
    async getInfo () {
      const res = await getInfo({
        api: 'mch.Mch.Invoice.GetInfo',
        id: this.$route.query.id
      })

      console.log(res)
      this.storeInfo = res.data.data
      this.invoice_header = res.data.data.invoice_header
    }
  }
}
