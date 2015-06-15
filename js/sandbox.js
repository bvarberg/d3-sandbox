$(function() {
    // The dom is ready - time to shine.

    // An example from "Data Visualization with D3.js"
    //       by Ray Villalobos
    //       via lynda.com (http://www.lynda.com/D3js-tutorials/Data-Visualization-D3js/162449-2.html)
    var bardata = [];

    for (var i=0; i<20; i++) {
        bardata.push(Math.random()*20)
    }

    var height = 400,
        width = 600,
        barWidth = 50,
        barOffset = 5;

    var colors = d3.scale.linear()
            .domain([0, bardata.length])
            .range(['#ffb832', '#c61c6f']);

    var yScale = d3.scale.linear()
            .domain([0, d3.max(bardata)])
            .range([0, height-50]);

    var xScale = d3.scale.ordinal()
            .domain(d3.range(0, bardata.length))
            .rangeBands([0, width]);

    d3.select('#container').append('svg')
        .attr('width', width)
        .attr('height', height)
        .selectAll('rect')
            .data(bardata)
            .enter().append('rect')
                .style('fill', function(d, i) {
                    return colors(i);
                })
                .attr('width', xScale.rangeBand())
                .attr('height', function(d) {
                    return yScale(d);
                })
                .attr('x', function(d, i) {
                    return xScale(i);
                })
                .attr('y', function(d) {
                    return height - yScale(d);
                });
});
