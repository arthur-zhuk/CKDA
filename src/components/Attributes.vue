<template>
  <v-container>
    <!-- TODO: search -->
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
    <v-data-table
      :headers="headers"
      :items="cattributes"
      :search="search"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="cap" :style="{ backgroundColor: props.item.description }">{{ props.item.description }}</td>
        <td class="text-xs-right cap">{{ props.item.type }}</td>
        <td 
          :class="{ 
            'light-green lighten-1': props.item.total < 5000,
            'yellow darken-1': props.item.total >= 5000 && props.item.total <= 13000,
            'red darken-1': props.item.total > 13000,
            }"
          class="text-xs-right cap">
          {{ props.item.total }}
        </td>
      </template>
    </v-data-table>
    <div class="chart-section">
    </div>
  </v-container>
</template>

<script>
import axios from 'axios';
// import VueCharts, { Bar, Line } from 'vue-chartjs';

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
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' },
      ],
    };
  },
  mounted() {
    axios.get('https://api.cryptokitties.co/cattributes?total=true').then((data) => {
      console.log('data', data);
      this.cattributes = data.data;
    });

    // Overwriting base render method with actual data.
    // this.renderChart({
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //   datasets: [
    //     {
    //       label: 'GitHub Commits',
    //       backgroundColor: '#f87979',
    //       data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    //     },
    //   ],
    // });
  },
};
</script>

<style lang="scss" scoped>
.cap {
text-transform: capitalize;
}
</style>
