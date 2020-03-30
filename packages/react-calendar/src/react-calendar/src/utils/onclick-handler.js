export default function customOnClick(original, substitute) {
    return function (event) {
        if (original && substitute) {
            substitute({
                event: event,
                originalHandler: function () { return original && original(event); },
            });
        }
        else if (substitute) {
            substitute({ originalEvent: event });
        }
        else if (original) {
            original(event);
        }
    };
}
//# sourceMappingURL=onclick-handler.js.map