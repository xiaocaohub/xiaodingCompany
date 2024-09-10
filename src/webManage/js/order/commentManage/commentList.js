import pageData from "@/api/constant/page";
import { del, save, index } from "@/api/order/comment";
import { isEmpty } from "element-ui/src/utils/util";
import { mixinstest } from '@/mixins/index'
import { getStorage } from '@/utils/storage'
import { getButton } from '@/api/layout/information'

export default {
  name: 'list',
  mixins: [mixinstest],
  //初始化数据
  data() {
    return {
      button_list:[],
      page: pageData.data(),
      dialogVisible: false,
      choseDate: [],

      commentTypeList: [{ val: 'GOOD', name: this.$t('commentList.hp') }, { val: 'NOTBAD', name: this.$t('commentList.zp') }, { val: 'BAD', name: this.$t('commentList.cp') }],
      dataForm: {
        id: null,
        orderNo: null,
        CommentType: null,
        mchName:null
      },
      rules: {
        name: [
          { required: true, message: this.$t('commentList.bqmcwk'), trigger: 'blur' }
        ]
      },
      dataForm2:{
        replyText: ''
      },
      rules2: {
        replyText: [
          { required: true, message: this.$t('commentList.qsrhf'), trigger: 'blur' }
        ]
      },
      reid:'',
      // table高度
      tableHeight: null,
      button_list: [],
      dialogVisible:false,
      showPagebox:true,

    }
  },
  //组装模板
  created() {
    if (this.$route.params.pageSize) {
      this.pagination.page = this.$route.params.dictionaryNum
      this.dictionaryNum = this.$route.params.dictionaryNum
      this.pageSize = this.$route.params.pageSize
    }
    this.loadData()
    this.getButtonList()
  },

  mounted() {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
         // 获取按钮权限
         getButtonList(){
          let routeList = getStorage('route')
          let list =  routeList.filter(item=>item.path=="commentManage")[0].children
          this.button_list = list.map(item=>{
            return {text:item.name,path:item.path,url:item.url,checked:item.checked}
          })
          console.log('routeList',routeList,this.button_list);
        },
    //回复
    async Reply() {

      if(!this.dataForm2.replyText) {
        this.$message({
          type: 'error',
          message: this.$t('commentList.hfplwk'),
          offset:102
        })
        return
      }
      await save({
        api: 'mch.Mch.Order.replyComments',
        commentId: this.reid,
        commentText: this.dataForm2.replyText,
      }).then(res => {
        if (res.data.code == '200') {
          this.$message({
            type: 'success',
            message: this.$t('commentList.hfcg'),
            offset:102
          })
          this.loadData()
          this.dataForm2.replyText = ''
          this.dialogVisible = false;
        }
      })
    },
    handleClose() {
      this.dataForm2.replyText = ''
      this.dialogVisible = false;
    },
    // 获取table高度
    getHeight() {
      this.tableHeight = this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },
    async loadData() {
      await this.getList().then()
      // await this.getButtons()
    },
    //获取按纽权限
    async getButtons() {
      let route = getStorage('route')
      route.forEach(item => {
        if (item.path == 'commentManage') {
          return this.menuId = item.id
        }
      });
      let buttonList = await getButton({
        api: 'saas.role.getButton',
        menuId: this.menuId,
      })
      this.button_list = buttonList.data.data
      this.button_list = buttonList.data.data.map(item => {
        return item.title
      })
    },
    // 获取列表
    async getList() {
      const res = await index({
        api: 'mch.Mch.Order.getCommentsInfo',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        // orderType: 'GM',
        orderno: this.dataForm.orderNo,
        mchName:this.dataForm.mchName,
        type: this.dataForm.CommentType,
        startDate: isEmpty(this.dataForm.choseDate) ? null : this.dataForm.choseDate[0],
        endDate: isEmpty(this.dataForm.choseDate) ? null : this.dataForm.choseDate[1],
      });
      this.total = res.data.data.total
      this.page.tableData = res.data.data.list
      this.page.loading = false
      if (res.data.data.total < 10) {
        this.current_num = this.total
      }
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
    },

    // 重置
    reset() {
      this.dataForm.CommentType = null
      this.dataForm.mchName=null
      this.dataForm.orderNo = null
      this.dataForm.choseDate = []
    },
    handleClose() {
      this.dialogVisible = false;
    },

    // 查询
    demand() {
      this.currpage = 1
      this.current_num = 10
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

    //选择一页多少条
    handleSizeChange(e) {
      this.page.loading = true
      // this.page.current_num = e
      this.pageSize = e
      this.loadData().then(() => {
        this.currpage = ((this.dictionaryNum - 1) * this.pageSize) + 1
        this.current_num = this.page.tableData.length === this.pageSize ? this.dictionaryNum * this.pageSize : this.total
        this.page.loading = false
      })
    },

    //点击上一页，下一页
    handleCurrentChange(e) {
      this.page.loading = true
      this.dictionaryNum = e
      this.currpage = ((e - 1) * this.pageSize) + 1
      this.loadData().then(() => {
        this.current_num = this.page.tableData.length === this.pageSize ? e * this.pageSize : this.total
        this.page.loading = false
      })

    },
    myReply(id) {
      // this.$router.push({
      //   name: 'commentReply',
      //   params: { id: id },
      // })
      this.dialogVisible=true
      this.reid=id

    },
    see(id) {
      this.$router.push({
        path: '/order/commentManage/commentReply',
        query: {
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          id: id ,
        }
        // name: 'commentReply',
        // params: { id: id },
        
      })


    },
    //修改
    async Edit(id,type) {
      this.$router.push({
        path: '/order/commentManage/commentEdit',
        // params: { id: id ,type:type},
        query: {
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          id: id ,type:type
        }
      })
    },

    // 删除
    Delete(id) {
      this.$confirm(this.$t('commentList.scts'), this.$t('commentList.ts'), {
        confirmButtonText: this.$t('commentList.okk'),
        cancelButtonText: this.$t('commentList.ccel'),
        type: 'warning'
      }).then(() => {
        del({
          api: 'mch.Mch.Order.delComments',
          commentId: id
        }).then(res => {
          this.demand();
          this.$message({
            type: 'success',
            message: this.$t('commentList.sccg'),
            offset:102
          })
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    }

  }

}
