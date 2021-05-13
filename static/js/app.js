var idSelect = d3.select("#selDataset");
var demographicsTable = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");
var gaugeChart = d3.select("gauge");

// function to populate dropdown menu with IDs and chart creation
function init() {
    resetData();
    d3.json("data/samples.json").then((data => {
        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        }));
        var initId = idSelect.property("value")
        plotCharts(initId);
    })); 
}

// function to reset divs to prepare for new data
function resetData() {
    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
    gaugeChart.html("");
};

// function to read JSON and plot charts
function plotCharts(id) {
    d3.json("data/samples.json").then((data => {
        var individualMetadata = data.metadata.filter(participant => participant.id == id)[0];
        var wfreq = individualMetadata.wfreq;
        Object.entries(individualMetadata).forEach(([key, value]) => {
            var newList = demographicsTable.append("ul");
            newList.attr("class", "list-group list-group-flush");
            var listItem = newList.append("li");
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent");
            listItem.text(`${key}: ${value}`);
        });

    }));
};

init();