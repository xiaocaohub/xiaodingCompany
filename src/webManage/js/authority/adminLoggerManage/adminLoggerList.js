import { save, del, index,getSelectData } from '@/api/order/orderSettlement'
import { exports } from '@/api/export'
import pageData from '@/api/constant/page'
import { isEmpty } from 'element-ui/src/utils/util'
import { mixinstest } from '@/mixins/index'

export default {
  name: 'adminLoginList',
  mixins: [mixinstest],
  //初始化数据
  data () {
    return {
      page: pageData.data(),
      search: {},
      //导出弹窗
      isExportBox: false,
      choseIdList: [],
      // table高度
      tableHeight: null,
      operateList:[],

    }
  },
  //组装模板
  created () {
    this.loadData()
    this.handleGetSelectData2()
  },
  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },
  methods: {
    async handleGetSelectData2() {
      const res = await getSelectData({
        api: "saas.dic.getDictionaryInfo",
        key:'日志操作类型'
      });
      console.log('424242242',res);
      if(res.data.code==200){
        this.operateList = res.data.data.list
      }
    },
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },
    async loadData () {
      await index({
        api: 'mch.Mch.Authority.GetRecord',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        zhangHao: this.search.adminName,
        logOperationType:this.search.logOperationType,
        startDate: isEmpty(this.search.time) ? '' : this.search.time[0],
        endDate: isEmpty(this.search.time) ? '' : this.search.time[1]
      }).then(data => {
        if (!isEmpty(data)) {
          let total = data.data.data.total
          data = data.data.data.list

          this.page.tableData = data
          this.total = total
          if (this.total < 10) {
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
      this.showPagebox = false
      this.page.loading = true
      this.dictionaryNum = 1
      this.loadData().then(() => {
        this.page.loading = false
        if (this.page.tableData.length > 5) {
          this.page.showPagebox = true
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
      this.search = {}
    },
    Chose (obj) {
      this.choseIdList = []
      obj.forEach(item => {
        this.choseIdList.push(item.id)
      })
    },
    async Del () {
      if (isEmpty(this.choseIdList) && this.choseIdList.length < 1) {
        this.$message({
          type: 'error',
          message: this.$t('adminLoggerList.qxzsc')
        })
        return
      }

      this.$confirm(
        this.$t('adminLoggerList.qdsc') +
          this.choseIdList.length +
          this.$t('adminLoggerList.trz'),
        this.$t('adminLoggerList.ts'),
        {
          confirmButtonText: this.$t('adminLoggerList.okk'),
          cancelButtonText: this.$t('adminLoggerList.ccel'),
          type: 'warning'
        }
      )
        .then(() => {
          del({
            api: 'mch.Mch.Authority.DelRecord',
            ids: this.choseIdList.toString()
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
          api: 'mch.Mch.Authority.GetRecord',
          pageNo: this.page.dictionaryNum,
          pageSize: this.pageSize,
          exportType: 1,
          search: this.search.orderNo,
          mchName: this.search.mchName,
          status: this.search.type,
          logOperationType:this.search.logOperationType,
          startDate: isEmpty(this.search.time) ? '' : this.search.time[0],
          endDate: isEmpty(this.search.time) ? '' : this.search.time[1]
        },
        '管理员日志'
      )
    },
    async exportAll () {
      console.log(this.total)
      await exports(
        {
          api: 'mch.Mch.Authority.GetRecord',
          pageNo: 1,
          pageSize: this.total,
          exportType: 1
        },
        '管理员日志'
      )
    },
    async exportQuery () {
      await exports(
        {
          api: 'mch.Mch.Authority.GetRecord',
          pageNo: 1,
          pageSize: this.total,
          search: this.search.orderNo,
          mchName: this.search.mchName,
          status: this.search.type,
          logOperationType:this.search.logOperationType,
          startDate: isEmpty(this.search.time) ? '' : this.search.time[0],
          endDate: isEmpty(this.search.time) ? '' : this.search.time[1],
          exportType: 1
        },
        '管理员日志'
      )
    },
    isExportBoxClose () {
      this.isExportBox = !this.isExportBox
    }
  }
}
