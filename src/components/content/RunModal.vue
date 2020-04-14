<template>
  <div>
    <a-modal title="Run Result" v-model="runVisible" :width="runWidth" :footer="null" @cancel="closeRunModal">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-tag color="#108ee9" style="font-size: 15px">Original Response</a-tag>
          <codemirror v-model="original" :options="editorOption"></codemirror>
        </a-col>
        <a-col :span="12">
          <a-tag color="#108ee9" style="font-size: 15px">Real Response</a-tag>
          <codemirror v-model="real" :options="editorOption"></codemirror>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
  import http from "@/util/http.js";
  import {codemirror} from 'vue-codemirror-lite'

  require('codemirror/mode/javascript/javascript')
  // require('codemirror/addon/hint/show-hint.js')
  // require('codemirror/addon/hint/show-hint.css')
  // require('codemirror/addon/hint/javascript-hint.js')

  export default {
    name: "RunModal",
    props: {
      runVisible: Boolean,
      default: false
    },
    components: {
      codemirror
    },
    data()
    {
      let runWidth = document.documentElement.clientWidth * 0.95 + "px"
      return {
        params: "",
        original: "",
        real: "",
        runWidth: runWidth,

        editorOption: {
          mode: {name: "javascript", json: true},
          tabSize: 2,
          smartIndent: true,
          lineNumbers: true,
          lineWrapping: true,
          viewportMargin: Infinity,
          readOnly: true,
        },
      }
    },
    computed: {
      currentApiId()
      {
        return this.$store.state.currentApiId
      }
    },
    watch: {
      runVisible(newV, oldV)
      {
        if (newV == true)
        {
          this.getRunApiInfo()
        }
      }
    },
    methods: {
      closeRunModal()
      {
        this.original = ""
        this.real = ""
        this.$emit("closeRunModal", false)
      },
      getRunApiInfo()
      {
        let params = {
          "projId": this.$store.state.currentProjId,
          "apiId": this.currentApiId
        }
        http.post("/api/runApi", params).then(res =>
        {
          if (res.data.code == 200)
          {
            let val = res.data.data
            this.original = val.original
            this.real = val.real
          }
        })
      }
    },
  }
</script>

<style scoped>


</style>
