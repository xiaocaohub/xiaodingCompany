<template>
  <div class="container">
    <div class="add-menu">
      <el-form :model="dataMain" :rules="rules" ref="ruleForm" class="picture-ruleForm" label-width="auto">
        <el-form-item :label="$t('addAdminUser.glyzh')" prop="name" class="admin-zhanghao">
          <el-input v-model="dataMain.name" @keyup.native="dataMain.name = oninput4(dataMain.name)" v-if="dataMain.id==null" :placeholder="$t('addAdminUser.qsrglyzh')"></el-input>
          <el-input v-model="dataMain.name" @keyup.native="dataMain.name = oninput4(dataMain.name)" disabled v-else></el-input>
        </el-form-item>
        <!-- <el-form-item label="所属商户编号">
          <template>
            {{customer_number}}
          </template>
        </el-form-item> -->
        <el-form-item :label="$t('addAdminUser.xmm')" prop="passwordNew" v-if="dataMain.id!=null">
          <el-input show-password v-model="dataMain.passwordNew" @keyup.native="dataMain.passwordNew = oninput3(dataMain.passwordNew)" :placeholder="$t('addAdminUser.qsrxmm')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('addAdminUser.glymm')" prop="password" v-if="dataMain.id==null">
          <el-input show-password v-model="dataMain.password" @keyup.native="dataMain.password = oninput3(dataMain.password)" :placeholder="$t('addAdminUser.qsrglymm')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('addAdminUser.qrmm')" prop="passwordOld">
          <el-input show-password v-model="dataMain.passwordOld" @keyup.native="dataMain.passwordOld = oninput3(dataMain.passwordOld)" :placeholder="$t('addAdminUser.qzcsrmm')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('addAdminUser.js')" prop="roleId">
          <el-select class="select-input" v-model="dataMain.roleId" :placeholder="$t('addAdminUser.qxz')">
            <el-option v-for="(item,index) in roleList" :key="index" :label="item.name" :value="item.id">
              <div>{{ item.name }}</div>
            </el-option>
          </el-select>
        </el-form-item>


        <div class="form-footer">
          <el-form-item>
            <el-button plain class="footer-cancel fontColor kid_left" @click="$router.go(-1)">{{$t('addAdminUser.ccel')}}</el-button>
            <el-button class="bgColor" type="primary" @click="Save('ruleForm')">{{
              $t('DemoPage.tableFromPage.save') }}
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import main from "@/webManage/js/authority/adminUserManage/addAdminUser";
export default main;
</script>

<style scoped lang="less">
  @import "../../../webManage/css/authority/adminUserManage/addAdminUser.less";
</style>
