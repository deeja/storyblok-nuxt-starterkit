<template>
  <div v-editable="blok">
    <div class="font-bold text-base text-center w-full">
      {{ blok.logo_headline }}
    </div>
    <div class="flex flex-wrap justify-evenly text-center w-full">
      <component
        :is="child.component | dashify"
        v-for="child in blok.logos"
        :key="child._uid"
        :blok="child"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
