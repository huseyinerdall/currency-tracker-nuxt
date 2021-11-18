<template>
  <div class="coins">
    {{ coin }}
    <SinglePageGraphCoin :coin="coin" />
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="pa-0">
          <Description :coin="coin" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import coins from "~/assets/coins.json";
import seo from "~/assets/seo.json";
import functions from "~/functions";
export default {
  name: "Coins",
  auth: false,
  head(app) {
    return {
      title: app.$store.app.seotitle,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: app.$store.app.seodescription,
        },
        { vmid: "keywords", name: "keywords", content: app.$store.app.keywords },
      ],
    };
  },
  data: (app) => ({
    seodescription: "",
    title: "",
    keywords: "",
  }),
  props: {
    coin: {
      type: String,
    },
  },
  layout: "app",
  async asyncData({ app }) {
    let sys = "";
    for (let i = 0; i < coins.length; i++) {
      if (coins[i]["name"] == app.context.route.params.coin) {
        sys = coins[i]["symbol"].toUpperCase();
        break;
      }
    }
    await app.$axios
      .$post(`/admin/getseodata`, {
        coin: sys,
      })
      .then((response) => {
        app.seodescription = response.description;
        app.seotitle = response.title;
        app.keywords = response.keywords;
      });
  },
  created() {},
};
</script>