<template>
  <component :is="blok.type" v-editable="blok">
    <strong v-if="blok.strong">{{ blok.text }}</strong>
    <template v-else>{{ blok.text }}</template>
  </component>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
