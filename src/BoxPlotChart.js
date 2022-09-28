export default function BoxPlotChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let data = context;
    let fmt = ".2f";
    var layout = {
      height: 240,
      width: 280,
      margin: { l: 30, r: 40, b: 20, t: 30, pad: 0 },
      xaxis: { showticklabels: true },
    };
    let chartData = [];
    for (i = 0; i < data.centers.length; i++) {
      if (data.upper_whisker[i] > 1e6) {
        data.upper_whisker[i] = 1e6;
      }
    }
    if (context.upper_quartile.length === 1) {
      let range = data.upper_whisker[0] - data.lower_whisker[0];
      let low_window = data.centers[0] - data.lower_whisker[0];
      let high_window = data.upper_whisker[0] - data.centers[0];
      let low_edge = data.lower_whisker[0];
      let high_edge = data.upper_whisker[0];
      let range_value = Math.min(low_window, high_window);
      if (range > range_value * 5) {
        range = 2 * range_value;
        if (low_window > range) {
          low_edge = data.centers[0] - range * 2;
        }
        if (high_window > range) {
          high_edge = data.centers[0] + range * 2;
        }
      }

      if (data.centers[0] < 10) {
        fmt = ".4f";
      }
      chartData.push({
        domain: { x: [0, 1], y: [0, 1] },
        value: data.outliers[0][0],
        title: { text: data.xLabel },
        name: data.yLabel,
        type: "indicator",
        mode: "gauge+number+delta",
        delta: { reference: data.centers[0], increasing: { color: "red" }, valueformat: fmt },
        number: { valueformat: fmt },
        gauge: {
          bgcolor: "firebrick",
          bar: { color: "grey", thickness: 0.0 },
          axis: { range: [low_edge - range * 0.1, high_edge + range * 0.1], tickmode: "auto", nticks: 10, tickangle: 0, tickformat: fmt },
          steps: [
            { range: [data.lower_whisker[0], data.upper_whisker[0]], color: "yellow" },
            { range: [data.lower_quartile[0], data.upper_quartile[0]], color: "green" },
          ],
          threshold: {
            line: { color: "black", width: 4 },
            thickness: 1,
            value: data.outliers[0][0],
          },
        },
      });
    } else {
      let total_low_edge = null;
      let total_high_edge = null;
      let total_range = 0;
      let ticklocs = [];
      var i;
      for (i = 0; i < data.centers.length; i++) {
        let range = data.upper_whisker[i] - data.lower_whisker[i];
        let low_window = data.outliers[i][0] - data.lower_whisker[i];
        let high_window = data.upper_whisker[i] - data.outliers[i][0];
        let low_edge = Math.min(data.lower_whisker[i], data.outliers[i][0]);
        let high_edge = Math.max(data.upper_whisker[i], data.outliers[i][0]);
        let range_value = Math.min(low_window, high_window);
        if (range > range_value * 5) {
          range = 2 * range_value;
          if (low_window < range) {
            low_edge = data.centers[i] - range * 2;
            low_edge = Math.min(low_edge, data.outliers[i][0]);
          }
          if (high_window > range) {
            high_edge = data.centers[i] + range * 2;
            high_edge = Math.max(high_edge, data.outliers[i][0]);
          }
        }
        if (total_low_edge === null || total_low_edge > low_edge) {
          total_low_edge = low_edge;
        }
        if (total_high_edge === null || total_high_edge < high_edge) {
          total_high_edge = high_edge;
        }
        if (range > total_range) {
          total_range = range;
        }
      }

      for (var x = 0, length = data.xTicks.length; x < length; x++) {
        ticklocs.push(x);
      }
      let range = total_high_edge - total_low_edge;
      chartData.push({
        type: "box",
        orientation: "v",
        median: data.centers,
        mean: data.centers,
        q3: data.upper_quartile,
        q1: data.lower_quartile,
        upperfence: data.upper_whisker,
        lowerfence: data.lower_whisker,
        y: data.outliers,
        color: data.xticks,
        boxpoints: "all",
        pointpos: 0,
      });
      layout["yaxis"] = {
        range: [total_low_edge - total_range * 0.1, total_high_edge + total_range * 0.1],
      };
      layout["xaxis"] = { tickmode: "array", tickvals: ticklocs, ticktext: data.xTicks, showticklabels: true };
    }
    return { data: chartData, layout: layout };
  };
  return calculate_plot(context);
}
