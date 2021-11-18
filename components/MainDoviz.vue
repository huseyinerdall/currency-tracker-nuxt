<template>
  <div class="main-doviz">
    <v-data-table
      :headers="headers"
      :items="data"
      hide-default-footer
      :loading="!goldloaded"
      no-data-text="Güncel Datalar Yükleniyor..."
      loading-text="Güncel Datalar Yükleniyor..."
      disable-pagination
      style="border: 1px solid #ddd; border-radius: 0"
      :style="[
        $store.state.isLight
          ? 'color:#rgba(0,0,0,0.87); background-color:rgba(255,255,255,.3);'
          : 'color:#ffffff;background-color:rgba(0,0,0,.3);',
      ]"
      mobile-breakpoint="0"
      class="mt-1"
      dense
    >
      <template v-slot:loading>
        <Loading />
        <span>Güncel Datalar Yükleniyor...</span>
      </template>
      <template v-slot:header.time="{ header }">
        <div class="convert-dropdown row">
          {{ (header.text = "") }}
          <v-select
            style="
              font-size: 15px;
              background: transparent;
              width: 90px;
              margin-top: -7px;
            "
            class="amber--text accent-3"
            :items="convertTo"
            solo
            dense
            dark
            v-model="selected"
            hide-details
            @change="convertTable"
          ></v-select>
        </div>
      </template>

      <template v-slot:item="{ item }">
        <tr>
          <td>
            <nuxt-link
              :to="
                '/doviz-kurlari/' + item.type.toLowerCase().split(' ').join('-')
              "
              class="body-1"
              tag="span"
              :style="`font-size: ${$store.state.tdFontSize} !important;cursor:pointer;`"
            >
              {{
                item.type == "SUUDİ ARABİSTAN RİYALİ"
                  ? "S.A. RİYALİ"
                  : item.type
              }}
            </nuxt-link>
          </td>
          <td>
            {{
              (item["Alış"].replace(",", ".") / denominator)
                | turkishCurrencyformat
            }}
          </td>
          <td>
            {{
              (item["Satış"].replace(",", ".") / denominator)
                | turkishCurrencyformat
            }}
            <v-icon
              v-if="smAndDown && item['Değişim'].indexOf('-') < 0"
              class="float-right"
              size="20"
              color="green"
            >
              mdi-arrow-up-bold
            </v-icon>
            <v-icon
              v-else-if="smAndDown && !(item['Değişim'].indexOf('-') < 0)"
              class="float-right"
              size="20"
              color="red"
            >
              mdi-arrow-down-bold
            </v-icon>
          </td>
          <td v-if="!smAndDown">
            <span
              :class="[
                item['Değişim'].indexOf('-') < 0 ? 'green--text' : 'red--text',
              ]"
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
            >
              {{
                ((parseFloat(item["Satış"].replace(",", ".")) *
                  parseFloat(
                    item["Değişim"].replace("%", "").replace(",", ".")
                  )) /
                  100)
                  | signint
              }}
            </span>
          </td>
          <td v-if="!smAndDown">
            <span
              :class="[
                item['Değişim'].indexOf('-') < 0 ? 'green--text' : 'red--text',
              ]"
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
            >
              {{ item["Değişim"] }}
            </span>
          </td>
          <td v-if="!smAndDown">
            <span
              class="body-1"
              :style="`font-size: ${$store.state.tdFontSize} !important;`"
              >{{ item.time | onlyTime }}</span
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-overlay
      :opacity="1"
      :value="overlay"
      :color="
        $store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'
      "
    >
      <v-progress-circular
        indeterminate
        size="64"
        :color="
          !$store.state.isLight ? 'rgba(255,255,255,0.83)' : 'rgb(29, 36, 96)'
        "
      >
      </v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import socket from "~/plugins/socket.io.js";
import { mapMutations, mapGetters, mapState } from "vuex";
export default {
  auth: false,
  data() {
    return {
      goldloaded: false,
      headers: [
        {
          text: "Döviz Kurları",
          align: "start",
          sortable: false,
          value: "type",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
          width: "160px",
        },
        {
          text: "Alış",
          value: "Alış",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
        },
        {
          text: "Satış",
          value: "Satış",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
        },
        {
          text: "Fark",
          value: "Yuzde",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
        },
        {
          text: "Yüzde",
          value: "Fark",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
        },
        {
          text: "Saat",
          value: "time",
          sortable: false,
          align: "start",
          class: this.$store.state.isLight
            ? "pinkk body-1"
            : "amber--text accent-3 body-1",
        },
      ],
      data: [],
      convertTo: ["USD", "TRY"],
      selected: "TRY",
      denominator: 1,
      overlay: false,
      isMounted: false,
    };
  },
  beforeMount() {
    this.isMounted = true;
    if (process.client) {
      if (localStorage.getItem("currencies")) {
        this.data = JSON.parse(localStorage.getItem("currencies"));
        if (this.$route.path === "/") {
          this.data.pop();
          this.data.pop();
          this.data.pop();
          this.data.pop();
        }
        this.goldloaded = true;
      }
    }
    socket.on("currencies", (fetchedData) => {
      if (fetchedData[0]) {
        this.data = fetchedData;
        let temp = this.data[3];
        this.data[3] = this.data[18];
        this.data[18] = temp;
        if (process.client) {
          localStorage.setItem('currencies',JSON.stringify(fetchedData));
        }
        if (this.$route.path === "/") {
          this.data.pop();
          this.data.pop();
          this.data.pop();
          this.data.pop();
        }
      }
      this.goldloaded = true;
    });
  },
  methods: {
    convertTable: function () {
      if (this.selected == "TRY") {
        this.denominator = 1;
      } else if (this.selected == "USD") {
        this.denominator = this.$store.state.dolar;
      }
    },
  },
  components: {
    Loading,
  },
  computed: {
    smAndDown: function () {
      return this.isMounted && this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
<style>
.convert-dropdown
  .theme--dark.v-text-field--solo
  > .v-input__control
  > .v-input__slot {
  background: transparent;
}
.convert-dropdown
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: none;
}
.convert-dropdown .v-select.v-input--dense .v-select__selection--comma {
  margin: 5px 4px 0px 0;
  color: #ffc107 !important;
}
.convert-dropdown .v-select__slot {
  border-bottom: none;
}
.convert-dropdown .v-application--is-ltr .v-text-field .v-input__append-inner {
  padding: 0;
}
.convert-dropdown .v-icon.v-icon {
  color: #ffc107 !important;
}
.main-doviz .v-data-table__wrapper {
  overflow-x: hidden !important;
}
.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: rgba(0, 0, 0, 0.3) !important;
}
h3 {
  cursor: pointer;
}
.v-data-table__wrapper thead {
  border-bottom: 1px solid #5e6593 !important;
}
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > td:not(.v-data-table__mobile-row),
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:not(:last-child)
  > th:not(.v-data-table__mobile-row) {
  border-bottom-color: #ddd !important;
}
.pinkk {
  color: #ff3366 !important;
}
.v-application--is-ltr .v-text-field .v-input__append-inner {
  padding-left: 0;
}
.theme--dark.v-data-table {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
