<template>
  <div id="application" ref="application" :class="`theme-${actual_theme}`">
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
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dark_mode: localStorage.getItem("dark_mode") === "true"
    };
  },
  computed: {
    actual_theme() {
      return this.dark_mode ? "dark" : "light";
    }
  },
  methods: {
    theme_switch() {
      this.dark_mode = !this.dark_mode;
      localStorage.setItem("dark_mode", this.dark_mode);
    }
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
    transition-property: opacity;
    transition-duration: var(--transition-duration);
    transition-timing-function: ease-out;

    &:hover {
      opacity: 0.6;
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
</style>
