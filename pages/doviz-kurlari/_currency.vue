<template>
  <div class="coins">
    <SinglePageGraphGold :gold="gold" />
    <v-container>
      <v-row>
        <v-col cols="12" md="12" class="pa-0">
          <Description :gold="gold" />
        </v-col>
      </v-row>
    </v-container>
    <!--    <CommentSidebar />-->
  </div>
</template>

<script>
export default {
  auth: false,
  name: "Coins",
  props: {
    gold: {
      type: String
    }
  },
  created() {}
};
</script>
