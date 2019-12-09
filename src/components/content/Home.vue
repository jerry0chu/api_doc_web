<template>
  <div>
    <a-card size="small">
      <a-row :gutter="16" type="flex" justify="center">
        <a-col :span="5">
          <a-statistic title="Module numbers" :value="modNums" style="color: #1890FF">
            <template v-slot:suffix>
              <a-icon type="appstore"/>
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="5">
          <a-statistic title="Api numbers" :value="apiNums" style="color: #f723ff">
            <template v-slot:suffix>
              <a-icon type="link"/>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
    </a-card>
    <div style="margin-top: 15px"></div>
    <a-card size="small">
      <a-row>
        <a-col>
          <h3>Project Tips:</h3>
          <p>
            <a-tag color="cyan">Mock Server Address :</a-tag>
            {{hostname}}/mock/
            <a-tag color="green">YourProjectName</a-tag>/
            <a-tag color="purple">YourApiName</a-tag>
          </p>
          <p><a-tag color="cyan">Request Params :</a-tag> Content-Type = application/json</p>
          <p><a-tag color="cyan">Response Data :</a-tag> Json</p>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
  import http from "@/util/http.js";

  export default {
    name: "Home",
    data()
    {
      let projId = this.$store.state.currentProjId
      let ipPort = document.location.hostname + document.location.port;
      return {
        projId: projId,
        modNums: 0,
        apiNums: 0,
        hostname: ipPort
      }
    },
    watch: {
      currentApiId(newV, oldV)
      {
        if (newV == -1)
          this.getModApiNums()
      }
    },
    computed: {
      currentApiId()
      {
        return this.$store.state.currentApiId
      }
    },
    methods: {
      getModApiNums()
      {
        let params = {
          id: this.projId
        }
        http.post("/api/getModApiNums", params).then(res =>
        {
          if (res.data.code == 200)
          {
            let array = res.data.data
            this.modNums = array[0]
            this.apiNums = array[1]
          }
        })
      }
    },
    beforeMount()
    {
      this.getModApiNums()
    }
  }
</script>

<style scoped>

</style>
