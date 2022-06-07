import { urlUpdate } from "./TimesheetAppRouter.js";
import { AppState_get_Empty } from "./TimesheetAppTypes.js";
import { Cmd_none, Cmd_batch } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { empty } from "../fable_modules/fable-library.3.7.11/List.js";

export function init(result) {
    const patternInput = urlUpdate(result, AppState_get_Empty());
    const state = patternInput[0];
    const cmd = patternInput[1];
    return [state, Cmd_batch(empty())];
}

export function update(pci, msg, state) {
    return [state, Cmd_none()];
}

