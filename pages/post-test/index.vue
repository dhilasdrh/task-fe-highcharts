<template>
    <div class="p-5 bg-accent space-y-5">     

      <!-- Jumlah Penduduk & Kepadatan Penduduk per Provinsi -->
      <div class="bg-gray-100 border rounded-md p-5">
        <highchart :options="populationAndDensityChartOptions" :modules="['exporting', 'export-data']" />
      </div>

      <!-- 10 Pronvisi dengan Penduduk Terbanyak & Tersedikit -->
      <div class="grid md:grid-cols-2 gap-5 ">
        <div class="bg-gray-100 border rounded-md p-5">
          <highchart :options="top10MostPopulatedProvOptions" :modules="['exporting', 'export-data']" />
        </div>

        <div class="bg-gray-100 border rounded-md p-5">
          <highchart :options="top10LeastPopulatedProvOptions" :modules="['exporting', 'export-data']" />
        </div>

      </div>

      <!-- Perkembangan Jumlah Penduduk Tahun 2018 - 2023 -->
      <div class="grid md:grid-cols-2 gap-5 ">
        <div class="bg-gray-100 border rounded-md p-5">
          <highchart :options="populationGrowthOptions" :modules="['exporting', 'export-data']"/>
        </div>

        <div class="bg-gray-100 border rounded-md p-5"> 
          <div class="p-4">
            <label for="province">Pilih Provinsi: </label>
            <select v-model="selectedProvince" @change="onProvinceChange" class="border-2 border-gray-500 rounded-md">
              <option v-for="province in provinces" :key="province" :value="province">{{ province }}</option>
            </select>
          </div>

          <highchart v-if="selectedProvince" :options="populationGrowthProvOptions" :modules="['exporting', 'export-data']" />
        </div>   
      </div>

      <!-- Statistik Jumlah Penduduk per Pulau -->
      <div class="grid md:grid-cols-2 gap-5 ">
        <div class="bg-gray-100 border rounded-md p-5">
          <highchart :options="islandChartOptions" />
        </div>

        <div class="bg-gray-100 border rounded-md p-5">
          <div class="flex items-start justify-end gap-5 mb-4">     
            <label>
              <input type="radio" v-model="sharedView" value="group" /> Enable Shared
            </label>
            
            <label>
              <input type="radio" v-model="sharedView" value="individual" /> Disable Shared
            </label>
          </div>

          <highchart :options="islandOverYearsChartOptions" ref="islandChart" />
        </div>
      </div>

    </div>
    
</template>

<script>

