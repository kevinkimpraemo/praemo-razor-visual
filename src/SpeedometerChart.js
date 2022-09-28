export default function SpeedometerChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let data = context;

    return {
      data: [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: data.value,
          title: { text: data.xLabel },
          type: "indicator",
          mode: "gauge+number+delta",
          delta: { reference: data.target_min },
          gauge: { axis: { range: [data.abs_min, data.abs_max], tickangle: 0 } },
        },
      ],
      layout: {
        height: 240,
        margin: { l: 30, r: 40, b: 20, t: 30, pad: 0 },
        xaxis: { showticklabels: false },
      },
    };
  };
  return calculate_plot(context);
}
