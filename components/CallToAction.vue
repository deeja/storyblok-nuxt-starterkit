<template>
  <div
    v-editable="blok"
    class="md:py-10"
    :class="blok.section_style.join(' ')"
    :style="backgroundStyles"
  >
    <div :class="blok.container_style.join(' ')">
      <div class="flex flex-wrap" :class="rowStyle">
        <div
          v-if="blok.image && blok.image_position == 'left'"
          class="w-full sm:w-6/12"
        >
          <img alt="Image" class="img-fluid" :src="blok.image" />
        </div>

        <div :class="columnStyle" class="bg-white p-2 md:rounded-md">
          <img
            v-if="blok.icon"
            :alt="blok.icon_alt_text"
            class="h-16 inline"
            :src="blok.icon"
          />

          <p v-if="blok.logo" class="mb-5 mt-5">
            <img
              :alt="blok.logo_alt_text"
              class="h-16 inline"
              :src="blok.logo"
            />
          </p>

          <div :class="boxStyle">
            <h1 v-if="blok.headline" class="text-5xl">{{ blok.headline }}</h1>

            <h2 v-if="blok.headline_2" class="text-xl">
              {{ blok.headline_2 }}
            </h2>

            <h3 v-if="blok.subheadline">
              <strong>{{ blok.subheadline }}</strong>
            </h3>

            <markdown v-if="blok.text" :text="blok.text"></markdown>

            <p v-if="blok.social_icons" class="text-h2">
              <component
                :is="child.component | dashify"
                v-for="child in blok.social_icons"
                :key="child._uid"
                :blok="child"
              ></component>
            </p>
          </div>

          <component
            :is="child.component | dashify"
            v-for="child in blok.buttons"
            :key="child._uid"
            :blok="child"
          ></component>
          <div
            v-if="blok.image && blok.image_position == 'left'"
            class="w-full sm:w-4/12 md:w-6/12 lg:w-4/12 m-auto pt-5"
          >
            <img alt="image" class="img-fluid br-0" :src="blok.image" />
          </div>
        </div>
        <div
          v-if="blok.bottom_body && blok.bottom_body.length"
          :class="columnStyle"
        >
          <component
            :is="child.component | dashify"
            v-for="child in blok.bottom_body"
            :key="child._uid"
            :blok="child"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { resizeImage } from './../helpers/Storyblok';
export default {
  props: { blok: { required: true, type: Object } },
  computed: {
    backgroundStyles() {
      let background = this.blok.background;
      if (!background) {
        return {};
      }

      if (!background.includes('.svg')) {
        background = this.resizeBackground(background);
      }
      return {
        backgroundImage: `url(${background})`,
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'center center'
      };
    },
    rowStyle() {
      const styles = this.blok.row_style.join(' ');
      return styles
        .replace('justify-content-', 'justify-')
        .replace('align-items-', 'items-');
    },
    boxStyle() {
      if (this.blok.in_box) {
        return `fdb-box ${(this.box_style || []).join(' ')}`;
      }
      return '';
    },
    columnStyle() {
      let style = this.blok.column_style.join(' ') + ' ';
      style += this.blok.width.xsmall ? `w-${this.blok.width.xsmall}/12 ` : '';
      style += this.blok.width.small ? `sm:w-${this.blok.width.small}/12 ` : '';
      style += this.blok.width.medium
        ? `md:w-${this.blok.width.medium}/12 `
        : '';
      style += this.blok.width.large ? `lg:w-${this.blok.width.large}/12 ` : '';
      style += this.blok.width.xlarge
        ? `xl:w-${this.blok.width.xlarge}/12 `
        : '';
      return style;
    }
  },
  methods: {
    resizeBackground: (imageSrc) => {
      return resizeImage(imageSrc, '0x800');
    }
  }
};
</script>
