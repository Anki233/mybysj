<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  created() {
    // 初始化用户信息
    this.$store.commit('initUser')
  },
}
</script>
<style scoped="scoped">
	#app{
		width: 98vw;
		height: 99vh;
		background-color: white;
	}
</style>
