<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input
            v-model="inputInfo.name"
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            :placeholder="$t('permissions.menulist.qsrcd')"
          ></el-input>
        </div>
        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{
            $t('DemoPage.tableExamplePage.reset')
          }}</el-button>
          <el-button class="bgColor" type="primary" @click="demand" v-enter="demand">{{
            $t('DemoPage.tableExamplePage.demand')
          }}</el-button>
        </div>
      </div>
    </div>
    <div class="jump-list">
      <el-button
        class="bgColor laiketui laiketui-add"
        type="primary"
        @click="$router.push('/authority/permissions/addmenulevel')"
        >{{ $t('permissions.menulist.tjcd') }}</el-button
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
        <el-table-column prop="id" :label="$t('permissions.menulist.cdid')">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('permissions.menulist.cdmc')">
        </el-table-column>
        <el-table-column prop="level" :label="$t('permissions.menulist.cdlx')">
          <template slot-scope="scope">
            <span>{{ scope.row.level == 1 ? '一级' : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="add_date"
          :label="$t('permissions.menulist.tjsj')"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.add_date | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          :label="$t('permissions.menulist.caozuo')"
          width="330"
        >
          <template slot-scope="scope">
            <div class="OP-button">
              <div
                :class="language === 'en' ? 'OP-button-top2' : 'OP-button-top'"
              >
                <el-button @click="viewlower(scope.row)">{{
                  $t('permissions.menulist.ckxj')
                }}</el-button>
                <el-button @click="Edit(scope.row)">{{
                  $t('permissions.menulist.bianji')
                }}</el-button>
                <el-button @click="Delete(scope.row)">{{
                  $t('permissions.menulist.shanchu')
                }}</el-button>
              </div>
              <div class="OP-button-bottom">
                <el-button @click="addmenu(scope.row)">{{
                  $t('permissions.menulist.tjcd')
                }}</el-button>
                <el-button @click="moveUp(scope.$index)">
                  {{
                    scope.$index === 0 && dictionaryNum == 1
                      ? $t('permissions.menulist.xy')
                      : $t('permissions.menulist.sy')
                  }}
                </el-button>
                <el-button
                  @click="placedTop(scope.row)"
                  v-if="scope.$index !== 0 || dictionaryNum !== 1"
                  >{{ $t('permissions.menulist.zd') }}</el-button
                >
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
  getMenuLeveInfo,
  moveTopMenuSort,
  delMenu,
  moveMenuSort
} from '@/api/Platform/permissions'
import { mixinstest } from '@/mixins/index'
export default {
  name: 'menulist',
  mixins: [mixinstest],
  data () {
    return {
      language: '',
      inputInfo: {
        name: ''
      },

      tableData: [],
      loading: true,

      // table高度
      tableHeight: null,

      ids: null
    }
  },

  created () {
    this.language = this.getCookit()

    if (this.$route.params.pageSize) {
      this.pagination.page = this.$route.params.dictionaryNum
      this.dictionaryNum = this.$route.params.dictionaryNum
      this.pageSize = this.$route.params.pageSize
    }
    this.getMenuLeveInfos()
    this.$store.commit('EMPTY_SUPERIOR')

    // this.tableData = [
    //   {
    //     action: "",
    //     add_time: "2021-12-02T06:43:41.000+0000",
    //     guide_name: "平台",
    //     guide_sort: 0,
    //     id: 483,
    //     id_id: "pt_483",
    //     image: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447739884479127552.png",
    //     image1: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211015/1448830694180126720.png",
    //     is_button: 0,
    //     is_core: 1,
    //     is_display: 0,
    //     is_plug_in: 0,
    //     level: 1,
    //     module: "Platform",
    //     name: "",
    //     recycle: 0,
    //     s_id: 0,
    //     sid: "pt_0",
    //     sort: 19,
    //     title: "平台",
    //     type: 0,
    //     url: "/Platform/merchants"
    //   },
    //   {
    //     action: "",
    //     add_time: "2021-12-02T06:54:49.000+0000",
    //     guide_name: "商城",
    //     guide_sort: 0,
    //     id: 576,
    //     id_id: "sc_576",
    //     image: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447740042646331392.png",
    //     image1: "https://laikeds.oss-cn-shenzhen.aliyuncs.com/0/1/20211012/1447740074946666496.png",
    //     is_button: 0,
    //     is_core: 1,
    //     is_display: 0,
    //     is_plug_in: 0,
    //     level: 1,
    //     module: "mall",
    //     name: "",
    //     recycle: 0,
    //     s_id: 0,
    //     sid: "sc_0",
    //     sort: 18,
    //     title: "商城",
    //     type: 1,
    //     url: ""
    //   }
    // ]
  },

  mounted () {
    this.$nextTick(function () {
      this.getHeight()
    })
    window.addEventListener('resize', this.getHeight(), false)
  },

  methods: {
    // 获取cookiet
    getCookit () {
      let myCookie = document.cookie.split(';').map(item => {
        let arr = item.split('=')
        return { name: arr[0], value: arr[1] }
      })
      let strCookit = ''
      myCookie.forEach(item => {
        if (item.name.indexOf('language') !== -1) {
          strCookit = item.value
        }
      })
      return strCookit
    },
    getHeight () {
      this.tableHeight =
        this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
    },

    async getMenuLeveInfos () {
      const res = await getMenuLeveInfo({
        api: 'mch.Mch.Menu.GetMenuList',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        name: this.inputInfo.name
      })
      console.log(res.data)
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      if (res.data.data.total < 10) {
        this.current_num = this.total
      }
    },

    reset () {
      this.inputInfo.name = ''
    },

    demand () {
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.getMenuLeveInfos().then(() => {
        this.loading = false
        if (this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    viewlower (value) {
      this.$router.push({
        path: '/authority/permissions/viewmenu',
        query: { id: value.id }
      })
    },

    Edit (value) {
      console.log(value)
      this.$router.push({
        name: 'editormenulevel',
        params: value,
        query: {
          menulevel: 1,
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize
        }
      })
    },

    addmenu (value) {
      this.$router.push({
        name: 'addmenulevel',
        params: value,
        query: {
          menulevel: 2
        }
      })
    },

    Delete (value) {
      this.$confirm(
        this.$t('permissions.menulist.scqr'),
        this.$t('permissions.menulist.ts'),
        {
          confirmButtonText: this.$t('permissions.menulist.ok'),
          cancelButtonText: this.$t('permissions.menulist.cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          delMenu({
            api: 'mch.Mch.Menu.DelMenu',
            id: value.id
          }).then(res => {
            if (res.data.code == '200') {
              console.log(res)
              this.getMenuLeveInfos()
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
          //   message: '已取消删除'
          // });
        })
    },

    moveUp (value) {
      if (value == 0 && this.dictionaryNum == 1) {
        moveMenuSort({
          api: 'mch.Mch.Menu.SortMove',
          moveId: this.tableData[value + 1].id,
          moveId1: this.tableData[value].id
        }).then(res => {
          if (res.data.code == '200') {
            this.getMenuLeveInfos(this.$route.query.id)
            console.log(res)
            this.$message({
              type: 'success',
              message: this.$t('zdata.xycg'),
              offset: 100
            })
          }
        })
      } else {
        moveMenuSort({
          api: 'mch.Mch.Menu.SortMove',
          moveId: this.tableData[value].id,
          moveId1: value == 0 ? this.ids : this.tableData[value - 1].id
        }).then(res => {
          if (res.data.code == '200') {
            this.getMenuLeveInfos(this.$route.query.id)
            console.log(res)
            this.$message({
              type: 'success',
              message: this.$t('zdata.sycg'),
              offset: 100
            })
          }
        })
      }
    },

    placedTop (value) {
      console.log(value)
      moveTopMenuSort({
        api: 'mch.Mch.Menu.Top',
        id: value.id
      }).then(res => {
        if (res.data.code == '200') {
          console.log(res)
          this.getMenuLeveInfos()
          this.$message({
            type: 'success',
            message: this.$t('zdata.zdcg'),
            offset: 100
          })
        }
      })
    },

    //选择一页多少条
    handleSizeChange (e) {
      this.loading = true
      console.log(e)
      // this.current_num = e
      this.pageSize = e
      this.getMenuLeveInfos().then(() => {
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
      if (e > 1) {
        this.ids = this.tableData[this.tableData.length - 1].id
      }
      this.loading = true
      this.dictionaryNum = e
      this.currpage = (e - 1) * this.pageSize + 1
      this.getMenuLeveInfos().then(() => {
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

  /deep/.Search {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 16px;
    .Search-condition {
      display: flex;
      align-items: center;
      .query-input {
        .Search-input {
          width: 280px;
          margin-right: 10px;
        }
        .el-input__inner {
          height: 40px;
          line-height: 40px;
          border: 1px solid #d5dbe8;
        }
        .el-input__inner:hover {
          border: 1px solid #b2bcd4;
        }
        .el-input__inner:focus {
          border-color: #409eff;
        }
        .el-input__inner::-webkit-input-placeholder {
          color: #97a0b4;
        }
      }

      .btn-list {
        .bgColor {
          background-color: #2890ff;
        }
        .bgColor:hover {
          background-color: #70aff3;
        }
        .fontColor {
          color: #6a7076;
          border: 1px solid #d5dbe8;
        }
        .fontColor:hover {
          color: #2890ff;
          border: 1px solid #2890ff;
          background-color: #fff;
        }
      }
    }
  }

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
      width: 120px;
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
    }
  }

  .menu-list {
    // height: 537px;
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
    }

    /deep/.el-table {
      .OP-button {
        // display: flex;
        // flex-direction: column;
        // justify-content: center;
        .OP-button-top {
          margin-bottom: 8px;
          display: flex;
          justify-content: start;
          button {
            // width: 200px !important;
            &:not(:first-child) {
              margin-left: 8px !important;
            }
          }
        }
        .OP-button-top2 {
          margin-bottom: 8px;
          display: flex;
          justify-content: start;
          button {
            width: 200px !important;
            // width: 88px;
            &:not(:first-child) {
              margin-left: 8px !important;
            }
          }
        }
        .OP-button-bottom {
          display: flex;
          justify-content: start;
        }
      }
    }
  }
}
</style>
