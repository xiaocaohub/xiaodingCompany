<template>
  <el-breadcrumb class="app-breadcrumb">
    <transition-group name="breadcrumb" id="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in newList" :key="index">
        <span v-if="item.redirect==='noRedirect'||index==newList.length-1" class="no-redirect">{{ generateTitle(item.meta.title) }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ generateTitle(item.meta.title) }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  data() {
    return {
      levelList: null,
      newList: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.title !== '列表' && item.meta.breadcrumb !== false)
      this.newList = []
      let redirect = this.levelList[1].redirect
      this.levelList.filter(item => {
        this.newList.push(item)
      })
      if(this.newList.length == 3 && this.newList[1].meta.title == this.newList[2].meta.title && this.newList[2].meta.title !== '订单列表') {
        this.newList.pop()
      }
      if(this.newList[1].meta.title == '积分商城') {
        if(this.newList[2].meta.title == '添加商品' || this.newList[2].meta.title == '编辑') {
          let arrs = {
            meta: {
              title: "积分商品"
            },
            redirect: '/plug_ins/integralMall/integralGoodsList'
          }
          this.newList.splice(2, 0, arrs)
        }

        if(this.newList[2].meta.title == '售后管理') {
          let arrs = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '售后详情') {
          let arrs1 = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }
          let arrs2 = {
            meta: {
              title: "售后管理"
            },
            redirect: '/plug_ins/integralMall/afterSaleList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if(this.newList[2].meta.title == '订单结算') {
          let arrs = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }

          this.newList.splice(2, 0, arrs)
        }


        if(this.newList[2].meta.title == '查看') {
          let arrs1 = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }
          let arrs2 = {
            meta: {
              title: "订单结算"
            },
            redirect: '/plug_ins/integralMall/orderSettlementList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if(this.newList[2].meta.title == '评价管理') {
          let arrs = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }

          this.newList.splice(2, 0, arrs)
        }

        if(this.newList[2].meta.title == '评价明细') {
          let arrs1 = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }
          let arrs2 = {
            meta: {
              title: "评价管理"
            },
            redirect: '/plug_ins/integralMall/commentList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }
        if(this.newList[2].meta.title == '修改') {
          let arrs1 = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }
          let arrs2 = {
            meta: {
              title: "评价管理"
            },
            redirect: '/plug_ins/integralMall/commentList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if(this.newList[2].meta.title == '订单详情' || this.newList[2].meta.title == '商品发货' || this.newList[2].meta.title == '编辑订单') {
          let arrs = {
            meta: {
              title: "兑换订单"
            },
            redirect: '/plug_ins/integralMall/integralOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
      }
      if(this.newList[1].meta.title == '竞拍'){
          if(this.newList[2].meta.title == '发布专场' || this.newList[2].meta.title == '编辑专场' || this.newList[2].meta.title == '查看拍品' || this.newList[2].meta.title == '店铺拍品') {
            let arrs = {
            meta: {
              title: "专场列表"
            },
            redirect: '/plug_ins/auction/specialLlist'
          }
          this.newList.splice(2, 0, arrs)
          }
           if(this.newList[2].meta.title == '订单结算'|| this.newList[2].meta.title == '商品发货'|| this.newList[2].meta.title == '编辑订单' || this.newList[2].meta.title == '订单详情'|| this.newList[2].meta.title == '评价管理') {
            let arrs = {
            meta: {
              title: "竞拍订单"
            },
            redirect: '/plug_ins/auction/auctionOrder'
          }
          this.newList.splice(2, 0, arrs)
          }
          if(this.newList[2].meta.title == '出价详情'){
              let arrs = {
                meta: {
                  title: "专场列表"
                },
                redirect: '/plug_ins/auction/mchList'
              }
              // let arrs2 = {
              //   meta: {
              //     title: "查看拍品"
              //   },
              //   redirect: '/plug_ins/auction/mchCheck'
              // }
              this.newList.splice(2, 0, arrs)
              // this.newList.splice(3, 0, arrs2)
          }

          if(this.newList[2].meta.title == '查看'){
             let arrs = {
                meta: {
                  title: "竞拍订单"
                },
                redirect: '/plug_ins/auction/auctionOrder'
              }
              let arrs2 = {
                meta: {
                  title: "订单结算"
                },
                redirect: '/plug_ins/auction/orderSettlementList'
              }
              this.newList.splice(2, 0, arrs)
              this.newList.splice(3, 0, arrs2)
          }
          if(this.newList[2].meta.title == '详情' || this.newList[2].meta.title == '评价明细'){
            let arrs = {
              meta: {
                title: "竞拍订单"
              },
              redirect: '/plug_ins/auction/auctionOrder'
            }
            let arrs2 = {
              meta: {
                title: "评价管理"
              },
              redirect: '/plug_ins/auction/evaluateList'
            }
            this.newList.splice(2, 0, arrs)
            this.newList.splice(3, 0, arrs2)
          }
      }
      // 限时折扣Start
      if(this.newList[1].meta.title == '限时折扣'){
        if(this.newList[2].meta.title == '编辑订单'|| this.newList[2].meta.title == '订单详情' || this.newList[2].meta.title == '售后管理' || this.newList[2].meta.title == '评价管理'|| this.newList[2].meta.title == '订单结算'||this.newList[2].meta.title == '结算详情'){
          let arrs = {
            meta: {
              title: "活动订单"
            },
            redirect: '/plug_ins/discount/discount_orderlist'
          }
          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '查看评价' || this.newList[2].meta.title == '评价明细' || this.newList[2].meta.title == '修改'){
          let arrs = {
            meta: {
              title: "活动订单"
            },
            redirect: '/plug_ins/discount/discount_orderlist'
          }
          let arrs2 = {
            meta: {
              title: "评价管理"
            },
            redirect: '/plug_ins/discount/discount_commentList'
          }
          this.newList.splice(2, 0, arrs)
          this.newList.splice(3, 0, arrs2)
        }
        // 售后审核
        if(this.newList[2].meta.title == '售后详情'){
          let arrs = {
            meta: {
              title: "活动订单"
            },
            redirect: '/plug_ins/discount/discount_orderlist'
          }
          let arrs2 = {
            meta: {
              title: "售后管理"
            },
            redirect: '/plug_ins/discount/discount_ReturnList'
          }
          this.newList.splice(2, 0, arrs)
          this.newList.splice(3, 0, arrs2)
        }
        // 结算详情
        console.log('265265265265265',this.newList);
        if(this.newList[2].meta.title == '结算详情'||this.newList[2].meta.title == '查看'){
          let arrs = {
            meta: {
              title: "活动订单"
            },
            redirect: '/plug_ins/discount/discount_orderlist'
          }
          let arrs2 = {
            meta: {
              title: "订单结算"
            },
            redirect: '/plug_ins/discount/orderSettlementList'
          }
          this.newList.splice(2, 0, arrs)
          this.newList.splice(3, 0, arrs2)
        }
         // 活动列表
         if(this.newList[2].meta.title == '添加活动'||this.newList[2].meta.title == '查看活动'||this.newList[2].meta.title == '编辑活动'){
          let arrs = {
            meta: {
              title: "活动列表"
            },
            redirect: '/plug_ins/discount/discount_list'
          }
          this.newList.splice(2, 0, arrs)
          if(this.$route.query.text){
            this.newList[ this.newList.length-1].meta.title = this.$route.query.text
          }
          console.log( this.newList,'nmslnmslnmsl',this.$route.query.text);
        }
      }
      // 限时折扣END
      if(this.newList[1].meta.title == '拼团'){
        if(this.newList[2].meta.title == '添加拼团活动' || this.newList[2].meta.title == '编辑' || this.newList[2].meta.title == '查看详情'){
          let arrs = {
            meta: {
              title: "拼团活动"
            },
            redirect: '/plug_ins/group/groupGoods'
          }
          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '开团详情'){
          let arrs = {
            meta: {
              title: "开团记录"
            },
            redirect: '/plug_ins/group/groupRecord'
          }
          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '编辑订单'|| this.newList[2].meta.title == '订单详情' || this.newList[2].meta.title == '售后管理' || this.newList[2].meta.title == '评价管理'|| this.newList[2].meta.title == '订单结算'){
          let arrs = {
            meta: {
              title: "拼团订单"
            },
            redirect: '/plug_ins/group/groupOrderList'
          }
          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '售后详情'){
          let arrs = {
            meta: {
              title: "拼团订单"
            },
            redirect: '/plug_ins/group/groupOrderList'
          }
          let arrs2 = {
            meta: {
              title: "售后管理"
            },
            redirect: '/plug_ins/group/salesReturnList'
          }
          this.newList.splice(2, 0, arrs)
          this.newList.splice(3, 0, arrs2)
        }
        if(this.newList[2].meta.title == '详情' || this.newList[2].meta.title == '评价明细' || this.newList[2].meta.title == '修改' || this.newList[2].meta.title == '查看'){
          let arrs = {
            meta: {
              title: "拼团订单"
            },
            redirect: '/plug_ins/group/groupOrderList'
          }
          let arrs2 = {
            meta: {
              title: "评价管理"
            },
            redirect: '/plug_ins/group/commentList'
          }
          this.newList.splice(2, 0, arrs)
          this.newList.splice(3, 0, arrs2)
        }
        if(this.newList[2].meta.title == '结算详情' ){
          let arrs = {
            meta: {
              title: "拼团订单"
            },
            redirect: '/plug_ins/group/groupOrderList'
          }
          let arrs2 = {
            meta: {
              title: "订单结算"
            },
            redirect: '/plug_ins/group/orderSettlementList'
          }
          this.newList.splice(2, 0, arrs)
          this.newList.splice(3, 0, arrs2)
        }
       
      }
      console.log(this.newList);
      if(this.newList[0].meta.title == '插件'){
        if(this.newList[1].meta.title == '限时折扣' && (this.newList[2].meta.title == '添加活动')) {
          let arrs = {
            meta: {
              title: "活动列表"
            },
            redirect: '/plug_ins/discount/discount_list'
          }
          this.newList.splice(2, 0, arrs)
        }
      }
      if(this.newList[1].meta.title == '秒杀') {
        if(this.newList[2].meta.title == '添加商品' || this.newList[2].meta.title == '商品列表') {
          let arrs = {
            meta: {
              title: "秒杀标签"
            },
            redirect: '/plug_ins/seckill/seckillLabel'
          }
          this.newList.splice(2, 0, arrs)
        }

        if(this.newList[2].meta.title == '编辑' ||this.newList[2].meta.title == '查看商品') {
          let arrs1 = {
            meta: {
              title: "秒杀标签"
            },
            redirect: '/plug_ins/seckill/seckillLabel'
          }
          let arrs2 = {
            meta: {
              title: "商品列表"
            },
            redirect: '/plug_ins/seckill/goodsList'
          }
          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if(this.newList[2].meta.title == '售后管理') {
          let arrs = {
            meta: {
              title: "秒杀订单"
            },
            redirect: '/plug_ins/seckill/seckillOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '售后详情') {
          let arrs1 = {
            meta: {
              title: "秒杀订单"
            },
            redirect: '/plug_ins/seckill/seckillOrder'
          }
          let arrs2 = {
            meta: {
              title: "售后管理"
            },
            redirect: '/plug_ins/seckill/afterSaleList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if(this.newList[2].meta.title == '订单结算') {
          let arrs = {
            meta: {
              title: "秒杀订单"
            },
            redirect: '/plug_ins/seckill/seckillOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '查看') {
          let arrs1 = {
            meta: {
              title: "秒杀订单"
            },
            redirect: '/plug_ins/seckill/seckillOrder'
          }
          let arrs2 = {
            meta: {
              title: "订单结算"
            },
            redirect: '/plug_ins/seckill/orderSettlementList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if(this.newList[2].meta.title == '评价管理') {
          let arrs = {
            meta: {
              title: "秒杀订单"
            },
            redirect: '/plug_ins/seckill/seckillOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
        if(this.newList[2].meta.title == '修改') {
          let arrs1 = {
            meta: {
              title: "秒杀订单"
            },
            redirect: '/plug_ins/seckill/seckillOrder'
          }
          let arrs2 = {
            meta: {
              title: "评价管理"
            },
            redirect: '/plug_ins/seckill/commentList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if(this.newList[2].meta.title == '订单详情' || this.newList[2].meta.title == '商品发货' || this.newList[2].meta.title == '编辑订单') {
          let arrs = {
            meta: {
              title: "秒杀订单"
            },
            redirect: '/plug_ins/seckill/seckillOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
      }

      //预售
      if (this.newList[1].meta.title == '预售') {
        if (
          this.newList[2].meta.title == '发布商品' ||
          this.newList[2].meta.title == '编辑商品' ||
          this.newList[2].meta.title == '查看详情'
        ) {
          let arrs = {
            meta: {
              title: '商品列表'
            },
            redirect: '/plug_ins/preSale/goodsList'
          }
          this.newList.splice(2, 0, arrs)
        }

        if (this.newList[2].meta.title == '售后管理') {
          let arrs = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
        if (this.newList[2].meta.title == '售后详情') {
          let arrs1 = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }
          let arrs2 = {
            meta: {
              title: '售后管理'
            },
            redirect: '/plug_ins/preSale/afterSaleList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if (this.newList[2].meta.title == '订单结算') {
          let arrs = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }

          this.newList.splice(2, 0, arrs)
        }

        if (this.newList[2].meta.title == '查看' && this.$route.query.orderNo) {
          let arrs1 = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }
          let arrs2 = {
            meta: {
              title: '订单结算'
            },
            redirect: '/plug_ins/preSale/orderSettlementList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }
        if (this.newList[2].meta.title == '查看' && this.$route.query.id) {
          let arrs1 = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }
          let arrs2 = {
            meta: {
              title: '评价管理'
            },
            redirect: '/plug_ins/preSale/evaluateList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if (this.newList[2].meta.title == '评价管理') {
          let arrs = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
        if (this.newList[2].meta.title == '评价明细') {
          let arrs1 = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }
          let arrs2 = {
            meta: {
              title: '评价管理'
            },
            redirect: '/plug_ins/preSale/evaluateList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }
        if (this.newList[2].meta.title == '修改' || this.newList[2].meta.title == '查看评论' ) {
          let arrs1 = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }
          let arrs2 = {
            meta: {
              title: '评价管理'
            },
            redirect: '/plug_ins/preSale/evaluateList'
          }

          this.newList.splice(2, 0, arrs1)
          this.newList.splice(3, 0, arrs2)
        }

        if (
          this.newList[2].meta.title == '订单详情' ||
          this.newList[2].meta.title == '商品发货' ||
          this.newList[2].meta.title == '编辑订单' ||
          this.newList[2].meta.title == '查看物流'
        ) {
          let arrs = {
            meta: {
              title: '预售订单'
            },
            redirect: '/plug_ins/preSale/preSaleOrder'
          }

          this.newList.splice(2, 0, arrs)
        }
      }

    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      if(item.meta.returns || item.returns) {
        this.$router.go(-1)
      } else {
        if (redirect) {
          this.$router.push(redirect)
          return
        }
        this.$router.push(this.pathCompile(path))
      }
      console.log(redirect);
    },

    generateTitle(title) {
        const hasKey = this.$te('route.' + title)
        if (hasKey) {
          const translatedTitle = this.$t('route.' + title)
          return translatedTitle
        }
        return title
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 18px;
  line-height: 60px;
  margin-left: 20px;

  .no-redirect {
    color: #414658;
    cursor: text;
  }

  a  {
    color: #414658;
  }

  a:hover {
    color: #2890ff;
  }

  span {
    color: #6a7076 !important;
  }

}
</style>
