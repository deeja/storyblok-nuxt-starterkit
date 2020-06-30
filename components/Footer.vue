<template>
  <footer v-editable="blok" class="bg-black w-full text-white">
    <div class="w-2/3 mx-auto py-2">
      <component
        :is="child.component | dashify"
        v-for="child in blok.body"
        :key="child._uid"
        :blok="child"
      ></component>
    </div>
  </footer>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
