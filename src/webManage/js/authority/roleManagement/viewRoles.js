import {
  getUserRoleInfo,
  getRoleListInfo
} from '@/api/authority/roleManagement'
export default {
  name: 'viewRoles',

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
          { required: true, message: '请填角色名称', trigger: 'blur' }
        ],
        roledescribe: [
          { required: true, message: '请填角色描述', trigger: 'blur' }
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

    this.getUserRoleInfos()
    this.getRoleListInfos()
    setTimeout(function () {
      that.idList.forEach(item => {
        that.$refs.tree.setChecked(item, true, false)
      })
    }, 500)
    this.checkChnage(this.treeData)
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
      this.checkChnage(this.treeData)
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

    checkChnage (value) {
      for (var i = 0; i < value.length; i++) {
        var children = value[i].children
        if (children != undefined) {
          this.checkChnage(children)
        }
        value[i].disabled = true
      }
    }
  }
}
