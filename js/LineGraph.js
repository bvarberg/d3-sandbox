// A reusable d3 line graph (for motionhealth data)
import d3 from 'd3';
import _ from 'lodash';

export default class LineGraph {
  constructor (props) {
    // Element
    this.hook = props.hook || undefined;
    this.el = d3.select(this.hook);

    // Visualization margins
    this.margin = props.margin || { top: 40, right: 40, bottom: 40, left: 40 };

    // Actual dimensions
    //  - based on hooked element or parameter passed in
    this._height = parseInt(this.el.style('height')) || props.height;
    this._width = parseInt(this.el.style('width')) || props.width;

    // Calculated dimensions
    this.height = this._height - this.margin.top - this.margin.bottom;
    this.width = this._width - this.margin.right - this.margin.left;

    // Graph data
    this.data = props.data || undefined;
    this.zone = props.zone || undefined;
    this.datapoints = props.datapoints || undefined;

    // Scales
    // --------

    // TODO: Loop through datapoints and get the min/max of all of them
    // this.datapoints.forEach(datapoint => {
    //   let zone = this.zone;
    //   let min = d3.min(this.data, function(d) {
    //     return d[zone].data[datapoint].value;
    //   });
    //   console.log(min);
    // })

    let min = _.min(this.data, function(d) {
                return d[props.zone].data[_.last(props.datapoints)].value;
              })[this.zone].data[_.last(props.datapoints)].value;
    let max = _.max(this.data, function(d) {
                return d[props.zone].data[_.first(props.datapoints)].value;
              })[this.zone].data[_.first(props.datapoints)].value;

    this.yScale = d3.scale.linear()
      .domain([min, max])
      .range([this.height, 0]);

    this.xScale = d3.scale.ordinal()
      .domain(this.data.map(function(d) {
        return d.captureDate;
      }))
      .rangePoints([0, this.width], 0.5);
  }

  /* Renders the LineGraph */
  render () {
    console.log('[LineGraph] Rendering %s to %s', this.zone, this.hook);
    // Make sure we're starting from empty
    this.el.selectAll('svg').remove();

    // TODO: Bind to window resize events
    // d3.select(window).on('resize', this.resize);
    // except that this.resize tries to call Window.resize.

    // Append the svg element
    this.svg = this.el.append('svg:svg')
      .attr('class', 'line-chart')
      .attr('width', this.width)
      .attr('height', this.height);

    // Create the Axes
    this.renderYAxis();
    this.renderXAxis();

    // Areas
    this.renderAreaGroup();
    // Lines
    this.renderLineGroup();
    // Dots
    this.renderDotGroup();
  }

  // Renders the yAxis to the SVG
  renderYAxis () {
    console.log('Rendering y-axis');
    let yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .ticks(Math.max(this.width/50, 2));

    let yAxisGroup = this.svg.append('g')
      .attr('class', 'y-axis');
    yAxis(yAxisGroup);

    yAxisGroup.attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');
    yAxisGroup.selectAll('path')
      .style({ fill: 'none', stroke: '#000' });
    yAxisGroup.selectAll('line')
      .style({ stroke: '#000' });
  }

  // Renders the xAxis to the SVG
  renderXAxis () {
    console.log('Rendering x-axis');
    let xAxis = d3.svg.axis()
      .scale(this.xScale)
      .orient('bottom');

    let xAxisGroup = this.svg.append('g')
      .attr('class', 'x-axis');
    xAxis(xAxisGroup);

    xAxisGroup.attr('transform', 'translate(' + this.margin.left + ', ' + (this.height + this.margin.top) + ')');
    xAxisGroup.selectAll('path')
      .style({ fill: 'none', stroke: '#000' });
    xAxisGroup.selectAll('line')
      .style({ stroke: '#000' });
  }

  // Render the ideal area group to the graph
  renderAreaGroup () {
    console.log('Rendering area-group');
    this.areaGroup = this.svg.append('g')
      .attr('class', 'area-group')
      .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    let x = this.xScale;
    let y = this.yScale;
    let zone = this.zone;

    // Append lines!
    this.datapoints.forEach((dp, i) => {
        let area = d3.svg.area()
            .x(function(d) { return x(d.captureDate); })
            .y0(function(d) { return !_.isUndefined(d[zone].data[dp].ideal) ? y(d[zone].data[dp].ideal.min) : 0.0; })
            .y1(function(d) { return !_.isUndefined(d[zone].data[dp].ideal) ? y(d[zone].data[dp].ideal.max) : 0.0; });

        this.areaGroup.append('path')
            .datum(this.data)
            .attr('class', 'ideal-zone ideal-zone--' + dp)
            .attr('d', area);
    });
  }

  // Render the line group to the graph
  renderLineGroup () {
    console.log('Rendering line-group');
    this.lineGroup = this.svg.append('g')
      .attr('class', 'line-group')
      .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    let x = this.xScale;
    let y = this.yScale;
    let zone = this.zone;

    // Append lines!
    this.datapoints.forEach((dp, i) => {
      let line = d3.svg.line()
          .x(function(d) { return x(d.captureDate); })
          .y(function(d) { return y(d[zone].data[dp].value); });

      this.lineGroup.append('path')
          .datum(this.data)
          .attr('class', 'line line--' + dp)
          .attr('d', line);
    });
  }

  // Render the dot group to the graph
  renderDotGroup () {
    console.log('Rendering dot-group');
    this.dotGroup = this.svg.append('g')
      .attr('class', 'dot-group')
      .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    let x = this.xScale;
    let y = this.yScale;
    let zone = this.zone;

    // Append dots!
    this.datapoints.forEach((dp, i) => {
      this.dotGroup.append('g')
          .attr('class', 'dots dots--' + dp)
          .selectAll('.dots--abduction > .dot')
              .data(this.data)
              .enter().append('circle')
                  .attr('class', function(d) {
                    return 'dot dot--' + d[zone].data[dp].status;
                  })
                  .attr('r', 6)
                  .attr('cx', function(d) {
                      return x(d.captureDate);
                  })
                  .attr('cy', function(d) {
                      return y(d[zone].data[dp].value);
                  });
    });
  }

  // TODO: Responsive resizing on window.resize
  resize () {
    console.log('Resize called.', this);
  }
}
