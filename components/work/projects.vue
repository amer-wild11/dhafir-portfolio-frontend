<template lang="pug">
  .container 
    .projects
      .project(v-for="(project, i) in vimeoStore.dhafir_videos" :key="i", @click="vimeoStore.setActive(project.uri)")
        .thumbnail
          img(:src="project.pictures.base_link", alt="alt")
        .title
          span {{project.name}}
</template>

<script lang="ts" setup>
const vimeoStore = useMyVimeoStore()
</script>

<style scoped lang="scss">
.container {
  margin-top: 10px;

  .projects {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    gap: 15px;

    @media (max-width: 600px) {
      grid-template-columns: repeat(auto-fill, minmax(70%, 1fr));
    }

    .project {
      cursor: pointer;

      .thumbnail {
        width: 100%;
        height: 250px;
        margin-bottom: 1rem;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }
      }

      .title {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
</style>