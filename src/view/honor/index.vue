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
        <el-table-column label="图片">
          <template slot-scope="scope">
            <viewer>
              <img :src="scope.row.cover" style="height: 50px" alt="" />
            </viewer>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="categoryId" label="类别">
          <template slot-scope="scope">
            {{ scope.row.categoryId == "9" ? "荣誉证书" : "荣誉证书" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click="Del(scope.row)" type="text" size="small"
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
      title="新增招标公告信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题:" label-width="100px">
              <el-input v-model="DetailForm.title"></el-input>
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
          <el-col :span="12">
            <el-form-item label="图片:" label-width="100px">
              <single-upload
                v-model="DetailForm.cover"
                :value="DetailForm.cover"
              ></single-upload>
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
      @cancel="cancel"
    ></del-dialog>
    <detail-dialog
      ref="detailDialogPorps"
      title="编辑招标公告信息"
      :dialogVisible="detailDialogVisble"
      @cancel="cancel"
      @updateDetail="updateDetailOut"
    ></detail-dialog>
  </div>
</template>

<script>
import { getDetail, getPage, updateDetail } from "@/utils/UrlApi/article";
import delDialog from "@/components/myDialog";
import detailDialog from "@/components/honorDialog";
import singleUpload from "@/components/upload/singleUpload";
export default {
  name: "honor",
  components: {
    delDialog,
    detailDialog,
    singleUpload
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      delDialogVisble: false, //删除弹框
      detailDialogVisble: false, //编辑弹框
      editorOption: {},
      DetailForm: {
        articleId: "", //文章ID
        author: "", //作者
        categoryId: "9", //分类ID    6-招标公告，7-资料下载，9-荣誉证书，10-工程案例，12-行政法规，13-建设法律，14-国务院文件，15-部门规章，
        content: "", //内容
        cover: "", //封面地址
        introduce: "", //简介
        pictures: "", //图片集地址
        releaseTime: "", //发布时间
        title: "" //标题
      },
      searchForm: {
        categoryId: "9",
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
        this.searchForm.pageCount = res.data.data.recordCount;
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
        this.DetailForm.categoryId = "6";
        console.log(res, "---res");
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
    },
    //编辑
    handleClick(data) {
      this.detailDialogVisble = true;
      this.$refs.detailDialogPorps.getarticleId(data);
    },
    //编辑确认
    updateDetailOut(form) {
      updateDetail(form).then(res => {
        if (res.data.code === "9999") {
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
