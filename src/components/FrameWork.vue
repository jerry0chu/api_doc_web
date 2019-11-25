<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed"
                    style="max-width: 300px;min-width: 300px;width: 300px">
      <div class="logo"/>
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
        <a-menu-item key="1">
          <a-icon type="codepen"/>
          <span>客户管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="codepen"/>
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="codepen"/>
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding:0px">
        hello world
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
    export default {
        name: "FrameWork",
        data()
        {
            let minHeight = document.documentElement.clientHeight * 0.88 + "px"
            return {
                collapsed: false,
                contentSetting: {
                    margin: '15px 10px', padding: '20px', background: '#fff', minHeight: minHeight
                }
            };
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
