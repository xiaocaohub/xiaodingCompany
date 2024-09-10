// import {save, index, getUserList} from "@/api/authority/authorityManage";
// import {isEmpty} from "element-ui/src/utils/util";
// import { mixinstest } from '@/mixins/index'
// export default {
//   name: 'addAdminUser',
//   mixins: [mixinstest],
//   //初始化数据
//   data() {
//     return {
//       header: {
//         'background-color': '#F4F7F9',
//         'font-weight': 'bold',
//         'border-bottom': '1px solid #E9ECEF',
//       },
//       dataMain: {passwordOld: null, roleId: null, passwordNew: null},
//       roleList: {},
//       id: null,
//       rules: {
//         roleId: [{required: true, message: '请选择角色', trigger: 'change'}],
//       },

//       tableData: [],
//       id: '',

//       search: '',
//     }
//   },
//   //组装模板
//   created() {
//     this.loadData();
//     if(this.$route.query.id) {
//       this.dataMain.id = this.$route.query.id
//     }
//   },
//   beforeRouteLeave (to, from, next) {
//     if (to.name == 'adminUserList' && this.$route.name == 'editAdminUser') {
//       to.params.dictionaryNum = this.$route.query.dictionaryNum
//       to.params.pageSize = this.$route.query.pageSize
//     }
//     next();
//   },
//   mounted() {
//   },
//   methods: {
//     Reset() {
//       this.search = '' //会员ID,名称，手机号
//     },

//     query2() {
//       this.currpage = 1
//       this.pagination.pagesize = 10
//       this.currpage = 1
//       this.current_num = 10
//       this.dictionaryNum = 1
//       this.pageSize = 10
//       this.getUserList()
//     },

//     async loadData() {
//       //加载角色下拉
//       await index({
//         api: 'mch.Mch.Authority.RoleList',
//       }).then(data => {
//         if (!isEmpty(data)) {
//           data = data.data.data.list;
//           this.roleList = data;
//         }
//       });

//     },

//     change(item) {
//       console.log(item.id);
//       this.id = item.id
//       this.currpage = 1
//       this.current_num = 10
//       this.dictionaryNum = 1
//       this.pageSize = 10
//       this.showPagebox = false
//       this.getUserList().then(() => {
//         this.showPagebox = true
//       })
//     },

//     async getUserList() {
//       const res = await getUserList({
//         api: 'pc.mch.authority.getUserList',
//         pageNo: this.dictionaryNum,
//         pageSize: this.pageSize,
//         roleId: this.id,
//         key: this.search
//       })
//       console.log(res);
//       this.tableData = res.data.data.list
//       this.total = res.data.data.total
//     },

//     // 选框改变
//     handleSelectionChange(val) {
//       console.log(val);
//       this.idList = val.map(item => {
//         return item.user_id
//       })
//       this.idList = this.idList.join(',')
//     },

//     //选择一页多少条
//     handleSizeChange(e){
//       console.log(e);
//       // this.current_num = e
//       this.pageSize = e
//       this.getUserList().then(() => {
//         this.currpage = ((this.dictionaryNum - 1) * this.pageSize) + 1
//         this.current_num = this.tableData.length === this.pageSize ? this.dictionaryNum * this.pageSize : this.total
//       })
//     },

//     //点击上一页，下一页
//     handleCurrentChange(e){
//       this.dictionaryNum = e
//       this.currpage = ((e - 1) * this.pageSize) + 1
//       this.getUserList().then(() => {
//         this.current_num = this.tableData.length === this.pageSize ? e * this.pageSize : this.total
//       })
// 	  },

//     async Save(formName) {
//       this.$refs[formName].validate(async (valid) => {
//         // console.log(this.ruleForm);
//         if (valid) {
//           try {
//             if (this.idList && !this.idList.length) {
//               this.$message({
//                 message: "请选择用户",
//                 type: 'error',
//                 offset: 100
//               })
//               return
//             }
//             if (isEmpty(this.dataMain.roleId)) {
//               this.$message({
//                 message: "请选择角色",
//                 type: 'error',
//                 offset: 100
//               })
//               return
//             }
//             let text = "添加成功";
//             if (!isEmpty(this.id)) {
//               text = "修改成功";
//             }
//             this.$store.commit('loading/SET_LOADING')
//             await save({
//               api: 'pc.mch.authority.bindUserAuthorityTree',
//               // id: this.id,
//               roleId: this.dataMain.roleId,
//               userId: this.idList,
//             }).then(data => {
//               if(data.data.code == '200' && !isEmpty(data)) {
//                 this.$message({
//                   message: text,
//                   type: 'success',
//                   offset: 100
//                 })
//                 this.$router.go(-1);
//                 this.$store.commit('loading/SET_LOADING')
//               } else {
//                 this.$store.commit('loading/SET_LOADING')
//               }
//             });
//           } catch (error) {
//             this.$message({
//                 message: error.message,
//                 type: 'error',
//                 showClose: true
//             })
//           }
//         } else {
//             console.log('error submit!!');
//             return false;
//         }
//       });

