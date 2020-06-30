<template>
  <img
    v-editable="blok"
    :alt="blok.alt_text"
    :class="userDefinedStyles"
    :src="blok.image || '//placehold.it/300x300'"
  />
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } },
  computed: {
    userDefinedStyles() {
      // bootstrap conversion for responsive images
      const styles = this.blok.style.join(' ');
      return styles.includes('img-fluid') ? styles : styles + ' h-8';
    }
  }
};
</script>
