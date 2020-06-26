<template>
  <footer class="bg-black w-full text-white" v-editable="blok">
    <div class="w-2/3 mx-auto py-2">
      <component
        :key="blok._uid"
        v-for="blok in blok.body"
        :blok="blok"
        :is="blok.component | dashify"
      ></component>
    </div>
  </footer>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>



