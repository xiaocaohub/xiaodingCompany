import {del, save, index} from "@/api/order/comment";
import {isEmpty} from "element-ui/src/utils/util";

export default {
  name: 'edit',
  //初始化数据
  data() {
    return {
      mainData: {}, replyText: null, star: 0,
      starGroup: [this.$t('commentEdit.cp'), this.$t('commentEdit.sw'), this.$t('commentEdit.yb'), this.$t('commentEdit.my'), this.$t('commentEdit.hp')],
      isEdit: true,
      //评论图集
      commentImgList: null,
      //追评图集
      reviewImgList: null,
    }
  },
  //组装模板
  created() {
    this.loadData();
    if(this.$route.query.type==2){
      this.$router.currentRoute.matched[2].meta.title = this.$t('commentList.ck');
      this.isEdit=false
    }else if(this.$route.query.type==1){
      this.$router.currentRoute.matched[2].meta.title = this.$t('commentList.xg');
      this.isEdit=true
    }
  },
  mounted() {
  },

  beforeRouteLeave (to, from, next) {        
    if (to.name == 'commentList') {
      to.query.dictionaryNum = this.$route.query.dictionaryNum
      to.query.pageSize = this.$route.query.pageSize
    }   
    next();
  },

  methods: {
    async loadData() {
      await index({
        api: 'mch.Mch.Order.getCommentsInfo',
        cid: this.$route.query.id
      }).then(data => {
        if (!isEmpty(data)) {
          this.mainData = data.data.data.list[0];
          this.mainData.CommentType = Number(this.mainData.CommentType);
          this.star = this.mainData.CommentType
          //评价图数据处理
          this.commentImgList = this.mainData.images;
          if (!isEmpty(this.commentImgList)) {
            let imgList = [];
            this.commentImgList.forEach(function (item) {
              imgList.push(item.url)
            })
            this.commentImgList = imgList;
          }
          //追评图数据处理
          this.reviewImgList = this.mainData.review_images;
          if (!isEmpty(this.reviewImgList)) {
            let imgList = [];
            this.reviewImgList.forEach(function (item) {
              imgList.push(item.url)
            })
            this.reviewImgList = imgList;
          }
        } else {
          this.$router.go(-1);
        }
      });
    },
    async Save() {
      this.dialogVisible = true;
      let title = '修改评论';
      let param = {
        api: 'mch.Mch.Order.updateCommentsDetailInfoById',
        cid: this.mainData.id,
        commentText: decodeURIComponent(this.mainData.content),
        commentType: this.mainData.CommentType,
        commentImgUrls: this.commentImgList.toString(),
        review: this.mainData.review ? decodeURIComponent(this.mainData.review) : '',
        reviewImgList: this.reviewImgList.toString(),
      }

      await save(param).then(res => {
        if (res.data.code == '200') {
          this.$message({
            type: 'success',
            message: this.$t('commentEdit.xgcg'),
            offset:102
          })
          this.dialogVisible = false;
          this.$router.go(-1)
        }
      })
    },


  }

}
