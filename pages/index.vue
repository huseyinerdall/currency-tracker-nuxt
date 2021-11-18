<template>
  <div class="home">
    <div class="mt-4">
      <v-row>
        <v-col class="col-md-12">
          <v-row>
            <v-col cols="12" md="6">
                <MainDoviz />
            </v-col>

            <v-col cols="12" md="6">
                <MainGold />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <CurrencyConverter class="mt-4" />
      <MainCryptoCurrenciyForHomaPage />
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  auth: false,
  layout: 'app',
  head: {
      title: "Para.guru | Altın, Döviz ve Kripto Para Fiyatları",
      meta: [
        {
          vmid: "description",
          name: "description",
          content:
            "Altın, döviz ve kripto para canlı fiyatları. Canlı fiyatlar üzerinden alım satım oyunu oynayan herkesi bir araya getiren bir sosyal ağdır."
        },
        {
          vmid: "keywords",
          name: "keywords",
          content:
            "Altın fiyatları, döviz fiyatları, kripto para fiyatları, altın ne kadar, döviz ne kadar, kripto para ne kadar, altın al sat, döviz al sat, kripto para al sat"
        }
      ]
  },
};
</script>
