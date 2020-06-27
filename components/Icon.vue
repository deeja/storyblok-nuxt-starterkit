<template>
  <a v-editable="blok"
     :href="blok.link.cached_url"
     class="mr-2 ml-2">
    [{{blok.icon.type}} {{blok.icon.icon}}]
  </a>
</template>

<script>
export default {
  props:{blok: {required: true, type: Object}}
}
</script>
