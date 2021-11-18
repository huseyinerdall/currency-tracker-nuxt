<template lang="html">
  <div class="loading-page" v-if="loading">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
         style="margin: auto; background: transparent; display: block; shape-rendering: auto;" width="100px"
         height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <rect x="19" y="19" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0s" calcMode="discrete"></animate>
      </rect>
      <rect x="40" y="19" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0.125s" calcMode="discrete"></animate>
      </rect>
      <rect x="61" y="19" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0.25s" calcMode="discrete"></animate>
      </rect>
      <rect x="19" y="40" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0.875s" calcMode="discrete"></animate>
      </rect>
      <rect x="61" y="40" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0.375s" calcMode="discrete"></animate>
      </rect>
      <rect x="19" y="61" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0.75s" calcMode="discrete"></animate>
      </rect>
      <rect x="40" y="61" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0.625s" calcMode="discrete"></animate>
      </rect>
      <rect x="61" y="61" width="20" height="20" fill="#E91E63">
        <animate attributeName="fill" values="#0f6491;#E91E63;#E91E63" keyTimes="0;0.125;1" dur="1s"
                 repeatCount="indefinite" begin="0.5s" calcMode="discrete"></animate>
      </rect>
    </svg>
  </div>
</template>
<script>
export default {
  name: "LoadingAnimation",
  data: () => ({
    loading: false
  }),
   methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  },
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: "#000000"
    }
  }
};
</script>
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
}
</style>
