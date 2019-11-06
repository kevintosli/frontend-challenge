<template>
  <div
    :class="['filters-field-wrapper unselectable', {}]"
    tabindex="-1"
    @focus="onFocus"
    @blur="onBlur"
    ontouchstart=""
  >
    <div
      :class="[
        ' d3-card _button',
        {
          __focus: input_focus
        }
      ]"
      @click="toggleDropdown"
    >
      <div class="_value">{{ value }}</div>
      <d3-icon class="icon ion-ios-arrow-down" />
    </div>
    <ul
      :class="[
        'd3-card _dropdown',
        {
          __visible: dropdown_visible
        }
      ]"
    >
      <li
        class="_dropdown-item"
        v-for="(option, index) in options"
        :key="index"
        ontouchstart=""
      >
        {{ option.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FiltersField",
  props: {
    value: {
      type: String,
      default: "Filter"
    },
    selected: {
      type: Number,
      default: -1
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      input_focus: false,
      dropdown_visible: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdown_visible = !this.dropdown_visible;
    },
    onFocus() {
      this.input_focus = true;
    },
    onBlur() {
      this.input_focus = false;
      this.dropdown_visible = false;
    }
  }
};
</script>

<style lang="scss">
.filters-field-wrapper {
  outline: none;
  position: relative;

  ._button {
    align-items: center;
    border: 2px solid transparent;
    display: flex;
    font-weight: 600;
    flex-direction: row;
    height: 56px;
    padding: 8px 24px;
    transition-property: border-color;
    transition-duration: var(--transition-duration);
    transition-timing-function: ease-out;

    &:hover {
      color: var(--color-accent) !important;
    }
    &:active {
      background-color: var(--color-accent);
      color: var(--color-background-elements);
    }
    &.__focus {
      border-color: var(--color-accent);
    }

    ._value {
      color: inherit;
      flex-grow: 1;
    }
    d3-icon {
      color: inherit;
      font-size: 16px;
      margin-left: 16px;
    }
  }

  ._dropdown {
    list-style: none;
    margin: 8px 0;
    min-width: 100%;
    padding: 8px 24px;
    position: absolute;
    right: 0;
    top: 56px;
    transition-property: transform, opacity, visibility;
    transition-duration: var(--transition-duration);
    transition-timing-function: ease-out;

    &:not(.__visible) {
      transform: translateY(-8px);
      opacity: 0;
      visibility: hidden;
    }
    &.__visible {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    ._dropdown-item {
      border-radius: 2px;
      margin: 0 -16px;
      padding: 0 24px;
      line-height: 36px;

      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
      &:active {
        background-color: var(--color-accent);
      }
    }
  }
}
.theme-light {
  .filters-field-wrapper {
    ._dropdown {
      ._dropdown-item {
        &:active {
          color: var(--color-background-elements);
        }
      }
    }
  }
}
.theme-dark {
  .filters-field-wrapper {
    ._dropdown {
      ._dropdown-item {
        &:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
        &:active {
          background-color: var(--color-accent);
        }
      }
    }
  }
}
</style>
