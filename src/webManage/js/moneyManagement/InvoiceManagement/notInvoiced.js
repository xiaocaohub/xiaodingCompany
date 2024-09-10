import {
  getList,
  delInvoice,
  uploadInvoice
} from '@/api/moneyManagement/InvoiceManagement'
import { mixinstest } from '@/mixins/index'
import { exports } from '@/api/export/index'
import { getStorage, removeStorage } from '@/utils/storage'
import Config from '@/packages/apis/Config'
import { login } from './../../../../api/login/index'

let actionUrl = Config.baseUrl

export default {
  name: 'allInvoice',
  mixins: [mixinstest],

  data () {
    return {
      radio1: '2',
      actionUrl,
      actionUrl: Config.baseUrl,
      inputInfo: {
        name: null,
        status: '',
        rise: ''
      },
      button_list: [],
      tableData: [],
      loading: true,
      is_disabled: true,
      statusList: [
        {
          value: 1,
          label: this.$t('InvoiceManagement.sqz')
        },
        {
          value: 2,
          label: this.$t('InvoiceManagement.ywc')
        },
        {
          value: 3,
          label: this.$t('InvoiceManagement.ycx')
        }
      ], // 开票状态
      riseTypeList: [
        {
          value: 1,
          label: this.$t('InvoiceManagement.qy')
        },
        {
          value: 2,
          label: this.$t('InvoiceManagement.gr')
        }
      ],
      // table高度
      tableHeight: null,
      // 导出弹框数据
      dialogVisible: false,

      dialogVisible2: false,
      ruleForm2: {},
      actionUrl: Config.baseUrl,
      fileList: [],

      file: ''
    }
  },

  created () {
    this.getList()
    this.getButtonList()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  computed: {
    uploadData () {
      return {
        api: 'resources.file.uploadFiles',
        storeId: getStorage('rolesInfos').storeId,
        accessId: getStorage('token'),
        groupId: -1,
        uploadType: 2,
        storeType:7
      }
    }
  },

  methods: {
    // 获取按钮权限
    getButtonList(){
      let routeList = getStorage('route')
      let list =  routeList.filter(item=>item.path=="InvoiceManagement")[0].children
      this.button_list = list.map(item=>{
        return {text:item.name,path:item.path,url:item.url,checked:item.checked}
      })
      console.log('routeList',routeList,this.button_list);
    },
    async getList() {
      const res = await getList({
        api: 'mch.Mch.Invoice.GetList',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        condition: this.inputInfo.name,
        invoiceStatus: 1,
        type: this.inputInfo.rise
      })
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.pagination.page = this.dictionaryNum
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
    },
    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
      console.log(this.$refs.tableFather.clientHeight)
    },

    // 重置
    reset () {
      this.inputInfo.name = null
      this.inputInfo.status = ''
      this.inputInfo.rise = ''
    },

    // 查询
    demand () {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.getList().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    upload (value) {
      this.ruleForm2 = value
      this.dialogVisible2 = true
    },

    handleClose2 (done) {
      this.$refs.img_upload.handleRemove()
      this.dialogVisible2 = false
    },

    handleRemove (file, fileList) {
      console.log(file, fileList)
    },

    handlePreview (file) {
      console.log(file)
    },

    handleSuccess (file) {
      console.log(file)
      if (file.code == '203') {
        this.$message({
          type: 'warning',
          message: '登录已过期',
          offset: 102
        })
        setTimeout(() => {
          const mall = getStorage('mall')
          window.localStorage.clear()
          window.location.href = '/login'
          location.reload()
          window.name = ''
          setStorage('mall', mall)
        }, 1500)
      } else {
        this.file = file.data.imgUrls[0]
      }
      // this.file = file.data.imgUrls[0]
    },

    // 上传之前的处理
    handleBeforeUpload (file, fileList) {
      if (this.$refs.img_upload.uploadFiles.length > 1) {
        this.$refs.img_upload.uploadFiles.splice(0, 1)
      }
      if (
        file.size > 2097152 ||
        !(
          file.type == 'image/png' ||
          file.type == 'image/jpg' ||
          file.type == 'image/jpeg'
        )
      ) {
        this.$message.error('只能上传jpg/png文件，且不超过2MB')
        return false
      }
    },

    determine () {
      console.log(this.file)
      let data = {
        api: 'mch.Mch.Invoice.UploadInvoice',
        id: this.ruleForm2.id,
        filePath: this.file
      }
      let { entries } = Object
      let formData = new FormData()
      for (let [key, value] of entries(data)) {
        formData.append(key, value)
      }
      uploadInvoice(formData).then(res => {
        console.log(res)
        if (res.data.code == '200') {
          this.$refs.img_upload.handleRemove()
          this.dialogVisible2 = false
          this.getList()
          this.$message({
            type: 'success',
            message: '上传成功',
            offset: 102
          })
        } else if (res.data.code == '203') {
          const mall = getStorage('mall')
          window.localStorage.clear()
          window.location.href = '/login'
          location.reload()
          window.name = ''
          setStorage('mall', mall)
        }
        // else if(res.data.code=='203'){
        //     removeStorage('token')
        //     this.$router.push({
        //         path: '/login',})
        // }
      })
    },

    Details (value) {
      this.$router.push({
        path: '/moneyManagement/InvoiceManagement/viewInvoice',
        query: {
          id: value.id
        }
      })
    },

    Delete (value) {
      this.$confirm(this.$t('InvoiceManagement.qrsc'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delInvoice({
            api: 'mch.Mch.Invoice.DelInvoice',
            ids: value.id
          }).then(res => {
            console.log(res)
            if (res.data.code == '200') {
              this.getList()
              this.$message({
                type: 'success',
                message: this.$t('zdata.sccg'),
                offset: 100
              })
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
      this.pageSize = e
      this.getList().then(() => {
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
      this.getList().then(() => {
        this.current_num =
          this.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
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
          api: 'mch.Mch.Invoice.GetList',
          pageNo: this.dictionaryNum,
          pageSize: this.pageSize,
          condition: this.inputInfo.name,
          invoiceStatus: 1,
          type: this.inputInfo.rise,
          exportType: 1
        },
        'pageorder'
      )
    },

    async exportAll () {
      exports(
        {
          api: 'mch.Mch.Invoice.GetList',
          pageNo: this.dictionaryNum,
          pageSize: 999999,
          condition: this.inputInfo.name,
          invoiceStatus: 1,
          type: this.inputInfo.rise,
          exportType: 1
        },
        'allorder'
      )
    },

    async exportQuery () {
      exports(
        {
          api: 'mch.Mch.Invoice.GetList',
          pageNo: this.dictionaryNum,
          pageSize: this.total,
          condition: this.inputInfo.name,
          invoiceStatus: 1,
          type: this.inputInfo.rise,
          exportType: 1
        },
        'queryorder'
      )
    }
  }
}
