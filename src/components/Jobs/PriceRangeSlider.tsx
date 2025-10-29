import React, { useEffect, useRef, useState } from 'react';

type PriceRangeSliderProps = {
  min?: number;
  max?: number;
  step?: number;
  initialLow?: number;
  initialHigh?: number;
  // onChange can be used by parent to read the low/high values
  onChange?: (low: number, high: number) => void;
};

/**
 * PriceRangeSlider
 * - Pure UI/interaction component for selecting a min/max price with two handles.
 * - Keyboard accessible (arrow keys), mouse/touch drag supported.
 * - Emits `onChange(low, high)` when values change.
 * - Keeps visual layout identical to the previous implementation in SideFilterBar.
 */
export default function PriceRangeSlider({
  min = 0,
  max = 1000,
  step = 1,
  initialLow = 50,
  initialHigh = 500,
  onChange,
}: PriceRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [low, setLow] = useState<number>(initialLow);
  const [high, setHigh] = useState<number>(initialHigh);
  const [dragging, setDragging] = useState<null | 'low' | 'high'>(null);

  useEffect(() => {
    if (onChange) onChange(low, high);
  }, [low, high, onChange]);

  // percent position helper
  const percent = (value: number) => ((value - min) / (max - min)) * 100;

  // Global pointer handlers while dragging
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging || !trackRef.current) return;
      const track = trackRef.current.getBoundingClientRect();
      const clientX = (e as TouchEvent).touches ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
      let pos = ((clientX - track.left) / track.width) * (max - min) + min;
      pos = Math.round(pos / step) * step;
      pos = Math.max(min, Math.min(max, pos));
      if (dragging === 'low') {
        const newLow = Math.min(pos, high - step);
        setLow(newLow);
      } else if (dragging === 'high') {
        const newHigh = Math.max(pos, low + step);
        setHigh(newHigh);
      }
    };

    const handleUp = () => setDragging(null);

    // Attach global listeners while dragging to track pointer movements
    window.addEventListener('mousemove', handleMove);
    // Cast handler to EventListener to satisfy TS when adding/removing touch handlers
    window.addEventListener('touchmove', handleMove as unknown as EventListener, { passive: false });
    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove as unknown as EventListener);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [dragging, high, low, max, min, step]);

  // Clicking the track moves the nearest handle
  const onTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const track = trackRef.current.getBoundingClientRect();
    const pos = ((e.clientX - track.left) / track.width) * (max - min) + min;
    const distLow = Math.abs(pos - low);
    const distHigh = Math.abs(pos - high);
    if (distLow < distHigh) {
      const newLow = Math.round(pos / step) * step;
      setLow(Math.min(newLow, high - step));
    } else {
      const newHigh = Math.round(pos / step) * step;
      setHigh(Math.max(newHigh, low + step));
    }
  };

  const primary = '#FF7346';

  return (
    <div>
      <div className="relative w-full h-16">
        <div
          ref={trackRef}
          className="absolute left-0 right-0 top-4 h-1 rounded-full bg-gray-200 cursor-pointer"
          onClick={onTrackClick}
          data-testid="price-track"
        />

        {/* Filled range */}
        <div
          className="absolute top-4 h-1 rounded-full"
          style={{
            left: `${percent(low)}%`,
            right: `${100 - percent(high)}%`,
            background: primary,
          }}
        />

        {/* Handles */}
        <button
          aria-label="Minimum price"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={low}
          onMouseDown={() => setDragging('low')}
          onTouchStart={() => setDragging('low')}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setLow((v) => Math.max(min, v - step));
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setLow((v) => Math.min(v + step, high - step));
          }}
          className="absolute -top-1 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shadow-md"
          style={{ left: `calc(${percent(low)}% - 12px)` }}
        >
          <span className="text-xs">◀︎</span>
        </button>

        <button
          aria-label="Maximum price"
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={high}
          onMouseDown={() => setDragging('high')}
          onTouchStart={() => setDragging('high')}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') setHigh((v) => Math.max(low + step, v - step));
            if (e.key === 'ArrowRight' || e.key === 'ArrowUp') setHigh((v) => Math.min(max, v + step));
          }}
          className="absolute -top-1 left-8 w-6 h-6 rounded-full bg-black flex items-center justify-center text-white shadow-md"
          style={{ left: `calc(${percent(high)}% - 12px)` }}
        >
          <span className="text-xs">▶︎</span>
        </button>

        {/* Price badges */}
        <div className="flex justify-between mt-8 absolute -bottom-0 w-full">
          <div className="bg-black text-white rounded-md px-3 py-1">${low.toFixed(2)}</div>
          <div className="bg-black text-white rounded-md px-3 py-1">${high.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
