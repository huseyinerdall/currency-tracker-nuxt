<template>
  <div class="home">
    <v-container class="pa-0 pt-lg-4">
      <GlobalInfos />
      <MainCryptoCurrency />
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  auth: false,
  layout: 'app',
  head: {
    title:
      "Para.Guru | Kripto Para Piyasası. Bitcoin Ne Kadar? Ethereum ve XRP Canlı Fiyatlar",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Bitcoin başta olmak üzere kripto para piyasasının en güncel fiyatlarını takip edebilir, fiyat grafiklerini analiz edebilirsiniz.",
      },
      {
        vmid: "keywords",
        name: "keywords",
        content:
          "Kripto para fiyatları, sanal para fiyatları, kripto para piyasası, sanal para piyasasi, bitcoin ne kadar, bitcoin kaç dolar, bitcoin kaç lira, bitcoin canlı fiyatı, ethereum canlı fiyatı, bitcoin al, ethereum al, ripple ne kadar, dogecoin ne kadar, bitcoin fiyatı, btcturk fiyatı, bitcoin al sat, bitcoin satın al, ripple satın al, bitcoin kaç lira oldu, bitcoin son fiyatı, bitcoin hemen satın al, bitcoin hemen sat",
      },
    ],
  },
  components: {
  }
};
</script>
