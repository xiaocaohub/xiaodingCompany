<template>
  <div class="container">
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-input
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            v-model="searchForm.express_name"
            placeholder="请输入快递单号/快递订单ID"
          ></el-input>

          <el-input
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            v-model="searchForm.sNo"
            placeholder="请输入订单编号"
          ></el-input>

          <!-- <el-input
            size="medium"
            @keyup.enter.native="demand"
            class="Search-input"
            v-model="searchForm.mch_name"
            placeholder="请输入店铺名称"
          ></el-input> -->

          <el-select
            class="select-input"
            v-model="searchForm.status"
            placeholder="请选择打印状态"
          >
            <el-option
              v-for="item in stateList"
              :key="item.brand_id"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <div class="select-date">
            <el-date-picker
              v-model="searchForm.date"
              type="datetimerange"
              :range-separator="$t('reportManagement.businessReport.zhi')"
              :start-placeholder="$t('reportManagement.businessReport.ksrq')"
              :end-placeholder="$t('reportManagement.businessReport.jsrq')"
              value-format="yyyy-MM-dd HH:mm:ss"
              :editable="false"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{
            $t("DemoPage.tableExamplePage.reset")
          }}</el-button>
          <el-button class="bgColor" type="primary" @click="demand">{{
            $t("DemoPage.tableExamplePage.demand")
          }}</el-button>
        </div>
      </div>
    </div>
    <!-- @click="$router.push('/order/setExpressSheet/addExpress')" -->
    <div class="jump-list" ref="tableFather">
      <el-button
        class="bgColor el-icon-printer"
        type="primary"
        @click="handlePrint"
        >打印面单</el-button
      >
    </div>

    <!-- 表格数据 -->
    <div class="dictionary-list" ref="tableFather">
      <el-table
        :element-loading-text="$t('DemoPage.tableExamplePage.loading_text')"
        v-loading="loading"
        :data="tableData"
        @selection-change="handleSelectionChange"
        ref="table"
        class="el-table"
        style="width: 100%"
        :height="tableHeight"
      >
        <template slot="empty">
          <div class="empty">
            <img src="../../../assets/imgs/empty.png" alt="" />
            <p style="color: #414658">{{ $t("zdata.zwsj") }}</p>
          </div>
        </template>
        <el-table-column
          fixed="left"
          type="selection"
          width="55"
        ></el-table-column>
        <el-table-column prop="id" label="序号" width="150"></el-table-column>
        <el-table-column
          prop="courier_num"
          label="快递单号"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="kuaidi_name"
          label="快递公司"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="kdComOrderNum"
          label="快递订单id"
          width="150"
        ></el-table-column>
        <el-table-column
          prop="sNo"
          label="订单编号"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="shop_name"
          label="所属店铺"
          width="150"
        ></el-table-column>
        <el-table-column prop="is_status" label="打印状态" width="150">
          <template slot-scope="scope">
            {{ scope.row.is_status == 0 ? "未打印" : "已打印" }}
          </template>
        </el-table-column>
        <el-table-column prop="id" label="收货地址" width="270">
          <template slot-scope="scope">
            <p>收货人：{{ scope.row.name }}</p>
            <p>联系电话：{{ scope.row.mobile }}</p>
            <p>
              收货地址：{{ scope.row.sheng }}{{ scope.row.shi
              }}{{ scope.row.xian }}{{ scope.row.address }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="发货地址" width="270">
          <template slot-scope="scope">
            <p>发货人：{{ scope.row.send_name }}</p>
            <p>联系电话：{{ scope.row.send_tel }}</p>
            <p>
              发货地址：{{ scope.row.send_sheng }}{{ scope.row.send_shi
              }}{{ scope.row.send_xian }}{{ scope.row.send_address }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="deliver_time"
          label="发货时间"
          width="150"
        ></el-table-column>
        <el-table-column fixed="right" :label="$t('orderLists.cz')" width="220">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button
                  icon="el-icon-circle-close"
                  @click="handleCloseOrder(scope.row.id)"
                  >取消订单</el-button
                >
                <el-button icon="el-icon-view"  @click="PreviewImg(scope.row.label)">查看面单</el-button>
              </div>
              <div class="OP-button-top">
                <el-button
                  icon="el-icon-view"
                  @click="handleViewGoods(scope.row.id)"
                  >查看商品</el-button
                >
                <el-button style="opacity: 0" icon="el-icon-view"
                  >查看商品</el-button
                >
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pageBox" ref="pageBox">
        <div class="pageLeftText">
          {{ $t("DemoPage.tableExamplePage.show") }}
        </div>
        <el-pagination
          layout="sizes, slot, prev, pager, next"
          :prev-text="$t('DemoPage.tableExamplePage.prev_text')"
          :next-text="$t('DemoPage.tableExamplePage.next_text')"
          @size-change="handleSizeChange"
          :page-sizes="pagesizes"
          :current-page="pagination.page"
          @current-change="handleCurrentChange"
          :total="total"
        >
          <div class="pageRightText">
            {{ $t("DemoPage.tableExamplePage.on_show") }}{{ currpage }}-{{
              current_num
            }}{{ $t("DemoPage.tableExamplePage.twig") }}{{ total
            }}{{ $t("DemoPage.tableExamplePage.twig_notes") }}
          </div>
        </el-pagination>
      </div>
    </div>
    <el-image
         ref="elImage"
          style="width: 0; height: 0;"
          :src="bigImageUrl"
          :preview-src-list="logicImageList">
        </el-image>
  </div>
</template>
<script>
import { mixinstest } from "@/mixins/index";

import { getTableList, del } from "@/api/order/electronicSheetList";
import pageData from "@/api/constant/page";

export default {
  name: "ElectronicSheetList",
  mixins: [mixinstest],
  props: {},
  components: {},
  loading: true,
  data() {
    return {
      language: "ZH",
      bigImageUrl:'',
      logicImageList:[],
      // 搜索数据
      searchForm: {
        express_name: "",
        sNo: "",
        mch_name: "",
        date: null,
        status: "",
      },
      stateList: [
        { label: "未打印", value: 0 },
        { label: "已打印", value: 1 },
      ],
      loading: true,
      page: pageData.data(),
      tableData: [],
      // table高度
      tableHeight: null,
      checkTabList: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    if (this.$route.query.no) {
      this.searchForm.sNo = this.$route.query.no;
    }
    this.handleTableList();
  },
  mounted() {
    this.$nextTick(function () {
      this.getHeight();
    });
    window.addEventListener("resize", this.getHeight(), false);
  },
  methods: {
    PreviewImg(url) {
        // 调用接口之后获取图片数据
        this.logicImageList = [url]
          this.$nextTick(() => {
            this.$refs.elImage.clickHandler()
          })
    },
    handleCloseOrder(id) {
      let data = {
        api: "mch.Mch.order.CancelElectronicWaybill",
        id: id,
      };

      this.$confirm("确定要取消该电子面单发货吗？", this.$t("smsList.ts"), {
        confirmButtonText: this.$t("smsList.okk"),
        cancelButtonText: this.$t("smsList.ccel"),
        type: "warning",
      })
        .then(() => {
          del(data).then((res) => {
            console.log("resres", res);
            if (res.data.code == "200") {
              this.$message({
                type: "success",
                message: this.$t("zdata.sccg"),
                offset: 102,
              });
              this.handleTableList();
            }
          });
        })
        .catch(() => {});
    },
    handleViewGoods(id) {
      console.log("index", id);
      this.$router.push({
        name: "goodList",
        query: {
          id: id,
        },
      });
    },
    getHeight() {
      this.tableHeight =
        this.$refs.tableFather.clientHeight -
        this.$refs.pageBox.clientHeight -
        20;
      //   this.tableHeight =400
    },
    demand() {
      this.handleTableList();
    },
    reset() {
      this.searchForm.express_name = "";
      this.searchForm.sNo = "";
      this.searchForm.mch_name = "";
      this.searchForm.status = "";
      this.searchForm.date = "";
      this.pageSize = 10;
      this.dictionaryNum = 1;
    },
    async handleTableList() {
      let data = {
        api: "mch.Mch.Order.ShippingRecords",
        express_name: this.searchForm.express_name,
        sNo: this.searchForm.sNo,
        mch_name: this.searchForm.mch_name,
        status: this.searchForm.status,
        startDate: this.searchForm.date ? this.searchForm.date[0] : "",
        endDate: this.searchForm.date ? this.searchForm.date[1] : "",
        pageSize: this.pageSize,
        pageNo: this.dictionaryNum,
      };
      const res = await getTableList(data);
      console.log("xxxxx113113113", res);
      this.total = res.data.data.total;
      this.tableData = res.data.data.list;
      this.pagination.page = this.dictionaryNum;
      this.loading = false;
      if (this.total < this.current_num) {
        this.current_num = this.total;
      }
    },
    // 页码切换
    handleSizeChange(e) {
      this.page.loading = true;
      this.page.pageSize = e;
      this.handleTableList().then(() => {
        this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1;
        this.current_num =
          this.page.tableData.length === this.pageSize
            ? this.dictionaryNum * this.pageSize
            : this.total;
        this.page.loading = false;
      });
    },
    handleCurrentChange(e) {
      this.page.loading = true;
      this.dictionaryNum = e;
      this.currpage = (e - 1) * this.pageSize + 1;
      this.handleTableList().then(() => {
        this.currpage = (this.dictionaryNum - 1) * this.pageSize + 1;
        this.current_num =
          this.page.tableData.length === this.pageSize
            ? this.dictionaryNum * this.pageSize
            : this.total;
        this.page.loading = false;
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.checkTabList = val;
    },
    // 打印面单
    handlePrint() {
      if (this.checkTabList.length <= 0) {
        this.$message({
          message: "请选择电子面单",
          type: "error",
          offset: 100,
        });
      } else {
        let routeData = this.$router.resolve({
          path: "/printSheet",
          query: {
            list: JSON.stringify(this.checkTabList),
          },
        });
        window.open(routeData.href, "_blank");
      }
    },
  },
};
</script>
<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  /deep/.Search {
    margin: 16px 0;
    .Search-condition {
      .query-input {
        display: flex;
        margin-right: 10px;

        .Search-input {
          margin-right: 10px;
        }

        .select-input {
          margin-right: 10px;
        }
      }
    }
  }

  /deep/.jump-list {
    .laiketui:before {
      font-size: 14px;
      margin-right: 8px;
    }

    .laiketui-add:before {
      font-size: 14px;
      margin-right: 8px;
    }

    .laiketui-shangjia:before {
      font-size: 14px;
      margin-right: 8px;
      position: relative;
      top: 1px;
    }

    button {
      margin-right: 10px;
      // padding: 0 10px;
      margin-bottom: 20px;
    }

    .el-icon-printer:before {
      margin-right: 8px;
    }
  }

  /deep/.jump-list2 {
    .laiketui-add:before {
      font-size: 14px;
      margin-right: 8px;
    }
    button {
      min-width: 220px;
    }
  }

  .dictionary-list {
    // height: 605px;
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
        .OP-button-top {
          margin-bottom: 8px;
          display: flex;
          justify-content: space-evenly;
        }
        .OP-button-button {
          display: flex;
          justify-content: space-evenly;
          // .el-botton{
          //   width: 5.5rem;
          // }
        }
      }
    }
  }
}
</style>
