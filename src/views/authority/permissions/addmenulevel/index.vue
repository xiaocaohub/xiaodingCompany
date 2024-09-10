<template>
  <div class="container">
    <div class="add-menu">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="picture-ruleForm"
        label-width="90px"
      >
        <el-form-item
          :label="$t('permissions.addmenulevel.cddj')"
          prop="menulevel"
        >
          <el-select
            class="select-input"
            v-model="ruleForm.menulevel"
            :placeholder="$t('permissions.addmenulevel.qsrcddj')"
          >
            <el-option
              v-for="(item, index) in menuLevelList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('permissions.addmenulevel.cdmc')"
          prop="menuname"
        >
          <el-input
            v-model="ruleForm.menuname"
            :placeholder="$t('permissions.addmenulevel.qsrcdmc')"
          ></el-input>
        </el-form-item>
        <el-form-item label="path" prop="path">
          <el-input
            v-model="ruleForm.path"
            :placeholder="$t('permissions.addmenulevel.qsrpath')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('permissions.addmenulevel.sfhx')"
          prop="is_core"
        >
          <el-radio-group v-model="ruleForm.is_core">
            <el-radio
              v-for="label in coreList"
              :label="label.value"
              :key="label.value"
              >{{ label.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$t('permissions.addmenulevel.sjcd1')"
          prop="superiorclass"
          v-if="inputShow !== 1"
        >
          <div class="superior">
            <el-select
              v-show="inputShow >= 2"
              class="select-input"
              v-model="ruleForm.select_2"
              :placeholder="$t('permissions.addmenulevel.qxzyj')"
            >
              <el-option
                v-for="(item, index) in options1"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-show="inputShow >= 3"
              class="select-input"
              v-model="ruleForm.select_3"
              :placeholder="$t('permissions.addmenulevel.qxzej')"
            >
              <el-option
                v-for="(item, index) in options2"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
            <el-select
              v-show="inputShow >= 4"
              class="select-input"
              v-model="ruleForm.select_4"
              :placeholder="$t('permissions.addmenulevel.qxzsj')"
            >
              <el-option
                v-for="(item, index) in options3"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item
          :label="$t('permissions.addmenulevel.cddz')"
          prop="menulocal"
          v-if="inputShow !== 1"
        >
          <el-input
            v-model="ruleForm.menulocal"
            :placeholder="$t('permissions.addmenulevel.qsrcddz')"
          ></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('permissions.addmenulevel.dljj')"
          prop="tourintroduction"
          v-if="inputShow !== 1"
        >
          <el-input
            v-model="ruleForm.tourintroduction"
            :placeholder="$t('permissions.addmenulevel.qsrdljj')"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="upload-img"
          :label="$t('permissions.addmenulevel.mrtb')"
          prop="defaultLogo"
          v-if="inputShow === 1"
        >
          <l-upload
            :limit="1"
            v-model="ruleForm.defaultLogo"
            :text="$t('permissions.addmenulevel.zdsc')"
          >
          </l-upload>
        </el-form-item>
        <el-form-item
          class="upload-img"
          :label="$t('permissions.addmenulevel.xztb')"
          prop="selectLogo"
          v-if="inputShow === 1"
        >
          <l-upload
            :limit="1"
            v-model="ruleForm.selectLogo"
            :text="$t('permissions.addmenulevel.zdsc')"
          >
          </l-upload>
        </el-form-item>
        <div class="form-footer">
          <el-form-item>
            <el-button
              class="bgColor"
              type="primary"
              @click="submitForm('ruleForm')"
              >{{ $t('DemoPage.tableFromPage.save') }}</el-button
            >
            <el-button class="bdColor" @click="$router.go(-1)" plain>{{
              $t('DemoPage.tableFromPage.cancel')
            }}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { addMenuInfo, getMenuLeveInfo } from '@/api/Platform/permissions'
export default {
  name: 'addmenulevel',

  data () {
    return {
      ruleForm: {
        menulevel: 1,
        menuname: '',
        path: '',
        is_core: 0,
        select_2: '',
        select_3: '',
        select_4: '',
        menulocal: '',
        tourintroduction: '',
        defaultLogo: '',
        selectLogo: ''
      },

      rules: {
        menutype: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qsrcdlx'),
            trigger: 'change'
          }
        ],
        menulevel: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qsrcddj'),
            trigger: 'change'
          }
        ],
        menuname: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qsrcdmc'),
            trigger: 'blur'
          }
        ],
        path: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qsrpath'),
            trigger: 'blur'
          }
        ],
        is_core: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qxzsfhx'),
            trigger: 'change'
          }
        ],
        isButton: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qxzsfqx'),
            trigger: 'change'
          }
        ],
        menulocal: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qsrcddz'),
            trigger: 'blur'
          }
        ],
        defaultLogo: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qscmrtb'),
            trigger: 'change'
          }
        ],
        selectLogo: [
          {
            required: true,
            message: this.$t('permissions.addmenulevel.qscxztb'),
            trigger: 'change'
          }
        ]
      },

      inputShow: 1,

      coreList: [
        {
          value: 1,
          label: this.$t('permissions.addmenulevel.yes')
        },
        {
          value: 0,
          label: this.$t('permissions.addmenulevel.no')
        }
      ],

      menuLevelList: [
        {
          value: 1,
          label: this.$t('permissions.addmenulevel.yjcd')
        },
        {
          value: 2,
          label: this.$t('permissions.addmenulevel.ejcd')
        },
        {
          value: 3,
          label: this.$t('permissions.addmenulevel.sjcd')
        },
        {
          value: 4,
          label: this.$t('permissions.addmenulevel.sijcd')
        }
      ],

      options1: [],

      options2: [],

      options3: [],

      options4: []
    }
  },

  watch: {
    'ruleForm.defaultLogo' () {
      if (this.ruleForm.defaultLogo) {
        this.$refs.ruleForm.clearValidate('defaultLogo')
      }
    },

    'ruleForm.selectLogo' () {
      if (this.ruleForm.selectLogo) {
        this.$refs.ruleForm.clearValidate('selectLogo')
      }
    },

    'ruleForm.menulevel' () {
      if (this.ruleForm.menulevel === 2) {
        this.inputShow = 2
        this.ruleForm.select_3 = ''
        this.ruleForm.select_4 = ''
      } else if (this.ruleForm.menulevel === 3) {
        this.inputShow = 3
        this.ruleForm.select_4 = ''
      } else if (this.ruleForm.menulevel === 4) {
        this.inputShow = 4
      } else {
        this.inputShow = 1
        this.ruleForm.select_2 = ''
        this.ruleForm.select_3 = ''
        this.ruleForm.select_4 = ''
      }
    },

    'ruleForm.select_2' (newVal, oldVal) {
      if (oldVal) {
        this.ruleForm.select_3 = ''
        this.ruleForm.select_4 = ''
      }
      getMenuLeveInfo({
        api: 'mch.Mch.Menu.GetMenuList',
        pageSize: 100,
        sid: newVal
      }).then(res => {
        this.options2 = res.data.data.list
      })
    },

    'ruleForm.select_3' (newVal, oldVal) {
      console.log(newVal)
      if (oldVal) {
        this.ruleForm.select_4 = ''
      }
      getMenuLeveInfo({
        api: 'mch.Mch.Menu.GetMenuList',
        pageSize: 100,
        sid: newVal
      }).then(res => {
        this.options3 = res.data.data.list
      })
    },

    'ruleForm.select_4' (newVal) {
      console.log(newVal)
      this.ruleForm.select_5 = ''
      getMenuLeveInfo({
        api: 'mch.Mch.Menu.GetMenuList',
        pageSize: 100,
        sid: newVal
      }).then(res => {
        this.options4 = res.data.data.list
      })
    }
  },

  created () {
    this.getMenuLeveInfos()
    if (this.$route.query.menulevel) {
      this.ruleForm.menulevel = this.$route.query.menulevel
      if (this.$route.query.menulevel == 2) {
        getMenuLeveInfo({
          api: 'mch.Mch.Menu.GetMenuList',
          pageSize: 100,
          id: this.$route.params.id
        }).then(res => {
          this.ruleForm.select_2 = res.data.data.list[0].id
        })
      } else if (this.$route.query.menulevel == 3) {
        getMenuLeveInfo({
          api: 'mch.Mch.Menu.GetMenuList',
          pageSize: 100,
          id: this.$route.params.sid
        }).then(res => {
          this.ruleForm.select_2 = res.data.data.list[0].id
          this.ruleForm.select_3 = this.$route.params.id
        })
      } else if (this.$route.query.menulevel == 4) {
        getMenuLeveInfo({
          api: 'mch.Mch.Menu.GetMenuList',
          pageSize: 100,
          id: this.$route.params.sid
        }).then(res => {
          console.log(res)
          this.ruleForm.select_2 = res.data.data.list[0].sid
          this.ruleForm.select_3 = res.data.data.list[0].id
          this.ruleForm.select_4 = this.$route.params.id
        })
      }
    }
  },

  methods: {
    // 获取等级菜单列表
    async getMenuLeveInfos () {
      const res = await getMenuLeveInfo({
        api: 'mch.Mch.Menu.GetMenuList',
        pageSize: 100
      })
      console.log(res)
      this.options1 = res.data.data.list
      console.log(this.options1)
    },

    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.ruleForm)
        if (valid) {
          try {
            this.$store.commit('loading/SET_LOADING')
            if (this.inputShow === 1) {
              addMenuInfo({
                api: 'mch.Mch.Menu.AddMenu',
                level: this.ruleForm.menulevel,
                menuName: this.ruleForm.menuname,
                path: this.ruleForm.path,
                menuUrl: this.ruleForm.menulocal,
                defaultLogo: this.ruleForm.defaultLogo,
                checkedLogo: this.ruleForm.selectLogo,
                isDisplay: this.ruleForm.is_core
              }).then(res => {
                if (res.data.code == '200') {
                  console.log(res)
                  this.$message({
                    message: this.$t('zdata.tjcg'),
                    type: 'success',
                    offset: 100
                  })
                  this.$router.go(-1)
                  this.$store.commit('loading/SET_LOADING')
                } else {
                  this.$store.commit('loading/SET_LOADING')
                }
              })
            } else {
              addMenuInfo({
                api: 'mch.Mch.Menu.AddMenu',
                level: this.ruleForm.menulevel,
                menuName: this.ruleForm.menuname,
                path: this.ruleForm.path,
                fatherMenuId: this.getfatherMenuId(this.inputShow),
                menuUrl: this.ruleForm.menulocal,
                text: this.ruleForm.tourintroduction,
                isDisplay: this.ruleForm.is_core
              }).then(res => {
                if (res.data.code == '200') {
                  console.log(res)
                  this.$message({
                    message: this.$t('zdata.tjcg'),
                    type: 'success',
                    offset: 100
                  })
                  this.$router.go(-1)
                  this.$store.commit('loading/SET_LOADING')
                } else {
                  this.$store.commit('loading/SET_LOADING')
                }
              })
            }
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
    },

    getfatherMenuId (value) {
      if (this.inputShow === 2) {
        return this.ruleForm.select_2
      } else if (this.inputShow === 3) {
        if (this.ruleForm.select_3 === '') {
          return this.ruleForm.select_2
        } else {
          return this.ruleForm.select_3
        }
      } else if (this.inputShow === 4) {
        if (this.ruleForm.select_4 === '') {
          return this.ruleForm.select_3
        } else if (this.ruleForm.select_3 === '') {
          return this.ruleForm.select_2
        } else {
          return this.ruleForm.select_4
        }
      } else {
        if (this.ruleForm.select_5 === '') {
          return this.ruleForm.select_4
        } else if (this.ruleForm.select_4 === '') {
          return this.ruleForm.select_3
        } else if (this.ruleForm.select_3 === '') {
          return this.ruleForm.select_2
        } else {
          return this.ruleForm.select_5
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 737px;
  overflow: hidden;
  overflow-y: auto;
  background-color: #fff;
  padding: 40px 0 20px 0;
  color: #414658;
  border-radius: 4px;
  /deep/.add-menu {
    display: flex;
    justify-content: center;
    .el-form {
      .el-form-item {
        &:not(:last-child) {
          .el-form-item__content {
            margin-left: 0px !important;
          }
        }
        display: flex;
        .el-form-item__content {
          width: 580px;
        }
        .select-input {
          width: 580px;
          height: 40px;
        }
      }

      .superior {
        display: flex;
        width: 580px;
        .el-select {
          width: auto;
          // max-width: 100%;
          flex: 1;
          &:not(:first-child) {
            margin-left: 8px;
          }
          .el-input {
            width: auto;
            // max-width: 100%;
          }
        }
      }

      .upload-img {
        .el-form-item__error {
          top: 78px;
        }
      }
    }
  }

  /deep/.el-form-item__label {
    font-weight: normal;
  }
}
</style>
