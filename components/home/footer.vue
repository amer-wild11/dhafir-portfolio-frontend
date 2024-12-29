<template lang="pug">
  footer
    .container 
      CustomTitle(title="Let’s Connect")
      .socialLinks 
        .icons
          a(:href="link.link", target="_blank", v-for="link in globalStore.socialLinks" :key="link.id").link
            .icon
              Icon(:name="link.icon")
        .email
          span hello@dhafir-ayad.com
      .copyright
        span Copyrights 2024 All rights reserved © Malamih.net 2024
</template>

<script setup>

const globalStore = useMyGlobalStore()

</script>

<style scoped lang="scss">
footer {
  .container {
    .title {
      font-size: 40px;
      margin-top: 30px;
    }

    .socialLinks {
      .icons {
        display: flex;
        align-items: center;
        gap: 14px;
        margin: 10px 0;
        margin-bottom: 20px;

        @media (max-width: 767px) {
          justify-content: center;
        }

        .link {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          font-size: 40px;

          &,
          .icon {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }

      .email {
        font-size: 30px;
        font-weight: bold;

        @media (max-width: 767px) {
          text-align: center;
        }
      }
    }

    .copyright {
      font-size: 15px;
      text-align: center;
      margin-top: 40px;
    }
  }
}
</style>