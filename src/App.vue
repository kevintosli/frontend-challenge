<template>
  <div id="application" ref="application" :class="`theme-${actual_theme}`">
    <div id="loading" v-if="!is_loaded">
      <div class="_indicator"></div>
      Wait a bit while we get all countries of the world
    </div>

    <div id="navbar" class="unselectable">
      <div class="g-wrapper">
        <div class="left">
          <h1>Where in the world?</h1>
        </div>
        <div class="right">
          <a class="btn-themeswitch" @click="theme_switch"
            ><d3-icon class="icon ion-ios-color-palette" />Dark Mode</a
          >
        </div>
      </div>
    </div>

    <div id="page-content">
      <div class="g-wrapper">
        <div class="g-actionbar" v-if="!is_url_root">
          <div
            class="back-button d3-card"
            @click="$router.push({ name: 'home' })"
          >
            <d3-icon class="icon ion-ios-arrow-back" />Back
          </div>
        </div>
        <transition name="page" @enter="beforeEnter">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "@js/http";

export default {
  data() {
    return {
      dark_mode: localStorage.getItem("dark_mode") === "true",
      is_url_root: true,
      countries: []
    };
  },
  watch: {
    $route() {
      this.is_url_root = this.$route.name == "home";
    }
  },
  computed: {
    actual_theme() {
      return this.dark_mode ? "dark" : "light";
    },
    is_loaded() {
      if (this.countries.length) {
        document.title = "Where in the world?";
      }
      return !!this.countries.length;
    }
  },
  methods: {
    theme_switch() {
      this.dark_mode = !this.dark_mode;
      localStorage.setItem("dark_mode", this.dark_mode);
    },
    beforeEnter() {
      document.querySelector("html").scrollTop = 0;
    },

    // API request
    fetchCountries() {
      const REQUEST = {
        method: "get",
        url: "https://restcountries.eu/rest/v2/all"
      };
      http(REQUEST)
        .then(({ data }) => {
          this.countries = data;
        })
        .catch(err => {
          alert(
            "Sorry, we couldn't load the countries. Please refresh the page to try again."
          );
          window.console.warn(err);
        });
    }
  },
  created() {
    this.fetchCountries();
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:300,600,800&display=swap");

// Variables
.theme-light {
  --color-background-elements: hsl(0, 0%, 100%);
  --color-background-page: hsl(0, 0%, 98%);
  --color-input-placeholder: hsl(0, 0%, 52%);
  --color-text: hsl(200, 15%, 8%);
  --shadow-1: 0 2px 16px rgba(0, 0, 0, 0.12);
}
.theme-dark {
  --color-background-elements: hsl(209, 23%, 22%);
  --color-background-page: hsl(207, 26%, 17%);
  --color-input-placeholder: hsl(0, 0%, 100%);
  --color-text: hsl(0, 0%, 100%);
  --shadow-1: 0 2px 16px rgba(0, 0, 0, 0.18);
}
#application {
  --color-accent: #ec407a;
  --border-radius: 6px;
  --transition-duration: 140ms;
}

// HTML Defaults
* {
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
input {
  font: inherit;
}
img {
  display: block;
  -webkit-user-drag: none;
  user-drag: none;
}
a {
  -webkit-user-drag: none;
}
h1 {
  margin: 0;
}
strong {
  font-weight: 600;
}
::selection {
  background: var(--color-accent);
  color: white;
}
.unselectable {
  user-select: none;
}

// Application settings
#application {
  background-color: var(--color-background-page);
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 300;
  color: var(--color-text);
  cursor: default;

  // Common classes
  .d3-card {
    background-color: var(--color-background-elements);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-1);
    color: var(--color-text);
  }
  .g-wrapper {
    margin: 0 auto;
    max-width: 1280px;
  }
  .g-actionbar {
    display: flex;
    flex-direction: row;
    margin-bottom: 80px;
  }
  .back-button {
    align-items: center;
    display: inline-flex;
    flex-direction: row;
    font-weight: 600;
    height: 40px;
    padding: 8px 24px;
    padding-right: 32px;
    transition-property: color;
    transition-duration: var(--transition-duration);
    transition-timing-function: ease-out;
    width: auto;

    d3-icon {
      font-size: 24px;
      margin-right: 8px;
    }

    &:hover {
      color: var(--color-accent);
      cursor: pointer;
    }
  }
}

#loading {
  align-items: center;
  background-color: var(--color-background-page);
  bottom: 0;
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  opacity: 0.9;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 500;

  ._indicator {
    --size: 40px;
    animation-name: pulse, blink;
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-play-state: running;
    border: 6px solid;
    border-color: var(--color-input-placeholder);
    border-radius: 999px;
    height: var(--size);
    margin-bottom: 24px;
    width: var(--size);
  }

  @keyframes pulse {
    from {
      transform: scale(0.2);
    }
    to {
      transform: scale(1.1);
    }
  }
  @keyframes blink {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}

#navbar {
  align-items: center;
  background-color: var(--color-background-elements);
  box-shadow: var(--shadow-1);
  font-size: 16px;
  font-weight: 600;
  left: 0;
  padding: 24px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 400;

  @media screen and (max-width: 420px) {
    padding: 24px 16px;
  }

  .g-wrapper {
    display: flex;
    flex-direction: row;
  }
  a {
    align-items: center;
    display: flex;
    transition-property: color;
    transition-duration: var(--transition-duration);
    transition-timing-function: ease-out;

    &:hover {
      color: var(--color-accent);
    }
  }
  .left,
  .right {
    align-items: center;
    display: flex;
    flex-direction: row;
  }
  .left {
    flex-grow: 1;

    h1 {
      @media screen and (max-width: 420px) {
        font-size: 18px;
      }
      font-size: 24px;
    }
  }
  .right {
    d3-icon {
      font-size: 24px;
      margin-right: 8px;
    }
  }
  .btn-themeswitch {
    cursor: pointer;
  }
}

#page-content {
  padding: 48px 24px;
  padding-top: calc(48px + 82px);
  min-height: 100vh;

  @media screen and (max-width: 420px) {
    padding: 48px 16px;
    padding-top: calc(48px + 82px);
  }
}

.page-enter-active {
  transition-property: transform, opacity;
  transition-duration: 280ms;
  transition-timing-function: ease-in-out;
}
.page-leave-active {
  transition-duration: 0;
  position: absolute;
  visibility: hidden;
}
.page-enter {
  opacity: 0;
  transform: translateY(20px);
}
.page-enter-to .page-leave {
  opacity: 1;
  transform: translateY(0px);
}
</style>
