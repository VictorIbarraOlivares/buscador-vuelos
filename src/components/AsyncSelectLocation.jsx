import { memo } from 'react';
import AsyncSelect from 'react-select/async';
import { components } from "react-select";
import { locationsOptions } from '../utils/helpers';
import {
  LocationMarkerIcon
} from '@heroicons/react/outline'

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

  const CaretDownIcon = () => {
    return <LocationMarkerIcon className="w-5 h-5 text-indigo-500" aria-hidden="true"  />;
  };
  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };
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
        components={{ DropdownIndicator }}
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