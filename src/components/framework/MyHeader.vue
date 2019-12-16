<template xmlns="http://www.w3.org/1999/html">
  <div>
    <a-row :gutter="16">
      <a-col :span="2">
        <img src="~@/assets/api.png" width="60px" style="margin-left: 20px"/>
      </a-col>
      <a-col :span="4">
        <a-button @click="gotToProject" style="margin-left: 20px">Project Home</a-button>
      </a-col>
      <a-col :span="1" :offset="15">
        <a-button type="primary" shape="circle" icon="download" @click="downloadVisible=true"/>
      </a-col>
    </a-row>
    <a-modal title="Choose Your Framework" :width="650" v-model="downloadVisible" :footer="null">
      <a-row>
        <a-col :span="8">
          <a-button type="primary" round icon="download" @click="handleDownloadClick('pdf')">export PDF</a-button>
        </a-col>
      </a-row>
      <a-divider/>
      <a-row>
        <a-col :span="8">
          <a-button type="primary" round icon="download" @click="handleDownloadClick('falsk')">Flask Project</a-button>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" round icon="download" @click="handleDownloadClick('springboot')">SpringBoot Project
          </a-button>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" round icon="download" @click="handleDownloadClick('scalatra')">Scalatra Project
          </a-button>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  export default {
    name: "myheader",
    data()
    {
      return {
        downloadVisible: false
      }
    },
    methods: {
      gotToProject()
      {
        this.$router.push("/")
      },
      handleDownloadClick(projectType)
      {
        console.log("hello woerl", projectType)
        this.downloadVisible = false
      }
    }
  }
</script>

<style scoped>

</style>
