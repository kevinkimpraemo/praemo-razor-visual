export default function CounterChart(context) {
  if (!context || context === null || context === undefined) {
    return { data: {}, layout: {} };
  }
  const calculate_plot = (context) => {
    if (context instanceof String) {
      return { data: context };
    }
    return { data: context.value, layout: null };
  };
  return calculate_plot(context);
}
