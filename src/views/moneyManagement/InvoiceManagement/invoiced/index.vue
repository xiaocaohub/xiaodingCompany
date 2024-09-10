<template>
  <div class="container">
    <div class="btn-nav">
      <el-radio-group fill="#2890ff" text-color="#fff" v-model="radio1">
        <el-radio-button label="1" @click.native.prevent="$router.push('/moneyManagement/InvoiceManagement/allInvoice')">{{$t('InvoiceManagement.qb')}}</el-radio-button>
        <el-radio-button label="2" @click.native.prevent="$router.push('/moneyManagement/InvoiceManagement/notInvoiced')">{{$t('InvoiceManagement.dkp')}}</el-radio-button>
        <el-radio-button label="3" @click.native.prevent="$router.push('/moneyManagement/InvoiceManagement/invoiced')">{{$t('InvoiceManagement.ykp')}}</el-radio-button>
        <el-radio-button label="4" @click.native.prevent="$router.push('/moneyManagement/InvoiceManagement/undone')">{{$t('InvoiceManagement.ycx')}}</el-radio-button>
      </el-radio-group>
    </div>

    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input v-model="inputInfo.name" size="medium" @keyup.enter.native="demand" class="Search-input" :placeholder="$t('InvoiceManagement.qsrfp')"></el-input>
          <el-select class="select-input sequence-input" v-model="inputInfo.rise" :placeholder="$t('InvoiceManagement.qxztt')">
            <el-option v-for="item in riseTypeList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{$t('DemoPage.tableExamplePage.reset')}}</el-button>
          <el-button class="bgColor" type="primary" @click="demand" v-enter="demand">{{$t('DemoPage.tableExamplePage.demand')}}</el-button>
          <el-button class="bgColor export" type="primary" @click="dialogShow" v-if="detectionBtn(button_list,'删除')">{{$t('DemoPage.tableExamplePage.export')}}</el-button>
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
        <el-table-column prop="id" :label="$t('InvoiceManagement.fpid')" width="95">
        </el-table-column>
        <el-table-column prop="user_name" :label="$t('InvoiceManagement.nc')">
        </el-table-column>
        <el-table-column prop="type" :label="$t('InvoiceManagement.ttlx')">
          <template slot-scope="scope">
            <span>{{ scope.row.type == 1 ? $t('InvoiceManagement.qy') : $t('InvoiceManagement.gr') }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="company_name" :label="$t('InvoiceManagement.fptt')">
        </el-table-column>
        <el-table-column prop="company_tax_number" :label="$t('InvoiceManagement.sh')">
          <template slot-scope="scope">
            <span>{{ scope.row.type == 1 ? scope.row.company_tax_number : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" :label="$t('InvoiceManagement.dzyx')">
        </el-table-column>
        <el-table-column prop="invoiceStatusDesc" :label="$t('InvoiceManagement.kpzt')">
        </el-table-column>
        <el-table-column prop="s_no" :label="$t('InvoiceManagement.ddh')">
        </el-table-column>
        <el-table-column prop="invoice_amount" :label="$t('InvoiceManagement.fpje')">
        </el-table-column>
        <el-table-column prop="add_time" :label="$t('InvoiceManagement.tjsj')" width="185">
          <template slot-scope="scope">
            <span>{{ scope.row.add_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="file_time" :label="$t('InvoiceManagement.scsj')" width="185">
          <template slot-scope="scope">
            <span v-if="!scope.row.file_time">{{$t('InvoiceManagement.zw')}}</span>
            <span v-else>{{ scope.row.file_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('zdata.cz')" width="150">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="upload(scope.row)" v-if="scope.row.invoiceStatusDesc == '申请中'&&detectionBtn(button_list,'上传发票')">{{$t('InvoiceManagement.scfp')}}</el-button>
                <el-button @click="Details(scope.row)" v-if="detectionBtn(button_list,'发票详情')">{{$t('InvoiceManagement.fpxq')}}</el-button>
                <el-button @click="Delete(scope.row)" v-if="scope.row.invoiceStatusDesc == '已撤销'&&detectionBtn(button_list,'删除')">{{$t('zdata.sc')}}</el-button>
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
import invoiced from '@/webManage/js/moneyManagement/InvoiceManagement/invoiced'
export default invoiced
</script>

<style scoped lang="less">
@import '../../../../webManage/css/moneyManagement/InvoiceManagement/invoiced.less';
</style>