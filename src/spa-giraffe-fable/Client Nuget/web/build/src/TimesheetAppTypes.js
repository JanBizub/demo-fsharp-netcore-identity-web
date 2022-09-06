import { Record, Union } from "../fable_modules/fable-library.3.7.11/Types.js";
import { record_type, union_type } from "../fable_modules/fable-library.3.7.11/Reflection.js";

export class Route extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Root", "Invalid"];
    }
}

export function Route$reflection() {
    return union_type("TimesheetAppTypes.Route", [], Route, () => [[], []]);
}

export class AppState extends Record {
    constructor(CurrentRoute) {
        super();
        this.CurrentRoute = CurrentRoute;
    }
}

export function AppState$reflection() {
    return record_type("TimesheetAppTypes.AppState", [], AppState, () => [["CurrentRoute", Route$reflection()]]);
}

export function AppState_get_Empty() {
    return new AppState(new Route(0));
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["DefaultMessage"];
    }
}

export function Msg$reflection() {
    return union_type("TimesheetAppTypes.Msg", [], Msg, () => [[]]);
}

