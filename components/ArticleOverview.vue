<template>
  <section v-editable="blok" class="fdb-block">
    <div class="">
      <div class="row">
        <div class="md:w-8/12">
          <h1>{{ blok.headline }}</h1>

          <div class="card mb-4" :key="article.id" v-for="article in articles">
            <img
              v-if="article.content.teaser_image"
              class="card-img-top"
              :src="article.content.teaser_image | resize('500x200')"
              alt="image"
            />

            <div class="card-body">
              <h2 class="card-title">{{ article.name }}</h2>
              <div class="card-text mb-3">
                <markdown :text="article.content.intro"></markdown>
              </div>
              <nuxt-link :to="`/${article.full_slug}`" class="btn btn-primary">Read More →</nuxt-link>
            </div>
            <div class="card-footer text-muted">Posted on {{ article.published_at }}</div>
          </div>
        </div>

        <div class="md:w-4/12">
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <ul class="list-unstyled mb-0">
                <li v-for="category in categories" :key="category.id">
                  <a :href="`?filter=${category.uuid}`">{{ category.name }}</a>
                </li>
              </ul>
            </div>
          </div>

          <div class="card my-4">
            <h5 class="card-header">Authors</h5>
            <div class="card-body">
              <div class="d-flex align-items-center mb-2" v-for="author in authors" :key="author.id">
                <div class="mr-2">
                  <img height="30" :src="author.content.image" />
                </div>
                <p>{{ author.content.name }}</p>
              </div>
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
