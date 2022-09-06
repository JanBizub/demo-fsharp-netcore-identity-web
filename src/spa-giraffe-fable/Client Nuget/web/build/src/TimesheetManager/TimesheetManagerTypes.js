import { Union, Record } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { ComponentState$reflection } from "../FableApp.js";
import { Timesheet$reflection } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { class_type, union_type, tuple_type, int32_type, string_type, record_type, list_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.3.7.11/Choice.js";

export class TimesheetManagerState extends Record {
    constructor(ComponentState, Timesheets) {
        super();
        this.ComponentState = ComponentState;
        this.Timesheets = Timesheets;
    }
}

export function TimesheetManagerState$reflection() {
    return record_type("TimesheetManagerTypes.TimesheetManagerState", [], TimesheetManagerState, () => [["ComponentState", ComponentState$reflection()], ["Timesheets", list_type(Timesheet$reflection())]]);
}

export class TimesheetManagerMsg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["NavigateToUserTimesheet", "TimesheetsReq", "TimesheetsRes", "ComponentError", "HttpError"];
    }
}

export function TimesheetManagerMsg$reflection() {
    return union_type("TimesheetManagerTypes.TimesheetManagerMsg", [], TimesheetManagerMsg, () => [[["Item1", string_type], ["Item2", string_type]], [["Item", string_type]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(Timesheet$reflection()), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", list_type(Timesheet$reflection())]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Exception")]], [["Item", tuple_type(int32_type, string_type)]]]);
}

