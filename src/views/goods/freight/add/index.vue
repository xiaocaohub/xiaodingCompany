<template>
  <div class="container">
    <div class="header">
      <span>添加模板</span>
    </div>

    <el-form
      :model="ruleForm"
      :rules="rule"
      ref="ruleForm"
      class="form-search"
      label-width="120px"
      style="overflow: auto"
    >
      <div class="notice">
        <el-form-item class="title" label="模板名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入模板名称"
            :disabled="disabled"
          ></el-input>
        </el-form-item>
        <el-form-item class="title" label="计算方式" prop="type">
          <el-select
            v-model="ruleForm.type"
            placeholder="请选择"
            :disabled="disabled"
          >
            <el-option label="默认" value="2"></el-option>
            <el-option label="件" value="0"></el-option>
            <el-option label="重量" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="rule-block" required label="模板规则">
          <div class="add-rule">
            <el-button
              class="bgColor"
              @click="dialogShow"
              type="primary"
              :disabled="disabled"
              >添加规则</el-button
            >
          </div>
        </el-form-item>
        <div class="el-form-item" v-if="ruleForm.list.length !== 0">
          <div class="dictionary-list" v-if="ruleForm.list.length !== 0">
            <el-table
              :data="ruleForm.list"
              ref="table"
              class="el-table"
              style="width: 100%"
              :rules="rules2"
              :header-cell-style="tableHeaderColor"
              :cell-style="{ textAlign: 'center' }"
            >
              <el-table-column
                prop="one"
                label="首件重量(kg)"
                v-if="ruleForm.type == 1"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="disabled"
                    v-model="scope.row.one"
                    style="width: 80px; margin: 0 10px; padding-right: 0"
                    @keyup.native="scope.row.one = oninput(scope.row.one, 2)"
                    @input="
                      if (scope.row.one < 0) {
                        scope.row.one = 0
                      }
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="one"
                label="首件数量"
                v-if="ruleForm.type == 0"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="disabled"
                    v-model="scope.row.one"
                    style="width: 80px; margin: 0 10px; padding-right: 0"
                    @keyup.native="scope.row.one = oninput2(scope.row.one)"
                    @input="
                      if (Number(scope.row.one) <= 0) {
                        scope.row.one = 1
                      } else {
                        scope.row.one = Math.floor(scope.row.one)
                      }
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="freight"
                label="首件运费(元)"
                v-if="ruleForm.type == 1 || ruleForm.type == 0"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="disabled"
                    v-model="scope.row.freight"
                    style="width: 80px; margin: 0 10px; padding-right: 0"
                    @keyup.native="
                      scope.row.freight = oninput(scope.row.freight, 2)
                    "
                    @input="
                      if (scope.row.freight < 0) {
                        scope.row.freight = 0
                      }
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="two"
                label="续件重量(kg)"
                v-if="ruleForm.type == 1"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="disabled"
                    v-model="scope.row.two"
                    style="width: 80px; margin: 0 10px; padding-right: 0"
                    @keyup.native="scope.row.two = oninput(scope.row.two, 2)"
                    @input="
                      if (scope.row.two < 0) {
                        scope.row.two = 0
                      }
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="two"
                label="续件数量"
                v-if="ruleForm.type == 0"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="disabled"
                    v-model="scope.row.two"
                    style="width: 80px; margin: 0 10px; padding-right: 0"
                    @keyup.native="scope.row.two = oninput2(scope.row.two)"
                    @input="
                      if (Number(scope.row.two) <= 0) {
                        scope.row.two = 1
                      } else {
                        scope.row.two = Math.floor(scope.row.two)
                      }
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="Tfreight"
                label="续件运费(元)"
                v-if="ruleForm.type == 1 || ruleForm.type == 0"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="disabled"
                    v-model="scope.row.Tfreight"
                    style="width: 80px; margin: 0 10px; padding-right: 0"
                    @keyup.native="
                      scope.row.Tfreight = oninput(scope.row.Tfreight, 2)
                    "
                    @input="
                      if (scope.row.Tfreight < 0) {
                        scope.row.Tfreight = 0
                      }
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column
                prop="freight"
                label="运费(元)"
                v-if="ruleForm.type == 2"
              >
                <template slot-scope="scope">
                  <el-input
                    :disabled="disabled"
                    v-model="scope.row.freight"
                    style="width: 80px; margin: 0 10px; padding-right: 0"
                    @keyup.native="
                      scope.row.freight = oninput(scope.row.freight, 2)
                    "
                    @input="
                      if (scope.row.freight < 0) {
                        scope.row.freight = 0
                      }
                    "
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="省份"> </el-table-column>
              <el-table-column label="操作" v-if="!disabled">
                <template slot-scope="scope">
                  <div class="OP-button">
                    <div class="OP-button-top">
                      <el-button
                        icon="el-icon-delete"
                        @click="Delete(scope.row, scope.$index)"
                        >删除</el-button
                      >
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- <el-form-item label="包邮设置">
              <el-switch
              :disabled="disabled"
                      v-model="ruleForm.is_package_settings"
                      active-value="1"
                      inactive-value="0"
                      active-color="#13ce66"
                      inactive-color="#EBEBF9">
              </el-switch>
              <div v-if="ruleForm.is_package_settings=='1'" style="background-color: #f4f7f9;padding: 20px;">
                  <div>
                      同件商品，满<el-input :disabled="disabled"  min="0" v-model="ruleForm.package_settings" style="width: 60px;margin: 0 10px;"></el-input>件，包邮
                  </div>
              </div>
          </el-form-item> -->
        <el-form-item label="指定不配送设置">
          <el-switch
            :disabled="disabled"
            v-model="ruleForm.is_no_delivery"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            inactive-color="#EBEBF9"
          >
          </el-switch>
          <div
            v-show="ruleForm.is_no_delivery == '1'"
            style="background-color: #f4f7f9; padding: 20px"
          >
            <el-select
              :disabled="disabled"
              style="width: 100%"
              v-model="no_delivery"
              multiple
              placeholder="请选择"
              @change="handleCitiesChange"
            >
              <el-option
                v-for="item in cities"
                :key="item.groupID"
                :label="item.g_CName"
                :value="item.groupID"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>
        <div class="footer-button">
          <el-button
            type="primary"
            class="footer-save bgColor mgleft"
            @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button
            plain
            class="footer-cancel fontColor"
            @click="$router.go(-1)"
            >取消</el-button
          >
        </div>
      </div>
    </el-form>
    <div class="dialog-block">
      <!-- 弹框组件 -->
      <el-dialog
        title="添加运费规则"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <el-form
          :model="ruleForm2"
          :rules="rules2"
          ref="ruleForm2"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- <el-form-item label="运费" prop="freight">
            <el-input v-model="ruleForm2.freight" @blur="Regfreight" @keyup.native="ruleForm2.freight = oninput2(ruleForm2.freight)"></el-input>
          </el-form-item> -->
          <el-form-item class="check-provinces" label="选择省份" prop="status">
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <el-checkbox-group
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="city in cities"
                :label="city.g_CName"
                :key="city.g_CName"
                >{{ city.g_CName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
          <div class="form-footer">
            <el-form-item>
              <el-button class="bgColor" @click="dialogVisible = false"
                >取 消</el-button
              >
              <el-button
                class="bdColor"
                type="primary"
                @click="determine('ruleForm2')"
                >确 定</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { addFreight, getRegion } from '@/api/goods/freightManagement'
import request from '@/api/https'
import { getStorage } from '@/utils/storage'
export default {
  name: 'addtemplate',

  data () {
    return {
      id: '',
      ruleForm: {
        name: '',
        type: '2',
        is_package_settings: '0',
        package_settings: '',
        is_no_delivery: '0',

        list: []
      },
      yixuanT: [],
      yixuanD: [],
      mycities: [],
      no_delivery: [],

      rule: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        type: [{ required: true, message: '请输入模板名称', trigger: 'blur' }]
      },

      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      // 弹框数据
      dialogVisible: false,
      ruleForm2: {
        // freight: null,
      },
      rules2: {
        // freight: [
        //   { required: true, message: '请填设置运费', trigger: 'blur' }
        // ],
        // freight: [
        //   { required: true, message: '请填设置运费', trigger: 'blur' }
        // ],
        // freight: [
        //   { required: true, message: '请填设置运费', trigger: 'blur' }
        // ],
        // freight: [
        //   { required: true, message: '请填设置运费', trigger: 'blur' }
        // ],
        // freight: [
        //   { required: true, message: '请填设置运费', trigger: 'blur' }
        // ],
        // freight: [
        //   { required: true, message: '请填设置运费', trigger: 'blur' }
        // ],
      },
      disabled: false
    }
  },

  created () {
    this.getRegions()
    console.log(this.$route.query.id)
    if (this.$route.query.id) {
      this.id = this.$route.query.id
      this.getdata(this.id)
    }
    if (this.$route.query.name == 'view') {
      this.disabled = true
    }
  },

  watch: {
    checkAll () {
      if (this.checkAll === true) {
        this.cities.forEach(item => {
          this.checkedCities.push(item.g_CName)
        })
      }
    },

    checkedCities: {
      handler: function () {
        if (this.checkedCities.length === this.cities.length) {
          this.checkAll = true
          this.isIndeterminate = false
        }
      }
    }
  },

  methods: {
    // 获取城市列表
    async getRegions (e) {
      request({
        method: 'post',
        params: {
          api: 'admin.goods.getRegion',
          level: 2
        }
      }).then(res => {
        this.cities = res.data.data
        this.mycities = res.data.data
      })
    },
    // Regfreight(){
    //   if(Number(this.ruleForm2.freight) < 0){
    //     this.$message({
    //       message:'运费不能为负数',
    //       type:'warning',
    //       offset:100
    //     })
    //     return this.ruleForm2.freight = 0
    //   }else return
    // },

    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #f4f7f9;textAlign: center;'
      }
    },

    handleCheckAllChange (val) {
      if (val) {
        // this.cities.forEach(item=>{
        //   this.checkedCities.push(item.g_CName)
        // })
      } else {
        this.checkedCities = []
      }
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      this.checkedCities = [...new Set(this.checkedCities)]
      let values = [...new Set(value)]

      let checkedCount = values.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length
    },
    handleCitiesChange (value) {
      console.log(value)
      this.yixuanD = value
      this.yixuan()
    },
    Delete (value, index) {
      console.log(value.name.split(','))
      // this.cities = this.cities.concat(value.name.split(","))
      this.yixuanT = this.yixuanT.filter(item => {
        if (!value.name.split(',').includes(item)) {
          return item
        }
      })
      this.yixuan()
      this.ruleForm.list.splice(index, 1)
    },

    // 弹框方法
    dialogShow () {
      this.isIndeterminate = false
      if (this.cities.length == 0 && this.ruleForm.list.length !== 0) {
        this.$message({
          message: '添加失败，地区运费规则已全部设置!',
          type: 'error',
          offset: 100
        })
      } else {
        this.dialogVisible = true
      }
      this.checkedCities = []
      // this.mycities
      if (this.ruleForm.list.length === 0) {
        // this.getRegions().then(() => {
        //   this.checkAll = false;
        // });
      }
    },

    handleClose (done) {
      this.dialogVisible = false
      this.$refs['ruleForm2'].clearValidate()
    },
    yixuan () {
      console.log(this.yixuanT, this.yixuanD)
      this.cities = this.mycities.filter(item => {
        if (!this.yixuanT.includes(item.g_CName)) {
          return item.g_CName
        }
      })

      this.cities = this.cities.filter(item => {
        if (!this.yixuanD.includes(item.groupID)) {
          return item.groupID
        }
      })
      this.cities
      console.log(this.cities)
    },
    determine (formName) {
      this.$refs[formName].validate(async valid => {
        if (this.checkedCities.length == 0) {
          this.$message({
            message: '请选择省份',
            type: 'error',
            offset: 100
          })
        } else {
          if (valid) {
            try {
              var obj = {
                // one: this.ruleForm2.freight?this.ruleForm2.freight:'2',
                // freight: this.ruleForm2.freight,
                // two: this.ruleForm2.freight,
                // Tfreight:'',
                one: 1,
                freight: 1,
                two: 1,
                Tfreight: 1,
                name: this.checkedCities.join()
              }
              this.ruleForm.list.push(obj)
              console.log(this.checkedCities)
              // this.cities = this.cities.filter(item => {
              //   if (!this.checkedCities.includes(item.g_CName)) {
              //     return item.g_CName
              //   }
              // })
              this.yixuanT = [...this.yixuanT, ...this.checkedCities]
              this.yixuan()
              ;(this.ruleForm2.freight = null), this.handleClose()
            } catch (error) {
              // this.$message({
              //   message: '数据名称不能为空',
              //   type: 'error',
              //   offset: 100
              // })
            }
          } else {
            // this.$message({
            //   message: '数据名称不能为空',
            //   type: 'error',
            //   offset: 100
            // })
            // return false;
          }
        }
      })
    },

    // 添加运费
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        console.log(this.ruleForm)
        let arr = []
        this.no_delivery.forEach(element => {
          arr.push([element + ''])
        })
        console.log(this.ruleForm.list)
        if (valid) {
          try {
            if (this.ruleForm.name.length > 20) {
              this.$message({
                message: '模板名称长度不能大于20个字符',
                type: 'error',
                offset: 100
              })
              return
            }

            if (this.ruleForm.is_no_delivery == 1) {
              if (arr == '') {
                this.$message({
                  message: '添加失败，请填写完整!',
                  type: 'error',
                  offset: 100
                })
                return
              }
            }

            if (this.ruleForm.list.length == 0) {
              this.$message({
                message: '添加失败，模板规则不能为空，请添加模板规则!',
                type: 'error',
                offset: 100
              })
              return
            }
            let myerr = false
            outer: for (let i = 0; i < this.ruleForm.list.length; i++) {
              for (let key in this.ruleForm.list[i]) {
                console.log(this.ruleForm.list[i])
                if (this.ruleForm.list[i][key] == '') {
                  this.$message({
                    message: '添加失败，请填写完整!',
                    type: 'error',
                    offset: 100
                  })
                  myerr = true
                  break outer
                }
              }
            }
            if (myerr) {
              return
            }
            // return

            addFreight({
              api: 'mch.Mch.Freight.AddFreight',
              id: this.id,
              name: this.ruleForm.name,
              type: this.ruleForm.type,
              is_package_settings: this.ruleForm.is_package_settings,
              package_settings: this.ruleForm.package_settings,
              is_no_delivery: this.ruleForm.is_no_delivery,
              no_delivery: encodeURIComponent(JSON.stringify(arr)),
              hiddenFreight: encodeURIComponent(
                JSON.stringify(this.ruleForm.list)
              )
            }).then(res => {
              if (res.data.code == '200') {
                console.log(res)
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  offset: 100
                })
                console.log(this.ruleForm.list)
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
    },
    getdata (id) {
      request({
        method: 'post',
        params: {
          api: 'mch.Mch.Freight.GetFreightInfo',
          fid: id,
          mchId: getStorage('mchId')
        }
      }).then(res => {
        console.log(res)
        this.ruleForm = res.data.data

        if (res.data.data.freight) {
          res.data.data.freight.forEach(item => {
            this.yixuanT = [...this.yixuanT, ...item.name.split(',')]
          })
        }

        if (res.data.data.no_delivery) {
          res.data.data.no_delivery.forEach(item => {
            this.no_delivery.push(item[0])
          })
        }
        setTimeout(() => {
          this.yixuanD = [...this.yixuanD, ...this.no_delivery]
          this.yixuan()
        }, 1000)

        // this.no_delivery=res.data.data.no_delivery
        console.log(this.no_delivery)
      })
    }
    // oninput2(num, limit) {
    //   var str = num
    //   str = str.replace(/[^\.\d]/g,'');
    //   str = str.replace('.','');

    //   return str
    // },
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 737px;
  background-color: #fff;
  border-radius: 4px;
  .header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border-bottom: 1px solid #e9ecef;
    span {
      font-size: 16px;
      font-weight: 400;
      color: #414658;
    }
  }

  /deep/.el-form {
    width: 100%;
    .notice {
      padding: 40px 0 0 60px;
      display: flex;
      flex-direction: column;
      margin-left: 50%;
      transform: translateX(-50%);
      .title {
        .el-form-item__label {
          font-weight: normal;
        }
        .el-form-item__label {
          color: #414658;
        }
        .el-form-item__content {
          display: flex;
          input {
            width: 420px;
            height: 40px;
          }
        }
      }

      .dictionary-list {
        width: 800px;
        border-radius: 4px;
        margin-left: 90px;
        /deep/.el-table {
          width: 800px !important;
          .el-table__header-wrapper {
            width: 800px;
            background-color: #f4f7f9 !important;
            .el-table__header {
              width: 800px !important;
              background-color: #f4f7f9 !important;
            }
            thead {
              tr {
                background-color: #f4f7f9 !important;
                th {
                  height: 61px;
                  text-align: center;
                  font-size: 14px;
                  font-weight: bold;
                  color: #414658;
                  background-color: #f4f7f9 !important;
                }
              }
            }
          }
          .el-table__body-wrapper {
            width: 800px;
            background-color: #f4f7f9;
            .el-table__body {
              width: 800px !important;
            }
            tbody {
              tr {
                td {
                  height: 92px;
                  text-align: center;
                  font-size: 14px;
                  color: #414658;
                  font-weight: 400;
                  padding: 0;
                }
              }
            }
          }

          .OP-button {
            button {
              padding: 5px;
              height: 22px;
              background: #ffffff;
              border: 1px solid #d5dbe8;
              border-radius: 2px;
              font-size: 12px;
              font-weight: 400;
              color: #888f9e;
            }
            button:hover {
              border: 1px solid rgb(64, 158, 255);
              color: rgb(64, 158, 255);
            }
            button:hover i {
              color: rgb(64, 158, 255);
            }
            .OP-button-top {
              // margin-bottom: 8px;
              button {
                &:not(:first-child) {
                  margin-left: 8px !important;
                }
              }
            }
          }
        }
      }
    }

    .footer-button {
      margin-left: 90px;
      button {
        width: 70px;
        height: 40px;
      }
    }
  }

  .dialog-block {
    // 弹框样式
    /deep/.el-dialog {
      width: 680px;
      height: 630px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
      .el-dialog__header {
        width: 100%;
        height: 58px;
        line-height: 58px;
        font-size: 16px;
        margin-left: 19px;
        font-weight: bold;
        border-bottom: 2px solid #e9ecef;
        box-sizing: border-box;
        margin: 0;
        padding: 0 0 0 19px;
        .el-dialog__headerbtn {
          font-size: 18px;
          top: 0 !important;
        }
        .el-dialog__title {
          font-weight: normal;
        }
      }

      .el-dialog__body {
        padding: 41px 0px 0px 0px !important;
        // border-bottom: 1px solid #E9ECEF;
        .check-provinces {
          .el-checkbox {
            width: 120px;
            height: 30px;
            margin-right: 14px;
          }
          .el-form-item__content {
            padding-top: 5px;
          }
        }
        .el-form-item__content {
          line-height: 30px;
        }
        .el-form-item {
          margin-bottom: 12px;
        }
        .el-form-item__label {
          font-weight: normal;
        }
        .el-input__inner {
          width: 304px;
          height: 40px;
        }
        .form-footer {
          width: 100%;
          height: 72px;
          position: absolute;
          bottom: 0;
          right: 0;
          border-top: 1px solid #e9ecef;
          .el-form-item {
            padding: 0 !important;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            margin-right: 17px;
            .el-form-item__content {
              height: 100%;
              line-height: 72px;
              margin: 0 !important;
            }
          }
          .bgColor:hover {
            background-color: #fff;
            color: #2890ff;
            border: 1px solid #2890ff;
          }
        }
      }
    }
  }
}
/deep/.el-input__inner {
  padding-right: 0;
}
</style>
