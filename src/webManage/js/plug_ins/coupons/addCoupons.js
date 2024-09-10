import {
  choiceClass,
  allCoupons,
  addCoupon,
  getAssignGoodsClass
} from '@/api/plug_ins/coupons'
import { getStorage } from '@/utils/storage'
import treeTransfer from 'el-tree-transfer'
import request from '@/api/https'
export default {
  name: 'addCoupons',
  components: {
    treeTransfer
  },
  data () {
    return {
      //   forbiddenTime:{
      //     disabledDate(time) {
      //         return time.getTime() < Date.now() - 8.64e7;
      //     },
      // },
      ruleForm: {
        // issuer:0,//发行单位 0商城 1自营店
        issue_number_type: 1, //发行数量 1不限制 2设置数量 输入框参数是以前的issue_number
        consumption_threshold_type: 1, //消费门槛 1无门槛 2设置金额 consumption_threshold
        pickup_type: 0, //领取方式 0手动领取 1系统赠送
        date_type: 1, //过期时间  1过期时间  2设置指定过期时间  3设置领取后多久失效
        date_one: '', //设置指定过期时间input
        date_day: '', //设置领取后多久失效input
        limit_num: '', //使用限制input
        coupons_type: '',
        coupons_name: '',
        grade: '',
        type: 1,
        issue_number: '',
        issue_discount: '',
        face_value: '',
        consumption_threshold: '',
        available_range: 1,
        date: '',
        coupons_time: '',
        instructions: '',
        select_goods: [],
        limit_count: 1
      },
      inputInfo: {
        cid: '',
        brandId: ''
      },
      search: '',
      prochangedata: [],
      prochangedata2: [],
      // prolist:[],
      prodata: [],
      currpage: 1,
      current_num: '',
      total: 0,

      pagination: {
        page: 1,
        pagesize: 10
      },
      pagesizes: [10, 25, 50, 100],
      classList: [],
      brandList: [],
      rules: {
        // issuer: [
        //   {required: true, message: this.$t('coupons.addCoupons.qxzfxdw'), trigger: 'blur'}
        // ],
        coupons_type: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qxzyhq'),
            trigger: 'change'
          }
        ],
        coupons_name: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qtxthq'),
            trigger: 'blur'
          }
        ],
        grade: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qxzhy'),
            trigger: 'change'
          }
        ],
        issue_number: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qtxfx'),
            trigger: 'blur'
          }
        ],
        face_value: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qtxmz'),
            trigger: 'blur'
          }
        ],
        issue_discount: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qtxzk'),
            trigger: 'blur'
          }
        ],
        consumption_threshold: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qtxmk'),
            trigger: 'blur'
          }
        ],
        date: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qtxyx'),
            trigger: 'change'
          }
        ],
        coupons_time: [
          {
            required: true,
            message: this.$t('coupons.addCoupons.qtxyx'),
            trigger: 'change'
          }
        ]
      },

      defaultProps: {
        children: 'child',
        label: 'cname'
      },

      membersGrade: [], // 会员等级
      typeList: [
        {
          value: 1,
          name: this.$t('coupons.addCoupons.mj')
        },
        {
          value: 0,
          name: this.$t('coupons.addCoupons.zk')
        }
      ],

      couponsTypeList: [], // 优惠券类型

      availableRangeList: [
        {
          value: 1,
          name: this.$t('coupons.addCoupons.qbsp')
        },
        {
          value: 2,
          name: this.$t('coupons.addCoupons.zdsp')
        },
        {
          value: 3,
          name: this.$t('coupons.addCoupons.zdfl')
        },
        {
          value: 4,
          name: this.$t('coupons.addCoupons.czhy')
        }
      ],

      classIdList: [],

      goodsList: [], // 商品列表

      // 弹框数据
      dialogVisible: false,
      title: ['选择分类', '已选'],
      mode: 'transfer',
      fromData: [],
      toData: [],
      limit_type: 0,
      dialogVisible2: false,
      store_num: 0,
      is_status: 1,
      loading: false
    }
  },

  created () {
    this.getCoupons()
    this.getAssignGoodsClass()
    this.choiceClasss()
  },
  computed: {
    showItem () {
      let showItem1 =
        (this.currpage - 1) * this.pagination.pagesize +
        this.pagination.pagesize
      if (showItem1 > this.total2) {
        showItem1 = this.total2
      }

      let showItem =
        (this.currpage - 1) * this.pagination.pagesize + 1 + '-' + showItem1
      return showItem
    }
  },
  watch: {
    toData: {
      handler: function () {
        this.classIdList = []
        this.getClassId(this.toData)
      }
    },

    'ruleForm.coupons_type': {
      handler: function () {
        if (this.ruleForm.coupons_type !== 4) {
          this.ruleForm.type = null
        } else {
          this.ruleForm.type = 1
        }
      }
    }

    // 'ruleForm.limit_count':{
    //   handler(){
    //     if(this.ruleForm.limit_count < 1){
    //       this.ruleForm.limit_count = 1
    //       this.$message({
    //         message: '数量不能小于1',
    //         type: 'warning',
    //         offset:100
    //       })
    //     }
    //   }
    // },
  },

  methods: {
    //获取所有优惠券
    getCoupons () {
      allCoupons({
        api: 'plugin.coupon.Mchcoupon.AddPage',
        mchId: getStorage('mchId')
      }).then(res => {
        this.couponsTypeList = res.data.data.coupon_type_list
      })
    },
    getRowKey (row) {
      return row.id
    },
    issueChange () {
      if (this.ruleForm.issue_number_type == 2) {
        this.ruleForm.pickup_type = 0
      } else {
        this.ruleForm.issue_number = ''
      }
    },
    thresholdChange () {
      if (this.ruleForm.consumption_threshold_type == 1) {
        this.ruleForm.consumption_threshold = ''
      }
    },
    dateChange () {
      this.ruleForm.date_one = ''
      this.ruleForm.date_day = ''
    },
    // 获取商品类别
    async choiceClasss () {
      const res = await choiceClass({
        api: 'mch.Mch.Goods.GetClass'
      })
      res.data.data.list.class_list[0].forEach((item, index) => {
        let obj = item
        this.classList.push({
          value: obj.cid,
          label: obj.pname,
          index: index,
          children: []
        })
      })
    },
    // 根据商品类别id获取商品品牌
    changeProvinceCity (value) {
      this.inputInfo.brandId = []
      this.brandList = []
      choiceClass({
        api: 'mch.Mch.Goods.GetClass',
        classId: value.length > 1 ? value[value.length - 1] : value[0]
      }).then(res => {
        let num = this.$refs.myCascader.getCheckedNodes()[0].data.index
        this.brandList = res.data.data.list.brand_list
        if (res.data.data.list.class_list[0].length !== 0) {
          this.$refs.myCascader.getCheckedNodes()[0].data.children = []
          res.data.data.list.class_list[0].forEach((item, index) => {
            let obj = item
            this.$refs.myCascader.getCheckedNodes()[0].data.children.push({
              value: obj.cid,
              label: obj.pname,
              index: index,
              children: []
            })
          })
        }
      })
    },
    AddPro () {
      this.loading = true
      this.getprolist()
      this.dialogVisible2 = true
      this.current_num = this.prodata.length
      this.currpage = 1
      this.pagination.pageSize = 10
      // this.$refs.multipleTable.clearSelection();
      console.log(this.prochangedata)
    },
    delPro () {
      this.prochangedata = []
      this.$refs.multipleTable.clearSelection()
    },
    ChangeProdel (index) {
      this.prochangedata.splice(index, 1)
    },
    handleSelectionChange (e) {
      console.log(e)
      this.prochangedata2 = e
      this.store_num = e.length
      // this.handleCurrentChange2(1)
    },
    Reset () {
      this.search = ''
      this.inputInfo.cid = ''
      this.inputInfo.brandId = ''
    },
    query () {
      this.getprolist()
    },
    confirm () {
      if (this.prochangedata2.length == 0) {
        this.$message({
          message: this.$t('coupons.addCoupons.qxzsp'),
          type: 'error',
          offset: 100
        })
        return
      }
      this.prochangedata = [...this.prochangedata, ...this.prochangedata2]
      for (var i = 0; i < this.prochangedata.length; i++) {
        for (var j = i + 1; j < this.prochangedata.length; j++) {
          if (this.prochangedata[i].id === this.prochangedata[j].id) {
            this.prochangedata.splice(j, 1)
            j = j - 1
          }
        }
      }
      this.search = ''
      this.inputInfo.cid = ''
      this.inputInfo.brandId = ''
      this.brandList = []
      this.dialogVisible2 = false
      // this.$refs.multipleTable.clearSelection();
      // this.getprolist()
    },
    //选择一页多少条
    handleSizeChange (e) {
      this.pagination.pagesize = e
      // if (this.dialogVisible3) {
      this.getprolist()
      // } else {
      //     this.getUserList()
      // }
    },
    //点击上一页，下一页
    handleCurrentChange (e) {
      this.currpage = e
      // if (this.dialogVisible3) {
      this.getprolist()
      // } else {
      //     this.getUserList()
      // }
    },
    //点击上一页，下一页
    // handleCurrentChange2(e) {
    //   this.prolist=this.prochangedata.slice((e-1)*10,e*10)
    // },

    getprolist () {
      request({
        method: 'post',
        params: {
          api: 'admin.mch.coupon.getSpecifiedGoodsInfo',
          pageNo: this.currpage,
          pagesize: this.pagination.pagesize,
          productTitle: this.search,
          cid: this.inputInfo.cid[this.inputInfo.cid.length - 1],
          brandId: this.inputInfo.brandId
        }
      }).then(res => {
        console.log('res', res)
        this.total = Number(res.data.data.total)
        this.prodata = res.data.data.list
        console.log('prodata', this.prodata)
        this.loading = false
        this.current_num = this.prodata.length
        if (this.total < this.current_num) {
          this.current_num = this.total
        }
      })
    },
    handleClose2 () {
      this.search = ''
      this.inputInfo.cid = ''
      this.inputInfo.brandId = ''
      this.brandList = []
      // this.$refs.multipleTable.clearSelection()
      this.dialogVisible2 = false
    },
    oninput (value) {
      var str = value
      if (Number(str) > 10) {
        str = 10
      }
      return str
    },
    exgNumber () {
      this.ruleForm.limit_count = Number(this.ruleForm.limit_count)
      if (this.ruleForm.limit_count != this.ruleForm.limit_count.toFixed(0)) {
        this.$message({
          message: this.$t('coupons.addCoupons.lqxzb'),
          type: 'warning',
          offset: 100
        })
      }
    },

    async getAssignGoodsClass () {
      const res = await getAssignGoodsClass({
        api: 'plugin.coupon.Mchcoupon.Fenlei'
      })
      this.fromData = this.recursionNodes(res.data.data.list)
    },

    recursionNodes (childNodes) {
      const nodes = childNodes
      nodes.map((item, index) => {
        if (item.child && item.level > 1) {
          item.level = item.level + '-' + (index + 1)
        }
        if (item.child) {
          this.recursionNodes(item.child)
        }
      })
      return nodes
    },

    getClassId (childNodes) {
      const nodes = childNodes
      for (const item of nodes) {
        this.classIdList.push(item.cid)
        if (item.child) {
          this.getClassId(item.child)
        }
      }
    },

    // 切换模式 现有树形穿梭框模式transfer 和通讯录模式addressList
    changeMode () {
      if (this.mode == 'transfer') {
        this.mode = 'addressList'
      } else {
        this.mode = 'transfer'
      }
    },
    // 监听穿梭框组件添加
    add (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },
    // 监听穿梭框组件移除
    remove (fromData, toData, obj) {
      // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
      // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
      console.log('fromData:', fromData)
      console.log('toData:', toData)
      console.log('obj:', obj)
    },

    // 弹框方法
    dialogShow () {
      this.dialogVisible = true
      // this.getAssignGoodsClass()
    },

    handleClose (done) {
      this.dialogVisible = false
      this.getAssignGoodsClass()
    },

    remove2 (node, data) {
      const parent = node.parent
      const children = parent.data.child || parent.data
      const index = children.findIndex(d => d.cid === data.cid)
      children.splice(index, 1)

      for (var i = 0; i < this.toData.length; i++) {
        if (this.toData[i].child.length == 0) {
          this.toData.splice(i, 1)
        }
      }
    },

    submitForm (formName) {
      // this.ruleForm.limit_count = Number(this.ruleForm.limit_count)
      // if(this.ruleForm.limit_count != this.ruleForm.limit_count.toFixed(0)){
      //   return this.ruleForm.limit_count = this.ruleForm.limit_count.toFixed(0)
      // }
      this.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            if (
              this.ruleForm.available_range == 4 &&
              this.ruleForm.coupons_type == 1
            ) {
              this.$message({
                message: this.$t('coupons.addCoupons.czhyb'),
                type: 'error',
                offset: 100
              })
              return
            }
            if (this.ruleForm.issue_number_type == 2) {
              if (
                Number(this.ruleForm.issue_number) <
                Number(this.ruleForm.limit_count)
              ) {
                this.$message({
                  message: this.$t('coupons.addCoupons.fxslb'),
                  type: 'error',
                  offset: 100
                })
                return
              }
            }
            if (this.ruleForm.limit_count == '') {
              this.$message({
                message: this.$t('coupons.addCoupons.qtxxl'),
                type: 'error',
                offset: 100
              })
              return
            }
            let mylist = ''
            this.prochangedata.forEach(element => {
              console.log(element)
              mylist = mylist + element.id + ','
            })
            mylist = mylist.substring(0, mylist.lastIndexOf(','))
            if (this.ruleForm.issue_number_type == 2) {
              if (this.ruleForm.coupons_type !== 4) {
                if (this.ruleForm.issue_number == 0) {
                  this.$message({
                    message: this.$t('coupons.addCoupons.fxslbx'),
                    type: 'error',
                    offset: 100
                  })
                  return
                }
              }
            }
            addCoupon({
              api: 'plugin.coupon.Mchcoupon.Add',
              mchId: getStorage('mchId'),
              id: this.$route.query.id ? this.$route.query.id : '',
              activityType: this.ruleForm.coupons_type,
              name: this.ruleForm.coupons_name,
              circulation: this.ruleForm.issue_number,
              money:
                this.ruleForm.coupons_type == 2
                  ? this.ruleForm.face_value
                  : null,
              discount:
                this.ruleForm.coupons_type == 3
                  ? this.ruleForm.issue_discount
                  : null,
              zmoney: this.ruleForm.consumption_threshold,
              type: this.ruleForm.available_range,
              menuList: this.ruleForm.available_range == 2 ? mylist : null,
              classList:
                this.ruleForm.available_range == 3
                  ? this.classIdList.join(',')
                  : null,
              // startTime: this.ruleForm.date[0],
              // endTime: this.ruleForm.date[1],
              instructions: this.ruleForm.instructions,
              limitCount: this.ruleForm.limit_count,
              day: this.ruleForm.date_day,
              issueUnit: 2,
              receiveType: this.ruleForm.pickup_type,
              end_time: this.ruleForm.date_one
            }).then(res => {
              if (res.data.code == '200') {
                this.$message({
                  message: this.$t('zdata.tjcg'),
                  type: 'success',
                  offset: 100
                })
                this.$router.go(-1)
              }
            })
            // }
          } catch (error) {
            this.$message({
              message: error.message,
              type: 'error',
              offset: 100
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
