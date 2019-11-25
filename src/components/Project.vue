<template>
  <div style="margin-top: 28px">
    <!--    <a-row type="flex" justify="center">-->
    <a-col :span="3"></a-col>
    <a-col :span="18">
      <template v-for="pro in projectList">
        <a-col :span="8" style="margin-bottom: 20px">
          <a-card hoverable style="width: 300px;background-color: #f5f6cc">
            <!--            #41d1ff-->
            <template class="ant-card-actions" slot="actions">
              <!--              <a-button type="primary" shape="circle" icon="folder"></a-button>-->
              <el-button type="success" icon="el-icon-view" circle @click="openProject(pro)"></el-button>
              <el-button type="primary" icon="el-icon-edit" circle @click="editProject(pro)"></el-button>
              <el-dropdown trigger="click" @command="handleCommand">
                <el-button type="info" icon="el-icon-more-outline" circle></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="pro.projId">delete project</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
            <a-card-meta :title="pro.projName" :description="pro.projDesc">
            </a-card-meta>
          </a-card>
        </a-col>
      </template>

      <a-col :span="8">
        <a-card style="width: 300px">
          <a-row type="flex" justify="center">
            <a-col :span="10">
              <a-button type="primary" @click="addProject">Add Project</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-col>
    <a-col :span="3"></a-col>

    <a-modal :title="modalTitle" v-model="visible" @ok="handleOk">
      <el-form label-position="right" label-width="140px" :model="project" :rules="projectRules" ref="projectRuleForm">
        <el-form-item label="Project Name" prop="projName">
          <el-input v-model="project.projName"></el-input>
        </el-form-item>
        <el-form-item label="Project Description" prop="projDesc">
          <el-input v-model="project.projDesc"></el-input>
        </el-form-item>
      </el-form>
    </a-modal>
  </div>
</template>

<script>
    import http from "@/util/http.js"

    export default {
        name: "Project",
        data()
        {
            return {
                projectList: [],
                visible: false,
                modalTitle: "Add Project",
                project: {
                    projName: '',
                    projDesc: '',
                },
                projectRules: {
                    projName: [
                        {required: true, message: 'please input project name', trigger: 'trigger'},
                    ],
                    projDesc: [
                        {required: true, message: 'please input project description', trigger: 'blur'},
                    ],
                }
            };
        },
        methods: {
            getProjectList()
            {
                http.get("/project/getProjectList").then(res =>
                {
                    if (res.data.code == 200)
                    {
                        this.projectList = res.data.data
                    }
                });
            },
            openProject(pro)
            {
                this.$store.commit("setCurrentProjId",pro.projId)
              this.$router.push("/framework")

            },
            addProject()
            {
                this.modalTitle = "Add Project"
                this.visible = true
            },
            editProject(pro)
            {
                this.modalTitle = "Edit Project"
                this.project = JSON.parse(JSON.stringify(pro))
                this.visible = true
            },
            handleCommand(command)
            {
                if (new RegExp("\\d+").test(command))
                {
                    let params = {
                        id: command
                    }
                    let self = this
                    http.post("/project/deleteProject", params).then(res =>
                    {
                        if (res.data.code == 200)
                        {
                            let index = self.projectList.map(e => e.projId).indexOf(command)
                            self.projectList.splice(index, 1)
                            self.$message.success("delete project successfully")
                        } else
                            self.$message.error("delete failed")
                    })
                }
            },
            handleOk(e)
            {
                console.log(e);
                this.$refs['projectRuleForm'].validate((valid) =>
                {
                    if (valid)
                    {
                        if (this.modalTitle == "Add Project")
                            this.project.projId = -1
                        console.log(this.project)
                        let self = this
                        http.post("/project/addOrEditProject", this.project).then(res =>
                        {
                            if (res.data.code == 200)
                            {
                                if (this.modalTitle == "Add Project")
                                {
                                    self.$message.success("add successfully")
                                    self.projectList.push(res.data.data)
                                } else
                                {
                                    let index = self.projectList.map(e => e.projId).indexOf(self.project.projId)
                                    self.projectList[index] = JSON.parse(JSON.stringify(self.project))
                                    self.$message.success("edit successfully")
                                }
                                self.visible = false
                            }
                        })
                    } else
                    {
                        return false;
                    }
                });

            },
        },
        mounted()
        {
            this.getProjectList()
        }
    }
</script>

<style scoped>

</style>
