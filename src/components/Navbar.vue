<template>
  <nav class="navbar" :class="{ 'navbar--hidden': !showNavbar }">
    <div class=" ">
      <div class=" ">
        <ul class="">
          <li>
            <a
              href="#home-section"
              @click.prevent="scrollToSection('home-section')"
              class="text-white"
              >Logo</a
            >
          </li>
          <li>
            <a
              href="#about-section"
              @click.prevent="scrollToSection('about-section')"
              class="text-white"
              >About</a
            >
          </li>
          <li>
            <a
              href="#where-section"
              @click.prevent="scrollToSection('services-section')"
              class="text-white"
              >Where?</a
            >
          </li>
          <li>
            <a
              href="#contact-section"
              @click.prevent="scrollToSection('contact-section')"
              class="text-white"
              >Contact</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  setup() {
    return {
      // Expose the State so you can access isPlaying in your template
    };
  },
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0,
    };
  },
  methods: {
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      const yOffset = -0; // Adjust this value to match the height of your navbar
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }
      // Here we determine whether we need to show or hide the navbar
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      // Set the current scroll position as the last scroll position
      this.lastScrollPosition = currentScrollPosition;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
};
</script>

<style>
nav {
  /* background-color: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
    margin: 0 */
}
.navbar {
  height: 60px;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  transform: translate3d(0, 0, 0);
  transition: 0.1s all ease-out;
}
.navbar.navbar--hidden {
  box-shadow: none;
  transform: translate3d(0, -100%, 0);
}
ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}
li {
  display: inline;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
