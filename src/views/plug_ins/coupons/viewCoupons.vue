<template>
<div class="container">
  <el-form :model="ruleForm" label-position="right" ref="ruleForm" label-width="auto" class="form-search">
    <div class="basic-info">
      <div class="notice">
      <!-- <el-form-item label="发行单位" required>
        <el-radio-group v-model="ruleForm.issuer" disabled>
          <el-radio :label="0">商城</el-radio>
          <el-radio :label="1">自营店</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item :label="$t('coupons.addCoupons.yhqlx')" required>
        <!-- <span>{{ ruleForm.coupons_type }}</span> -->
        <el-select disabled class="select-input" v-model="ruleForm.coupons_type" :placeholder="$t('coupons.addCoupons.qxzyhq')">
          <el-option v-for="(item,index) in couponsTypeList" :key="index" :label="item.value" :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.yhqmc')" required>
        <!-- <span>{{ ruleForm.coupons_name }}</span> -->
        <el-input disabled class="coupons-name" v-model="ruleForm.coupons_name" :placeholder="$t('coupons.addCoupons.qsryhq')"></el-input>
      </el-form-item>
      <!-- <el-form-item label="剩余数量：" required>
        <span>{{ ruleForm.num }}</span>
        <span class="num">张</span>
      </el-form-item> -->
      <el-form-item :label="$t('coupons.addCoupons.mz')" required>
        <!-- <span>{{ ruleForm.face_value }}</span>
        <span class="num">元</span> -->
        <el-input disabled class="issue-number" v-model="ruleForm.face_value" placeholder="">
          <template slot="append">{{$t('coupons.addCoupons.yu')}}</template>
        </el-input>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.xfmk')" required>
        <!-- <span>消费</span>
        <span>{{ ruleForm.consumption_threshold }}</span>
        <span>元可使用</span>
        <span class="grey">（为0，则无限制）</span> -->
        <el-radio-group v-model="ruleForm.consumption_threshold_type" disabled>
          <el-radio :label="1">{{$t('coupons.addCoupons.wmk')}}</el-radio>
          <el-radio :label="2">{{$t('coupons.addCoupons.szje')}}</el-radio>
        </el-radio-group>
        <div v-if="ruleForm.consumption_threshold_type == 2" class="shaco_box_one">
        <!-- 每人限领 -->
        <el-form-item :label="$t('coupons.addCoupons.xf')" label-width="45px">
          <el-input disabled class="issue-number_three" v-model="ruleForm.consumption_threshold" placeholder="">
            <template slot="append">{{$t('coupons.addCoupons.yu')}}</template>
          </el-input>
            <span style="margin-left: 10px;">{{$t('coupons.addCoupons.ksy')}}</span>
        </el-form-item>
        </div>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.kyfw')">
        <el-radio-group v-model="ruleForm.available_range" disabled>
          <el-radio v-for="item in availableRangeList" disabled :label="item.value" :key="item.value">{{item.name}}</el-radio>
        </el-radio-group>
        <div class="select-goods" v-if="ruleForm.available_range === 2">
          <!-- <el-select disabled v-model="ruleForm.select_goods" multiple placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.product_title"
              :value="item.id">
            </el-option>
          </el-select> -->
          <div class="flex">
            <div class="changeUser" style="">
                <!-- <el-button class="add_bt" plain @click="AddPro">添加商品</el-button>
                <el-button plain @click="delPro" class="cancel">全部清空</el-button> -->
                <el-table :data="prochangedata" v-if="prochangedata.length>0" style="overflow: auto;max-height: 300px;width: 580px;border: 1px solid #E9ECEF;">
                    <!-- <el-table-column prop="goodsId" align="center" label="商品编号">
                    </el-table-column> -->
                    <el-table-column prop="proName" align="center" :label="$t('coupons.addCoupons.spxx')" width="200">
                        <template slot-scope="scope">
                            <div class="Info">
                                <img :src="scope.row.imgurl" width="40" height="40" alt="">
                                <span>{{ scope.row.product_title  }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="num" align="center" :label="$t('coupons.addCoupons.kc')">
                    </el-table-column>
                    <el-table-column prop="price" align="center" :label="$t('coupons.addCoupons.jg')">
                      <template slot-scope="scope">
                        {{ scope.row.price.toFixed(2) }}
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="nums" align="center" label="购买数量">
                    </el-table-column>
                    <el-table-column prop="name" align="center" label="所属店铺">
                    </el-table-column> -->
                    <el-table-column prop="action" align="center" :label="$t('coupons.cz')">
                        <template slot-scope="scope">
                          <div style="display: flex;justify-content: center;">
                            <el-button disabled class="delete" @click="ChangeProdel(scope.$index)" plain icon="el-icon-delete">删除</el-button>
                          </div>
                          </template>
                    </el-table-column>
                </el-table>
                <!-- <el-pagination  v-if="prochangedata.length>0" style="margin: 5px;float: right;"
                  prev-text="上一页" next-text="下一页"
                  @current-change="handleCurrentChange2"
                  background
                  layout="prev, pager, next"
                  :total="prochangedata.length">
                </el-pagination> -->
            </div>
          </div>
        </div>
        <div class="select-class" v-if="ruleForm.available_range === 3">
          <div class="class-block">
            <span>{{$t('coupons.addCoupons.yx')}}</span>
            <div class="class-item">
              <el-tree
                :data="toData"
                node-key="cid"
                default-expand-all
                :props="defaultProps"
                :expand-on-click-node="false">
              </el-tree>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.lqfs')" required>
        <el-radio-group v-model="ruleForm.pickup_type" disabled>
          <el-radio :label="0">{{$t('coupons.addCoupons.sdlq')}}</el-radio>
          <el-radio :label="1" :disabled="ruleForm.issue_number_type == 2">{{$t('coupons.addCoupons.zdff')}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.fxsl')" required>
        <!-- <span>{{ ruleForm.issue_number }}</span>
        <span class="num">张</span> -->
        <el-radio-group disabled v-model="ruleForm.issue_number_type" @change="issueChange()">
          <el-radio :label="1">{{$t('coupons.addCoupons.bxz')}}</el-radio>
          <el-radio :label="2" >{{$t('coupons.addCoupons.szsl')}}</el-radio>
        </el-radio-group>
        <div v-if="ruleForm.issue_number_type == 2" class="shaco_box_one">
        <!-- 每人限领 -->
        <el-form-item>
          <el-input disabled class="issue-number_two" v-model="ruleForm.issue_number" @keyup.native="ruleForm.issue_number = oninput2(ruleForm.issue_number)" placeholder="">
            <template slot="append">{{$t('coupons.addCoupons.zhang')}}</template>
          </el-input>
        </el-form-item>
        </div>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.gqsj')" required>
        <!-- <span>{{ ruleForm.date[0] }}</span>
        <span class="zhi">至</span>
        <span>{{ ruleForm.date[1] }}</span> -->
        <el-radio-group v-model="ruleForm.date_type" disabled>
          <el-radio :label="1">{{$t('coupons.addCoupons.bxz')}}</el-radio>
          <el-radio :label="2">{{$t('coupons.addCoupons.szzdgqsj')}}</el-radio>
          <el-radio :label="3">{{$t('coupons.addCoupons.szlqhdjsx')}}</el-radio>
        </el-radio-group>
        <div class="shaco_box_one" v-if="ruleForm.date_type == 2">
          <el-date-picker
          disabled
          class="issue-number_four"
            v-model="ruleForm.date_one"
            type="date"
            :placeholder="$t('coupons.addCoupons.xzrq')">>
          </el-date-picker>
        </div>
        <div class="shaco_box_one" v-if="ruleForm.date_type == 3">
          <el-input disabled class="issue-number_four" v-model="ruleForm.date_num" placeholder="">
              <template slot="append">{{$t('coupons.addCoupons.tian')}}</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.syxz')" required v-if="ruleForm.pickup_type !=1">
        <!-- <span>每人限领1张</span> -->
        <div class="shaco_box_one">
          <el-form-item :label="$t('coupons.addCoupons.mrlq')" label-width="78px">
            <el-input disabled class="issue-number_five" v-model="ruleForm.limit_num" placeholder="">
              <template slot="append">{{$t('coupons.addCoupons.zhang')}}</template>
            </el-input>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item :label="$t('coupons.addCoupons.sysm')">
        <!-- <span>{{ ruleForm.instructions }}</span> -->
        <el-input disabled class="instructions" v-model="ruleForm.instructions" type="textarea" :rows="3" :placeholder="$t('coupons.addCoupons.qsryhqsy')"></el-input>
      </el-form-item>
      </div>
    </div>
  </el-form>
  <div class="footer-button">
      <el-button plain class="footer-cancel fontColor" @click="$router.go(-1)">{{$t('commentEdit.fh')}}</el-button>
      <!-- <el-button type="primary" class="footer-save bgColor mgleft" @click="submitForm('ruleForm')">保存</el-button> -->
  </div>
</div>
</template>

<script>
import viewCoupons from '@/webManage/js/plug_ins/coupons/viewCoupons'
export default viewCoupons
</script>

<style scoped lang="less">
@import  '../../../webManage/css/plug_ins/coupons/viewCoupons.less';
</style>