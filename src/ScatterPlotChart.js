export default function ScatterPlotChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let data = context;
    (data.mode = "markers"), (data.type = "scatter");

    let layout = {
      height: 260,
      showlegend: false,
      xaxis: {
        fixedrange: context.modal,
        title: data.xLabel,
      },
      yaxis: {
        fixedrange: context.modal,
        title: data.yLabel,
      },
      margin: { l: 50, r: 20, b: 50, t: 20, pad: 0 },
    };

    return { data: data, layout: layout };
  };
  return calculate_plot(context);
}
