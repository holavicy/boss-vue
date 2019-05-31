<template>
    <div class="import-new-sku">
        <div class="top-action">
            <input type="file" ref="selectFile" @change="fileChanged()" hidden>
            <vipmro-button class="select-file" title="选择文件" @click="selectFile()"></vipmro-button>
            <input type="text" class="file-name" v-model="fileName" name="fileName" disabled>
            <vipmro-button class="import-file" title="上传" :disabled="uploadPercent>0 && uploadPercent!=100" @click="importFile()"></vipmro-button>
            
            <progress-bar class="progress-bar" :uploadPercent="uploadPercent" 
                            v-show="uploadPercent && uploadPercent != 100 "
                            @cancelRequest="cancelRequest"></progress-bar>
        </div>

        <page-list :totalCount="totalCount" 
                    :pagingPage="pagingPage"
                    @getList="getList">
            <template v-slot:tableBlock>
                <table class="table table-border table-nowrap table-hover table-striped">
                    <thead>
                        <tr>
                        <th>序号</th>
                        <th>上传文件名称</th>
                        <th>文件最后导入时间</th>
                        <th>状态</th>
                        <th>错误信息</th>
                        <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(i) in list" :key="i.id">
                            <td style="text-align:center">{{i.id}}</td>
                            <td>{{i.name}}</td>
                            <td style="text-align:center">{{i.importTime | date}}</td>
                            <td style="text-align:center">{{i.status | status}}</td>
                            <td>{{i.errInfo}}</td>
                            <td>
                                <a v-show="i.status==0" @click="importThisFile(i)">导入</a>
                                <a v-show="i.status==0" @click="deleteThisFile(i)">删除</a>
                            </td>
                        </tr>
                    </tbody>
                
                    
                </table>
            </template>
        </page-list>
    </div>
</template>

<script>
import ProgressBar from '@/components/ProgressBar.vue'
import PageList from '@/components/PageList.vue'

export default {
    name:'import-new-sku',
    components:{ProgressBar, PageList},
    data(){
        return {
            fileName:'',
            uploadPercent:0,
            totalCount:0,
            pagingPage:1,
            source:this.axios.CancelToken.source(),
            list:[]
        }
    },
    methods: {
        selectFile() {
            this.$refs.selectFile.click();
        },
        fileChanged() {
            this.fileName = this.$refs.selectFile.files[0]? this.$refs.selectFile.files[0].name:'';
        },
        importFile() {
         
            const _this = this;
            _this.source = this.axios.CancelToken.source();

            if(!_this.$refs.selectFile.files[0]){
                alert('请选择文件');
                return
            }
            let fileData = new FormData();

            fileData.append('uploadfile', _this.$refs.selectFile.files[0]);
            
            let url = '/emro_boss/goods/fileUpload';
            this.uploadFile(url,fileData,_this.source.token, (res) =>{
                let loaded = res.loaded,
                total = res.total;
                _this.$nextTick(() =>{
                    _this.uploadPercent = Math.floor(loaded/total*100)>1? Math.floor(loaded/total*100):1;
                    })
                    }).then((res)=>{
                        if(res.data.code == 0){
                            alert('上传成功');
                            _this.getList();
                            _this.uploadPercent = 0;
                        }
                    }, (rej)=>{
                        if( rej == -2){
                            alert('取消上传成功')
                        } else {
                            alert('上传失败')
                        }
                    })
        },
        getList(page,size){
            //  this.showLoading();
            this.pagingPage = page;
            let data = {
                page: page?page-1:0,
                rows:size?size:20,
            }
       
            this.axios.get('/emro_boss/goods/showWaitFile/1', {params:data})
            .then((res) => {
                this.totalCount = res.data.count;
                this.list = res.data.list;
                // this.closeLoading();
            }).catch(()=>{
                // this.closeLoading();
            })
        },
        cancelRequest(){
            if(confirm('确认取消此次上传?')){
                this.source.cancel('Operation canceled by the user.');
                this.uploadPercent = 0;
            }
        },
        importThisFile(item){

            let path = item.path;
            let id = item.id;
            let name = item.name;
            let data = {
                path:path,
                id:id,
                name:name
            }
            this.axios.post('emro_boss/goods/insertGoods',this.$qs.stringify(data))
            .then((res)=>{
                alert(res.data.msg);
                this.getList(this.pagingPage);
            })
            .catch(()=>{
                alert('导入失败')
            })
        },

        deleteThisFile(item){
            if(confirm('确认删除此文件?')){
                let path = item.path;
                let id = item.id;
                let name = item.name;
                let data = {
                    path:path,
                    id:id,
                    name:name
                }
                this.axios.post('emro_boss/goods/deleteFile',this.$qs.stringify(data))
                .then((res)=>{
                    if(res.data.code == 0){
                        alert('删除成功');
                        this.getList(this.pagingPage);
                    } else{
                        alert(res.data.msg)
                    }
                })
                .catch(()=>{
                    alert('删除失败');
                })
            }
        }

       
    },

    created: function(){
        this.getList()
    },

    filters: {
        status: function(val){
            let result='';
            switch (val){
                case 0:
                    result = '待处理';
                    break;
                case 1:
                    result = '处理中';
                    break;
                case 2:
                    result = '成功';
                    break;
                case 3:
                    result = '失败';
                    break;
                case 4:
                    result = '删除';
                    break;
                default:
                    result='';
                    break;
            }
            return result;

        }
    }

}
</script>

<style scoped>
.top-action {
    display: flex;
    align-items: center;
}

.top-action input, .top-action .progress-bar {
    margin-top: 10px;
}

.import-new-sku .file-name {
    width: 300px;
    height: 30px;
    border-radius: 0;
}

.select-file >>> .input-form{
    margin-right: 0 !important;
}
.select-file >>> button{
    border-radius: 3px 0 0 3px;
}

.import-file >>> button {
    border-radius: 0 3px 3px 0;
}

</style>
