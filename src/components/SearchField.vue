<template>
  <div
    :class="[
      'search-field-wrapper',
      {
        __focus: input_focus
      }
    ]"
  >
    <d3-icon class="icon ion-ios-search" />
    <input
      class="__input"
      type="search"
      :placeholder="placeholder"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script>
export default {
  name: "SearchField",
  props: {
    placeholder: {
      type: String,
      default: "Search"
    }
  },
  data() {
    return {
      input_focus: false
    };
  },
  methods: {
    onFocus() {
      this.input_focus = true;
    },
    onBlur() {
      this.input_focus = false;
    }
  }
};
</script>

<style lang="scss">
.search-field-wrapper {
  align-items: center;
  background-color: var(--color-background-elements);
  border: 2px solid transparent;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-1);
  color: var(--color-text);
  display: flex;
  flex-direction: row;
  transition-property: border-color;
  transition-duration: var(--transition-duration);
  transition-timing-function: ease-out;

  d3-icon {
    color: var(--color-input-placeholder);
    font-size: 24px;
    margin-left: 24px;
  }
  .__input {
    background: none;
    border: none;
    display: block;
    font: inherit;
    padding: 16px 24px;
    width: 100%;

    &::placeholder {
      color: var(--color-input-placeholder);
    }
  }
  &.__focus {
    border-color: var(--color-accent);
  }
}
</style>
