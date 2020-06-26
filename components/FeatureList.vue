<template>
  <div class="flex text-center p-5 w-full justify-around"
       v-editable="blok">
    <component :key="blok._uid" class="p-2"
               v-for="blok in blok.body"
               :blok="blok"
               :is="blok.component | dashify"></component>
  </div>
</template>

<script>
export default {
  props:{blok: {required: true, type: Object}}
}
</script>
