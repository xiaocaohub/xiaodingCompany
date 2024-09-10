<template>
  <div class="container" id="hhhh">
    <el-form
      ref="ruleForm"  
      class="form-search"
      :rules="rules"
      :model="ruleForm"
      label-width="auto"
    >
      <div class="basic-info">
        <div class="header">
          <span>{{ $t('releasephysical.jbxx') }}</span>
        </div>
        
        <div class="basic-block">
          <div class="basic-items">
            <el-form-item label="商品名称" prop="goodsTitle">
              <el-input
                v-model="ruleForm.goodsTitle"
                :placeholder="$t('releasephysical.qsrspbt')"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="subtitle">
              <el-input
                v-model="ruleForm.subtitle"
                :placeholder="$t('releasephysical.qsrfbt')"
              ></el-input>
            </el-form-item>
           
            <!-- <el-form-item label="关键词" prop="keywords">
              <el-input
                v-model="ruleForm.keywords"
                :placeholder="$t('releasephysical.qsrspgjc')"
              ></el-input>
            </el-form-item> -->



              <el-form-item
                label="商品分类"
                class="goods-class"
                prop="goodsClass"
              >
                  <el-select v-model="ruleForm.kindValue" placeholder="请选择" @change="selectKindFn">
                    <el-option
                      v-for="item in putKindDataArr"
                      :key="item.cid"
                      :label="item.pname"
                      :value="item.cid"
                      :cidStr = "item.cidStr"
                      :sid="item.sid"
                      :class="{'kind_li':item.level==1, 'kind_li_child':item.level==2}"
                      :disabled="item.level!=2"
                      >
                    </el-option>
                  </el-select>
                <!-- <el-button type="primary" @click="dialogShow1">{{$t('releasephysical.tjfl')}}</el-button> -->
              </el-form-item>
          </div>


          <div class="basic-items">  
            <el-form-item
              class="goods-brand"
              label="商品品牌"
              prop="goodsBrand"
            >
              <el-select
                class="select-input"
                v-model="ruleForm.goodsBrand"
                :placeholder="$t('releasephysical.qxzsppp')"
              >
                <el-option
                  v-for="item in brandArr"
                  :key="item.brand_id"
                  :label="item.brand_name"
                  :value="item.brand_id"
                >
                </el-option>
              </el-select>
              <!-- <el-button type="primary" @click="dialogShow2">{{$t('releasephysical.tjpp')}}</el-button> -->
            </el-form-item>

            <el-form-item
              class="goods-brand"
              label="风格"
              required
              prop="styleId"
            >
              <el-select
                class="select-input"
                v-model="ruleForm.styleName"
                placeholder="请选择商品风格"
                @change="changeStyleName"
              >
                <el-option
                  v-for="(item,index) in styleList"
                  :key="index"
                  :label="item.ctext"
                  :value="{label:item.text,value:item.value}"
                >
                </el-option>
              </el-select>
              <!-- <el-button type="primary" @click="dialogShow2">{{$t('releasephysical.tjpp')}}</el-button> -->
            </el-form-item>
            <!-- <el-form-item :label="$t('releasephysical.zl')" prop="weight">
              <el-input
                @keyup.native="ruleForm.weight = oninput(ruleForm.weight, 2)"
                v-model="ruleForm.weight"
                :placeholder="$t('releasephysical.qsrzl')"
              >
                <template slot="append">KG</template>
              </el-input>
            </el-form-item> -->
          </div>
          <el-form-item
            class="goods-img"
            required
            label="商品封面图"
            prop="goodsCover"
          >
          <l-upload
              :limit="1"
              v-model="ruleForm.goodsCover"
              text="商品白底图尺寸900*600像素, 每张图限700K以内"
            >
            </l-upload>
          </el-form-item>
          <!-- <el-form-item
            class="goods-img"
            required
            label="商品展示图"
            prop="goodsShow"
          >
            <l-upload
              :limit="5"
              :mainImg="true"
              v-model="ruleForm.goodsShow"


              text="商品白底图尺寸900*600像素, 每张图限700K以内"
            >
            </l-upload>
          </el-form-item> -->
          <el-form-item
            class="goods-img"
            label="实拍图"
            prop="takePictures"
          >
            <l-upload
              :limit="6"
              v-model="ruleForm.takePictures"
              text="最多上传6张, 商品白底图尺寸450*450像素, 每张图限500K以内"
               @changefileListFn="changefileListFn"
            >
            </l-upload>
          
          </el-form-item>

         
          <el-form-item class="goods-img" label="展示视频">
            <div class="upload-box">
              <div class="avatar-uploader-box">
                <!-- 图片预览 -->
                <div
                  class="video-preview"
                  v-for="(item, index) in videoList"
                  :key="index"
                >
                  <!-- controls="controls" -->
                  <video
                    :src="item.url"
                    @mouseover.stop="item.isShowPopup = true"
                    class="avatar"
                  >
                    {{ $t('releasephysical.bzcspbf') }}
                  </video>
                  <!-- 显示查看和删除的按钮弹窗 -->
                  <div
                    @mouseleave="item.isShowPopup = false"
                    class="avatar-uploader-popup"
                    v-show="item.url && item.isShowPopup"
                  >
                    <i @click="previewVideo(item)" class="el-icon-view"></i>
                    <i @click="deleteVideo(index)" class="el-icon-delete"></i>
                  </div>
                </div>
            
                <!-- <input type="file" @change="uploadVedioFn($event)" ref="vedioFile" /> -->

                <!-- 方框样式 -->
                <el-upload
                  :action="actionUrl"
                  :auto-upload="false"
                  :on-change="handleAvatarChange"
                  :show-file-list="false"
                  class="avatar-uploader"
                  ref="avatarUploader"
                  v-show="this.videoList.length == 0"
                >
                  <span style="display: block" v-loading="videoLoading">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </span>
                </el-upload>

                <!-- 上传提示文字样式 -->
                <div class="upload-tip">
                  <slot>{{ $t('releasephysical.sptext') }}</slot>
                </div>
              </div>

            
              <!-- 查看大图 -->
              <el-dialog
                :visible.sync="dialogVisible_video"
                append-to-body
                center
                :title="$t('releasephysical.spck')"
                :before-close="handleClose"
              >
                <video
                  :src="videoSrc"
                  ref="video"
                  controls
                  alt
                  width="100%"
                  style="height: 500px"
                >
                  {{ $t('releasephysical.bzcspbf') }}
                </video>
              </el-dialog>
            </div>
          </el-form-item>
        </div>
      </div>

      <div class="goods-attribute">
        <div class="header">
          <span>{{ $t('releasephysical.spsx') }}</span>
        </div>
        <div class="attribute-block">
          <div class="attribute-items">
            <!-- <el-form-item label="采购价" prop="cbj">
              <el-input
                v-model="ruleForm.cbj"
                @keyup.native="ruleForm.cbj = oninput(ruleForm.cbj, 2)"
                :placeholder="$t('releasephysical.qsrmrcbj')"
              >
                <template slot="append">{{ $t('zdata.yuan') }}</template>
              </el-input>
            </el-form-item> -->

            <!-- <el-form-item :label="$t('releasephysical.yj')" prop="yj">
              <el-input
                v-model="ruleForm.yj"
                @keyup.native="ruleForm.yj = oninput(ruleForm.yj, 2)"
                :placeholder="$t('releasephysical.qsrmryj')"
                ><template slot="append">{{
                  $t('zdata.yuan')
                }}</template></el-input
              >
            </el-form-item>
            <el-form-item :label="$t('releasephysical.sj')" prop="sj">
              <el-input
                v-model="ruleForm.sj"
                @keyup.native="ruleForm.sj = oninput(ruleForm.sj, 2)"
                :placeholder="$t('releasephysical.qsrmrsj')"
                ><template slot="append">{{
                  $t('zdata.yuan')
                }}</template></el-input
              >
            </el-form-item> -->
          </div>
          <!-- <div class="attribute-items">
            <el-form-item :label="$t('releasephysical.dw')" prop="unit">
              <el-select
                class="select-input"
                v-model="ruleForm.unit"
                :placeholder="$t('releasephysical.qxzdw')"
              >
                <el-option
                  v-for="item in unitList"
                  :key="item.id"
                  :label="item.text"
                  :value="item.text"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              :label="$t('releasephysical.kc')"
              class="inventory"
              prop="kucun"
            >
              <el-input
                @keyup.native="ruleForm.kucun = oninput2(ruleForm.kucun)"
                v-model="ruleForm.kucun"
                :placeholder="$t('releasephysical.qszmrkc')"
              >
              </el-input>
            </el-form-item>
            <el-form-item label=""></el-form-item>
          </div> -->
       
          <!-- <div class="attribute-items">
            <el-form-item
              class="goods-img"
              label="商品属性图"
              prop="attrImg"
            >
              <l-upload :limit="1" v-model="ruleForm.attrImg" text="">
              </l-upload>
            </el-form-item>
          </div> -->
       
           <!-- <el-button type="primary" @click="addAttr">属性设置</el-button> -->
          
           <div style="border:1px solid transparent;">
                <div class="big_kind" v-for="(bigKindItem,index) in kindData" :key="index">
                    <el-input v-model="bigKindItem.kindName"  @change="changeKindFn(bigKindItem)"></el-input>
                    <div class="kind_list_con">
                        <ul class="kind_list">
                            <li v-for="(kindItem,i) in bigKindItem.children" :key="kindItem.id" style="margin-bottom:10px;">
                              <el-checkbox v-model="kindItem.flag" @change="selectKindChangeFn"></el-checkbox>
                              <el-input v-model="kindItem.value" class="kind" style="width:200px;margin-left:10px;"  @input="blurChangeKindFn(kindItem)"> </el-input>
                            </li>
                            <el-button type="primary" icon="el-icon-plus" circle @click="showKindDialogFn(index)" style="float:left;"></el-button>
                        </ul>
                        <!-- <el-checkbox-group v-model="bigKindItem.checkKindList" class="kind_list" @change="selectKindChangeFn">
                            <el-checkbox :label="item" v-for="(item,i) in bigKindItem.children" :key="i">
                                  <el-input :value="item"  style="width:80px;"></el-input>
                            </el-checkbox>
                        </el-checkbox-group> -->
                    </div>
                </div>

                <el-table
                  :data="kindTableData"
                  :span-method="arraySpanMethod"
                  border
                  style="width: 97.3%;margin:0 auto;"     
                  minHeight="450"  
                  maxHeight="800"     
                  id = "good_table"       
                  v-if="kindTableData.length>0">
                  <el-table-column
                    prop="color"
                    :label="kindData[0].kindName"
                    width="150">
                  </el-table-column>
                  <el-table-column
                    prop="size"
                    :label="kindData[1].kindName"
                    width="200">
                  </el-table-column>
                  <el-table-column
                    prop="amount1"
                    label="商品编码"
                    width="200">
                      <template slot-scope="scope" style="position:relative;">
                          <el-input type="text" v-model="scope.row.code"  style="width:175px;" @blur="updateKindTableDataAll(scope.row, 'code')"></el-input>
                          <p style="color:red;position:absolute;left:60px;bottom:10px;" v-if="scope.row.codeHas">编码已存在</p>
                      </template>
                  </el-table-column>
                  <el-table-column
                    prop="amount1"
                    label="型号"
                    width="150">
                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.type" style="width:129px;" @blur="updateKindTableDataAll(scope.row)"></el-input>
                          
                         
                        </template>
                  </el-table-column>

                  <!-- <el-table-column
                    prop="amount1"
                    label="上样采购价"
                    width="110">
                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.SamplePurchasePrice"  style="width:85px;"></el-input>
                      </template>
                  </el-table-column> -->
                  

                  <el-table-column
                    prop="amount1"
                    label="采购价"
                    width="115">
                      <template slot-scope="scope">
                    
                          <el-input type="text" v-model="scope.row.purchasePrice"  style="width:90px;"  @blur="updateKindTableDataAll(scope.row)"></el-input>
                      </template>
                  </el-table-column>
                 
                  <el-table-column
                    prop="amount1"
                    
                    label="供货价"
                    width="115"
                    v-if="detectionBtn(buttonList, '编辑供货价')">
                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.yj"  style="width:90px;" @blur="updateKindTableDataAll(scope.row)"></el-input>
                      </template>
                  </el-table-column>

                  <el-table-column
             
             
                    prop="amount1"
                    label="建议零售价"
                    width="115"
                    v-if="detectionBtn(buttonList, '编辑售价')">

                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.sj"  style="width:90px;" @blur="updateKindTableDataAll(scope.row)"></el-input>
                      </template>
                  </el-table-column>

                  <el-table-column
                    prop="amount1"

                    label="包件数"
                    width="90">
                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.bom_nums"  style="width:65px;"  @blur="updateKindTableDataAll(scope.row)"></el-input>
                      </template>
                  </el-table-column>
                  

                  <!-- <el-table-column
                    prop="amount1"
                    label="建议零售价"
                    width="110">
                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.retailPrice"  style="width:85px;"></el-input>
                      </template>
                  </el-table-column> -->
                
                  <el-table-column
                    prop="amount1"
                    label="体积(m³)"
                    width="80">
                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.vol"  style="width:69px;" @blur="updateKindTableDataAll(scope.row)"></el-input>
                      </template>
                  </el-table-column>

                  <!-- <el-table-column
                    prop="amount1"
                    label="库存"
                    width="110">
                      <template slot-scope="scope">
                          <el-input type="text" v-model="scope.row.stock"  style="width:85px;" @blur="updateKindTableDataAll(scope.row)"></el-input>
                      </template>
                  </el-table-column> -->

                  <el-table-column  
                    props = "amount1"
                    label="发货天数"
                    width="100"
                     >
                      <template slot-scope="scope"  >
                          <el-select v-model="scope.row.dayCount" placeholder="请选择"  style="width:90px;" @change="changeValueFn">                            
                              <el-option   
                                v-for="item in scope.row.dayArr"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                >
                              </el-option>
                          </el-select>
                      </template>
                  </el-table-column>

                  <el-table-column
                    prop="amount1"
                    label="整装or组装"
                    width="175">
                      <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.assemble" style="margin-top:20px;">
                            <el-radio :label="assembleItem.label" v-for="(assembleItem,index) in scope.row.assembleArr" :key="index" class="assemble_group" @change="changeValueFn">{{  assembleItem.title }}</el-radio>
                        </el-radio-group>
                      </template>
                  </el-table-column>
                  
                  <el-table-column
                    prop="amount1"
                    label="图片上传"
                    width="75">
                    <template slot-scope="scope">

                       <!-- <el-button size="mini" @click="tableUpload(scope)">选择图片</el-button> -->
                  
                       <i class="el-icon-circle-plus-outline" style="display:block;font-size:40px;cursor:pointer;margin:0 auto;" @click="tableUpload(scope)"></i>
                       <span v-if="scope.row.imgFileList==0" style="color:red;font-size:12px;">未上传图片</span>
                      </template>
                  </el-table-column>

                  <el-table-column
                    prop="amount1"
                    label="上下架"
                    >

                      <template slot-scope="scope">
                          <el-switch
                            v-model="scope.row.statusFlag"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="switchChangeFn(scope.row)">
                          </el-switch>
                      </template>
                  </el-table-column>

                </el-table>
            </div>
        

          <!-- 废 table -->
          <el-form-item class="attribute-table">
            <el-table
              v-if="strArr.length > 0"
              :data="strArr"
              ref="table"
              style="width: 100%"
              max-height="340"
            >
              <el-table-column
                v-for="(item, index) of attrTitle"
                :key="index"
                prop="attr_name"
                :label="item.attr_group_name"
                align="center"
                show-overflow-tooltip
                column-key="attr_name"
                :filters="filterTable[index]"
                :filter-method="filterHandler"
              >
                <template slot-scope="scope">
                  <div v-text="scope.row.attr_list[index].attr_name"></div>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('releasephysical.cbj')"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      v-model="scope.row.cbj"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="商品编码"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      v-model="scope.row.product_code"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="型号"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      v-model="scope.row.marque"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="体积(立方米)"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      v-model="scope.row.capacity"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
            
              <el-table-column
                :label="$t('releasephysical.kc')"
                align="center"
                min-width="150"
              >
                <template slot-scope="scope">
                  <div>
                    <el-input
                      :disabled="$route.query.name == 'editor'"
                      v-model="scope.row.kucun"
                      style="width: 140px"
                    ></el-input>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="unit"
                :label="$t('releasephysical.dw')"
                align="center"
              >
              </el-table-column> 
            
              <el-table-column
                :label="$t('releasephysical.txm')"
                align="center"
                width="200"
              >
                <template slot-scope="scope">
                  <div style="display: flex; align-items: center">
                    <el-input v-model="scope.row.bar_code"></el-input>
                    <el-link
                      style="
                        white-space: nowrap;
                        margin-left: 10px;
                        color: #2890ff;
                      "
                      >{{ $t('releasephysical.sm') }}</el-link
                    >
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                fixed="right"
                :label="$t('releasephysical.sctp')"
                width="140"
              >
                <template slot-scope="scope">
                  <div @click="clickImage" class="setAttrImg">
                    <l-upload
                      :limit="1"
                      :is_small_img="true"
                      v-model="scope.row.img"
                      text=""
                      size="40"
                      heightSize="40"
                    ></l-upload>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </div>

      <div class="detail-container">
        <div class="header">
          <span>{{ $t('releasephysical.xxnr') }}</span>
        </div>


        <div class="detail-block">
          <el-form-item
            label="商品视频"
            style="margin-bottom: 0 !important; display:none;"
            
          >
            <div class="upload-box">
              <div class="avatar-uploader-box">
                <div
                  class="video-preview"
                  v-for="(item, index) in videoList2"
                   :key="index"
                >
                  <video
                    :src="item.url"
                    @mouseover.stop="item.isShowPopup = true"
                    class="avatar"
                  >
                    {{ $t('releasephysical.bzcspbf') }}
                  </video>
                  <div
                    @mouseleave="item.isShowPopup = false"
                    class="avatar-uploader-popup"
                    v-show="item.url && item.isShowPopup"
                  >
                    <i @click="previewVideo2(item)" class="el-icon-view"></i>
                    <i @click="deleteVideo2(index)" class="el-icon-delete"></i>
                  </div>
                </div>
                <el-upload
                  :action="actionUrl"
                  :auto-upload="false"
                  :on-change="handleAvatarChange2"
                  :show-file-list="false"
                  class="avatar-uploader"
                  ref="avatarUploader2"
                  v-show="this.videoList2.length == 0"
                >
                  <span style="display: block" v-loading="videoLoading2">
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                  </span>
                </el-upload>

                <div class="upload-tip">
                  <slot>{{ $t('releasephysical.sptext2') }}</slot>
                </div>
              </div>
              <el-dialog
                :visible.sync="dialogVisible_video2"
                append-to-body
                center
                :title="$t('releasephysical.spck')"
                :before-close="handleClose5"
              >
                <video
                  :src="videoSrc2"
                  ref="video"
                  controls
                  alt
                  width="100%"
                  style="height: 500px"
                >
                  {{ $t('releasephysical.bzcspbf') }}
                </video>
              </el-dialog>
            </div>
          </el-form-item>
          <!-- 详情 -->
          <!-- <el-form-item :label="$t('releasephysical.spxq')" prop="content">
            <vue-editor
              v-model="ruleForm.content"
              useCustomImageHandler
              @image-added="handleImageAdded"
            ></vue-editor>
          </el-form-item> -->
          <el-form-item label="商品介绍">
            <!-- <el-button class="add" type="primary" @click="addIntro">{{
              $t('releasephysical.tjjsa')
            }}</el-button> -->
            <div
              class="add_box"
              v-for="(item, index) in IntroList"
              :key="index"
            >
              <div class="delet-box">
                <span>{{ item.name }}</span>
                <!-- <el-button
                  icon="el-icon-delete"
                  type="text"
                  @click="delIntro(index)"
                  >{{ $t('releasephysical.sc') }}</el-button
                > -->
              </div>

    
              <el-form-item>   
                <vue-editor
                  v-model="item.content"
                  @image-added="handleImageAdded"
                ></vue-editor>
              </el-form-item>
            </div>
          </el-form-item>

          <el-divider content-position="left">一般属性</el-divider>

          <el-form-item
            class="goods-img"
            :label="item.label"
            v-for="(item,index) in GeneralProperties"
            v-key="item.id"
          >
               <el-input   placeholder="请输入内容" v-model="item.value"></el-input>
          </el-form-item>
        </div>
      </div>

      <div class="footer-button">
        <el-button
          plain
          class="footer-cancel fontColor"
          @click="$router.go(-1)"
          >{{ $t('zdata.off') }}</el-button
        >
        <el-button
          type="primary"
          class="footer-save bgColor mgleft"
          @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </div>
    </el-form>

    <!-- 添加介绍弹窗 -->
    <!-- 添加介绍 -->
    <div class="dialog-brand2">
      <!-- 弹框组件 -->
      <el-dialog
        :title="$t('releasephysical.tjjsa')"
        :visible.sync="dialogVisible"
        :before-close="handleClose7"
        width="580"
      >
        <el-form
          :model="ruleForm7"
          :rules="rules7"
          ref="ruleForm7"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="task-container">
            <el-form-item :label="$t('releasephysical.btmc')" prop="name">
              <el-input
                v-model="ruleForm7.name"
                :placeholder="$t('releasephysical.qsrbqmc')"
                maxlength="10"
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="form-footer">
            <el-form-item>
              <el-button class="qx_bt" @click="handleClose7()">{{
                $t('DemoPage.tableFromPage.cancel')
              }}</el-button>
              <el-button
                class="bdColor"
                type="primary"
                @click="addIntroduction('ruleForm7')"
                >{{ $t('DemoPage.tableFromPage.save') }}</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>

      <!--规格属性弹窗 -->
        <el-dialog
            :title= dialogKindTitle
            :visible.sync="kindDialogVisible"
            :before-close="handleCloseKind"
           >
            <el-form> 
              <el-form-item :label="dialogKindSmalltitle" label-width="115px">
                <el-input  placeholder="请输入规格名称" v-model="addKindName"></el-input>
              </el-form-item>
            </el-form>
           
            <span slot="footer" class="dialog-footer"  >
              <el-button @click="kindDialogVisible = false" >取 消</el-button>
              <el-button type="primary" @click="addKindFn"  >确 定</el-button>
            </span>
        </el-dialog>

        <!-- table 上传图片 -->
        
        <el-dialog
            title=""
            width="65%"
            id="table_upload_dialog"
            :visible.sync="uploadDialogVisible"
            :before-close="handleCloseKind"
           
           >
           <l-upload
              :limit="6"
              v-model="tableUploadFileList"
              text="最多上传6张, 商品白底图尺寸900*600像素, 每张图限700K以内"
              style="height:600px !important;"
              @changefileListFn="changefileListFn"
              :imgTextArr = "currentTableItem.imgTextArr"
              @nextImgTextFn="nextImgTextFn"
              @prevImgTextFn="prevImgTextFn"
              @deleteImgTextFn= "deleteImgTextFn"
            >
            </l-upload>
         
            <span slot="footer" class="dialog-footer">
               <el-button @click="uploadDialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="tableUploadConfirmFn">确 定</el-button>
            </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>

