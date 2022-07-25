export const formatMoney = (currency, amount) => {
  return new Intl.NumberFormat("es-CL",
    {
      style: 'currency',
      currency: currency
    }).format(amount);
}

export const formatDate = (param) => {
  const date = new Date(param);
  return date.toLocaleDateString("es-CL", { day: 'numeric' }) + " " + date.toLocaleDateString("es-CL", { month: 'long' }).toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase()) + " " + date.toLocaleDateString("es-CL", { year: 'numeric' });
}