"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/**
 * Format a Date into a short en-US date string.
 *
 * @param date - The Date to format (interpreted in the local timezone).
 * @returns The formatted date string in short month, numeric day, and numeric year form (e.g., "Jan 1, 2025").
 */
function formatDate(date: Date): string {
  return dateFormatter.format(date);
}

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onClear: () => void;
}

/**
 * Renders a date range picker popover for selecting, applying, and clearing a start and end date.
 *
 * The picker disables future dates and disables dates that would produce an invalid range
 * (start disables dates after `endDate`; end disables dates before `startDate`). Selecting a start
 * after the current end clears the end; selecting an end before the current start clears the start.
 *
 * @param startDate - Currently selected start date, if any
 * @param endDate - Currently selected end date, if any
 * @param onStartDateChange - Called with the new start date or `undefined` to clear it
 * @param onEndDateChange - Called with the new end date or `undefined` to clear it
 * @param onClear - Called to clear both dates
 * @returns The date range picker React element
 */
export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClear,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const endOfToday = React.useMemo(() => {
    const value = new Date();
    value.setHours(23, 59, 59, 999);
    return value;
  }, [open]);

  const hasDates = startDate || endDate;

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full sm:w-[280px] justify-start text-left font-normal",
              !startDate && !endDate && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate && endDate ? (
              <>
                {formatDate(startDate)} - {formatDate(endDate)}
              </>
            ) : startDate ? (
              formatDate(startDate)
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-popover border-border"
          align="start"
        >
          <div className="p-3 border-b border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Start Date
                </label>
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date: Date | undefined) => {
                    onStartDateChange(date);
                    if (date && endDate && date > endDate) {
                      onEndDateChange(undefined);
                    }
                  }}
                  disabled={(date: Date) => {
                    return (
                      date > endOfToday || (endDate ? date > endDate : false)
                    );
                  }}
                  initialFocus
                />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  End Date
                </label>
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={(date: Date | undefined) => {
                    onEndDateChange(date);
                    if (date && startDate && date < startDate) {
                      onStartDateChange(undefined);
                    }
                  }}
                  disabled={(date: Date) => {
                    return (
                      date > endOfToday ||
                      (startDate ? date < startDate : false)
                    );
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-3 flex gap-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => {
                onClear();
                setOpen(false);
              }}
            >
              Clear
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-black text-white hover:bg-black/90 border border-black"
              onClick={() => setOpen(false)}
            >
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      {hasDates && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          Clear filter
        </Button>
      )}
    </div>
  );
}
