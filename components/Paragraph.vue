<template>
  <div
    v-editable="blok"
    :class="blok.style.join(' ')"
    v-html="markdownText"
  ></div>
</template>

<script>
import marked from 'marked';

export default {
  props: { blok: { required: true, type: Object } },
  computed: {
    markdownText() {
      return marked(this.blok.text);
    }
  }
};
</script>
