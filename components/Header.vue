<template>
  <header v-editable="blok" :class="blok.style.join(' ')" class="full-width">
    <nav class="md:mx-auto md:w-2/3 md:my-2 p-2 md:p-0">
      <div class="flex">
        <button
          type="button"
          aria-expanded="false"
          aria-label="Toggle navigation"
          class="p-2 border inline-block md:hidden"
          @click.prevent="showItemsMobile = !showItemsMobile"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              class="heroicon-ui"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
        <nuxt-link
          v-if="blok.logo"
          :to="`/${blok.logo_link.cached_url}`"
          class="mr-3 mt-1"
        >
          <img :src="blok.logo" class="h-10 inline-block" alt="Logo" />
        </nuxt-link>

        <div
          v-if="blok.nav_links && blok.nav_links.length"
          class="hidden md:flex"
        >
          <component
            :is="child.component | dashify"
            v-for="child in blok.nav_links"
            :key="child._uid"
            class="p-2 hover:text-blue-400"
            :blok="child"
          ></component>
        </div>

        <ul
          v-if="blok.second_nav_links && blok.second_nav_links.length"
          class="hidden md:flex"
        >
          <component
            :is="child.component | dashify"
            v-for="child in blok.second_nav_links"
            :key="child._uid"
            :blok="child"
          ></component>
        </ul>
      </div>

      <ul
        v-if="showItemsMobile && blok.nav_links && blok.nav_links.length"
        class="flex-column md:hidden"
      >
        <component
          :is="child.component | dashify"
          v-for="child in blok.nav_links"
          :key="child._uid"
          class="p-2 hover:text-blue-400"
          :blok="child"
        ></component>
      </ul>
      <!--
     -->
      <!--
      <a
        v-if="blok.button_text"
        class="border-2 border-blue-600 hover:bg-blue-600 text-blue-600 hover:text-white px-3 py-2 self-end"
        :href="blok.button_link.cached_url"
      >{{ blok.button_text }}</a>-->
    </nav>
  </header>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } },
  data() {
    return { showItemsMobile: false };
  }
};
</script>
