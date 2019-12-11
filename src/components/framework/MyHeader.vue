<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="2">
        <img src="~@/assets/api.png" width="60px" style="margin-left: 20px"/>
      </a-col>
      <a-col :span="4">
        <a-button @click="gotToProject" style="margin-left: 20px">Project Home</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "myheader",
    data()
    {
        return{

        }
    },
    methods: {
      gotToProject()
      {
        this.$router.push("/")
      },
    }
  }
</script>

<style scoped>

</style>
