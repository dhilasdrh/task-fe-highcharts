<template>
    <div>
        <highchart :options="chartOptions" />

        <highchart :options="chartMultipleOptions" />
    </div>
</template>


<script>

export default {
    data() {
        return {
            chartOptions: {
                title: {
                    text: 'Statistik Penduduk Surabaya',
                    align: 'left'
                },
                subtitle: {
                    text: 'Data penduduk Surabaya pada tahun 2018 sampai 2022',
                    align: 'left'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal',
                    reversed: true,
                },
                series: [
                    {
                        name: 'Pria',
                        type: 'column',
                        data: [78, 80, 90, 124, 223]
                    },
                    {
                        name: 'Wanita',
                        type: 'column',
                        data: [90, 110, 128, 210, 312]
                    },
                    {
                        name: 'Rata-rata',
                        type: 'line',
                        // step: 'center',
                        data: [84, 95, 109, 167, 267.5]
                    },
                    {
                        name: 'Total',
                        type: 'pie',
                        innerSize: '30%',
                        size: '150',
                        center: [60, 40],
                        dataLabels: {
                            enabled: false
                        },
                        data: [
                            {
                                name: 'Pria',
                                y: 517
                            },
                            {
                                name: 'Wanita',
                                y: 590
                            }
                        ]
                    }
                ],
                xAxis: {
                    categories: [2018, 2019, 2020, 2021, 2022],
                    title: {
                        text: 'Tahun'
                    }
                },
                yAxis: {
                    title: {
                        text: 'Jumlah Penduduk'
                    },
                    labels: {
                        format: '{value} million'
                    },
                },
                // tooltip: {
                //     // enabled: false,
                //     // format: 'Tahun {x} <br> Jumlah penduduk {series.name} <b>{point.y}</b>'

                //     //untuk share tooltip
                //     shared: true,
                //     split: true,
                //     formatter: function() {
                //         // console.log(this.x)
                //         return [`<b>Tahun ${this.x} </b><br>`].concat(
                //             this.points ? this.points.map(point => {
                //                 return `Jumlah ${point.series.name}: ${point.y} <br>`
                //             }) : []
                //         )
                //     }
                    
                // },

            },

            chartMultipleOptions: {
                title: {
                    text: 'Prakiraan Cuaca Surabaya',
                    align: 'left'
                },
                subtitle: {
                    text: 'Prakiraan Cuaca Surabaya 2024',
                    align: 'left'
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'top',
                    layout: 'horizontal',
                    reversed: true,
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
                'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    title: {
                        text: 'Bulan'
                    }
                },
                yAxis: [
                    {
                        title: {
                            text: 'Temperatur'
                        },
                        labels: {
                            format: '{value}°C'
                        },
                    },
                    {
                        title: {
                            text: 'Kelembaban Udara'
                        },
                        labels: {
                            format: '{value}%'
                        },
                    },
                    {
                        title: {
                            text: 'Kecepatan Angin'
                        },
                        labels: {
                            format: '{value} km/jam'
                        },
                        opposite: true
                    },
                ],
                series: [
                    {
                        name: 'Temperatur',
                        type: 'column',
                        tooltip: {
                            valueSuffix: '°C'
                        },
                        data: [25, 25, 26, 27, 26, 28, 29, 30, 31, 28, 32, 31]
                    },
                    {
                        name: 'Kelembapan Udara',
                        type: 'spline',
                        tooltip: {
                            valueSuffix: '%'
                        },
                        yAxis: 1,
                        marker: {
                            enabled: false
                        },
                        dashStyle: 'shortdot',
                        data: [80, 85, 88, 65, 70, 72, 83, 73, 79, 80, 84, 85]
                    },  
                    {
                        name: 'Kecepatan angin',
                        type: 'spline',
                        tooltip: {
                            valueSuffix: 'km/jam'
                        },
                        yAxis: 2,
                        data: [12, 14, 15, 13, 15, 18, 14, 20, 19, 17, 15, 15]
                    }, 
                ],
                // tooltip: {
                //     // enabled: false,
                //     // format: 'Tahun {x} <br> Jumlah penduduk {series.name} <b>{point.y}</b>'

                //     //untuk share tooltip
                //     shared: true,
                //     split: true,
                //     formatter: function() {
                //         // console.log(this.x)
                //         return [`<b>Tahun ${this.x} </b><br>`].concat(
                //             this.points ? this.points.map(point => {
                //                 return `Jumlah ${point.series.name}: ${point.y} <br>`
                //             }) : []
                //         )
                //     }
                    
                // },

            }
        }
    }
}

</script>