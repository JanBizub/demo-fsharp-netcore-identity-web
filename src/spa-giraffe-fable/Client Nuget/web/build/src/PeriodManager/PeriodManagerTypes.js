import { Union, Record } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { ComponentState$reflection } from "../FableApp.js";
import { Period$reflection } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { class_type, union_type, tuple_type, string_type, int32_type, record_type, list_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.3.7.11/Choice.js";

export class PeriodManagerState extends Record {
    constructor(ComponentState, Periods) {
        super();
        this.ComponentState = ComponentState;
        this.Periods = Periods;
    }
}

export function PeriodManagerState$reflection() {
    return record_type("PeriodManagerTypes.PeriodManagerState", [], PeriodManagerState, () => [["ComponentState", ComponentState$reflection()], ["Periods", list_type(Period$reflection())]]);
}

export class PeriodManagerMsg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["PeriodsReq", "PeriodsRes", "ClosePeriodReq", "ClosePeriodRes", "OpenPeriodReq", "OpenPeriodRes", "ComponentError", "HttpError"];
    }
}

export function PeriodManagerMsg$reflection() {
    return union_type("PeriodManagerTypes.PeriodManagerMsg", [], PeriodManagerMsg, () => [[], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(Period$reflection()), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", list_type(Period$reflection())]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Exception")]], [["Item", tuple_type(int32_type, string_type)]]]);
}

