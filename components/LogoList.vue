<template>
  <div v-editable="blok">
    <div class="font-bold text-base text-center w-full">
      {{ blok.logo_headline }}
    </div>
    <div class="flex flex-wrap justify-evenly text-center w-full">
      <component
        :key="blok._uid"
        v-for="blok in blok.logos"
        :blok="blok"
        :is="blok.component | dashify"
      ></component>
    </div>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
