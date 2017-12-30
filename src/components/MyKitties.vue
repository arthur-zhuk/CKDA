<template>
  <v-container>
    <v-layout row>
      <v-flex xs8>
        <v-text-field
          name="eth-address"
          label="Enter Your Ethereum Wallet Address to see your CryptoKitties"
          id="eth-address"
          single-line
          v-model="ETH_ADDRESS"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-container fluid grid-list-xl>
      <v-layout row wrap>
        <v-flex v-if="allYourKitties && allYourKitties.length > 0" :key="y" v-for="(kitty, y) in allYourKitties" xs12 sm6 md4 offset-xs2 offset-sm0 offset-md0 offset-lg0>
          <v-card>
            <v-card-media
              :src="kitty.image_url"
              height="400px"
            ></v-card-media>
            <v-card-title primary-title>
              <v-container>
                <v-layout row wrap>
                  <div v-if="kitty && kitty.name" class="headline">{{ kitty.name }} - {{ kitty.id }}</div>
                  <div v-else class="headline">{{ kitty.id }}</div>
                </v-layout>
                <v-layout row>
                  <div class="grey--text">Generation: {{ kitty.generation }}</div>
                </v-layout>
              </v-container>
              <v-container>
                <v-layout v-show="kitty && kitty.cattributes" row wrap>
                  <v-flex>
                    <div class="cap" :key="j" v-for="(cattribute, j) in kitty.cattributes">
                      {{ cattribute.type }}:
                      <span v-if="cattribute && (Number(cattribute.total) > 5000 && Number(cattribute.total) <= 50000)" style="color:#FFBF00;">
                        {{ cattribute.description }}
                      </span> 
                      <span v-else-if="cattribute && Number(cattribute.total) <= 5000" style="color:green;">
                        {{ cattribute.description }}
                      </span> 
                      <span v-else style="color:red;">
                        {{ cattribute.description }}
                      </span> 
                    </div>
                  </v-flex>
                  <v-flex>
                    <div v-if="kitty && kitty.auction && kitty.auction.status === 'open'"><h3>Current Auction:</h3>
                      <div>Auction Id: {{ kitty.auction.id }}</div>
                      <div>Start Price ETH: {{ kitty.auction.start_price | eth }}</div>
                      <div>End Price ETH: {{ kitty.auction.end_price | eth }}</div>
                      <div>Current Price ETH: {{ kitty.auction.end_price | eth }}</div>
                      <div>Seller Address: </div>
                      <v-flex shrink><span>{{ kitty.auction.seller.address }}</span></v-flex>
                    </div>
                    <div v-else>No Auction in Progress</div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-title>
            <v-card-actions>
              <v-btn :href="'https://www.cryptokitties.co/kitty/' + kitty.id" target="_blank" flat>Official</v-btn>
              <v-btn :href="'https://cryptokittydex.com/kitties/' + kitty.id" target="_blank" flat color="purple">CryptoKittyDex</v-btn>
              <v-spacer></v-spacer>
              <v-btn icon @click.native="show = !show">
                <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </v-card-actions>
            <v-slide-y-transition>
              <v-card-text v-show="show">
                {{ kitty.bio }}
              </v-card-text>
            </v-slide-y-transition>
            </v-card>
          </v-flex>
          <v-flex v-else>Hi</v-flex>
        </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyKitties',
  filters: {
    eth(val) {
      if (!val) return '';
      return val * 0.000000000000000001;
    },
  },
  watch: {
    ETH_ADDRESS(val) {
      const LIMIT = 1000;
      const finalKArr = [];
      // const OFFSET = 20;
      axios.get('https://api.cryptokitties.co/cattributes?total=true').then((data) => {
        this.cattributes = data.data;
      });
      axios.all([
        axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=0`),
        axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=20`),
        axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=40`),
        axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=60`),
        axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=80`),
      ])
      .then(axios.spread((...args) => {
        args.forEach((chunk) => {
          finalKArr.push(...chunk.data.kitties);
        });
        return finalKArr;
      }))
      .then((allYourKitties) => {
        allYourKitties.forEach((kitty) => {
          const cattributes = this.cattributes;
          axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
            .then((attributeData) => {
              Object.assign(kitty, attributeData.data);
              kitty.cattributes.forEach((cattribute) => {
                const filtered = cattributes.filter(match => (
                  match.description === cattribute.description));
                Object.assign(cattribute, { total: filtered[0].total });
              });
            })
            .catch((err) => {
              console.error('err', err);
            });
          this.allYourKitties = allYourKitties;
        });
      });
    },
  },
  data() {
    return {
      gArr: [],
      gKArr: [],
      show: false,
      ETH_ADDRESS: '',
      myKitties: [],
      myKittyAttr: [],
      myKittiesMap: new Map(),
      cattributes: [],
      allYourKitties: null,
      arr: [],
    };
  },
  methods: {
  },
  mounted() {
    const ETH_PUBLIC_TOKEN = '0x6265aafc8d25b36f97181c44d0eb6693f00eba17';
    const LIMIT = 1000;
    const finalKArr = [];
    axios.get('https://api.cryptokitties.co/cattributes?total=true').then((data) => {
      this.cattributes = data.data;
    });
    axios.all([
      axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=0`),
      axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=20`),
      axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=40`),
      axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=60`),
      axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=80`),
    ])
    .then(axios.spread((...args) => {
      args.forEach((chunk) => {
        finalKArr.push(...chunk.data.kitties);
      });
      return finalKArr;
    }))
    .then((allYourKitties) => {
      allYourKitties.forEach((kitty) => {
        const cattributes = this.cattributes;
        axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
          .then((attributeData) => {
            Object.assign(kitty, attributeData.data);
            kitty.cattributes.forEach((cattribute) => {
              const filtered = cattributes.filter(match => (
                match.description === cattribute.description));
              Object.assign(cattribute, { total: filtered[0].total });
            });
          })
          .catch((err) => {
            console.error('err', err);
          });
      });
      this.allYourKitties = allYourKitties;
    });
  },
};
</script>

<style lang="scss" scoped>
  .cap {
    text-transform: capitalize;
  }
</style>
