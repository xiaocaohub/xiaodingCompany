<template>
  <div class="container">
    <div class="jump-list">
      <el-button
        class="bgColor laiketui laiketui-add"
        type="primary"
        @click="$router.push('/set/slideshowSet/addSlideshow')"
        >{{ $t('slideshowSet.tjlbt') }}</el-button
      >
    </div>

    <div class="menu-list" ref="tableFather">
      <el-table
        :element-loading-text="$t('DemoPage.loading_text')"
        v-loading="loading"
        :data="tableData"
        ref="table"
        class="el-table"
        style="width: 100%"
        :height="tableHeight"
      >
      <template slot="empty">
          <div class="empty">
            <img src="../../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t('zdata.zwsj') }}</p>
          </div>
        </template>
        <el-table-column prop="id" label="ID" width="100"> </el-table-column>
        <el-table-column prop="image" :label="$t('slideshowSet.tp')">
          <template slot-scope="scope">
            <img :src="scope.row.image" alt="" @error="handleErrorImg" />
          </template>
        </el-table-column>
        <el-table-column prop="url" :label="$t('slideshowSet.lj')">
          <template slot-scope="scope">
            <p class="link">{{ scope.row.url }}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="add_date"
          :label="$t('slideshowSet.tjsj')"
          width="185"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.add_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('slideshowSet.px')" width="110">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.sort"
              :controls="false"
              @input="changeInput(scope.$index)"
              @change="Sort(scope.row, scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('zdata.cz')" width="150">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="Edit(scope.row)">{{
                  $t('zdata.bj')
                }}</el-button>
                <el-button @click="Delete(scope.row)">{{
                  $t('zdata.sc')
                }}</el-button>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox" ref="pageBox" v-if="showPagebox">
        <div class="pageLeftText">{{ $t('DemoPage.show') }}</div>
        <el-pagination
          layout="sizes, slot, prev, pager, next"
          :prev-text="$t('DemoPage.prev_text')"
          :next-text="$t('DemoPage.next_text')"
          @size-change="handleSizeChange"
          :page-sizes="pagesizes"
          :current-page="pagination.page"
          @current-change="handleCurrentChange"
          :total="total"
        >
          <div class="pageRightText">
            {{ $t('DemoPage.on_show') }}{{ currpage }}-{{ current_num
            }}{{ $t('DemoPage.twig') }} {{ total }}
            {{ $t('DemoPage.twig_notes') }}
          </div>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  bannerList,
  delBannerById,
  setBannerSort
} from '@/api/set/slideshowSet'
import { mixinstest } from '@/mixins/index'
import ErrorImg from '@/assets/images/default_picture.png'
export default {
  name: 'sets',
  mixins: [mixinstest],
  data () {
    return {
      tableData: [],
      loading: true,

      // table高度
      tableHeight: null
    }
  },

  created () {
    this.bannerList()
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
    // 图片错误处理
    handleErrorImg (e) {
      console.log('图片报错了', e.target.src)
      e.target.src = ErrorImg
    },
    async bannerList () {
      const res = await bannerList({
        api: 'mch.Mch.Set.BannerList',
        type: 3
      })
      console.log(res)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      if (this.total < this.current_num) {
        this.current_num = this.total
      }
    },

    // 获取table高度
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },

    changeInput (value, index) {
      if (parseInt(value) < 0) {
        this.tableData[index].sort = 1
      }
    },

    //修改序号
    async Sort (value, index) {
      console.log(value)
      // if(value.sort)
      setBannerSort({
        api: 'mch.Mch.Set.SetBannerSort',
        id: value.id,
        sort: value.sort
      }).then(res => {
        if (res.data.code == '200') {
          this.bannerList()
          this.$message({
            type: 'success',
            message: this.$t('zdata.cg'),
            offset: 100
          })
        }
      })
    },

    Edit (value) {
      this.$router.push({
        name: 'editorSlideshow',
        params: value,
        query: {
          id: value.id
        }
      })
    },

    Delete (value) {
      this.$confirm(this.$t('slideshowSet.qrsc'), this.$t('zdata.ts'), {
        confirmButtonText: this.$t('zdata.ok'),
        cancelButtonText: this.$t('zdata.off'),
        type: 'warning'
      })
        .then(() => {
          delBannerById({
            api: 'mch.Mch.Set.DelBannerById',
            id: value.id
          }).then(res => {
            console.log(res)
            if (res.data.code == '200') {
              this.bannerList()
              this.$message({
                type: 'success',
                message: this.$t('zdata.sccg'),
                offset: 100
              })
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除',
          //   offset: 100
          // });
        })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      // this.current_num = e
      this.pageSize = e
      this.getRefundLists().then(() => {
        this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1
        this.current_num =
          this.tableData.length === this.pageSize
            ? this.dictionaryNum * this.pageSize
            : this.total
        this.loading = false
      })
    },

    //点击上一页，下一页
    handleCurrentChange (e) {
      this.loading = true
      this.dictionaryNum = e
      this.currpage = (e - 1) * this.pageSize + 1
      this.getRefundLists().then(() => {
        this.current_num =
          this.tableData.length === this.pageSize
            ? e * this.pageSize
            : this.total
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
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
      // padding: 0;
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
  }

  .menu-list {
    flex: 1;
    background: #ffffff;
    border-radius: 4px;
    /deep/.el-table__header {
      thead {
        tr {
          th {
            height: 61px;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            color: #414658;
          }
        }
      }
    }
    /deep/.el-table__body {
      tbody {
        tr {
          td {
            height: 92px;
            text-align: center;
            font-size: 14px;
            color: #414658;
            font-weight: 400;
          }
        }
      }
      .cell {
        .el-input {
          max-width: 100px;
          input {
            text-align: center;
          }
        }
        img {
          width: 122px;
          height: 50px;
        }
        .link {
          text-align: left;
        }
      }
    }
    /deep/.el-table {
      .OP-button {
        .OP-button-top {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .el-button {
            width: 88px;
            margin-left: 0px;
            &:not(:last-child) {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
