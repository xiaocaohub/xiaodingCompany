<template>
  <div class="container">
    <div class="jump-list">
      <el-button class="bgColor laiketui laiketui-add" type="primary"  @click="$router.push('/authority/roleManagement/addRoles')">{{ $t('roleList.tjjs') }}</el-button>
    </div>

    <div class="menu-list" ref="tableFather">
      <el-table :element-loading-text="$t('DemoPage.loading_text')" v-loading="loading" :data="tableData" ref="table" class="el-table" style="width: 100%"
		  :height="tableHeight">
      <template slot="empty">
          <div class="empty">
            <img src="../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column fixed="left" prop="id" :label="$t('roleList.xh')">
          <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('roleList.js')">
        </el-table-column>
        <el-table-column prop="text" :label="$t('roleList.ms')">
          <!-- <template slot-scope="scope">
            <p class="role-describe">{{ scope.row.role_describe }}</p>
          </template> -->
        </el-table-column>
        <el-table-column prop="add_date" :label="$t('roleList.tjsj')">
          <template slot-scope="scope">
            <span>{{ scope.row.add_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" :label="$t('roleList.cz')">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="View(scope.row)">{{ $t('roleList.ck') }}</el-button>
                <el-button @click="Edit(scope.row)">{{ $t('roleList.bianji') }}</el-button>
                <el-button @click="Delete(scope.row)">{{ $t('roleList.shanchu') }}</el-button>
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
  </div>
</template>

<script>
import roleList from '@/webManage/js/authority/roleManagement/roleList'
export default roleList
</script>

<style scoped lang="less">
@import '../../../webManage/css/authority/roleManagement/roleList.less';
</style>