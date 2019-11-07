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
      <div class="_value">
        <template v-if="!input_selected">{{ text }}</template>
        <template v-else
          >Filtering by {{ input_selected }}</template
        >
      </div>
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
        @click="onChange(option)"
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
    text: {
      type: String,
      default: "Filter"
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      input_focus: false,
      input_selected: false,
      dropdown_visible: false
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdown_visible = !this.dropdown_visible;
    },
    onChange(option) {
      this.$emit("change", option);
      this.input_selected = option.value;
      this.dropdown_visible = false;
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
    transition-property: border-color, color;
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
    display: flex;
    flex-direction: column;
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
    z-index: 405;

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
      flex-shrink: 0;
      margin: 0 -16px;
      padding: 0 24px;
      line-height: 36px;
      white-space: nowrap;

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
