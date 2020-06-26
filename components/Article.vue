<template>
  <section class="fdb-block" v-editable="blok">
    <div class="">
      <div class="row">
        <div class="w-8/12  text-left">
          <h2>{{ blok.title }}</h2>

          <img
            :src="blok.teaser_image | resize('800x0')"
            class="img-fluid"
            alt="image"
            v-if="blok.teaser_image"
          />

          <p>
            <markdown :text="blok.intro"></markdown>
          </p>

          <markdown :text="blok.long_text"></markdown>
        </div>
        <div class="w-4/12 " >
          <div v-if="author">
            <h3>Author</h3>
            <div class="d-flex align-items-center mb-2">
              <div class="mr-2">
                <img height="30" :src="author.content.image" />
              </div>
              <p>{{ author.content.name }}</p>
            </div>
          </div>
          <h3 class="mt-5">Categories</h3>
          <ul class="list-unstyled mb-0">
            <li v-for="category in categories" :key="category.id">
              <a :href="`?filter=${category.uuid}`">{{ category.name }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const startsWith = "categories/";

export default {
  props: { blok: { required: true, type: Object } },
  data() {
    return {};
  },
  computed: {
    author() {
      if (this.blok.author && this.blok.author.id) {
        return this.$store.getters.getStoryById(this.blok.author.id);
      }
    },
    categories() {
      if (this.blok.categories && this.blok.author.id) {
        return this.$store.getters.getStories(startsWith);
      }
    }
  },
  mounted() {
    this.$store.dispatch("fetchStories", startsWith);
    if (this.blok.author) {
      this.$store.dispatch("fetchStoryById", this.blok.author.id);
    }
  }
};
</script>
