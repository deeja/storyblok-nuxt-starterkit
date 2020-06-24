import Vue from "vue";

Vue.filter("resize", (image, size) => {
  if (typeof image !== "undefined") {
    return (
      "//img2.storyblok.com/" + size + image.replace("//a.storyblok.com", "")
    );
  }
  return null;
});

Vue.filter("dashify", function(value) {
  if (typeof value === "undefined") {
    return "undefined";
  }
  let dashified = value
    .toString()
    .replace(/([A-Z])/g, " $1")
    .trim()
    .toLowerCase()
    .replace(/[ _]/g, "-");

    return value
    .split("_")
    .map(([a, ...b]) => {
      return [a.toUpperCase(), ...b].join("");
    })
    .join("");

  return "blok-" + dashified;
});

Vue.filter("snakeToPascal", function(snake) {
  if (typeof value === "undefined") {
    return "undefined";
  }
  console.log("Here snakey snake: ", snake)

  return snake
    .split("_")
    .map(([a, ...b]) => {
      return [a.toUpperCase(), ...b].join("");
    })
    .join("");
});
