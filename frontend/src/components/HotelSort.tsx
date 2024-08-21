type HotelSortProps = {
  value: string;
  onChange: (value: string) => void;
};

const HotelSort = ({ value, onChange }: HotelSortProps) => {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-fit rounded-lg border-r-8 border-transparent px-4 font-semibold outline outline-1 outline-slate-300"
    >
      <option value="">Latest</option>
      <option value="starRating">Star Rating</option>
      <option value="pricePerNightAsc">Price Per Night (low to high)</option>
      <option value="pricePerNightDesc">Price Per Night (high to low)</option>
    </select>
  );
};
export default HotelSort;
