import AsyncSelect from 'react-select/async';
import { locationsData } from '../utils/locations';

const locationsOptions = locationsData.map((location) => {
  return { value: `${location?.code}`, label: `${location?.name}, ${location?.state} - ${location?.country}` };
})

const filterLocations = (inputValue) => {
  if (inputValue.length >= 3) {
    const regex = new RegExp(`${inputValue}`, "gi");
    return locationsOptions.filter((location) =>
      location.label.match(regex)
    )
  }
};

const promiseOptions = (inputValue) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterLocations(inputValue));
    }, 1000);
  });

export default ({ onChange, options, value, className }) => {
  return (
    <div className={className}>
      <AsyncSelect
        cacheOptions
        loadOptions={promiseOptions}
        isClearable
        onChange={value => onChange(value)}
      />
    </div>
  )
}