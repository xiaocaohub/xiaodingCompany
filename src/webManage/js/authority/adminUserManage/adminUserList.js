import { save, index, del, disable } from '@/api/authority/authorityManage'
import pageData from '@/api/constant/page'
import { isEmpty } from 'element-ui/src/utils/util'
import { mixinstest } from '@/mixins/index'

export default {
  name: 'adminUserList',
  mixins: [mixinstest],
  //初始化数据
  data () {
    return {
      page: pageData.data(),
      customerNumber: null,
      // table高度
      tableHeight: null
    }
  },
  //组装模板
  created () {
    if (this.$route.params.pageSize) {
      this.pagination.page = this.$route.params.dictionaryNum
      this.dictionaryNum = this.$route.params.dictionaryNum
      this.pageSize = this.$route.params.pageSize
    }
    this.loadData()
  },
  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },
  methods: {
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },
    async loadData () {
      await index({
        api: 'mch.Mch.Authority.GetAdminList',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize
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
      this.current_num = e
      this.pageSize = e
      this.loadData().then(() => {
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
      this.search = {}
    },
    Save (id) {
      this.$router.push({
        name: 'addAdminUser',
        params: { id: id }
      })
    },
    Edit (id) {
      this.$router.push({
        name: 'editAdminUser',
        query: {
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          id: id
        }
      })
    },
    Disable (id) {
      disable({
        api: 'admin.role.stopAdmin',
        id: id
      }).then(res => {
        if (res.data.code == '200') {
          this.loadData()
          this.$message({
            type: 'success',
            message: this.$t('adminUserList.cg'),
            offset: 100
          })
        }
      })
    },
    async Del (value) {
      this.$confirm(
        this.$t('adminUserList.scts'),
        this.$t('adminUserList.ts'),
        {
          confirmButtonText: this.$t('adminUserList.okk'),
          cancelButtonText: this.$t('adminUserList.ccel'),
          type: 'warning'
        }
      )
        .then(() => {
          del({
            api: 'mch.Mch.Authority.DelBindUserAuthorityTree',
            id: value.authorityId
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
    }
  }
}
