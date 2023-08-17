<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>
<script>
export default {
  data () {
    return {
      checked: true
    }
  }
}
</script>

<style lang="less">
.box{
  width:300px;
  height:300px;
  background-color: pink;
}
</style>
