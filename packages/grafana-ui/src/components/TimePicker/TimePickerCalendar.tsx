import React, { PureComponent } from 'react';
import Calendar from 'react-calendar/dist/entry.nostyle';
import { TimeFragment } from '../../types/time';
import { TimeZone } from '../../types';
import { DateTime, dateTime, isDateTime } from '../../utils/moment_wrapper';
import { stringToDateTimeType } from './time';

export interface Props {
  value: TimeFragment;
  roundup?: boolean;
  timeZone?: TimeZone;
  onChange: (value: DateTime) => void;
}

export class TimePickerCalendar extends PureComponent<Props> {
  onCalendarChange = (date: Date | Date[]) => {
    const { onChange } = this.props;

    if (Array.isArray(date)) {
      return;
    }

    onChange(dateTime(date));
  };

  render() {
    const { value, roundup, timeZone } = this.props;
    const dateValue = isDateTime(value) ? value.toDate() : stringToDateTimeType(value, roundup, timeZone).toDate();
    const calendarValue = dateValue instanceof Date && !isNaN(dateValue.getTime()) ? dateValue : dateTime().toDate();

    return (
      <Calendar
        value={calendarValue}
        next2Label={null}
        prev2Label={null}
        className="time-picker-calendar"
        tileClassName="time-picker-calendar-tile"
        onChange={this.onCalendarChange}
        nextLabel={<span className="fa fa-angle-right" />}
        prevLabel={<span className="fa fa-angle-left" />}
      />
    );
  }
}
