<template>
  <div v-editable="blok" class="bg-white w-full sm:w-6/12 lg:w-3/12 pt-4 lg:pt-0">
    <div class="h-32">
      <img alt="image" class="max-h-full m-auto" :src="blok.icon" />
    </div>
    <h3>
      <strong>{{ blok.headline }}</strong>
    </h3>
    <p>{{ blok.text }}</p>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
