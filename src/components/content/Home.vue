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
  </div>
</template>

<script>
    import http from "@/util/http.js";

    export default {
        name: "Home",
        data()
        {
            let projId = this.$store.state.currentProjId
            return {
                projId: projId,
                modNums: 0,
                apiNums: 0
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
