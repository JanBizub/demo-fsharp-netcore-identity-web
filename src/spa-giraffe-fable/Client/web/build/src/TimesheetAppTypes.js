import { Record, Union } from "../fable_modules/fable-library.3.7.11/Types.js";
import { record_type, option_type, class_type, union_type, string_type, int32_type } from "../fable_modules/fable-library.3.7.11/Reflection.js";
import { TimesheetListViewMsg$reflection, UserTimesheetState$reflection } from "./UserTimesheet/UserTimesheetTypes.js";
import { UserManagerMsg$reflection, UserManagerState$reflection } from "./UserManager/UserManagerTypes.js";
import { PeriodManagerMsg$reflection, PeriodManagerState$reflection } from "./PeriodManager/PeriodManagerTypes.js";
import { TimesheetManagerMsg$reflection, TimesheetManagerState$reflection } from "./TimesheetManager/TimesheetManagerTypes.js";

export class Route extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Root", "Invalid", "TimesheetListMonth", "TimesheetListUser", "TimesheetListUserMonth", "PeriodsList"];
    }
}

export function Route$reflection() {
    return union_type("TimesheetAppTypes.Route", [], Route, () => [[], [], [["Item", int32_type]], [["Item", string_type]], [["Item1", string_type], ["Item2", int32_type]], []]);
}

export function Route_timesheetListOfParams(userCodeO, monthNumberO) {
    const matchValue = [userCodeO, monthNumberO];
    if (matchValue[0] == null) {
        if (matchValue[1] != null) {
            const monthNumber_1 = matchValue[1] | 0;
            return new Route(2, monthNumber_1);
        }
        else {
            return new Route(1);
        }
    }
    else if (matchValue[1] == null) {
        const userCode_1 = matchValue[0];
        return new Route(3, userCode_1);
    }
    else {
        const monthNumber = matchValue[1] | 0;
        const userCode = matchValue[0];
        const tupledArg = [userCode, monthNumber];
        return new Route(4, tupledArg[0], tupledArg[1]);
    }
}

export class AppState extends Record {
    constructor(CurrentRoute, ApplicationUserUniqueId, UserTimesheetState, UserManagerState, PeriodManagerState, TimesheetManagerState, ErrorMessage) {
        super();
        this.CurrentRoute = CurrentRoute;
        this.ApplicationUserUniqueId = ApplicationUserUniqueId;
        this.UserTimesheetState = UserTimesheetState;
        this.UserManagerState = UserManagerState;
        this.PeriodManagerState = PeriodManagerState;
        this.TimesheetManagerState = TimesheetManagerState;
        this.ErrorMessage = ErrorMessage;
    }
}

export function AppState$reflection() {
    return record_type("TimesheetAppTypes.AppState", [], AppState, () => [["CurrentRoute", Route$reflection()], ["ApplicationUserUniqueId", option_type(class_type("System.Guid"))], ["UserTimesheetState", option_type(UserTimesheetState$reflection())], ["UserManagerState", option_type(UserManagerState$reflection())], ["PeriodManagerState", option_type(PeriodManagerState$reflection())], ["TimesheetManagerState", option_type(TimesheetManagerState$reflection())], ["ErrorMessage", option_type(string_type)]]);
}

export function AppState_get_Empty() {
    return new AppState(new Route(0), void 0, void 0, void 0, void 0, void 0, void 0);
}

export class Msg extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["NavigateToIndex", "NavigateBack", "NavigateToUserTimesheet", "NavigateToTimesheetByUser", "NavigateToTimesheetByMonth", "NavigateToPeriodsList", "SetApplicationUserId", "ApplicationUserIdReq", "ApplicationUserIdRes", "UiError", "UserTimesheetMessages", "QuitTimesheetLine", "UserManagerMessages", "PeriodManagerMessages", "TimesheetManagerMessages"];
    }
}

export function Msg$reflection() {
    return union_type("TimesheetAppTypes.Msg", [], Msg, () => [[], [], [["Item1", string_type], ["Item2", string_type]], [["Item", string_type]], [["Item", string_type]], [], [["Item", string_type]], [], [["Item", string_type]], [["Item", class_type("System.Exception")]], [["Item", TimesheetListViewMsg$reflection()]], [], [["Item", UserManagerMsg$reflection()]], [["Item", PeriodManagerMsg$reflection()]], [["Item", TimesheetManagerMsg$reflection()]]]);
}

