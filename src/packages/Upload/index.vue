<template>
  <div class="l-upload">
    <div 
      class="img-item"
      v-for="(url, index) of fileList"
      :key="index"
      :style="{
        width: 125 + 'px',
        // height: size + 'px',
        marginLeft: '25px'
      }"
    >
    
      <div class="img_con" style="overflow:hidden;">
          <img
            :src="url"
            @error="handleErrorImg"
            alt=""
            :style="{ width: 125 + 'px', height: 125 + 'px' }"
          />
          <!-- <p class="img_title" style="height:28px;border:1px solid brown;text-align:center;"> {{ fileListTextArr[index]?fileListTextArr[index]:""}} </p> -->

          <p class="img_title" style="height:31px;line-height:14px;text-align:center;font-size: 12px;">{{ imgTextArr[index] }}</p>
          <!-- <p class="img_title" style="height:28px;border:1px solid brown;" v-if="checkedList.length>0">{{ fileListTextArr[index]?fileListTextArr[index].title:""}}</p> -->
          <div class="operate_con" v-if="fileList.length>1">
             
               <i class="el-icon-caret-left" style="font-size:32px;cursor:pointer;" @click="pevImgFn(index)"></i>
               <i class="el-icon-caret-right" style="font-size:32px;cursor:pointer;"  @click="nextImgFn(index)"></i>
               <i class="el-icon-delete" style="font-size:25px;margin-left:10px;position:relative;top:-3px;cursor:pointer;" @click="removeImg(index)"></i>
          </div>

      </div>

    
      <div class="actions" v-if="(!disabled && fileList.length==1)">
        <i class="el-icon-delete"  :style="{ lineHeight: 125 + 'px' }" @click="removeImg(index)"></i>
        <span class="set-main" v-if="index != 0 && mainImg" @click="setMain(index)">设为主图</span>
      </div>

      <span class="img-main" v-if="index == 0 && mainImg">主图</span>
    </div>
    <div
      class="upload"
      @click="dialogVisible = true"
      v-if="fileList.length < limit"
      :style="{
        width: size + 'px',
        height: size + 'px',
        marginRight: marginRight
      }"
    >
      <i class="el-icon-plus"></i>
    </div>
    <div class="desc">
      {{ text }}
    </div>

    <!--    <upload-dialog-->
    <!--      :isChoice="true"-->
    <!--      @getPic="handleGetPic"-->
    <!--      @getPicD="handleGetPicD"-->
    <!--      v-model="dialogVisible"-->
    <!--    ></upload-dialog>-->
    <uDialog
      v-if="dialogVisible"
      @getPicD="handleGetPicD"
      @getPic="handleGetPic"
      @close="dialogVisible = false"
    ></uDialog>
  </div>
</template>

<script>
import uDialog from "@/packages/Upload/dialog";
import ErrorImg from '@/assets/images/default_picture.png'

