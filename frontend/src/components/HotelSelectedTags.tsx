type HotelSelectedTagsProps = {
  selectedTags: string[];
  removeSelectedTag: (tag: string) => void;
};

const HotelSelectedTags = ({
  selectedTags,
  removeSelectedTag,
}: HotelSelectedTagsProps) => {
  if (selectedTags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {selectedTags.map((tag) => (
        <div
          key={tag}
          className="flex items-center px-2 py-1 text-sm font-medium hover:bg-blue-50 text-blue-600 border border-blue-600 rounded-full cursor-pointer"
          onClick={() => removeSelectedTag(tag)}
        >
          {tag}
          <span className="ml-2">&times;</span>
        </div>
      ))}
    </div>
  );
};

export default HotelSelectedTags;
