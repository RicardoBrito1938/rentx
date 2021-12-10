import { addDays, eachDayOfInterval, format } from "date-fns";
import { DayProps } from ".";
import { CalendarProps } from "react-native-calendars";
import theme from "../../styles/theme";

export const generateInterval = (start: DayProps, end: DayProps) => {
  let interval: CalendarProps["markedDates"] = {};

  eachDayOfInterval({
    start: new Date(start.timestamp),
    end: new Date(end.timestamp)
  }).forEach(item => {
    const date = format(addDays(item, 1), "yyyy-MM-dd");

    interval = {
      ...interval,
      [date]: {
        color:
          start.dateString === date || end.dateString === date
            ? theme.colors.main
            : theme.colors.main_light,

        selectedTextColor:
          start.dateString === date || end.dateString === date
            ? theme.colors.main_light
            : theme.colors.main
      }
    };
  });

  return interval;
};
