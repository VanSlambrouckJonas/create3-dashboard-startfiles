'use strict';
let daySelect, graph;

const getVisitorsByDay = function(day){
    graph = document.querySelector('.js-graph');
    fetch('https://iotcloud-mct.azurewebsites.net/api/visitors/' + day)
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
}

const init = function() { 
    daySelect = document.querySelector('.js-selection');
    daySelect.addEventListener('change', function(){
        console.log("selection: " + this.value);
        getVisitorsByDay(this.value);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    init();
});