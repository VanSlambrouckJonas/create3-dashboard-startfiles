'use strict';
let daySelect, graph;

const labels = ["week1", "week2", "week3", "week4", "week5", "week6", "week7"];

const drawChart = function(data){
    const ctx = document.querySelector('.js-graph').getContext('2d');
    new Chart(ctx, {
		type: 'line',
		data: {
			labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
			datasets: [
				{
					label: 'Visitors',
					data: data,
					borderColor: '#A3A0FB',
					backgroundColor: '#A3A0FB10',
					pointBackgroundColor: 'white',
					lineTension: 0.3,
					borderWidth: 2,
					pointRadius: 4,
				},
			],
		},
		options: {
			defaultFontColor: (Chart.defaults.global.defaultFontColor = '#808495'),
			scales: {
				yAxes: [
					{
						ticks: {
							min: 0,
							max: 50,
						},
					},
				],
			},
			tooltips: {
				xPadding: 10,
				yPadding: 10,
				cornerRadius: 0,
			},
			legend: {
				position: 'bottom',
				align: 'start',
				labels: {
					defaultFontFamily: (Chart.defaults.global.defaultFontFamily = "'Source Sans Pro', 'Helvetica', 'arial', 'sans-serif'"),
					boxWidth: 2,
				},
			},
			responsive: true,
		},
	});
}

const getVisitorsByDay = function(day){
    graph = document.querySelector('.js-graph');
    fetch('https://labomctstudenten.azurewebsites.net/api/visitors/' + day)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            getData(data);
        });
}

const getData = function(json){
    var datalist = [];
    json.forEach(element => {
        datalist.push(element.aantalBezoekers);
    });
    console.log(datalist);
    drawChart(datalist);
}

const init = function() { 
    daySelect = document.querySelector('.js-selection');
    getVisitorsByDay("Maandag");
    daySelect.addEventListener('change', function(){
        console.log("selection: " + this.value);
        getVisitorsByDay(this.value);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    init();
});