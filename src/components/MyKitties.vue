<template>
  <v-container>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>Ethereum Address</v-subheader>
      </v-flex>
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
          <v-flex v-if="gArr && gArr.length > 0" :key="kitty.id" v-for="kitty in gArr" xs12 sm6 md4>
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
                  <v-layout v-if="kitty && kitty.cattributes.length > 0" row wrap>
                    <v-flex>
                      <div class="cap" :key="j" v-for="(cattribute, j) in kitty.cattributes">
                        {{ cattribute.type }}: {{ cattribute.description }}
                      </div>
                    </v-flex>
                    <v-flex>
                      <div v-if="kitty && kitty.auction && kitty.auction.status === 'open'"><h3>Current Auction:</h3>
                        <div>Auction Id: {{ kitty.auction.id }}</div>
                        <div>Start Price ETH: {{ kitty.auction.start_price | eth }}</div>
                        <div>End Price ETH: {{ kitty.auction.end_price | eth }}</div>
                        <div>Current Price ETH: {{ kitty.auction.end_price | eth }}</div>
                        <div>Seller Address: </div>
                        <span>{{ kitty.auction.seller.address }}</span>
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
          </v-layout>
      </v-container>
  </v-container>
</template>

<script>
import axios from 'axios';
// import _ from 'lodash';

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
      this.gArr = [];
      // const ETH_PUBLIC_TOKEN = '0x6265aafc8d25b36f97181c44d0eb6693f00eba17';
      const LIMIT = 1000;
      // const OFFSET = 20;
      axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=0`)
        .then((data) => {
          this.gKArr.push(data.data);
          this.myKittiesMap.set('myKitties', this.gKArr);
          // const arr = [];
          data.data.kitties.forEach((kitty) => {
            axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
              .then((attributeData) => {
                this.gArr.push(attributeData.data);
              });
          });
          this.myKittiesMap.set('attributeData', this.gArr);
          // this.myKitties = this.myKittiesMap.get('myKitties');
          this.myKittyAttr = this.myKittiesMap.get('attributeData');
        })
        .then(() => {
          axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=20`)
            .then((data) => {
              this.gKArr.push(data.data);
              this.myKittiesMap.set('myKitties', this.gKArr);
              // const arr = [];
              data.data.kitties.forEach((kitty) => {
                axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
                  .then((attributeData) => {
                    this.gArr.push(attributeData.data);
                  });
              });
              this.myKittiesMap.set('attributeData', this.gArr);
              // this.myKitties = this.myKittiesMap.get('myKitties');
              this.myKittyAttr = this.myKittiesMap.get('attributeData');
            });
        })
        .then(() => {
          axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${val}&limit=${LIMIT}&offset=40`)
            .then((data) => {
              this.gKArr.push(data.data);
              this.myKittiesMap.set('myKitties', this.gKArr);
              // const arr = [];
              data.data.kitties.forEach((kitty) => {
                axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
                  .then((attributeData) => {
                    this.gArr.push(attributeData.data);
                  });
              });
              this.myKittiesMap.set('attributeData', this.gArr);
              this.myKitties = this.myKittiesMap.get('myKitties');
              this.myKittyAttr = this.myKittiesMap.get('attributeData');
              console.log('garr', this.gArr, this.gKArr);
            });
        })
        .then(() => {
          axios.get('https://api.cryptokitties.co/cattributes?total=true').then((data) => {
            this.cattributes = data.data;
          //   this.myKittyAttr.forEach((cat) => {
          //     console.log('cat', cat);
          //     const result = _.merge(cat.cattributes, _.map(this.cattributes, obj => (
          //       _.pick(obj, 'description', 'total')
          //     )));
          //     console.log('result', result);
          //   });
          //   console.log('result arr', this.myKittyAttr);
          });
        });
    },
  },
  computed: {
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
    };
  },
  methods: {
  },
  mounted() {
    const ETH_PUBLIC_TOKEN = '0x6265aafc8d25b36f97181c44d0eb6693f00eba17';
    const LIMIT = 1000;
    // const OFFSET = 20;
    axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=0`)
      .then((data) => {
        this.gKArr.push(data.data);
        this.myKittiesMap.set('myKitties', this.gKArr);
        // const arr = [];
        data.data.kitties.forEach((kitty) => {
          axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
            .then((attributeData) => {
              this.gArr.push(attributeData.data);
            });
        });
        this.myKittiesMap.set('attributeData', this.gArr);
        // this.myKitties = this.myKittiesMap.get('myKitties');
        this.myKittyAttr = this.myKittiesMap.get('attributeData');
      })
      .then(() => {
        axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=20`)
          .then((data) => {
            this.gKArr.push(data.data);
            this.myKittiesMap.set('myKitties', this.gKArr);
            // const arr = [];
            data.data.kitties.forEach((kitty) => {
              axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
                .then((attributeData) => {
                  this.gArr.push(attributeData.data);
                });
            });
            this.myKittiesMap.set('attributeData', this.gArr);
            // this.myKitties = this.myKittiesMap.get('myKitties');
            this.myKittyAttr = this.myKittiesMap.get('attributeData');
          });
      })
      .then(() => {
        axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=40`)
          .then((data) => {
            this.gKArr.push(data.data);
            this.myKittiesMap.set('myKitties', this.gKArr);
            // const arr = [];
            data.data.kitties.forEach((kitty) => {
              axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
                .then((attributeData) => {
                  this.gArr.push(attributeData.data);
                });
            });
            this.myKittiesMap.set('attributeData', this.gArr);
            this.myKitties = this.myKittiesMap.get('myKitties');
            this.myKittyAttr = this.myKittiesMap.get('attributeData');
            console.log('garr', this.gArr, this.gKArr);
          });
      })
      .then(() => {
        axios.get('https://api.cryptokitties.co/cattributes?total=true').then((data) => {
          this.cattributes = data.data;
        //   this.myKittyAttr.forEach((cat) => {
        //     console.log('cat', cat);
        //     const result = _.merge(cat.cattributes, _.map(this.cattributes, obj => (
        //       _.pick(obj, 'description', 'total')
        //     )));
        //     console.log('result', result);
        //   });
        //   console.log('result arr', this.myKittyAttr);
        });
      });
  },
};
</script>

<style lang="scss" scoped>
.cap {
text-transform: capitalize;
}
</style>
