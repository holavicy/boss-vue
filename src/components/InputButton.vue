<template>
    <div class="input-button">
        <input type="text" placeholder="" :style="{width: width}"/>
        <button class="primary">{{buttonName}}</button>
    </div>
</template>

<script>
export default {
    name:'input-button',
    props:{
        buttonName:String,
        width:String
    }

}
</script>

<style>

.input-button input{
    border-radius: 4px 0 0 4px;
    border-right:0;
}
.input-button input:focus{
    border-right:0;
}

.input-button button {
    border-radius: 0 4px 4px 0;
}
</style>
