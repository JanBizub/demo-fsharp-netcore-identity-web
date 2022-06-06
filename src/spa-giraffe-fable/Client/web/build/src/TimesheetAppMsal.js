import { ofArray } from "../fable_modules/fable-library.3.7.11/List.js";
import { SilentRequest } from "../Fable/Fable.Msal/Fable.Msal/Fable.Msal.Types.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../fable_modules/Fable.Promise.2.2.0/Promise.fs.js";
import { promise } from "../fable_modules/Fable.Promise.2.2.0/PromiseImpl.fs.js";
import { Cmd_OfPromise_either } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Msg } from "./TimesheetAppTypes.js";

export function acquireUniqueId(pci) {
    const silentRequest = new SilentRequest(pci.getAllAccounts()[0], ofArray(["openid", "profile"]));
    const request = () => PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => (pci.acquireTokenSilent(silentRequest).then((_arg1) => {
        const authResponse = _arg1;
        const uniqueId = authResponse.account.homeAccountId;
        return Promise.resolve(uniqueId);
    }))));
    return Cmd_OfPromise_either(request, void 0, (uniqueId_1) => (new Msg(8, uniqueId_1)), (arg0) => (new Msg(9, arg0)));
}

