<template>
  <section v-editable="blok">
    <div>
      <h1>{{ blok.headline }}</h1>
      <p>{{ blok.text }}</p>
    </div>
    <component
      :key="blok._uid"
      v-for="blok in blok.buttons"
      :blok="blok"
      :is="blok.component | dashify"
    ></component>
    <div v-if="blok.image">
      <img alt="image" :src="blok.image" />
    </div>
  </section>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
