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
          <a-button type="primary" round icon="download" @click="handleDownloadClick('flask')">Flask Project</a-button>
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
  import http from "@/util/http.js";

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
      download(address, requestList = [])
      {
        let form = document.createElement("form");
        let access_token = "1756467474";
        form.setAttribute("style",
          "display:none");
        form.setAttribute("method", "get");
        let params = {};
        params.Authorization = access_token;
        form.setAttribute("header",
          params);

        for (let i = 0; i < requestList.length; i++)
        {
          let input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          input.setAttribute('name', requestList[i].key);
          input.setAttribute('value', requestList[i].value);
          form.append(input);
        }

        // 设置 key value 传值
        // input.setAttribute('name', key);
        // input.setAttribute('value', value);
        form.setAttribute("action",
          address  // /web/file/fileDownload   /web/contract/downloadContract
        );
        form.setAttribute("target", "_blank");
        let body = document.createElement("body");
        body.setAttribute("style", "display:none");
        document.body.appendChild(form);
        form.submit();
        form.remove();
      },
      handleDownloadClick(typename)
      {
        let requestList = [
          {
            key: "projId",
            value: this.$store.state.currentProjId
          },
          {
            key: "typename",
            value: typename
          },
        ]
        this.download('/apidoc/project/download', requestList)
        this.downloadVisible = false
      }
    }
  }
</script>

<style scoped>

</style>
