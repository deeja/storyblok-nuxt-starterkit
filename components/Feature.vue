<template>
  <div v-editable="blok" class="lg:w-3/12 sm:w-6/12 w-full">
    <div class="bg-white p-1 rounded-md m-1 h-full">
      <div class="h-32">
        <img alt="image" class="max-h-full m-auto" :src="blok.icon" />
      </div>
      <h3>
        <strong>{{ blok.headline }}</strong>
      </h3>
      <p>{{ blok.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
