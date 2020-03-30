import { CalendarProps, Bind, BindProp } from '../shared-types';
interface BindData {
    shared?: BindProp['shared'];
    props: CalendarProps;
}
export default function useBindConsumer<Shared>(bindData: BindData): Bind;
export {};
