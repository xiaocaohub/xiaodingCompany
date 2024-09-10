<template>
  <div class="container">
    <div class="jump-list">
      <el-button
        class="bgColor"
        icon="el-icon-edit-outline"
        type="primary"
        @click="$router.push('/set/storesInfo/editorInfo')"
        >{{ $t('storesInfo.bjxx') }}</el-button
      >
      <el-button
        class="fontColor"
        @click="cancellation"
        icon="el-icon-document-delete"
        >{{ $t('storesInfo.dpzx') }}</el-button
      >
    </div>
    <div class="store-info">
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item
          class="goods-img"
          required
          :label="$t('storesInfo.dptx')"
          prop="headImg"
        >
          <l-upload
            disabled
            v-if="ruleForm.headImg"
            :limit="1"
            v-model="ruleForm.headImg"
            :text="$t('storesInfo.jy120')"
          >
          </l-upload>
        </el-form-item>
        <el-form-item
          class="goods-img"
          required
          :label="$t('storesInfo.dplg')"
          prop="logo"
        >
          <l-upload
            disabled
            v-if="ruleForm.logo"
            :limit="1"
            v-model="ruleForm.logo"
            :text="$t('storesInfo.jy64')"
          >
          </l-upload>
        </el-form-item>
        <el-form-item
          class="goods-img"
          required
          :label="$t('storesInfo.dpxct')"
          prop="posterImg"
        >
          <l-upload
            disabled
            v-if="ruleForm.posterImg"
            :limit="1"
            v-model="ruleForm.posterImg"
            :text="$t('storesInfo.jy200')"
          >
          </l-upload>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.dpid')">
          <el-input
            disabled
            class="inputs"
            v-model="id"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.dpmc')" prop="store_name">
          <el-input
            disabled
            class="inputs"
            maxlength="20"
            :placeholder="$t('storesInfo.qsrdpmc')"
            v-model="ruleForm.store_name"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          class="store_info"
          :label="$t('storesInfo.dpxx')"
          prop="store_info"
        >
          <el-input
            disabled
            class="inputs"
            maxlength="50"
            type="textarea"
            :rows="2"
            :placeholder="$t('storesInfo.qsrdpxx')"
            v-model="ruleForm.store_info"
          >
          </el-input>
        </el-form-item>

        <!-- 选择店铺分类 -->
        <!-- <el-form-item
          class="store_info"
          :label="$t('storesInfo.dpfl')"
          prop="store_info"
        >
          <el-select
            disabled
            class="select-input"
            v-model="ruleForm.mac_choose_fl"
            :placeholder="$t('storesInfo.qxzdplx')"
          >
            <el-option
              v-for="(item, index) in choose_fl"
              :key="index"
              :label="item.name"
              :value="item.id"
              v-show="item.is_display"
            ></el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item :label="$t('storesInfo.jyfw')" prop="business_scope">
          <el-input
            disabled
            class="inputs"
            maxlength="20"
            :placeholder="$t('storesInfo.qsrjyfw')"
            v-model="ruleForm.business_scope"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          class="activity-class"
          :label="$t('storesInfo.yyzt')"
          prop="business_status"
        >
          <!-- <el-radio-group disabled v-model="ruleForm.business_status">
                <el-radio v-for="activity in businessStatusList" :label="activity.value" :key="activity.value">{{activity.name}}</el-radio>
            </el-radio-group> -->
          {{ ruleForm.business_status == 2 ? '已打烊' : '营业中 ' }}
          {{
            ruleForm.business_status == 2
              ? ''
              : `( ${ruleForm.business_hours} )`
          }}
        </el-form-item>
        <el-form-item :label="$t('storesInfo.yhxm')" prop="user_name">
          <el-input
            class="inputs"
            disabled
            :placeholder="$t('storesInfo.qsryhxm')"
            v-model="ruleForm.user_name"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.sfzh')" prop="card_no">
          <el-input
            class="inputs"
            disabled
            :placeholder="$t('storesInfo.qsrsfzh')"
            v-model="ruleForm.card_no"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.lxdh')" prop="phone">
          <el-input
            class="inputs"
            disabled
            :placeholder="$t('storesInfo.qsrlxdh')"
            v-model="ruleForm.phone"
          >
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('storesInfo.lxzd')" prop="address">
          <el-input
            class="inputs"
            disabled
            maxlength="20"
            :placeholder="$t('storesInfo.qsrlxdz')"
            v-model="ruleForm.address"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('storesInfo.sfzckp')">
          <el-switch
            disabled
            v-model="ruleForm.isInvoice"
            :active-value="1"
            :inactive-value="0"
            active-color="#00ce6d"
            inactive-color="#d4dbe8"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </div>
    <div class="hr">1</div>
  </div>
