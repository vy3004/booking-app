type HotelFilterProps = {
  title: string;
  values: string[];
  selectedValues: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelFilter = ({
  title,
  values,
  selectedValues,
  onChange,
}: HotelFilterProps) => {
  return (
    <div className="border-t border-slate-300 pt-5">
      <h4 className="font-bold mb-2">{title}</h4>
      {values.map((value) => (
        <label key={value} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded size-4"
            value={value}
            checked={selectedValues.includes(value)}
            onChange={onChange}
          />
          <span>{value}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelFilter;
