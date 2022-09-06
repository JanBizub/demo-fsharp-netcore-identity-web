import { Union, Record } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { ComponentState, ComponentState$reflection } from "../FableApp.js";
import { unit_type, uint8_type, class_type, array_type, union_type, int32_type, record_type, tuple_type, string_type, list_type, option_type, bool_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { TimesheetGridLine$reflection, TimeSheetLine$reflection, UserTimesheet$reflection, User$reflection } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { empty } from "../../fable_modules/fable-library.3.7.11/List.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.3.7.11/Choice.js";

export class UserTimesheetState extends Record {
    constructor(ComponentState, SingleClickEdit, User, UserTimesheet, TimesheetLinesToSave, TimesheetGridLinesFailedValidation) {
        super();
        this.ComponentState = ComponentState;
        this.SingleClickEdit = SingleClickEdit;
        this.User = User;
        this.UserTimesheet = UserTimesheet;
        this.TimesheetLinesToSave = TimesheetLinesToSave;
        this.TimesheetGridLinesFailedValidation = TimesheetGridLinesFailedValidation;
    }
}

export function UserTimesheetState$reflection() {
    return record_type("UserTimesheetTypes.UserTimesheetState", [], UserTimesheetState, () => [["ComponentState", ComponentState$reflection()], ["SingleClickEdit", bool_type], ["User", option_type(User$reflection())], ["UserTimesheet", option_type(UserTimesheet$reflection())], ["TimesheetLinesToSave", list_type(TimeSheetLine$reflection())], ["TimesheetGridLinesFailedValidation", list_type(tuple_type(TimesheetGridLine$reflection(), list_type(string_type)))]]);
}

export function UserTimesheetState_get_empty() {
    return new UserTimesheetState(new ComponentState(0), true, void 0, void 0, empty(), empty());
}

export class TimesheetListViewMsg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["UserReq", "UserRes", "TimesheetReq", "TimesheetRes", "TimesheetCodeMonthReq", "SingleClickEdit", "GridRowAdd", "GridCellEditingStopped", "GridCellValueChanged", "InsertEmptyRow", "TimesheetLinesRemove", "SaveTimesheet", "UpsertTimesheetLinesReq", "UpsertTimesheetLinesRes", "DeleteTimesheetLineReq", "DeleteTimesheetLineRes", "UnlockTimesheetReq", "UnlockTimesheetRes", "CloseTimesheetReq", "CloseTimesheetRes", "OpenTimesheetReq", "OpenTimesheetRes", "SetDefaultRateReq", "SetDefaultRateRes", "ResetRateReq", "ResetRateRes", "ActualiseWorkActual", "TaskWorkActualReq", "TaskWorkActualRes", "ResetError", "ComponentError", "HttpError"];
    }
}

export function TimesheetListViewMsg$reflection() {
    return union_type("UserTimesheetTypes.TimesheetListViewMsg", [], TimesheetListViewMsg, () => [[], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [User$reflection(), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", User$reflection()]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [UserTimesheet$reflection(), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", UserTimesheet$reflection()]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item1", string_type], ["Item2", int32_type]], [["Item", bool_type]], [["Item", TimesheetGridLine$reflection()]], [["isLastRowNode", bool_type], ["Item2", TimesheetGridLine$reflection()]], [["Item", TimesheetGridLine$reflection()]], [], [["Item", array_type(TimesheetGridLine$reflection())]], [], [["Item", list_type(TimeSheetLine$reflection())]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(class_type("System.Guid")), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", list_type(class_type("System.Guid"))]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", list_type(class_type("System.Guid"))]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(class_type("System.Guid")), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", list_type(class_type("System.Guid"))]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item1", class_type("System.Guid")], ["Item2", uint8_type]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [uint8_type, tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", uint8_type]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [unit_type, tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", unit_type]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [tuple_type(class_type("System.Guid"), class_type("System.Decimal")), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", tuple_type(class_type("System.Guid"), class_type("System.Decimal"))]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [], [["Item", class_type("System.Exception")]], [["Item", tuple_type(int32_type, string_type)]]]);
}

