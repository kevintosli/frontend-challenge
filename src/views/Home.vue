<template>
  <div class="page-home">
    <div class="action-bar">
      <SearchField placeholder="Search for a country..." class="input-search" />
      <!-- Filters -->
    </div>

    <!-- Cards -->
  </div>
</template>

<script>
import SearchField from "@components/SearchField.vue";

export default {
  name: "home",
  components: {
    SearchField
  }
};
</script>

<style lang="scss">
.page-home {
  .input-search {
    max-width: 480px;
  }
}
</style>
