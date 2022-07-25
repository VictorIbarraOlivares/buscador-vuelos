import { memo } from 'react';
import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/es';
import { CalendarIcon } from '@heroicons/react/outline'

const DateInput = ({ onChange, className, label, placeholder, min, disabled }) => {
  return (
    <div className={className}>
      <DatePicker
        locale="es"
        placeholder={placeholder}
        label={label}
        onChange={value => onChange(value)}
        minDate={min}
        disabled={disabled}
        inputFormat="DD MMMM YYYY"
        icon={<CalendarIcon className="w-5 h-5 text-indigo-500 -z-10" />}
      />
    </div>
  )
}

export default memo(DateInput);