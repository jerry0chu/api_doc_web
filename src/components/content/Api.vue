<template>
  <div>
    {{this.$store.state.currentApiId}}

    <a-card size="small">
      <a-row type="flex" justify="center">
        <a-col :span="3">
          <a-tag color="#2db7f5">Module Name</a-tag>
        </a-col>
        <a-col :span="4">
          <div class="fontclass">{{modName}}</div>
        </a-col>
        <a-col :span="2">
          <a-tag color="#87d068">Api Name</a-tag>
        </a-col>
        <a-col :span="6">
          <div class="fontclass">{{apiName}}</div>
        </a-col>
        <a-col :span="2">
          <a-tag color="#108ee9">Api Type</a-tag>
        </a-col>
        <a-col>
          <div class="fontclass">{{apiType}}</div>
        </a-col>
      </a-row>
    </a-card>
    <a-card size="small">
      <a-row type="flex" justify="center">
        <a-col :span="24">
          <el-table
            :data="paramTable"
            style="width: 100%"
            size="mini"
            border
            stripe
            empty-text="No data"
          >
            <el-table-column
              label="Param Name"
              width="200">
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-input v-model="scope.row.name"></el-input>
                </template>
                <template v-else>
                  {{ scope.row.name }}
                </template>
              </template>
            </el-table-column>
            <el-table-column
              label="Param Value"
              width="240">
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-input v-model="scope.row.value"></el-input>
                </template>
                <template v-else>
                  {{ scope.row.value }}
                </template>
              </template>
            </el-table-column>
            <el-table-column
              label="Param Desc"
              width="240">
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-input v-model="scope.row.desc"></el-input>
                </template>
                <template v-else>
                  {{ scope.row.desc }}
                </template>
              </template>
            </el-table-column>
            <el-table-column label="Operation">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">
                  <template v-if="scope.row.editable">
                    Complete
                  </template>
                  <template v-else>
                    Edit
                  </template>
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </a-col>
      </a-row>
      <a-row type="flex" justify="center">
        <a-col :span="1">
          <a-tag color="#108ee9" @click="addParam">
            <a-icon type="plus"/>
          </a-tag>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
    import http from "@/util/http.js";

    export default {
        name: "Api",
        data()
        {
            return {
                paramTable: [],
                modName: "",
                apiName: "",
                apiType: "",
                success: "",
                failure: ""
            }
        },
        computed: {
            currentApiId()
            {
                return this.$store.state.currentApiId
            }
        },
        watch: {
            currentApiId(newV, oldV)
            {
                if (newV != -1)
                {
                    this.getApiInfo()
                }
            }
        },
        methods: {
            addParam()
            {
                this.paramTable.push({name: "", value: "", desc: "", editable: true})
            },
            handleEdit(index, row)
            {
                row.editable = row.editable == true ? false : true
                if (row.name == "" || row.value == "")
                    this.paramTable.splice(index, 1)
                this.saveParam()
            },
            handleDelete(index, row)
            {
                this.paramTable.splice(index, 1)
                this.saveParam()
            },
            saveParam()
            {
                let string = JSON.stringify(this.paramTable)
                let param = {
                    apiId: this.currentApiId,
                    params: string
                }
                let self = this
                http.post("/api/updateParams", param).then(res =>
                {
                    if (res.data.code == 200)
                    {
                        console.log(res.data.data)
                    }
                })
            },
            getApiInfo()
            {
                let param = {
                    id: this.currentApiId
                }
                let self = this
                http.post("/api/getApiInfo", param).then(res =>
                {
                    if (res.data.code == 200)
                    {
                        console.log(res.data.data)
                        let apiInfo = res.data.data
                        if (apiInfo.params)
                            self.paramTable = JSON.parse(apiInfo.params)
                        else
                            self.paramTable=[]
                        self.modName = apiInfo.modName
                        self.apiName = apiInfo.apiName
                        self.apiType = apiInfo.apiType
                        self.success = apiInfo.success
                        self.failure = apiInfo.failure
                    }
                })
            }
        },
        beforeMount()
        {
          this.getApiInfo()
        }
    }
</script>

<style scoped>
  .fontclass {
    color: darkblue;
    font-size: 14px;

  }

  .ant-card-body {
    padding: 10px;
    zoom: 1;
  }
</style>
