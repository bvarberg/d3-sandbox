$(function() {
    // The dom is ready - time to shine.

    // An example from "Data Visualization with D3.js"
    //       by Ray Villalobos
    //       via lynda.com (http://www.lynda.com/D3js-tutorials/Data-Visualization-D3js/162449-2.html)

    d3.tsv('data/numbers.tsv', function(error, data) {

        console.log(data);

        var bardata = [];
        for (key in data) {
            bardata.push(data[key].value);
        }

        var margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        };

        var height = 600 - margin.top - margin.bottom,
            width = 800 - margin.right - margin.left,
            barWidth = 50,
            barOffset = 5;

        var tempColor;

        var colors = d3.scale.linear()
                .domain([0, bardata.length])
                .range(['#ffb832', '#c61c6f']);

        var yScale = d3.scale.linear()
                .domain([0, d3.max(bardata)])
                .range([0, height]);

        var vGuideScale = d3.scale.linear()
                .domain([0, d3.max(bardata)])
                .range([height, 0]);

        var xScale = d3.scale.ordinal()
                .domain(d3.range(0, bardata.length))
                .rangeBands([1, width], .05, 0.5);

        var tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('padding', '0 10px')
                .style('background', 'white')
                .style('opacity', 0);

        var myChart = d3.select('.container').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
            .selectAll('rect').data(bardata)
                .enter().append('rect')
                    .style('fill', function(d, i) {
                        return colors(i);
                    })
                    .attr('width', xScale.rangeBand())
                    .attr('x', function(d, i) {
                        return xScale(i);
                    })
                    .attr('height', 0)
                    .attr('y', height)
                .on('mouseover', function(d) {
                    tooltip.transition()
                        .style('opacity', 0.9);
                    tooltip.html(d)
                        .style('left', (d3.event.pageX-35) + 'px')
                        .style('top', (d3.event.pageY) + 'px');

                    tempColor = this.style.fill;
                    d3.select(this)
                        .style('opacity', .5)
                        .style('fill', 'yellow');
                })
                .on('mouseout', function(d) {
                    tooltip.transition()
                        .style('opacity', 0);
                    d3.select(this)
                        .style('opacity', 1.0)
                        .style('fill', tempColor);
                });
        myChart.transition()
            .attr('height', function(d) {
                return yScale(d);
            })
            .attr('y', function(d) {
                return height - yScale(d);
            })
            .delay(function(d, i) {
                return i * 30;
            })
            .duration(1000)
            .ease('elastic');

        var vAxis = d3.svg.axis()
            .scale(vGuideScale)
            .orient('left')
            .ticks(10)

        var vGuide = d3.select('svg').append('g');
            vAxis(vGuide);

            vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
            vGuide.selectAll('path')
                .style({ fill: 'none', stroke: '#000' });
            vGuide.selectAll('line')
                .style({ stroke: '#000' });

        var hAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .tickValues(xScale.domain().filter(function(d,i) {
                    return !(i % (bardata.length/5));
                }));

        var hGuide = d3.select('svg').append('g');
            hAxis(hGuide);

            hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')');
            hGuide.selectAll('path')
                .style({ fill: 'none', stroke: '#000' });
            hGuide.selectAll('line')
                .style({ stroke: '#000' });

    });
});
