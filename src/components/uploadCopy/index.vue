
<template>
    <div>
        <div class="wrap">
            1111
            <div>视频:</div>
            <div><input type="file" id="uploadImage" @change="toUpload" placeholder=""/></div>
        </div>        
    </div>
</template>
<script>
import { upLoad } from "@/utils/UrlApi/upload";
import request from "../../utils/HttpServe";
import OSS from 'ali-oss';
    export default {
        name: "upload",
        data() {
            return {
               loading: false 
            };
        },
        methods: {
            toUpload() {
                let _this =this;
                _this.loading=true
                var client = new OSS({
                    region: '',
                    accessKeyId: '',
                    accessKeySecret: '',
                    bucket: ''
                });
                //获取文件信息
                const files = document.getElementById("uploadImage")
                if (files.files) {
                    const fileLen = document.getElementById("uploadImage").files
                    const file = document.getElementById("uploadImage").files[0]
                    let consat = file.name;
                    let name = fileLen[0].name
                    for (let i = 0; i < fileLen.length; i++) {
                        const file = fileLen[i]
                        client.multipartUpload(name, file).then(function(res){
                            _this.loading=false
                            var str=res.res.requestUrls[0]
                            console.log(str.split("?")[0])
                            _this.$emit('childByValue', str.split("?")[0])
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                }
            },
        },
        
    };
</script>
<style  scoped>
.wrap{
    width: 350px;
    height: 40px;
    display: flex;
    justify-content: space-between;
}
</style>