import { Record, Union } from "../fable_modules/fable-library.3.7.11/Types.js";
import { class_type, record_type, option_type, list_type, string_type, union_type } from "../fable_modules/fable-library.3.7.11/Reflection.js";
import { empty } from "../fable_modules/fable-library.3.7.11/List.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.3.7.11/Choice.js";

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
    return union_type("Types.Route", [], Route, () => [[], []]);
}

export class AppState extends Record {
    constructor(CurrentRoute, Cars, ErrorMessage) {
        super();
        this.CurrentRoute = CurrentRoute;
        this.Cars = Cars;
        this.ErrorMessage = ErrorMessage;
    }
}

export function AppState$reflection() {
    return record_type("Types.AppState", [], AppState, () => [["CurrentRoute", Route$reflection()], ["Cars", list_type(string_type)], ["ErrorMessage", option_type(string_type)]]);
}

export function AppState_get_Empty() {
    return new AppState(new Route(0), empty(), void 0);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["CarsRequest", "CarsResponse", "ComponentError"];
    }
}

export function Msg$reflection() {
    return union_type("Types.Msg", [], Msg, () => [[], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(string_type), string_type], FSharpResult$2, () => [[["ResultValue", list_type(string_type)]], [["ErrorValue", string_type]]])]], [["Item", class_type("System.Exception")]]]);
}

