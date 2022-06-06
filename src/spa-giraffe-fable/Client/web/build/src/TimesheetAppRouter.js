import { oneOf, intParam, stringParam, s, top, map } from "../fable_modules/Fable.Elmish.Browser.3.0.4/parser.fs.js";
import { Msg, AppState, Route_timesheetListOfParams, Route } from "./TimesheetAppTypes.js";
import { ofArray, collect } from "../fable_modules/fable-library.3.7.11/List.js";
import { Cmd_batch, Cmd_none } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { UserManagerMsg } from "./UserManager/UserManagerTypes.js";
import { TimesheetManagerMsg } from "./TimesheetManager/TimesheetManagerTypes.js";
import { TimesheetListViewMsg } from "./UserTimesheet/UserTimesheetTypes.js";
import { PeriodManagerMsg } from "./PeriodManager/PeriodManagerTypes.js";

export const pageParser = (() => {
    let parser_2, parser, queryParser, queryParser_2;
    const parsers = ofArray([map(new Route(0), top), map(new Route(5), s("PeriodsList")), map((arg00) => ((arg10) => Route_timesheetListOfParams(arg00, arg10)), (parser_2 = ((parser = s("timesheet"), (queryParser = stringParam("user"), (state_1) => collect(queryParser, parser(state_1))))), (queryParser_2 = intParam("month"), (state_3) => collect(queryParser_2, parser_2(state_3)))))]);
    return (state_5) => oneOf(parsers, state_5);
})();

export function urlUpdate(route, state) {
    let usersReq, timesheetsReq, timesheetCmd, tupledArg, userCmd;
    if (route != null) {
        const route_1 = route;
        switch (route_1.tag) {
            case 1: {
                return [new AppState(route_1, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_none()];
            }
            case 2: {
                const monthNumber = route_1.fields[0] | 0;
                return [new AppState(route_1, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), (usersReq = Cmd_OfFunc_result(new Msg(12, new UserManagerMsg(3))), (timesheetsReq = Cmd_OfFunc_result(new Msg(12, new UserManagerMsg(4, monthNumber))), Cmd_batch(ofArray([usersReq, timesheetsReq]))))];
            }
            case 3: {
                const userCode = route_1.fields[0];
                return [new AppState(route_1, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_OfFunc_result(new Msg(14, new TimesheetManagerMsg(1, userCode)))];
            }
            case 4: {
                const userCode_1 = route_1.fields[0];
                const monthNumber_1 = route_1.fields[1] | 0;
                return [new AppState(route_1, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), (timesheetCmd = Cmd_OfFunc_result(new Msg(10, (tupledArg = [userCode_1, monthNumber_1], new TimesheetListViewMsg(4, tupledArg[0], tupledArg[1])))), (userCmd = Cmd_OfFunc_result(new Msg(10, new TimesheetListViewMsg(0))), Cmd_batch(ofArray([timesheetCmd, userCmd]))))];
            }
            case 5: {
                return [new AppState(route_1, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_OfFunc_result(new Msg(13, new PeriodManagerMsg(0)))];
            }
            default: {
                return [new AppState(route_1, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_none()];
            }
        }
    }
    else {
        return [new AppState(new Route(1), state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_none()];
    }
}

