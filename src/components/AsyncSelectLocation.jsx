import { memo } from 'react';
import AsyncSelect from 'react-select/async';
import { locationsOptions } from '../utils/helpers';

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

const AsyncSelectLocation = ({ onChange, options, value, className }) => {
  return (
    <div className={className}>
      <AsyncSelect
        placeholder=''
        noOptionsMessage={() => 'No hay resultado'}
        loadingMessage={() => 'Buscando...'} 
        cacheOptions
        loadOptions={promiseOptions}
        isClearable
        onChange={value => onChange(value)}
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none',
            },
          }),
        }}
      />
    </div>
  )
}

export default memo(AsyncSelectLocation);