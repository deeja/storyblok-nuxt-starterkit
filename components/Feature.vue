<template>
  <div v-editable="blok"
       class="w-full  sm:w-6/12 lg:w-3/12 pt-4 pt-lg-0">
    <img alt="image"
         class="fdb-icon"
         :src="blok.icon">
    <h3><strong>{{ blok.headline }}</strong></h3>
    <p>{{ blok.text }}</p>
  </div>
</template>

<script>
export default {
  props:{blok: {required: true, type: Object}}
}
</script>
