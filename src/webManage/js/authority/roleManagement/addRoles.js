import {
  getUserRoleInfo,
  addUserRoleMenu
} from '@/api/authority/roleManagement'
export default {
  name: 'addRoles',

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
      // defaultProps: {
      //   children: 'zones',
      //   label: 'leaf'
      // },
      idList: []
    }
  },

  created () {
    this.language = this.getCookit()

    this.getUserRoleInfos()
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
    async getUserRoleInfos () {
      const res = await getUserRoleInfo({
        api: 'mch.Mch.Authority.GetUserAuthorityTree',
        roleId: 0
      })
      console.log(res)
      this.treeData = res.data.data.list
      console.log(res)
    },

    filterNode (value) {
      if (value && value[0]) {
        filterNode(value.children)
      } else {
        value.children = []
      }
    },

    handleCheckChange () {
      let res = this.$refs.tree.getCheckedNodes()
      let arr = []
      res.forEach(item => {
        arr.push(item.id)
      })
      console.log(arr)
      this.idList = res.map(item => {
        return item.id
      })
      this.ruleForm.rolelist = this.idList
      console.log(this.idList)
    },

    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.ruleForm)
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
            this.$store.commit('loading/SET_LOADING')
            addUserRoleMenu({
              api: 'mch.Mch.Authority.AddRole',
              roleIdTree: this.idList.join(),
              name: this.ruleForm.rolename,
              describe: this.ruleForm.roledescribe
            }).then(res => {
              if (res.data.code == '200') {
                this.$message({
                  message: this.$t('zdata.tjcg'),
                  type: 'success',
                  offset: 102
                })
                this.$router.go(-1)
                this.$store.commit('loading/SET_LOADING')
              } else {
                this.$store.commit('loading/SET_LOADING')
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
  }
}
