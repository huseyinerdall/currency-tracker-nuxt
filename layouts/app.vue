<template>
  <main>
    <v-app v-if="$route.path != '/admin'">
      <v-app-bar
        app
        dark
        v-if="$vuetify.breakpoint.mdAndUp"
        style="height: 94px"
        :class="{ koyu: !$store.state.isLight, acik: $store.state.isLight }"
      >
        <div class="d-flex align-end">
          <router-link to="/">
            <v-img
              alt="para.guru Logo"
              class="shrink mr-2"
              contain
              src="/logo.webp"
              transition="scale-transition"
              width="90"
            />
          </router-link>
        </div>

        <v-btn
          href="/doviz-kurlari"
          text
          tile
          :light="$store.state.isLight"
          class="pl-2 pr-2 ml-1"
        >
          <span>DÖVİZ</span>
        </v-btn>
        <v-btn
          href="/altin-fiyatlari"
          text
          tile
          :light="$store.state.isLight"
          class="pl-2 pr-2 ml-3"
        >
          <span>ALTIN</span>
          <!--<v-icon>mdi-home</v-icon>-->
        </v-btn>
        <v-btn
          href="/kripto-paralar"
          text
          tile
          :light="$store.state.isLight"
          class="pl-2 pr-2 ml-3"
        >
          <span>KRİPTO PARA</span>
        </v-btn>
        <v-btn
          href="/capraz-kurlar"
          text
          tile
          :light="$store.state.isLight"
          class="pl-2 pr-2 ml-3"
        >
          <span>ÇAPRAZ KURLAR</span>
        </v-btn>
        <v-btn
          href="/kripto-para-borsalari"
          text
          tile
          :light="$store.state.isLight"
          class="pl-2 pr-2 ml-3"
        >
          <span>BORSALAR</span>
        </v-btn>
        <v-btn
          href="/user/wallet"
          text
          tile
          :light="$store.state.isLight"
          class="pl-2 pr-2 ml-3"
        >
          <v-badge color="pink" dot>
            <span class="amber--text">CÜZDAN</span>
          </v-badge>
        </v-btn>
        <v-spacer></v-spacer>
        <div class="column">
          <div>
            <v-btn
              class="mt-6 mr-2 pl-1"
              tile
              color="rgb(248, 73, 96)"
              @click="
                !$auth.loggedIn
                  ? $route.path != '/user/login'
                    ? $router.push({ path: '/user/login' })
                    : $toasted.error('Giriş yapmalısın!', {
                        fullWidth: true,
                        icon: 'error',
                        duration: 1000,
                      })
                  : $auth.user.active == 1
                  ? $store.commit('buyselldialog')
                  : activatealert
              "
            >
              <v-icon
                left
                style="background-color: rgba(0, 0, 0, 0.1); height: 38px"
              >
                mdi-arrow-down
              </v-icon>
              Sat
            </v-btn>
            <v-btn
              class="mt-6 mr-6 pl-1"
              tile
              color="rgb(2, 192, 118)"
              @click="
                !$auth.loggedIn
                  ? $route.path != '/user/login'
                    ? $router.push({ path: '/user/login' })
                    : $toasted.error('Giriş yapmalısın!', {
                        fullWidth: true,
                        icon: 'error',
                        duration: 1000,
                      })
                  : $auth.user.active == 1
                  ? $store.commit('buyselldialog')
                  : activatealert
              "
            >
              <v-icon
                left
                style="background-color: rgba(0, 0, 0, 0.1); height: 38px"
              >
                mdi-arrow-up
              </v-icon>
              Al
            </v-btn>
          </div>
          <div>
            <span style="font-size: 10px">*Bu bir yatırım oyunudur.</span>
          </div>
        </div>
        <!-- <v-btn
          class="mt-6 mr-6"
          fab
          dark
          small
          color="#0f1447"
          @click="$store.commit('isLight')"
        >
          <v-icon :color="$store.state.isLight ? '#0f1447' : '#fff'">
            mdi-theme-light-dark
          </v-icon>
        </v-btn> -->
        {{ $auth.loggedIn }}
        <v-menu bottom min-width="200px" rounded v-if="$auth.loggedIn">
          <template v-slot:activator="{ on }">
            <v-btn class="mt-6 mr-6" icon small v-on="on">
              <v-avatar size="40">
                <v-img
                  v-if="$auth.user.profileImage != ''"
                  :src="$auth.user.profileImage"
                  @error="onImgError"
                ></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center pb-0">
              <div class="mx-auto text-center">
                <v-avatar>
                  <v-img v-if="$auth.loggedIn"></v-img>
                  <img
                    v-else
                    :src="$store.state.api + '/defaultuserprofileimage.png'"
                    alt=""
                  />
                </v-avatar>
                <h3>{{ $auth.user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ $auth.user.email }}
                </p>
                <v-divider></v-divider>
                <v-btn depressed text block tile href="/user/profile">
                  PROFİL
                </v-btn>
                <v-divider></v-divider>
                <v-btn depressed block tile text href="/user/wallet">
                  CÜZDAN
                </v-btn>
                <v-divider></v-divider>
                <v-btn depressed block text tile @click="logout"> ÇIKIŞ </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <h1
          class="body-1"
          style="padding-top: 30px; font-size: 24px !important"
          :style="$store.state.isLight ? 'color:rgba(0, 0, 0, 0.87);' : ''"
        >
          {{ clock }}
        </h1>
      </v-app-bar>
      <!--Desktop menu end-->
      <!--Mobile menu begin-->
      <v-app-bar
        :class="{ koyu: !$store.state.isLight, acik: $store.state.isLight }"
        v-if="$vuetify.breakpoint.smAndDown"
      >
        <router-link to="/" class="pa-0 ma-0">
          <v-img
            alt="para.guru Logo"
            class="shrink mr-2"
            contain
            src="/logo.webp"
            transition="scale-transition"
            width="40"
          />
        </router-link>
        <router-link to="/" class="pa-0 ma-0" tag="span">
          <h3
            class="text-xl-h4 ml-2"
            :class="$store.state.isLight ? 'black--text' : 'white--text'"
          >
            {{ $store.state.appName }}
          </h3>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn
          class="mr-2"
          fab
          dark
          small
          :color="$store.state.isLight ? '#fff' : '#0f1447'"
          @click="$store.commit('isLight')"
        >
          <v-icon :color="$store.state.isLight ? '#0f1447' : '#fff'">
            mdi-theme-light-dark
          </v-icon>
        </v-btn>

        <v-menu
          offset-x
          min-width="200px"
          rounded
          v-if="
            false //($store.state.login || isAuthenticated) && $auth.user
          "
        >
          <template v-slot:activator="{ on }">
            <v-btn class="mr-1" icon small v-on="on">
              <v-avatar size="40">
                <v-img
                  v-if="$auth.user"
                  :src="
                    user.profileImage.indexOf('http') > -1
                      ? user.profileImage
                      : $store.state.api +
                        '/uploads/' +
                        user.profileImage +
                        '?fornocache=' +
                        eight
                  "
                ></v-img>
                <img
                  v-else
                  :src="$store.state.api + '/defaultuserprofileimage.png'"
                  alt=""
                />
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list-item-content class="justify-center pb-0">
              <div class="mx-auto text-center">
                <v-avatar>
                  <v-img
                    v-if="$auth.user"
                    :src="
                      user.profileImage.indexOf('http') > -1
                        ? user.profileImage
                        : $store.state.api +
                          '/uploads/' +
                          user.profileImage +
                          '?fornocache=' +
                          eight
                    "
                  ></v-img>
                  <img
                    v-else
                    :src="$store.state.api + '/defaultuserprofileimage.png'"
                    alt=""
                  />
                </v-avatar>
                <h3>{{ $auth.user.fullName }}</h3>
                <p class="text-caption mt-1">
                  {{ $auth.user.email }}
                </p>
                <v-divider></v-divider>
                <v-btn depressed block tile text href="/user/profile">
                  PROFİL
                </v-btn>
                <v-divider></v-divider>
                <v-btn depressed block tile text href="/user/wallet">
                  CÜZDAN
                </v-btn>
                <v-divider></v-divider>
                <v-btn depressed block tile text href="/logout"> ÇIKIŞ </v-btn>
              </div>
            </v-list-item-content>
          </v-card>
        </v-menu>

        <v-app-bar-nav-icon
          dark
          @click="dialog = true"
          style="margin-right: -10px"
        >
          <v-btn
            fab
            dark
            small
            :color="$store.state.isLight ? '#fff' : '#0f1447'"
          >
            <v-icon :color="$store.state.isLight ? '#0f1447' : '#fff'">
              mdi-menu
            </v-icon>
          </v-btn>
        </v-app-bar-nav-icon>

        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card
            :style="
              $store.state.isLight
                ? 'background-color: rgba(255,255,255,.9);color:#000;'
                : 'background-color: rgba(0,0,0,.9);color:#fff;'
            "
          >
            <v-toolbar
              style="border-bottom: 1px solid #0059b2"
              :style="
                $store.state.isLight
                  ? 'background-color:rgba(255,255,255,0.83);'
                  : 'background-color:#1d2460;'
              "
            >
              <v-toolbar-title>
                <v-img
                  alt="para.guru Logo"
                  class="shrink mr-2"
                  contain
                  src="/logo.webp"
                  transition="scale-transition"
                  width="40"
                />
              </v-toolbar-title>
              <h3
                class="text-xl-h4 ml-2"
                :style="$store.state.isLight ? 'color:#000;' : 'color:#fff;'"
              >
                {{ $store.state.appName }}
              </h3>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="dialog = false">
                <v-icon :color="$store.state.isLight ? 'black' : 'white'"
                  >mdi-close</v-icon
                >
              </v-btn>
            </v-toolbar>

            <v-list-item-group dark>
              <v-list-item to="/doviz-kurlari" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-currency-usd</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      DÖVİZ
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/altin-fiyatlari" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-gold</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      ALTIN
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/kripto-paralar" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-bitcoin</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      KRİPTO PARA
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/capraz-kurlar" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-currency-sign</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      ÇAPRAZ KURLAR
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/kripto-para-borsalari" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-swap-horizontal-bold</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      BORSALAR
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/user/wallet" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-cash-multiple</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      CÜZDAN
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider color="#0059b2"></v-divider>
              <v-list-item to="/iletisim" @click="dialog = false">
                <v-list-item-icon>
                  <v-icon>mdi-contactless-payment</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <v-btn
                      text
                      :light="$store.state.isLight"
                      :dark="!$store.state.isLight"
                    >
                      İLETİŞİM
                    </v-btn>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-card>
        </v-dialog>
      </v-app-bar>

      <v-footer
        v-if="$vuetify.breakpoint.smAndDown"
        app
        bottom
        fixed
        padless
        style="background: rgb(29, 36, 96)"
      >
        <div class="column" style="width: 100%">
          <div>
            <v-row class="pl-4 pr-4">
              <v-col>
                <v-btn
                  block
                  color="rgb(2, 192, 118)"
                  style="color: #fff"
                  @click="
                    $auth.user == null
                      ? $route.path != '/user/login'
                        ? $router.push({ path: '/user/login' })
                        : $toasted.error('Giriş yapmalısın!', {
                            fullWidth: true,
                            icon: 'error',
                            duration: 1000,
                          })
                      : $auth.user.active == 1
                      ? $store.commit('buyselldialog')
                      : activatealert
                  "
                >
                  AL
                </v-btn>
              </v-col>
              <v-col>
                <v-btn
                  block
                  color="rgb(248, 73, 96)"
                  style="color: #fff"
                  @click="
                    $auth.user == null
                      ? $route.path != '/user/login'
                        ? $router.push({ path: '/user/login' })
                        : $toasted.error('Giriş yapmalısın!', {
                            fullWidth: true,
                            icon: 'error',
                            duration: 1000,
                          })
                      : $auth.user.active == 1
                      ? $store.commit('buyselldialog')
                      : activatealert
                  "
                >
                  SAT
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div style="text-align: center">
            <span style="font-size: 10px; color: #fff"
              >*Bu bir yatırım oyunudur.</span
            >
          </div>
        </div>
      </v-footer>

      <v-main :class="{ 'v-main-light': $store.state.isLight }">
        <v-container class="mt-3">
          <router-view />
        </v-container>
      </v-main>
      <Footer />
    </v-app>
    <v-app v-else>
      <nuxt />
    </v-app>
    <BuyAndSellModal />
  </main>
