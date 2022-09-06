import { class_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { BrowserAuthOptions, BrowserAuthOptionsModule_empty } from "./Fable.Msal.Types.js";

export class BrowserAuthOptionsBuilder {
    constructor() {
    }
}

export function BrowserAuthOptionsBuilder$reflection() {
    return class_type("Fable.Msal.BrowserAuthOptionsCE.BrowserAuthOptionsBuilder", void 0, BrowserAuthOptionsBuilder);
}

export function BrowserAuthOptionsBuilder_$ctor() {
    return new BrowserAuthOptionsBuilder();
}

export function BrowserAuthOptionsBuilder__Yield_1505(_, _arg1) {
    return BrowserAuthOptionsModule_empty();
}

export function BrowserAuthOptionsBuilder__ClientId_33743E55(_, state, clientId) {
    return new BrowserAuthOptions(clientId, state.authority, state.redirectUri);
}

export function BrowserAuthOptionsBuilder__Authority_33743E55(_, state, authority) {
    return new BrowserAuthOptions(state.clientId, authority, state.redirectUri);
}

export function BrowserAuthOptionsBuilder__RedirectUri_33743E55(_, state, redirectUri) {
    return new BrowserAuthOptions(state.clientId, state.authority, redirectUri);
}

export const msalBrowserAuthOptions = BrowserAuthOptionsBuilder_$ctor();

