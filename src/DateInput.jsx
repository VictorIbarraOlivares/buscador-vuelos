import { DatePicker } from '@mantine/dates';
import 'dayjs/locale/es';

export default ({ onChange, className, label, placeholder }) => {
  return (
    <div className={className}>
      <DatePicker
        locale="es"
        placeholder={placeholder}
        label={label}
        onChange={ value => onChange(value) }
      />
    </div>
  )
}