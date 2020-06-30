<template>
  <div
    v-editable="blok"
    class="flex flex-wrap text-center p-5 w-full justify-around"
  >
    <component
      :is="child.component | dashify"
      v-for="child in blok.body"
      :key="child._uid"
      class="p-2"
      :blok="child"
    ></component>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
