import { urlUpdate } from "./TimesheetAppRouter.js";
import { AppState, Msg, AppState_get_Empty } from "./TimesheetAppTypes.js";
import { Cmd_map, Cmd_none, Cmd_batch } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { UserManagerMsg } from "./UserManager/UserManagerTypes.js";
import { empty, ofArray } from "../fable_modules/fable-library.3.7.11/List.js";
import { Navigation_newUrl, Navigation_jump } from "../fable_modules/Fable.Elmish.Browser.3.0.4/navigation.fs.js";
import { parse } from "../fable_modules/fable-library.3.7.11/Guid.js";
import { acquireUniqueId } from "./TimesheetAppMsal.js";
import { update as update_1 } from "./UserTimesheet/UserTimesheetState.js";
import { UserTimesheetState_get_empty } from "./UserTimesheet/UserTimesheetTypes.js";
import { empty as empty_1, update as update_2 } from "./UserManager/UserManagerState.js";
import { empty as empty_2, update as update_3 } from "./TimesheetManager/TimesheetManagerState.js";
import { empty as empty_3, update as update_4 } from "./PeriodManager/PeriodManagerState.js";

export function init(result) {
    const patternInput = urlUpdate(result, AppState_get_Empty());
    const state = patternInput[0];
    const cmd = patternInput[1];
    return [state, Cmd_batch(ofArray([Cmd_OfFunc_result(new Msg(7)), Cmd_OfFunc_result(new Msg(12, new UserManagerMsg(1))), cmd]))];
}

export function update(pci, msg, state) {
    switch (msg.tag) {
        case 1: {
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, void 0, state.UserManagerState, state.PeriodManagerState, void 0, state.ErrorMessage), Navigation_jump(-1)];
        }
        case 2: {
            const userCode = msg.fields[0];
            const month = msg.fields[1];
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, void 0, state.UserManagerState, state.PeriodManagerState, void 0, state.ErrorMessage), Navigation_newUrl(`#/timesheet?user=${userCode}&month=${month}`)];
        }
        case 3: {
            const userCode_1 = msg.fields[0];
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, void 0, state.UserManagerState, state.PeriodManagerState, void 0, state.ErrorMessage), Navigation_newUrl(`#/timesheet?user=${userCode_1}`)];
        }
        case 4: {
            const month_1 = msg.fields[0];
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, void 0, state.UserManagerState, state.PeriodManagerState, void 0, state.ErrorMessage), Navigation_newUrl(`#/timesheet?month=${month_1}`)];
        }
        case 5: {
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, void 0, state.UserManagerState, state.PeriodManagerState, void 0, state.ErrorMessage), Navigation_newUrl("#/PeriodsList")];
        }
        case 6: {
            const uid = msg.fields[0];
            return [new AppState(state.CurrentRoute, parse(uid), state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_none()];
        }
        case 7: {
            return [state, acquireUniqueId(pci)];
        }
        case 8: {
            const uniqueId = msg.fields[0];
            const uid_1 = uniqueId.split(".")[0];
            return [state, Cmd_OfFunc_result(new Msg(6, uid_1))];
        }
        case 9: {
            const exn = msg.fields[0];
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, exn.message), Cmd_none()];
        }
        case 10: {
            const utMsg = msg.fields[0];
            const matchValue = state.UserTimesheetState;
            if (matchValue == null) {
                const patternInput_1 = update_1(pci, utMsg, UserTimesheetState_get_empty());
                const nextUtState_1 = patternInput_1[0];
                const nextUtMsg_1 = patternInput_1[1];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, nextUtState_1, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_map((arg0_2) => (new Msg(10, arg0_2)), nextUtMsg_1)];
            }
            else {
                const userTimesheetState = matchValue;
                const patternInput = update_1(pci, utMsg, userTimesheetState);
                const nextUtState = patternInput[0];
                const nextUtMsg = patternInput[1];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, nextUtState, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_map((arg0_1) => (new Msg(10, arg0_1)), nextUtMsg)];
            }
        }
        case 11: {
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, void 0, state.UserManagerState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), empty()];
        }
        case 12: {
            const umMsg = msg.fields[0];
            const matchValue_1 = state.UserManagerState;
            if (matchValue_1 == null) {
                const patternInput_3 = update_2(pci, umMsg, empty_1);
                const nextTslState_1 = patternInput_3[0];
                const nextTslMsg_1 = patternInput_3[1];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, state.UserTimesheetState, nextTslState_1, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_map((arg0_4) => (new Msg(12, arg0_4)), nextTslMsg_1)];
            }
            else {
                const userTimesheetState_1 = matchValue_1;
                const patternInput_2 = update_2(pci, umMsg, userTimesheetState_1);
                const nextTslState = patternInput_2[0];
                const nextTslMsg = patternInput_2[1];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, state.UserTimesheetState, nextTslState, state.PeriodManagerState, state.TimesheetManagerState, state.ErrorMessage), Cmd_map((arg0_3) => (new Msg(12, arg0_3)), nextTslMsg)];
            }
        }
        case 14: {
            const tmM = msg.fields[0];
            const matchValue_2 = state.TimesheetManagerState;
            if (matchValue_2 == null) {
                const patternInput_5 = update_3(pci, tmM, empty_2);
                const nextTmState_1 = patternInput_5[0];
                const nextTmMsg_1 = patternInput_5[1];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, nextTmState_1, state.ErrorMessage), Cmd_map((arg0_6) => (new Msg(14, arg0_6)), nextTmMsg_1)];
            }
            else {
                const timesheetManagerState = matchValue_2;
                const patternInput_4 = update_3(pci, tmM, timesheetManagerState);
                const nextTmState = patternInput_4[0];
                const nextTmMsg = patternInput_4[1];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, state.PeriodManagerState, nextTmState, state.ErrorMessage), Cmd_map((arg0_5) => (new Msg(14, arg0_5)), nextTmMsg)];
            }
        }
        case 13: {
            const pmM = msg.fields[0];
            const matchValue_3 = state.PeriodManagerState;
            if (matchValue_3 == null) {
                const patternInput_7 = update_4(pci, pmM, empty_3);
                const nextTmMsg_3 = patternInput_7[1];
                const nextPmmState_1 = patternInput_7[0];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, nextPmmState_1, state.TimesheetManagerState, state.ErrorMessage), Cmd_map((arg0_8) => (new Msg(13, arg0_8)), nextTmMsg_3)];
            }
            else {
                const periodManagerState = matchValue_3;
                const patternInput_6 = update_4(pci, pmM, periodManagerState);
                const nextTmMsg_2 = patternInput_6[1];
                const nextPmmState = patternInput_6[0];
                return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, state.UserTimesheetState, state.UserManagerState, nextPmmState, state.TimesheetManagerState, state.ErrorMessage), Cmd_map((arg0_7) => (new Msg(13, arg0_7)), nextTmMsg_2)];
            }
        }
        default: {
            return [new AppState(state.CurrentRoute, state.ApplicationUserUniqueId, void 0, state.UserManagerState, state.PeriodManagerState, void 0, state.ErrorMessage), Navigation_newUrl("#")];
        }
    }
}

