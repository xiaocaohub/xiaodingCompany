<template>
  <div class="container">
    <div class="btn-nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="商品列表" name="first"></el-tab-pane>
        <el-tab-pane label="虚拟商品" name="second"></el-tab-pane>
        <el-tab-pane label="自选商品" name="third"></el-tab-pane>
        <el-tab-pane label="待审核商品" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="Search">
      <div class="Search-condition">
        <div class="query-input">
          <el-cascader
            v-model="inputInfo.goodsClass"
            class="select-input"
            ref="myCascader"
            placeholder="请选择商品分类"
            :options="classList"
            :props="{ checkStrictly: true }"
            @change="changeProvinceCity"
            clearable>
          </el-cascader>
          <el-select class="select-input" v-model="inputInfo.brand" placeholder="请选择商品品牌">
            <el-option v-for="item in brandList" :key="item.brand_id" :label="item.brand_name" :value="item.brand_id">
            </el-option>
          </el-select>
          <el-select class="select-input" v-model="inputInfo.state" placeholder="请选择商品状态">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input class="input-name" @keyup.enter.native="demand" v-model="inputInfo.name" placeholder="请输入商品"></el-input>
        </div>
        <div class="btn-list">
          <el-button class="fontColor" @click="reset">{{$t('DemoPage.tableExamplePage.reset')}}</el-button>
          <el-button class="bgColor" type="primary" @click="demand" v-enter="demand">{{$t('DemoPage.tableExamplePage.demand')}}</el-button>
        </div>
      </div>
	  </div>
    <div class="jump-list">
      <el-button type="primary"  @click="releaseGoods">发布商品</el-button>
      <el-button class="fontColor" type="primary"  @click="$router.push('/goods/taobaoAssistant/taskList')">批量上架</el-button>
      <el-button class="fontColor" type="primary"  @click="shelves">批量下架</el-button>
      <el-button class="fontColor" @click="delAll" :disabled="is_disabled" >批量删除</el-button>
      <el-button class="fontColors" type="primary"  @click="dialogShow">导出</el-button>
    </div>
    <div class="menu-list" ref="tableFather">
      <el-table element-loading-text="拼命加载中..." v-loading="loading" :data="tableData" @selection-change="handleSelectionChange" ref="table" class="el-table" style="width: 100%"
		  :height="tableHeight">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column prop="id" label="商品编号">
        </el-table-column>
        <el-table-column prop="imgurl" label="商品图片">
            <template slot-scope="scope">
              <img :src="scope.row.imgurl" alt="" @error="handleErrorImg">
            </template>
        </el-table-column>
        <el-table-column prop="product_title" label="商品标题">
        </el-table-column>
        <el-table-column prop="pname" label="商品分类">
        </el-table-column>
        <el-table-column prop="brand_name" label="品牌">
        </el-table-column>
        <el-table-column prop="price" label="价格">
        </el-table-column>
        <el-table-column prop="num" label="库存">
        </el-table-column>
        <el-table-column label="商品状态">
          <template slot-scope="scope">
            <span class="status_name" 
              :class="{ 'actives' : scope.row.status === 1 || scope.row.status === 3, 'active' : scope.row.status === 2 }">
              {{ getStatusName(scope.row.status) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="volume" label="销量">
        </el-table-column>
        <el-table-column prop="upper_shelf_time" label="上架时间">
          <template slot-scope="scope">
            <span></span>
            <span v-if="scope.row.upper_shelf_time">{{ scope.row.upper_shelf_time | dateFormat }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <div class="OP-button">
              <div class="OP-button-top">
                <el-button @click="Edit(scope.row)">编辑</el-button>
                <i></i>
                <el-button @click="standdown(scope.row)">
                  {{ scope.row.status === 2 ? '下架' : '上架' }}
                </el-button>
                <i></i>
                <el-button @click="Copy(scope.row)">添加库存</el-button>
                <i></i>
                <el-button @click="Delete(scope.row)">删除</el-button>
              </div>
            </div>
		      </template>
        </el-table-column>
	    </el-table>
      <div class="pageBox" ref="pageBox" v-if="showPagebox">
        <div class="pageLeftText">显示</div>
        <el-pagination layout="sizes, slot, prev, pager, next" prev-text="上一页" next-text="下一页" @size-change="handleSizeChange"
          :page-sizes="pagesizes" :current-page="pagination.page" @current-change="handleCurrentChange" :total="total">
          <div class="pageRightText">当前显示{{currpage}}-{{current_num}}条，共 {{total}} 条记录</div>
        </el-pagination>
      </div>
    </div>

    <div class="dialog-export">
      <!-- 弹框组件 -->
      <el-dialog
        title="导出数据"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <div class="item" @click="exportPage">
          <i class="el-icon-document"></i>
          <span>导出本页</span>
        </div>
        <div class="item item-center" @click="exportAll">
          <i class="el-icon-document-copy"></i>
          <span>导出全部</span>
        </div>
        <div class="item" @click="exportQuery">
          <i class="el-icon-document"></i>
          <span>导出查询</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { index, delGoodsById, goodsMovePosition, upperAndLowerShelves, isOpen, goodsByTop, label, choiceClass, getGoodsActiveList, editSort } from '@/api/goods/goodsList'
import { exports } from '@/api/export/index'
import { getStorage } from '@/utils/storage'
import { mixinstest } from '@/mixins/index'
import ErrorImg from '@/assets/images/default_picture.png'

export default {
  name: 'virtualgoods',
  mixins: [mixinstest],
  data() {
    return {
      activeName: 'second',
      classList: [],
      brandList: [],
      activityList: [],
      statusList: [
        {
          value: '1',
          label: '待上架'
        },
        {
          value: '2',
          label: '上架'
        },
        {
          value: '3',
          label: '下架'
        },
      ],
      localList: [
        {
          value: '2',
          label: '购物车'
        }
      ],

      standUpDown: '商品上架',

      labelList: [],
      inputInfo: {
        goodsClass: '',
        brand: '',
        type: '',
        state: '',
        location: '',
        label: '',
        name: ''
      },

      type: '',
      value: true,
      is_disabled: true,
      idList: [],

      tableData: [],
      loading: true,

      // 弹框数据
      dialogVisible: false,

      isShow_sort: false,
      isShow_sorts: false,

      // table高度
      tableHeight: null,

      classIds: []
    }
  },

  created() {
    this.choiceClasss().then(() => {
      if(this.$route.params.inputInfo.goodsClass && this.$route.params.inputInfo.goodsClass.length > 1) {
        this.classIds = this.$route.params.inputInfo.goodsClass
        this.allClass(this.classList)
      }
    })
    if(this.$route.params.pageSize) {
      this.pagination.page = this.$route.params.dictionaryNum
      this.dictionaryNum = this.$route.params.dictionaryNum
      this.pageSize = this.$route.params.pageSize
      this.inputInfo = this.$route.params.inputInfo
    }
    this.indexs()
    this.getGoodsActiveLists()
    this.labels()
  },

  mounted() {
    this.$nextTick(function() {
      this.getHeight()
    })
    window.addEventListener('resize',this.getHeight(),false)

  },

  watch: {
    value() {
      this.isOpens()
    }
  },

  methods: {
    // 图片错误处理
    handleErrorImg(e){
      console.log('图片报错了',e.target.src);
      e.target.src=ErrorImg
    },
    handleClick(tab, event) {
      if(tab.name == 'first') {
        this.$router.push('/goods/goodslist/physicalgoods')
      } else if(tab.name == 'second') {
        this.$router.push('/goods/goodslist/virtualgoods')
      } else if(tab.name == 'third') {
        this.$router.push('/goods/goodslist/optionalGoods')
      } else {
        this.$router.push('/goods/goodslist/auditGoods')
      }
    },
    getHeight(){
			this.tableHeight = this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
		},
    // 获取商品类别
    async choiceClasss() {
      const res = await choiceClass({
        api: 'admin.goods.choiceClass',
      })
      res.data.data.list.class_list[0].forEach((item, index) => {
        let obj = item
        this.classList.push({
          value: obj.cid,
          label: obj.pname,
          index: index,
          level: obj.level,
          children: []
        })
      })
    },

    // 根据商品类别id获取商品品牌
    changeProvinceCity(value) {
      choiceClass({
        api: 'admin.goods.choiceClass',
        classId: value.length > 1 ? value[value.length - 1] : value[0]
      }).then(res => {
        let num = this.$refs.myCascader.getCheckedNodes()[0].data.index
        this.brandList = res.data.data.list.brand_list
        if(res.data.data.list.class_list[0].length !== 0) {
          this.$refs.myCascader.getCheckedNodes()[0].data.children = []
          res.data.data.list.class_list[0].forEach((item, index) => {
            let obj = item
            this.$refs.myCascader.getCheckedNodes()[0].data.children.push({
              value: obj.cid,
              label: obj.pname,
              index: index,
              level: obj.level,
              children: []
            })
          })
        }
      })
    },

    // 加载所有分类
    async allClass(value) {
      for(let i = 0; i < value.length -1; i++) {
        if(this.classIds.includes(value[i].value)) {
          choiceClass({
            api: 'admin.goods.choiceClass',
            classId: value[i].value
          }).then(res => {
            if(res.data.data.list.class_list.length !== 0) {
              this.brandList = res.data.data.list.brand_list
              res.data.data.list.class_list[0].forEach((item, index) => {
                let obj = item
                value[i].children.push({
                  value: obj.cid,
                  label: obj.pname,
                  index: index,
                  children: []
                })
              })

              this.allClass(value[i].children)
            }
          })
        } else {
          continue
        }
      }
    },

    // 获取支持活动类型
    async getGoodsActiveLists() {
      const res = await getGoodsActiveList({
        api: 'admin.goods.getGoodsActive',
      })
      this.activityList = res.data.data.filter(item => {
        if(item.status) {
          return item
        }
      })
    },

    // 获取商品标签
    async labels () {
      const res = await label({
        api: 'admin.label.index',
      })
      console.log(res);
      this.labelList = res.data.data.list
    },
    
    async indexs() {
      const res = await index({
        api: 'admin.goods.index',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        commodityType: 0,
        active: this.inputInfo.type,
        cid: this.inputInfo.goodsClass[this.inputInfo.goodsClass.length-1],
        brandId: this.inputInfo.brand,
        status: this.inputInfo.state ? parseInt(this.inputInfo.state) : null,
        showAdr: this.inputInfo.location ? parseInt(this.inputInfo.location) : null,
        productTitle: this.inputInfo.name,
        goodsTga: this.inputInfo.label ? parseInt(this.inputInfo.label) : null
      })
      this.total = res.data.data.total
      this.tableData = res.data.data.list
      this.loading = false
      if(this.total < this.current_num) {
        this.current_num = this.total
      }

      if(this.inputInfo.goodsClass || this.inputInfo.location || this.isShow_sorts) {
        this.isShow_sort = true
      } else {
        this.isShow_sort = false
        this.isShow_sorts = false
      }
    },

    //修改序号
    async Sort(value,index) {
      console.log(value);
      if(value.sort)
      editSort({
        api: 'admin.goods.editSort',
        id: value.id,
        sort: value.sort
      }).then(res => {
        if(res.data.code == '200') {
          this.indexs()
          this.$message({
            type: 'success',
            message: '成功',
            offset: 100
          }); 
        }
      })
    },

    releaseGoods() {
      if(getStorage('laike_store_uaerInfo').mchId !== 0) {
        this.$router.push('/goods/goodslist/releasephysical')
      } else {
        this.$message({
          type: 'error',
          message: '请添加店铺!',
          offset: 100
        })
        this.$router.push('/plug_ins/stores/addStore')
      }
    },

    // 是否线上下架商品
    async isOpens() {
      const res = await isOpen({
        api: 'admin.goods.isOpen',
      })
      console.log(res);
      this.indexs()
      this.$message({
        type: 'success',
        message: '成功',
        offset: 100
      }); 
    },

    reset() {
      this.inputInfo.goodsClass = '',
      this.inputInfo.brand = '',
      this.inputInfo.type = '',
      this.inputInfo.state = '',
      this.inputInfo.location = '',
      this.inputInfo.label = '',
      this.inputInfo.name = ''
      this.isShow_sorts = true
    },

    demand() {
      this.currpage = 1
      this.current_num = 10
      this.showPagebox = false
      this.loading = true
      this.dictionaryNum = 1
      this.indexs().then(() => {
        this.loading = false
        if(this.tableData.length > 5) {
          this.showPagebox = true
        }
      })
    },

    Edit(value) {
      this.$router.push({
        path: '/goods/goodslist/releasephysical',
        query: {
          id: value.id,
          name: 'editor',
          status: value.status_name,
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          classId: value.product_class,
          inputInfo: this.inputInfo
        },
      })
    },

    Delete(value) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGoodsById({
          api: 'admin.goods.delGoodsById',
          goodsId: value.id
        }).then(res => {
          if(res.data.code == '200') {
            console.log(res);
            this.indexs()
            this.$message({
              type: 'success',
              message: '删除成功!',
              offset: 100
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          offset: 100
        });          
      });
    },

    Copy(value) {
      this.$router.push({
        path: '/goods/goodslist/releasephysical',
        query: {
          id: value.id,
          name: 'copy',
          dictionaryNum: this.dictionaryNum,
          pageSize: this.pageSize,
          classId: value.product_class,
          inputInfo: this.inputInfo
        },
      })
    },

    moveUp(value) {
      if(value !== 0) {
          goodsMovePosition({
          api: 'admin.goods.goodsMovePosition',
          moveGoodsId: this.tableData[value - 1].id,
          goodsId: this.tableData[value].id
        }).then(res => {
          if(res.data.code == '200') {
            this.indexs()
            console.log(res);
            this.$message({
              type: 'success',
              message: '操作成功!',
              offset: 100
            });
          }
        })
      } else {
        goodsMovePosition({
          api: 'admin.goods.goodsMovePosition',
          moveGoodsId: this.tableData[value + 1].id,
          goodsId: this.tableData[value].id
        }).then(res => {
          if(res.data.code == '200') {
            this.indexs()
            console.log(res);
            this.$message({
              type: 'success',
              message: '操作成功!',
              offset: 100
            });
          }
        })
      }
    },

    placedTop(value) {
      goodsByTop({
        api: 'admin.goods.goodsByTop',
        goodsId: value.id
      }).then(res => {
        console.log(res);
        this.indexs()
        this.$message({
          type: 'success',
          message: '置顶成功!',
          offset: 100
        });
      })
      console.log(value);
    },

    // 商品上下架
    standdown(value) {
        console.log(value);
        if(value.status === 2) {
            upperAndLowerShelves({
                api: 'admin.goods.upperAndLowerShelves',
                goodsIds: value.id,
                status: 0
            }).then(res => {
              if(res.data.code == '200') {
                console.log(res);
                this.indexs()
                this.$message({
                    type: 'success',
                    message: '下架成功!',
                    offset: 100
                });
              }
            })
        } else {
            upperAndLowerShelves({
                api: 'admin.goods.upperAndLowerShelves',
                goodsIds: value.id,
                status: 1
            }).then(res => {
              if(res.data.code == '200') {
                console.log(res);
                this.indexs()
                this.$message({
                  type: 'success',
                  message: '上架成功!',
                  offset: 100
                });
              }
            })
        }
    },

    // 批量上架
    shelves() {
      if(this.idList.length === 0) {
        this.$message({
          type: 'success',
          message: '请选择商品!',
          offset: 100
        });
      } else {
        if(this.standUpDown == '商品下架') {
          this.idList = this.idList.map(item => {
            return item.id
          })
          this.idList = this.idList.join(',')
          upperAndLowerShelves({
            api: 'admin.goods.upperAndLowerShelves',
            goodsIds: this.idList,
            status: 0
          }).then(res => {
            if(res.data.code == '200') {
              console.log(res);
              this.indexs()
              this.$message({
                type: 'success',
                message: '上架成功!',
                offset: 100
              });
            }
          })
        } else {
          this.idList = this.idList.map(item => {
            return item.id
          })
          this.idList = this.idList.join(',')
          upperAndLowerShelves({
            api: 'admin.goods.upperAndLowerShelves',
            goodsIds: this.idList,
            status: 1
          }).then(res => {
            if(res.data.code == '200') {
              console.log(res);
              this.indexs()
              this.$message({
                type: 'success',
                message: '上架成功!',
                offset: 100
              });
            }
          })
        }
        
      }
    },

    //选择一页多少条
    handleSizeChange(e){
        this.loading = true
        console.log(e);
        // this.dictionaryNum = 1
        // this.current_num = e
        this.pageSize = e
        this.indexs().then(() => {
          this.currpage = ((this.dictionaryNum - 1) * this.pageSize) + 1
          this.current_num = this.tableData.length === this.pageSize ? this.dictionaryNum * this.pageSize : this.total
          this.loading = false
        })
    },

    //点击上一页，下一页
    handleCurrentChange(e){
      this.loading = true
      this.dictionaryNum = e
      this.currpage = ((e - 1) * this.pageSize) + 1
      this.indexs().then(() => {
        this.current_num = this.tableData.length === this.pageSize ? e * this.pageSize : this.total
        this.loading = false
      })
      
	  },

    // 选框改变
    handleSelectionChange(val) {
      if(val.length==0){
        this.is_disabled = true
        this.standUpDown = '商品上架'
      }else{
        this.is_disabled = false
        let is_up = []
        val.map(item => {
          if(item.status_name == "待上架" || item.status_name == "下架") {
            this.standUpDown = '商品上架'
          } else {
            is_up.push(item)
          }
        })
        if(is_up.length == val.length) {
          this.standUpDown = '商品下架'
        }
      }
      this.idList = val
      console.log(val);
      
    },

    // 批量删除
    delAll() {
      this.$confirm('是否删除选中商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.idList = this.idList.map(item => {
          return item.id
        })
        this.idList = this.idList.join(',')
        delGoodsById({
          api: 'admin.goods.delGoodsById',
          goodsId: this.idList
        }).then(res => {
          if(res.data.code == '200') {
            console.log(res);
            this.indexs()
            this.$message({
              type: 'success',
              message: '删除成功!',
              offset: 100
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },

    getStatusName(value) {
      if(value === 1) {
        return '待上架'
      } else if (value === 2) {
        return '已上架'
      } else {
        return '已下架'
      }
    },

    // 弹框方法
    dialogShow() {
      this.dialogVisible = true
    },
    
    handleClose(done) {
      this.dialogVisible = false
    },

    async exportPage() {
      await exports({
        api: 'admin.goods.index',
        pageNo: this.dictionaryNum,
        pageSize: this.pageSize,
        exportType: 1,
        active: this.inputInfo.type,
        cid: this.inputInfo.goodsClass[this.inputInfo.goodsClass.length-1],
        brandId: this.inputInfo.brand,
        productTitle: this.inputInfo.name
      },'pagegoods')
    },

    async exportAll() {
      console.log(this.total);
      await exports({
        api: 'admin.goods.index',
        pageNo: 1,
        pageSize: this.total,
        exportType: 1
      },'allgoods')
    },

    async exportQuery() {
      await exports({
        api: 'admin.goods.index',
        pageNo: 1,
        pageSize: this.total,
        exportType: 1,
        active: this.inputInfo.type,
        cid: this.inputInfo.goodsClass[this.inputInfo.goodsClass.length-1],
        brandId: this.inputInfo.brand,
        productTitle: this.inputInfo.name
      },'querygoods')
    }

  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  /deep/.btn-nav {
    .el-tabs {
      height: 40px;
      .el-tabs__item {
        padding: 0 20px;
      }
      .el-tabs__header {
        margin: 0;
      }
    }
  }

  /deep/.Search{
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    .Search-condition{
      display: flex;
      align-items: center;
      .query-input {
        display: flex;
        .select-input {
            margin-right: 8px;
            &:not(:first-child):not(:last-child) {
              width: 180px;
            }
        }
        .input-name {
          width: 300px;
          height: 40px;
          margin-right: 8px;
          input {
            width: 300px;
            height: 40px;
          }
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
          background-color: #fff;
        }
        .fontColor:hover {
          color: #2890FF;
          border: 1px solid #2890FF;
          background-color: #fff;
        }
        .export {
          position: absolute;
          right: 30px;
        }
      }
    }
    
  }

  /deep/.jump-list {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    padding-left: 10px;
    button {
      width: 88px;
      height: 32px;
      background: #28B6FF;
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

    .fontColor {
      width: 88px;
      height: 32px;
      color: #6a7076;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #B6BEC8;
    }

    .fontColors {
      width: 60px;
      height: 32px;
      color: #6a7076;
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #B6BEC8;
    }

    .show-goods {
      position: absolute;
      right: 30px;
    }
  }

  .menu-list {
    flex: 1;
    background: #FFFFFF;
    border-radius: 4px;
    /deep/.el-table__header {
      thead {
        tr {
          th{
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
          td{
            height: 92px;
            text-align: center;
            font-size: 14px;
            color: #414658;
            font-weight: 400;
          }
        }
      }
      .cell {
        .status_name {
          width: 58px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          display: inline-block;
          border-radius: 10px;
          font-size: 14px;
          color: #fff;
          &.active {
              background-color: #18C364;
          }
          &.actives {
              background-color: #97A0B4;
          }
        }
      }
      .cell {
        img {
          width: 60px;
          height: 60px;
        }
      }

      .cell {
        .el-input {
          max-width: 140px;
          input {
            text-align: center;
          }
        }
      }
    }

    /deep/.el-table{
      .OP-button{
        .OP-button-top{
          margin-bottom: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          .el-button {
            border: none;
            color: #1890ff;
          }
          i {
            display: inline-block;
            width: 1px;
            height: 12px;
            background-color: #e8e8e8;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>