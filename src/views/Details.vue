<template>
  <div class="_empty" v-if="!country.name">
    Getting country informations...
  </div>
  <div class="page-details" v-else>
    <div class="leftpane">
      <div class="flag unselectable">
        <img :src="country.flag" />
      </div>
    </div>
    <div class="rightpane">
      <h2>{{ country.name }}</h2>
      <ul class="info">
        <div class="left">
          <li><strong>Native Name:</strong> {{ country.nativeName }}</li>
          <li>
            <strong>Population:</strong>
            {{ country.population.toLocaleString("en") }}
          </li>
          <li><strong>Region:</strong> {{ country.region }}</li>
          <li><strong>Sub Region:</strong> {{ country.subregion }}</li>
          <li><strong>Capital:</strong> {{ country.capital }}</li>
        </div>
        <div class="right">
          <li>
            <strong>Top Level Domain: </strong>
            <div class="comma-list">
              <span
                class="comma-list-item"
                v-for="(domain, index) in country.topLevelDomain"
                :key="`${COUNTRY_CODE}-${index}`"
                >{{ domain }}</span
              >
            </div>
          </li>
          <li>
            <strong>Currencies: </strong>
            <div class="comma-list">
              <span
                class="comma-list-item"
                v-for="(currency, index) in country.currencies"
                :key="`${COUNTRY_CODE}-${index}`"
                >{{ currency.name }} ({{ currency.symbol }})</span
              >
            </div>
          </li>
          <li>
            <strong>Languages: </strong>
            <div class="comma-list">
              <span
                class="comma-list-item"
                v-for="(lang, index) in country.languages"
                :key="`${COUNTRY_CODE}-${index}`"
                >{{ lang.name }}</span
              >
            </div>
          </li>
        </div>
      </ul>
      <div class="border-countries" v-if="!!country.borders.length">
        <strong>Border Countries: </strong>
        <div class="_borders">
          <a
            class="d3-card"
            v-for="(border, index) in country.borders"
            :key="`${COUNTRY_CODE}-${index}`"
            @click="goBorder(border)"
            >{{ getBorderName(border) }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { http } from "@js/http";

export default {
  data() {
    return {
      country: {}
    };
  },
  watch: {
    $route(aft, bfr) {
      if (aft !== bfr) {
        this.COUNTRY_CODE = this.$route.params.country_code;
        this.getCountry();
      }
    }
  },
  computed: {
    is_loaded() {
      return this.$parent.is_loaded;
    }
  },
  methods: {
    getCountry() {
      this.country = this.$parent.countries.find(
        c => c.alpha3Code == this.COUNTRY_CODE
      );
      document.title = `WITW: ${this.country.name}`;
    },
    getBorderName(code) {
      return this.$parent.countries.find(c => c.alpha3Code == code).name;
    },
    goBorder(border) {
      this.$router.push({
        params: {
          country_code: border
        }
      });
    }
  },
  created() {
    this.COUNTRY_CODE = this.$route.params.country_code;

    if (!this.is_loaded) {
      const REQUEST = {
        method: "get",
        url: `https://restcountries.eu/rest/v2/alpha/${this.COUNTRY_CODE}`
      };
      http(REQUEST)
        .then(({ data }) => {
          this.country = data;
        })
        .catch(err => {
          alert(
            "Sorry, we couldn't load the countries. Please refresh the page to try again."
          );
          window.console.warn(err);
        });
    } else {
      this.getCountry();
    }
  }
};
</script>

<style lang="scss">
.page-details {
  display: flex;
  font-size: 16px;
  flex-direction: row;

  @media screen and (max-width: 420px) {
    flex-wrap: wrap;
  }

  .leftpane,
  .rightpane {
    width: 100%;
  }

  .leftpane {
    @media screen and (min-width: 421px) {
      margin-right: 16px;
    }

    .flag {
      overflow: hidden;
      position: relative;
      width: 100%;

      img {
        width: 100%;
      }
    }
  }
  .rightpane {
    @media screen and (min-width: 421px) {
      margin-left: 16px;
    }

    h2 {
      font-size: 32px;
    }
    .info {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin: 0;
      padding: 0;

      @media screen and (max-width: 420px) {
        flex-wrap: wrap;
      }

      .left,
      .right {
        display: inline-flex;
        flex-direction: column;
        width: 100%;
      }

      .right {
        @media screen and (max-width: 420px) {
          margin-top: 40px;
        }
      }

      li {
        line-height: 4ex;
      }
    }
  }
  .comma-list {
    display: inline;

    .comma-list-item {
      display: inline;

      &:not(:only-child) {
        &:not(:first-child) {
          &::before {
            content: ", ";
          }
        }
        &:last-child {
          &::before {
            content: " and ";
          }
        }
      }
    }
  }

  .border-countries {
    margin-top: 64px;

    a {
      cursor: pointer;
      display: inline-block;
      margin-bottom: 8px;
      padding: 4px 16px;
      transition-property: color;
      transition-duration: var(--transition-duration);
      transition-timing-function: ease-out;

      &:not(:last-child) {
        margin-right: 8px;
      }

      &:hover {
        color: var(--color-accent) !important;
      }
    }

    ._borders {
      display: inline;
      margin-left: 8px;

      @media screen and (max-width: 420px) {
        display: block;
        margin: 16px 0 0 0;
      }
    }
  }
}
._empty {
  text-align: center;
}
</style>
