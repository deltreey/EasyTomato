function usageTable(uniqueId) {
  /*
   * Initialization variables, cannot be changed.
   */
  function uniqueElementId(name) { return uniqueId + name; };
  function uniqueElementIdSelector(name) { return "#" + uniqueId + name; };
  
  // Shortcuts for convenience
  var u = uniqueElementId;
  var uS = uniqueElementIdSelector;

  var columnHeaders = [["name", "IP Address", rawFormat], ["rx_avg", "Received Average", formatSpeed], ["rx_max", "Received Max", formatSpeed], ["rx_total", "Received Total", formatSize], ["tx_avg", "Transmitted Average", formatSpeed], ["tx_max", "Transmitted Max", formatSpeed], ["tx_total", "Transmitted Total", formatSize]];
  var rowOnMouseOver = function(d) { };
  var rowOnMouseOut = function(d) { };

  function chart(selection) {
    selection.each(function(data) {
      // We don't actually want to bind to data here, but we
      // do want to see if it hasn't been created. Use a
      // dummy array to bind to.
      var table = d3.select(this).selectAll("table").data([,]);

      table.enter().append("table").classed("table table-striped table-bordered table-hover", true);

      var headerRow = table.selectAll("thead").data([,]).enter().append("thead")
        .append("tr");

      headerRow.selectAll("th.header")
          .data(columnHeaders)
            .enter()
              .append("th")
                .classed("header", true)
                .text(function(conf) { return conf[1]})


      var tableBody = table.selectAll("tbody").data([,]).enter().append("tbody");


      var tableRow = tableBody.selectAll("tr.dataRow")
        .data(data)
          .enter()
            .append("tr")
              .classed("dataRow", true)
              .on("mouseover.custom", rowOnMouseOver)
              .on("mouseout.custom", rowOnMouseOut);

      tableRow.selectAll("td")
        .data(function(d) { return columnHeaders.map(function(c) { return c[2](d[c[0]]); });})
          .enter()
            .append("td")
              .text(function(t) { return t;})

      
    });
  }
  
  
  /**
   * Should be supplied with an array of arrays of size 2, corresponding to the display name and lookup key. E.g. [ ["ip", "IP Address"] ]
   */
  chart.columnHeaders = function(value) {
    if (!arguments.length) return columnHeaders;
    columnHeaders = value;
    return chart;
  }

  chart.rowOnMouseOver = function(value) {
    if (!arguments.length) return rowOnMouseOver;
    rowOnMouseOver = value;
    return chart;
  }

  chart.rowOnMouseOut = function(value) {
    if (!arguments.length) return rowOnMouseOut;
    rowOnMouseOut = value;
    return chart;
  }
  
  return chart;
}

