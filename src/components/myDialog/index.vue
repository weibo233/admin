<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
    props:{
        title:String,
        dialogVisible:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return{

        }
    },
    methods:{
        submit(){
            this.$emit('deter')
        },
        handleClose() {
            this.$emit('cancel')
        }
    }
};
</script>
<style lang="scss" scoped></style>
