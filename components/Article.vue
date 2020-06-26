<template>
  <section  v-editable="blok">
    <div class>
      <div class="w-full text-left">
          <h2 class="text-4xl">{{ blok.title }}</h2>
        </div> <div class="flex">
        <div class="w-8/12 text-left">
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
        <div class="w-4/12 ml-5">
          <div v-if="author">
            <h3 class="text-xl pb-1">Author</h3>
            <div class="flex items-center mb-2">
              <div class="mr-2">
                <img class="h-12" :src="author.content.image" />
              </div>
              <p>{{ author.content.name }}</p>
            </div>
          </div>
          <h3 class="mt-5 text-xl pb-1">Categories</h3>
          <ul class="mb-0 list-disc list-inside">
            <li v-for="category in categories" :key="category.id">{{ category.name }}</li>
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
