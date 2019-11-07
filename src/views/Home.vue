<template>
  <div class="page-home">
    <div class="action-bar">
      <div class="left">
        <SearchField
          placeholder="Search for a country..."
          class="input-search"
          @input="searchFor"
        />
      </div>
      <div class="right">
        <FiltersField
          text="Filter by Region"
          :options="regions"
          class="input-filters"
          @change="toFilter"
        />
      </div>
    </div>

    <div class="countries-list">
      <CountryCard
        v-for="country in shown_countries"
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
      filter: false,
      search: "",
      regions: [
        {
          id: 0,
          text: "All regions",
          value: false
        },
        {
          id: 1,
          text: "Africa",
          value: "Africa"
        },
        {
          id: 2,
          text: "Americas",
          value: "Americas"
        },
        {
          id: 3,
          text: "Asia",
          value: "Asia"
        },
        {
          id: 4,
          text: "Europe",
          value: "Europe"
        },
        {
          id: 5,
          text: "Oceania",
          value: "Oceania"
        }
      ]
    };
  },
  computed: {
    countries() {
      return this.$parent.countries;
    },
    shown_countries() {
      if (!this.filter && !this.search) return this.countries;
      let RESULT = [];
      if (this.filter && !this.search) {
        RESULT = this.countries.filter(c => this.filter == c.region);
      }
      if (this.search) {
        RESULT = this.countries.filter(c =>
          c.name.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      return RESULT;
    }
  },
  methods: {
    countryDetails(code) {
      this.$router.push({
        name: "details",
        params: {
          country_code: code
        }
      });
    },
    toFilter(event) {
      this.filter = event.value;
    },
    searchFor(event) {
      setTimeout(() => {
        this.search = event;
      }, 320);
    }
  },
  mounted() {
    if (this.countries.length) {
      document.title = "Where in the world?";
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
      justify-content: flex-end;

      @media screen and (max-width: 420px) {
        flex-grow: 1;
      }
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

  .countries-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    @media screen and (min-width: 421px) {
      margin: 0 -16px;
    }

    ._loading {
      padding: 0 16px;
      text-align: center;
    }
  }
}
</style>
