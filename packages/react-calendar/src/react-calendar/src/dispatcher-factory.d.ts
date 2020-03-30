import { Dispatch, SetStateAction } from 'react';
import CalendarProvider from '../../calendar-provider/src/calendar-provider';
import { CalendarProps, DataToView, EventDispatcher } from './shared-types';
export interface DispatcherFactoryData {
    calendarProvider: CalendarProvider;
    setDateMouseOver: Dispatch<SetStateAction<Date | null>>;
    setDataToView: Dispatch<SetStateAction<DataToView>>;
    bind: {
        order: number;
        props: CalendarProps;
        shared?: {
            mainCalendarProvider: CalendarProvider;
            dispatchers: EventDispatcher[];
        };
    };
}
export default function dispatcherFactory(data: DispatcherFactoryData): EventDispatcher;
