<template>
  <div
    :class="[
      'search-field-wrapper d3-card',
      {
        __focus: input_focus
      }
    ]"
  >
    <d3-icon class="icon ion-ios-search" />
    <input
      class="_input"
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
  border: 2px solid transparent;
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
  ._input {
    background: none;
    border: none;
    color: inherit;
    display: block;
    font: inherit;
    font-weight: 600;
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
