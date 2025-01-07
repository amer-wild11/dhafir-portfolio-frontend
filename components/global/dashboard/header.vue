<template lang="pug">
  header
    .logo
      img(src="/dashboard/header/logo-no-background.png", alt="alt")
    ul.links
      li.link
        a(href="https://wa.me/9647811111977", target="_blank") Support
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--dashboard-header-height);
  padding: 10px 40px;
  border-bottom: 1px solid rgba(211, 211, 211, 0.658);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: black;
  z-index: 99;
  background-color: white;
  .logo {
    img {
      width: 130px;
    }
  }

  .links {
    .link {
      text-decoration: underline;
      font-size: 20px;
    }
  }
}
</style>
