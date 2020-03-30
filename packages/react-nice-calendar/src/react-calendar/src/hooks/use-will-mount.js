import { useMemo } from 'react';
var mounted = [];
export default function useWillMount(callback) {
    var mountedSymbol = useMemo(function () { return Symbol('Mounted'); }, []);
    if (!mounted.includes(mountedSymbol)) {
        callback();
        mounted.push(mountedSymbol);
    }
}
//# sourceMappingURL=use-will-mount.js.map