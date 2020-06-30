<template>
  <ul v-editable="blok" class="flex w-full" :class="blok.style.join(' ')">
    <component
      :is="child.component | dashify"
      v-for="child in blok.body"
      :key="child._uid"
      :blok="child"
    ></component>
  </ul>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
