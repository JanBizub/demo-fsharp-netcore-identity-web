import { oneOf, top, map } from "../fable_modules/Fable.Elmish.Browser.3.0.4/parser.fs.js";
import { AppState, Route } from "./TimesheetAppTypes.js";
import { singleton } from "../fable_modules/fable-library.3.7.11/List.js";
import { Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";

export const pageParser = (() => {
    const parsers = singleton(map(new Route(0), top));
    return (state_1) => oneOf(parsers, state_1);
})();

export function urlUpdate(route, state) {
    if (route != null) {
        const route_1 = route;
        if (route_1.tag === 0) {
            return [new AppState(route_1), Cmd_none()];
        }
        else {
            throw (new Error("Match failure"));
        }
    }
    else {
        return [new AppState(new Route(1)), Cmd_none()];
    }
}

