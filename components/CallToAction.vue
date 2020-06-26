<template>
  <section
    v-editable="blok"
    class="py-32 text-center"
    :class="blok.section_style.join(' ')"
    :style="backgroundStyles"
  >
    <div :class="blok.container_style.join(' ')">
      <div class="flex flex-wrap justify-center" :class="blok.row_style.join(' ')">
        <div
          class="w-full sm:w-8/12 mx-auto"
          thisone
          v-if="blok.image && blok.image_position == 'left'"
        >
          <img alt="Image" class="img-fluid" :src="blok.image" />
        </div>

        <div :class="columnStyle" class="mx-auto">
          <img :alt="blok.icon_alt_text" class="h-16" :src="blok.icon" v-if="blok.icon" />

          <p class="mb-5 mt-5" v-if="blok.logo">
            <img :alt="blok.logo_alt_text" class="h-16" :src="blok.logo" />
          </p>

          <div :class="boxStyle">
            <h1 class="text-5xl" v-if="blok.headline">{{ blok.headline }}</h1>

            <h2 class="text-xl" v-if="blok.headline_2">{{ blok.headline_2 }}</h2>

            <h3 v-if="blok.subheadline">
              <strong>{{ blok.subheadline }}</strong>
            </h3>

            <markdown v-if="blok.text" :text="blok.text"></markdown>

            <p v-if="blok.social_icons" class="text-h2">
              <component
                :key="blok._uid"
                v-for="blok in blok.social_icons"
                :blok="blok"
                :is="blok.component | dashify"
              ></component>
            </p>
          </div>

          <component
            :key="blok._uid"
            v-for="blok in blok.buttons"
            :blok="blok"
            :is="blok.component | dashify"
          ></component>
          <div
            class="w-full sm:w-4/12 md:w-6/12 lg:w-4/12 m-auto pt-5"
            v-if="blok.image && blok.image_position == 'left'"
          >
            <img alt="image" class="img-fluid br-0" :src="blok.image" />
          </div>
        </div>
        <div :class="columnStyle" v-if="blok.bottom_body && blok.bottom_body.length ">
          <component
            :key="blok._uid"
            v-for="blok in blok.bottom_body"
            :blok="blok"
            :is="blok.component | dashify"
          ></component>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { resizeImage } from "./../helpers/Storyblok";
export default {
  props: { blok: { required: true, type: Object } },
  methods: {
    resizeBackground: imageSrc => {
      return resizeImage(imageSrc, "0x800");
    }
  },
  computed: {
    backgroundStyles() {
      const resized = resizeImage(this.blok.background, "0x400");
      return {
        backgroundImage: `url(${resized})`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "background-position": "center center"
      };
    },
    boxStyle() {
      if (this.blok.in_box) {
        return `fdb-box ${(this.box_style || []).join(" ")}`;
      }
      return "";
    },
    columnStyle() {
      let style = this.blok.column_style.join(" ") + " ";
      style += this.blok.width.xsmall ? `w-${this.blok.width.xsmall}/12 ` : "";
      style += this.blok.width.small ? `sm:w-${this.blok.width.small}/12 ` : "";
      style += this.blok.width.medium
        ? `md:w-${this.blok.width.medium}/12 `
        : "";
      style += this.blok.width.large ? `lg:w-${this.blok.width.large}/12 ` : "";
      style += this.blok.width.xlarge
        ? `xl:w-${this.blok.width.xlarge}/12 `
        : "";
      return style;
    }
  }
};
</script>