import $ from 'jquery'
import { VueEditor } from 'vue2-editor'



import {
  getGoodsActiveList,
  label,
  choiceClass,
  goodsUnit,
  addGoods,
  getGoodsInfoById
} from '@/api/goods/goodsList'
import {
  getFreightInfo,
  addFreight,
  getRegion
} from '@/api/goods/freightManagement'
import { addClass } from '@/api/goods/goodsClass'
import { addBrand, getClassInfo, getCountry } from '@/api/goods/brandManagement'
import { dictionaryList, getKindData, getBrandData, getKindList, editGetKindData, uploadGetId, getAttr, offShell, checkCode } from '@/api/Platform/numerical'
import Config from '@/packages/apis/Config'
import { getStorage } from '@/utils/storage'
import axios from 'axios'
import loading from '@/store/modules/loading'
import { getStore } from '@/api/plug_ins/discount'
var attrFlag = true
export default {
  name: 'releasephysical',

  components: {
    VueEditor
  },

  data () {
    // var validatePass = (rule, value, callback) => {
    //   if (!value.length) {
    //     callback(new Error("请选择配送方式"));
    //   } else {
    //     this.$refs.ruleForm.clearValidate('defaultLogo')
    //     callback();
    //   }
    // };
    return {
        


        // 一般属性
        GeneralProperties: [
       
            {
                id: 1,  
                label: "软硬度",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 2,
                label: "功能",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 3,
                label: "产品规格",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 4,
                label: "单人位",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 5,
                label: "双人位",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 6,
                label: "三人位",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 7,
                label: "四人位",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 8,
                label: "五人位",
                categories: " ",
                type: 1,
                value: ""

            },
            {
                id: 9,
                label: "贵妃位",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 10,
                label: "脚踏",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 11,
                label: "坐高",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 12,
                label: "坐深",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 13,
                label: "沙发脚高",
                categories: " ",
                type: 1,
                value: ""
            },
            {
                id: 14,
                label: "进门尺寸",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 15,
                label: "材质",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 16,
                label: "面料",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 17,
                label: "人体接触面",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: "18",
                label: "人体非接触面",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 19,
                label: "框架",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: "20",
                label: "填充物",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 21,
                label: "沙发脚",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: 22,
                label: "抱枕是否随机",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: "23",
                label: "抱枕数量",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: "24",
                label: "沙发可否拆洗",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: "25",
                label: "保养说明",
                categories: "",
                type: 1,
                value: ""
            },
            {
                id: "26",
                label: "温馨提示",
                categories: "",
                type: 1,
                value: ""
            }
        ],
        pageType: "", // editor | 发布 
        // kindValue: "",
        dialogImageUrl: '',
        dialogVisibleUploadImage: false,
        disabled: false,
        dialogKindTitle: "",
        dialogKindSmalltitle: "",
        addKindName: "",
        currentKindIndex: 0,
        uploadFileList:  [],
        tableUploadFileList: [],
        // 颜色分类
        checkColorList: [],
        // 规格分类
        productSpecification: [],
        kindDialogVisible: false,    


        kindData: [   
          {
            id: 0,
            kindName: "材质",
            children: [
                // {id: 0, value:"灰色", flag: false}
            ],
            checkKindList: []
          },
          {
            id: 1,
            kindName: "规格",
            children : [
                // {id: 0, value: 41, flag: false}
            ]
          }
        ],
        // 类获取焦点后
        focusCurrentKindItem: {},
        focusStatus: "",
        kindTableData:  [
           /* {
                color: "",
                size: "",
                code: "",
                type: "",
                // 采购价	
                purchasePrice:  "",
         
                // 体积
                vol: "",
                // 库存	
                stock:  "",
                dayCount: "",
                dayArr: [
                    {value: 1, label: '45-60天'},
                    {value: 2, label: '30-45天'},
                    {value: 3, label: '25-30天'},
                    {value: 4, label: '20-25天'},
                    {value: 5, label: '15-20天'},
                    {value: 6, label: '8-15天'},
                    {value: 7, label: '3-7天'}
                ],
                assemble: "",
                assembleArr: [
                    {label: 1, title: "整装"},
                    {label: 2, title: "组装"}
                ],
                imgFileList: [],
                imgArr:[]
            } */
        ],
        kindTableDataAll: [
            
          /*  {
                SamplePurchasePrice: "",
                assemble: 1,
                assembleArr: [
                        {label: 1, title: "整装"},
                        {label: 2, title: "组装"}
                ],
                bom_nums: "1",
                code: "1",
                color: "图片色",
                colorId: 2954,
                dayArr: [
                        {value: 0, label: "请选择"},
                        {value: 1, label: '45-60天'},
                        {value: 2, label: '30-45天'},
                        {value: 3, label: '25-30天'},
                        {value: 4, label: '20-25天'},
                        {value: 5, label: '15-20天'},
                        {value: 6, label: '8-15天'},
                        {value: 7, label: '3-7天'}
                ],


                dayCount: 0,
                imgArr: [],
                imgFileList: [],
                purchasePrice: "1",
                retailPrice: "",
                size: "规格1",
                sizeId: 2964,
                stock: "1",
                type: "1",
                vol: "1"
             } */
        ],
        tableCurentIndex: 0,
        uploadDialogVisible: false,
    

        // 上传图片选中的 SKU
        currentTableItem: "",
        checkedFlag: false,
        // 商品分类
        putKindDataArr: [],


        // 商品 id
        goodsId: "",
        // 编辑获取 table 数据
        editeTableArr: [],
        // 添加介绍弹窗
        dialogVisible: false,
        brandArr: [],
        ruleForm7: {
           name: ''
        },
        rules7: {
          name: [
            {
                 required: true,
                 message: this.$t('releasephysical.qsrbqmc'),
                 trigger: 'blur'
            }
          ]
        },
        IntroList: [],
        ruleForm: {
            // 商品 id
            pId: "",
            // 商品名称
            goodsTitle: '',

            // 商品卖点
            subtitle: '',
            // 关键词
            keywords: '',
            // 商品分类
            kindValue: "",
            // 商品分类 cidStr
            goodKindCidStr: '',
            goodsClass: '',
            weight: '',
            // 商品品牌
            goodsBrand: '',
            // 商品封面图
            goodsCover: '',
            // 实拍图
            takePictures: "",
            // 商品展示图
            goodsShow: '',
            //风格
            styleId:'',
            styleName:'',
            // 属性设置
            // 采购价    
            cbj: '',
            bom_nums: "", // 包件数
            yj: '',
            sj: '',
            unit: '',
            kucun: '1000',
            attr: '',
            // 商品属性图
            attrImg: '',
            capacity:'',
            productCode:'',
            marque:'',
            // 商品设置
            inventoryWarning: 2,
            freight: '',
            checkedLabel: [],
            // distributionMode: [],
            checkedActivity: 1,
            checked: '',
            virtualSales: '',
            mch_sort: '',
            // 详细内容
            content: ''
        },
        rules: {
          // 基本信息
          goodsTitle: [
            {
              required: true,
              message: this.$t('releasephysical.qsrspbt'),
              trigger: 'blur'
            }
          ],
          // subtitle: [
          //   {
          //     required: true,
          //     message: this.$t('releasephysical.qsrfbt'),
          //     trigger: 'blur'
          //   }
          // ],
          keywords: [
            {
              required: true,
              message: this.$t('releasephysical.qsrspgjc'),
              trigger: 'blur'
            }
          ],
          goodsClass: [
            {
              required: true,
              message: this.$t('releasephysical.qsrspfl'),
              trigger: 'blur'
            }
          ],
          goodsBrand: [
            {
              required: true,
              message: this.$t('releasephysical.qxzsppp'),
              trigger: 'blur'
            }
          ],
          goodsCover: [
            {
              required: true,
              message: this.$t('releasephysical.qscfmt'),
              trigger: 'change'
            }
          ],
          goodsShow: [
            {
              required: true,
              message: this.$t('releasephysical.qsczst'),
              trigger: 'change'
            }
          ],
          weight: [
            {
              required: true,
              message: this.$t('releasephysical.qsrzl'),
              trigger: 'blur'
            }
          ],
          // 商品属性
          cbj: [
            {
              required: true,
              message: this.$t('releasephysical.qsrmrcbj'),
              trigger: 'blur'
            }
          ],
          yj: [
            {
              required: true,
              message: this.$t('releasephysical.qsrmryj'),
              trigger: 'blur'
            }
          ],
          sj: [
            {
              required: true,
              message: this.$t('releasephysical.qsrmrsj'),
              trigger: 'blur'
            }
          ],
          unit: [
            {
              required: true,
              message: this.$t('releasephysical.qxzdw'),
              trigger: 'change'
            }
          ],
          kucun: [
            {
              required: true,
              message: this.$t('releasephysical.qszmrkc'),
              trigger: 'blur'
            }
          ],
        // attr: [
        //   {
        //     required: true,
        //     message: this.$t('releasephysical.qszspsx'),
        //     trigger: 'change'
        //   }
        // ],
          attrImg: [
            {
              required: true,
              message: this.$t('releasephysical.text11'),
              trigger: 'change'
            }
          ],
          // 商品设置
          inventoryWarning: [
            {
              required: true,
              message: this.$t('releasephysical.qsrkcyj'),
              trigger: 'blur'
            }
          ],
          freight: [
            {
              required: true,
              message: this.$t('releasephysical.qxzyf'),
              trigger: 'change'
            }
          ],
          // distributionMode: [
          //   {required: true, message: '请选择配送方式', trigger: 'change'},
          //   {validator: validatePass, trigger: "change" },
          // ],
          checkedActivity: [
            {
              required: true,
              message: this.$t('releasephysical.qxzzchd'),
              trigger: 'change'
            }
          ]

          // content: [
          //   {
          //     required: true,
          //     message: this.$t('releasephysical.qsrspxq'),
          //     trigger: 'blur'
          //   }
          // ]
      },

      check_attr: [], // 编辑复制选中回显属性数据
      showAdrList: [], // 商品展示位置
      // 添加属性弹框数据
      imgArr: [],
      attrTitle: JSON.parse('[]', true), //可选规格数据
      strArr: JSON.parse('[]', true), //已选规格数据
      // strArr: [{"cbj":"11","yj":"1","sj":"1","unit":"根","kucun":"1","image":"https://laikeds.oss-cn-shenzhen.aliyuncs.com/1/0/1624863705554.jpg","bar_code":"","attr_list":[{"attr_id":"","attr_name":"银灰色","attr_group_name":"颜色"}],"cid":""}],
      unitList: [],

      // 商品分类列表
      classList: [],

      // 商品分类列表
      brandList: [],

      // 支持活动类型
      activityList: [],

      // 标签
      labelList: [],

      // 配送方式
      // distributionModeList: [
      //   {
      //     id: 1,
      //     name: '邮寄'
      //   },
      //   {
      //     id: 2,
      //     name: '自提'
      //   }
      // ],

      // 运费
      freightList: [],
      buttonList:[],
      togdisable: false,
      actionUrl: Config.baseUrl,
      goodsEditorBase: '',
      storeIds: '',
      mchid: '',
      emptyAttr: false,
      //风格
      styleList:[],
      classIds: [],

      videoList: [],
      videoList2: [],
      videoSrc: '',
      videoSrc2: '',
      dialogVisible_video: false,
      dialogVisible_video2: false,
      videoUp: '',
      videoUp2: '',
      videoLoading: false,
      videoLoading2: false,
      attrNum: 0
      
    }
  },
  created () {
    let _this = this;
    this.loadKindDataFn()
    this.getBrandDataFn()
    // setTimeout(()=>{
    //   _this.loadSelectColorFn()
    //   _this.loadSelectSizeFn()
    // }, 10000)
 
    if (!this.$route.query.name) {
        _this.loadSelectColorFn()

        _this.loadSelectSizeFn()
    }
    
    // 获取按钮权限
    this.getButtonList()
  
    if (this.$route.query.name && this.$route.query.name == 'editor') {
        this.$router.currentRoute.matched[2].meta.title = '编辑商品';
        this.pageType = this.$route.query.name;
        this.classIds = this.$route.query.classId
          .split('-')
          .filter(item => {
            if (item !== '') {
              return item
            }
          })
          .map(item => {
            return parseInt(item)
          })
          this.ruleForm.pId = this.$route.query.name && this.$route.query.name !== 'copy'
                    ? this.$route.query.id
                    : null;
         
    } else {
        this.$router.currentRoute.matched[2].meta.title = '发布商品'
        this.emptyAttr = true
    }

    this.getDictionaryList()
    this.getStyleList()
    this.getGoodsActiveLists()
    this.labels()
    this.choiceClasss().then(() => {
        if (this.$route.query.id) {
            this.allClass(this.classList)
        }
    })
    this.goodsUnits()
    if (
      this.$route.query.name == 'editor' &&
      this.$route.query.status !== '待上架'
    ) {
      this.togdisable = true
    }
    if (
      this.$route.query.name == 'editor' ||
      this.$route.query.name == 'copy'
    ) {
      this.goodsId = this.$route.query.id;
      this.editLoadSelectKindDataFn()
      getGoodsInfoById({
        api: 'mch.Mch.Goods.GetGoodsInfoById',
        goodsId: this.$route.query.id
      }).then(res => {
          // console.log("edit res")
          // console.log(res)
          // console.log("edit res")
          if (this.$route.query.name == 'editor') {
            this.mchid = res.data.data.list.mch_id;
          }
          let goodsAttribute = res.data.data.list;
          let resData = res.data.data;
          console.log("edit resData")
          console.log(resData)
          console.log("edit resData")
          this.ruleForm.kindValue = resData.class_id;
          this.ruleForm.goodKindCidStr = resData.productClass;
          this.ruleForm.takePictures = resData.realPhotos.split(",");
          


          // console.log("edit realPhotos")
          // console.log( this.ruleForm.takePictures)
          // console.log("edit realPhotos")
          // 编辑页数据回显
          this.IntroList = JSON.parse(goodsAttribute.content)
          // this.editInitkindTableDataAll(resData.checked_attr_list);
          // this.getKindTableDataFn()
         

    
      
          let  GeneralProperties =  eval(goodsAttribute.parameters);
          this.GeneralProperties = GeneralProperties;

          if (res.data.data.video) {
            this.videoList.push({
              videoFile: res.data.data.video,
              url: res.data.data.video,
              isShowPopup: false
            })
            this.videoUp = res.data.data.video
          }
          if (res.data.data.proVideo) {
            this.videoList2.push({
              videoFile: res.data.data.proVideo,
              url: res.data.data.proVideo,
              isShowPopup: false
            })
            this.videoUp2 = res.data.data.proVideo
          }
       
          this.ruleForm.goodsTitle = goodsAttribute.product_title 
          this.ruleForm.subtitle = goodsAttribute.subtitle
          this.ruleForm.keywords = goodsAttribute.keyword
          this.ruleForm.weight = res.data.data.weight
       
          this.ruleForm.goodsClass = goodsAttribute.product_class
            .split('-')
            .filter(item => {
              if (item !== '') {
                return item
              }
            })
            .map(item => {
              return parseInt(item)
            })
          // this.ruleForm.distributionMode = goodsAttribute.receiving_form.split(',').map(item => {
          //   return Number(item)
          // })
          this.ruleForm.goodsBrand = goodsAttribute.brand_id;
          let styleId = resData.style_id;
        
          //this.ruleForm.styleId = styleId;
          this.ruleForm.realPhotos = resData.realPhotos;
          this.editeTableArr = resData.checked_attr_list;
          console.log("checked_attr_list editeTableArr")
          console.log(resData.checked_attr_list)
          console.log("checked_attr_list editeTableArr")

          this.getKindTableDataEditeFn()
        
          // this.getKindTableDataFn()

          this.styleList.forEach((item, index)=>{
              if (Number(item.value) == styleId) {
                  _this.ruleForm.styleName = item.text;
                  _this.ruleForm.styleId = styleId;
              }
          })
          this.ruleForm.goodsCover = res.data.data.cover_map
          this.ruleForm.goodsShow = res.data.data.imgurls
          // console.log("res.data.data.initial.stockWarn")
          // conosle.log(res.data.data.initial.stockWarn)
          // console.log("res.data.data.initial.stockWarn")
        //  this.ruleForm.inventoryWarning = res.data.data.initial.stockWarn;
          
          // this.ruleForm.inventoryWarning = parseInt(
          //     res.data.data.initial.stockWarn
          // )

          this.ruleForm.inventoryWarning = res.data.data.initial.stockWarn

          if (res.data.data.freight_list1) {
            this.freightList.push(res.data.data.freight_list1)
          }

          this.ruleForm.freight = parseInt(goodsAttribute.freight)
          if (goodsAttribute.s_type) {
            if (goodsAttribute.s_type.length <= 1) {
              this.ruleForm.checkedLabel.push(parseInt(goodsAttribute.s_type))
            } else {
              this.ruleForm.checkedLabel = goodsAttribute.s_type
                .split(',')
                .map(item => {
                  return parseInt(item)
                })
            }
          }
          this.ruleForm.checkedLabel = this.ruleForm.checkedLabel.filter(
            item => {
              if (item) {
                return item
              }
            }
          )
          // this.ruleForm.checkedActivity = parseInt(goodsAttribute.active)
          // this.ruleForm.checked = `${goodsAttribute.distributor_id}`
          // if (res.data.data.show_adr[0].status) {
          //   this.ruleForm.checked.push(res.data.data.show_adr[0].value)
          // }
               //禅道46076
          res.data.data.show_adr.forEach(item =>{
            if(item.status == true){
                // this.ruleForm.checked.push(item.value)
                this.ruleForm.checked = item.value.toString()
            }
          })
          this.ruleForm.virtualSales = goodsAttribute.volume

          this.ruleForm.content = goodsAttribute.content
          this.ruleForm.cbj = res.data.data.initial.cbj
          this.ruleForm.yj = res.data.data.initial.yj
          this.ruleForm.sj = res.data.data.initial.sj
          this.ruleForm.volume = res.data.data.initial.volume
          this.ruleForm.productCode = res.data.data.initial.productCode
          this.ruleForm.marque = res.data.data.initial.marque
      
          this.ruleForm.unit = res.data.data.initial.unit
          this.ruleForm.kucun = res.data.data.initial.kucun
          this.ruleForm.attrImg = res.data.data.initial.attrImg
          this.attrTitle = res.data.data.attr_group_list
          this.strArr = res.data.data.checked_attr_list
          // if (this.strArr && this.strArr.length > 0) {
          //   this.ruleForm.attrImg = this.strArr[0].img
          // }
          this.attrNum = 1
          // if(this.$route.query.name == 'copy') {
          //   this.strArr = this.strArr.map(item => {
          //     item.cid = ''
          //     return item
          //   })
          // }

          this.ruleForm.mch_sort = res.data.data.list.mch_sort
          choiceClass({
            api: 'admin.goods.choiceClass',
            classId: res.data.data.class_id
          }).then(res => {
            this.brandList = res.data.data.list.brand_list
          })

          this.check_attr = res.data.data.checked_attr_list.map(item => {
            return item.attr_list[0]
          })

          this.check_attr = this.check_attr.map(item => {
            return {
              label: item.attr_group_name + ':' + item.attr_name,
              name1: item.attr_group_name + ':' + item.attr_name,
              name: item.attr_group_name,
              sname: item.attr_name
            }
          })
        })
        .then(() => {
          this.getFreightInfos()
        })
    } else {
      this.togdisable = false
      this.getFreightInfos()
    }
  },

  mounted () {
    this.getBase()
    $('#maskClass').remove()
    this.storeIds = getStorage('rolesInfos').storeId
    this.addIntroduction()
    if (
      this.$route.query.name == 'editor' ||
      this.$route.query.name == 'copy'
    ) {
      // console.log("this.ruleForm.goodKindCidStr")
      // console.log(this.ruleForm.goodKindCidStr)
      // console.log("this.ruleForm.goodKindCidStr")
      //   // 一般属性
      //  this.getAttrFn(this.ruleForm.goodKindCidStr)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (
      to.name == 'physicalgoods' &&
      (this.$route.query.name == 'editor' || this.$route.query.name == 'copy')
    ) {
      to.params.dictionaryNum = this.$route.query.dictionaryNum
      to.params.pageSize = this.$route.query.pageSize
      to.params.inputInfo = this.$route.query.inputInfo
    }
    next()
  },
  watch: {
    'ruleForm.goodsCover' () {
      if (this.ruleForm.goodsCover) {
        this.$refs.ruleForm.clearValidate('goodsCover')
      }
    },
    'ruleForm.goodsShow' () {
      if (this.ruleForm.goodsShow) {
        this.$refs.ruleForm.clearValidate('goodsShow')
      }
    },
    'ruleForm.goodsClass' () {
      if (this.ruleForm.goodsClass) {
        this.$refs.ruleForm.clearValidate('goodsClass')
      }
    },

    'ruleForm.goodsBrand' () {
      if (this.ruleForm.goodsBrand) {
        this.$refs.ruleForm.clearValidate('goodsBrand')
      }
    },
    strArr: {
      handler (newName, oldName) {
        if (newName && newName.length > 0) {
          this.ruleForm.attr = 1
          if (this.ruleForm.attrImg) {
            this.strArr.filter(item => {
              if (!item.img) {
                item.img = this.ruleForm.attrImg
              }
            })
          }
          this.$refs.ruleForm.clearValidate('attr')
        } else {
          this.ruleForm.attr = ''
        }
      },
      deep: true,
      immediate: true
    },
    'ruleForm.cbj' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0) {
        this.strArr.filter(item => {
          item.cbj = val
        })
      }
    },
    'ruleForm.yj' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0) {
        this.strArr.filter(item => {
          item.yj = val
        })
      }
    },

    'ruleForm.sj' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0) {
        this.strArr.filter(item => {
          item.sj = val
        })
      }
    },
    'ruleForm.unit' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0 && oldVal) {
        this.strArr.filter(item => {
          item.unit = val
        })
      }
    },
    'ruleForm.kucun' (val, oldVal) {
      if (this.strArr && this.strArr.length > 0) {
        this.strArr.filter(item => {
          item.kucun = val
        })
      }
    },
    'ruleForm.attrImg' (val, oldVal) {
      if (this.attrNum == 0) {
        if (this.strArr && this.strArr.length > 0) {
          this.strArr.filter(item => {
            item.img = val
          })
        }
      }
    },
    checkAll () {
      if (this.checkAll === true) {
        this.checkedCities = this.cities
      }
    }
  },
  computed: {
    filterTable () {
      let arr = []
      if (this.attrTitle.length > 0) {
        this.attrTitle.filter((items, indexs) => {
          arr.push([])
          items.attr_list.filter(item => {
            arr[indexs].push({
              text: item.attr_name,
              value: item.attr_name
            })
          })
        })
      }
      return arr
    },
    uploadData () {
      {
        return {
            api: 'resources.file.uploadFiles',
            storeId: getStorage('laike_store_uaerInfo').storeId,
            groupId: -1,
            uploadType: 2,
            accessId: this.$store.getters.token
        }
      }
    }
  },
  methods: {
    changefileListFn (fileList) {
        let currentTableItem = this.currentTableItem;
        // console.log("currentTableItem init")
        // console.log(currentTableItem)
        // console.log("currentTableItem init")
        let selectImgTextArr = fileList.fileListTextArr;
        // console.log("changefileListFn fileList")
        // console.log(fileList)
        // console.log("changefileListFn fileList")
        selectImgTextArr.forEach((imgTextItem)=> {
          currentTableItem.imgTextArr.push(imgTextItem)
        })
        this.currentTableItem = currentTableItem;
      
      
      
        setTimeout(()=> {
              console.log("this.currentTableItem this.currentTableItem")
            console.log(this.currentTableItem)
            console.log("this.currentTableItem this.currentTableItem")       
        
          }, 2000)
        
    },
    prevImgTextFn (index) {
      
        // let currentImg = this.fileList[index];
        // let newIndex = index - 1;
        // let fileList = this.fileList;
        // if (newIndex < 0) {
        //   newIndex = length;
        // }
        // fileList.splice(index, 1);
        // fileList.splice(newIndex, 0, currentImg);
        // this.fileList = fileList;


        let currentTableItem =  this.currentTableItem; 
        let imgTextArr = currentTableItem.imgTextArr;
        let length = imgTextArr.length;


        let currentImgText = imgTextArr[index];
        let newIndex = index - 1;
        if (newIndex < 0) {
           newIndex = length;
        }

        imgTextArr.splice(index, 1);
        imgTextArr.splice(newIndex, 0, currentImgText);
        currentTableItem.imgTextArr = imgTextArr;
        this.currentTableItem = currentTableItem;
    },
    nextImgTextFn (index) {
        let currentTableItem =  this.currentTableItem; 
        let imgTextArr = currentTableItem.imgTextArr;
        let length = imgTextArr.length;

        let currentImgText = imgTextArr[index];
        let newIndex = index + 1;
        if (newIndex >= length) {
           newIndex = 0;
        }

        imgTextArr.splice(index, 1);
        imgTextArr.splice(newIndex, 0, currentImgText);
        currentTableItem.imgTextArr = imgTextArr;
        this.currentTableItem = currentTableItem;
    },
    deleteImgTextFn (index) {
        console.log("deleteImgTextFn index", index)
        let currentTableItem =  this.currentTableItem; 
        let imgTextArr = currentTableItem.imgTextArr;
        imgTextArr.splice(index, 1);
        currentTableItem.imgTextArr = imgTextArr;
        this.currentTableItem = currentTableItem;

        console.log("currentTableItem delete")
        console.log(currentTableItem)
        console.log("currentTableItem delete")
    },
      // handleRemove(file) {
      //   console.log(file);
      // },
      // handlePictureCardPreviewShowBig(file) {

      //   console.log("showFileList", this.showFileList)
      //   this.dialogImageUrl = file.url;
      //   this.showBig_dialogVisible = true;
      // },
      // handleDownload(file) {
      //   console.log(file);
      // },
      // handleExceed(files, fileList) {
      //   console.log("file fileList")
      //   console.log(files)
      //   console.log(fileList)
      //   console.log("file fileList")
      //   this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      // },
 


 
    // edit 页 kindTableDataAll

    // editInitkindTableDataAll (resTableData) {
    //     console.log("resTableData--------------")
    //     console.log(resTableData)
    //     console.log("resTableData------------")
    //     let length = resTableData.length;
    //     let kindTableDataAll = [];
    //     for (let i=0; i< length; i++) {
    //         let item = {
    //               SamplePurchasePrice: "",
    //               assemble: 1,
    //               assembleArr: [
    //                       {label: 1, title: "整装"},
    //                       {label: 2, title: "组装"}
    //               ],
    //               bom_nums: "1",
    //               code: "1",
    //               color: "图片色",
    //               colorId: 2954,
    //               dayArr: [
    //                       {value: 0, label: "请选择"},
    //                       {value: 1, label: '45-60天'},
    //                       {value: 2, label: '30-45天'},
    //                       {value: 3, label: '25-30天'},
    //                       {value: 4, label: '20-25天'},
    //                       {value: 5, label: '15-20天'},
    //                       {value: 6, label: '8-15天'},
    //                       {value: 7, label: '3-7天'}
    //               ],
    //               dayCount: 0,
    //               imgArr: [],
    //               imgFileList: [],
    //               purchasePrice: "1",
    //               retailPrice: "",
    //               size: "规格1",
    //               sizeId: 2964,
    //               stock: "1",
    //               type: "1",
    //               vol: "1"
    //             }
    //         }
    // },
    // 获取按钮权限
    getButtonList(){
      let routeList = getStorage('route')
      // console.log("mchrouteList",routeList)
      let list =  routeList.filter(item=>item.path=="goodslist")[0].children
      let childrenList =  list.filter(item=>item.path=="editorphysical")[0].children
      // console.log("sslist",list)
      this.buttonList = childrenList.map(item=>{
        // console.log("-----------------------------------")
        // console.log("item",item)
        return {text:item.name,path:item.path,url:item.url,checked:item.checked}
      })
      // console.log('routeList',list,this.buttonList);
      // console.log('list',list);
      // console.log('routeList',this.buttonList);
    },
    getAttrFn (cidStr) { 
      let _this = this;
      getAttr({
            api: "admin.generalProperty.list",
            // categories: "-148-150-151-"
            categories: cidStr
        }).then((res)=> {
            let resData = res.data.data;
            // console.log("沙发--------")
            // console.log(resData)
            // console.log("沙发--------")
            if (resData.length>0) {
              _this.GeneralProperties = res.data.data;
            }
        })
    },
    // offShelfFn () {
    //     let _this = this;
    //     offShell({
    //         api: "mch.Mch.Goods.editConfigureStatus",
    //         status: false
    //     }).then((res)=> {
             
    //     })
    // },
    switchChangeFn ( row) {
      //  console.log("row", row)
        let flag =  row.statusFlag;
        if (flag) {
           row.status = 0;
        } else {
           row.status = 1;
        }
    },
    // 编辑页规格
    editLoadSelectKindDataFn () {
        const _this = this;
        editGetKindData({
            api: "admin.goods.getSkuAttributeInfo",
            pid: this.goodsId
        }).then((res)=> { 
            let editAttr = eval(res.data.data.sku_attribute);

          
          
            // console.log("get kindData edit")
            // console.log(editAttr)
            // console.log("get kindData edit")
            _this.kindData = editAttr;
        })
    },
    
    // 规格颜色
    loadSelectColorFn () {
      const _this = this;
      let kindData = this.kindData;
      // console.log("edit init kindData")
      // console.log(this.kindData)
      // console.log("edit init kindData")
        getKindList({
            api: "saas.dic.getSkuInfo",
            sid: 2953
        }).then((res)=>{
            let resData = res.data.data.list;
            console.log("resData loadSelectColor")
            console.log(resData)
            console.log('resData loadSelectColor')
            if (resData&&resData.length>0) {
                resData.forEach((item, index)=> {
                    let  colorItem = {};
                    colorItem.id = item.id;
                    colorItem.value = item.name;
                    colorItem.flag = false;
                    colorItem.type = "color";
                    colorItem.sid = item.sid;

                    kindData[0].children.push(colorItem);
                    _this.kindData = kindData;
                })

                setTimeout(()=>{
                    console.log("kindData loadSelectColor end")
                    console.log(_this.kindData)
                    console.log("kindData loadSelectColor end")
                })
            }
           
        })
    },
    // 规格尺寸
    loadSelectSizeFn () {
      const _this = this;
      let kindData = this.kindData;
        getKindList({
            api: "saas.dic.getSkuInfo",
            sid: 2963
        }).then((res)=>{
            let resData = res.data.data.list;
            // console.log("resData loadSelectSize")
            // console.log(resData)
            // console.log('resData loadSelectSize')
            if (resData&&resData.length>0) {
                resData.forEach((item, index)=> {
                    let  sizeItem = {};
                    sizeItem.id = item.id;
                    sizeItem.value = item.name;
                    sizeItem.flag = false;
                    sizeItem.sid = item.sid;
                    sizeItem.type = "size";
                    kindData[1].children.push(sizeItem);
                    _this.kindData = kindData;
                })
                // setTimeout(()=>{
                //     console.log("kindData size")
                //     console.log(_this.kindData)
                //     console.log("kindData size")
                // },2900)
            }
        })
    },
    // 拍图上传
    addUploadFn(file, fileList) {
        this.uploadFileList = fileList;
    },
    uploadImgFn () {
        const mchId = getStorage("mchId");
        $.ajax({
              cache: true,
              type: 'POST',
              dataType: 'json',
              url: this.goodsEditorBase,
              data: {
                api: 'resources.file.uploadFiles',
                // storeId: getStorage('rolesInfos').storeId,
                storeId: getStorage('laike_store_uaerInfo').storeId,
                groupId: -1,
                uploadType: 2,
                accessId: this.$store.getters.token,
                storeType: 7,
                mchId: mchId,
                id: 14681
              },
              success (res) {
                   console.log(res)
              }
            })
    },
    selectColorFn (value) {
        console.log(value)
    },
    // 删除图片
    handleRemove(file) {
       const uid = file.uid;
       let  uploadFileList = this.uploadFileList;
       this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          uploadFileList.forEach((item, index)=>{
              if (item.uid === uid) {
                uploadFileList.splice(index, 1)
              }      
          })
          this.uploadFileList = uploadFileList;
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleUploadImage = true;
    },
    handleExceed(files) {
        this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件`);
    },
    showKindDialogFn (index) {
        this.currentKindIndex = index;
        this.kindDialogVisible = true;
        this.dialogKindTitle = "增加" + this.kindData[index].kindName + "属性"
        this.dialogKindSmalltitle =  this.kindData[index].kindName 
    },
    handleCloseKind (done) {
        done()
    },
    // 增加商品属性
    addKindFn () {
        const _this = this;
        const index = this.currentKindIndex;
        const children = this.kindData[index].children;
        const length = children.length;
        let hasKindFlag = false;
        let type = index==0?"color": "size";
        for (let i=0; i<length; i++) {
            if (children[i].value == _this.addKindName) {
                hasKindFlag = true;
                _this.$message.error('属性已存在');
                _this.kindDialogVisible = false;
                _this.addKindName = "";
                return ;
            }
        }
 
        if (!hasKindFlag) {
          const item = {
              id: length,
              value: this.addKindName,
              flag: false,
              type: type
            }
            this.kindData[index].children.push(item);
            this.kindDialogVisible = false;
            this.addKindName = "";
        }
    },
    selectKindChangeFn () {
        this.getKindTableDataFn()
    },
    // 发布重组 table
    getKindTableDataFn () {
        const _this = this;
        const kindArrA = this.kindData[0].children;
        const kindSelectArrA = [];

        kindArrA.forEach((item, index)=>{
            if (item.flag) {
                kindSelectArrA.push(item)
            }
        })
        const lengthA = kindSelectArrA.length;
        const kindArrB = this.kindData[1].children;
        const kindSelectArrB = [];
        kindArrB.forEach((item, index)=>{
            if (item.flag) {
                kindSelectArrB.push(item)
            }    
        })
        const lengthB = kindSelectArrB.length;
        let kindTableDataAll = this.kindTableDataAll;
         
        // 建分类 table 数据
        let kindTableData = []; 
        for (let i=0; i<lengthA; i++) {
            for (let j=0; j<lengthB; j++) {  
                let item = {};
                item.colorId = kindSelectArrA[i].id;
                item.color = kindSelectArrA[i].value;
                item.size = kindSelectArrB[j].value;
                item.sizeId = kindSelectArrB[j].id;
                let hasFlagItem = _this.kindTableDataAllHasFlag(item)
                if (hasFlagItem) {
                    item = hasFlagItem;
                } else {
                    item.code = "";
                    item.codeHas = false;
                    item.type = "";
                    // 上样采购价	
                    item.SamplePurchasePrice = "";
                    // 供货价
                    item.yj = "";
                    // 采购价	
                    item.purchasePrice = "";
                    // 售价
                    item.sj = "";
 
                    // 包件数
                    item.bom_nums = "";
                    // 零售价
                    item.retailPrice = "";
                    // 体积
                    item.vol = "";
                    // 库存	
                    item.stock = "";
                    item.dayCount = 1;


                    item.dayArr = [
                        // {value: 0, label: "请选择"},
                        {value: 0, label: '45-60天'},
                        {value: 1, label: '30-45天'},
                        {value: 2, label: '25-30天'},
                        {value: 3, label: '20-25天'},
                        {value: 4, label: '15-20天'},
                        {value: 5, label: '8-15天'},
                        {value: 6, label: '3-7天'}
                    ]
                    item.assemble = 1;
                    item.assembleArr = [
                        {label: 1, title: "整装"},
                        {label: 2, title: "组装"}
                    ];
                    item.imgFileList = [];
                    item.imgArr = [];
                    item.imgTextArr = [];
                    item.status = 0;
                    item.statusFlag = true;
                    item.cid = 1;
                }
                kindTableData.push(item);
                if (!hasFlagItem) {
                    _this.kindTableDataAll.push(item);
                }

            }
        }
        // console.log("kindTableData")
        // console.log(kindTableData)
        // console.log("kindTableData")
        // console.log("kindTableDataAll")
        // console.log( _this.kindTableDataAll)
        // console.log("kindTableDataAll")
        this.kindTableData = kindTableData;
    },
    // 重组 table 查询是否有 
    kindTableDataAllHasFlag (item) {
        // console.log("item------", item)
        let kindTableDataAll = this.kindTableDataAll;
        let length = kindTableDataAll.length;    
        // console.log("kindTableDataAllHasFlag kindTableDataAll", kindTableDataAll)
        let flag = false;
        let hasItem = {};
        if (length==0) {
          return false;
        }
        for (let i=0; i<length; i++) {
            // console.log("kindTableDataAll["+ i +"].color:", kindTableDataAll[i].color)
            // console.log("kindTableDataAll["+ i +"].size", kindTableDataAll[i].size)
            if (kindTableDataAll[i].color == item.color && kindTableDataAll[i].size == item.size) {
                flag = true;
                hasItem = kindTableDataAll[i];
                break ;
            }
        }
 
        if (flag) {
            // console.log("kindTableDataAllHasFlag flag", flag)
            // console.log("kindTableDataAllHasFlag item", item)
            return hasItem;


        } else {
            return false;
        }
    },

    escapeSpecialChars (str) {

        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },
    updateKindTableDataAll (item, type) {
        let _this = this;
        let kindTableDataAll = this.kindTableDataAll;  
        let length = kindTableDataAll.length;    
        let flag = false;
        for (let i=0; i<length; i++) {
            if (kindTableDataAll[i].color == item.color && kindTableDataAll[i].size == item.size) {
              kindTableDataAll.splice(i, 1, item)
              flag = true;
            }
        }
        if (!flag) {
            kindTableDataAll.push(item)
        }
        this.kindTableDataAll = kindTableDataAll;

        if (type=="code" && item.code) {
      
            var codeStr = encodeURIComponent(item.code);          
            _this.checkCodeFn(item, codeStr);
        } 
    },
    checkCodeFn (item, code) {
        item.codeHas = false;
        checkCode({
            api: "admin.goods.existProdctCode",
            productCode: code,
            skuId: item.cid 
        }).then((res)=> {
          let isHas = res.data.data;
          item.codeHas = isHas;
        })
    },
    // 编辑页 重组 table 
    getKindTableDataEditeFn () {  
        const editeTableArr = this.editeTableArr;
        const length = editeTableArr.length;
       
        let kindTableData = [];
       // console.log("editeTableArr")
       // console.log(editeTableArr)
       // console.log("editeTableArr")
        for (let i=0; i<length; i++) {
                let item = {};    
                item.color = editeTableArr[i].attr_list[0].attr_name;
                item.size = editeTableArr[i].attr_list[1].attr_name;
                item.code = editeTableArr[i].product_code;
              
                item.type = editeTableArr[i].marque;
              
                // 供货价
                item.yj = editeTableArr[i].yj;
                // 采购价	
                item.purchasePrice =  editeTableArr[i].cbj;

                // 售价
                item.sj =  editeTableArr[i].sj;

                // 包件数
                item.bom_nums = editeTableArr[i].bom_nums;
                // 体积
                item.vol =  editeTableArr[i].capacity;
                // 库存	
                item.stock =  editeTableArr[i].kucun;
                item.dayCount = editeTableArr[i].send_days;

                item.dayArr = [

                    // {value: 0, label: "请选择"},
                    {value: 0, label: '45-60天'},
                    {value: 1, label: '30-45天'},
                    {value: 2, label: '25-30天'},
                    {value: 3, label: '20-25天'},
                    {value: 4, label: '15-20天'},
                    {value: 5, label: '8-15天'},
                    {value: 6, label: '3-7天'}
                ]
                item.assemble =  editeTableArr[i].bag_type;
                item.assembleArr = [
                    {label: 1, title: "整装"},
                    {label: 2, title: "组装"}
                ];
                if ( editeTableArr[i].img_arr) {
                    item.imgFileList = editeTableArr[i].img_arr.split(",");
                } else {
                    item.imgFileList = [];
                } 
              
                item.imgArr = [];


                item.imgTextArr = [];
                item.imgTitle = editeTableArr[i].imgTitle;

                if (editeTableArr[i].imgTitle.indexOf(",") == -1) {
                  
                    item.imgTextArr.push(editeTableArr[i].imgTitle)    
                } else {
                    item.imgTextArr = editeTableArr[i].imgTitle.split(",");
                }
 
                item.status =   editeTableArr[i].status;
                item.statusFlag = editeTableArr[i].status==0?true:false;
                item.cid =  editeTableArr[i].cid;
                kindTableData.push(item);
        }

        let colorArr = this.kindData[0].children;

        let colorLength = colorArr.length;
        let sizeArr =  this.kindData[1].children;
        let sizeLength = sizeArr.length;

        kindTableData.forEach((item,index)=>{
            for (let i=0; i<colorLength; i++) {
                if (item.color == colorArr[i].value) {
                    item.colorId = colorArr[i].id;
                }
            }

            for (let j=0; j<sizeLength; j++) {
                if (item.size == sizeArr[j].value) {
                    item.sizeId = sizeArr[j].id;
                }
            }
        })
        // console.log("kindTableData-----edite")

        // console.log(kindTableData)
        // console.log("kindTableData-----edite")

        // console.log("kindData-----edite")
        // console.log("kindTableData", kindTableData)
        // console.log("colorArr", colorArr)
        // console.log("sizeArr", sizeArr)
        // console.log("kindData-----edite")
        
        this.kindTableData = kindTableData;
        this.kindTableDataAll = kindTableData;
    },
    
    changeKindFn (item) {
        console.log(item)
    },
    // 类失去焦点时 kindTableData 重组
    blurChangeKindFn (changeItem) {
        let value = changeItem.value;
    
        let type = changeItem.type;
        let kindTableData = this.kindTableData;
        let kindTableLength = kindTableData.length;
        let kindTableDataAll = this.kindTableDataAll;
        let kindTableDataAllLength = kindTableDataAll.length;
       
        for (let i=0; i<kindTableLength; i++) {
              if (type=="color") {
                  if (kindTableData[i].colorId == changeItem.id) {
                      kindTableData[i].color = value;
                  }
              }
              if (type == "size") {
                  if (kindTableData[i].sizeId == changeItem.id) {          
                      kindTableData[i].size = value;
                  }  
              }
        }
        
        this.kindTableData = kindTableData;

        for (let j=0; j<kindTableDataAllLength; j++) {
              if (type=="color") {
                  if (kindTableDataAll[j].colorId == changeItem.id) {
                    kindTableDataAll[j].color = value;
                  }
              }
              if (type == "size") {
                  if (kindTableDataAll[j].sizeId == changeItem.id) {          
                    kindTableDataAll[j].size = value;
                  }  
              }
        }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
          let colspanCount = this.kindData[1].children.length;
          console.log("colspanCount", colspanCount)
          /*
           if (columnIndex === 0) { 
             if (rowIndex % colspanCount === 0) {
                 return {
                   rowspan: colspanCount,
                   colspan: 1
                };
               } else {
                 return {
                   rowspan: 0,
                   colspan: 0
                };
               }
          }
          */
    },
    changeValueFn () {
        console.log(this.kindTableData)
    },
    // 商品分类
    loadKindDataFn () {
      const _this = this;
      getKindData({
          api: "mch.Mch.Goods.GetClassList"
      }).then((res)=>{
          const resData = res.data.data;

          this.putKindDataFn(resData)
          // setTimeout(function () {
          //     console.log(" _this.putKindDataArr")
          //     console.log( _this.putKindDataArr)
          //     console.log(" _this.putKindDataArr")
          // }, 5000)
      })
    },
    putKindDataFn (childrenArr, cidStr) {
        var _this = this;
        let putKindDataArr = this.putKindDataArr;
        let length = childrenArr.length;

        for (let i=0; i<length; i++) {
            let item = {};
            item.sid = childrenArr[i].sid;
            item.cid = childrenArr[i].cid;
            if (cidStr) {
                item.cidStr = cidStr + "-" + item.cid;
            } else {
                item.cidStr = "-" + item.cid;
            }
            item.pname = childrenArr[i].pname;
            item.level = childrenArr[i].level;
            putKindDataArr.push(item)

            _this.putKindDataArr = putKindDataArr;
            if (childrenArr[i].children&&childrenArr[i].children.length>0) {
              _this.putKindDataFn(childrenArr[i].children, item.cidStr)
            }
        }
    },
    // 商品品牌
    getBrandDataFn () {
        const _this = this;
        const mchId = getStorage("mchId");
        const storeId = getStorage("rolesInfos").storeId;  
        getBrandData({
            api: "admin.goods.getBrandsList",
            storeId: storeId,
            mchId: mchId
        }).then((res)=> {
           const resData = res.data.data;
           _this.brandArr = resData;
        })
    },
    tableUpload (scope) {
        // console.log("tableUpload row index", scope.row)
        this.tableCurentIndex = scope.$index; 
        this.tableUploadFileList = this.kindTableData[this.tableCurentIndex].imgFileList;
        this.currentTableItem = this.kindTableData[this.tableCurentIndex];
        // console.log("kindTableData kindTableData scope")
        // console.log(this.currentTableItem)
        // console.log("kindTableData kindTableData scope")
        this.uploadDialogVisible = true;
        const _this = this;
        const mchId = getStorage("mchId");
        const storeId = getStorage("rolesInfos").storeId;  
    },
    tableChangeUploadFn (file, fileList) {
        // console.log("fileList", fileList)
        this.tableUploadFileList = fileList;
        this.kindTableData[this.tableCurentIndex].imgFileList = fileList;
     
        // console.log("kindTableData")
        // console.log(this.kindTableData)
        // console.log("kindTableData")
    },
    tableUploadConfirmFn() {
        this.kindTableData[this.tableCurentIndex].imgFileList =  this.tableUploadFileList;
        this.uploadDialogVisible = false;
        // this.tableUploadFileList = [];
        // console.log("tableUploadFileList", this.tableUploadFileList)
        //this.uploadImgFn()
    },
    selectKindFn (cid) {
        let _this = this;
        let putKindDataArr = this.putKindDataArr;
        let length = putKindDataArr.length;
        let cidStr = "";
        for (let i=0; i<length; i++) {
            if (putKindDataArr[i].cid == cid) {
                cidStr = putKindDataArr[i].cidStr + "-";
                _this.ruleForm.goodKindCidStr =  cidStr;
                _this.getAttrFn(cidStr)
                
                return ;
            }
        }
    },
    addIntro () {

      this.addIntroduction('ruleForm7')
    },
    handleClose7 () {
      this.$nextTick(() => {
        this.$refs['ruleForm7'].clearValidate()
      })
      this.ruleForm7.name = ''
      this.dialogVisible = false
    },
    delIntro (index) {
      this.IntroList.splice(index, 1)
    },
    //风格名称赋值
    changeStyleName(item){
      const {value,label} = item
      this.ruleForm.styleId = value
      this.ruleForm.styleName = label
    },
    //添加介绍
    addIntroduction (formName7) {
         let data = {
            name: this.ruleForm7.name,
            content: ''
          }
          this.IntroList.push(data)
          this.handleClose7()
      // this.$refs[formName7].validate(valid => {
      //   if (valid) {t
      //     let data = {
      //       name: this.ruleForm7.name,
      //       content: ''
      //     }
      //     this.IntroList.push(data)
      //     this.handleClose7()
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    beforeAvatarUpload (file) {
      return new Promise((resolve, reject) => {
        if (
          [
            'video/mp4',
            'video/webm',
            'video/flv',
            'video/avi',
            'video/wmv',
            'video/rmvb',
            'video/mov'
          ].indexOf(file.raw.type) == -1
        ) {
          return this.$message.warning(this.$t('releasephysical.qsczcdspgs'))
        }

        if (file.size / 1024 / 1024 > 100) {
          return this.$message.warning(this.$t('releasephysical.spdxbncg'))
        }
        resolve()
      })
    },



    // uploadVedioFn (file, fileList) {
    //      console.log("up file", this.$refs.vedioFile.files)
    //      console.log("up fileList", fileList)
    // },
    // 上传改变
    async handleAvatarChange (file, fileList) {
      
      console.log("handleAvatarChange")
      console.log("file", file)
      console.log("fileList", fileList)
      
      console.log("handleAvatarChange")
      try {
       // await this.beforeAvatarUpload(file)
        this.uploadImgApi(file)
      } catch (e) {
        this.$message.warning(JSON.stringify(e))
      }
    },
    // 上传改变
    async handleAvatarChange2 (file, fileList) {
      try {
       // await this.beforeAvatarUpload(file)
        this.uploadImgApi2(file)
      } catch (e) {
        console.log('e', e)

        this.$message.warning(JSON.stringify(e))
      }
    },
    // 上传视频准备
    uploadImgApi (file) {
      this.videoLoading = true
      console.log('uploadImgApi file', file)
      const videoSrc = URL.createObjectURL(file.raw)
      console.log('videoSrc', videoSrc)
      var formData = new FormData()
      formData.append('file', file.raw) //第一个file 后台接收的参数名
      console.log("formData", formData)
      axios({
        url: this.actionUrl, //上传路径
        method: 'POST',
        headers: {
        
           "Content-Type": "multipart/form-data"
        },
        params: {
          api: 'resources.file.uploadFiles',
          storeId: getStorage('rolesInfos').storeId,
          groupId: -1,
          uploadType: 2,
          accessId: this.$store.getters.token
        },
        data: formData
      })
        .then(res => {
          this.videoList.push({
            videoFile: file,
            url: videoSrc,
            isShowPopup: false
          })
          this.videoUp = res.data.data.imgUrls[0]
          console.log('videoUp', this.videoUp)
          setTimeout(() => {
            this.videoLoading = false
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 上传视频准备
    uploadImgApi2 (file) {
      console.log('file', file)
      this.videoLoading2 = true
      const videoSrc = URL.createObjectURL(file.raw)
      var formData = new FormData()


      formData.append('file', file.raw) //第一个file 后台接收的参数名
      axios({
        url: this.actionUrl, //上传路径
        method: 'POST',
        params: {
          api: 'resources.file.uploadFiles',
          storeId: getStorage('rolesInfos').storeId,
          groupId: -1,
          uploadType: 2,
          accessId: this.$store.getters.token
        },
        data: formData
      })
        .then(res => {
          this.videoList2.push({
            videoFile: file,
            url: videoSrc,
            isShowPopup: false
          })
          this.videoUp2 = res.data.data.imgUrls[0]
          setTimeout(() => {
            this.videoLoading2 = false
          }, 1000)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 预览视频
    previewVideo (data) {
      console.log("previewVideo")
      this.videoSrc = data.url
      this.dialogVisible_video = true
    },
    // 预览视频
    previewVideo2 (data) {
      this.videoSrc2 = data.url
      this.dialogVisible_video2 = true
    },
    // 删除视频
    deleteVideo (index) {
      this.videoList.splice(index, 1)
      this.videoUp = ''
    },
    // 删除视频
    deleteVideo2 (index) {
      this.videoList2.splice(index, 1)
      this.videoUp2 = ''
    },
    handleClose () {
      const video = document.getElementsByTagName('video')[1]
      if (!video.paused) {
        video.currentTime = 0
        video.pause()
      }
      this.dialogVisible_video = false
    },
    handleClose5 () {
      const video = document.getElementsByTagName('video')[1]
      if (!video.paused) {
        video.currentTime = 0
        video.pause()
      }
      this.dialogVisible_video2 = false
    },
    oninput2 (num) {
      var str = num
      str = str.replace(/[^\.\d]/g, '')
      str = str.replace('.', '')

      return str
    },
    getBase () {
      if (process.env.NODE_ENV == 'development') {
        this.goodsEditorBase = process.env.VUE_APP_PROXY_API
      } else if (process.env.NODE_ENV == 'production') {
        this.goodsEditorBase = process.env.VUE_APP_PROXY_API
      }
    },

    async getDictionaryList () {
      const res = await dictionaryList({
        api: 'saas.dic.getDictionaryInfo',
        key: '商品展示位置'
      })

      console.log(res)
      this.showAdrList = res.data.data.list
    },

    async getStyleList () {
      const res = await dictionaryList({
        api: 'saas.dic.getDictionaryInfo',
        key: '风格'
      })

      console.log("styleList",res)
      this.styleList = res.data.data.list
    },

    // 加载所有分类
    async allClass (value) {
      for (let i = 0; i < value.length; i++) {
        if (this.classIds.includes(value[i].value)) {
          choiceClass({
            api: 'mch.Mch.Goods.GetClass',
            classId: value[i].value
          }).then(res => {
            if (res.data.data.list.class_list.length !== 0) {
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

    filterHandler (value, row) {
      let flag = row.attr_list.some(item => {
        return item.attr_name == value
      })
      return flag
    },

    clickImage () {
      $('.el-table__body-wrapper').css('height', '1000000')
      setTimeout(() => {
        $(document)
          .off()
          .on('click', function () {
            $('.el-table__body-wrapper').css('height', '265px')
          })
      }, 1000)
    },

    // 获取商品类别
    async choiceClasss () {
      const res = await choiceClass({
        api: 'mch.Mch.Goods.GetClass'
      })
      res.data.data.list.class_list[0].forEach((item, index) => {
        let obj = item
        this.classList.push({
          value: obj.cid,
          label: obj.pname,
          index: index,
          children: []
        })
      })
    },

    // 根据商品类别id获取商品品牌
    changeProvinceCity (value) {
      this.ruleForm.goodsBrand = []
      choiceClass({
        api: 'admin.goods.choiceClass',
        classId: value.length > 1 ? value[value.length - 1] : value[0]
      }).then(res => {
        let num = this.$refs.myCascader.getCheckedNodes()[0].data.index
        this.brandList = res.data.data.list.brand_list
        if (res.data.data.list.class_list[0].length !== 0) {
          this.$refs.myCascader.getCheckedNodes()[0].data.children = []
          res.data.data.list.class_list[0].forEach((item, index) => {
            let obj = item
            this.$refs.myCascader.getCheckedNodes()[0].data.children.push({
              value: obj.cid,
              label: obj.pname,
              index: index,
              children: []
            })
          })
        }
      })
    },

    // 获取支持活动类型
    async getGoodsActiveLists () {
      const res = await getGoodsActiveList({
        api: 'mch.Mch.Goods.GetGoodsActive'
      })
      this.activityList = res.data.data.filter(item => {
        if (item.status) {
          return item
        }
      })
    },

    // 获取商品标签
    async labels () {
      const res = await label({
        api: 'mch.Mch.Goods.GetGoodsLabel',
        pageSize: 9999
      })
      // this.labelList = res.data.data.list.splice(0,2)
      this.labelList = res.data.data.list
    },

    // 获取商品单位
    async goodsUnits () {
      const res = await goodsUnit({
        api: 'mch.Mch.Home.GetDictionaryInfo',
        pageSize: 20,
        key: '单位'
      })

      this.unitList = res.data.data.list
    },

    // 获取运费列表
    async getFreightInfos () {
      const res = await getFreightInfo({
        api: 'mch.Mch.Freight.Index',
        pageSize: 999
      })
      let list = this.freightList.concat(res.data.data.list)
      let list2 = []
      for (var i = 0; i < list.length; i++) {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (!list[i].id) {
          continue
        }
        if (!list2.some(e => list[i].id == e.id)) list2.push(list[i])
      }
      console.log(list2, 'list[i]')

      this.freightList = list2
      if (!this.ruleForm.freight) {
        this.ruleForm.freight = this.freightList[0].id
      }
    },

    // 商品详情
    handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      console.log("upload file")

      console.log(file)
      
      console.log("upload file")
      var formData = new FormData()
      formData.append('file', file) //第一个file 后台接收的参数名
      axios({
        url: this.actionUrl, //上传路径
        method: 'POST',
        params: {
          api: 'resources.file.uploadFiles',
          storeId: getStorage('rolesInfos').storeId,
          groupId: -1,
          uploadType: 2,
          accessId: this.$store.getters.token
        },
        data: formData
      })
        .then(result => {
          let url = result.data.data.imgUrls[0] // 返回给你的图片路径
          Editor.insertEmbed(cursorLocation, 'image', url)
          Editor.setSelection(length + 1)
          resetUploader()
          console.log(cursorLocation)
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 添加属性弹框方法 //

    /* 添加属性 */
    addAttr () {
      var imgattr = $('.attr-table .file-input')
      let page = this
      page.imgArr = []
      for (var j = 0; j < imgattr.length; j++) {
        page.strArr[j].img = $(imgattr).eq(j).val()
      }

      page.imgArr = JSON.parse(JSON.stringify(page.strArr))

      page.imgArr.filter(items => {
        items.attrStr = ''

        items.attr_list.filter(item => {
          items.attrStr += ',' + item.attr_name
        })

        items.attrStr = items.attrStr.replace(',', '')
      })

      if (attrFlag) {
        var price1 = this.ruleForm.cbj //成本价
        var price2 = this.ruleForm.yj //原价
        var price3 = this.ruleForm.sj //售价
        var size = this.ruleForm.unit //单位
        var kucun = this.ruleForm.kucun //库存
        let that = this
        // if (!(price1 && price2 && price3 && size != 0 && kucun)) {
        //   this.$message({
        //     message: that.$t('releasephysical.text9'),
        //     type: 'error',
        //     offset: 102
        //   })
        //   attrFlag = true
        //   return
        // }
        if ($('body', parent.document).find('#maskClass').length > 0) {
          $('body', parent.document).find('#maskClass').css('display', '')
          $('body', parent.document).find(
            '#maskClass iframe'
          )[0].contentWindow.app.filterText = ''
          $('body', parent.document).find(
            '#maskClass iframe'
          )[0].contentWindow.app.loadFlag = false
          if (this.emptyAttr) {
            $('body', parent.document).find(
              '#maskClass iframe'
            )[0].contentWindow.app.checkAll = []
          }
        } else {
          var str = `
						<div class="maskNew" id="maskClass" style="z-index: 9999;">
							<div style="width:724px;height:540px;background:rgba(255,255,255,1);border-radius:4px;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">
								<div style="display: flex;justify-content: space-between;align-items: center;height: 60px;box-sizing: border-box;padding-left: 20px;color: #414658;font-size: 16px;border-bottom: 1px solid #E9ECEF;">
									${this.$t('releasephysical.szsx')}
									<a class="maskClose" href="javascript:void(0);" style="padding: 20px;"><img src="/bounced/img/gb.png"/ style="width: 14px; height: 14px;"></a>
								</div>
			
								<iframe ref="iframe" scrolling="yes" frameborder="0" src="./bounced/Choose.html" style="width: 100%;height: 410px"></iframe>
			
								<div style="height: 70px;box-sizing: border-box;border-top: 1px solid #E9ECEF;display: flex;align-items: center;justify-content: flex-end;">
									<a class="maskClose bgColor" id="attrMaskQx" href="javascript:;" style="width:70px; height:40px; border:1px solid #D5DBE8; border-radius:4px;display: flex;align-items: center;justify-content: center;color: #6A7076;margin-right: 10px;box-sizing: border-box;background-color: #FFFFFF;">${this.$t(
                    'zdata.off'
                  )}</a>
									<a id="maskSave" class="attrMaskQr" href="javascript:;" style="width:70px;height:40px;background:#2890FF;border-radius:4px;display: flex;align-items: center;justify-content: center;color: #FEFEFE;margin-right: 20px;">
                      确定 
                  </a>
								</div>
							</div>
						</div>
					`
          $('body', parent.document).append(str)
        }

        $('#maskSave')
          .unbind()
          .bind('click', function () {
            let checkAll = $('#maskClass iframe')[0].contentWindow.app.checkAll
            if (checkAll.length == 0) {
              that.$message({
                message: that.$t('releasephysical.text10'),
                offset: 102,
                type: 'error',
                customClass: 'zZindex'
              })
              return
            }
            $('#strArr').html(JSON.stringify(checkAll))
            // classDivAppend()
            let attrTitle = []
            // page.attrTitle

            checkAll.filter(items => {
              if (attrTitle.length == 0) {
                let obj = {
                  attr_group_name: items.name,
                  attr_list: [
                    {
                      attr_name: items.sname
                      // chooseMe: true,
                    }
                  ]
                  // isShow: false
                }
                attrTitle.push(obj)
              } else {
                let index = attrTitle.findIndex(item => {
                  return item.attr_group_name == items.name
                })

                if (index < 0) {
                  let obj = {
                    attr_group_name: items.name,
                    attr_list: [
                      {
                        attr_name: items.sname
                        // chooseMe: true,
                      }
                    ]
                    // isShow: false
                  }
                  attrTitle.push(obj)
                } else {
                  attrTitle[index].attr_list.push({
                    attr_name: items.sname
                    // chooseMe: true,
                  })
                }
              }
            })

            page.attrTitle = attrTitle
            var strArr = []

            var listX = 0
            for (var i = 0; i < attrTitle.length; i++) {
              var attr_list = attrTitle[i].attr_list
              if (listX == 0) {
                listX = attr_list.length
              } else {
                listX = attr_list.length > 0 ? attr_list.length * listX : listX
              }
            }

            for (var i = 0; i < listX; i++) {
              //如果strarr原本有数据
              if (page.strArr[i]) {
                strArr.push({
                  cbj: price1,
                  yj: price2,
                  sj: price3,
                  unit: size,
                  kucun: kucun,
                  img: page.strArr[i].image, //图片
                  bar_code: '', // 条形码
                  attr_list: [],
                  cid: page.strArr[i].cid
                })
              } else {
                //没有数据的时候新增商品属性值
                strArr.push({
                  cbj: price1,
                  yj: price2,
                  sj: price3,
                  unit: size,
                  kucun: kucun,
                  img: '', //图片
                  bar_code: '', // 条形码
                  attr_list: [],
                  cid: ''
                })
              }
            }

            var th_title = JSON.parse(JSON.stringify(attrTitle))

            digui(th_title, 0, listX)

            strArr.filter(items => {
              var attrStr = ''
              var attrStr1 = ''

              items.attr_list.filter(item => {
                attrStr += ',' + item.attr_name
              })

              let attr_list = items.attr_list

              attr_list.filter(item => {
                attrStr1 += ',' + item.attr_name
              })

              attrStr = attrStr.replace(',', '')
              attrStr1 = attrStr1.replace(',', '')

              page.imgArr.filter(its => {
                // debugger
                if (its.attrStr == attrStr) {
                  items.image = its.image
                }
              })
            })

            let newAttrTitle = []
            strArr[0].attr_list.filter(items => {
              attrTitle.filter(item => {
                if (items.attr_group_name == item.attr_group_name) {
                  newAttrTitle.push(item)
                }
              })
            })
            page.attrTitle = newAttrTitle
            page.strArr = []
            setTimeout(function () {
              page.strArr = strArr
              console.log(page.attrTitle)
              console.log(page.strArr)
            }, 5)

            function digui (th_title, i, _listX) {
              // 如果该循环的子项没有东西则停止递归
              if (!th_title[i]) {
                if (i < th_title.length - 1) {
                  th_title.splice(i, 1)
                  digui(th_title, i, _listX)
                  return
                }
                return
              }
              // 如果该项属性的没有属性值，则删除该项重新递归
              if (th_title[i].attr_list.length == 0) {
                th_title.splice(i, 1)
                digui(th_title, i, _listX)
                return
              }
              var xx = 0
              if (i == 0) {
                // 第一个规格属性的格式是白色白色白色,黑色黑色黑色
                for (var j = 0; j < th_title[i].attr_list.length; j++) {
                  var value = th_title[i].attr_list[j].attr_name
                  for (
                    var x = 0;
                    x < listX / th_title[i].attr_list.length;
                    x++
                  ) {
                    var name = th_title[i].attr_group_name
                    strArr[xx].attr_list.push({
                      attr_id: '',
                      attr_name: value,
                      attr_group_name: name
                    })
                    xx++
                  }
                }
              } else if (i < th_title.length - 1) {
                _listX = Math.round(_listX / th_title[i - 1].attr_list.length)
                // 外面这层循环代表当前属性在内循环完成之后进入新的循环,比如白色白色黑色黑色红色红色,完成之后再次白色白色黑色黑色红色红色循环,总行数除以前一个属性每个属性有多少行,得出总循环数
                for (var l = 0; l < listX / _listX; l++) {
                  for (var j = 0; j < th_title[i].attr_list.length; j++) {
                    var value = th_title[i].attr_list[j].attr_name
                    // 当前规格的前一个每个属性行数,除当前
                    for (
                      var x = 0;
                      x < _listX / th_title[i].attr_list.length;
                      x++
                    ) {
                      var name = th_title[i].attr_group_name
                      strArr[xx].attr_list.push({
                        attr_id: '',
                        attr_name: value,
                        attr_group_name: name
                      })
                      xx++
                    }
                  }
                }
              } else {
                // 后面的规格属性格式是x,l,xl x,l,xl循环
                for (var x = 0; x < listX / th_title[i].attr_list.length; x++) {
                  for (var j = 0; j < th_title[i].attr_list.length; j++) {
                    var value = th_title[i].attr_list[j].attr_name
                    var name = th_title[i].attr_group_name
                    strArr[xx].attr_list.push({
                      attr_id: '',
                      attr_name: value,
                      attr_group_name: name
                    })
                    xx++
                  }
                }
              }
              i++
              if (i < th_title.length) {
                digui(th_title, i, _listX)
              }
            }
            $('#maskClass').css('display', 'none')
          })

        $('body', parent.document)
          .find('.maskClose')
          .unbind()
          .bind('click', function () {
            $('body', parent.document).find('#maskClass').remove()
          })
        this.emptyAttr = false
      }
    },
    // sububmit
    submitForm (formName) {
      let kindTableData = this.kindTableData;
      let subKindTableData = [];

      let colorName = this.kindData[0].kindName;
      let sizeName = this.kindData[1].kindName;
      let kindDataStr = JSON.stringify(this.kindData);
      // console.log("colorName----------")
      // console.log(colorName)
      // console.log("colorName-------")

      // console.log("sizeName----------")
      // console.log(sizeName)
      // console.log("sizeName-------------")

   
      kindTableData.forEach((item, index)=>{
          let newItem = {}
          newItem.color = item.color;
          newItem.size = item.size;
          // 编码
          newItem.product_code = item.code;
          // 型号
          newItem.marque = item.type;
          // 供货价
          newItem.yj = item.yj;
          // 采购价	
          newItem.cbj = item.purchasePrice;
          // 售价
          newItem.sj =  item.sj;
          // 包件数
          newItem.bom_nums = item.bom_nums;

          // 体积
          newItem.capacity = item.vol;
          // 库存	
          newItem.kucun = item.stock;
          newItem.send_days = item.dayCount;

          newItem.bag_type = item.assemble;

          newItem.attr_list = [
              {attr_group_name: colorName, attr_id:"", attr_name: item.color},
              {attr_group_name: sizeName, attr_id:"", attr_name: item.size}
          ]
          // newItem.sj = "1";
          newItem.unit = "1";
          // newItem.yj = "1";
          newItem.cid = item.cid;
          newItem.bar_code = "1";
          newItem.img = item.imgFileList[0];
          if (item.imgFileList.length > 0) {
            newItem.img_arr = item.imgFileList.join(",");
          } else {
            newItem.img_arr = "";
          }
          newItem.status = item.status;
          newItem.statusFlag = item.statusFlag;
          subKindTableData.push(newItem)
      })
     
      
      let subKindTableDataStr = JSON.stringify(subKindTableData);

      //   console.log("subKindTableData")
      // console.log(subKindTableData)
      // console.log("subKindTableData")

      // console.log("subKindTableDataStr subKindTableDataStr")
      // console.log(subKindTableDataStr)
      // console.log("subKindTableDataStr subKindTableDataStr")

    
      // 实拍图
      let realPhotos = "";
      let _this = this;

      if ( this.ruleForm.takePictures.length>0) {
          realPhotos = _this.ruleForm.takePictures.join(',');
      }

      //  商品介绍为空
      /* for (let i = 0; i < this.IntroList.length; i++) {
          if (this.IntroList[i].content === '') {
            this.$message({
              message:
                this.$t('releasephysical.bta') +
                this.IntroList[i].name +
                this.$t('releasephysical.btb'),
              type: 'error',
              offset: 102
            })
            return
          }
        } */

        this.ruleForm.content = JSON.stringify(this.IntroList)
    
        // console.log('1944,1944', this.ruleForm.content)
            // console.log(this.strArr)
            $.ajax({
              cache: true,
              type: 'POST',
              dataType: 'json',
              url: this.goodsEditorBase,
              data: {
                api: 'mch.Mch.Goods.AddGoods',
                storeId: getStorage('rolesInfos').storeId,
                accessId: getStorage('token'),
                storeType: 7,
                // pId: this.ruleForm.pId ,
                pId: this.goodsId,
                // mch_id: this.$route.query.name && this.$route.query.name == 'copy' ? getStorage('laike_store_uaerInfo').mchId : null,
                // 商品名称
                productTitle: this.ruleForm.goodsTitle,
                // 商品卖点
                subtitle: this.ruleForm.subtitle,
                 // 关键词
                //keyword: this.ruleForm.keywords,
                 // 商品分类
                // goodsClass: this.ruleForm.kindValue,
               // goodsClass: this.ruleForm.goodsClass,
                // productClassId: this.ruleForm.goodsClass,
                   productClassId: this.ruleForm.goodKindCidStr,
                // 商品品牌
                brandId: this.ruleForm.goodsBrand,
                weight: this.ruleForm.weight,
                // 风格
                styleId: this.ruleForm.styleId,
                styleName: this.ruleForm.styleName,
                // 商品封面图
                coverMap: this.ruleForm.goodsCover,
                // 商品展示图
                //showImg: this.ruleForm.goodsShow.join(','),
                // 实拍图
                realPhotos: realPhotos,
                // attrArr: JSON.stringify(subKindTableData),
                attrArr: subKindTableDataStr,
                // 规格
                skuAttribute: kindDataStr,
                // 商品设置
                stockWarn: this.ruleForm.inventoryWarning,
                freightId: this.ruleForm.freight,
                sType: this.ruleForm.checkedLabel.join(),
                active: parseInt(this.ruleForm.checkedActivity),
                displayPosition: this.ruleForm.checked
                  ? this.ruleForm.checked
                  : '3',
                volume: this.ruleForm.virtualSales,
                mchSort: this.ruleForm.mch_sort,
                // receivingForm: this.ruleForm.distributionMode.join(','),
                // 产品内容
                content: this.ruleForm.content,
                unit: this.ruleForm.unit,
                video: this.videoUp,
                proVideo: this.videoUp2,
                // 一般属性
                parameters: JSON.stringify(this.GeneralProperties)
                //         // 采购价    
                // cbj: '', //成本价
                // yj: '', // 供货价
                // sj: '', //售价
                // unit: '', //单位
                // kucun: '1000', //库存
                // attr: '',
                // attrImg: '',
                // capacity:'',
                // productCode:'',
                // marque:'',
                // 商品属性
               // initial: `cbj=${this.ruleForm.cbj},yj=${this.ruleForm.yj},sj=${this.ruleForm.sj},kucun=${this.ruleForm.kucun},unit=${this.ruleForm.unit},stockWarn=${this.ruleForm.inventoryWarning},msrp=${this.ruleForm.sj},attrImg=${this.ruleForm.attrImg}`,
                // attrGroup: JSON.stringify(attrList),
               // attrArr: JSON.stringify(strList),
                // attrArr: JSON.stringify(kindTableArr)
              },
              async: true,
              success: res => {
                this.$message({
                  message: res.data.message,
                  type: 'success',
                  offset: 102
                })
                this.$store.commit('loading/SET_LOADING')
                if (res.code == '200') {
                  if (this.$route.query.id) {
                    // this.$message({
                    //   message: this.$t('zdata.bjcg'),
                    //   type: 'success',
                    //   offset: 102
                    // })
                  } else {
                    // this.$message({
                    //   message: this.$t('zdata.fbcg'),
                    //   type: 'success',
                    //   offset: 102
                    // })
                  }
                  this.$router.go(-1)
                  this.$store.commit('loading/SET_LOADING')
                } else {
                  this.$store.commit('loading/SET_LOADING')
                  // this.$message({
                  //   message: res.message,
                  //   type: 'error',
                  //   offset: 102
                  // })
                }
              }
            })

      return ;
      this.$refs[formName].validate(async valid => {
        // console.log(this.ruleForm)
        // console.log(this.strArr)

        // 商品介绍为空
        // for (let i = 0; i < this.IntroList.length; i++) {
        //   if (this.IntroList[i].content === '') {
        //     this.$message({
        //       message:
        //         this.$t('releasephysical.bta') +
        //         this.IntroList[i].name +
        //         this.$t('releasephysical.btb'),
        //       type: 'error',
        //       offset: 102
        //     })
        //     return
        //   }
        // }
        this.ruleForm.content = JSON.stringify(this.IntroList)
    
        console.log('1944,1944', this.ruleForm.content)
        if (valid) {
          try {
            // console.log(this.strArr)
            $.ajax({
              cache: true,
              type: 'POST',
              dataType: 'json',
              url: this.goodsEditorBase,
              data: {
                api: 'mch.Mch.Goods.AddGoods',
                storeId: getStorage('rolesInfos').storeId,
                accessId: getStorage('token'),
                storeType: 7,
                pId:
                  this.$route.query.name && this.$route.query.name !== 'copy'
                    ? this.$route.query.id
                    : null,
                // mch_id: this.$route.query.name && this.$route.query.name == 'copy' ? getStorage('laike_store_uaerInfo').mchId : null,
                // 商品名称
                productTitle: this.ruleForm.goodsTitle,
                // 商品卖点
                subtitle: this.ruleForm.subtitle,
                 // 关键词
                // keyword: this.ruleForm.keywords,
                 // 商品分类
                goodsClass: this.ruleForm.kindValue,
                // productClassId: this.ruleForm.goodsClass[this.ruleForm.goodsClass.length - 1],
                // 商品品牌
                brandId: this.ruleForm.goodsBrand,
                weight: this.ruleForm.weight,
                // 风格
                styleId: this.ruleForm.styleId,
                styleName: this.ruleForm.styleName,
                // 商品封面图
                coverMap: this.ruleForm.goodsCover,
                // 商品展示图
                // showImg: this.ruleForm.goodsShow.join(','),
                // 实拍图
                realPhotos: this.ruleForm.takePictures.join(','),

                //         // 采购价    
                // cbj: '', //成本价
                // yj: '', // 供货价
                // sj: '', //售价
                // unit: '', //单位
                // kucun: '1000', //库存
                // attr: '',
                // attrImg: '',
                // capacity:'',
                // productCode:'',
                // marque:'',

                // 商品属性
                initial: `cbj=${this.ruleForm.cbj},yj=${this.ruleForm.yj},sj=${this.ruleForm.sj},kucun=${this.ruleForm.kucun},unit=${this.ruleForm.unit},stockWarn=${this.ruleForm.inventoryWarning},msrp=${this.ruleForm.sj},attrImg=${this.ruleForm.attrImg}`,
                // attrGroup: JSON.stringify(attrList),
               // attrArr: JSON.stringify(strList),
                // attrArr: JSON.stringify(kindTableArr),
                attrArr: JSON.stringify(subKindTableData),
                // 商品设置
                stockWarn: this.ruleForm.inventoryWarning,
                freightId: this.ruleForm.freight,
                sType: this.ruleForm.checkedLabel.join(),
                active: parseInt(this.ruleForm.checkedActivity),
                displayPosition: this.ruleForm.checked
                  ? this.ruleForm.checked
                  : '3',
                volume: this.ruleForm.virtualSales,
                mchSort: this.ruleForm.mch_sort,
                // receivingForm: this.ruleForm.distributionMode.join(','),
                // 产品内容
                content: this.ruleForm.content,
                unit: this.ruleForm.unit,
                video: this.videoUp,
                proVideo: this.videoUp2
              },
              async: true,
              success: res => {
                this.$store.commit('loading/SET_LOADING')
                
                if (res.code == '200') {
                  if (this.$route.query.id) {
                    this.$message({
                      message: this.$t('zdata.bjcg'),
                      type: 'success',
                      offset: 102
                    })
                  } else {
                    this.$message({
                      message: this.$t('zdata.fbcg'),
                      type: 'success',
                      offset: 102
                    })
                  }
                  this.$router.go(-1)
                  this.$store.commit('loading/SET_LOADING')
                } else {
                  this.$store.commit('loading/SET_LOADING')
                  this.$message({
                    message: res.message,
                    type: 'error',
                    offset: 102
                  })
                }
              }
            })
          } catch (error) {
            this.$message({
              message: error.message,
              type: 'error',
              offset: 102
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>






<style>
     
     #good_table.el-table td, .el-table th{
        padding:0;
     }
     #good_table.el-table .el-table__cell{
        padding:0;
    
     }
     #good_table.el-table .cell{
        line-height:none !important;
     }
     .el-input__inner{
        height:2rem !important;
        line-height:2rem !important;
     }
</style>


<style scoped lang="less">
.container {
  width: 100%;
  .dialog-brand2 {

    /deep/.el-tag.el-tag--info .el-tag__close {
      color: #ffffff;
    }
    /deep/.el-input {
      width: 376px;
      height: auto;
      input {
        width: 376px;
        height: auto;
      }
    }
    // 弹框样式
    /deep/.el-dialog {
      width: 580px;
      height: 290px;
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
        }
      }

      .el-dialog__body {
        padding: 60px 60px 60px 45px !important;

        .el-form {
          width: 100%;
          padding-bottom:0 !important;

          .task-container {
            // padding: 41px 0px 0px 0px !important;
            .el-form-item {
              margin-bottom: 0 !important;
            }

            width: 100%;

            .balance,
            .integral,
            .level {
              display: flex;
              justify-content: center;

              .el-form-item__content {
                margin-left: 0px !important;
                display: flex;
                flex-direction: column;
                .el-input {
                  width: 360px;
                  height: auto;
                }

                .explain {
                  display: flex;
                  align-items: center;

                  img {
                    width: 12px;
                    height: 12px;
                    margin-right: 5px;
                  }

                  .red {
                    color: #6a7076;
                    font-size: 12px;
                  }
                }
              }
            }
          }
        }

        .el-form-item__label {
          font-weight: normal;
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

          .bgColor:hover {
            background-color: #fff;
            color: #2890ff;
            border: 1px solid #2890ff;
          }

          .qx_bt:hover {
            background-color: #fff;
            color: #2890ff;
            border: 1px solid #2890ff;
          }
        }
      }
    }
  }
  .upload-box {
    .avatar-uploader-box {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-bottom: 20px;
      min-width: 350px;
      .avatar-uploader {
        margin-right: 15px;
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          &:hover {
            border-color: #409eff;
          }
        }
        .avatar-uploader-icon {
          font-size: 1.25rem;
          color: #8c939d;
          width: 80px;
          height: 80px;
          text-align: center;
          border: 0.0625rem dashed #c0ccda;
          border-radius: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .avatar-uploader-icon:hover {
          border: 0.0625rem dashed #409eef;
          cursor: pointer;
        }
      }
      .video-preview {
        position: relative;
        padding-right: 20px;
        .avatar {
          width: 80px;
          height: 80px;
          display: block;
          border-radius: 6px;
        }
        .avatar-uploader-popup {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          width: 80px;
          height: 80px;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: space-around;
          align-items: center;
          color: #fff;
          font-size: 1.25rem;
          border-radius: 6px;
          transition: 3s;
          i {
            font-size: 1.25rem;
          }
        }
      }
      .upload-tip {
        display: flex;
        align-items: center;
        font-size: 0.875rem;
        font-weight: 400;
        color: #97a0b4;
      }
    }
  }
  /deep/.el-form {
    padding-bottom: 38px;
    .header {
      width: 100%;
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #e9ecef;
      padding-left: 20px;
      span {
        font-weight: 400;
        font-size: 16px;
        color: #414658;
      }
    }
    .el-input {
      width: 400px;
      height: 40px;
      // input {
      //   width: 400px;
      //   height: 40px;
      // }
    }
    .composite {
      input {
        width: 345px !important;
      }
    }

    .basic-info {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 4px;
      .basic-block {
        margin-top: 40px;
        padding: 0 20px 20px 20px;
        .goods-img {
          width: 100%;
          .img-item {
            margin-right: 15px !important;
          }
        }

        .basic-items {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          .el-form-item {
            width: 33.3%;
          }
        }
      }
    }

    .goods-attribute {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 4px;
      .attribute-block {
        margin-top: 40px;
        padding: 0 20px 20px 20px;
        .el-input__inner {
          // padding-right: 0 !important;
        }
        .attribute-items {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          .el-form-item {
            width: 33.3%;
          }
        }
        .add-attribute {
          width: 100%;
          button {
            width: 96px;
            height: 38px;
            border: 1px solid #2890ff;
            border-radius: 4px;
            background-color: #fff;
            color: #2890ff;
            // margin-left: 10Px;
            margin: 0;
            padding: 0;
          }
        }
      }
    }

    .goods-set {
      width: 100%;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 4px;
      .set-block {
        margin-top: 40px;
        padding: 0 20px 20px 20px;
        .freight-set {
          button {
            width: 96px;
            height: 38px;
            border: 1px solid #2890ff;
            border-radius: 4px;
            background-color: #fff;
            color: #2890ff;
            margin-left: 8px !important;
            margin: 0;
            padding: 0;
          }
        }

        .activity-class {
          .el-checkbox__inner {
            border-radius: 50px;
          }
        }

        .inventory-warning {
          color: #414658;
          .el-input {
            width: 140px;
            margin: 0 10px;
          }
          span {
            color: #97a0b4;
            margin-left: 10px;
          }
        }

        .show-local {
          .el-form-item__content {
            display: flex;
          }
          .show-font {
            color: #97a0b4;
            margin-left: 20px;
          }
        }
        .show-local2 {
          .el-form-item__content {
            display: flex;
            align-items: center
          }
          .show-font {
            color: #97a0b4;
            margin-left: 20px;
          }
        }
      }
    }

    .detail-container {
      width: 100%;
      background-color: #fff;
      // margin-bottom: 16px;
      margin-bottom: 53px;
      border-radius: 4px;
      .delet-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .detail-block {
        margin-top: 40px;
        padding: 0 20px 20px 20px;

        .add_box {
          width: 100%;
          height: 460px;
          padding: 10px 20px 20px 20px;
          background: #f4f7f9;
          border-radius: 4px;
          margin-bottom: 16px;
        }
        .add {
          width: 96px;
          height: 38px;
          border: 1px solid #2890ff;
          border-radius: 4px;
          background-color: #fff;
          color: #2890ff;
          margin-left: 10px;
          margin: 0;
          padding: 0;
          margin-bottom: 16px;
        }
        .el-form-item {
          .el-form-item__content {
            // height: 383px;
          }
          .quillWrapper {
            width: 100%;
            height: 385px;
            background: #ffffff;
            .quillWrapper {
              .ql-container {
                height: 343px !important;
              }
            }
            .ql-container {
              height: 343px !important;
            }
          }
        }
      }
    }

    .footer-button {
      position: fixed;
      right: 0;
      bottom: 40px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 15px 20px;
      border-top: 1px solid #e9ecef;
      background: #ffffff;
      width: 300%;
      z-index: 10;
      button {
        width: 70px;
        height: 40px;
        padding: 0;
      }
      .bgColor {
        margin-left: 14px;
      }
      .bgColor:hover {
        opacity: 0.8;
      }

      .fontColor {
        color: #6a7076;
        border: 1px solid #d5dbe8;
        margin-left: 14px;
      }
      .fontColor:hover {
        color: #2890ff;
        border: 1px solid #2890ff;
      }
    }
    .el-form-item__label {
      font-weight: normal;
    }
  }

  /deep/.el-form-item__label {
    color: #414658;
  }
  // /deep/.el-input__inner {
  // 	border: 1px solid #d5dbe8;
  // }
  /deep/.el-input__inner:hover {
    border: 1px solid #b2bcd4;
  }
  /deep/.el-input__inner:focus {
    border-color: #409eff;
  }
  /deep/.el-input__inner::-webkit-input-placeholder {
    color: #97a0b4;
  }

  .model {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 2000;
  }
}

.el-col {
  padding: 0 !important;
}
 
</style>

<style lang="less">
.zZindex {
  z-index: 99999999 !important;
}
.maskNew {
  position: fixed;
  z-index: 10000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  display: block;
}


// .container #table_upload_dialog {
//     height: 600px !important;
// }
.container #table_upload_dialog .el-dialog {

    height:auto !important;
}
.big_kind{
  margin-bottom:20px;
}

.kind_list_con{
    overflow:hidden;
    margin-top:21px;
    
}
.kind_list_con .kind_list{
    margin-right: 20px;
    float: left;
}
.kind_list_con .kind_list > li{
  float:left;
  margin-right:29px;
}
 
.container .dialog-brand2[data-v-56d0c8ba] .el-dialog{
  height: auto !important;
}
.assemble_group{
  margin-bottom:20px;
}
.kind_li{
    margin-left:20px;
}
.kind_li_child{
    margin-left:40px;
}

 

.ql-snow .ql-editor img{
    vertical-align: middle;
}









/* 添加属性弹窗 */
.maskNew .mask-content {
  position: relative;
  background-color: #fff;
  display: flex !important;
  flex-direction: column;
  padding-top: 0;
  width: 680px;
  height: 510px !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 !important;
}
.maskNew .mask-title {
  line-height: 58px;
  border-bottom: 2px solid #e9ecef;
  font-size: 16px;
  color: #414658;
  padding-left: 19px;
  margin-bottom: 0;
}
.maskNew .mask-content-data {
  padding: 40px 40px 0;
  overflow: hidden;
  flex: 1;
}
.maskNew .mask-content-data > div {
  display: flex;
}
.maskNew .shooser_attrDiv {
  width: 520px;
  height: 272px;
  background: #f4f7f9;
  margin-top: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.maskNew .shooser_attrDiv select {
  width: 240px;
  height: 36px;
  font-size: 14px;
  color: #414658 !important;
}
.maskNew .shooser_attrDiv > div,
#choose_attrDiv .custom_attr {
  display: flex;
  align-items: center;
}
.maskNew .shooser_attrDiv ul,
.shooser_attrDiv label {
  margin-bottom: 0;
}
.maskNew .shooser_attrDiv ul {
  width: 100%;
  max-height: 171px;
  position: absolute;
  background: #ffffff;
  border: 1px solid #d3dae3;
  border-top: 0;
  overflow-y: auto;
  background: #ffffff;
  z-index: 99;
}
.maskNew .shooser_attrDiv li {
  height: 34px;
}
.maskNew .shooser_attrDiv li:hover {
  background: #f4f7f9;
}
.maskNew .shooser_attrDiv li > label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
}
.maskNew .attr_title {
  width: 90px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #2890ff;
  border-radius: 2px;
  color: #2890ff;
  position: relative;
  margin: 20px 0;
  background: #ffffff;
}
.maskNew .attr_title img {
  position: absolute;
  right: 0;
  top: 0;
  width: 12px;
  height: 12px;
}
.maskNew .attr_content {
  display: flex;
  flex-wrap: wrap;
}
.maskNew .attr_content label {
  margin-right: 20px;
  margin-bottom: 10px;
}
.maskNew .custom_attrDiv .left_text {
  display: inline-block;
  width: 70px;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.maskNew .custom_attrDiv input[type='text'] {
  padding-left: 10px;
}
.maskNew .custom_attrDiv a.addBtn,
.custom_attrDiv a.removeBtn {
  display: inline-block;
  width: 88px;
  height: 36px;
  box-sizing: border-box;
  line-height: 34px;
  text-align: center;
  margin-left: 10px;
}
.maskNew .custom_attrDiv a.addBtn {
  color: #2890ff;
  border: 1px solid #2890ff;
}
.maskNew .custom_attrDiv a.removeBtn {
  color: #828b97;
  border: 1px solid #828b97;
}
.maskNew .custom_attrVlue {
  flex-wrap: wrap;
}
.maskNew .custom_attr {
  display: flex;
}
.maskNew .custom_attrVlue a {
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 10px;
  background: #ffffff;
  color: #414658;
  border: 1px dashed #b2bcd1;
  margin-bottom: 10px;
  margin-right: 10px;
}
.maskNew .custom_attrVlue a img {
  width: 12px;
  height: 12px;
  margin-left: 10px;
}

.maskNew .mask-bottom {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e9ecef;
  margin-top: auto;
}
.maskNew .mask-bottom input[type='button'] {
  width: 112px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin: 16px 0;
  border: 0;
  outline: 0;
  cursor: pointer;
}
.maskNew .mask-bottom input[type='button']:first-child {
  border: 1px solid #2890ff;
  color: #2890ff;
  margin-right: 10px;
  background: #ffffff;
}
.maskNew .mask-bottom input[type='button']:last-child {
  background: #2890ff;
  color: #ffffff;
  margin-right: 20px;
}

.maskNew .maskContent1 input[type='submit'] {
  width: 100px;
  height: 40px;
  border: 1px solid #eee;
  border-radius: 5px;
  background: #008def;
  color: #fff;
  font-size: 16px;
  line-height: 40px;
  display: inline-block;
}

.maskNew .closeMaskBtn {
  width: 100px;
  height: 40px;
  border-radius: 5px;
  background: #fff;
  color: #008def;
  border: 1px solid #008def;
  font-size: 16px;
  line-height: 40px;
  display: inline-block;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 10px;
}

.maskNew .closeA {
  position: absolute;
  right: 10px;
  top: 15px;
  width: 30px;
  height: 30px;
  color: #eee;
}

.maskNew .checkbox {
  position: relative;
  display: inline-block;
  color: #414658;
  font-size: 14px;
  line-height: 14px;
  padding-left: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.maskNew .checkbox i {
  position: absolute;
  display: block;
  left: 0;
  top: 0;
  width: 14px;
  height: 14px;
  border: 1px solid #b2bcd1;
  border-radius: 2px;
  box-sizing: border-box;
}

#attrMaskQx:hover {
  color: #2890ff !important;
  border: 1px solid #2890ff !important;
  background-color: #fff !important;
  opacity: 0.8 !important;
}

#attrMaskQr:hover {
  opacity: 0.8 !important;
}

#confirmMask:hover {
  opacity: 0.8 !important;
}

.attrMaskQr:hover {
  opacity: 0.8 !important;
}

#maskClass {
  .bgColor:hover {
    background-color: #fff;
    color: #2890ff;
    border: 1px solid #2890ff;
  }
}
</style>

<style scoped lang="less">
/deep/.attribute-table {
  width: 90% !important;
  // width: calc(100% - 120px);
  .el-table__header {
    thead {
      height: 50px !important;
      tr {
        height: 50px !important;
        th {
          height: 50px !important;
          padding: 0 !important;
          text-align: center;
          font-size: 14px;
          font-weight: bold;
          color: #414658;
        }
      }
    }
  }
  .el-form-item__content {
    width: 100%;
    // padding-left: 20px !important;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: auto;
  }
  .el-table .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }
  .el-table--fit td.gutter,
  .el-table--fit th.gutter {
    border-right-width: 1px;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: auto;
  }
  .el-table--scrollable-y .el-table__body-wrapper {
    overflow-y: auto;
  }
  .el-table thead {
    color: #414658;
    font-weight: 500;
  }
  .el-table thead.is-group th {
    background: #f4f7f9;
  }
  .el-table td,
  .el-table th {
    padding: 12px 0;
    min-width: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: center;
  }

  .el-table {
    z-index: 9 !important;
    .el-input {
      text-align: center;
      width: 140px;
      input {
        width: 140px;
        text-align: center;
      }
    }
  }

  .el-table .l-upload {
    display: flex;
    justify-content: center;
  }

  .el-table th {
    background-color: #f4f7f9;
  }
}
</style>
