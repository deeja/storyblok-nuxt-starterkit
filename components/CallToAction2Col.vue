<template>
  <section class="fdb-block"
           v-editable="blok">
    <div class="">
      <div class="row align-items-center">
        <div class="w-full  sm:w-3/12 text-center"
             v-if="blok.style == 'right'">
          <a class="btn"
             :href="blok.button_link.cached_url">
            {{ blok.button_text }}
          </a>
        </div>
        <div class="w-full  sm:w-9/12 text-center text-sm-right mt-4 mt-sm-0"
             v-if="blok.style == 'right'">
          <h2>{{ blok.headline }}</h2>
        </div>
        <div class="w-full  sm:w-9/12 text-left"
             v-if="blok.style != 'right'">
          <h2>{{ blok.headline }}</h2>
        </div>
        <div class="w-full  sm:w-3/12 text-left text-sm-center mt-4 mt-sm-0"
             v-if="blok.style != 'right'">
          <a class="btn"
             :href="blok.button_link.cached_url">
            {{ blok.button_text }}
          </a>
        </div>
      </div>

      <div class="row pt-5"
           v-if="blok.image">
        <div class="w-full ">
          <img alt="image"
               class="img-fluid"
               :src="blok.image">
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  props:{blok: {required: true, type: Object}}
}
</script>
