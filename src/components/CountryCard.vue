<template>
  <div class="d3-card country-card-wrapper" @click="$emit('click', id)">
    <div class="_flag unselectable" v-if="flag">
      <img :src="flag" />
    </div>
    <div class="_title">{{ name }}</div>
    <div class="_region" v-if="region">
      <strong>Region:</strong> {{ region }}
    </div>
    <div class="_population" v-if="population">
      <strong>Population:</strong> {{ population }}
    </div>
    <div class="_capital" v-if="capital">
      <strong>Capital:</strong> {{ capital }}
    </div>
  </div>
</template>

<script>
export default {
  name: "CountryCard",
  props: {
    id: {
      type: [Number, String],
      required: true
    },
    name: {
      type: String,
      default: "Country name"
    },
    region: String,
    population: [String, Number],
    capital: String,
    flag: String
  }
};
</script>

<style lang="scss">
.country-card-wrapper {
  overflow: hidden;
  max-width: 260px;
  padding: 24px;
  padding-bottom: 40px;

  @media screen and (max-width: 420px) {
    max-width: 420px;
    width: auto;
  }

  ._flag {
    background-color: rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 150px;
    margin: -24px;
    margin-bottom: 24px;
    overflow: hidden;
    width: auto;

    @media screen and (max-width: 420px) {
      height: 200px;
    }

    img {
      flex-grow: 1;
      flex-shrink: 0;
      display: block;
      min-height: 100%;
      min-width: 100%;
      max-width: 200%;
    }
  }
  ._title {
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 20px;
  }
  ._region,
  ._population,
  ._capital {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
