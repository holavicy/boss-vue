<template>
    <div class="bread-crumb">
        <ul>
            <li v-for=" (item, index) in breadCrumbList" :key="item.title">
                <router-link :to="item.path"
                :class="[index == breadCrumbList.length-1?'lastBread':'']">{{item.title}}</router-link>
                <span v-if="index < breadCrumbList.length-1">/</span>
                </li>
        </ul>
    </div>
</template>

<script>

export default {
    name:'bread-crumb',
    computed: {
      breadCrumbList() {
          return this.$store.state.breadCrumbList
      }
    },
}
</script>

<style scoped>
.bread-crumb {
    padding: 10px;
    background-color: #f5f5f5;
}

.bread-crumb ul {
    display: flex;
}

.bread-crumb ul li {
    margin-right: .3rem
}

.bread-crumb ul li a {
    font-size: 14px;
}

.lastBread{
    color: #999;;
}
</style>
