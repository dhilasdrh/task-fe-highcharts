<template>
    <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-200 rounded-md shadow-md">
            <highchart :options="chartOptions"
            :modules="['exporting', 'export-data']" />
        </div>
        
        <div class="bg-gray-200 rounded-md shadow-md">
            <highchart :options="chartColumnOptions"
            :modules="['exporting', 'export-data']" />
        </div>

        <div class="bg-gray-200 rounded-md shadow-md">
            <highchart 
            :options="chartColumnStackOptions" 
            :modules="['exporting', 'export-data']"/>
        </div>

        <div class="bg-gray-200 rounded-md shadow-md">
            <highchart :options="pieChartOptions"
            :modules="['exporting', 'export-data']" />
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            // type pie / donuts
            pieChartOptions: {
                chart: {
                    type: 'pie',
                    backgroundColor: '#FDF0D1'
                },
                title: {
                    text: 'Perbandingan Pria dan Wanita'
                },
                subtitle: {
                    text: 'Perbandingan Pria dan Wanita di Lombok'
                },
                plotOptions: {
                    pie: {
                        innerSize: '30%',
                        allowPointSelect: true,
                        dataLabels: {
                            enabled: true,
                            distance: -50,
                            format: '{point.name} <br> {point.y}'
                        }
                    }
                },
                series: [
                    {
                        name: 'Perbandingan Penduduk',
                        data: [
                            {
                                name: 'Pria',
                                y: 45679
                            },
                            {
                                name: 'Wanita',
                                y: 67555
                            },

                        ]
                    }
                ]

            },

            // type spline / arespline
            chartOptions: {
                chart: {
                    // type: 'spline',
                    type: 'areaspline',
                    backgroundColor: 'transparent'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Statistik Penduduk Lombok',
                    style: {
                        fontSize: '24px',
                        color: '#FF0000'
                    }
                },
                subtitle: {
                    text: 'Data Penduduk Lombok Tahun 2018 - 2023'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal'
                },
                tooltip: {
                    // enabled: false,
                    // format: 'Tahun {x} <br> Jumlah penduduk {series.name} <b>{point.y}'
                    // formatter: function() {
                    //     return `<b>Tahun ${this.x}</b> <br> 
                    //     Jumlah penduduk ${this.series.name} <b>${this.point.y}</b>`
                    // }

                    //untuk share tooltip
                    shared: true,
                    formatter: function() {
                        console.log(this.x)
                        return [`<b>Tahun ${this.x} </b><br>`].concat(
                            this.points ? this.points.map(point => {
                                return `Jumlah ${point.series.name}: ${point.y} <br>`
                            }) : []
                        )
                    }
                    
                },
                plotOptions: {
                    spline: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                xAxis: {
                    categories: ['2018', '2019', '2020', '2021', '2022'],
                    title: {
                        text: 'Tahun'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Penduduk'
                    }
                },
                series: [
                    {
                        name: 'Pria',
                        data: [34567, 45678, 45003, 60002, 64302]
                    },
                    {
                        name: 'Wanita',
                        data: [42345, 52346, 67890, 70023, 68020]
                    }
                ]
            },

            // type column / bar
            chartColumnOptions: {
                chart: {
                    // type: 'column',
                    type: 'bar',
                    backgroundColor: 'transparent'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Statistik Penduduk Lombok'
                },
                subtitle: {
                    text: 'Data Penduduk Lombok Tahun 2018 - 2023'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal'
                },
                tooltip: {
                    // enabled: false,
                    // format: 'Tahun {x} <br> Jumlah penduduk {series.name} <b>{point.y}'
                    // formatter: function() {
                    //     return `<b>Tahun ${this.x}</b> <br> 
                    //     Jumlah penduduk ${this.series.name} <b>${this.point.y}</b>`
                    // }

                    //untuk share tooltip
                    shared: true,
                    formatter: function() {
                        console.log(this.x)
                        return [`<b>Tahun ${this.x} </b><br>`].concat(
                            this.points ? this.points.map(point => {
                                return `Jumlah ${point.series.name}: ${point.y} <br>`
                            }) : []
                        )
                    }
                    
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                xAxis: {
                    categories: ['2018', '2019', '2020', '2021', '2022'],
                    title: {
                        text: 'Tahun'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Penduduk'
                    }
                },
                series: [
                    {
                        name: 'Pria',
                        data: [34567, 45678, 45003, 60002, 64302]
                    },
                    {
                        name: 'Wanita',
                        data: [42345, 52346, 67890, 70023, 68020]
                    }
                ]
            },

            // column stack
            chartColumnStackOptions: {
                chart: {
                    type: 'column',
                    backgroundColor: 'transparent'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Statistik Penduduk Lombok'
                },
                subtitle: {
                    text: 'Data Penduduk Lombok Tahun 2018 - 2023'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal'
                },
                tooltip: {
                    // enabled: false,
                    // format: 'Tahun {x} <br> Jumlah penduduk {series.name} <b>{point.y}'
                    // formatter: function() {
                    //     return `<b>Tahun ${this.x}</b> <br> 
                    //     Jumlah penduduk ${this.series.name} <b>${this.point.y}</b>`
                    // }

                    //untuk share tooltip
                    shared: true,
                    formatter: function() {
                        console.log(this.x)
                        return [`<b>Tahun ${this.x} </b><br>`].concat(
                            this.points ? this.points.map(point => {
                                return `Jumlah ${point.series.name}: ${point.y} <br>`
                            }) : []
                        )
                    }
                    
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                xAxis: {
                    categories: ['2018', '2019', '2020', '2021', '2022'],
                    title: {
                        text: 'Tahun'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Penduduk'
                    }
                },
                series: [
                    {
                        name: 'Pria',
                        data: [34567, 45678, 45003, 60002, 64302]
                    },
                    {
                        name: 'Wanita',
                        data: [42345, 52346, 67890, 70023, 68020]
                    }
                ]
            }
        }
    }
    
}

</script>