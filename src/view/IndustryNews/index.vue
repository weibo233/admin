<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-button
          @click="
            dialogVisible = true;
            add(new Date());
          "
          >新增</el-button
        >
      </el-col>
    </el-row>
    <div class="pb">
      <el-table :data="tableData">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <viewer>
              <img :src="scope.row.cover" style="height: 50px" alt="" />
            </viewer>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <!-- <el-table-column prop="articleId" label="文章ID"></el-table-column> -->
        <!-- <el-table-column prop="introduce" label="简介"></el-table-column> -->
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column prop="categoryId" label="类别">
          <template slot-scope="scope">
            {{ scope.row.categoryId == "19" ? "行业新闻" : "---" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button
              @click="Del(scope.row.articleId)"
              type="text"
              size="small"
              >删除</el-button
            >
            <el-button
              @click="handleClick(scope.row.articleId)"
              type="text"
              size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <p style="text-align:center;">
        <el-pagination
          layout="prev, pager, next"
          :page-size="searchForm.pageSize"
          :total="searchForm.pageCount"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </p>
    </div>
    <!-- 新增招标公告信息弹框 -->
    <el-dialog
      title="行业新闻新增"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="作者:" label-width="100px">
              <el-input v-model="DetailForm.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题:" label-width="100px">
              <el-input v-model="DetailForm.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label-width="100px" label="简介:">
              <el-input
                v-model="DetailForm.introduce"
                  placeholder=
                "建筑面积：1000000平方
                占地面积：6000000平方"
                type="textarea"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间:" label-width="100px">
              <el-date-picker
                v-model="DetailForm.releaseTime"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:SS"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上传封面:" label-width="100px">
              <upload v-model="DetailForm.cover"></upload>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容:" label-width="100px">
              <editor v-model="DetailForm.content"></editor>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <del-dialog
      title="是否要删除该数据"
      :dialogVisible="delDialogVisble"
      @deter="DelDetailitem"
      @cancel="cancel"
    ></del-dialog>
    <detail-dialog
      ref="detailDialogPorps"
      title="编辑关于建设法律文件"
      :dialogVisible="detailDialogVisble"
      @cancel="cancel"
      @updateDetail="updateDetailOut"
    ></detail-dialog>
  </div>
</template>

<script>
import {
  getDetail,
  getPage,
  updateDetail,
  delDetail
} from "@/utils/UrlApi/article";
import editor from "@/components/Editor";
import delDialog from "@/components/myDialog";
import detailDialog from "@/components/otherdialog";
import upload from "@/components/upload/upload";
export default {
  name: "rules",
  components: {
    delDialog,
    detailDialog,
    editor,
    upload
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      delDialogVisble: false, //删除弹框
      detailDialogVisble: false, //编辑弹框
      editorOption: {},
      delData: "", //将要删除的数据
      DetailForm: {
        articleId: "", //文章ID
        author: "佚名", //作者
        categoryId: "19", //分类ID    6-招标公告，7-资料下载，8-资质证书，9-荣誉证书，10-工程案例，12-行政法规，13-建设法律，14-国务院文件，15-部门规章，17-企业新闻，19-行业新闻，21-人才招聘
        content: "", //内容
        cover: "", //封面地址
        introduce: "", //简介
        pictures: "", //图片集地址
        releaseTime: new Date(), //发布时间
        title: "" //标题
      },
      searchForm: {
        categoryId: "19",
        pageSize: 5,
        targetPage: 1,
        pageCount: 1
      }
    };
  },
  methods: {
    //获取表格数据
    getPageData() {
      getPage(this.searchForm).then(res => {
        this.tableData = res.data.data.resultList;
        this.searchForm.pageCount = res.data.data.recordCount * 1;
        this.searchForm.pageSize = res.data.data.pageSize * 1;
      });
    },
    //增删改查
    updata() {
      updateDetail(this.DetailForm).then(res => {
        if (res.data.code === "0000") {
          this.successMsg("添加成功");
        } else {
          this.errorMsg(res.data.msg);
        }
        this.dialogVisible = false;
        for (let key in this.DetailForm) {
          this.DetailForm[key] = "";
        }
        this.DetailForm.categoryId = "19";
        this.DetailForm.releaseTime = new Date();
        this.DetailForm.author = "佚名";
        this.searchForm.content = "";
        this.getPageData();
      });
    },
    getDetailData() {
      getDetail(this.DetailForm).then(res => {
        this.tableData = res.data.data;
      });
    },
    //关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submit() {
      //提交
      this.updata();
      //重新查询数据
      this.getPageData();
    },
    //新增按钮
    add(timer) {
      let articleId = timer.getTime();
    },
    //改变页码
    handleCurrentChange(val) {
      this.searchForm.targetPage = val;
      this.getPageData();
    },
    //删除
    Del(data) {
      this.delDialogVisble = true;
      this.delData = data;
    },
    //删除
    DelDetailitem() {
      let delArr = [];
      delArr.push(this.delData);
      delDetail({
        ids: delArr
      }).then(res => {
        if (res.data.code == "0000") {
          this.successMsg("删除成功");
          this.delDialogVisble = false;
          this.getPageData();
        }
      });
    },
    //编辑
    handleClick(data) {
      this.detailDialogVisble = true;
      this.$refs.detailDialogPorps.getarticleId(data);
    },
    //编辑确认
    updateDetailOut(form) {
      updateDetail(form).then(res => {
        if (res.data.code === "0000") {
          this.successMsg("修改成功");
          this.detailDialogVisble = false;
          this.getPageData();
        }
      });
    },
    //取消
    cancel() {
      this.delDialogVisble = false;
      this.detailDialogVisble = false;
    }
  },
  created() {
    this.getPageData();
  }
};
</script>

<style lang="scss" scoped></style>
