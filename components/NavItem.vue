<template>
  <div v-editable="blok">
    <nuxt-link :to="`/${blok.link.cached_url}`" class="inline-block">      
      <img alt="image"
           :src="blok.image"
           
           class="h-16"
           v-if="blok.image">
      {{ blok.name }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props:{blok: {required: true, type: Object}},
  
}
</script>
