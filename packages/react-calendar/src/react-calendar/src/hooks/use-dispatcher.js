import { useMemo } from 'react';
import dispatcherFactory from '../dispatcher-factory';
export default function useDispatcher(args) {
    var _a = args.bind, order = _a.order, shared = _a.shared;
    var dispatcher = useMemo(function () { return dispatcherFactory(args); }, []);
    if (shared && !shared.dispatchers[order])
        shared.dispatchers[order] = dispatcher;
    return dispatcher;
}
//# sourceMappingURL=use-dispatcher.js.map