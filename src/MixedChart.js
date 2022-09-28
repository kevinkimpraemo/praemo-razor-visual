export default function MixedChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let data = [];
    let layout = {
      height: 220,
      shapes: [],
      xaxis: {
        showticklabels: true,
        tickmode: "auto",
        ticks: "",
        ticklen: 13,
        title: context.x_label,
      },
      yaxis: {
        title: context.y_label,
        automargin: true,
      },
      showlegend: true,
      margin: {
        l: 70,
        r: 20,
        b: 65,
        t: 20,
        pad: 7,
      },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
    };

    context.context_elements.map((element) => {
      // Each element is a trace to be added to the plot data
      switch (element.type) {
        case "line": {
          let trace = { mode: "markers+lines", x: element.x, y: element.y, name: element.label };
          if (element.fill === "forward") {
            trace.line = { shape: "hv" };
          }
          data.push(trace);
          break;
        }
        case "scatter": {
          let trace = { mode: "markers", x: element.x, y: element.y, name: element.label };
          data.push(trace);
          break;
        }
        case "fill": {
          let x = element.x;
          let x2 = x.map((x_) => x_);
          x = x.concat(x2.reverse());
          let y = element.y_low;
          y = y.concat(element.y_high.reverse());
          let trace = { type: "scatter", line: { width: 1 }, x: x, y: y, fill: "toself", name: element.label };
          if (element.fill === "forward") {
            trace.line.shape = "hv";
          }
          data.push(trace);
          break;
        }
        case "bar": {
          let trace = { mode: "bar", x: element.x, y: element.y, name: element.label };
          data.push(trace);
          break;
        }
        case "hline": {
          let shape = { x0: 0, x1: 1, y0: element.y, y1: element.y, xref: "paper" };
          layout.shapes.push(shape);
          break;
        }
        case "vline": {
          let shape = { x0: element.x, x1: element.x, y0: 0, y1: 1, yref: "paper" };
          layout.shapes.push(shape);
          break;
        }
      }
    });
    return { data: data, layout: layout };
  };
  return calculate_plot(context);
}
