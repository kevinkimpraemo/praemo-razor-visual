export default function MessageChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    if (typeof context === "string" || context instanceof String) {
      return { data: context, layout: null };
    } else {
      return { data: context.value, layout: null };
    }
  };
  return calculate_plot(context);
}
