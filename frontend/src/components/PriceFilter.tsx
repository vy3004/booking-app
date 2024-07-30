import { useState, useRef, useEffect } from "react";

type PriceFilterProps = {
  defaultMin: number;
  defaultMax: number;
  currentMin: number;
  currentMax: number;
  step: number;
  onChange: (minPrice: number, maxPrice: number) => void;
};

const PriceFilter = ({
  defaultMin,
  defaultMax,
  currentMin,
  currentMax,
  step,
  onChange,
}: PriceFilterProps) => {
  const [minPrice, setMinPrice] = useState(currentMin);
  const [maxPrice, setMaxPrice] = useState(currentMax);

  const trackRef = useRef<HTMLDivElement>(null);

  const getPercent = (value: number) =>
    ((value - defaultMin) / (defaultMax - defaultMin)) * 100;

  useEffect(() => {
    setMinPrice(currentMin);
    setMaxPrice(currentMax);
  }, [currentMin, currentMax]);

  useEffect(() => {
    onChange(minPrice, maxPrice);
  }, [minPrice, maxPrice, onChange]);

  const calculateStepValue = (value: number) => {
    const remainder = value % step;
    let stepValue = value - remainder;
    if (remainder >= step / 2) {
      stepValue += step;
    }
    return stepValue;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!trackRef.current) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const trackWidth = trackRect.width;
    const clickPosition = event.clientX - trackRect.left;

    let newValue =
      defaultMin + (clickPosition / trackWidth) * (defaultMax - defaultMin);
    newValue = calculateStepValue(newValue);

    if (newValue <= defaultMax && newValue >= defaultMin) {
      if (currentThumb === "min" && newValue <= maxPrice - step) {
        setMinPrice(newValue);
      } else if (currentThumb === "max" && newValue >= minPrice + step) {
        setMaxPrice(newValue);
      }
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    currentThumb = null;
    // Restore CSS properties when un-dragging
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  };

  let currentThumb: "min" | "max" | null = null;

  const handleMouseDown = (thumb: "min" | "max") => {
    currentThumb = thumb;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    // Prevent default events when dragging
    document.body.style.cursor = "pointer";
    document.body.style.userSelect = "none";
  };

  return (
    <div className="relative w-full h-10 my-5">
      <div
        ref={trackRef}
        className="absolute h-1 w-full bg-gray-300 rounded top-1/2 transform -translate-y-1/2"
      />
      <div
        className="absolute h-1 bg-blue-500 rounded top-1/2 transform -translate-y-1/2"
        style={{
          left: `${getPercent(minPrice)}%`,
          width: `${getPercent(maxPrice) - getPercent(minPrice)}%`,
        }}
      />
      <div
        className="absolute w-5 h-5 bg-white border border-gray-400 rounded-full cursor-pointer"
        style={{
          left: `${getPercent(minPrice)}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={() => handleMouseDown("min")}
      />
      <div
        className="absolute w-5 h-5 bg-white border border-gray-400 rounded-full cursor-pointer"
        style={{
          left: `${getPercent(maxPrice)}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={() => handleMouseDown("max")}
      />
    </div>
  );
};

export default PriceFilter;

export const PriceFilterSkeleton = () => (
  // <div className="rounded w-full h-10 my-5 animate-pulse bg-slate-300" />
  <div className="relative w-full h-10 my-5">
    <div className="absolute h-1 w-full bg-gray-300 rounded top-1/2 transform -translate-y-1/2 animate-pulse" />
    <div
      className="absolute h-1 bg-gray-400 rounded top-1/2 transform -translate-y-1/2 animate-pulse"
      style={{
        left: "10%",
        width: "80%",
      }}
    />
    <div
      className="absolute w-5 h-5 bg-gray-400 rounded-full animate-pulse"
      style={{
        left: "10%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
    <div
      className="absolute w-5 h-5 bg-gray-400 rounded-full animate-pulse"
      style={{
        left: "90%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  </div>
);
