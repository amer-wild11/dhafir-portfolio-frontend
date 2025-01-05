<template lang="pug">
  .login
    form(@submit.prevent="login")
      h1.title Login to the dashboard 
      .input
        input(type="email", placeholder="Email", required, v-model="email")
      .input
        input(type="password", placeholder="Password", required, v-model="password")
      .submit
        input(type="submit", :value="buttonContent") 
</template>

<script setup>
const buttonContent = ref("Login");
const email = ref("");
const password = ref("");
const globalStore = useMyGlobalStore();
const router = useRouter();
const login = async () => {
  try {
    buttonContent.value = "Login...";
    const headers = globalStore.headers;
    const body = {
      email: email.value,
      password: password.value,
    };
    const response = await $fetch(`${globalStore.apiLink}/api/auth/login`, {
      method: "POST",
      headers,
      body,
    });

    buttonContent.value = "Done";
    console.log(response);
    localStorage.setItem("token", response.token);
    router.push("/dashboard");
  } catch (err) {
    buttonContent.value = "Login";
    console.error(err);
  }
};
definePageMeta({
  layout: false,
});
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 98%;
    max-width: 500px;
    .title {
      font-size: 25px;
      font-weight: 600;
      margin-bottom: 10px;
      @media (max-width: 767px) {
        text-align: center;
      }
    }
    .input {
      width: 100%;
      input {
        width: 100%;
        padding: 7px 20px;
        border-radius: 4px;
        background: none;
        border: 1px solid lightgray;
      }
    }
    .submit {
      width: 100%;
      input {
        width: 100%;
        padding: 10px 20px;
        border-radius: 5px;
        background-color: rgb(51, 28, 158);
        margin-top: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
