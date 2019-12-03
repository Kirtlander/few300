export interface HolidaysModel {
  holidays: HolidayListItem[];
}

interface HolidayListItem {
  id: string;
  name: string;
  date: string;
}
