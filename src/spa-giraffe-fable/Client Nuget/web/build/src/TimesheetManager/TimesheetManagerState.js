import { ComponentState } from "../FableApp.js";
import { singleton, empty as empty_1 } from "../../fable_modules/fable-library.3.7.11/List.js";
import { TimesheetManagerMsg, TimesheetManagerState } from "./TimesheetManagerTypes.js";
import { Cmd_OfFunc_result, Cmd_OfAsync_start, Cmd_OfAsyncWith_either } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { getTimesheetsByUSerCode } from "./TimesheetManagerHttp.js";
import { Cmd_none } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Navigation_newUrl } from "../../fable_modules/Fable.Elmish.Browser.3.0.4/navigation.fs.js";

export const empty = new TimesheetManagerState(new ComponentState(0), empty_1());

export function update(pci, msg, state) {
    switch (msg.tag) {
        case 1: {
            const userCode_1 = msg.fields[0];
            return [new TimesheetManagerState(new ComponentState(1), state.Timesheets), Cmd_OfAsyncWith_either((x) => {
                Cmd_OfAsync_start(x);
            }, (tupledArg) => getTimesheetsByUSerCode(tupledArg[0], tupledArg[1]), [pci, userCode_1], (arg0) => (new TimesheetManagerMsg(2, arg0)), (arg0_1) => (new TimesheetManagerMsg(3, arg0_1)))];
        }
        case 2: {
            const result = msg.fields[0];
            if (result.tag === 1) {
                const statusCode = result.fields[0][0] | 0;
                const errorMessage = result.fields[0][1];
                return [state, Cmd_OfFunc_result(new TimesheetManagerMsg(4, [statusCode, errorMessage]))];
            }
            else {
                const timesheets = result.fields[0];
                return [new TimesheetManagerState(new ComponentState(3), timesheets), empty_1()];
            }
        }
        case 3: {
            const exn = msg.fields[0];
            return [new TimesheetManagerState(new ComponentState(2, singleton(exn.message)), state.Timesheets), Cmd_none()];
        }
        case 4: {
            const httpError = msg.fields[0];
            const errorMessage_1 = httpError[1];
            const errorCode = httpError[0] | 0;
            const httpErrorMessage = `HTTP Error ${errorCode} - ${errorMessage_1}`;
            return [new TimesheetManagerState(new ComponentState(2, singleton(httpErrorMessage)), state.Timesheets), Cmd_none()];
        }
        default: {
            const userCode = msg.fields[0];
            const month = msg.fields[1];
            return [state, Navigation_newUrl(`#/timesheet?user=${userCode}&month=${month}`)];
        }
    }
}

