<template>
  <div>
    <a-card size="small">
      <a-row type="flex" justify="center">
        <a-col :span="3">
          <a-tag color="#108ee9">Module Name</a-tag>
        </a-col>
        <a-col :span="4">
          <div class="fontclass">{{modName}}</div>
        </a-col>
        <a-col :span="2">
          <a-tag color="#108ee9">Api Name</a-tag>
        </a-col>
        <a-col :span="7">
          <div class="fontclass">{{apiName}}</div>
        </a-col>
        <a-col :span="2">
          <a-tag color="#108ee9">Api Type</a-tag>
        </a-col>
        <a-col :span="2">
          <div class="fontclass">{{apiType}}</div>
        </a-col>
        <a-col :span="2">
          <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" href="#">
              <a-icon type="bars"/>
            </a>
            <a-menu slot="overlay">
              <a-menu-divider/>
              <a-menu-item key="0">Delete This Api</a-menu-item>
            </a-menu>
          </a-dropdown>
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
            >
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-input v-model="scope.row.desc"></el-input>
                </template>
                <template v-else>
                  {{ scope.row.desc }}
                </template>
              </template>
            </el-table-column>
            <el-table-column label="Operation" width="200">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleParamEdit(scope.$index, scope.row)">
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
                  @click="handleParamDelete(scope.$index, scope.row)">Delete
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
    <a-card size="small">
      <a-row>
        <a-col :span="4">
          <a-tag color="#87d068" style="font-size: 15px">Response Success</a-tag>
        </a-col>
        <a-col :span="2">
          <a-tooltip placement="top">
            <template slot="title">
              <span>click me to show code</span>
            </template>
            <a-icon type="code" :style="{ fontSize: '19px' }" @click="switchSuccessCode"/>
          </a-tooltip>
        </a-col>
        <a-col :span="11">
        </a-col>
        <a-col :span="3">
          <a-button size="small" type="primary" @click="saveCode('success')">Save Code</a-button>
        </a-col>
        <a-col :span="4">
          <template v-if="successStatus=='failure'">
            <a-tag color="#f50">fail to save</a-tag>
          </template>
          <template v-else-if="successStatus=='success'">
            <a-tag color="#87d068">already saved</a-tag>
          </template>
          <template v-else-if="successStatus=='unsaved'">
            <a-tag color="#ff9749">unsaved</a-tag>
          </template>
          <template v-else-if="successStatus=='error'">
            <a-tag color="#c21d73">Json format error</a-tag>
          </template>
        </a-col>
      </a-row>

      <div style="margin-bottom: 5px">
      </div>
      <template v-if="showSuccessCode">
        <codemirror v-model="success" :options="editorOption" @change="successChange"></codemirror>
      </template>
    </a-card>

    <a-card size="small">
      <a-row>
        <a-col :span="4">
          <a-tag color="#f50" style="font-size: 15px">Response Failure</a-tag>
        </a-col>
        <a-col :span="2">
          <a-tooltip placement="top">
            <template slot="title">
              <span>click me to show code</span>
            </template>
            <a-icon type="code" :style="{ fontSize: '19px' }" @click="switchFailureCode"/>
          </a-tooltip>
        </a-col>

        <a-col :span="11">
        </a-col>
        <a-col :span="3">
          <a-button size="small" type="primary" @click="saveCode('failure')">Save Code</a-button>
        </a-col>
        <a-col :span="4">
          <template v-if="failureStatus=='failure'">
            <a-tag color="#f50">fail to save</a-tag>
          </template>

          <template v-else-if="failureStatus=='success'">
            <a-tag color="#87d068">already saved</a-tag>
          </template>
          <template v-else-if="failureStatus=='unsaved'">
            <a-tag color="#ff9749">unsaved</a-tag>
          </template>
          <template v-else-if="failureStatus=='error'">
            <a-tag color="#c21d73">Json format error</a-tag>
          </template>
        </a-col>
      </a-row>
      <div style="margin-bottom: 5px">
      </div>

      <template v-if="showFailureCode">
        <codemirror v-model="failure" :options="editorOption" @change="failureChange"></codemirror>
      </template>
    </a-card>
  </div>
