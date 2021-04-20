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