</template>

<script>
import { index, delMchInfo } from '@/api/set/storesInfo'
export default {
  name: 'info',
  data () {
    return {
      ruleForm: {
        logo: '',
        storeLogo: '',
        headImg: '',
        store_name: '',
        store_info: '',
        business_scope: '',
        business_status: 1,
        user_name: '',
        card_no: '',
        phone: '',
        address: '',
        isInvoice: 1,
        mac_choose_fl: '',
        business_hours: ''
      },
      businessStatusList: [
        {
          value: 1,
          name: '营业'
        },
        {
          value: 2,
          name: '打烊'
        }
      ], //营业状态

      id: '',
      choose_fl: [],
      account_money: '',
      cashable_money: ''
    }
  },

  created () {
    this.index()
  },

  methods: {
    async index () {
      const res = await index({
        api: 'mch.Mch.Set.Index'
      })
      console.log(res)
      let info = res.data.data.res
      console.log('info', info)
      
      this.ruleForm.logo = info.logo
      this.ruleForm.headImg = info.head_img
      this.ruleForm.posterImg = info.poster_img
      this.ruleForm.store_name = info.name
      this.ruleForm.store_info = info.shop_information
      this.ruleForm.business_scope = info.shop_range
      this.ruleForm.business_status = Number(info.is_open)
      this.ruleForm.user_name = info.realname
      this.ruleForm.card_no = info.iD_number
      this.ruleForm.phone = info.tel
      this.ruleForm.address = `${info.sheng}${info.shi}${info.xian}${info.address}`
      this.id = info.id
      this.ruleForm.isInvoice = info.is_invoice
      this.ruleForm.mac_choose_fl = info.className
      this.ruleForm.business_hours = info.business_hours
      this.account_money = info.account_money
      this.cashable_money = info.cashable_money
    },

    cancellation () {
      var name
      if (Number(this.account_money) == 0 && Number(this.cashable_money) == 0) {
        name = this.$t('storesInfo.sfqrzx')
      } else {
        name = this.$t('storesInfo.nddpy')
      }
      this.$confirm(name, this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delMchInfo({
            api: 'mch.Mch.Set.DelMchInfo',
            id: this.id
          }).then(res => {
            if (res.data.code == '200') {
              this.$message({
                type: 'success',
                message: this.$t('zdata.cg'),
                offset: 100
              })
              window.localStorage.clear()
              window.location.href = '/login'
              location.reload()
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消',
          //   offset: 100
          // });
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
  /deep/.jump-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .laiketui-add:before {
      font-size: 14px;
      margin-right: 8px;
    }
    button {
      min-width: 120px;
      height: 40px;
      background: #28b6ff;
      border-radius: 4px;
      padding: 0;
      border: none;
      &:hover {
        opacity: 0.8;
      }
      span {
        font-size: 14px;
      }
      .el-icon-wallet:before {
        margin-right: 8px;
      }
    }

    .fontColor {
      height: 40px;
      color: #6a7076;
      background-color: #fff;
      border-radius: 4px;
      &:hover {
        color: #2890ff;
      }
    }
  }

  .store-info {
    flex: 1;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    padding-top: 40px;
    border-radius: 4px;
    /deep/.demo-ruleForm {
      .storeHeadimg {
        pointer-events: none;
      }
      .el-form-item__label {
        font-weight: normal;
      }
      .inputs {
        width: 580px;
      }
      .store_info {
        .el-textarea {
          height: 60px;
          textarea {
            height: 60px;
          }
        }
      }
      .invoice {
        pointer-events: none;
      }
    }
  }
  .hr {
    width: 100%;
    height: 20px;
    background: #edf1f5;
    color: #edf1f5;
  }
}
</style>
