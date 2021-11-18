<template>
  <v-container class="mt-8 pa-0">
    {{ coin }}
    <v-row class="flex-row pl-4 pr-4">
      <div>
        <v-avatar size="56" class="mb-2">
          <img :src="coinImage" :alt="$route.params.coin" />
        </v-avatar>
      </div>
      <div class="flex-column d-flex text--white ml-2" style="width: 200px">
        <div>
          <h3 :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'">
            {{ $route.params.coin }} - {{ symbol | uppercase }}
          </h3>
        </div>
        <div class="d-flex flex-row justify-space-between">
          <span
            style="font-size: 12px; padding-top: 9px"
            :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'"
            >{{ last_updated | onlyTime }}</span
          >
        </div>
      </div>
    </v-row>

    <v-row class="pl-4 pr-4 mt-0">
      <v-row
        class="pl-4 pr-4 justify-space-between align-center"
        style="font-size: 18px"
      >
        <div
          class="mt-2"
          :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'"
          :class="[state > 0 ? 'price-up' : 'price-down']"
        >
          {{ (current_price || 0) | binayracveondalik }} $
        </div>
        <div
          class="mt-2"
          :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'"
          :class="[state > 0 ? 'price-up' : 'price-down']"
        >
          {{ (tl_price || 0) | binayracveondalik }} ₺
        </div>
        <div
          class="mt-2"
          :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'"
          :class="[price_change_24h >= 0 ? 'green--text' : 'red--text']"
        >
          {{ price_change_24h | signint }}
          <v-icon color="red" v-if="price_change_24h < 0"
            >mdi-trending-down</v-icon
          >
          <v-icon color="green" v-else-if="price_change_24h > 0"
            >mdi-trending-up</v-icon
          >
          <v-icon color="gray" v-else-if="price_change_24h == 0"
            >mdi-trending-neutral</v-icon
          >
        </div>
        <div
          class="mt-2"
          :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'"
          :class="[
            price_change_percentage_24h >= 0 ? 'green--text' : 'red--text',
          ]"
        >
          {{ price_change_percentage_24h | signint }}%
        </div>
      </v-row>
      <v-row
        class="
          d-flex
          flex-row
          justify-space-between
          pl-md-4
          pr-md-2
          mt-lg-0
          mb-lg-4
        "
      >
        <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
        <v-btn-toggle
          v-model="time"
          style="
            border: 1px solid #ddd;
            border-radius: 0;
            background-color: transparent;
            color: #000;
            padding: 4px;
          "
          mandatory
          right
          :class="[$vuetify.breakpoint.smAndDown ? 'mx-auto' : '']"
        >
          <v-btn :value="time" style="background: transparent">
            <v-icon>mdi-share-variant-outline</v-icon>
          </v-btn>
          <v-btn value="1" style="background: transparent">24S</v-btn>
          <v-btn value="7" style="background: transparent">7G</v-btn>
          <v-btn value="30" style="background: transparent">1A</v-btn>
          <v-btn value="90" style="background: transparent">3A</v-btn>
          <v-btn value="365" style="background: transparent">1Y</v-btn>
          <v-btn value="1095" style="background: transparent">3Y</v-btn>
        </v-btn-toggle>
      </v-row>
    </v-row>

    <div id="chart" style="border: 1px solid #ddd" class="mt-6">
      <apexchart
        ref="realtimeChart"
        class="ma-0 pa-0"
        type="area"
        height="350"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>

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
  </v-container>
</template>

