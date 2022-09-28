export default function ImageChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let theContext = context;
    let data = [];
    let trace = {
      name: "image_test",
      type: "image",
      source: theContext,
    };
    data.push(trace);
    var layout = {
      height: 400,
      margin: { l: 30, r: 30, b: 30, t: 30, pad: 0 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
    };
    return { data: data, layout: layout };
  };
  return calculate_plot(context);
}
