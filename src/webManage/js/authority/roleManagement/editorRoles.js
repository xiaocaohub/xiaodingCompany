import {
  getUserRoleInfo,
  addUserRoleMenu,
  getRoleListInfo
} from '@/api/authority/roleManagement'
export default {
  name: 'editorRoles',

  data () {
    return {
      language: '',
      ruleForm: {
        rolename: '',
        roledescribe: '',
        rolelist: []
      },
      rules: {
        rolename: [
          {
            required: true,
            message: this.$t('addRoles.qsrjsmc'),
            trigger: 'blur'
          }
        ],
        roledescribe: [
          {
            required: true,
            message: this.$t('addRoles.qsrjsms'),
            trigger: 'blur'
          }
        ]
      },

      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      idList: [],
      systemNodeFlag: false
    }
  },

  created () {
    this.language = this.getCookit()

    this.getUserRoleInfos().then(() => {
      this.systemNodeFlag = false
    })
    this.getRoleListInfos()
  },

  beforeRouteLeave (to, from, next) {
    if (to.name == 'roleList') {
      to.params.dictionaryNum = this.$route.query.dictionaryNum
      to.params.pageSize = this.$route.query.pageSize
    }
    next()
  },

  methods: {
    // 获取cookiet
    getCookit () {
      let myCookie = document.cookie.split(';').map(item => {
        let arr = item.split('=')
        return { name: arr[0], value: arr[1] }
      })
      let strCookit = ''
      myCookie.forEach(item => {
        if (item.name.indexOf('language') !== -1) {
          strCookit = item.value
        }
      })
      return strCookit
    },
    async getRoleListInfos () {
      const res = await getRoleListInfo({
        api: 'mch.Mch.Authority.RoleList',
        roleId: this.$route.query.id
      })
      this.ruleForm.rolename = res.data.data.list[0].name
      this.ruleForm.roledescribe = res.data.data.list[0].text
      console.log(res)
    },

    async getUserRoleInfos () {
      const res = await getUserRoleInfo({
        api: 'mch.Mch.Authority.GetUserAuthorityTree',
        roleId: this.$route.query.id
      })
      this.treeData = res.data.data.list
      this.recursionNodes(res.data.data.list)
      let that = this
      setTimeout(function () {
        that.idList.forEach(item => {
          that.$refs.tree.setChecked(item, true, false)
        })
      }, 500)
    },

    recursionNodes (childNodes) {
      const nodes = childNodes
      for (const item of nodes) {
        if (item.checked) {
          this.idList.push(item.id)
        }
        if (item.children) {
          this.recursionNodes(item.children)
        }
      }
    },

    filterNode (value) {
      if (value && value[0]) {
        filterNode(value.children)
      } else {
        value.children = []
      }
    },

    handleCheckChange () {
      let res = this.$refs.tree
        .getCheckedNodes()
        .concat(this.$refs.tree.getHalfCheckedNodes())
      let arr = []
      res.forEach(item => {
        arr.push(item.id)
      })
      this.idList = res.map(item => {
        return item.id
      })
      this.ruleForm.rolelist = this.idList
      console.log(this.idList)
    },

    submitForm (formName) {
      this.idList = []
      const selectIds = this.$refs.tree
        .getCheckedNodes()
        .concat(this.$refs.tree.getHalfCheckedNodes())
        .map(item => {
          return item.id
        })
      this.idList.push(...selectIds)
      this.$refs[formName].validate(async valid => {
        console.log(this.idList)
        if (valid) {
          try {
            if (this.ruleForm.roledescribe.length > 20) {
              this.$message({
                message: '角色描述长度不能大于20个字符',
                type: 'error',
                offset: 100
              })
              return
            }
            // this.$store.commit('loading/SET_LOADING')
            addUserRoleMenu({
              api: 'mch.Mch.Authority.AddRole',
              roleIdTree: this.idList.join(),
              name: this.ruleForm.rolename,
              describe: this.ruleForm.roledescribe,
              id: this.$route.query.id
            }).then(res => {
              if (res.data.code == '200') {
                this.$message({
                  message: this.$t('zdata.bjcg'),
                  type: 'success',
                  offset: 102
                })
                this.$router.go(-1)
                // this.$store.commit('loading/SET_LOADING')
              } else {
                // this.$store.commit('loading/SET_LOADING')
              }
              console.log(res)
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
  }
}
