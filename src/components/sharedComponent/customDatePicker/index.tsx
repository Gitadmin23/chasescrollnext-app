// CustomDatePicker.tsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ selectedDate, onChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(selectedDate);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    onChange(date as Date); // Ensuring TypeScript understands date is not null
  };

  // Custom input component
  const CustomInput = React.forwardRef<HTMLInputElement, { onClick: () => void; value: string }>(
    ({ value, onClick }, ref) => (
      <input
        type="text"
        value={value}
        onClick={onClick}
        readOnly={true} // Ensures the input is read-only to prevent manual editing
        ref={ref}
        style={{ cursor: 'pointer' }} // Adds pointer cursor to indicate clickability
      />
    )
  );

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      customInput={<CustomInput onClick={function (): void {
          throw new Error('Function not implemented.');
      } } value={''} />} // Using custom input component
    />
  );
};

export default CustomDatePicker;
