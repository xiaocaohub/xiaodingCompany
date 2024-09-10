import {del, save, index} from "@/api/order/comment";
import {isEmpty} from "element-ui/src/utils/util";

export default {
  name: 'reply',
  //初始化数据
  data() {
    return {mainData: {}, replyText: null}
  },
  //组装模板
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      console.log('this.$route.query.id',this.$route.query.id)
      const res = await index({
        api: 'mch.Mch.Order.getCommentsDetailInfoById',
        cid: this.$route.query.id
      });
      this.mainData = res.data.data.list[0];
      console.log(res)
    },
    //回复
    async Reply() {
      this.dialogVisible = true;
      let title = '回复评论';
      if(!this.replyText) {
        this.$message({
          type: 'error',
          message: '回复评论不能为空',
          offset:102
        })
        return
      }
      await save({
        api: 'mch.Mch.Order.replyComments',
        commentId: this.mainData.id,
        commentText: this.replyText,
      }).then(res => {
        if (res.data.code == '200') {
          this.$message({
            type: 'success',
            message: title + '成功!',
            offset:102
          })
          this.dialogVisible = false;
          this.$router.go(-1)
        }
      })
    },


  }

}
