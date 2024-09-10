import { getCouponCardInfo,activityisDisplay, delCoupon,bulkDeletion,allCoupons, receiveUserCoupon, getGiveUserInfo,couponSwitch } from '@/api/plug_ins/coupons'
import { getStorage } from '@/utils/storage'
import { mixinstest } from '@/mixins/index'
import { exports } from '@/api/export/index'
export default {
    name: 'couponsList',
    mixins: [mixinstest],
    data() {
        return {
            couponsTypeList: [],// 优惠券类型

            typeList: [
                {
                    value: 0,
                    label: this.$t('coupons.couponsList.sdlq')
                },
                {
                    value: 1,
                    label: this.$t('coupons.couponsList.xtzs')
                },
            ],// 领取方式
            coupon_switch:0,
            overdueList: [
                {
                    value: '0',
                    label: this.$t('coupons.couponsList.ygq')
                },
                {
                    value: '1',
                    label: this.$t('coupons.couponsList.wgq')
                },
            ],// 是否过期

            inputInfo: {
                couponsName: null,
                couponsType: null,
                is_overdue: null,
                issueUnit:null,
                receiveType:null,
            },
            button_list:[],
            tableData: [],
            loading: true,

            // 弹框数据
            ProData: [],
            dialogVisible3: false,
            tabKey: '0',
            ProList: [],
            ChangeProList: [],
            BrandValue: '',
            sendClass: '',
            Proname: '',
            options: [],

            grade: null,
            userName: null,
            userTotal: null,
            selectUser: null,

            loadings: false,
            is_show: true,
            is_show2: false,

            hid: null,
            userIdList: [],

            // table高度
            tableHeight: null,
            changeCouList:[],
            dialogVisible: false,
            pageSize2:10,
            currpage2:1,
            current_num2:10,
            page2:1,
        }
    },

    created() {
        if(this.$route.params.pageSize) {
            this.pagination.page = this.$route.params.dictionaryNum
            this.dictionaryNum = this.$route.params.dictionaryNum
            this.pageSize = this.$route.params.pageSize
        }
        this.getCouponCardInfos()
        this.getCoupons()
        this.getButtonList()
    },

    mounted() {
        this.$nextTick(function() {
            this.getHeight()
        })
        window.addEventListener('resize',this.getHeight(),false)
    },

    watch: {
        'ChangeProList': {
            handler:function(val,oldval){
                this.selectUser = this.ChangeProList.length
                this.userIdList = this.ChangeProList.map(item => {
                    return item.user_id
                })
            }
        }
    },

    methods: {
        // 获取按钮权限
    getButtonList(){
        let routeList = getStorage('route')
        let list =  routeList.filter(item=>item.path=="coupons")[0].children
        this.button_list = list.map(item=>{
          return {text:item.name,path:item.path,url:item.url,checked:item.checked}
        })
        console.log('routeList',routeList,this.button_list);
      },
        //获取所有优惠券
        getCoupons(){
            allCoupons({
                api: 'plugin.coupon.Mchcoupon.AddPage',
                mchId: getStorage('mchId')
            }).then(res =>{
                this.couponsTypeList = res.data.data.typeList

            })
        },
        // 导出弹框方法
        dialogShow() {
            this.dialogVisible = true
        },

        handleClose(done) {
            this.dialogVisible = false
        },
        // 获取table高度
        getHeight(){
			this.tableHeight = this.$refs.tableFather.clientHeight - this.$refs.pageBox.clientHeight
            console.log(this.$refs.tableFather.clientHeight);
		},
        async getCouponCardInfos() {
            const res = await getCouponCardInfo({
                api: 'plugin.coupon.Mchcoupon.Index',
                pageNo: this.dictionaryNum,
                pageSize: this.pageSize,
                name: this.inputInfo.couponsName,
                activityType: this.inputInfo.couponsType,
                isOverdue: this.inputInfo.is_overdue,
                issueUnit:this.inputInfo.issueUnit,
                receiveType:this.inputInfo.receiveType,
            })
            this.total = res.data.data.total
            this.coupon_switch = res.data.data.isOpenCoupon
            this.tableData = res.data.data.list
            this.loading = false
            if(this.total < this.current_num) {
                this.current_num = this.total
            }
        },

         // 重置
         reset() {
            this.inputInfo.couponsName = null
            this.inputInfo.couponsType = null
            this.inputInfo.is_overdue = null
            this.inputInfo.receiveType = null
            this.inputInfo.issueUnit = null
        },

        // 查询
        demand() {
            this.currpage = 1
            this.current_num = 10
            this.showPagebox = false
            this.loading = true
            this.dictionaryNum = 1
            this.getCouponCardInfos().then(() => {
                this.loading = false
                if(this.tableData.length > 5) {
                    this.showPagebox = true
                }
            })
        },

        // 添加优惠券
        addCoupons() {
            this.$router.push({
                path: '/plug_ins/coupons/addCoupons',
            })
        },

        // 是否显示
        switchs() {
            couponSwitch({
                api: 'plugin.coupon.Mchcoupon.IsOpenCoupon',
            }).then(res => {
                if(res.data.code == '200') {
                    this.getCouponCardInfos()
                    this.$message({
                        type: 'success',
                        message: this.$t('zdata.czcg'),
                        offset: 102
                    })
                }
            })
        },
        //列表是否开启
        rowSwitchs(row) {
            activityisDisplay({
                api: 'plugin.coupon.Mchcoupon.ActivityisDisplay',
                hid:row.id
            }).then(res => {
                if(res.data.code == '200') {
                    this.getCouponCardInfos()
                    this.$message({
                        type: 'success',
                        message: this.$t('zdata.czcg'),
                        offset: 102
                    })
                }
            })
        },

        // 查看
        View(value) {
            this.$router.push({
                path: '/plug_ins/coupons/viewCoupons',
                query: {
                    id: value.id,
                    shaco:1,
                    dictionaryNum: this.dictionaryNum,
                    pageSize: this.pageSize
                }
            })
        },

        // 编辑
        Edit(value) {
            this.$router.push({
                path: '/plug_ins/coupons/editorCoupons',
                query: {
                    id: value.id,
                    shaco:0,
                    dictionaryNum: this.dictionaryNum,
                    pageSize: this.pageSize
                }
            })
        },
        bulkDel(){
            if(this.changeCouList.length == 0){
                this.$message.warning('请至少选择一条数据')
                return
            }
            var arrList = []
            var flxList = []
            this.changeCouList.forEach(item =>{
                flxList.push(item.id)
            })
            var arrList = flxList.join(',')
            this.$confirm(this.$t('coupons.couponsList.qrsc'), this.$t('coupons.ts'), {
                confirmButtonText: this.$t('coupons.okk'),
                cancelButtonText: this.$t('coupons.ccel'),
                type: 'warning'
                }).then(() => {
                    bulkDeletion({
                        api: 'plugin.coupon.Mchcoupon.BatchDel',
                        ids:arrList,
                    }).then(res =>{
                        console.log('2222222',res);

                        if(res.data.code == '200') {
                            this.getCouponCardInfos()
                            this.$message({
                                type: 'success',
                                message: this.$t('zdata.sccg'),
                                offset: 102
                            })
                        }
                    }).catch(error => {
                    // 请求失败
                    this.$message({
                        message: error.message,
                        type: 'warning'
                        });
                    })
                    }).catch(() => {
                    // this.$message({
                    // type: 'info',
                    // message: '已取消删除'
                    //  });
            });

        },
        Delete(value) {
            this.$confirm(this.$t('coupons.couponsList.qfsc'), this.$t('coupons.ts'), {
                confirmButtonText: this.$t('coupons.okk'),
                cancelButtonText: this.$t('coupons.ccel'),
                type: 'warning'
              }).then(() => {
                delCoupon({
                    api: 'plugin.coupon.Mchcoupon.DelCoupon',
                    id: value.id
                }).then(res => {
                    console.log(res);
                    if(res.data.code == '200') {
                        this.getCouponCardInfos()
                        this.$message({
                            type: 'success',
                            message: this.$t('zdata.sccg'),
                            offset: 102
                        })
                    }
                })
            }).catch(() => {
            // this.$message({
            //     type: 'info',
            //     message: '已取消删除',
            //     offset: 100
            // });
            });
        },

        // 领取记录
        Receive(value) {
            this.$router.push({
                path: '/plug_ins/coupons/getRecord',
                query: {
                    id: value.id
                }
            })
        },

        // 赠送记录
        Giving(value) {
            this.$router.push({
                path: '/plug_ins/coupons/givingRecords',
                query: {
                    id: value.id
                }
            })
        },

        //选择一页多少条
        handleSizeChange(e){
            this.loading = true
            console.log('e',e);
            // this.current_num = e
            this.pageSize = e
            this.getCouponCardInfos().then(() => {
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
            this.getCouponCardInfos().then(() => {
                this.current_num = this.tableData.length === this.pageSize ? e * this.pageSize : this.total
                this.loading = false
            })
        },
        //选择一页多少条
        handleSizeChange2(e){
            this.is_show = true
            console.log('e',e);
            // this.current_num = e
            this.pageSize2 = e
            this.getGiveUserInfos(this.hid).then(() => {
                this.currpage2 = ((this.page2 - 1) * this.pageSize2) + 1
                this.current_num2 = this.ProList.length === this.pageSize2 ? this.page2 * this.pageSize2 : this.userTotal
                this.is_show = false
            })
        },

        //点击上一页，下一页
        handleCurrentChange2(e){
            this.is_show = true
            this.page2 = e
            this.currpage2 = ((e - 1) * this.pageSize2) + 1
            this.getGiveUserInfos(this.hid).then(() => {
                this.current_num2 = this.ProList.length === this.pageSize2 ? e * this.pageSize2 : this.userTotal
                this.is_show = false
            })
        },
        // 弹框方法
        async getGiveUserInfos(value) {
            this.is_show = true
            const res = await getGiveUserInfo({
                api: 'plugin.coupon.Mchcoupon.GetGiveUserInfo',
                pageNo: this.page2,
                pageSize: this.pageSize2,
                name: this.userName,
                hid: value,
            })
            console.log(res);
            if(res.data.code == '200'){
                this.is_show = false
                this.userTotal = res.data.data.total
                this.ProList = res.data.data.userList
            }
        },

        Reset() {
            this.grade = null,
            this.userName = null
        },

        query() {
            this.pageSize2 = 10
            this.page2 = 1
            this.is_show = true
            this.getGiveUserInfos(this.hid)
            // this.$refs.multipleTable.clearSelection()
        },

        rowKeys(row) {
            return row.id
        },

        handleSelectionChange2(e) {
            this.ChangeProList = e
        },
        handleSelectionChange(e) {
            this.changeCouList = e
        },
        DeleteP(index,value) {
            this.ChangeProList.splice(index,1)
            this.$refs.multipleTable.toggleRowSelection(this.ProList.find((item) => {
                return value.user_id == item.user_id
            }),false)
        },

        givingCoupons(value) {
            this.pageSize2 = 10
            this.page2 = 1
            this.getGiveUserInfos(value.id)
            this.hid = value.id
            this.is_show = true
            this.dialogVisible3 = true
            console.log('page2',this.page2);

        },

        handleClose2() {
            this.dialogVisible3 = false
            this.ProList = []
            this.ChangeProList = []
            this.userTotal = null
            this.selectUser = null
            this.grade = null
            this.userName = null
            this.page2 = 1
            this.pageSize2 = 10
            this.currpage2 = 1
            this.current_num2 = 10
            this.$refs.multipleTable.clearSelection()
        },

        AddProconfirm() {
            receiveUserCoupon({
                api: 'plugin.coupon.Mchcoupon.ReceiveUserCoupon',
                userIds: this.userIdList.join(','),
                hid: this.hid
            }).then(res => {
                if(res.data.code == '200') {
                    this.$message({
                        message: this.$t('zdata.zqcg'),
                        type: 'success',
                        offset:102
                    })
                    this.handleClose2()
                    this.getCouponCardInfos()
                }
            })
        },
        async exportPage() {
            exports({
                api: 'plugin.coupon.Mchcoupon.Index',
                pageNo: this.dictionaryNum,
                pageSize: this.pageSize,
                name: this.inputInfo.couponsName,
                activityType: this.inputInfo.couponsType,
                isOverdue: this.inputInfo.is_overdue,
                issueUnit:this.inputInfo.issueUnit,
                receiveType:this.inputInfo.receiveType,
                exportType: 1,
            },'pageorder')
        },

        async exportAll() {
            exports({
                api: 'plugin.coupon.Mchcoupon.Index',
                pageNo: this.dictionaryNum,
                pageSize: 999999,
                // name: this.inputInfo.couponsName,
                // activityType: this.inputInfo.couponsType,
                // isOverdue: this.inputInfo.is_overdue,
                // issueUnit:this.inputInfo.issueUnit,
                // receiveType:this.inputInfo.receiveType,
                exportType: 1,
            },'allorder')
        },

        async exportQuery() {
            exports({
                api: 'plugin.coupon.Mchcoupon.Index',
                pageNo: this.dictionaryNum,
                pageSize: 99999,
                name: this.inputInfo.couponsName,
                activityType: this.inputInfo.couponsType,
                isOverdue: this.inputInfo.is_overdue,
                issueUnit:this.inputInfo.issueUnit,
                receiveType:this.inputInfo.receiveType,
                exportType: 1,
            },'queryorder')
        }
    }
}
