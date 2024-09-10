<template>
  <div class="container">
    <div class="jump-list">
      <el-button class="bgColor laiketui laiketui-add" type="primary" @click="Save()">{{$t('adminUserList.tjgly')}}</el-button>
    </div>
    <div class="merchants-list" ref="tableFather">
      <el-table :element-loading-text="$t('DemoPage.loading_text')" v-loading="page.loading" :data="page.tableData" ref="table"
          class="el-table"
          style="width: 100%"
          :height="tableHeight">
          <template slot="empty">
          <div class="empty">
            <img src="../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column prop="id" :label="$t('adminUserList.zhid')" width="100">
        </el-table-column>
        <el-table-column prop="zhanghao" :label="$t('adminUserList.zh')">
        </el-table-column>
        <el-table-column prop="roleName" :label="$t('adminUserList.bdjs')">
        </el-table-column>
        <el-table-column prop="addName" :label="$t('adminUserList.tjr')">
        </el-table-column>
        <el-table-column :label="$t('adminUserList.tjsj')">
          <template slot-scope="scope" v-if="scope.row.add_date!=null">
            {{ scope.row.add_date | dateFormat}}
          </template>
        </el-table-column>

        <el-table-column :label="$t('adminUserList.cz')" width="150">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <!-- <el-button @click="Disable(scope.row.id)" v-if="scope.row.status===2">禁用</el-button>
                <el-button @click="Disable(scope.row.id)" v-if="scope.row.status===1">启用</el-button> -->
                <el-button @click="Edit(scope.row.authorityId)">{{$t('adminUserList.bianji')}}</el-button>
                <el-button @click="Del(scope.row)">{{$t('adminUserList.shanchu')}}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="pageBox" ref="pageBox" v-if="page.showPagebox">
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

  </div>
</template>


<script>
import main from "@/webManage/js/authority/adminUserManage/adminUserList";
export default main;
</script>

<style scoped lang="less">
@import "../../../common/commonStyle/form";
@import "../../../webManage/css/authority/adminUserManage/adminUserList.less";
</style>
