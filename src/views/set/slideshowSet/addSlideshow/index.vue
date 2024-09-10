<template>
  <div class="container">
    <div class="store-info">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          class="goods-img"
          required
          :label="$t('addSlideshow.lbt')"
          prop="img"
        >
          <l-upload :limit="1" v-model="ruleForm.img" text=""> </l-upload>
        </el-form-item>
        <el-form-item :label="$t('addSlideshow.tzlx')" prop="Jump_type">
          <el-select
            class="select-input"
            v-model="ruleForm.Jump_type"
            :placeholder="$t('addSlideshow.qxztz')"
          >
            <el-option
              v-for="(item, index) in JumpTypeList"
              :key="index"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('addSlideshow.lj')"
          prop="link"
          v-if="ruleForm.Jump_type !== 3"
        >
          <el-select
            class="select-input"
            v-model="ruleForm.link"
            :placeholder="$t('addSlideshow.qxzlj')"
          >
            <el-option
              v-for="(item, index) in linkList"
              :key="index"
              :label="item.name"
              :value="item.parameter"
            >
              <p @click="getName(item)">{{ item.name }}</p>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('addSlideshow.lj')" v-else>
          <el-input v-model="baseUrl" disabled required> </el-input>
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
import { bannerPathList, addBannerInfo } from '@/api/set/slideshowSet'
export default {
  name: 'addSlideshow',

  data () {
    return {
      ruleForm: {
        img: '',
        Jump_type: '',
        link: ''
      },
      rules: {
        img: [
          {
            required: true,
            message: this.$t('addSlideshow.qsclb'),
            trigger: 'change'
          }
        ],
        Jump_type: [
          {
            required: true,
            message: this.$t('addSlideshow.qxztz'),
            trigger: 'change'
          }
        ],
        link: [
          {
            required: true,
            message: this.$t('addSlideshow.qxzlj'),
            trigger: 'change'
          }
        ]
      },

      JumpTypeList: [
        {
          value: 1,
          name: this.$t('addSlideshow.fl')
        },
        {
          value: 2,
          name: this.$t('addSlideshow.sp')
        },
        {
          value: 3,
          name: this.$t('addSlideshow.sy')
        }
      ], //跳转类型

      linkList: [], //链接
      baseUrl: '',
      name: ''
    }
  },

  watch: {
    'ruleForm.Jump_type': {
      handler () {
        this.ruleForm.link = ''
        this.linkList = []
        if (this.ruleForm.Jump_type !== 3) {
          bannerPathList({
            api: 'mch.Mch.Set.BannerPathList',
            type: this.ruleForm.Jump_type
          }).then(res => {
            console.log(res)
            this.linkList = res.data.data.list
          })
        }
        if (this.ruleForm.Jump_type == 1) {
          this.baseUrl = '/pagesC/goods/goods?cid='
        } else if (this.ruleForm.Jump_type == 2) {
          this.baseUrl = '/pagesC/goods/goodsDetailed?pro_id='
        } else {
          this.baseUrl = '/pages/tabBar/home'
        }
      }
    }
  },

  created () {},

  methods: {
    getName (item) {
      if (this.ruleForm.Jump_type == 1) {
        this.name = item.name
      }
    },

    submitForm () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          addBannerInfo({
            api: 'mch.Mch.Set.AddBannerInfo',
            imageUrl: this.ruleForm.img,
            type: this.ruleForm.Jump_type,
            path:
              this.ruleForm.Jump_type == 1
                ? this.baseUrl +
                  this.ruleForm.link.split('=')[1] +
                  '&name=' +
                  this.name
                : this.ruleForm.Jump_type == 2
                ? this.baseUrl + this.ruleForm.link.split('=')[1]
                : this.baseUrl
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.tjcg'),
                offset: 100
              })
              this.$router.go(-1)
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
  .store-info {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    border-radius: 4px;
    /deep/.el-form {
      .el-form-item {
        margin-bottom: 20px;
      }
      .el-form-item__label {
        font-weight: normal;
      }
      .select-input {
        width: 580px;
      }
    }
  }
}
</style>
