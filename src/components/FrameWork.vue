<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed"
                      style="max-width: 300px;min-width: 300px;width: 300px">
        <!--      <div class="logo"/>-->
        <a-row>
          <a-col :span="21">
            <a-input-search placeholder="input search text" @search="onSearch" enterButton
                            class="inputClass"/>
          </a-col>
          <a-col :span="2">
            <a-button shape="circle" type="primary" icon="plus" style="margin-top: 8px"
                      @click="addModule"></a-button>
          </a-col>
        </a-row>

        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['-1']">
          <a-menu-item key="-1">
            <a-icon type="home"/>
            <span>Home</span>

          </a-menu-item>
          <template v-for="modApi in modApiList">
            <a-sub-menu :key="computeId('mod:',modApi.modId)">
            <span slot="title">
               <a-dropdown :trigger="['contextmenu']">
                <a-icon type="bars"/>
                <span style="user-select: none"></span>
                <a-menu slot="overlay" @click="clickModItem">
                  <a-menu-item :key="computeId('add:',modApi.modId)">Add Api</a-menu-item>
                  <a-menu-item :key="computeId('edit:',modApi.modId)">Edit This Module</a-menu-item>
                  <a-menu-item :key="computeId('delete:',modApi.modId)">Delete This Module</a-menu-item>
                </a-menu>
              </a-dropdown>
              {{modApi.modName}}

            </span>
              <template v-for="api in modApi.apiList">
                <a-menu-item :key="computeId('api:',api.apiId)">
                  <a-icon type="pie-chart"/>
                  <span>{{api.apiName}}</span>
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
    <a-modal :title="moduleTitle" v-model="moduleVisible" @ok="handleModuleOk">
      <el-form label-position="right" label-width="150px" :model="module" :rules="moduleRules" ref="moduleRuleForm">
        <el-form-item label="Module Name" prop="modName">
          <el-input v-model="module.modName"></el-input>
        </el-form-item>
        <el-form-item label="Module Description" prop="modDesc">
          <el-input v-model="module.modDesc"></el-input>
        </el-form-item>
      </el-form>
    </a-modal>
  </div>

</template>
<script>
    import http from "@/util/http.js";

    export default {
        name: "FrameWork",
        data()
        {
            let minHeight = document.documentElement.clientHeight * 0.88 + "px"
            let localCurrentProjId = this.$store.state.currentProjId
            return {
                collapsed: false,
                contentSetting: {
                    margin: '15px 10px', padding: '20px', background: '#fff', minHeight: minHeight
                },
                modApiList: [],
                moduleTitle: "Add Module",
                moduleVisible: false,
                currentProjId: localCurrentProjId,
                module: {
                    projId: localCurrentProjId,
                    modName: "",
                    modDesc: ""
                },

                moduleRules: {
                    modName: [
                        {required: true, message: 'please input module name', trigger: 'trigger'},
                    ],
                }
            };
        },
        computed: {
            computeId()
            {
                return function (name, id)
                {
                    return name + "" + id
                }
            },
        },
        methods: {
            addModule()
            {
                this.module.modName = ""
                this.moduleTitle = "Add Module"
                this.moduleVisible = true
            },
            handleModuleOk()
            {
                this.$refs['moduleRuleForm'].validate((valid) =>
                {
                    if (valid)
                    {
                        if (this.moduleTitle == "Add Module")
                            this.module.modId = -1
                        console.log("addOrEditModule", this.module)
                        let self = this
                        http.post("/module/addOrEditModule", this.module).then(res =>
                        {
                            console.log(res.data)
                            if (res.data.code == 200)
                            {
                                let mod = res.data.data
                                if (self.moduleTitle == "Add Module")
                                {
                                    self.$message.success("add successfully")
                                    self.modApiList.push({modName: mod.modName, modId: mod.modId, apiList: []})
                                } else
                                {
                                    console.log(self.modApiList)
                                    let index = self.modApiList.map(m => m.modId).indexOf(self.module.modId)
                                    self.modApiList[index].modName = JSON.parse(JSON.stringify(self.module)).modName
                                    self.$message.success("edit successfully")
                                }
                                self.moduleVisible = false
                            }
                        })
                    } else
                    {
                        return false;
                    }
                });
            },
            onSearch(val)
            {
                console.log(val)
            },
            addApi(modId)
            {

            },
            editModule(modId)
            {
                let self = this
                let params = {
                    id: modId
                }
                console.log(params)
                http.post("/module/getModule", params).then(res =>
                {
                    if (res.data.code == 200)
                    {
                        this.module = res.data.data
                        self.moduleTitle = "Edit Module"
                        self.moduleVisible = true
                    }
                })
            },
            deleteModule(modId)
            {
                let index = this.modApiList.map(m => m.modId).indexOf(modId)
                let modName = this.modApiList[index].modName
                this.$confirm('Do you really want to delete ' + modName + " ?", 'Tips', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() =>
                {
                    let self = this
                    http.post("/module/deleteModule", {id: modId}).then(res =>
                    {
                        if (res.data.code == 200)
                        {
                            self.modApiList.splice(index, 1)
                            self.$message.success('delete successfully!');
                        }
                    })

                })
            },
            clickModItem({key})
            {
                let array = key.split(":")
                let op = array[0]
                let modId = Number(array[1])
                if (op == "edit")
                    this.editModule(modId)
                else if (op == "delete")
                    this.deleteModule(modId)
                else if (op == "add")
                    this.addApi(modId)
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
                        console.log("self.modApiList", res.data.data)
                        self.modApiList = res.data.data;
                    }
                });
            }
        },
        mounted()
        {
            if (this.$store.state.currentProjId == -1)
                this.$router.push("/")
            else
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

  #components-layout-demo-custom-trigger .inputClass {
    width: 260px;
    margin-top: 8px;
    margin-bottom: 5px;
    /*background: rgba(255, 255, 255, 0.2);*/
    /*margin: 16px;*/
  }
</style>
