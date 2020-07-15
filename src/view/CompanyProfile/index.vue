<template>
  <div id="companyProfile">
    公司简介
    <div class="editor">
      <quill-editor
        ref="myQuillEditor"
        v-model="addForm.content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @change="onEditorChange($event)"
      ></quill-editor>
    </div>
  </div>
</template>

<script>
export default {
  name: "companyProfile",
  data() {
    return {
      addForm: {
        content: ""
      },
      editorOption: {}
    };
  },
  methods: {
    onEditorReady(editor) {}, // 准备编辑器
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {// 内容改变事件
      console.log(123)
    }, 
    escapeStringHTML(str) {
      str = str.replace(/&lt;/g, "<");
      str = str.replace(/&gt;/g, ">");
      return str;
    }
  },
  mounted() {
    let content = ""; // 请求后台返回的内容字符串
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  }
};
</script>

<style lang="scss" scoped>
#companyProfile {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  .editor {
    position: absolute;
    bottom: 20px;
  }
}
</style>
