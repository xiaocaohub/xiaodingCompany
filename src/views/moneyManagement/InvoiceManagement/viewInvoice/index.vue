<template>
  <div class="container">
    <div class="header">
      <span>{{$t('viewInvoice.ckxq')}}</span>
    </div>

    <el-form label-position="right" ref="ruleForm" label-width="100px" class="form-search" v-if="storeInfo">
      <div class="notice">
        <el-form-item :label="$t('viewInvoice.fpid')" prop="">
          <span>{{ storeInfo.id }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.yhmc')" prop="">
          <span>{{ storeInfo.user_name }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.ttlx')" prop="">
          <span>{{ storeInfo.typeDesc }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.fptt')" prop="">
          <span>{{ storeInfo.company_name }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.sh')" prop="">
          <span v-if="storeInfo.typeDesc != '个人'">{{ storeInfo.company_tax_number }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.zcdz')" prop="">
          <span>{{ invoice_header.register_address }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.zcdh')" prop="">
          <span>{{ invoice_header.register_phone }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.khyh')" prop="">
          <span>{{ invoice_header.deposit_bank }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.yhkh')" prop="">
          <span>{{ invoice_header.bank_number }}</span>
        </el-form-item>
        <el-form-item :label="$t('viewInvoice.dzyp')" prop="">
          <span>{{ storeInfo.email }}</span>
        </el-form-item>
        <el-form-item class="business-license" :label="$t('viewInvoice.kpzt')" prop="">
          <span>{{ storeInfo.invoiceStatusDesc }}</span>
        </el-form-item>
        <el-form-item class="business-license" :label="$t('viewInvoice.ddh')" prop="">
          <span>{{ storeInfo.s_no }}</span>
        </el-form-item>
        <el-form-item class="business-license" :label="$t('viewInvoice.fpje')" prop="">
          <span>{{ storeInfo.invoice_amount }}</span>
        </el-form-item>
        <el-form-item class="business-license" :label="$t('viewInvoice.tjsj')" prop="">
          <span>{{ storeInfo.add_time }}</span>
        </el-form-item>
        <!-- <el-form-item class="footer-button">
          <el-button plain class="footer-cancel fontColor" @click="$router.go(-1)">返回</el-button>
        </el-form-item> -->
      </div>
      <div class="Invoice-img" v-if="storeInfo.file">
        <p>{{$t('viewInvoice.fptp')}}</p>
        <img :src="storeInfo.file" alt="">
      </div>
	</el-form>
  </div>
</template>

<script>
import viewInvoice from '@/webManage/js/moneyManagement/InvoiceManagement/viewInvoice'
export default viewInvoice
</script>

<style scoped lang="less">
@import  '../../../../webManage/css/moneyManagement/InvoiceManagement/viewInvoice.less';
</style>