import { class_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { RedirectRequest, RedirectRequestModule_empty } from "./Fable.Msal.Types.js";

export class RedirectRequestBuilder {
    constructor() {
    }
}

export function RedirectRequestBuilder$reflection() {
    return class_type("Fable.Msal.RedirectRequestCE.RedirectRequestBuilder", void 0, RedirectRequestBuilder);
}

export function RedirectRequestBuilder_$ctor() {
    return new RedirectRequestBuilder();
}

export function RedirectRequestBuilder__Yield_1505(_, _arg1) {
    return RedirectRequestModule_empty();
}

export function RedirectRequestBuilder__Prompt_644202EA(_, state, prompt) {
    return new RedirectRequest(prompt, state.scopes);
}

export function RedirectRequestBuilder__Scopes_Z56A4FE0(_, state, scopes) {
    return new RedirectRequest(state.prompt, scopes);
}

export const msalRedirectRequest = RedirectRequestBuilder_$ctor();

