<template>
  <div class="page-home">
    <div class="action-bar">
      <div class="left">
        <SearchField
          placeholder="Search for a country..."
          class="input-search"
        />
      </div>
      <div class="right">
        <FiltersField
          value="Filter by Region"
          :options="regions"
          class="input-filters"
        />
      </div>
    </div>

    <CountryCard
      v-for="country in countries"
      :id="country.alpha3Code"
      :name="country.name"
      :region="country.region"
      :population="country.population"
      :capital="country.capital"
      :flag="country.flag"
      :key="country.alpha3Code"
      @click="countryDetails"
    />
  </div>
</template>

<script>
import FiltersField from "@components/FiltersField.vue";
import SearchField from "@components/SearchField.vue";
import CountryCard from "@components/CountryCard.vue";

export default {
  name: "home",
  components: {
    FiltersField,
    SearchField,
    CountryCard
  },
  data() {
    return {
      regions: [
        {
          id: 0,
          text: "Africa"
        },
        {
          id: 1,
          text: "America"
        },
        {
          id: 2,
          text: "Asia"
        },
        {
          id: 3,
          text: "Europe"
        },
        {
          id: 4,
          text: "Oceania"
        }
      ],
      countries: [
        {
          alpha3Code: "GER",
          name: "Germany",
          population: 3925029,
          capital: "Berlin",
          region: "Europe",
          flag: "https://restcountries.eu/data/deu.svg"
        }
      ]
    };
  },
  methods: {
    countryDetails(event) {
      window.console.log(event);
    }
  }
};
</script>

<style lang="scss">
.page-home {
  .action-bar {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-bottom: 48px;

    .left,
    .right {
      display: flex;
      flex-direction: row;
    }
    .left {
      flex-grow: 1;
      flex-shrink: 1;
    }
    .right {
      @media screen and (min-width: 421px) {
        margin-left: 16px;
      }
    }

    .input-search {
      @media screen and (max-width: 420px) {
        width: 100%;
      }
      max-width: 480px;
      width: 100%;
    }
    .input-filters {
      @media screen and (max-width: 420px) {
        margin-top: 48px;
      }
    }
  }
}
</style>
