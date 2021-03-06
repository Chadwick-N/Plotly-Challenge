var idSelect = d3.select("#selDataset");
var demographicsTable = d3.select("#sample-metadata");
var barChart = d3.select("#bar");
var bubbleChart = d3.select("bubble");
var gaugeChart = d3.select("gauge");

// Function to populate dropdown menu with IDs and chart creation
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

// Function to reset divs to prepare for new data
function resetData() {
    demographicsTable.html("");
    barChart.html("");
    bubbleChart.html("");
    gaugeChart.html("");
};

// Function to read JSON and plot charts
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

        var individualSample = data.samples.filter(sample => sample.id == id)[0];
        var otuIds = [];
        var otuLabels = [];
        var sampleValues = [];

        Object.entries(individualSample).forEach(([key, value]) => {
            switch (key) {
                case "otu_ids":
                    otuIds.push(value);
                    break;
                case "sample_values":
                    sampleValues.push(value);
                    break;
                case "otu_labels":
                    otuLabels.push(value);
                    break;
                default:
                    break;
            }
        });
        
        var topOtuIds = otuIds[0].slice(0, 10).reverse();
        var topOtuLabels = otuLabels[0].slice(0, 10).reverse();
        var topSampleValues = sampleValues[0].slice(0, 10).reverse();
        var topOtuIdsFormatted = topOtuIds.map(otuID => "OTU " + otuID);

        var traceBar = {
            x: topSampleValues,
            y: topOtuIdsFormatted,
            text: topOtuLabels,
            type: 'bar',
            orientation: 'h',
            marker: {
                color: 'rgb(30,150,200)'
            }
        };

        var dataBar = [traceBar];

        var layoutBar = {
            height: 750,
            width: 1000,
            font: {
                family: 'Ariel'
            },
            hoverlabel: {
                font: {
                    family: 'Ariel'
                }
            },
            title: {
                text: `<b>Top 10 OTU's for ID #${id}</b>`,
                font: {
                    size: 18,
                    color: 'rgb(34,94,168)'
                }
            },
            xaxis: {
                title: "<b>Sample Values<b>",
                color: 'rgb(30,150,200)',
                tickfont: { size: 17 }
            },
            yaxis: {
                tickfont: { size: 17 }
            }
        }

        Plotly.newPlot("bar", dataBar, layoutBar);

        var traceBub = {
            x: otuIds[0],
            y: sampleValues[0],
            text: otuLabels[0],
            mode: 'markers',
            marker: {
                size: sampleValues[0],
                color: otuIds[0],
                colorscale: 'rgb'
            }
        };

        var dataBub = [traceBub];

        var layoutBub = {
            font: {
                family: 'Ariel'
            },
            hoverlabel: {
                font: {
                    family: 'Ariel'
                }
            },
            xaxis: {
                title: "<b>OTU ID</b>",
                color: 'rgb(30,150,200)'
            },
            yaxis: {
                title: "<b>Sample Values</b>",
                color: 'rgb(30,150,200)'
            },
        };

        Plotly.newPlot('bubble', dataBub, layoutBub);

    }));
};

init();