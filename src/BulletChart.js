export default function BulletChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let data = [];
    const getDomain = (i) => {
      const spacing = 0.3;
      const spacingPerFace = spacing / ((context.bullets.length - 1) * 2);
      const expectedDomain = (1 - spacing) / context.bullets.length;
      const previousDomainLocked = expectedDomain * i;
      const previousSpaceLocked = spacingPerFace * (i * 2 - 1);
      const endValue = previousDomainLocked + previousSpaceLocked + expectedDomain + spacingPerFace;
      return [i === 0 ? 0 : previousDomainLocked + previousSpaceLocked + spacingPerFace, i === context.bullets.length - 1 ? 1 : endValue];
    };

    for (let i = 0; i < context.bullets.length; i++) {
      let fmt = ".2f";
      var trace_data = context.bullets[i];
      var range = Math.abs(trace_data.value - trace_data.center) * 1.1;
      if (trace_data.value < 10) {
        fmt = ".4f";
      }

      let trace = {
        name: trace_data.label,
        type: "indicator",
        mode: "number+gauge",
        value: trace_data.value,
        delta: { reference: trace_data.center, increasing: { color: "red" }, valueformat: fmt },
        domain: { x: [0.25, 1], y: getDomain(i), row: i },
        title: { text: trace_data.label, font: { size: 10 } },
        number: { valueformat: fmt },
        gauge: {
          shape: "bullet",
          axis: { range: [trace_data.center - range, trace_data.center + range] },
          threshold: {
            line: { color: "black", width: 5 },
            thickness: 1.0,
            value: trace_data.value,
          },
          bar: { color: "black", thickness: 0.0 },
          bgcolor: "firebrick",
          steps: [],
        },
      };

      var step_data = trace.gauge.steps;
      for (let i2 = 0; i2 < trace_data.yellows.length; i2++) {
        var yellowbar = trace_data.yellows[i2];
        let low = Math.max(yellowbar[0], trace_data.center - range);
        let high = Math.min(yellowbar[1], trace_data.center + range);
        step_data.push({ range: [low, high], color: "yellow" });
      }
      for (let i2 = 0; i2 < trace_data.greens.length; i2++) {
        var greenbar = trace_data.greens[i2];
        let low = Math.max(greenbar[0], trace_data.center - range);
        let high = Math.min(greenbar[1], trace_data.center + range);
        step_data.push({ range: [low, high], color: "green" });
      }
      if (trace_data.value < trace_data.center) {
        step_data.push({ range: [trace_data.value, trace_data.center], color: "black", thickness: 0.05 });
      } else {
        step_data.push({ range: [trace_data.center, trace_data.value], color: "black", thickness: 0.05 });
      }

      data.push(trace);
    }

    if (context.bullets.length == 1) {
      data[0].gauge.shape = "angular";
      delete data[0].title;
    }
    var layout = {
      height: Math.max(100 * context.bullets.length, 160),
      grid: {
        rows: data.length,
        columns: 1,
      },
      margin: { l: 0, r: 0, b: 0, t: 0, pad: 0 },
      autosize: true,
      yaxis: { automargin: true, ticklabeloverflow: "allow" },
      xaxis: { automargin: true, ticklabeloverflow: "allow" },
      paper_bgcolor: "rgba(0,0,0,0)",
      plot_bgcolor: "rgba(0,0,0,0)",
    };

    return { data: data, layout: layout };
  };
  return calculate_plot(context);
}
