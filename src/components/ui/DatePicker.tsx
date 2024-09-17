import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/Button";
import { Calendar } from "../../components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/Popover";

interface DatePickerProps {
  title: string;
  date: Date;
  onSelectDate: (day?: Date, selectedDay?: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  title,
  date = new Date(),
  onSelectDate,
}) => {
  return (
    <Popover>
      {!!title && <p>{title}</p>}
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal border-2 border-gray-300 rounded-md py-6 px-8 -mt-4",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
