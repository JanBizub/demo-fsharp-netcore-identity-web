import { ComponentState } from "../FableApp.js";
import { singleton, empty as empty_1 } from "../../fable_modules/fable-library.3.7.11/List.js";
import { PeriodManagerMsg, PeriodManagerState } from "./PeriodManagerTypes.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_either, Cmd_OfFunc_result } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { getPeriods, openPeriod, closePeriod } from "./PeriodManagerHttp.js";
import { Cmd_none } from "../../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";

export const empty = new PeriodManagerState(new ComponentState(0), empty_1());

export function update(pci, msg, state) {
    switch (msg.tag) {
        case 1: {
            const result = msg.fields[0];
            if (result.tag === 1) {
                const statusCode = result.fields[0][0] | 0;
                const errorMessage = result.fields[0][1];
                return [state, Cmd_OfFunc_result(new PeriodManagerMsg(7, [statusCode, errorMessage]))];
            }
            else {
                const periods = result.fields[0];
                return [new PeriodManagerState(new ComponentState(3), periods), empty_1()];
            }
        }
        case 2: {
            const periodId = msg.fields[0];
            return [new PeriodManagerState(new ComponentState(3), state.Periods), Cmd_OfAsyncWith_either((x_1) => {
                Cmd_OfAsync_start(x_1);
            }, (tupledArg) => closePeriod(tupledArg[0], tupledArg[1]), [pci, periodId], (arg0_3) => (new PeriodManagerMsg(3, arg0_3)), (arg0_4) => (new PeriodManagerMsg(6, arg0_4)))];
        }
        case 3: {
            const result_1 = msg.fields[0];
            if (result_1.tag === 1) {
                const statusCode_1 = result_1.fields[0][0] | 0;
                const errorMessage_1 = result_1.fields[0][1];
                return [state, Cmd_OfFunc_result(new PeriodManagerMsg(7, [statusCode_1, errorMessage_1]))];
            }
            else {
                const periodId_2 = result_1.fields[0];
                return [new PeriodManagerState(new ComponentState(3), state.Periods), Cmd_OfFunc_result(new PeriodManagerMsg(0))];
            }
        }
        case 4: {
            const periodId_3 = msg.fields[0];
            return [new PeriodManagerState(new ComponentState(3), state.Periods), Cmd_OfAsyncWith_either((x_2) => {
                Cmd_OfAsync_start(x_2);
            }, (tupledArg_1) => openPeriod(tupledArg_1[0], tupledArg_1[1]), [pci, periodId_3], (arg0_6) => (new PeriodManagerMsg(5, arg0_6)), (arg0_7) => (new PeriodManagerMsg(6, arg0_7)))];
        }
        case 5: {
            const result_2 = msg.fields[0];
            if (result_2.tag === 1) {
                const statusCode_2 = result_2.fields[0][0] | 0;
                const errorMessage_2 = result_2.fields[0][1];
                return [state, Cmd_OfFunc_result(new PeriodManagerMsg(7, [statusCode_2, errorMessage_2]))];
            }
            else {
                const periodId_5 = result_2.fields[0];
                return [new PeriodManagerState(new ComponentState(3), state.Periods), Cmd_OfFunc_result(new PeriodManagerMsg(0))];
            }
        }
        case 6: {
            const exn = msg.fields[0];
            return [state, Cmd_none()];
        }
        case 7: {
            const httpError = msg.fields[0];
            const errorMessage_3 = httpError[1];
            const errorCode = httpError[0] | 0;
            const httpErrorMessage = `HTTP Error ${errorCode} - ${errorMessage_3}`;
            return [new PeriodManagerState(new ComponentState(2, singleton(httpErrorMessage)), state.Periods), Cmd_none()];
        }
        default: {
            return [new PeriodManagerState(new ComponentState(3), state.Periods), Cmd_OfAsyncWith_either((x) => {
                Cmd_OfAsync_start(x);
            }, getPeriods, pci, (arg0) => (new PeriodManagerMsg(1, arg0)), (arg0_1) => (new PeriodManagerMsg(6, arg0_1)))];
        }
    }
}

