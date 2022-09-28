export default function TableChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    let rows =
      context.length > 0 &&
      context.map((value, index) => {
        let cells =
          value.length > 0 &&
          value.map((cell, j) => {
            return `<td key=${cell}-${j}>${cell}</td>`;
          });
        if (value.length <= 1) {
          return `<tr key=${value[0]}-${index}>${cells}</tr>`;
        }
        let val_1 = value[1];
        if (!isNaN(val_1)) {
          val_1 = parseFloat(Math.round(val_1 * 100)) / 100;
        }
        return `<tr key=${value[0]}-${val_1}-${index}>${cells}</tr>`;
      });
    let data = `<table className="table-chart-table">${rows || ""}</table>`;
    return { data: data, layout: null };
  };
  return calculate_plot(context);
}
