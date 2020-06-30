<template>
  <div v-editable="blok" :class="columnStyle" class="flex-column">
    <component
      :is="child.component | dashify"
      v-for="child in blok.body"
      :key="child._uid"
      :blok="child"
    ></component>
  </div>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } },
  computed: {
    columnStyle() {
      let style = this.blok.style.join(' ') + ' ';
      style += this.blok.width.xsmall ? `w-${this.blok.width.xsmall}/12 ` : '';
      style += this.blok.width.small ? `sm:w-${this.blok.width.small}/12 ` : '';
      style += this.blok.width.medium
        ? `md:w-${this.blok.width.medium}/12 `
        : '';
      style += this.blok.width.large ? `lg:w-${this.blok.width.large}/12 ` : '';
      style += this.blok.width.xlarge
        ? `xl:w-${this.blok.width.xlarge}/12 `
        : '';
      return style;
    }
  }
};
</script>
