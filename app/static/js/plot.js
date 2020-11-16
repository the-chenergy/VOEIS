class Plot {
  static PADDING_FACTOR = 12.5;

  /* main, bottom, secondary, ternary, text */
  constructor(plotID, plotType) {
    this.plot = d3.select('#' + plotID);
    this.plotType = plotType;
    this.visType = new Map();
    this.currData = null;

    this.visType.set('scatter', {
      plotData: Visualizations.scatter,
      plotAxes: Visualizations.scatterAxis
    });

    window.addEventListener('resize', () => {
      this.visType.get(this.plotType).plotAxes(this.currData, this.plot);
    });

    this.xAxisElem = this.plot.append('svg')
                         .attr('x', Plot.PADDING_FACTOR + '%')
                         .attr('y', 100 - Plot.PADDING_FACTOR + '%')
                         .append('g')
                         .attr('id', 'xAxis');
    this.yAxisElem = this.plot.append('svg')
                         .attr('x', Plot.PADDING_FACTOR + '%')
                         .attr('y', Plot.PADDING_FACTOR + '%')
                         .append('g')
                         .attr('id', 'yAxis');
    this.xAxisLabel = this.plot.append('text')
                          .attr('id', 'xLabel')
                          .attr('class', 'axis-label');
    this.xAxisLabel = this.plot.append('text')
                          .attr('id', 'yLabel')
                          .attr('class', 'axis-label');
    this.titleLabel = this.plot.append('text')
                          .attr('id', 'titleLabel')
                          .attr('class', 'title-label');
  }

  /* get appropriate function and send it data to plot */
  drawPlot(data, index) {
    this.currData = data;
    this.visType.get(this.plotType).plotData(data, this.plot);
    this.visType.get(this.plotType).plotAxes(data, this.plot);

    /* TODO:
      When index passed already exists, we are deplotting. Data is arbitrary.  
    */
  }

  /* remove drawn elements, but not axis */
  clearPlot() {
    this.plot.selectAll('data-elem').remove();
  }
  
  /* set plottable stats for this plot */
  setMenuItems(index, menuItems) {
    /* TODO:
      We are plotting the statistic menuItems[index]. Alos let
      dropdown have items in menuItems.
    */
  }

}

class Visualizations {
  /* we are getting dictionary of form
      x:[size n]
      y:[size n]
      yLabel:string
      xLabel:string
      title:string
      magnitudes:[size n]
  */
  static scatter(data, elem) {
    // create scale for axis

    let widthScale = d3.scaleLinear().domain(data['xExtent']).range([
      Plot.PADDING_FACTOR,
      100 - Plot.PADDING_FACTOR,
    ]);
    let heightScale = d3.scaleLinear().domain(data['yExtent']).range([
      100 - Plot.PADDING_FACTOR,
      Plot.PADDING_FACTOR,
    ]);
    let radiusScale =
        d3.scaleLinear().domain(data['magnitudeExtent']).range([0, 6]);

    // plot
    let circles = elem.selectAll('circle').data(data.values);
    circles.exit().remove()
    circles = circles.enter().append('circle').merge(circles);
    circles.attr('cx', d => widthScale(d.x) + '%')
        .attr('cy', d => {return heightScale(d.y) + '%'})
        .attr('r', d => radiusScale(d.magnitude))
        .style('fill', 'gray');
  }
  static scatterAxis(data, elem) {
    if (data == null) return;

    const plotWidth = elem.node().clientWidth,
          plotHeight = elem.node().clientHeight;

    // create scale for axis
    let xAxisPadding = Plot.PADDING_FACTOR / 100 * plotWidth;
    let yAxisPadding = Plot.PADDING_FACTOR / 100 * plotHeight;

    let xAxisScale = d3.scaleLinear().domain(data['xExtent']).range([
      0,
      plotWidth - xAxisPadding * 2,
    ]);
    let yAxisScale = d3.scaleLinear().domain(data['yExtent']).range([
      plotHeight - yAxisPadding * 2,
      0,
    ]);

    let xAxis = d3.axisBottom().scale(xAxisScale).ticks(5);
    let yAxis = d3.axisRight().scale(yAxisScale).ticks(5);

    // plot axes
    elem.select('#xAxis').call(xAxis);
    elem.select('#yAxis').call(yAxis);

    // show axis and title labels
    let tf = `translate(${plotWidth / 2}, ${plotHeight - yAxisPadding + 36})`;
    elem.select('#xLabel').attr('transform', tf).text(data.xLabel);

    tf = `translate(${xAxisPadding - 12}, ${plotHeight / 2}) `;
    elem.select('#yLabel')
        .attr('transform', tf + 'rotate(-90)')
        .text(data.yLabel);

    tf = `translate(${plotWidth / 2}, 24)`;
    elem.select('#titleLabel').attr('transform', tf).text(data.title);
  }
}
