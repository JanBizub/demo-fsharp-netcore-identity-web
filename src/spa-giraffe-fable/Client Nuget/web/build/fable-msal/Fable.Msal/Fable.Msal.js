import { handleRedirectPromise as handleRedirectPromise_1, createMsalInstance as createMsalInstance_1 } from "../../../../../../fable-msal/Fable.Msal/Fable.Msal.js";
import { ofArray } from "../../fable_modules/fable-library.3.7.11/List.js";
import { SilentRequest } from "./Fable.Msal.Types.js";

export const createMsalInstance = createMsalInstance_1;

export const handleRedirectPromise = handleRedirectPromise_1;

export function createSilentRequest(pci) {
    return new SilentRequest(pci.getAllAccounts()[0], ofArray(["openid", "profile"]));
}

