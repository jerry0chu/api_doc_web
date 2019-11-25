<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed"
                    style="max-width: 300px;min-width: 300px;width: 300px">
      <div class="logo"/>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['-1']">
        <a-menu-item key="-1">
          <a-icon type="home"/>
          <span>Home</span>

        </a-menu-item>
        <template v-for="modApi in modApiList">
          <a-sub-menu :key="computeId('mod:',modApi.modId)">
            <span slot="title">
              <a-icon type="mail"/>{{modApi.modName}}
               <a-dropdown :trigger="['contextmenu']" style="position:relative;left:50%">
                <a-icon type="bars"/>
                <span style="user-select: none"></span>
                <a-menu slot="overlay" @click="clickModItem">
                  <a-menu-item :key="computeId('add:',modApi.modId)">Add Api</a-menu-item>
                  <a-menu-item :key="computeId('delete:',modApi.modId)">Delete This Module</a-menu-item>
                </a-menu>
              </a-dropdown>
            </span>
            <template v-for="api in modApi.apiList">
              <a-menu-item :key="computeId('api:',api.apiId)">
                <a-icon type="pie-chart"/>
                <span>{{api.apiName}}</span>
                <a-dropdown :trigger="['contextmenu']" style="position:relative;left:40%">
                  <a-icon type="bars"/>
                  <span style="user-select: none"></span>
                  <a-menu slot="overlay" @click="clickApiItem">
                    <a-menu-item :key="computeId('delete:',modApi.modId)">Delete This Api</a-menu-item>
                  </a-menu>
                </a-dropdown>
              </a-menu-item>
            </template>
          </a-sub-menu>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding:0px">
        <a-row :gutter="16">
          <a-col :span="2">
            <img src="~@/assets/api.png" width="60px" style="margin-left: 20px"/>
          </a-col>
          <a-col :span="4">
            <a-button @click="gotToProject" style="margin-left: 20px">Project Home</a-button>
          </a-col>
        </a-row>
      </a-layout-header>
      <a-layout-content
        :style="contentSetting"
      >
        Content
        {{this.$store.state.currentProjId}}
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
    import http from "../util/http";

    export default {
        name: "FrameWork",
        data()
        {
            let minHeight = document.documentElement.clientHeight * 0.88 + "px"
            return {
                collapsed: false,
                contentSetting: {
                    margin: '15px 10px', padding: '20px', background: '#fff', minHeight: minHeight
                },
                modApiList: []
            };
        },
        computed: {
            computeId()
            {
                return function (name, id)
                {
                    return name + "" + id
                }
            }
        },
        methods: {
            clickModItem({key})
            {
                console.log(key)
            },
            clickApiItem({key})
            {
                console.log(key)
            },
            gotToProject()
            {
                this.$router.push("/")
            },
            getModApiList()
            {
                let projId = this.$store.state.currentProjId
                let params = {
                    id: projId
                }
                let self = this
                http.post("/module/getModApi", params).then(res =>
                {
                    if (res.data.code == 200)
                    {
                        console.log(res.data.data)
                        self.modApiList = res.data.data;
                    }
                });
            }
        },
        mounted()
        {
            this.getModApiList()
        }
    };
</script>
<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
</style>
