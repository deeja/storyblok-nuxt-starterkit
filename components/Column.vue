<template>
  <div v-editable="blok" :class="columnStyle" class="flex">
    <component
      :key="blok._uid"
      v-for="blok in blok.body"
      :blok="blok"
      :is="blok.component | dashify"
    ></component>
  </div>
</template>

<script>
export default {
  computed: {
    columnStyle() {
      let style = this.blok.style.join(" ") + " ";
      style += this.blok.width.xsmall
        ? `w-${this.blok.width.xsmall}/12 `
        : "";
      style += this.blok.width.small
        ? `sm:w-${this.blok.width.small}/12 `
        : "";
      style += this.blok.width.medium
        ? `md:w-${this.blok.width.medium}/12 `
        : "";
      style += this.blok.width.large
        ? `lg:w-${this.blok.width.large}/12 `
        : "";
      style += this.blok.width.xlarge
        ? `xl:w-${this.blok.width.xlarge}/12 `
        : "";
      return style;
    }
  },
  props: { blok: { required: true, type: Object } }
};
</script>
