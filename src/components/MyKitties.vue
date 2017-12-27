<template>
  <!-- TODO: Link this api call with the kitten one w\ the attributes -->
  <v-container>
    <v-flex v-if="myKitties.length > 0" xs12>
      <v-card :key="kitty.id" v-for="kitty in myKitties.data.kitties" color="cyan darken-2" class="white--text">
        <v-container fluid grid-list-lg>
          <v-layout row>
            <v-flex xs7>
              <div>
                <div :style="{ color: kitty.color }" class="headline">{{ kitty.name }}</div>
                <div>Gen: {{ kitty.generation }}</div>
              </div>
            </v-flex>
            <v-flex xs5>
              <v-card-media
                :src="kitty.image_url"
                height="125px"
                contain
              ></v-card-media>
              <div></div>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyKitties',
  data() {
    return {
      myKitties: [],
      myKittyAttr: [],

      myKittiesMap: {},

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
  mounted() {
    const ETH_PUBLIC_TOKEN = '0x6265aafc8d25b36f97181c44d0eb6693f00eba17';
    const LIMIT = 100;
    const OFFSET = 0;

    axios.get(`https://api.cryptokitties.co/kitties?owner_wallet_address=${ETH_PUBLIC_TOKEN}&limit=${LIMIT}&offset=${OFFSET}`)
    .then((data) => {
      console.log('myKitties', data);
      this.myKitties = data.data;
      const kittyMapCreator = (kittyId) => {
        axios.get(`https://api.cryptokitties.co/kitties/${kittyId}`)
          .then((ids) => {
            console.log('kittyId data map fn', ids);
          });
      };
      this.myKittiesMap.set(kittyMapCreator, createMap);
      data.data.kitties.forEach((kitty) => {
        axios.get(`https://api.cryptokitties.co/kitties/${kitty.id}`)
        .then((ids) => {
          console.log('kittyId data', ids);
        });
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
