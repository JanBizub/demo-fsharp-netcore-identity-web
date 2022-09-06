import { Union, Record } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { ComponentState$reflection } from "../FableApp.js";
import { Timesheet$reflection, EntityReference$reflection, User$reflection } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { class_type, union_type, tuple_type, int32_type, string_type, record_type, list_type, option_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.3.7.11/Choice.js";

export class UserManagerState extends Record {
    constructor(ComponentState, User, Users, Timesheets) {
        super();
        this.ComponentState = ComponentState;
        this.User = User;
        this.Users = Users;
        this.Timesheets = Timesheets;
    }
}

export function UserManagerState$reflection() {
    return record_type("UserManagerTypes.UserManagerState", [], UserManagerState, () => [["ComponentState", ComponentState$reflection()], ["User", option_type(User$reflection())], ["Users", list_type(EntityReference$reflection())], ["Timesheets", list_type(Timesheet$reflection())]]);
}

export class UserManagerMsg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["NavigateToUserTimesheet", "UserReq", "UserRes", "UsersReq", "TimesheetsByMonthReq", "TimesheetsByMonthRes", "UnlockTimesheetReq", "UnlockTimesheetRes", "CloseTimesheetReq", "CloseTimesheetRes", "OpenTimesheetReq", "OpenTimesheetRes", "UsersRes", "ComponentError", "HttpError"];
    }
}

export function UserManagerMsg$reflection() {
    return union_type("UserManagerTypes.UserManagerMsg", [], UserManagerMsg, () => [[["Item1", string_type], ["Item2", string_type]], [], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [User$reflection(), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", User$reflection()]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [], [["Item", int32_type]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(Timesheet$reflection()), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", list_type(Timesheet$reflection())]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Guid")]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [class_type("System.Guid"), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", class_type("System.Guid")]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", union_type("Microsoft.FSharp.Core.FSharpResult`2", [list_type(EntityReference$reflection()), tuple_type(int32_type, string_type)], FSharpResult$2, () => [[["ResultValue", list_type(EntityReference$reflection())]], [["ErrorValue", tuple_type(int32_type, string_type)]]])]], [["Item", class_type("System.Exception")]], [["Item", tuple_type(int32_type, string_type)]]]);
}

