<template>
  <div class="navbar" ref="navHeader">
    <div class="left-control">
      <img :src="$store.getters.logo" alt="" />
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
    </div>
    <!-- <el-image
      style="width: 121px; height: 40px"
      :src="logo"
      :fit="fit"></el-image> -->
    <div class="right-block">
      <ul class="Hui-userbar">
        <li class="dropDown">
          <div class="top-dropDown">
            <img :src="$store.getters.head_img" alt="" />
            <span>{{ $store.getters.storeName }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <ul class="dropDown-menus">
            <li @click="editorInfo">
              <i class="el-icon-takeaway-box"></i>
              <span>{{ $t("topNav.basicInformation") }}</span>
            </li>
            <li @click="changePassWord">
              <i class="el-icon-lock"></i>
              <span>{{ $t("topNav.changePassword") }}</span>
            </li>
          </ul>
        </li>
        <li class="headerLi">
          <div class="top-headerLi" @click="handleheaderLi">
            <el-badge
              :value="allNum"
              :max="99"
              class="totle-item"
              v-if="allNum !== 0"
            >
            </el-badge>
            <img src="@/assets/imgs/xiaoxi.png" alt="" />
          </div>
          <ul class="headerLi-menus" ref="headerLi_menus">
            <li class="leveone">
              <div class="topmenus" @click="orderShow = !orderShow">
                <span class="order-remind">{{ $t("topNav.ddtx") }}</span>
                <div class="read">
                  <div class="operation">
                    <div
                      v-if="orderInfo.total"
                      class="operation-read"
                      @click.stop="orderAllRead"
                    >
                      <i class="laiketui laiketui-biaojiweiyidu"></i>
                      <span @click="noticeReads('1,2,3,4,5,6')">{{
                        $t("topNav.yjyd")
                      }}</span>
                    </div>
                    <el-badge
                      :value="orderInfo.total"
                      :max="99"
                      class="item"
                      v-if="orderInfo.total !== 0"
                    >
                    </el-badge>
                    <i
                      :class="[
                        orderShow
                          ? 'el-icon-arrow-down'
                          : 'el-icon-arrow-right',
                      ]"
                    ></i>
                  </div>
                </div>
              </div>
              <ul class="detail-menus" v-show="orderShow">
                <li class="levetwo" v-if="orderInfo.list">
                  <div
                    class="submenu"
                    @click="notificationDelivery = !notificationDelivery"
                  >
                    <span class="order-remind">{{ $t("topNav.dfhtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="orderInfo.list[0].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click="noticeReads(1)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ orderInfo.list[0].total }}）</span>
                        <i
                          :class="[
                            notificationDelivery
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="orderInfo.list[0]"
                    v-show="notificationDelivery"
                  >
                    <li
                      v-for="(item, index) in orderInfo.list[0].list"
                      :key="index"
                      @click="
                        goOrderList(
                          item.parameter,
                          item.id,
                          item.toUrl,
                          item.self_lifting
                        )
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.ddxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="levetwo" v-if="orderInfo.list">
                  <div class="submenu" @click="afterSales = !afterSales">
                    <span class="order-remind">{{ $t("topNav.shdcltz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="orderInfo.list[1].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(2)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ orderInfo.list[1].total }}）</span>
                        <i
                          :class="[
                            afterSales
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="orderInfo.list[1]"
                    v-show="afterSales"
                  >
                    <li
                      v-for="(item, index) in orderInfo.list[1].list"
                      :key="index"
                      @click="
                        salesReturnDetails(item.id, item.parameter, item.toUrl)
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.ddxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="levetwo" v-if="orderInfo.list">
                  <div
                    class="submenu"
                    @click="shipmentRemind = !shipmentRemind"
                  >
                    <span class="order-remind">{{ $t("topNav.fhtxtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="orderInfo.list[2].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(3)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ orderInfo.list[2].total }}）</span>
                        <i
                          :class="[
                            shipmentRemind
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="orderInfo.list[2]"
                    v-show="shipmentRemind"
                  >
                    <li
                      v-for="(item, index) in orderInfo.list[2].list"
                      :key="index"
                      @click="
                        goOrderList(
                          item.parameter,
                          item.id,
                          item.toUrl,
                          item.self_lifting
                        )
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.ddxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="levetwo" v-if="orderInfo.list">
                  <div class="submenu" @click="orderDown = !orderDown">
                    <span class="order-remind">{{ $t("topNav.ddgbtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="orderInfo.list[3].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(4)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ orderInfo.list[3].total }}）</span>
                        <i
                          :class="[
                            orderDown
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="orderInfo.list[3]"
                    v-show="orderDown"
                  >
                    <li
                      v-for="(item, index) in orderInfo.list[3].list"
                      :key="index"
                      @click="
                        goOrderList(
                          item.parameter,
                          item.id,
                          item.toUrl,
                          item.self_lifting
                        )
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.ddxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="levetwo" v-if="orderInfo.list">
                  <div class="submenu" @click="newOrder = !newOrder">
                    <span class="order-remind">{{ $t("topNav.xddtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="orderInfo.list[4].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(5)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ orderInfo.list[4].total }}）</span>
                        <i
                          :class="[
                            newOrder
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="orderInfo.list[4]"
                    v-show="newOrder"
                  >
                    <li
                      v-for="(item, index) in orderInfo.list[4].list"
                      :key="index"
                      @click="
                        goOrderList(
                          item.parameter,
                          item.id,
                          item.toUrl,
                          item.self_lifting
                        )
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.ddxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="levetwo" v-if="orderInfo.list">
                  <div class="submenu" @click="orderGoods = !orderGoods">
                    <span class="order-remind">{{ $t("topNav.ddshtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="orderInfo.list[5].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(6)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ orderInfo.list[5].total }}）</span>
                        <i
                          :class="[
                            orderGoods
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="orderInfo.list[5]"
                    v-show="orderGoods"
                  >
                    <li
                      v-for="(item, index) in orderInfo.list[5].list"
                      :key="index"
                      @click="
                        goOrderList(
                          item.parameter,
                          item.id,
                          item.toUrl,
                          item.self_lifting
                        )
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.ddxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li class="leveone">
              <div class="topmenus" @click="goodsShow = !goodsShow">
                <span class="goods-remind">{{ $t("topNav.sptx") }}</span>
                <div class="read">
                  <div class="operation">
                    <div class="operation-read" v-if="goodsInfo.total">
                      <i class="laiketui laiketui-biaojiweiyidu"></i>
                      <span @click.stop="noticeReads('9,15,18')">{{
                        $t("topNav.yjyd")
                      }}</span>
                    </div>
                    <el-badge
                      :value="goodsInfo.total"
                      :max="99"
                      class="item"
                      v-if="goodsInfo.total !== 0"
                    >
                    </el-badge>
                    <i
                      :class="[
                        goodsShow
                          ? 'el-icon-arrow-down'
                          : 'el-icon-arrow-right',
                      ]"
                    ></i>
                  </div>
                </div>
              </div>
              <ul class="detail-menus" v-show="goodsShow">
                <!-- <li class="levetwo" v-if="goodsInfo.list">
                  <div class="submenu" @click="goodsAudit = !goodsAudit">
                    <span class="order-remind">{{ $t('topNav.spshtz') }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="goodsInfo.list[0].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(7)">{{
                            $t('topNav.yjyd')
                          }}</span>
                        </div>
                        <span>（{{ goodsInfo.list[0].total }}）</span>
                        <i
                          :class="[
                            goodsAudit
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right'
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="goodsInfo.list[0]"
                    v-show="goodsAudit"
                  >
                    <li
                      v-for="(item, index) in goodsInfo.list[0].list"
                      :key="index"
                      @click="goGoodsAudit(item.content, item.id)"
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t('topNav.ddxx') }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t('topNav.see') }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li> -->
                <li class="levetwo" v-if="goodsInfo.list">
                  <div
                    class="submenu"
                    @click="goodsReplenishment = !goodsReplenishment"
                  >
                    <span class="order-remind">{{ $t("topNav.spbhtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="goodsInfo.list[0].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(9)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ goodsInfo.list[0].total }}）</span>
                        <i
                          :class="[
                            goodsReplenishment
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="goodsInfo.list[0]"
                    v-show="goodsReplenishment"
                  >
                    <li
                      v-for="(item, index) in goodsInfo.list[0].list"
                      :key="index"
                      @click="goInventoryList(item.content, item.parameter)"
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.spxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="levetwo" v-if="goodsInfo.list">
                  <div class="submenu" @click="goodsAudit = !goodsAudit">
                    <span class="order-remind">{{ $t("topNav.wgxztz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="goodsInfo.list[1].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(15)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ goodsInfo.list[1].total }}）</span>
                        <i
                          :class="[
                            goodsAudit
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="goodsInfo.list[1]"
                    v-show="goodsAudit"
                  >
                    <li
                      v-for="(item, index) in goodsInfo.list[1].list"
                      :key="index"
                      @click="goWgGoodsAudit(item.content, item.id)"
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.spxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <!-- 商品审核通知 -->
                <li class="levetwo" v-if="goodsInfo.list">
                  <div class="submenu" @click="goodsIssh = !goodsIssh">
                    <span class="order-remind">{{ $t("topNav.spshtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="goodsInfo.list[2].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(18)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ goodsInfo.list[2].total }}）</span>
                        <i
                          :class="[
                            goodsIssh
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="goodsInfo.list[2]"
                    v-show="goodsIssh"
                  >
                    <li
                      v-for="(item, index) in goodsInfo.list[2].list"
                      :key="index"
                      @click="
                        goBillAduit(
                          item.content,
                          item.id,
                          item.parameter,
                          item.toUrl
                        )
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.spxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <!-- 账单提醒 -->
            <li class="leveone">
              <div class="topmenus" @click="billShow = !billShow">
                <span class="goods-remind">{{ $t("topNav.zdtx") }}</span>
                <div class="read">
                  <div class="operation">
                    <div class="operation-read" v-if="billInfo.total">
                      <i class="laiketui laiketui-biaojiweiyidu"></i>
                      <span @click.stop="noticeReads('24,25')">{{
                        $t("topNav.yjyd")
                      }}</span>
                    </div>
                    <el-badge
                      :value="billInfo.total"
                      :max="99"
                      class="item"
                      v-if="billInfo.total !== 0"
                    >
                    </el-badge>
                    <i
                      :class="[
                        billShow ? 'el-icon-arrow-down' : 'el-icon-arrow-right',
                      ]"
                    ></i>
                  </div>
                </div>
              </div>
              <ul class="detail-menus" v-show="billShow">
                <li class="levetwo" v-if="billInfo.list">
                  <div class="submenu" @click="wdInform = !wdInform">
                    <span class="order-remind">{{ $t("topNav.txtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="billInfo.list[0].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(24)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ billInfo.list[0].total }}）</span>
                        <i
                          :class="[
                            wdInform
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="billInfo.list[0]"
                    v-show="wdInform"
                  >
                    <li
                      v-for="(item, index) in billInfo.list[0].list"
                      :key="index"
                      @click="
                        goWDRouter(item, item.id, item.parameter, item.toUrl)
                      "
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.zdxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li class="levetwo" v-if="billInfo.list">
                  <div class="submenu" @click="bomInform = !bomInform">
                    <span class="order-remind">{{ $t("topNav.bzjtz") }}</span>
                    <div class="read">
                      <div class="operation">
                        <div
                          class="operation-read"
                          v-if="billInfo.list[1].total"
                        >
                          <i class="laiketui laiketui-biaojiweiyidu"></i>
                          <span @click.stop="noticeReads(25)">{{
                            $t("topNav.yjyd")
                          }}</span>
                        </div>
                        <span>（{{ billInfo.list[1].total }}）</span>
                        <i
                          :class="[
                            bomInform
                              ? 'el-icon-arrow-down'
                              : 'el-icon-arrow-right',
                          ]"
                        ></i>
                      </div>
                    </div>
                  </div>
                  <ul
                    class="order-details"
                    v-if="billInfo.list[1]"
                    v-show="bomInform"
                  >
                    <li
                      v-for="(item, index) in billInfo.list[1].list"
                      :key="index"
                      @click="goEMRouter(item.id)"
                    >
                      <div class="left-icon">
                        <img src="@/assets/imgs/logo2.png" alt="" />
                      </div>
                      <div class="right-info">
                        <div class="top-date">
                          <span class="orderInfo">{{ $t("topNav.zdxx") }}</span>
                          <span class="date">{{ item.add_date }}</span>
                        </div>
                        <div class="bottom-detail">
                          <p>{{ item.content }}</p>
                          <a href="javascript:;">{{ $t("topNav.see") }}</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <!-- 客服 -->
        <li class="kefuCss" @click="_kefu">
          <i class="el-icon-service"></i>
          <span class="kefuCssRed" v-if="mchOnlineMessageNotRead"></span>
        </li>
        <!-- 客服 -->
        <li class="Lang">
          <div class="top-lang">
            <img src="@/assets/imgs/lang.png" alt="" />
          </div>
          <ul class="lang-menus">
            <li
              :class="this.$i18n.locale == 'zh' ? 'lang_active' : ''"
              class="zh"
              @click="toggleZh('zh')"
            >
              <span>中文</span>
            </li>
            <li
              :class="this.$i18n.locale == 'en' ? 'lang_active' : ''"
              class="en"
              @click="toggleZh('en')"
            >
              <span>English</span>
            </li>
          </ul>
        </li>
        <li class="sign-out" @click="signOut" v-bind:title="message">
          <i class="el-icon-switch-button"></i>
        </li>
      </ul>
    </div>

    <!-- 客服弹窗开始 -->
    <div class="kefuTc">
      <el-dialog
        :show-close="false"
        :modal-append-to-body="false"
        :visible.sync="isKeFuShow"
        :before-close="_kefu"
      >
        <div class="pageBox_kf" @click.stop>
          <!-- 店铺列表 -->
          <div class="kf_left" @click="showBQ = false">
            <!-- 消息列表 -->
            <div class="left_title">{{ $t("消息列表") }}</div>
            <!-- 搜索最近联系人 -->
            <div class="left_input">
              <img :src="searchImg" />
              <el-input
                v-model="userName"
                :placeholder="$t('搜索最近联系人')"
              ></el-input>
            </div>
            <!-- 用户列表 -->
            <div class="left_list">
              <template v-for="(item, index) in userlist">
                <div
                  class="list_item"
                  :class="{ list_item_active: isActive == index }"
                  :key="index"
                  @click="_getKF(item, index)"
                >
                  <div class="item_img">
                    <img :src="item.headimgurl" />
                  </div>
                  <div class="item_content">
                    <div class="content_title">{{ item.user_name }}</div>
                    <div class="content_message">{{ item.content }}</div>
                  </div>
                  <div class="item_end">
                    <div class="end_time">{{ item.addTime }}</div>
                    <div class="end_num" v-if="item.no_read_num > 0">
                      <span>{{
                        item.no_read_num <= 99 ? item.no_read_num : "+99"
                      }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!-- 聊天信息框 -->
          <div class="kf_right" @click="showBQ = false">
            <!-- 用户名称、 X关闭 -->
            <div class="right_title">
              <div class="title_name">
                <template v-if="userlist.length">
                  {{ userlist[isActive].user_name }}
                </template>
              </div>
              <div class="title_del">
                <i class="el-icon-close" @click="_kefu"></i>
              </div>
            </div>
            <!-- 聊天内容 -->
            <div class="right_message">
              <template v-for="(item, index) in arrlist">
                <!-- 用户发送的消息 -->
                <div class="message_mch" v-if="item.is_mch_send == 0">
                  <div class="mch_content">
                    <!-- 发送图片消息 -->
                    <div
                      class="kefu_content_img"
                      v-if="
                        item.content &&
                        item.content.length > 4 &&
                        item.content.slice(0, 4) == 'http'
                      "
                    >
                      <a :href="item.content" target="_blank">
                        <img :src="item.content" alt="点击查看大图" />
                      </a>
                    </div>
                    <!-- 发送文字消息 -->
                    <div class="kefu_content_text" v-else>
                      {{ item.content }}
                    </div>
                  </div>
                </div>
                <!-- 店铺发送的消息 -->
                <div class="message_user" v-if="item.is_mch_send == 1">
                  <div class="user_content">
                    <!-- 发送图片消息 -->
                    <div
                      class="kefu_content_img"
                      v-if="
                        item.content &&
                        item.content.length > 4 &&
                        item.content.slice(0, 4) == 'http'
                      "
                    >
                      <a :href="item.content" target="_blank">
                        <img :src="item.content" alt="点击查看大图" />
                      </a>
                    </div>
                    <!-- 发送文字消息 -->
                    <div class="kefu_content_text" v-else>
                      {{ item.content }}
                    </div>
                  </div>
                  <img :src="item.img" />
                </div>
              </template>
            </div>
            <!-- 表情、图片 -->
            <div class="right_img">
              <div class="img_bq" @click.stop="showBQ = true">
                <img :src="bqUrl" />
                <div class="BQlist" v-if="showBQ">
                  <span
                    v-for="(item, index) in emojiData"
                    @click.stop="_chooceBQ(item)"
                  >
                    {{ item }}
                  </span>
                </div>
              </div>
              <el-upload
                v-if="!(userlist.length == 0)"
                class="img_tp"
                :action="actionUrl"
                :show-file-list="false"
                :on-success="_chooceImgSuccess"
                :before-upload="_chooceImgbefore"
              >
                <img :src="tpUrl" />
              </el-upload>
            </div>
            <!-- 输入框 -->
            <div class="right_input">
              <div class="kefu_input">
                <!-- <textarea v-model="input_content"></textarea> -->
                <el-input
                  ref="elInput"
                  type="textarea"
                  resize="none"
                  maxlength="140"
                  :placeholder="$t('请输入内容')"
                  v-model="input_content"
                  @keydown.native="_listenerKeydown"
                  @keyup.native="_listenerKeyup"
                >
                </el-input>
              </div>
              <div class="kefu_buttom" @click="_handleChange">
                <div>{{ $t("发送") }}</div>
              </div>
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 客服弹窗结束 -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import {
  loginOut,
  noticeList,
  noticeRead,
  noticePopup,
  kefuApi,
} from "@/api/layout/information";
import { getStorage, setStorage } from "@/utils/storage";
import emoji from "@/assets/kefu/emoji/emoji.js";
import Config from "@/packages/apis/Config";
import { sendImage } from "@/api/order/sendGoods";
export default {
  components: {
    Hamburger,
  },
  data() {
    return {
      //客服开始
      isSpace: 0, //空格键是否被按下
      isEnter: 0, //enter键是否被按下
      urlType: "", //根据配置的url判断项目类型：java/php
      isKeFuShow: false, //是否显示客服弹窗
      isActive: 0, //选择第几个客服
      showBQ: false, //显示表情列表
      userName: "", //搜索的用户
      emojiData: [], //表情列表
      currentUserId: "", //当前用户id
      currentMchId: "", //当前店铺id 如有则会把此店铺排到第一位
      userlist: [], //客服用户列表
      userlistindex: 0, //当前用户下标
      type: 1, //0是用户，1是店铺
      arrlist: [], //聊天内容列表
      img_list: [], //发送图片
      input_content: "", //发送的内容
      socketTask: "", //WebSocket上下文
      searchImg: require("@/assets/kefu/head_ss.png"),
      bqUrl: require("@/assets/kefu/biaoqing.png"),
      tpUrl: require("@/assets/kefu/xiangce.png"),
      actionUrl: Config.baseUrl, //上传图片url
      //客服结束
      message: "退出系统",
      storeImg: "",
      storeName: "老长沙龙虾馆",
      // 订单通知数据
      allNum: 0,
      orderInfo: {},
      goodsInfo: {},
      billInfo: {},

      billShow: false,
      wdInform: false,
      bomInform: false,

      orderShow: false,
      notificationDelivery: false,
      afterSales: false,
      shipmentRemind: false,
      orderDown: false,
      newOrder: false,
      orderGoods: false,
      mchOnlineMessageNotRead: 0, //客服聊天通知 0没有人  >0有人和你聊天
      goodsShow: false,
      goodsAudit: false,
      goodsIssh: false,
      goodsReplenishment: false,
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    head_img() {
      return getStorage("head_img");
    },
    logo() {
      return getStorage("logo");
    },
  },
  mounted() {
    //根据配置的url判断项目类型：java/php
    if (process.env.VUE_APP_LKT_KEFU_URL == "wss://tp.dev.laiketui.net/wss/") {
      this.urlType = "PHP";
    } else {
      this.urlType = "JAVA";
    }
    //加载表情包
    this.emojiData = emoji;
    //开启循环
    let me = this;
    // setInterval(() => {
    //   if (!getStorage("tag")) {
    //     me.noticeList();
    //   }
    // }, 3000);
    me.noticeList();
  },
  created() {
    this.noticeList();
  },
  watch: {
    userName(val) {
      console.log("正在搜索用户-》", val);
      this.isActive = 0; //搜索的时候默认下标为0 选择第一条
      this._getUserList();
    },
  },
  methods: {
    /**
     * 客服开始
     */
    //监听按下键盘，初始化值
    _listenerKeyup(event) {
      const keyCode = event.keyCode || event.which;
      if (keyCode == 13) {
        this.isEnter = 0;
      }
      if (keyCode == 32) {
        this.isSpace = 0;
      }
    },
    //监听松开键盘，发送消息
    _listenerKeydown(event) {
      //不存在用户数据时，禁用
      if (this.userlist.length == 0) {
        //54502 不要显示提示信息
        //this.$message.error('不存在该用户');
        return;
      }
      const keyCode = event.keyCode || event.which;
      if (keyCode == 13) {
        this.isEnter = 1;
      }
      if (keyCode == 32) {
        this.isSpace = 1;
      }
      if (this.isSpace == 1 && this.isEnter == 1) {
        console.log("空格+Enter 键被按下！--》执行换行");
      } else if (this.isEnter == 1) {
        console.log("Enter 键被按下！--》发送消息");
        //发送消息方法
        this._handleChange();
        //默认按enter会有换行效果，所以这里使用  event.preventDefault();阻止默认事件，可根据自己的项目需求进行修改
        event.preventDefault();
      }
    },
    //客服显示弹窗
    _kefu() {
      this.isKeFuShow = !this.isKeFuShow;
      if (this.isKeFuShow) {
        console.log("点击客服按钮-》显示客服窗口");
        //获取当前店铺id
        this.currentMchId = getStorage("mchId");
        //获取当前用户id
        this.currentUserId = "";
        //获取用户列表
        this._getUserList();
        //连接 websocket
        this.connectSocket();
      } else {
        console.log("点击关闭客服～");
        //关闭弹窗时进行数据初始化
        this.isActive = 0;
        this.userlistindex = 0;
        //强制断开websocket
        this.socketTask.close();
      }
    },
    //点击切换店铺
    _getKF(item, index) {
      //当前选择的客服下标
      this.isActive = index;
      //滚动效果
      let leftList = document.querySelector(".left_list");
      let isScrollTop = (leftList.scrollHeight / 12) * index;
      leftList.scrollTop = isScrollTop;
      //获取当前用户id
      this.currentUserId = item.user_id;
      //更新当前用户数据，标记已读
      this.userlistindex = index;
      this.userlist[this.userlistindex].no_read_num = 0;
      //获取 当前店铺的聊天记录
      this._newlist();
    },
    //选择表情
    _chooceBQ(item) {
      //不存在用户数据时，禁用
      if (this.userlist.length == 0) {
        //54502 不要显示提示信息
        //this.$message.error('不存在该用户');
        return;
      }
      this.input_content = this.input_content.concat(item);
      this.$refs.elInput.focus();
    },
    //发送图片做限制
    _chooceImgbefore(file) {
      console.log("发送图片的格式～", file, file.type);
      const isJPG =
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //获取图片二进制流 并发送图片
    _chooceImgSuccess(res, file) {
      console.log("使用上传组件～", file, URL.createObjectURL(file.raw));
      //转二进制流
      const formData = new FormData();
      formData.append("image", file.raw);
      //使用专用接口
      sendImage(formData).then((res) => {
        if (res.data.code == 200) {
          this.img_list = res.data.data.url[0];
          //发送图片
          this._handleChange();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //获取 用户列表
    async _getUserList() {
      let data = {
        api: "pcMch.Msg.mch_userList",
        mchId: this.currentMchId, //当前店铺id
        userName: this.userName, //搜索的用户名称
      };
      kefuApi(data)
        .then((res) => {
          res = res.data;
          if (res.data.list && res.data.list.length > 0) {
            //用户列表
            this.userlist = res.data.list;
            //与第一个用户聊天
            this.currentUserId =
              this.userlist.length > 0
                ? this.userlist[0].user_id
                : this.currentUserId;
            //当前用户id消息 全部已读
            if (this.currentUserId) {
              this.userlist[0].no_read_num = 0;
            }
            //获取 当前用户的聊天记录
            this._newlist();
          } else {
            //测试说 搜索不到就显示空
            this.userlist = [];
            console.log("获取用户列表->", res);
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    //获取 当前用户的聊天记录
    _newlist() {
      let data = {
        api: "pcMch.Msg.getMessageList",
        userId: this.currentUserId,
        mchId: this.currentMchId,
        type: this.type,
      };
      kefuApi(data)
        .then((res) => {
          res = res.data;
          if (res.code == 200) {
            this.arrlist = res.data.list;
            //客服弹窗显示时 切换店铺显示该店铺最新消息
            this.$nextTick(() => {
              this._scrollTop(".right_message");
            });
          } else {
            console.log("获取当前用户的聊天记录->", res);
          }
        })
        .catch((error) => {
          this.$message.error(error.message);
        });
    },
    //发送消息
    _handleChange() {
      //不存在用户数据时，禁用
      if (this.userlist.length == 0) {
        //54502 不要显示提示信息
        //this.$message.error('不存在该用户');
        return;
      }
      if (!this.input_content && !this.img_list) {
        console.log("不能发送空");
      } else {
        let data = {
          api: "pcMch.Msg.addMessage",
          send_id: this.currentMchId, //发送方id
          receive_id: this.currentUserId, //接收方id
          content: this.input_content ? this.input_content : "", //发送内容
          is_mch_send: this.type, //0用户 1店铺
          img_list: this.img_list, //发送图片传值
        };
        kefuApi(data)
          .then((res) => {
            res = res.data;
            if (res.code == 200) {
              //发送出去的消息，显示在记录中
              let newData = {};
              newData.nike_name = getStorage("storeName");
              newData.img = getStorage("head_img");
              newData.content = this.input_content
                ? this.input_content
                : this.img_list;
              newData.is_mch_send = this.type;
              this.arrlist.push(newData);
              if (this.urlType == "PHP") {
                //上传服务器
                this.sendSocketMessage(res.data[0]).then();
              }
              //初始化输入框
              this.input_content = "";
              this.img_list = "";
              //聊天内容 自动滚动到底部
              this.$nextTick(() => {
                this._scrollTop(".right_message");
              });
            } else {
              console.log("发送消息->", res);
            }
          })
          .catch((error) => {
            this.$message.error(error.message);
          });
      }
    },
    //聊天内容 自动滚动到底部
    _scrollTop(className) {
      setTimeout(() => {
        let leftList = document.querySelector(className);
        let isScrollTop = leftList.scrollHeight;
        leftList.scrollTop = isScrollTop;
      }, 100);
    },
    //websocket 开始
    //连接
    connectSocket() {
      //当前店铺id 不能为空
      if (this.currentMchId == "" || !this.currentMchId) {
        console.log("这种情况不允许链接");
        return;
      }

      //websocket请求地址(区分JAVA与PHP)
      let wsurl = "";
      if (this.urlType == "PHP") {
        wsurl = process.env.VUE_APP_LKT_KEFU_URL;
        console.log("websocket请求地址->PHP", wsurl);
      } else {
        let storType = 7;
        wsurl =
          process.env.VUE_APP_LKT_KEFU_URL +
          this.currentMchId +
          "/" +
          this.currentMchId +
          "/" +
          storType;
        console.log("websocket请求地址->JAVA", wsurl);
      }

      let that = this;
      //获取websocket 上下文
      this.socketTask = new WebSocket(wsurl);
      console.log("websocket上下文->", this.socketTask);

      //监听WebSocket连接
      this.socketTask.onopen = (res) => {
        console.log("WebSocket连接已打开！");
        //that.heart()
      };
      //监听WebSocket返回数据
      this.socketTask.onmessage = (res) => {
        //初始化data
        let data = {};
        data = JSON.parse(res.data);
        console.log("监听到websocket返回数据--》", data);

        //PHP通过此方式传值 用户ID
        if (data.client_key) {
          let storType = 7;
          let msg = {
            type: "login", //消息类型
            is_mch_send: "1", //是否店铺发送，用户发送0 店铺发送1
            send_id: that.currentMchId, //发送方id
            client_key: data.client_key, //client_key
            source: storType, //stor_type
          };
          that.sendSocketMessage(msg).then();
        }

        //获取 当前数据的用户id/发送者id
        if (!that.currentUserId || that.currentUserId == "") {
          if (data.user_id) {
            that.currentUserId = data.user_id;
          } else if (data.send_id) {
            that.currentUserId = data.send_id;
          }
        }

        //如果data.user_id存在，即有新增用户与我方聊天
        if (data.user_id) {
          let found = false;
          for (var i = 0; i < that.userlist.length; i++) {
            let tmpUserid = that.userlist[i].user_id;
            //如果店铺列表中【存在】当前店铺id，更新当前店铺数据
            if (data.user_id == tmpUserid) {
              //更新用户数据
              that.userlist[i] = data;
              found = true;
              break;
            }
            //如果当前用户id == 发送方ID，则标记已读
            if (that.currentUserId == tmpUserid) {
              that.userlist[i].no_read_num = 0;
            }
          }
          //如果用户列表中【不存在】当前用户id，则新增用户
          if (!found) {
            that.userlist.push(data);
          }
          //强制更新数组
          that.userlist.splice(0, 0);
        } else {
          //这里加一个防止串台的判断
          setTimeout(() => {
            //如果当前用户列表只存在一个，获取当前用户id
            if (that.userlist.length == 1) {
              that.currentUserId = that.userlist[0].user_id;
            }
            //如果当前用户id == 发送方ID，获取聊天内容
            if (
              that.currentUserId &&
              data.send_id &&
              data.send_id == that.currentUserId
            ) {
              that.arrlist.push(data);
              //聊天内容 自动滚动到底部
              this.$nextTick(() => {
                this._scrollTop(".right_message");
              });
            }
            //如果当前用户id == 发送方ID，则标记已读
            for (var i = 0; i < that.userlist.length; i++) {
              let tmpUserid = that.userlist[i].user_id;
              //如果当前店主正在聊的客户和数组中的客户是同一个则设置未读为0
              if (that.currentUserId == tmpUserid) {
                that.userlist[i].no_read_num = 0;
              }
            }
            //强制更新数组
            that.userlist.splice(0, 0);
          }, 100);
        }
        //更新用户列表
        that.userlist = that.userlist;
        //迫使组件实例重新渲染
        that.$forceUpdate();
      };

      this.socketTask.onerror = (res) => {
        console.log("WebSocket连接打开失败，请检查！", res);
        //进入重新连接
        that.reconnect();
      };

      // 监听连接关闭 -
      this.socketTask.onclose = (e) => {
        console.log("WebSocket连接关闭！", e);
        //clearInterval(that.timer)
        //that.timer = ''
        //客服弹窗未关闭才执行，已关闭不需要提示
        if (this.isKeFuShow) {
          this.$message.success(this.$t("客服连接已断开～"));
          //关闭客服弹窗，并进行数据初始化
          this.isKeFuShow = false;
          this.isActive = 0;
          this.userlistindex = 0;
        }
      };
    },
    //进入重新连接
    reconnect() {
      console.log("进入断线重连...");
      this.socketTask = null;
      if (this.currentMchId) {
        this.connectSocket(this.currentMchId);
      }
    },
    //发送消息
    sendSocketMessage(msg) {
      let that = this;
      msg = JSON.stringify(msg);
      console.log("发送消息-->msg", msg);
      return new Promise((reslove, reject) => {
        that.socketTask.send(msg);
      });
    },
    //心跳
    heart() {
      clearInterval(this.timer);
      let that = this;
      this.timer = "";
      let msg = {
        type: "heartbeat",
      };
      this.timer = setInterval(() => {
        that.sendSocketMessage(msg).then();
      }, 55000);
    },
    //websocket 结束
    /**
     * 客服结束
     */

    // 点击铃铛
    handleheaderLi() {
      console.log("铃铛ref", this.$refs.headerLi_menus.style.display);
      if (this.$refs.headerLi_menus.style.display == "block") {
        this.$refs.headerLi_menus.style.display = "none";
      } else {
        this.$refs.headerLi_menus.style.display = "block";
      }
    },
    // 订单通知
    async noticeList() {
      const res = await noticeList({
        api: "mch.Mch.Notice.NoticeList",
      });
      console.log("699", res);
      let orderInfo = res.data.data.list;
      this.allNum =
        orderInfo[0].total + orderInfo[1].total + orderInfo[2].total;
      this.ordertotal = orderInfo[0].total;
      this.goodstotal = orderInfo[1].total;
      this.orderInfo = orderInfo[0];
      this.goodsInfo = orderInfo[1];
      this.billInfo = orderInfo[2];
      this.mchOnlineMessageNotRead = res.data.data.mchOnlineMessageNotRead;
      this.wgGoodList = orderInfo;
      console.log("orderInfo", orderInfo);
      const idList = [];
      this.orderInfo.list.forEach((item) => {
        if (item.list.length) {
          item.list.forEach((items, index) => {
            if (items.is_popup && items.is_popup === "0") {
              this.$notify({
                title: "消息",
                message: items.content,
                type: "success",
                offset: 100,
              });
              idList.push(items.id);
            }
          });
        }
      });
      this.goodsInfo.list.forEach((item) => {
        if (item.list.length) {
          item.list.forEach((items, index) => {
            if (items.is_popup && items.is_popup === "0") {
              this.$notify({
                title: "消息",
                message: items.content,
                type: "success",
                offset: (index + 1) * 100,
              });
              idList.push(items.id);
            }
          });
        }
      });
      if (idList.length) {
        noticePopup({
          api: "admin.mch.notice.noticePopup",
          ids: idList.join(","),
        }).then((res) => {});
      }
      console.log("orderInfo745", orderInfo, this.goodsInfo);
    },

    async noticeReads(type) {
      this.$confirm("确定将该类型通知标记为已读?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          noticeRead({
            api: "mch.Mch.Notice.NoticeRead",
            types: type,
          }).then((res) => {
            if (res.data.code == "200") {
              this.$message({
                type: "success",
                message: this.$t("zdata.czcg"),
                offset: 102,
              });
              this.noticeList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    goOrderList(value, id, url, self_lifting) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
      this.$router.push({
        path: url,
        query: {
          no: value,
          self_lifting: self_lifting,
        },
      });
    },

    salesReturnDetails(id, value, toUrl) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
      if (toUrl) {
        this.$router.push({
          path: toUrl,
          query: {
            id: value,
          },
        });
      }
    },

    goGoodsAudit(value, id) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
      this.$router.push({
        path: "/plug_ins/stores/goodsAudit",
        query: {
          name: value,
        },
      });
    },
    goWgGoodsAudit(value, id) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
      this.$router.push({
        path: "/plug_ins/supplier/supplierGoods",
        query: {
          name: value,
        },
      });
    },
    goInventoryList(value, id) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
      this.$router.push({
        path: "/goods/goodslist",
        query: {
          name: value,
          id: id,
        },
      });
    },
    goBillAduit(value, id, billId, tourl) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
      this.$router.push({
        // path: "/plug_ins/stores/goodsAudit",
        path: tourl,
        query: {
          billId: billId,
        },
      });
    },
    // 账单提醒
    goWDRouter(value, id, billId, tourl) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
      this.$router.push({
        // path: "/plug_ins/stores/goodsAudit",
        path: tourl,
        query: {
          billId: billId,
        },
      });
    },
    goEMRouter(id) {
      noticeRead({
        api: "mch.Mch.Notice.NoticeRead",
        id: id,
      }).then((res) => {
        if (res.data.code == "200") {
          this.noticeList();
        }
      });
    },

    orderAllRead() {
      this.ordertotle = 0;
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    toggleZh(lang) {
      this.$i18n.locale = lang;
      this.$store.dispatch("lang/setLanguage", lang);
      loginOut({
        api: "admin.mch.home.select_language",
        language: lang,
      }).then((res) => {});
    },
    // 退出登录
    signOut() {
      loginOut({
        api: "admin.mch.user.quit",
      }).then((res) => {
        console.log(res);
        const mall = getStorage("mall");
        window.localStorage.clear();
        window.location.href = "/login";
        location.reload();
        window.name = "";
        setStorage("mall", mall);
      });
    },

    editorInfo() {
      this.$router.push("/set/storesInfo/editorInfo");
    },

    changePassWord() {
      this.$router.push("/set/changePassword");
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/webManage/css/kefu/kefu.less";
.navbar {
  height: 60px;
  position: relative;
  background-image: linear-gradient(to right, #0077ff, #00c0ff);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;

  .left-control {
    width: 220px;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    img {
      margin-left: 26px;
      // width: 121px;
      // height: 40px;
      width: auto;
      height: 100%;
    }
    .hamburger-container {
      height: 60px;
      // line-height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background 0.3s;
      -webkit-tap-highlight-color: transparent;
      padding: 0 !important;
      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }
  .headerLi {
    // width: 60px;
    height: 60px;
    line-height: 60px;
    position: relative;
    display: flex;
    justify-content: center;
    margin-left: 40px;
    // &:hover .headerLi-menus {
    //   display: block;
    // }
    .top-headerLi {
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
      position: relative;
      img {
        width: 20px;
        height: 20px;
      }

      .totle-item {
        top: -3px;
        left: 6px;
        font-size: 12px;
        position: absolute;
      }
    }
    .headerLi-menus {
      list-style: none;
      padding: 0;
      margin: 0;
      position: absolute;
      right: -150px;
      top: 60px;
      width: 500px;
      display: none;
      background-color: transparent;
      .leveone {
        cursor: pointer;
        width: 100%;
        // height: 80px;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 30px;
        background-color: #fff;
        margin: 10px 0;
        border-radius: 10px;
        border: 1px solid rgba(99, 61, 61, 0.1);
        box-shadow: 0px 3px 18px 0px rgba(173, 173, 173, 0.8);
        .topmenus {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .order-remind,
          .goods-remind {
            font-size: 16px;
            font-weight: bold;
            color: #333;
          }

          .operation {
            display: flex;
            justify-content: center;
            align-items: center;
            .operation-read {
              display: flex;
              justify-content: center;
              align-items: center;
              color: #0077ff;
              margin-right: 10px;
              font-size: 12px;
            }
            .item {
              margin-top: 12px;
            }
          }
        }

        .detail-menus {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .levetwo {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .submenu {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 50px;
              border-bottom: 1px solid #f3f3f3;
              .order-remind {
                font-size: 14px;
                font-weight: bold;
                color: #666;
              }

              .operation {
                display: flex;
                justify-content: center;
                align-items: center;
                .operation-read {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #0077ff;
                  margin-right: 10px;
                  font-size: 12px;
                }
              }
            }

            .order-details {
              width: 100%;
              max-height: 260px;
              overflow: hidden;
              overflow-y: auto;
              li {
                width: 100%;
                height: 78px;
                display: flex;
                margin: 10px 0;
                font-size: 12px;
                .left-icon {
                  width: 60px;
                  height: 100%;
                  background-color: #0880ff;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-top-left-radius: 8px;
                  border-bottom-left-radius: 8px;
                }
                .right-info {
                  flex: 1;
                  height: 78px;
                  border: 1px solid rgba(0, 0, 0, 0.1);
                  border-top-right-radius: 8px;
                  border-bottom-right-radius: 8px;
                  display: flex;
                  flex-direction: column;
                  // padding: 10px 20px;
                  padding: 10px 20px 10px 20px;
                  .top-date {
                    height: 40%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .orderInfo {
                      font-weight: bold;
                    }
                    .date {
                      color: #cecece;
                    }
                  }

                  .bottom-detail {
                    height: 60%;
                    display: flex;
                    align-items: center;
                    margin-top: 5px;
                    p {
                      width: 90%;
                      line-height: 16px;
                    }
                    a {
                      // flex: 1;
                      margin-left: 5px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .Lang {
    // width: 60px;
    height: 60px;
    line-height: 60px;
    position: relative;
    display: flex;
    justify-content: center;
    // margin-left: 10px;
    margin-left: 40px;
    &:hover .lang-menus {
      display: block;
    }
    .top-lang {
      cursor: pointer;
      color: #fff;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
      }
    }
    .lang-menus {
      list-style: none;
      padding: 0;
      margin: 0;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 60px;
      width: 134px;
      display: none;
      background-color: #fff;
      border: 1px solid #e9ecef;
      box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      li {
        cursor: pointer;
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 14px;
        &:hover {
          color: #2d8cf0;
          background: #f4f7f9;
        }
      }
    }
  }
  .right-block {
    height: 60px;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 40px;
    .Hui-userbar {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      .dropDown {
        // width: 135px;
        height: 60px;
        line-height: 60px;
        position: relative;
        display: flex;
        justify-content: center;
        // margin-right: 21.5px;
        margin-left: 40px;
        &:hover .dropDown-menus {
          display: block;
        }
        .top-dropDown {
          cursor: pointer;
          color: #fff;
          display: flex;
          align-items: center;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 5px;
          }
        }
        .dropDown-menus {
          list-style: none;
          padding: 0;
          margin: 0;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 60px;
          min-width: 154px;
          display: none;
          background-color: #fff;
          border: 1px solid #e9ecef;
          box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          li {
            cursor: pointer;
            width: 100%;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            i {
              margin-right: 6px;
              font-size: 18px;
            }
            &:hover {
              color: #2d8cf0;
              background-color: #f6f7f8;
            }
          }
        }
      }
      .kefuCss {
        height: 60px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 40px;
        cursor: pointer;
        i {
          font-size: 22px;
          color: #fff;
          font-weight: bold;
        }
        .kefuCssRed {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: red;
          position: absolute;
          right: 0;
          margin-bottom: 20px;
        }
      }
      .sign-out {
        height: 60px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 40px;
        i {
          font-size: 20px;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }

  .dialog-block {
    /deep/.el-dialog {
      width: 580px;
      height: 366px;
    }
  }
  .dialog-info {
    /deep/.el-dialog {
      width: 500px;
      height: 500px;
      .el-dialog__body {
        .upload-headimg {
          .el-form-item__content {
            display: flex;
            align-items: center;
            .avatar-uploader .el-upload {
              border: 1px dashed #d9d9d9;
              border-radius: 6px;
              cursor: pointer;
              position: relative;
              overflow: hidden;
              border-radius: 50px;
            }
            .avatar-uploader .el-upload:hover {
              border-color: #409eff;
            }
            .avatar-uploader-icon {
              font-size: 16px;
              color: #8c939d;
              width: 40px;
              height: 40px;
              line-height: 40px;
              text-align: center;
            }
            .avatar {
              width: 40px;
              height: 40px;
              display: block;
              border-radius: 50px;
            }
            .removeImg {
              position: absolute;
              right: 0;
              top: 0;
            }
          }
        }
        .el-date-editor {
          width: 280px;
          input {
            width: 280px;
          }
        }
      }
    }
  }
  .dialog-block,
  .dialog-info {
    z-index: 2001;
    /deep/.el-dialog {
      // width: 580px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: 0 !important;
      .el-dialog__header {
        width: 100%;
        height: 58px;
        line-height: 58px;
        font-size: 16px;
        margin-left: 19px;
        font-weight: bold;
        border-bottom: 1px solid #e9ecef;
        box-sizing: border-box;
        margin: 0;
        padding: 0 0 0 19px;
        .el-dialog__headerbtn {
          font-size: 18px;
          top: 0 !important;
        }
        .el-dialog__title {
          font-weight: normal;
          font-size: 16px;
          color: #414658;
        }
      }

      .el-dialog__body {
        // border-bottom: 1px solid #E9ECEF;
        padding: 41px 60px 16px 60px !important;
        .pass-input {
          .el-form {
            width: 340px;
            .el-form-item {
              width: 340px;
              height: 40px;
              .el-form-item__content {
                .el-input {
                  width: 340px;
                  height: 40px;
                  input {
                    width: 340px;
                    height: 40px;
                  }
                }
              }
            }
          }
        }
        .form-footer {
          width: 100%;
          height: 72px;
          position: absolute;
          bottom: 0;
          right: 0;
          border-top: 1px solid #e9ecef;
          .el-form-item {
            padding: 0 !important;
            height: 100%;
            display: flex;
            justify-content: flex-end;
            margin-right: 17px;
            .el-form-item__content {
              height: 100%;
              line-height: 72px;
              margin: 0 !important;
            }
          }

          .qxcolor {
            color: #6a7076;
            border: 1px solid #d5dbc6;
          }
          .qdcolor {
            background-color: #2890ff;
          }
          .qdcolor {
            background-color: #2890ff;
          }
          .qdcolor:hover {
            opacity: 0.8;
          }
          .qxcolor {
            color: #6a7076;
            border: 1px solid #d5dbe8;
          }
          .qxcolor:hover {
            color: #2890ff;
            border: 1px solid #2890ff;
            background-color: #fff;
          }
        }
      }
    }
    /deep/.el-form-item__label {
      font-weight: normal;
      color: #414658;
    }
  }

  /deep/.el-badge__content {
    border: none;
  }
}
.lang_active {
  color: #2890ff;
  font-weight: 600;
}
</style>