</template>

<script>
let options = {
  type: "success",
  icon: "check",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "green accent-3 text-center",
  className: "text-center",
};
let alertoptions = {
  type: "error",
  icon: "error",
  fullWidth: true,
  position: "top-center",
  duration: 1600,
  containerClass: "red accent-3 text-center",
  className: "text-center",
};
import { mapMutations } from "vuex";
export default {
  name: "App",

  data: () => ({
    dialog: false,
    isDropped: false,
    clock: "",
    cookiePopup: false,
    failed_image: false,
  }),
  methods: {
    updateTime: function () {
      let cd = new Date();
      this.clock = `${cd.getHours() < 10 ? "0" + cd.getHours() : cd.getHours()}:
                    ${
                      cd.getMinutes() < 10
                        ? "0" + cd.getMinutes()
                        : cd.getMinutes()
                    }:
                    ${
                      cd.getSeconds() < 10
                        ? "0" + cd.getSeconds()
                        : cd.getSeconds()
                    }`;
    },
    async logout() {
      await this.$auth.logout();
    },
    onImgError: function (event) {
      this.failed_image = true;
    },
    ...mapMutations({
      buyselldialog: "buyselldialog",
      activatealert: "activatealert",
    }),
  },
  created() {
    console.log(this.$device.isMobileOrTablet, this.$device.isDesktop);
  },
  mounted() {},
  computed: {
    cPicture: function () {
      return this.failed_image
        ? "https://picsum.photos/500/300?image=4"
        : "https://pisum.photos/500/300?image=5";
    },
  },
};
</script>

<style media="screen">
.v-main {
  background-image: url("assets/back.fw.webp") !important;
  background-attachment: fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.v-main-light {
  background-color: #ffffff !important;
  background-blend-mode: lighten !important;
}
.v-toolbar__content a {
  margin-top: 30px;
  font-weight: 800;
}
@media screen and (min-width: 768px) {
  .v-toolbar__content {
    max-width: 88%;
    margin: 0 auto;
  }
}

.koyu {
  border-bottom: 1px solid #0059b2 !important;
  background-color: #1d2460 !important;
}
.acik {
  border-bottom: 1px solid #0059b2;
  background-color: #f9f9f9 !important;
}
.v-application a {
  font-weight: 400;
}
.v-application a:hover {
  text-decoration: none;
}
.v-data-table__empty-wrapper td {
  color: #fff !important;
}
@media screen and (min-width: 768px) {
  .v-data-table__empty-wrapper {
    height: 510px;
  }
}
.v-progress-linear__background {
  background-color: #e91e63 !important;
  border-color: #e91e63 !important;
}
</style>
