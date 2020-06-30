<template>
  <header v-editable="blok" :class="blok.style.join(' ')">
    <div>
      <nav class="navbar navbar-expand-md no-gutters">
        <template v-if="blok.logo_in_middle">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            :data-target="`#navbar-${blok._uid}`"
            :aria-controls="`navbar-${blok._uid}`"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="w-4/12 md:w-2/12 text-right md:text-center">
            <nuxt-link v-if="blok.logo" :to="`/${blok.logo_link.cached_url}`">
              <img :src="blok.logo" class="h-12" alt="Logo" />
            </nuxt-link>
          </div>

          <div
            :id="`navbar-${blok._uid}`"
            class="collapse navbar-collapse w-full md:w-5/12"
          >
            <ul
              v-if="blok.nav_links && blok.nav_links.length"
              class="navbar-nav"
              :class="blok.main_nav_style.join(' ')"
            >
              <component
                :is="child.component | dashify"
                v-for="child in blok.nav_links"
                :key="child._uid"
                :blok="child"
              ></component>
            </ul>
          </div>

          <ul
            v-if="blok.second_nav_links && blok.second_nav_links.length"
            class="navbar-nav justify-content-end sm:w-5/12 none md:flex"
          >
            <component
              :is="child.component | dashify"
              v-for="child in blok.second_nav_links"
              :key="child._uid"
              :blok="child"
            ></component>
          </ul>
        </template>
        <template v-if="!blok.logo_in_middle">
          <div class="w-3/12 text-left">
            <nuxt-link v-if="blok.logo" :to="`/${blok.logo_link.cached_url}`">
              <img :src="blok.logo" class="h-12" alt="Logo" />
            </nuxt-link>
          </div>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            :data-target="`#navbar-${blok._uid}`"
            :aria-controls="`navbar-${blok._uid}`"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            :id="`navbar-${blok._uid}`"
            class="collapse navbar-collapse justify-content-center md:w-6/12"
          >
            <ul
              v-if="blok.nav_links && blok.nav_links.length"
              class="navbar-nav"
              :class="blok.main_nav_style.join(' ')"
            >
              <component
                :is="child.component | dashify"
                v-for="child in blok.nav_links"
                :key="child._uid"
                :blok="child"
              ></component>
            </ul>
          </div>

          <div
            v-if="blok.button_text"
            :id="`navbar-${blok._uid}`"
            class="collapse navbar-collapse"
          >
            <ul
              v-if="blok.second_nav_links && blok.second_nav_links.length"
              class="navbar-nav ml-auto justify-content-end"
            >
              <component
                :is="child.component | dashify"
                v-for="child in blok.second_nav_links"
                :key="child._uid"
                :blok="child"
              ></component>
            </ul>

            <a
              class="button-standard ml-md-3"
              :href="blok.button_link.cached_url"
            >
              {{ blok.button_text }}
            </a>
          </div>

          <ul
            v-if="!blok.button_text && blok.second_nav_links"
            class="navbar-nav w-3/12 justify-content-end d-none md:flex"
          >
            <component
              :is="child.component | dashify"
              v-for="child in blok.second_nav_links"
              :key="child._uid"
              :blok="child"
            ></component>
          </ul>
        </template>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  props: { blok: { required: true, type: Object } }
};
</script>
