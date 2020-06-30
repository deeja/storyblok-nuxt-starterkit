<template>
  <div class="markdown" v-html="markdownText"></div>
</template>

<script>
import marked from 'marked';

export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    markdownText() {
      if (typeof this.text !== 'undefined') {
        return marked(this.text);
      }
      return '';
    }
  }
};
</script>
