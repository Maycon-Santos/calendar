import { useMemo } from 'react';
export default function useBindConsumer(bindData) {
    var props = bindData.props, shared = bindData.shared;
    var bind = props.bind;
    var owner = useMemo(function () { return Symbol('Owner'); }, []);
    var order = useMemo(function () { return (bind === null || bind === void 0 ? void 0 : bind.owners.length) || 0; }, []);
    var bindProps = useMemo(function () {
        if (order === 0)
            return {};
        return (bind === null || bind === void 0 ? void 0 : bind.props) || {};
    }, []);
    // Update shared props
    if (order === 0)
        Object.assign(bindProps, props);
    if (bind && !bind.owners.includes(owner)) {
        bind.owners.push(owner);
        if (order === 0) {
            bind.props = bindProps;
            bind.shared = shared;
        }
    }
    // delete bindProps['bind']
    return {
        order: order,
        props: bindProps,
        shared: bind === null || bind === void 0 ? void 0 : bind.shared,
    };
}
//# sourceMappingURL=use-bind-consumer.js.map