<template>
  <section v-editable="blok" class="fdb-block">
    <div>
      <div class="full-width">
        <h1>{{ blok.headline }}</h1>
      </div>
      <div class="flex">
        <div class="md:w-8/12">
          <div class="mb-4 border rounded" :key="article.id" v-for="article in articles">
            <img
              v-if="article.content.teaser_image"
              class="w-full"
              :src="article.content.teaser_image | resize('500x200')"
              alt="image"
            />

            <div class="m-3">
              <h2>{{ article.name }}</h2>
              <div class="card-text mb-3">
                <markdown :text="article.content.intro"></markdown>
              </div>
              <nuxt-link :to="`/${article.full_slug}`" class="button-standard">Read More →</nuxt-link>
            </div>
            <div class="p-2 bg-gray-100 text-gray-600 border-t">Posted on {{ article.published_at }}</div>
          </div>
        </div>

        <div class="md:w-4/12 px-2">
          <div class="border rounded pb-2 mb-2">
            <h4 class="bg-gray-100 border-b pl-2">Categories</h4>

            <ul class="pl-2">
              <li v-for="category in categories" :key="category.id">
                {{ category.name }}
              </li>
            </ul>
          </div>

          <div class="border rounded pb-2">
            <h4 class="bg-gray-100 border-b pl-2">Authors</h4>
            <div class="flex items-center mb-2 p-2" v-for="author in authors" :key="author.id">
              <div class="mr-2 h-8">
                <img class="max-h-full" :src="author.content.image" />
              </div>
              <p>{{ author.content.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    authors() {
      return this.$store.getters.getStories("authors/");
    },
    categories() {
      return this.$store.getters.getStories("categories/");
    },
    articles() {
      return this.$store.getters.getStories("article/");
    }
  },
  props: { blok: { required: true, type: Object } },
  mounted() {
    // TODO: Implement {exists: params.filter}
    this.$store.dispatch("fetchStories", "authors/");
    this.$store.dispatch("fetchStories", "categories/");
    this.$store.dispatch("fetchStories", "article/");
  }
};
</script>
