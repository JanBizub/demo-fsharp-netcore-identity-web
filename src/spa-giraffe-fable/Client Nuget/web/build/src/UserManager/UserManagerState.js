import { List_replace, ComponentState as ComponentState_5 } from "../FableApp.js";
import { head, tail, isEmpty, singleton, empty as empty_1 } from "../../fable_modules/fable-library.3.7.11/List.js";
import { UserManagerMsg, UserManagerState } from "./UserManagerTypes.js";
import { Cmd_OfFunc_result, Cmd_OfAsync_start, Cmd_OfAsyncWith_either } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { unlockTimesheet, closeTimesheet, getMonthTimesheets, getActiveUsers, getUserByOid } from "./UserManagerHttp.js";
import { Cmd_none } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Timesheet } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { Navigation_newUrl } from "../../fable_modules/Fable.Elmish.Browser.3.0.4/navigation.fs.js";

export const empty = new UserManagerState(new ComponentState_5(0), void 0, empty_1(), empty_1());

export function update(pci, msg, state) {
    switch (msg.tag) {
        case 1: {
            return [new UserManagerState(new ComponentState_5(1), state.User, state.Users, state.Timesheets), Cmd_OfAsyncWith_either((x) => {
                Cmd_OfAsync_start(x);
            }, getUserByOid, pci, (arg0) => (new UserManagerMsg(2, arg0)), (arg0_1) => (new UserManagerMsg(13, arg0_1)))];
        }
        case 2: {
            const result = msg.fields[0];
            if (result.tag === 1) {
                const statusCode = result.fields[0][0] | 0;
                const errorMessage = result.fields[0][1];
                return [state, Cmd_OfFunc_result(new UserManagerMsg(14, [statusCode, errorMessage]))];
            }
            else {
                const user = result.fields[0];
                return [new UserManagerState(new ComponentState_5(3), user, state.Users, state.Timesheets), empty_1()];
            }
        }
        case 3: {
            return [new UserManagerState(new ComponentState_5(1), state.User, state.Users, state.Timesheets), Cmd_OfAsyncWith_either((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, getActiveUsers, pci, (arg0_3) => (new UserManagerMsg(12, arg0_3)), (arg0_4) => (new UserManagerMsg(13, arg0_4)))];
        }
        case 12: {
            const result_1 = msg.fields[0];
            if (result_1.tag === 1) {
                const statusCode_1 = result_1.fields[0][0] | 0;
                const errorMessage_1 = result_1.fields[0][1];
                return [state, Cmd_OfFunc_result(new UserManagerMsg(14, [statusCode_1, errorMessage_1]))];
            }
            else {
                const users = result_1.fields[0];
                return [new UserManagerState(new ComponentState_5(3), state.User, users, state.Timesheets), empty_1()];
            }
        }
        case 13: {
            const exn = msg.fields[0];
            return [new UserManagerState(new ComponentState_5(2, singleton(exn.message)), state.User, state.Users, state.Timesheets), Cmd_none()];
        }
        case 14: {
            const httpError = msg.fields[0];
            const errorMessage_2 = httpError[1];
            const errorCode = httpError[0] | 0;
            const httpErrorMessage = `HTTP Error ${errorCode} - ${errorMessage_2}`;
            return [new UserManagerState(new ComponentState_5(2, singleton(httpErrorMessage)), state.User, state.Users, state.Timesheets), Cmd_none()];
        }
        case 4: {
            const month_1 = msg.fields[0] | 0;
            return [state, Cmd_OfAsyncWith_either((x_2) => {
                Cmd_OfAsync_start(x_2);
            }, (tupledArg) => getMonthTimesheets(tupledArg[0], tupledArg[1]), [pci, month_1], (arg0_6) => (new UserManagerMsg(5, arg0_6)), (arg0_7) => (new UserManagerMsg(13, arg0_7)))];
        }
        case 5: {
            const timesheets = msg.fields[0];
            if (timesheets.tag === 1) {
                const statusCode_2 = timesheets.fields[0][0] | 0;
                const errorMessage_3 = timesheets.fields[0][1];
                return [state, Cmd_OfFunc_result(new UserManagerMsg(14, [statusCode_2, errorMessage_3]))];
            }
            else {
                const tsl = timesheets.fields[0];
                return [new UserManagerState(new ComponentState_5(3), state.User, state.Users, tsl), empty_1()];
            }
        }
        case 8: {
            const timesheetId = msg.fields[0];
            let unlockTimesheetCommandOrError;
            const matchValue = state.Timesheets;
            if (isEmpty(matchValue)) {
                unlockTimesheetCommandOrError = Cmd_OfFunc_result(new UserManagerMsg(13, new Error("CloseTimesheetReq: Timesheet is None.")));
            }
            else {
                const t = tail(matchValue);
                const h = head(matchValue);
                unlockTimesheetCommandOrError = Cmd_OfAsyncWith_either((x_3) => {
                    Cmd_OfAsync_start(x_3);
                }, (tupledArg_1) => closeTimesheet(tupledArg_1[0], tupledArg_1[1]), [pci, timesheetId], (arg0_9) => (new UserManagerMsg(9, arg0_9)), (arg0_10) => (new UserManagerMsg(13, arg0_10)));
            }
            return [new UserManagerState(new ComponentState_5(3), state.User, state.Users, state.Timesheets), unlockTimesheetCommandOrError];
        }
        case 9: {
            const closeTimesheetRes = msg.fields[0];
            if (closeTimesheetRes.tag === 1) {
                const statusCode_3 = closeTimesheetRes.fields[0][0] | 0;
                const errorMessage_4 = closeTimesheetRes.fields[0][1];
                return [state, Cmd_OfFunc_result(new UserManagerMsg(14, [statusCode_3, errorMessage_4]))];
            }
            else {
                const unlockedTimesheetId = closeTimesheetRes.fields[0];
                const updatedTimesheets = List_replace((t_1) => (t_1.TimesheetId === unlockedTimesheetId), (t_2) => (new Timesheet(t_2.TimesheetId, t_2.UserId, 1, t_2.StartDate, t_2.EndDate, t_2.PeriodStatus)), state.Timesheets);
                return [new UserManagerState(new ComponentState_5(3), state.User, state.Users, updatedTimesheets), Cmd_none()];
            }
        }
        case 10: {
            const timesheetId_2 = msg.fields[0];
            let unlockTimesheetCommandOrError_1;
            const matchValue_1 = state.Timesheets;
            if (isEmpty(matchValue_1)) {
                unlockTimesheetCommandOrError_1 = Cmd_OfFunc_result(new UserManagerMsg(13, new Error("OpenTimesheetReq: Timesheet is None.")));
            }
            else {
                const t_3 = tail(matchValue_1);
                const h_1 = head(matchValue_1);
                unlockTimesheetCommandOrError_1 = Cmd_OfAsyncWith_either((x_4) => {
                    Cmd_OfAsync_start(x_4);
                }, (tupledArg_2) => closeTimesheet(tupledArg_2[0], tupledArg_2[1]), [pci, timesheetId_2], (arg0_13) => (new UserManagerMsg(11, arg0_13)), (arg0_14) => (new UserManagerMsg(13, arg0_14)));
            }
            return [new UserManagerState(new ComponentState_5(3), state.User, state.Users, state.Timesheets), unlockTimesheetCommandOrError_1];
        }
        case 11: {
            const openTimesheetRes = msg.fields[0];
            if (openTimesheetRes.tag === 1) {
                const statusCode_4 = openTimesheetRes.fields[0][0] | 0;
                const errorMessage_5 = openTimesheetRes.fields[0][1];
                return [state, Cmd_OfFunc_result(new UserManagerMsg(14, [statusCode_4, errorMessage_5]))];
            }
            else {
                const unlockedTimesheetId_1 = openTimesheetRes.fields[0];
                const updatedTimesheets_1 = List_replace((t_4) => (t_4.TimesheetId === unlockedTimesheetId_1), (t_5) => (new Timesheet(t_5.TimesheetId, t_5.UserId, 0, t_5.StartDate, t_5.EndDate, t_5.PeriodStatus)), state.Timesheets);
                return [new UserManagerState(new ComponentState_5(3), state.User, state.Users, updatedTimesheets_1), Cmd_none()];
            }
        }
        case 6: {
            const timesheetId_4 = msg.fields[0];
            let unlockTimesheetCommandOrError_2;
            const matchValue_2 = state.Timesheets;
            if (isEmpty(matchValue_2)) {
                unlockTimesheetCommandOrError_2 = Cmd_OfFunc_result(new UserManagerMsg(13, new Error("UnlockTimesheetReq: Timesheet is None.")));
            }
            else {
                const t_6 = tail(matchValue_2);
                const h_2 = head(matchValue_2);
                unlockTimesheetCommandOrError_2 = Cmd_OfAsyncWith_either((x_5) => {
                    Cmd_OfAsync_start(x_5);
                }, (tupledArg_3) => unlockTimesheet(tupledArg_3[0], tupledArg_3[1]), [pci, timesheetId_4], (arg0_17) => (new UserManagerMsg(7, arg0_17)), (arg0_18) => (new UserManagerMsg(13, arg0_18)));
            }
            return [new UserManagerState(new ComponentState_5(3), state.User, state.Users, state.Timesheets), unlockTimesheetCommandOrError_2];
        }
        case 7: {
            const unlockTimesheetRes = msg.fields[0];
            if (unlockTimesheetRes.tag === 1) {
                const statusCode_5 = unlockTimesheetRes.fields[0][0] | 0;
                const errorMessage_6 = unlockTimesheetRes.fields[0][1];
                return [state, Cmd_OfFunc_result(new UserManagerMsg(14, [statusCode_5, errorMessage_6]))];
            }
            else {
                const unlockedTimesheetId_2 = unlockTimesheetRes.fields[0];
                const updatedTimesheets_2 = List_replace((t_7) => (t_7.TimesheetId === unlockedTimesheetId_2), (t_8) => (new Timesheet(t_8.TimesheetId, t_8.UserId, 2, t_8.StartDate, t_8.EndDate, t_8.PeriodStatus)), state.Timesheets);
                return [new UserManagerState(new ComponentState_5(3), state.User, state.Users, updatedTimesheets_2), Cmd_none()];
            }
        }
        default: {
            const userCode = msg.fields[0];
            const month = msg.fields[1];
            return [state, Navigation_newUrl(`#/timesheet?user=${userCode}&month=${month}`)];
        }
    }
}

