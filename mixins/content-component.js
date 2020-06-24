import marked from "marked";
import { transformImage } from "@/helpers/Storyblok";

export default {
  props: ["blok"],
  computed: {
    markedContent() {
      if (this.blok.text) {
        return marked(this.blok.text);
      }
      if (this.$store.getters.inDraftMode) {
        return "[No Content Set]";
      } else {
        return "";
      }
    }
  },
  methods: {
    transformImage: transformImage
  }
};
