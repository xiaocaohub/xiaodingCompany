import { save, index } from '@/api/order/orderSettlement'
import { exports } from '@/api/export'
import pageData from '@/api/constant/page'
import { isEmpty } from 'element-ui/src/utils/util'
import { del } from '@/api/order/comment'
import { mixinstest } from '@/mixins/index'
import { getStorage } from "@/utils/storage";

export default {
  name: 'orderSettlement',
  mixins: [mixinstest],
  //初始化数据
  data () {
    return {
      button_list:[],
      page: pageData.data(),
      search: {},
      mainData: {},
      dialogVisible: false,
      //导出弹窗
      isExportBox: false,
      // table高度
      tableHeight: null
    }
  },
  //组装模板
  created () {
    this.loadData()
    this.getButtonList()
  },
  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },
  methods: {
    getButtonList(){
      let routeList = getStorage('route')
      let list =  routeList.filter(item=>item.path=="orderSettlement")[0].children
      this.button_list = list.map(item=>{
        return {text:item.name,path:item.path,url:item.url,checked:item.checked}
      })
      console.log('routeList',routeList,this.button_list);
    },
    handleClose (done) {
      this.isExportBox = !this.isExportBox
    },
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },
    async loadData () {
      await index({
        api: 'mch.Mch.Settlement.Index',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        search: this.search.orderNo,
        mchName: this.search.mchName,
        status: this.search.type,
        startDate: isEmpty(this.search.time) ? '' : this.search.time[0],
        endDate: isEmpty(this.search.time) ? '' : this.search.time[1]
      }).then(data => {
        if (!isEmpty(data)) {
          let total = data.data.data.total
          data = data.data.data.list

          this.page.tableData = data
          this.total = total
          if (this.total.total < 10) {
            this.current_num = this.total
          }
          if (this.total < this.current_num) {
            this.current_num = this.total
          }
          this.page.loading = false
        }
      })
    },
    tbl (tblId) {
      this.loadData()
    },
    //选择一页多少条
    handleSizeChange (e) {
      this.page.loading = true
      this.pageSize = e
      this.loadData().then(() => {
        this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1
        this.current_num =
          this.page.tableData.length === this.pageSize
            ? this.dictionaryNum * this.pageSize
            : this.total
        this.page.loading = false
      })
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.page.loading = true
      this.dictionaryNum = 1
      console.log(this.pagination.page)
      this.pagination.page = 1
      this.loadData().then(() => {
        this.page.loading = false
        if (this.page.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },
    //点击上一页，下一页
    handleCurrentChange (e) {
      this.page.loading = true
      this.dictionaryNum = e
      this.currpage = (e - 1) * this.pageSize + 1
      this.loadData().then(() => {
        this.current_num =
          this.page.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.page.loading = false
      })
    },
    // 重置
    reset () {
      this.search = { orderNo: null, mchName: null, type: null, time: null }
    },
    See (value) {
      // this.$router.push({
      //   path: '/order/salesReturn/salesReturnDetails',
      //   query: {
      //     orderNo: value.sNo
      //   }
      // })
      this.$router.push({
        path: '/order/orderSettlement/orderSettlementDetail',
        query: {
          orderNo: value.sNo
        }
      })
      // if(value.return_money) {
      //   this.$router.push({
      //     path: '/order/salesReturn/salesReturnDetails',
      //     query: {
      //       orderNo: value.sNo
      //     }
      //   })
      // } else {
      //   this.$router.push({
      //     name: 'orderSettlementDetail',
      //     params: {
      //       orderNo: value.sNo
      //     },
      //   })
      // }
    },
    async Del (id) {
      this.$confirm(
        this.$t('orderSettlementList.qrsc'),
        this.$t('orderSettlementList.ts'),
        {
          confirmButtonText: this.$t('orderSettlementList.okk'),
          cancelButtonText: this.$t('orderSettlementList.ccel'),
          type: 'warning'
        }
      )
        .then(() => {
          del({
            api: 'mch.Mch.Settlement.Del',
            id: id
          }).then(res => {
            if (res.data.code == '200') {
              this.demand()
              this.$message({
                type: 'success',
                message: this.$t('zdata.sccg'),
                offset: 102
              })
            }
          })
        })
        .catch(() => {})
    },
    //导出
    async exportPage () {
      await exports(
        {
          api: 'mch.Mch.Settlement.Index',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          search: this.search.orderNo,
          mchName: this.search.mchName,
          status: this.search.type,
          startDate: isEmpty(this.search.time) ? '' : this.search.time[0],
          endDate: isEmpty(this.search.time) ? '' : this.search.time[1]
        },
        'orderSettlement'
      )
    },
    async exportAll () {
      console.log(this.total)
      await exports(
        {
          api: 'mch.Mch.Settlement.Index',
          pageNo: 1,
          pageSize: 999999,
          exportType: 1
        },
        'orderSettlement'
      )
    },
    async exportQuery () {
      await exports(
        {
          api: 'mch.Mch.Settlement.Index',
          pageNo: 1,
          pageSize: this.total,
          search: this.search.orderNo,
          mchName: this.search.mchName,
          status: this.search.type,
          exportType: 1,
          startDate: isEmpty(this.search.time) ? '' : this.search.time[0],
          endDate: isEmpty(this.search.time) ? '' : this.search.time[1]
        },
        'orderSettlement'
      )
    },
    isExportBoxClose () {
      this.isExportBox = !this.isExportBox
    }
  }
}
