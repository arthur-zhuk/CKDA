<template>
  <!-- TODO: Link this api call with the kitten one w\ the attributes -->
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
    <v-flex v-if="myKitties && myKitties.kitties && myKitties.kitties.length > 0" xs12>
      <v-card :key="kitty.id" v-for="kitty in myKitties.kitties" color="cyan darken-2" class="white--text">
        <v-container fluid grid-list-lg>
          <v-layout row>
            <v-flex xs7>
              <div>
                <div v-if="kitty & kitty.name" class="headline">{{ kitty.name }} - {{ kitty.id }}</div>
                <div v-else class="headline">{{ kitty.id }}</div>
                <div>Gen: {{ kitty.generation }}</div>
                <div v-if="kitty && kitty.auction && kitty.auction.status === 'open'"><h3>Current Auction:</h3>
                  <div>Auction Id: {{ kitty.auction.id }}</div>
                  <div>Start Price ETH: {{ kitty.auction.start_price | eth }}</div>
                  <div>End Price ETH: {{ kitty.auction.end_price | eth }}</div>
                  <div>Current Price ETH: {{ kitty.auction.end_price | eth }}</div>
                  <div>Seller Address: {{ kitty.auction.seller.address }}</div>
                </div>
                <div v-else>No Auction in Progress</div>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-card-media
                :src="kitty.image_url"
                height="125px"
                contain
              ></v-card-media>
            </v-flex>
            <v-flex xs8>
              <span v-if="att.id === kitty.id" style="color: white" :key="att.id" v-for="att in myKittyAttr">
                <div 
                  style="color: white"
                  :key="i" v-for="(item, i) in att.cattributes">
                  Type: {{ item.type }} Description: <span>{{ item.description }}</span>
                </div>
              </span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
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
      console.log('e and ethadd', val, this.ETH_ADDRESS);
      const LIMIT = 100;
      const OFFSET = 0;
      axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${this.ETH_ADDRESS}&limit=${LIMIT}&offset=${OFFSET}`)
      .then((data) => {
        this.myKittiesMap.set('myKitties', data.data);
        const arr = [];
        data.data.kitties.forEach((kitty) => {
          axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
            .then((attributeData) => {
              arr.push(attributeData.data);
            });
        });
        this.myKittiesMap.set('attributeData', arr);
        this.myKitties = this.myKittiesMap.get('myKitties');
        this.myKittyAttr = this.myKittiesMap.get('attributeData');
        console.log('myKitties.kitties', this.myKitties.kitties);
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
    // rareComputedColor(description) {
    //   console.log('desc', description);
    //   return { rare: 'light-green lighten-1' ? this.cattributes[description] < 5000 : '' }
    // },
    computedColor() {
      // light-green lighten-1': props.item.total < 5000,
      // 'yellow darken-1': props.item.total >= 5000 && props.item.total <= 13000,
      // 'red darken-1': props.item.total > 13000,
    },
  },
  data() {
    return {
      ETH_ADDRESS: '',
      myKitties: [],
      myKittyAttr: [],
      myKittiesMap: new Map(),
      cattributes: [],
      // headers: [
      //   {
      //     text: 'My Kitties',
      //     align: 'left',
      //     sortable: false,
      //     value: 'myKitties',
      //   },
      //   { text: 'Type', value: 'type' },
      //   { text: 'Total', value: 'total' },
      // ],
    };
  },
  methods: {
    searchETHAddress(e) {
    },
  },
  mounted() {
    const ETH_PUBLIC_TOKEN = '0x6265aafc8d25b36f97181c44d0eb6693f00eba17';
    const LIMIT = 100;
    const OFFSET = 0;

    axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=${OFFSET}`)
    .then((data) => {
      this.myKittiesMap.set('myKitties', data.data);
      const arr = [];
      data.data.kitties.forEach((kitty) => {
        axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
          .then((attributeData) => {
            arr.push(attributeData.data);
          });
      });
      this.myKittiesMap.set('attributeData', arr);
      this.myKitties = this.myKittiesMap.get('myKitties');
      this.myKittyAttr = this.myKittiesMap.get('attributeData');
      console.log('myKitties.kitties', this.myKitties.kitties);
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