export default {
  data() {
    return {
        selectedProvince: '', 
        provinces: [],
        populationAndDensityChartOptions: {},
        islandChartOptions: {},
        islandOverYearsChartOptions: {},
        top10MostPopulatedProvOptions: {},
        top10LeastPopulatedProvOptions: {},
        populationGrowthOptions: {},
        populationGrowthProvOptions: {},
        allData: [], 
        sharedTooltip: true,
        sharedView: 'individual',
        provinceToIslandMap: {
          "ACEH": "Sumatra",
          "SUMATERA UTARA": "Sumatra",
          "SUMATERA BARAT": "Sumatra",
          "RIAU": "Sumatra",       
          "JAMBI": "Sumatra",
          "SUMATERA SELATAN": "Sumatra",
          "BENGKULU": "Sumatra",
          "LAMPUNG": "Sumatra",
          "KEPULAUAN BANGKA BELITUNG": "Sumatra",
          "KEPULAUAN RIAU": "Sumatra",
          "DKI JAKARTA": "Jawa",
          "JAWA BARAT": "Jawa",
          "JAWA TENGAH": "Jawa",
          "DAERAH ISTIMEWA YOGYAKARTA": "Jawa",
          "JAWA TIMUR": "Jawa",
          "BANTEN": "Jawa",
          "BALI": "Bali",
          "NUSA TENGGARA BARAT": "Nusa Tenggara",
          "NUSA TENGGARA TIMUR": "Nusa Tenggara",
          "KALIMANTAN BARAT": "Kalimantan",
          "KALIMANTAN TENGAH": "Kalimantan",
          "KALIMANTAN SELATAN": "Kalimantan",
          "KALIMANTAN TIMUR": "Kalimantan",
          "KALIMANTAN UTARA": "Kalimantan",
          "SULAWESI UTARA": "Sulawesi",
          "SULAWESI TENGAH": "Sulawesi",
          "SULAWESI SELATAN": "Sulawesi",
          "SULAWESI TENGGARA": "Sulawesi",
          "GORONTALO": "Sulawesi",
          "SULAWESI BARAT": "Sulawesi",
          "MALUKU": "Maluku",
          "MALUKU UTARA": "Maluku",
          "P A P U A": "Papua",
          "PAPUA BARAT": "Papua",
          "PAPUA SELATAN": "Papua",
          "PAPUA TENGAH": "Papua",
          "PAPUA PEGUNUNGAN": "Papua",
          "PAPUA BARAT DAYA": "Papua",
      },
    };
  },

  mounted() {
    this.fetchAndInitializeData();
  },

  watch: {
    selectedProvince: 'onSelectedProvinceChange',
    sharedView: 'toggleSharedView',
  },

  methods: {
    // Fetch Data from API
    async fetchAndInitializeData() {
      try {
        const response2023 = await fetch('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF?tahun=2023');
        const data2023 = await response2023.json();

        this.populationAndDensityByProv(data2023.data);
        this.populationByIsland(data2023.data, this.provinceToIslandMap);
        this.top10MostPopulatedProvince(data2023.data);
        this.top10LeastPopulatedProvince(data2023.data);

        // Populate provinces array for the dropdown
        this.provinces = data2023.data.map(item => item.prov);

        // set the default selected province as the first element in the array
        this.selectedProvince = this.provinces.length > 0 ? this.provinces[10] : '';

        // Fetch population data 2018 - 2023
        const responseHistory = await fetch('https://api-e-database.kemendagri.go.id/api/dukcapil_jumlah_penduduk_prov/51F890E2DF');
        const dataHistory = await responseHistory.json();

        this.allData = dataHistory.data;
        this.populationGrowth(dataHistory.data);
        this.populationGrowthProv(this.allData);
        this.populationGrowthByIsland(dataHistory.data, this.provinceToIslandMap);

      } catch (error) {
        console.error('Error fetching or processing data: ', error);
      }
    },

    populationAndDensityByProv(data) {
      const provinceData = data.map((item) => item.prov);
      const populationData = data.map((item) => parseInt(item.jumlah_penduduk));
      const densityData = data.map((item) => parseFloat(item.jumlah_penduduk_km2));

      this.populationAndDensityChartOptions = {
        chart: {
          type: 'column',
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          scrollablePlotArea: {
              minWidth: 600
          }
        },
        title: {
          text: 'Total Population and Density in Indonesia, 2023',
        },
        subtitle: {
          text: 'Statistik Jumlah Penduduk dan Kepadatan Penduduk per Provinsi di Indonesia tahun 2023'
        },
        caption: {
          text: 'Sumber: e-Database Kependudukan Kementerian Dalam Negeri RI'
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 120,
            y: 70,
            floating: true,
            borderWidth: 1,
            backgroundColor: '#f5f5f5'
        },
        xAxis: {
          categories: provinceData,
          crosshair: true,
          labels: {
            rotation: -45, 
            style: {
              fontSize: '10px', 
            },
          },
        },
        yAxis: [
          {
            title: {
              text: 'Jumlah Penduduk',
            },
          },
          {
            title: {
              text: 'Kepadatan Penduduk (jiwa/km)',
            },
            opposite: true,
          },
        ],
        series: [
          {
            name: 'Kepadatan Penduduk',
            type: 'column',
            data: densityData,
          },
          {
            name: 'Jumlah Penduduk',
            type: 'spline',
            yAxis: 1,
            dashStyle: 'shortdot',
            data: populationData,
          },
        ],
      };
    },

    // Population Distribution by Island
    populationByIsland(data, provinceToIslandMap) {
      // group population data by province
      const populationByProvince = {};
      data.forEach(item => {
        const province = item.prov;
        populationByProvince[province] = item.jumlah_penduduk;
      });

      // group population data by island
      const populationByIsland = {};
      data.forEach(item => {
          const island = provinceToIslandMap[item.prov];
          if (island) {
              populationByIsland[island] = (populationByIsland[island] || 0) + parseInt(item.jumlah_penduduk);
          }
      });

      // prepare pie chart options
      const islands = Object.keys(populationByIsland);
      const populationData = islands.map(island => ({
          name: island,
          y: populationByIsland[island],
          // sliced: true,
      }));
    
      this.islandChartOptions = {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Population Distribution by Island in Indonesia, 2023',
        },
        subtitle: {
          text: 'Distribusi Populasi di Kepulauan di Indonesia Tahun 2023',
        },
        caption: {
          text: 'Sumber: e-Database Kependudukan Kementerian Dalam Negeri RI'
        },
        series: [{
          name: 'Jumlah Penduduk',
          data: populationData,
          allowPointSelect: true,
          showInLegend: true,
          animation: {
              duration: 1000
          },
        }],
        plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [
                {
                  enabled: true,
                  distance: 20,
                  format: '{point.name}: {point.percentage:.1f}%'
                }, 
                {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.5
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 5
                  }
              }]
            }
        },
        legend: {
          align: 'right',
          verticalAlign: 'middle',
          layout: 'vertical',
      },      
      };
    },

    // Top 10 Most Populated Province 
    top10MostPopulatedProvince(data) {
      const sortedData = data.sort((a, b) => b.jumlah_penduduk - a.jumlah_penduduk);
      const top10Data = sortedData.slice(0, 10); 
      const provinceData = top10Data.map((item) => item.prov);
      const populationData = top10Data.map((item) => parseInt(item.jumlah_penduduk));

      this.top10MostPopulatedProvOptions = {
        chart: {
          type: 'bar',
          
            height: '500px'
          
        },
        title: {
          text: 'Most Populated Provinces in Indonesia, 2023',
        },
        subtitle: {
          text: 'Statistik 10 Provinsi dengan Jumlah Penduduk Terbanyak di Indonesia Tahun 2023',
        },
        caption: {
          text: 'Sumber: e-Database Kependudukan Kementerian Dalam Negeri RI'
        },
        legend: {
          enabled: false,
          align: 'right',
          verticalAlign: 'top',
        },
        xAxis: {
          categories: provinceData,
        },
        yAxis: {
          title: {
            text: 'Jumlah Penduduk',
          },
        },
        series: [{
          name: 'Jumlah Penduduk',
          data: populationData,
          colorByPoint: true,
          groupPadding: 0,
        }],
        plotOptions: {
          groupPadding:0.1,
          pointWidth:20,
          bar: {
            borderRadius: 100,
          },
          series: {
            dataLabels: {
              enabled: true,
              formatter: function() {
                return this.point.y.toLocaleString(); 
              }
            }
          }
        },
      };
    },

    // provinsi dengan jumlah penduduk tersedikit di indonesia
    top10LeastPopulatedProvince(data) {
      const sortedData = data.sort((a, b) => a.jumlah_penduduk - b.jumlah_penduduk);
      const top10Data = sortedData.slice(0, 10);
      const provinceData = top10Data.map((item) => item.prov);
      const populationData = top10Data.map((item) => parseInt(item.jumlah_penduduk));

      this.top10LeastPopulatedProvOptions = {
        chart: {
          type: 'bar',
          height: '500px',
        },
        title: {
          text: 'Least Populated Provinces in Indonesia, 2023'
        },
        subtitle: {
          text: 'Statistik Provinsi dengan Jumlah Penduduk Tersedikit di Indonesia Tahun 2023',
        },
        caption: {
          text: 'Sumber: e-Database Kependudukan Kementerian Dalam Negeri RI'
        },
        legend: {
          enabled: false,
          align: 'right',
          verticalAlign: 'top',
        },
        xAxis: {
          categories: provinceData,
        },
        yAxis: {
          title: {
            text: 'Jumlah Penduduk',
          },
        },
        series: [{
          name: 'Jumlah Penduduk',
          data: populationData,
          colorByPoint: true,
          groupPadding: 0,
        }],
        plotOptions: {
          groupPadding: 0.1,
          pointWidth: 20,
          bar: {
            borderRadius: 100,
          },
          series: {
            dataLabels: {
              enabled: true,
              formatter: function() {
                return this.point.y.toLocaleString(); 
              }
            }
          }
        },
      };
    },

    // Population Growth in 2018-2023 in Indonesia
    populationGrowth(data) {
      const years = Array.from(new Set(data.map(item => item.tahun)));

      const seriesData = years.map(year => {
        const yearData = data.filter(item => item.tahun === year);
        const totalPopulation = yearData.reduce((sum, item) => sum + parseInt(item.jumlah_penduduk), 0);
        return {
          name: year,
          y: totalPopulation,
        };
      });

      // Find the year with the highest population spike
      const maxPopulationYear = seriesData.reduce((maxYear, currentYear) => {
        return currentYear.y > maxYear.y ? currentYear : maxYear;
      }, { y: 0 }).name;

      this.populationGrowthOptions = {
        chart: {  
          type: 'line',
        },
        title: {
          text: 'Population Growth in Indonesia (2018-2023)',
        },
        subtitle: {
          text: 'Perkembangan Jumlah Penduduk per Provinsi di Indonesia Tahun 2018 - 2023',
        },
        caption: {
          text: 'Sumber: e-Database Kependudukan Kementerian Dalam Negeri RI'
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
        },
        xAxis: {
          categories: years,
          title: {
            text: 'Tahun',
          },
        },
        yAxis: {
          title: {
            text: 'Jumlah Penduduk',
          },
        },
        series: [{
          name: 'Jumlah Penduduk',
          data: seriesData,
          dashStyle: 'ShortDashDot'
        }],
        plotOptions: {
          series: {
            dataLabels: {
              enabled: true,
              formatter: function() {
                return this.point.y.toLocaleString(); 
              }
            }
          }
        },
        
      };
    },

    // Population Growth in 2018-2023 for specific Province 
    populationGrowthProv(data) {
      const filteredData = data.filter(item => item.prov === this.selectedProvince);

        // extract years and total population in 2018-2023
        const years = Array.from(new Set(filteredData.map(item => item.tahun)))
          .filter(year => parseInt(year) >= 2018 && parseInt(year) <= 2023)
          .sort();

        const seriesData = years.map(year => {
          const yearData = filteredData.filter(item => item.tahun === year);
          const totalPopulation = yearData.reduce((sum, item) => sum + parseInt(item.jumlah_penduduk), 0);
          return {
            name: year,
            y: totalPopulation,
          };
        });

        this.populationGrowthProvOptions = {
          chart: {
            type: 'spline',
          },
          title: {
            text: `Population Growth in Province ${this.selectedProvince} (2018-2023)`,
          },
          subtitle: {
            text: `Perkembangan Jumlah Penduduk di Provinsi ${this.selectedProvince} pada Tahun 2018 hingga 2023`,
          },
          caption: {
            text: 'Berikut adalah grafik yang menunjukkan perkembangan jumlah penduduk di berbagai provinsi di Indonesia dari tahun 2018 hingga 2023. Anda dapat melihat data statistik populasi untuk provinsi tertentu dengan memilihnya dari menu dropdown di atas.'
          },
          legend: {
            align: 'right',
            verticalAlign: 'top',
          },
          xAxis: {
            categories: years,
            title: {
              text: 'Tahun',
            },
          },
          yAxis: {
            title: {
              text: 'Jumlah Penduduk',
            },
          },
          series: [{
            name: 'Jumlah Penduduk',
            data: seriesData,
          }],
          plotOptions: {
            series: {
              dataLabels: {
                enabled: true,
                formatter: function() {
                  return this.point.y.toLocaleString(); 
                }
              }
            }
          },
        };
    },

    onSelectedProvinceChange() {
      this.populationGrowthProv(this.allData);
    },

    // stacked bar chart to compare population growth by island
    populationGrowthByIsland(data, provinceToIslandMap) {
      const years = Array.from(new Set(data.map(item => item.tahun)));
      const islands = Array.from(new Set(Object.values(provinceToIslandMap)));

      const seriesData = islands.map(island => {
        const islandData = data.filter(item => provinceToIslandMap[item.prov] === island);

        const islandPopulationData = years.map(year => {
          const yearData = islandData.filter(item => item.tahun === year);
          const totalPopulation = yearData.reduce((sum, item) => sum + parseInt(item.jumlah_penduduk), 0);
          return totalPopulation;
        });

        return {
          name: island,
          data: islandPopulationData,
          fillOpacity: 0.5,
          marker: {
              enabled: true
          },
        };
      });


      this.islandOverYearsChartOptions = {
        chart: {
          type: 'areaspline',
        },
        title: {
          text: 'Population Growth by Island in Indonesia (2018-2023)',
        },
        subtitle: {
          text: 'Perkembangan Populasi di Kepulauan di Indonesia Tahun 2018 hingga 2023',
        },
        caption: {
          text: 'Sumber: e-Database Kependudukan Kementerian Dalam Negeri RI'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -20,
            y: 70,
            floating: true,
            borderWidth: 1,
            itemHeight: 25,
            maxHeight: 100,
            backgroundColor: '#FFFFFF'
        },
        xAxis: {
          categories: years,
          title: {
            text: 'Tahun',
          },
        },
        yAxis: {
          title: {
            text: 'Jumlah Penduduk',
          },
          maxPadding: 0.1,
        },
        plotOptions: {
          series: {
            stacking: 'normal',
          },
        },
        series: seriesData,
        tooltip: {
          shared: this.sharedTooltip,
          // split: true,
          headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>',
        },
      };
    },

    toggleSharedView() {
      // Based on the selected radio button, set the sharedTooltip property accordingly
      this.sharedTooltip = this.sharedView === 'group';
      // this.sharedTooltip = !this.sharedTooltip;

      // Update the chart options and redraw
      this.$refs.islandChart.chart.update({
        tooltip: {
          shared: this.sharedTooltip,
        },
      });
    },
 
    

  }
  
};

</script>