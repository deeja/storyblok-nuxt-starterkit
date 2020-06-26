<template>
  <img v-editable="blok"
       :alt="blok.alt_text"
       :class="blok.style.join(' ')"
       :src="blok.image || '//placehold.it/300x300'" />
</template>

<script>
export default {
  props:{blok: {required: true, type: Object}}
}
</script>
