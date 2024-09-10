<template>
  <div class="container">
    <div class="operation-prompt">
      <div class="logo">
        <img src="@/assets/imgs/czts.png" alt="" @error="handleErrorImg" />
        <span>{{$t('bulkShipment.zcsm')}}</span>
      </div>
      <div class="prompt-content">
        <p>{{$t('bulkShipment.wenzi1')}}</p>
        <p>{{$t('bulkShipment.wenzi2')}}</p>
      </div>
    </div>
    <div class="add-bank">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item class="Select" :label="$t('bulkShipment.scmb')" prop="template">
          <el-upload
            :disabled="tag"
            class="upload-demo"
            drag
            accept=".xlsx,.xls"
            action=""
            data=""
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleUploadSuccess"
            :on-change="changes"
            multiple
          >
            <i class="el-icon-upload" v-show="!file"></i>
            <div class="el-upload__text" v-show="!file">{{$t('bulkShipment.djscwj')}}</div>
            <i class="el-icon-document" v-show="file"></i>
            <div class="el-upload__text" v-show="file">
              {{ fileName
              }}<span class="del" @click.stop="clearFile">{{$t('zdata.sc')}}</span>
            </div>
          </el-upload>
          <span class="uploads"
            ><a href="./batchShipment.xlsx">{{$t('bulkShipment.xzplf')}}</a></span
          >
        </el-form-item>
        <div class="form-footer">
          <el-form-item>
            <el-button
              class="bgColor"
              type="primary"
              @click="submitForm('ruleForm')"
              >{{$t('bulkShipment.fh')}}</el-button
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
import { batchDelivery } from '@/api/order/sendGoods'
import { getStorage } from '@/utils/storage'
import Config from '@/packages/apis/Config'
import ErrorImg from '@/assets/images/default_picture.png'

let actionUrl = Config.baseUrl
export default {
  name: 'applyWithdrawal',

  data () {
    return {
      actionUrl,
      ruleForm: {
        template: ''
      },
      rules: {},
      file: null,
      fileName: '',
      tag: false,
      base: ''
    }
  },

  computed: {
    uploadData () {
      {
        return {
          api: 'mch.Mch.Order.BatchDelivery',
          storeId: getStorage('rolesInfos').storeId,
          accessId: getStorage('token')
        }
      }
    }
  },

  created () {
    this.rules={
        template: [{ required: true, message: this.$t('bulkShipment.qscmb'), trigger: 'change' }]
      }
    // this.getBase()
  },

  methods: {
    // 图片错误处理
    handleErrorImg (e) {
      console.log('图片报错了', e.target.src)
      e.target.src = ErrorImg
    },
    // getBase() {
    //     if (process.env.NODE_ENV == 'development') {
    //         this.base = process.env.VUE_APP_BASE + process.env.VUE_APP_IMAGE + '/public/%E6%89%B9%E9%87%8F%E5%8F%91%E8%B4%A7%E6%A8%A1%E6%9D%BF.xlsx'
    //     } else if (process.env.NODE_ENV == 'production') {
    //         this.base = process.env.VUE_APP_BASE + process.env.VUE_APP_IMAGE + '/public/%E6%89%B9%E9%87%8F%E5%8F%91%E8%B4%A7%E6%A8%A1%E6%9D%BF.xlsx'
    //     }
    // },
    // 上传之前的处理
    handleBeforeUpload (file) {
      this.fileName = file.name
      this.file = file
      this.tag = true
    },

    // 上传成功
    handleUploadSuccess (res) {
      console.log(res)
      if (res.code == '200') {
        this.$message({
          type: 'success',
          message: this.$t('bulkShipment.sccg'),
          offset: 100
        })
      } else {
        this.$message({
          type: 'error',
          message: res.message,
          offset: 100
        })
      }
    },

    changes () {},

    clearFile () {
      this.file = ''
      this.tag = false
    },

    submitForm () {
      if (!this.file) {
        this.$message({
          type: 'error',
          message: this.$t('bulkShipment.qscwj'),
          offset: 100
        })
      } else {
        this.$store.commit('loading/SET_LOADING')
        const formData = new FormData()
        formData.append('image', this.file)
        batchDelivery(formData).then(res => {
          if (res.data.data) {
            this.$message({
              type: 'success',
              message: this.$t('zdata.fhcg'),
              offset: 100
            })
            this.$router.go(-1)
            this.$store.commit('loading/SET_LOADING')
          } else {
            // this.$message({
            //     type: 'error',
            //     message: '发货失败，请前往批量发货记录查看原因',
            //     offset: 100
            // })
            this.$router.go(-1)
            this.$store.commit('loading/SET_LOADING')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .operation-prompt {
    width: 100%;
    height: 114px;
    background: #e9f4ff;
    border: 1px dashed #2890ff;
    border-radius: 4px;
    padding: 17px 0 0 17px;
    margin-bottom: 20px;
    .logo {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      img {
        width: 20px;
        height: 20px;
      }
      span {
        padding-left: 5px;
        font-size: 14px;
        font-weight: bold;
        color: #2890ff;
      }
    }
    .prompt-content {
      padding-left: 23px;
      p {
        color: #6a7076;
        &:not(:first-child) {
          margin-top: 8px;
        }
      }
    }
  }
  .add-bank {
    width: 100%;
    flex: 1;
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    /deep/.el-form {
      .el-form-item__label {
        font-weight: normal;
      }
      .Select {
        .el-form-item__content {
          line-height: 1;
          .upload-demo {
            width: 580px;
            height: 180px;
            margin-bottom: 20px;
            .el-upload {
              width: 580px;
              .el-upload-dragger {
                width: 580px;
                .el-icon-document {
                  font-size: 46px;
                  margin-top: 40px;
                  color: #c0c4cc;
                }
                .el-upload__text {
                  color: #414658;
                  .del {
                    color: #2890ff;
                    margin-left: 10px;
                  }
                }
                .el-icon-document {
                  margin-bottom: 20px;
                }
              }
            }
          }
          .uploads {
            color: #2890ff;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
