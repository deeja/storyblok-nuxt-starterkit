<template>
  <div class="markdown" v-html="parsed"></div>
</template>

<script>
import { markdown } from "@/plugins/helper";

export default {
  props: ["content"],
  computed: {
    parsed() {
      // Parse markdown using "marked" and add a parameter for the
      // Storyblok Image Service: https://www.storyblok.com/docs/image-service
      return markdown(this.content, "700x0");
    }
  }
};
</script>

<style>
.markdown {
  margin-bottom: 40px;
}
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  font-weight: 300;
}
.markdown h2 {
  padding-bottom: 10px;
  border-bottom: 1px solid #888;
}
.markdown img {
  transition: transform 100ms ease;
  border-radius: 4px;
}
@media screen and (min-width: 840px) {
  .markdown img {
    width: 110%;
    max-width: 110%;
    transform: translateX(-5%);
  }
}
.markdown a {
  border-bottom: 0px;
  color: #42b883;
  font-weight: 600;
  text-decoration: none;
}
.markdown a:hover {
  color: #42b883;
  text-decoration: underline;
}
.markdown li {
  padding-bottom: 5px;
}
.markdown li ul,
.markdown li ol {
  padding-top: 5px;
}
.markdown p {
  line-height: 1.5;
}
.markdown p code {
  display: inline;
  background: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  font-family: Consolas, monospace, serif;
  font-size: 90%;
}
.markdown pre {
  display: block;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
  border: 1px solid #d8d8d8;
  font-size: 14px;
  font-family: Consolas, monospace, serif;
  color: #444;
  tab-size: 4;
  overflow: auto;
}
.markdown table {
  width: 100%;
  border-collapse: collapse;
}
.markdown table th,
.markdown table td {
  border: 1px solid #ddd;
  padding: 15px;
  text-align: left;
}
.markdown iframe {
  max-width: 100%;
}
</style>