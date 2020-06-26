<template>
  <div v-editable="blok" class="w-full flex  flex-wrap overflow-hidden">
    <component
      :key="blok._uid"
      v-for="blok in blok.body"
      :blok="blok"
      :is="blok.component | dashify"
    ></component>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