//     }

//   }

// }

import { save, index, del } from '@/api/authority/authorityManage'
import { isEmpty } from 'element-ui/src/utils/util'

export default {
  name: 'addAdminUser',
  //初始化数据
  data () {
    return {
      dataMain: { passwordOld: null, roleId: null, passwordNew: null },
      roleList: {},
      customer_number: null,
      id: null,
      rules: {
        name: [
          {
            required: true,
            message: this.$t('addAdminUser.qsrglyzh'),
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: this.$t('addAdminUser.qsrglymm'),
            trigger: 'blur'
          }
        ],
        passwordNew: [
          {
            required: true,
            message: this.$t('addAdminUser.qsrglymm'),
            trigger: 'blur'
          }
        ],
        passwordOld: [
          {
            required: true,
            message: this.$t('addAdminUser.qzcsrmm'),
            trigger: 'blur'
          }
        ],
        roleId: [
          {
            required: true,
            message: this.$t('addAdminUser.qxzjs'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  //组装模板
  created () {
    this.loadData()
  },
  beforeRouteLeave (to, from, next) {
    if (to.name == 'adminUserList' && this.$route.name == 'editAdminUser') {
      to.params.dictionaryNum = this.$route.query.dictionaryNum
      to.params.pageSize = this.$route.query.pageSize
    }
    next()
  },
  mounted () {},
  methods: {
    async loadData () {
      this.id = this.$route.query.id
      if (this.id) {
        this.rules.name = ''
      }
      this.customer_number = this.$route.params.customer_number
      //加载角色下拉
      index({
        api: 'mch.Mch.Authority.RoleList'
      }).then(data => {
        if (!isEmpty(data)) {
          data = data.data.data.list
          this.roleList = data
        }
      })
      if (!isEmpty(this.id)) {
        //加载管理员信息
        index({
          api: 'mch.Mch.Authority.GetAdminList',
          id: this.id
        }).then(data => {
          if (!isEmpty(data)) {
            data = data.data.data
            console.log(data.list[0])

            this.customer_number = data.customer_number
            // let main = data.list[0];
            // main.password = null
            // main.roleId = Number(main.role);
            this.dataMain.name = data.list[0].zhanghao
            this.dataMain.roleId = data.list[0].roleId
            this.dataMain.id = data.list[0].authorityId
          }
        })
      }
    },
    async Save (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.dataMain)
        if (valid) {
          try {
            if (isEmpty(this.id)) {
              if (this.dataMain.password !== this.dataMain.passwordOld) {
                this.$message({
                  message: this.$t('addAdminUser.lcmmby'),
                  type: 'error',
                  offset: 100
                })
                return
              }
            } else {
              if (this.dataMain.passwordNew !== this.dataMain.passwordOld) {
                this.$message({
                  message: this.$t('addAdminUser.lcmmby'),
                  type: 'error',
                  offset: 100
                })
                return
              }
            }
            if (isEmpty(this.dataMain.roleId)) {
              this.$message({
                message: this.$t('addAdminUser.qxzjs'),
                type: 'error',
                offset: 100
              })
              return
            }
            let text = this.$t('zdata.tjcg')
            if (!isEmpty(this.id)) {
              text = this.$t('zdata.bjcg')
            }
            await save({
              api: 'mch.Mch.Authority.InsertUser',
              id: this.id,
              isUpdate: this.id ? 2 : 1,
              zhanghao: this.dataMain.name,
              roleId: this.dataMain.roleId,
              mima: this.dataMain.password
                ? this.dataMain.password
                : this.dataMain.passwordNew
            }).then(data => {
              if (data.data.code == '200' && !isEmpty(data)) {
                this.$message({
                  message: text,
                  type: 'success',
                  offset: 100
                })
                this.$router.go(-1)
              }
            })
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

    // oninput2(num) {
    //   var str = num
    //   str = str.replace(/[^\.\d]/g,'');
    //   str = str.replace('.','');

    //   return str
    // },
  }
}
