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
          <h4>Project Tips:</h4>
          <p>
            <a-tag color="cyan">Request Params recommendation</a-tag>
            When the request has parameters, use POST, otherwise use GET
          </p>
          <p>
            <a-tag color="cyan">Mock Server Address :</a-tag>
            {{hostname}}/mock/
            <a-tag color="green">YourProjectName</a-tag>
            /
            <a-tag color="purple">YourApiName</a-tag>
          </p>
          <p>
            <a-tag color="cyan">Request Params :</a-tag>
            Content-Type = application/json
          </p>
          <p>
            <a-tag color="cyan">Response Data :</a-tag>
            Json
          </p>
          <p>
            <a-tag color="cyan">Real Server Address:</a-tag>
            <template v-if="isEdited==false">
              <el-input v-model="inputRealServerAddress" placeholder="eg: http://localhost:5000" size="small"
                        style="width: 300px"></el-input>
              <a-button type="primary" @click="saveProjectConf" size="small">Save</a-button>
            </template>
            <template v-else>
              <strong>{{inputRealServerAddress}}</strong>
              <template v-if="inputRealServerAddress==''">
                <a-button type="primary" @click="isEdited=false" size="small">Add</a-button>
              </template>
              <template v-else>
                <a-button type="primary" @click="isEdited=false" size="small">Edit</a-button>
              </template>
              <div style="font-size: 6px;display: inline;color: gray">Do not end up with /</div>
            </template>
          </p>
        </a-col>
      </a-row>
    </a-card>
    <div style="margin-top: 15px"></div>
    <a-card size="small">
      <a-row>
        <a-col>
          <h4>Latest Add Or Edit Api (Top 10)</h4>
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
      let ipPort = document.location.hostname +":"+ document.location.port;
      return {
        projId: projId,
        modNums: 0,
        apiNums: 0,
        hostname: ipPort,
        isEdited: false,
        inputRealServerAddress: "",
        conf: ""
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
      },
      getRealServerAddress()
      {
        let param = {
          id: this.projId
        }
        let self = this
        http.post("/project/getProjectConf", param).then(res =>
        {
          if (res.data.code == 200)
          {
            let conf = res.data.data
            self.inputRealServerAddress = conf
            self.isEdited = true
          }
        })
      },
      saveProjectConf()
      {
        let param = {
          projId: this.projId,
          conf: this.inputRealServerAddress
        }
        let self = this
        // https://localhost:5000
        if (/(http|https):\/\/([\w.]+\/?)\S+[^/]$/.test(this.inputRealServerAddress))
        {
          http.post("/project/saveProjectConf", param).then(res =>
          {
            if (res.data.code == 200)
            {
              self.isEdited = true
            }
          })
        } else
          self.$message.error("server address format error")

      }

    },
    beforeMount()
    {
      this.getModApiNums()
      this.getRealServerAddress()

    }
  }
</script>

<style scoped>

</style>
