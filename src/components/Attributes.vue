<template>
  <v-container id="animated-number-demo">
    <v-card-title>
      Cattributes
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
    <v-container>
      <v-layout row justify-space-around>
        <v-flex xs6>Key: <span style="color:blue">Blue = Rare</span> <span style="color:green">Green = Uncommon</span> <span style="color:red">Red = Common</span></v-flex>
        <v-flex xs6>Darker Color = Rarer | Rarity Calculated Off Total # of Attributes</v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="cattributes.length <= 0">
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-container>
    <v-container v-else>
      <v-data-table
        :headers="headers"
        :items="cattributes"
        :search="search"
        type="number"
        step="20"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="cap">{{ props.item.description }}</td>
          <td class="text-xs-right cap">{{ props.item.type }}</td>
          <td 
            v-if="props.item.total < 5000"
            :style="{ backgroundColor: computedColor(props.item.total, 'rare') }"
            class="text-xs-right cap">
            {{ props.item.total }}
          </td>
          <td 
            v-else-if="props.item.total >= 5000 && props.item.total <= 13000"
            :style="{ backgroundColor: computedColor(props.item.total, 'uncommon') }"
            class="text-xs-right cap">
            {{ props.item.total }}
          </td>
          <td 
            v-else
            :style="{ backgroundColor: computedColor(props.item.total, 'common') }"
            class="text-xs-right cap">
            {{ props.item.total }}
          </td>
        </template>
      </v-data-table>
    </v-container>
    <div class="chart-section">
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Attributes',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Cattributes',
          align: 'left',
          sortable: false,
          value: 'description',
        },
          { text: 'Type', value: 'type' },
          { text: 'Total', value: 'total' },
      ],
      cattributes: [],
      refresh: null,
      totalCats: 0,
    };
  },
  computed: {
  },
  methods: {
    computedColor(val, rarityCategory) {
      const colorPercent = (val / this.totalCats) * 100;
      if (rarityCategory === 'rare') {
        return `hsl(233, 100%, ${(colorPercent * 50) + 50}%)`;
      } else if (rarityCategory === 'uncommon') {
        return `hsl(120, 100%, ${(colorPercent * 50) - 50}%)`;
      } else if (rarityCategory === 'common') {
        return `hsl(7, 100%, ${(colorPercent * 0.01 * 50) + 50}%)`;
      }
      return `hsl(7, 100%, ${(colorPercent * 50) - 50}%)`;
    },
  },
  mounted() {
    let temp;
    axios.get('https://api.cryptokitties.co/kitties').then((data) => {
      this.totalCats = data.data.total;
    })
    .then(() => {
      axios.get('https://api.cryptokitties.co/cattributes?total=true').then((data) => {
        this.cattributes = data.data;
        temp = data.data;
        temp.sort((a, b) => Number(a.total) - Number(b.total));
      });
      this.refresh = setInterval(() => {
        axios.get('https://api.cryptokitties.co/cattributes?total=true').then((data) => {
          this.cattributes = data.data;
        });
      }, 30000);
    });
  },
};
</script>

<style lang="scss" scoped>
.cap {
text-transform: capitalize;
}
</style>
