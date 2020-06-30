<template>
  <section v-editable="blok">
    <div>
      <h1>{{ blok.headline }}</h1>
      <p>{{ blok.text }}</p>
    </div>
    <component
      :is="child.component | dashify"
      v-for="child in blok.buttons"
      :key="child._uid"
      :blok="child"
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
