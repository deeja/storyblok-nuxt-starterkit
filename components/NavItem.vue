<template>
  <div v-editable="blok">
    <nuxt-link
      :to="`/${blok.link.cached_url}`"
      class="inline-block pr-1 mr-1 border-r border-white"
    >
      <img v-if="blok.image" alt="image" :src="blok.image" class="h-16" />
      {{ blok.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
