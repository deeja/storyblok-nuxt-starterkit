<template>
  <div v-editable="blok" class="page">
    <component
      :is="child.component | dashify"
      v-for="child in blok.body"
      :key="child._uid"
      :blok="child"
    ></component>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
