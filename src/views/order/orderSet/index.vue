<template>
  <div class="container">
    <div class="formCenter">
      <el-form :model="mainData" class="picture-ruleForm" label-width="100%">
        <el-form-item :label="$t('orderSet.djbysz')">
          <el-switch v-model="mainData.isMany" />
          <div class="djby width" v-if="mainData.isMany">
            <div class="row">
              {{ $t('orderSet.tjsp') }}
              <div class="el-input">
                <input
                  type="number"
                  @blur="blurPiece"
                  autocomplete="off"
                  @keyup.native="
                    mainData.same_piece = oninput2(mainData.same_piece)
                  "
                  class="el-input__inner"
                  v-model="mainData.same_piece"
                />
              </div>
              {{ $t('orderSet.jby') }}
            </div>
            <div class="row">
              {{ $t('orderSet.tydd') }}
              <div class="el-input">
                <input
                  type="number"
                  @blur="blurOrder"
                  autocomplete="off"
                  class="el-input__inner"
                  @keyup.native="
                    mainData.same_order = oninput2(mainData.same_order)
                  "
                  v-model="mainData.same_order"
                />
              </div>
              {{ $t('orderSet.jby') }}
            </div>
          </div>
        </el-form-item>

        <div class="form-footer">
          <el-form-item>
            <el-button class="bgColor" type="primary" @click="Save()"
              >{{ $t('DemoPage.tableFromPage.save') }}
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
// import main from "@/webManage/js/order/orderSet/orderSetPage";

import { save, index } from '@/api/order/orderSet'
import { isEmpty } from 'element-ui/src/utils/util'
import { getStorage } from '@/utils/storage'

export default {
  name: 'orderSet',
  //初始化数据
  data () {
    return {
      mainData: { isMany: false }
    }
  },
  //组装模板
  created () {
    this.loadData()
  },

  watch: {
    'mainData.same_piece': {
      handler: function (newVal, oldVal) {
        if (parseInt(newVal) <= 0) {
          this.mainData.same_piece = 0
        } else {
          this.mainData.same_piece = parseInt(newVal)
        }
        console.log(newVal)
      }
    },

    'mainData.same_order': {
      handler: function (newVal, oldVal) {
        if (parseInt(newVal) <= 0) {
          this.mainData.same_order = 0
        } else {
          this.mainData.same_order = parseInt(newVal)
        }
        console.log(newVal)
      }
    }
  },

  mounted () {},
  methods: {
    async loadData () {
      await index({
        api: 'mch.Mch.Order.MchIndex',
        mchId: getStorage('mchId'),
        isType: 2
      }).then(data => {
        if (!isEmpty(data)) {
          data = data.data.data
          let isMany = false
          if (data.same_order > 0 || data.same_piece > 0) {
            isMany = true
          }
          data.isMany = isMany
          this.mainData = data
        }
      })
    },

    blurPiece () {
      if (this.mainData.same_piece < 0) {
        this.mainData.same_piece = 0
      }
    },

    blurOrder () {
      if (this.mainData.same_order < 0) {
        this.mainData.same_order = 0
      }
    },

    async Save () {
      if (this.mainData.isMany) {
        if (
          this.mainData.same_piece < 0 ||
          this.mainData.same_piece != this.mainData.same_piece.toFixed(0)
        ) {
          this.$message({
            message: '同件商品数量格式不对',
            type: 'warning',
            offset: 102
          })
          return
        }
        if (
          this.mainData.same_order < 0 ||
          this.mainData.same_order != this.mainData.same_order.toFixed(0)
        ) {
          this.$message({
            message: '同一订单中，商品数量格式不对',
            type: 'warning',
            offset: 102
          })
          return
        }
      }

      // if(this.mainData.isMany){
      //   if(!this.mainData.same_order){
      //       this.$message({
      //       message:'同一订单中，商品数量必须为正整数',
      //       type:'warning',
      //       offset:100
      //       })
      //       return
      //   }
      //   if(!this.mainData.same_piece){
      //       this.$message({
      //       message:'同一订单中，商品数量必须为正整数',
      //       type:'warning',
      //       offset:100
      //       })
      //       return
      //   }
      // }

      this.dialogVisible = true
      let title = '保存成功'
      if (!this.mainData.isMany) {
        this.mainData.same_piece = 0
        this.mainData.same_order = 0
      }
      let param = {
        api: 'mch.Mch.Order.MchSaveConfig',
        mchId: getStorage('mchId'),
        isType: 2,
        packageSettings: this.mainData.isMany ? 1 : 0,
        samePiece: this.mainData.same_piece,
        sameOrder: this.mainData.same_order
      }

      await save(param).then(res => {
        if (!isEmpty(res) && res.data.code == '200') {
          this.$message({
            type: 'success',
            message: title,
            offset: 102
          })
          this.loadData()
        }
        this.dialogVisible = false
      })
    }
  }
}
</script>

<style scoped lang="less">
@import '../../../common/commonStyle/form';
// @import "../../../webManage/css/order/orderSet/orderSetPage";
.container {
  width: 100%;
  height: 737px;
  border-radius: 4px;
  background-color: #fff;
  .djby {
    background: rgba(244, 247, 249, 1);
    border-radius: 2px;
    padding: 14px 20px;
    box-sizing: border-box;
    .row {
      display: flex;
      align-items: center;
      margin-bottom: 14px;
      .el-input {
        width: 150px;
        margin: 0 5px;
        .el-input__inner {
          border-color: #d5dbe8;
          color: #414658;
          font-size: 14px;
          padding: 0 10px;
        }
      }
    }
  }
  .el-form {
    width: 600px;
  }
  .width {
    width: 820px;
  }
}
</style>
