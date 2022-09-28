export default function LineChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let skipKeys = ["xLabel", "yLabel", "xValues"];
    const theData = [];
    let theLayout = {
      height: 220,
      xaxis: {
        fixedrange: context.modal,
        showticklabels: false,
        tickmode: "auto",
        ticks: "",
        ticklen: 13,
        title: context.xLabel,
      },
      yaxis: {
        fixedrange: context.modal,
        title: context.yLabel,
        automargin: true,
      },
      showlegend: false,
      margin: { l: 70, r: 20, b: 65, t: 20, pad: 7 },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
    };
    for (let key in context) {
      if (skipKeys.includes(key)) {
        continue;
      } else if ("xValues" in context) {
        theData.push({ y: context[key], type: "line", x: context["xValues"] });
        theLayout.xaxis.showticklabels = true;
        theLayout.xaxis.ticks = "inside";
      } else {
        theData.push({ y: context[key], type: "line" });
      }
    }

    return { data: theData, layout: theLayout };
  };
  return calculate_plot(context);
}
