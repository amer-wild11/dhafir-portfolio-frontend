<template>
  <Sortable :list="items" item-key="id" @end="onEnd">
    <template #item="{ element }">
      <div>
        {{ element.name }}
      </div>
    </template>
  </Sortable>
  {{ items }}
</template>

<script setup>
import { Sortable } from "sortablejs-vue3";
import { ref } from "vue";

const items = ref([
  { id: 1, name: "العنصر الأول" },
  { id: 2, name: "العنصر الثاني" },
  { id: 3, name: "العنصر الثالث" },
]);

const onEnd = (event) => {
  const movedItem = items.value.splice(event.oldIndex, 1)[0];
  items.value.splice(event.newIndex, 0, movedItem);
};

definePageMeta({
  layout: false,
});
</script>

<style scoped lang="scss">
div {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  background-color: #f9f9f9;
  cursor: move;
  color: black;
}
</style>
