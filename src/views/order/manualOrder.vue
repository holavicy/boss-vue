<template>
<el-cascader
    :options="cityList"
    :props="optionProps"
    v-model="selectedOptions"
    @change="handleChange">
</el-cascader>
</template>

<script>

export default {
    name:'manual-order',
    data(){
        return{
            cityList: [{
                    id: 1,
                    name: '北京',
                    child: [{
                        id: 11,
                        name: '大兴区',
                        child: [{
                            id: 111,
                            name: '亦庄'}
                        ]
                    }]
                }
            ],
            optionProps: {
                value: 'id',
                label: 'name',
                children: 'child'}
        }
    },
    methods:{
        handleChange(val) {
            console.log(val);
		
	}
    },

    beforeRouteLeave(to, from, next){
        const answer = window.confirm('离开当前页面信息将不会保存,确认离开?')

        if(answer){
            next()
        } else {
            next(false)
        }
    }
}
</script>

<style scoped>

</style>