</template>

<script>
    import http from "@/util/http.js";
    import {codemirror} from 'vue-codemirror-lite'

    require('codemirror/mode/javascript/javascript')
    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/show-hint.css')
    require('codemirror/addon/hint/javascript-hint.js')

    export default {
        name: "Api",
        components: {
            codemirror
        },
        data()
        {
            return {
                paramTable: [],
                modName: "",
                apiName: "",
                apiType: "",
                success: "",
                failure: "",

                showSuccessCode: false,
                showFailureCode: false,

                successStatus: '',
                failureStatus: '',

                editorOption: {
                    mode: {name: "javascript", json: true},
                    tabSize: 2,
                    smartIndent: true,
                    lineNumbers: true,
                    lineWrapping: true,
                    viewportMargin: Infinity,
                }
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
                    this.successStatus = ''
                    this.failureStatus = ''
                    this.getApiInfo()
                }
            }
        },
        methods: {
            isJSON(str)
            {
                if (typeof str == 'string')
                {
                    try
                    {
                        var obj = JSON.parse(str);
                        if (typeof obj == 'object' && obj)
                        {
                            return true;
                        } else
                        {
                            return false;
                        }

                    } catch (e)
                    {
                        console.log('error：' + str + '!!!' + e);
                        return false;
                    }
                }
                console.log('It is not a string!')
            },
            successChange()
            {
                let bool = this.isJSON(this.success)
                if (bool)
                    this.successStatus = 'unsaved'
                else
                    this.successStatus = 'error'
                console.log(bool)
            },
            failureChange()
            {
                let bool = this.isJSON(this.failure)
                if (bool)
                    this.failureStatus = 'unsaved'
                else
                    this.failureStatus = 'error'
            },
            saveCode(status)
            {
                if (status == 'success')
                    this.saveColumn('success', this.success)
                // 'failure'
                else
                    this.saveColumn('failure', this.failure)
            },
            switchSuccessCode()
            {
                let bool = this.showSuccessCode == true ? false : true
                this.showSuccessCode = bool
            },
            switchFailureCode()
            {
                let bool = this.showFailureCode == true ? false : true
                this.showFailureCode = bool
            },
            addParam()
            {
                this.paramTable.push({name: "", value: "", desc: "", editable: true})
            },
            handleParamEdit(index, row)
            {
                row.editable = row.editable == true ? false : true
                if (row.name == "" || row.value == "")
                    this.paramTable.splice(index, 1)
                if (row.editable == false)
                    this.saveColumn("params", JSON.stringify(this.paramTable))
            },
            handleParamDelete(index, row)
            {
                this.paramTable.splice(index, 1)
                this.saveColumn("params", JSON.stringify(this.paramTable))
            },
            saveColumn(typename, content)
            {
                let param = {
                    apiId: this.currentApiId,
                    typename: typename,
                    content: content

                }
                let self = this
                http.post("/api/saveColumn", param).then(res =>
                {
                    if (res.data.code == 200)
                    {
                        if (typename == 'success')
                            this.successStatus = 'success'
                        else if (typename == 'failure')
                            this.failureStatus = 'success'
                    } else
                    {
                        if (typename == 'success')
                            this.successStatus = 'failure'
                        else if (typename == 'failure')
                            this.failureStatus = 'failure'
                    }
                })
            }
            ,
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
                        let apiInfo = res.data.data
                        if (apiInfo.params)
                            self.paramTable = JSON.parse(apiInfo.params)
                        else
                            self.paramTable = []
                        self.modName = apiInfo.modName
                        self.apiName = apiInfo.apiName
                        self.apiType = apiInfo.apiType
                        self.success = apiInfo.success
                        self.failure = apiInfo.failure
                        console.log(apiInfo)
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
    font-size: 15px;

  }

  .ant-card-body {
    padding: 10px;
    zoom: 1;
  }

</style>
