<template>
  <div class="container">
    <div class="list">
      <!-- <h1>欢迎来到电子面单打印界面</h1> -->
      <div class="imgItem" v-for="i in list">
        <img :src="i.label" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PrintSheet",
  props: {},
  components: {},
  data() {
    return {
      list:[]
    };
  },
  computed: {},
  watch: {},
  created() {
    this.list=JSON.parse(this.$route.query.list)
  },
  mounted() {
    setTimeout(() => {
      window.print();
      setTimeout(function () {
        window.close();
      }, 300);
    }, 350);
  },
  methods: {},
};
</script>
<style scoped lang="less">
.container {
  //   zoom: 0.64;
  width: 100%;
  // img {
  //   width: 50%;
  //   height: 50%;
  // }
}
.list{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  box-sizing: border-box;
  .imgItem{
    width: 50%;
    height:48vh;
    padding: 20px;
    box-sizing: border-box;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
