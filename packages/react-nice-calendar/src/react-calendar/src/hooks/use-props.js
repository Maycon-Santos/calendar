import { useContext } from 'react';
import { CalendarContext } from '../context';
export var defaultProps = {
    monthsDictionary: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    daysDictionary: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    pick: 'single',
    pickLimit: Infinity,
    rangeSize: {
        min: 0,
        max: Infinity,
    }
};
export default function useProps() {
    var props = useContext(CalendarContext).bind.props;
    Object.keys(defaultProps).forEach(function (key) {
        if (defaultProps[key] && !props[key]) {
            props[key] = defaultProps[key];
        }
    });
    return props;
}
//# sourceMappingURL=use-props.js.map