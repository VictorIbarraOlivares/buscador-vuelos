import { locationsData } from '../utils/locations';

export const locationsOptions = locationsData.map((location) => {
  return { value: `${location?.code}`, label: `${location?.name}, ${location?.state} - ${location?.country}` };
})

export const formatMoney = (currency = 'USD', amount = 0) => {
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

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const formatDateToAPI = (param) => {
  const date = new Date(param);
  return date.toLocaleDateString("es-CL", { year: 'numeric' }) + "-" +
  date.toLocaleDateString("es-CL", { month: '2-digit' }) + "-" +
  date.toLocaleDateString("es-CL", { day: '2-digit' });
}

export const getLocation = (locations, code) => {
  const location = locations.find(location => location.value === code);
  return location ? location.label : code;
}

export const formatTime = (param) => {
  const date = new Date(param);
  return date.toLocaleTimeString("es-CL", {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export const formatDuration = (param) => {
  let duration = param.slice(2);
  duration = duration.replace(/H/i, " h ");
  duration = duration.replace(/M/i, " m");
  return duration;
}

export const getTypeTraveler = (param) => {
  return param === 'ADULT' ? 'Adulto' : 'Niño';
}