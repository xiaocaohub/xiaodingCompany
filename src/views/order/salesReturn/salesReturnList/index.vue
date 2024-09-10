<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input v-model="inputInfo.orderNo" size="medium" @keyup.enter.native="demand" class="Search-input" :placeholder="$t('salesReturnList.qsrddh')"></el-input>
          <!-- <el-input v-model="inputInfo.orderNo" size="medium" @keyup.enter.native="demand" class="Search-input" placeholder="请输入店铺名称"></el-input> -->
          <!-- <el-select class="select-input" v-model="inputInfo.state" placeholder="请选择类型">
            <el-option v-for="item in stateList" :key="item.brand_id" :label="item.label" :value="item.value">
            </el-option>
          </el-select> -->
          <el-select class="select-input" v-model="inputInfo.state" :placeholder="$t('salesReturnList.qxzzt')">
            <el-option v-for="item in stateList" :key="item.brand_id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="select-date">
            <el-date-picker v-model="inputInfo.date"
              type="datetimerange" :range-separator="$t('DemoPage.zhi')"
              :start-placeholder="$t('DemoPage.ksrq')"
              :end-placeholder="$t('DemoPage.jsrq')" value-format="yyyy-MM-dd HH:mm:ss"
              :editable="false">
            </el-date-picker>
          </div>
        </div>
        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{$t('DemoPage.tableExamplePage.reset')}}</el-button>
          <el-button class="bgColor" type="primary" @click="demand" v-enter="demand">{{$t('DemoPage.tableExamplePage.demand')}}</el-button>
          <el-button class="bgColor export" type="primary" @click="dialogShow">{{$t('DemoPage.tableExamplePage.export')}}</el-button>
        </div>
      </div>
	  </div>

    <div class="menu-list" ref="tableFather">
      <el-table :element-loading-text="$t('DemoPage.loading_text')" v-loading="loading" :data="tableData" ref="table" class="el-table" style="width: 100%"
		  :height="tableHeight" >
      <template slot="empty">
          <div class="empty">
            <img src="../../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column prop="" :label="$t('salesReturnList.xh')" width="120">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="user_id" :label="$t('salesReturnList.yhid')">
        </el-table-column>
        <el-table-column prop="p_name" :label="$t('salesReturnList.spmc')" width="200">
        </el-table-column>
        <!-- <el-table-column prop="mchName" :label="$t('salesReturnList.dpmc')" width="200">
        </el-table-column> -->
        <el-table-column prop="p_price" :label="$t('salesReturnList.spjg')" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.p_price.toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="num" :label="$t('salesReturnList.sl')">
        </el-table-column>
        <el-table-column prop="sNo" :label="$t('salesReturnList.ddh')" width="200">
        </el-table-column>
        <el-table-column prop="" :label="$t('salesReturnList.stje')" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.real_money > 0">{{ scope.row.real_money }}</span>
            <span v-else>{{$t('salesReturnList.wtk')}}</span>
					</template>
        </el-table-column>
        <el-table-column prop="re_time" :label="$t('salesReturnList.sqsj')" width="200">
          <template slot-scope="scope">
            <span>{{ scope.row.re_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="mobile" :label="$t('salesReturnList.lx')" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.re_type == 2">{{$t('salesReturnList.jtk')}}</span>
            <span v-else-if="scope.row.re_type == 1">{{$t('salesReturnList.thtk')}}</span>
            <span v-else>{{$t('salesReturnList.hh')}}</span>
					</template>
        </el-table-column>
        <el-table-column prop="prompt" :label="$t('salesReturnList.zt')">
        </el-table-column>
        <el-table-column fixed="right" :label="$t('salesReturnList.cz')" width="140" class="hhh">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <!-- <template v-if="scope.row.r_type == 3">
                  <el-button v-if="scope.row.re_type<3 && detectionBtn(button_list, '通过')" icon="el-icon-circle-check" @click="dialogShow2(scope.row,1)">通过</el-button>
                    <el-button v-if="scope.row.re_type==3 && detectionBtn(button_list, '回寄')" icon="el-icon-document-checked" @click="View(scope.row,3)">回寄</el-button>
                </template> -->
                <!-- <template v-if="scope.row.r_type == 3">
                  <el-button icon="el-icon-document-checked" @click="View(scope.row,3)">回寄</el-button>
                </template> -->
                <template v-if="!scope.row.isExamine" >
                  <el-button icon="el-icon-view" @click="View(scope.row)" v-if="detectionBtn(button_list,'查看')">{{$t('salesReturnList.ck')}}</el-button>
                </template>

                <template v-if="scope.row.isExamine">
                  <!-- <el-button v-if="detectionBtn(button_list, '通过')" icon="el-icon-circle-check" @click="dialogShow2(scope.row,1)">shen</el-button> -->
                  <el-button icon="el-icon-document-checked" @click="View(scope.row,2)" v-if="detectionBtn(button_list,'审核')">{{$t('salesReturnList.sh')}}</el-button>
                </template>

                <el-button v-if="scope.row.isManExamine&&detectionBtn(button_list,'人工处理')" icon="el-icon-user" @click="View(scope.row,4)" >{{$t('salesReturnList.rgsl')}}</el-button>
              </div>
            </div>
		      </template>
        </el-table-column>
	    </el-table>
      <div class="pageBox" ref="pageBox" v-if="showPagebox">
        <div class="pageLeftText">{{$t('DemoPage.show')}}</div>
        <el-pagination layout="sizes, slot, prev, pager, next"
        :prev-text="$t('DemoPage.prev_text')"
        :next-text="$t('DemoPage.next_text')" @size-change="handleSizeChange"
        :page-sizes="pagesizes"
        :current-page="pagination.page"
        @current-change="handleCurrentChange"
        :total="total">
          <div class="pageRightText">{{$t('DemoPage.on_show')}}{{currpage}}-{{current_num}}{{$t('DemoPage.twig')}} {{total}} {{$t('DemoPage.twig_notes')}}</div>
        </el-pagination>
      </div>
    </div>

    <div class="dialog-block">
      <!-- 弹框组件 -->
      <!-- <el-dialog
        :title="toggle == 1 ? '通过' : toggle == 3 ? '回寄' : '填写理由'"
        :visible.sync="dialogVisible2"
        :before-close="handleClose2"
      >
        <el-form :model="ruleForm" ref="ruleForm" label-width="170px" class="demo-ruleForm">
          <div class="task-container">
            <div class="through" v-if="toggle === 1 || toggle === 3">
              <h3 v-if="this.type !== 11">{{ content }}</h3>
              <div class="refund" v-if="this.type == 2 || this.type == 9 || this.type == 4">
                <div class="y-refund">
                  应退：<span>{{ ruleForm.y_refund }}</span>
                </div>
                <div class="s-refund">
                  <span>实退：</span>
                  <el-input type="number" min="0" v-model="ruleForm.s_refund"></el-input>
                </div>
              </div>
              <el-form-item class="select-input" v-if="toggle === 3" label="快递公司" prop="kuaidi_name">
                <el-select class="select-input" v-model="ruleForm.kuaidi_name" placeholder="请选择快递公司">
                  <el-option v-for="item in courierList" :key="item.id" :label="item.kuaidi_name" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="select-input" v-if="toggle === 3" label="快递单号" prop="kuaidi_no">
                <el-input v-model="ruleForm.kuaidi_no"></el-input>
              </el-form-item>
            </div>
            <el-form-item v-if="toggle === 2" class="integral" label="拒绝理由：(限20个字符)">
              <el-input type="textarea" v-model="ruleForm.reason"></el-input>
            </el-form-item>
          </div>
          <div class="form-footer">
            <el-form-item>
              <el-button class="bgColor" @click="handleClose2()">取 消</el-button>
              <el-button class="bdColor" type="primary" @click="submitForm2('ruleForm')">确 定</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog> -->
    </div>

    <div class="dialog-export">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('DemoPage.export_data')"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <div class="item" @click="exportPage">
          <i class="el-icon-document"></i>
          <span>{{$t('DemoPage.export_page')}}</span>
        </div>
        <div class="item item-center" @click="exportAll">
          <i class="el-icon-document-copy"></i>
          <span>{{$t('DemoPage.export_all')}}</span>
        </div>
        <div class="item" @click="exportQuery">
          <i class="el-icon-document"></i>
          <span>{{$t('DemoPage.export_query')}}</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import salesReturnList from '@/webManage/js/order/salesReturn/salesReturnList'
export default salesReturnList
</script>

<style scoped lang="less">
@import '../../../../webManage/css/order/salesReturn/salesReturnList.less';
</style>
