import { urlUpdate } from "./Router.js";
import { AppState, Msg, AppState_get_Empty } from "./Types.js";
import { Cmd_none, Cmd_batch } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { empty } from "../fable_modules/fable-library.3.7.11/List.js";
import { Cmd_OfAsync_start, Cmd_OfAsyncWith_either, Cmd_OfFunc_result } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { getCars } from "./HttpRequests.js";

export function init(result) {
    const patternInput = urlUpdate(result, AppState_get_Empty());
    const state = patternInput[0];
    const cmd = patternInput[1];
    return [state, Cmd_batch(empty())];
}

export function update(pci, msg, state) {
    switch (msg.tag) {
        case 1: {
            const result = msg.fields[0];
            if (result.tag === 1) {
                const e = result.fields[0];
                return [state, Cmd_OfFunc_result(new Msg(2, new Error(e)))];
            }
            else {
                const cars = result.fields[0];
                return [new AppState(state.CurrentRoute, cars, state.ErrorMessage), Cmd_none()];
            }
        }
        case 2: {
            const exn = msg.fields[0];
            return [new AppState(state.CurrentRoute, state.Cars, `Error: ${exn.message}`), Cmd_none()];
        }
        default: {
            return [new AppState(state.CurrentRoute, empty(), state.ErrorMessage), Cmd_OfAsyncWith_either((x) => {
                Cmd_OfAsync_start(x);
            }, getCars, pci, (arg0) => (new Msg(1, arg0)), (arg0_1) => (new Msg(2, arg0_1)))];
        }
    }
}

