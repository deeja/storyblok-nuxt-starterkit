<template>
  <section v-editable="blok" class="mb-2">
    <div class="flex justify-center">
      <div v-if="blok.style == 'right'" class="w-full sm:w-3/12 text-center">
        <a class="button-standard" :href="blok.button_link.cached_url">{{
          blok.button_text
        }}</a>
      </div>
      <div
        v-if="blok.style == 'right'"
        class="w-full sm:w-9/12 text-center sm:text-right"
      >
        <h2>{{ blok.headline }}</h2>
      </div>
      <div v-if="blok.style != 'right'" class="w-full sm:w-9/12 text-left">
        <h2>{{ blok.headline }}</h2>
      </div>
      <div
        v-if="blok.style != 'right'"
        class="w-full sm:w-3/12 text-left sm:text-center"
      >
        <a class="button-standard" :href="blok.button_link.cached_url">{{
          blok.button_text
        }}</a>
      </div>
    </div>

    <div v-if="blok.image" class="row pt-5">
      <div class="w-full">
        <img alt="image" class="img-fluid" :src="blok.image" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