export default {
  name: "l-upload",
  provide() {
    return {
      indexCom: this
    };
  },
  props: {
    imgTextArr: {
       type: Array,
       default: []
    },
    limit: {
      type: Number,
      default: 1
    },
    text: {
      type: String,
      default: "（最多上传一张，建议上传1：1尺寸的图片）"
    },
    value: {
      type: [Array, String],
      default: ""
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    mainImg: {
      // 是否显示主题
      type: Boolean,
      default: false
    },
    append_to_body: {
      type: Boolean,
      default: true
    },

    size: {
      type: Number,
      default: 80
    },
    disabled: {
      type: Boolean
    },
    maxSize: {
      type: Number,
      default: 0
    }
  },
  watch: {
    "value.length": {
      handler() {
        if (Array.isArray(this.value)) {
          this.fileList = this.value;
        } else {
          if (this.value) {
            this.fileList = [this.value];
          }
        }

        if (this.limit === 1) return 1;
        this.maxSelectNum = this.limit - this.fileList.length;
        console.log(this.maxSelectNum);
      },
      // 这里是关键，代表递归监听 demo 的变化
      deep: true,
      immediate: true
    },
    limit(val) {
      this.imgLimit = val;
      if (this.limit === 1) return 1;
      this.maxSelectNum = this.limit - this.fileList.length;
    }
  },

  computed: {
    isChoice() {
      return this.limit === 1;
    },
    marginRight() {
      if (this.text) {
        return "15px";
      }
      return "0";
    }
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    uDialog
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgNumber: 0,
      imgLimit: 1,
      fileList: [],
      fileListTextArr: [],
      checkedList: [],
      maxSelectNum: 1
    };
  },
  mounted () {
    let _this = this;
    setTimeout(()=>{
      _this.showDataFn()
    }, 3000)
 
  },
  methods: {
    showDataFn () {

     
        let fileListTextArr = [];
        let fileList = this.fileList;
        if (fileList.length>0) {
            let length = fileList.length;
            for (let j=0; j<length; j++) {
              fileListTextArr.push("---")
            }
        }
        this.fileListTextArr = fileListTextArr;

        console.log("fileListTextArr---1")
      
      console.log(fileListTextArr)
      console.log("fileListTextArr---1")
    },
    pevImgFn (index) {
        let length = this.fileList.length;
        let currentImg = this.fileList[index];
        let newIndex = index - 1;
        let fileList = this.fileList;
         
        this.$emit("prevImgTextFn", index);
        if (newIndex < 0) {
          newIndex = length;
        }
        fileList.splice(index, 1);
        fileList.splice(newIndex, 0, currentImg);
        this.fileList = fileList;
    },
    nextImgFn (index) {
        let length = this.fileList.length;
        let currentImg = this.fileList[index];
        let newIndex = index + 1;
        let fileList = this.fileList;

        this.$emit("nextImgTextFn", index);

        if (newIndex >= length) {
          newIndex = 0;
        }
        fileList.splice(index, 1);
        fileList.splice(newIndex, 0, currentImg);
        this.fileList = fileList;
        
      
    },
     handleErrorImg(e){
      console.log('图片报错了',e.target.src);
      e.target.src=ErrorImg
    },
    getLimit() {
      return this.limit;
    },

    removeImg(index) {
        let _this = this;    
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.fileList.splice(index, 1);
          _this.$emit("remove", index);

          _this.$emit("deleteImgTextFn", index);
          if (_this.limit === 1) {
            _this.$emit("input", "");
          } else {
            _this.$emit("input", _this.fileList);
          }
        }).catch(() => {
              
        });
    },
    setMain(index) {
      
      let imgUrl = this.fileList[index];
      this.fileList.splice(index, 1);
      this.fileList.unshift(imgUrl);
    },


    // 单选
    handleGetPic(data) {
      console.log("handleGetPic")
      console.log(data);
      console.log("handleGetPic")
      // debugger;
      this.fileList.push(data.url);
      this.$emit("select", data.url);
      this.$emit("input", data.url);
      this.dialogVisible = false;
    },
    // 多选
    handleGetPicD(data, checkedList) {


      console.log("handleGetPicD ---------------")
      console.log(checkedList)
      console.log("handleGetPicD------------")
      let list = [];
      for (let i = 0; i < data.length; i++) {
        list.push(data[i].url);
      }

  
      // let fileList = this.fileList;
      let fileListTextArr = [];
      // if (fileList.length>0) {
      //     let length = fileList.length;
      //     for (let j=0; j<length; j++) {
      //        fileListTextArr.push("---")
      //     }
      // }
      
       

      list = this.fileList.concat(list);
      this.fileList = list;
      // this.checkedList = checkedList;
      this.$emit("select", list);
      this.$emit("input", list);
      this.dialogVisible = false;
     
      let checkedListLength = checkedList.length;
      // console.log("fileListTextArr---1")
      // console.log(fileListTextArr)
      // console.log("fileListTextArr---1")
      for (let l=0; l<checkedListLength; l++) {
        fileListTextArr.push(checkedList[l].title)
      }

      console.log("fileListTextArr---2")
      
      
      console.log(fileListTextArr)

      console.log("fileListTextArr---2")
 
      this.fileListTextArr = fileListTextArr;
      
      this.$emit("changefileListFn", {
      
          fileListTextArr: this.fileListTextArr
      });
    }
  }
};
</script>
<style>
    .l-upload .operate_con{
         height:29px;
         
    }
</style>