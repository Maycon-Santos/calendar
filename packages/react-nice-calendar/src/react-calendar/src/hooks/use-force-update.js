import { useState, useCallback } from 'react';
export default function useForceUpdate() {
    var _a = useState(), forceUpdate = _a[1];
    return useCallback(function () { return forceUpdate({}); }, []);
}
//# sourceMappingURL=use-force-update.js.map