import { useEffect, useMemo, useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

interface PriceSliderProps {
  min?: number;
  max?: number;
  step?: number;
}

const STEP = 1;
const MIN = 0;
const MAX = 100;

export const PriceSlider = ({ min, max, step }: PriceSliderProps): JSX.Element => {
  const [priceValues, setPriceValues] = useState<number[]>([min ?? MIN, max ?? MAX]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.has("priceRange")) {
      const priceRange = JSON.parse(searchParams.get("priceRange") as string) as {
        min: number;
        max?: number;
      };
      setPriceValues([priceRange.min, priceRange.max ?? max ?? MAX]);
    }
  }, []);

  const updateUrl = (priceMin: number, priceMax?: number): void => {
    searchParams.set("priceRange", JSON.stringify({ min: priceMin, max: priceMax }));
    setSearchParams(searchParams);
  };

  const debouncedUpdateUrl = useMemo(() => debounce(updateUrl, 500), []);

  const handleChange = (values: number[]) => {
    if (values[0] > values[1]) {
      values[0] = values[1];
    }
    if (values[1] < values[0]) {
      values[1] = values[0];
    }

    setPriceValues(values);

    values[1] < (max ?? MAX)
      ? debouncedUpdateUrl(values[0], values[1])
      : debouncedUpdateUrl(values[0]);
  };

  return (
    <div className="px-4">
      <div className="mb-8 font-bold">PRICE RANGE</div>
      <div className="px-2">
        <Range
          step={step ?? STEP}
          min={min ?? MIN}
          max={max ?? MAX}
          values={priceValues}
          onChange={(values) => handleChange(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                background: getTrackBackground({
                  values: priceValues,
                  colors: ["#c4c4c442", "#FFB563", "#c4c4c442"],
                  min: min ?? MIN,
                  max: max ?? MAX,
                }),
              }}
              className="border border-toast-orange h-2 w-full "
            >
              {children}
            </div>
          )}
          renderThumb={({ index, props }) => (
            <div
              {...props}
              style={{
                ...props.style,
              }}
              className="rounded-full bg-toast-orange h-6 w-6"
            >
              <div className="-top-4 text-xs absolute">{`$${
                priceValues[index] === (max ?? MAX)
                  ? priceValues[index].toFixed(0) + "+"
                  : priceValues[index].toFixed(0)
              }`}</div>
            </div>
          )}
        />
      </div>
      <div className="flex justify-between mt-6">
        {/* TODO: move to function */}
        <div className="flex">
          <div className="border-t border-l border-b h-8 flex items-center ">$</div>
          <input
            className="w-16 h-8 border-t border-b border-r text-sm outline-none "
            type="number"
            value={priceValues[0]}
            onChange={(e) => handleChange([Number(e.target.value), priceValues[1]])}
          />
        </div>
        <div className="flex">
          <div className="border-t border-l border-b h-8 flex items-center ">$</div>
          <input
            className="w-16 h-8 border-t border-b border-r text-sm outline-none "
            type="number"
            value={priceValues[1]}
            onChange={(e) => handleChange([priceValues[0], Number(e.target.value)])}
          />
        </div>
      </div>
    </div>
  );
};
