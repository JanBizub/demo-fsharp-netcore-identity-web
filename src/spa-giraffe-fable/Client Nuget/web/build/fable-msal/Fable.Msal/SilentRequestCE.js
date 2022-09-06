import { class_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { SilentRequest, SilentRequestModule_empty } from "./Fable.Msal.Types.js";

export class SilentRequestBuilder {
    constructor() {
    }
}

export function SilentRequestBuilder$reflection() {
    return class_type("Fable.Msal.SilentRequestCE.SilentRequestBuilder", void 0, SilentRequestBuilder);
}

export function SilentRequestBuilder_$ctor() {
    return new SilentRequestBuilder();
}

export function SilentRequestBuilder__Yield_1505(_, _arg1) {
    return SilentRequestModule_empty();
}

export function SilentRequestBuilder__Account_31E51057(_, state, v) {
    return new SilentRequest(v, state.scopes, state.authority, state.correlationId, state.forceRefresh, state.extraQueryParameters);
}

export function SilentRequestBuilder__Scopes_Z1696520D(_, state, v) {
    return new SilentRequest(state.account, v, state.authority, state.correlationId, state.forceRefresh, state.extraQueryParameters);
}

export function SilentRequestBuilder__Authority_77BE1F39(_, state, v) {
    return new SilentRequest(state.account, state.scopes, v, state.correlationId, state.forceRefresh, state.extraQueryParameters);
}

export function SilentRequestBuilder__CorrelationId_Z21E859ED(_, state, v) {
    return new SilentRequest(state.account, state.scopes, state.authority, v, state.forceRefresh, state.extraQueryParameters);
}

export function SilentRequestBuilder__ForceRefresh_1A1E51E8(_, state, v) {
    return new SilentRequest(state.account, state.scopes, state.authority, state.correlationId, v, state.extraQueryParameters);
}

export const msalSilentRequest = SilentRequestBuilder_$ctor();

