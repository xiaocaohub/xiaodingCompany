<template>
  <div class="container">
    <div class="add-menu">
      <el-form
        :model="mainForm"
        :rules="rules"
        ref="ruleForm"
        class="picture-ruleForm"
        label-width="150px"
      >
        <el-form-item label="物流公司" prop="express_id">
          <el-select
            class="select-input"
            v-model="mainForm.express_id"
            placeholder="请选择物流公司"
            @change="change_type"
          >
            <el-option
              v-for="(item, index) in categoryList"
              :key="index"
              :label="item.kuaidi_name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="partnerId" prop="partnerId">
          <el-input
            v-model="mainForm.partnerId"
            placeholder="请输入电子面单账户信息"
          ></el-input>
        </el-form-item>
        <el-form-item label="partnerKey" prop="partnerKey">
          <el-input
            v-model="mainForm.partnerKey"
            placeholder="请输入电子面单账户密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="partnerSecret" prop="partnerSecret">
          <el-input
            v-model="mainForm.partnerSecret"
            placeholder="请输入电子面单秘钥"
          ></el-input>
        </el-form-item>
        <el-form-item label="partnerName" prop="partnerName">
          <el-input
            v-model="mainForm.partnerName"
            placeholder="请输入电子面单客户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="net" prop="net">
          <el-input
            v-model="mainForm.net"
            placeholder="请输入网点名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="code" prop="code">
          <el-input
            v-model="mainForm.code"
            placeholder="请输入电子面单承载编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="checkMan" prop="checkMan">
          <el-input
            v-model="mainForm.checkMan"
            placeholder=" 电子面单承载快递员名"
          ></el-input>
        </el-form-item>

        <div class="form-footer">
          <el-form-item>
            <el-button class="bgColor" type="primary" @click="Save('ruleForm')"
              >{{ $t("DemoPage.tableFromPage.save") }}
            </el-button>
            <el-button class="bdColor" @click="$router.go(-1)" plain
              >{{ $t("DemoPage.tableFromPage.cancel") }}
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  getLogisticsList,
  saveLogistics,
  echoLogistics,
} from "@/api/order/setExpressSheet";

export default {
  name: "EditExpress",
  props: {},
  components: {},
  data() {
    return {
      mainForm: {
        express_id: "",
        partnerId: "",
        partnerKey: "",
        partnerSecret: "",
        partnerName: "",
        net: "",
        code: "",
        checkMan: "",
      },
      rules: {
        express_id: [
          { required: true, message: "请选择物流公司", trigger: "change" },
        ],
        partnerId: [
          {
            required: true,
            message: "请输入电子面单账户信息",
            trigger: "blur",
          },
        ],
      },
      //   物流公司数据
      categoryList: [],
      cate_type: "",
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getLogistics();
    this.handleEcho();
  },
  mounted() {},
  methods: {
    change_type(){},
    // 获取物流数据
    async getLogistics() {
      const res = await getLogisticsList({
        api: "mch.Mch.Express.get_logistics",
      });
      console.log("物流数据列表", res);
      if (res.data.code == 200) {
        this.categoryList = res.data.data.list;
      }
    },
    //编辑数据回显
    handleEcho() {
      let data = {
        api: "mch.Mch.Express.edit_logistics_page",
        id: this.$route.query.id,
      };
      echoLogistics(data).then((res) => {
        console.log("编辑数据的回显xxxx", res);
        this.mainForm = res.data.data.list;
      });
    },
    // 保存
    Save(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = {
            api: "mch.Mch.Express.add_logistics",
            ...this.mainForm,
          };
          saveLogistics(data).then((res) => {
            console.log("保存数据xxxxxx", res);
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: this.$t("zdata.bjcg"),
                offset: 102,
              });
              this.$router.go(-1)
            }
          });
        }
      });
    },
  },
};
</script>
<style scoped lang="less">
.add-menu {
  margin: 0 auto;
}
.container {
  padding-top: 40px;
  align-items: normal;
}
.container {
  width: 100%;
  height: 737px;
  background-color: #fff;
  padding: 40px 0 0 0;
  color: #414658;
  display: flex;
  align-items: center;
  .el-input {
    width: 580px;
    height: 40px;
    input {
      width: 580px;
      height: 40px;
    }
  }
  .el-select {
    width: 580px;
    height: 40px;
    .el-input {
      width: 580px;
      height: 40px;
      input {
        width: 580px;
        height: 40px;
      }
    }
  }

  .right {
    margin-left: 10px;
    color: #97a0b4;
  }
}
</style>