<script>
import coins from "~/assets/coins.json";
import seo from "~/assets/seo.json";
import functions from "~/functions";
export default {
  name: "SinglePageGraph",
  props: {
    coin: {
      type: String,
    },
  },

  data: (app) => ({
    interval: 0,
    timeRange: 1,
    time: 1,
    dolar: 0,
    overlay: false,
    state: 0,
    coinImage: "",
    symbol: "",
    high: "",
    low: "",
    current_price: "",
    last_updated: "",
    price_change_24h: "",
    price_change_percentage_24h: "",
    series: [
      {
        name: app.$route.params.coin,
        data: [],
      },
    ],
    chartOptions: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            reset: true,
          },
          autoSelected: "zoom",
        },
        locales: [
          {
            name: "en",
            options: {
              months: [
                "Ocak",
                "Şubat",
                "Mart",
                "Nisan",
                "Mayıs",
                "Haziran",
                "Temmuz",
                "Ağustos",
                "Eylül",
                "Ekim",
                "Kasım",
                "Aralık",
              ],
              shortMonths: [
                "Oca",
                "Şub",
                "Mar",
                "Nis",
                "May",
                "Haz",
                "Tem",
                "Agu",
                "Eyl",
                "Eki",
                "Kas",
                "Ara",
              ],
              days: [
                "Pazar",
                "Pazartesi",
                "Salı",
                "Çarşamba",
                "Perşembe",
                "Cuma",
                "Cumartesi",
              ],
              shortDays: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
            },
          },
        ],
      },
      stroke: {
        width: 1,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        align: "left",
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: app.$store.state.isLight ? "#000" : "#ffffff",
          },
        },
        title: {
          text: "Fiyat($)",
          style: {
            color: app.$store.state.isLight ? "#000" : "#ffffff",
            fontSize: 14,
            fontWeight: 600,
          },
        },
        axisTicks: {
          show: false,
          color: app.$store.state.isLight ? "#000" : "#ffffff",
          width: 0,
        },
        axisBorder: {
          color: app.$store.state.isLight ? "#000" : "#ffffff",
        },
      },
      xaxis: {
        type: "datetime",
        tickAmount: 6,
        labels: {
          style: {
            colors: app.$store.state.isLight ? "#000" : "#ffffff",
          },
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
        axisTicks: {
          color: app.$store.state.isLight ? "#000" : "#ffffff",
        },
        axisBorder: {
          color: app.$store.state.isLight ? "#000" : "#ffffff",
        },
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return val + " $";
          },
        },
        x: {
          format: "dd MMM yyyy HH:mm:ss",
          formatter: function (val) {
            return new Date(val).toLocaleString("tr");
          },
        },
      },
    },
  }),
  async fetch() {
    let fetchedData = await this.$axios.$post(`/getcoinaccordingtotimerange`, {
      coinName: this.$route.params.coin,
      time: this.time,
    });
    let tempValues = [];
    for (let i = 0; i < fetchedData.length; i++) {
      tempValues.push([fetchedData[i]["createdAt"], fetchedData[i]["Fiyat"]]);
    }
    this.series = [
      {
        data: tempValues,
      },
    ];
  },

  methods: {
    getGraphData: function () {
      this.$axios
        .post(`/getcoinaccordingtotimerange`, {
          coinName: this.$route.params.coin,
          time: this.time,
        })
        .then((response) => {
          let fetchedData = response.data;
          //let tempDates = [];
          //let time;
          let tempValues = [];
          for (let i = 0; i < fetchedData.length; i++) {
            tempValues.push([
              fetchedData[i]["createdAt"],
              fetchedData[i]["Fiyat"],
            ]);
          }
          this.series = [
            {
              data: tempValues,
            },
          ];
        });
    },
  },
  created() {
    this.$axios
      .$get(`/coin/${this.$route.params.coin}`)
      .then((response) => {
        this.coinImage = response[0].image;
        this.symbol = response[0].symbol;
        this.high = response[0].high_24h;
        this.low = response[0].low_24h;
        this.current_price = response[0].current_price;
        this.tl_price = response[0].tl;
        this.last_updated = response[0].last_updated;
        this.price_change_24h = response[0].price_change_24h;
        this.price_change_percentage_24h =
          response[0].price_change_percentage_24h;
        this.overlay = false;
      })
      .catch((err) => console.error(err));

    //     let temp;
    //     var socket = io.connect(`${this.$store.state.addr}`);
    //     socket.on(app.$route.params.coin, fetchedData => {
    //       if (fetchedData[fetchedData.length - 1]["Fiyat"] != temp || !temp) {
    //         let tempValues = [];
    //         for (let i = 0; i < fetchedData.length; i++) {
    //           //tempDates.push(time.toLocaleString('tr'));
    //           tempValues.push([
    //             fetchedData[i]["createdAt"],
    //             fetchedData[i]["Fiyat"]
    //           ]);
    //         }
    //       }
    //     });
  },
  watch: {
    time() {
      this.getGraphData();
    },
    current_price(newValue, oldValue) {
      if (+newValue < +oldValue) {
        this.state = -1;
      } else {
        this.state = 1;
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style scoped>
@keyframes price-up {
  0% {
    background-color: darkgreen;
  }
  100% {
    background-color: unset;
  }
}

@keyframes price-down {
  0% {
    background-color: red;
  }
  100% {
    background-color: unset;
  }
}

.price-up {
  -webkit-animation: 1.5s alternate price-up;
  animation: 1.5s alternate price-up;
}

.price-down {
  -webkit-animation: 1.5s alternate price-down;
  animation: 1.5s alternate price-down;
}
</style>
<style>
.apexcharts-toolbar {
  z-index: 0 !important;
}
.apexcharts-tooltip {
  text-align: center !important;
  border-radius: 0 !important;
}
@media screen and (max-width: 768px) {
  .apexcharts-yaxis {
    display: none;
  }
}
</style>
