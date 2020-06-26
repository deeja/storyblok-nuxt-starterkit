<template>
  <component v-editable="blok"
             :is="blok.is_inline ? 'span' : 'p'"
             :class="blok.paragraph_style.join(' ')">
    <a :href="blok.link.cached_url"
       class="p-2 border-2 border-blue-400 text-blue-400 hover:text-white hover:bg-blue-400 inline-block"
       :class="blok.style.join(' ')"
       target="_blank">
      {{ blok.text }}
    </a>
  </component>
</template>

<script>
export default {
  props:{blok: {required: true, type: Object}}
}
</script>
