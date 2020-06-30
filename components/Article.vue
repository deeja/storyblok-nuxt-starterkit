<template>
  <div v-editable="blok" class="border lg:px-3 md:p-1 mb-5 rounded">
    <div class="w-full text-left">
      <h2 class="text-4xl">{{ blok.title }}</h2>
    </div>
    <div class="flex flex-wrap">
      <div class="w-full md:w-8/12 text-left">
        <img
          v-if="blok.teaser_image"
          :src="blok.teaser_image | resize('800x0')"
          class="img-fluid"
          alt="image"
        />

        <p class="m-1">
          <markdown :text="blok.intro"></markdown>
        </p>

        <markdown :text="blok.long_text"></markdown>
      </div>
      <div class="w-full md:w-4/12 px-2 pt-2 md:pt-0">
        <div class="border rounded pb-2 mb-2">
          <h4 class="bg-gray-100 border-b pl-2">Categories</h4>
          <ul class="pl-2">
            <li v-for="category in categories" :key="category.id">
              {{ category.name }}
            </li>
          </ul>
        </div>
        <div v-if="author" class="border rounded pb-2">
          <h4 class="bg-gray-100 border-b pl-2">Author</h4>
          <div class="flex items-center mb-2 p-2">
            <div class="mr-2 h-8">
              <img class="max-h-full" :src="author.content.image" />
            </div>
            <p>{{ author.content.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const startsWith = 'categories/';

export default {
  props: { blok: { required: true, type: Object } },
  async fetch() {
    await this.$store.dispatch('fetchStories', startsWith);
    this.categories = this.$store.getters.getStories(startsWith);

    if (this.blok.author) {
      await this.$store.dispatch('fetchStoryById', this.blok.author.id);
      this.author = this.$store.getters.getStoryById(this.blok.author.id);
    }
  },
  data() {
    return { categories: [], author: null };
  }
};
</script>
