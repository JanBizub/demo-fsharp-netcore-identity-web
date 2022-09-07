import { value as value_9, some } from "../fable_modules/fable-library.3.7.11/Option.js";
import { ValidationCE_validation, ValidationCE_ValidationBuilder__MergeSources_Z5846AE20, ValidationCE_ValidationBuilder__BindReturn_28FF654F, ValidationCE_ValidationBuilder__Delay_Z29103BAD, ValidationCE_ValidationBuilder__Run_Z29103BAD } from "../fable_modules/FsToolkit.ErrorHandling.2.13.0/ValidationCE.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.3.7.11/Choice.js";
import { PublicClientApplication } from "@azure/msal-browser";
import { ProgramModule_mkProgram } from "../fable_modules/Fable.Elmish.3.1.0/program.fs.js";
import { update as update_1, init as init_1 } from "./State.js";
import { createElement } from "react";
import { Render } from "./View.js";
import { Program_Internal_withReactSynchronousUsing } from "../fable_modules/Fable.Elmish.React.3.0.1/react.fs.js";
import { lazyView2With } from "../fable_modules/Fable.Elmish.HMR.4.1.0/common.fs.js";
import { uncurry } from "../fable_modules/fable-library.3.7.11/Util.js";
import { ProgramModule_Internal_toNavigableWith, ProgramModule_Internal_subscribe, ProgramModule_Internal_unsubscribe } from "../fable_modules/Fable.Elmish.Browser.3.0.4/navigation.fs.js";
import { parseHash } from "../fable_modules/Fable.Elmish.Browser.3.0.4/parser.fs.js";
import { urlUpdate as urlUpdate_2, pageParser } from "./Router.js";
import { Program_withDebuggerUsing, Debugger_showWarning, Debugger_showError } from "../fable_modules/Fable.Elmish.Debugger.3.3.0/debugger.fs.js";
import { empty as empty_1, cons, singleton, ofArray } from "../fable_modules/fable-library.3.7.11/List.js";
import { newGuid } from "../fable_modules/fable-library.3.7.11/Guid.js";
import { add } from "../fable_modules/fable-library.3.7.11/Map.js";
import { Auto_generateBoxedEncoder_Z20B7B430, uint64, int64, decimal } from "../fable_modules/Thoth.Json.7.0.0/Encode.fs.js";
import { Auto_generateBoxedDecoder_79988AEF, uint64 as uint64_1, int64 as int64_1, decimal as decimal_1 } from "../fable_modules/Thoth.Json.7.0.0/Decode.fs.js";
import { empty } from "../fable_modules/Thoth.Json.7.0.0/Extra.fs.js";
import { ExtraCoders } from "../fable_modules/Thoth.Json.7.0.0/Types.fs.js";
import { AppState$reflection } from "./Types.js";
import { fromValue } from "../fable_modules/Thoth.Json.7.0.0/Decode.fs.js";
import { Debugger_ConnectionOptions } from "../fable_modules/Fable.Elmish.Debugger.3.3.0/debugger.fs.js";
import { getCaseFields, getCaseName as getCaseName_1, isUnion } from "../fable_modules/fable-library.3.7.11/Reflection.js";
import { join } from "../fable_modules/fable-library.3.7.11/String.js";
import { Options$1 } from "../fable_modules/Fable.Elmish.Debugger.3.3.0/Fable.Import.RemoteDev.fs.js";
import { connectViaExtension } from "remotedev";
import { Internal_saveState, Internal_tryRestoreState } from "../fable_modules/Fable.Elmish.HMR.4.1.0/hmr.fs.js";
import { Cmd_batch, Cmd_none, Cmd_map } from "../fable_modules/Fable.Elmish.3.1.0/cmd.fs.js";
import { Model$1, Msg$1 } from "../fable_modules/Fable.Elmish.HMR.4.1.0/hmr.fs.js";
import { ProgramModule_map, ProgramModule_runWith } from "../fable_modules/Fable.Elmish.3.1.0/program.fs.js";
import { PromiseBuilder__Delay_62FBFDE1, PromiseBuilder__Run_212F1D4B } from "../fable_modules/Fable.Promise.3.1.3/Promise.fs.js";
import { promise } from "../fable_modules/Fable.Promise.3.1.3/PromiseImpl.fs.js";

console.log(some("Start"));

export const test = ValidationCE_ValidationBuilder__Run_Z29103BAD(ValidationCE_validation, ValidationCE_ValidationBuilder__Delay_Z29103BAD(ValidationCE_validation, () => ValidationCE_ValidationBuilder__BindReturn_28FF654F(ValidationCE_validation, ValidationCE_ValidationBuilder__MergeSources_Z5846AE20(ValidationCE_validation, new FSharpResult$2(0, 1), new FSharpResult$2(0, 3)), (_arg1) => {
    const b = _arg1[1] | 0;
    const a = _arg1[0] | 0;
    return (a + b) | 0;
})));

console.log(some(test));

export const pciConfig = (() => {
    let builder$0040_1;
    const builder$0040 = Fable_Msal_MsalConfigurationCE_msalConfiguration;
    return Fable_Msal_MsalConfigurationCE_ConfigurationBuilder__Auth_27E9ADC4(builder$0040, Fable_Msal_MsalConfigurationCE_ConfigurationBuilder__Yield_1505(builder$0040), (builder$0040_1 = Fable_Msal_BrowserAuthOptionsCE_msalBrowserAuthOptions, Fable_Msal_BrowserAuthOptionsCE_BrowserAuthOptionsBuilder__Authority_33743E55(builder$0040_1, Fable_Msal_BrowserAuthOptionsCE_BrowserAuthOptionsBuilder__ClientId_33743E55(builder$0040_1, Fable_Msal_BrowserAuthOptionsCE_BrowserAuthOptionsBuilder__Yield_1505(builder$0040_1), "4a84817c-572d-4769-9327-a60502b1d938"), "https://login.microsoftonline.com/a6f31cb4-f0fc-4936-8c48-b9c915f41547")));
})();

export const pci = new PublicClientApplication(pciConfig);

export function authenticatedProgram(pci_1) {
    return ProgramModule_mkProgram(init_1, (msg, state) => update_1(pci_1, msg, state), (state_1, dispatch) => createElement(Render, {
        state: state_1,
        dispatch: dispatch,
    }));
}

export function createProgram(program) {
    let program_4, onLocationChange;
    const program_7 = Program_Internal_withReactSynchronousUsing((equal, view, state_1, dispatch_1) => lazyView2With(uncurry(2, equal), uncurry(2, view), state_1, dispatch_1), "elmish-app", (program_4 = ((onLocationChange = ((dispatch) => {
        if (!(module.hot == null)) {
            if (module.hot.status() !== "idle") {
                ProgramModule_Internal_unsubscribe();
            }
        }
        ProgramModule_Internal_subscribe(dispatch);
    }), ProgramModule_Internal_toNavigableWith((location) => parseHash(pageParser, location), urlUpdate_2, program, onLocationChange))), (() => {
        let copyOfStruct, copyOfStruct_1, copyOfStruct_2, deflate, inflate, port, address, inputRecord_1, port_1, address_1, inputRecord_2;
        try {
            let patternInput;
            try {
                let coders;
                let extra_2_1;
                const extra_1_1 = new ExtraCoders((copyOfStruct = newGuid(), copyOfStruct), add("System.Decimal", [decimal, (path) => ((value_1) => decimal_1(path, value_1))], empty.Coders));
                extra_2_1 = (new ExtraCoders((copyOfStruct_1 = newGuid(), copyOfStruct_1), add("System.Int64", [int64, int64_1], extra_1_1.Coders)));
                coders = (new ExtraCoders((copyOfStruct_2 = newGuid(), copyOfStruct_2), add("System.UInt64", [uint64, uint64_1], extra_2_1.Coders)));
                const encoder_3 = Auto_generateBoxedEncoder_Z20B7B430(AppState$reflection(), void 0, coders, void 0);
                const decoder_3 = Auto_generateBoxedDecoder_79988AEF(AppState$reflection(), void 0, coders);
                patternInput = ((deflate = ((x) => {
                    try {
                        return encoder_3(x);
                    }
                    catch (er) {
                        Debugger_showWarning(singleton(er.message));
                        return x;
                    }
                }), (inflate = ((x_1) => {
                    const matchValue = fromValue("$", uncurry(2, decoder_3), x_1);
                    if (matchValue.tag === 1) {
                        const er_1 = matchValue.fields[0];
                        throw (new Error(er_1));
                    }
                    else {
                        const x_2 = matchValue.fields[0];
                        return x_2;
                    }
                }), [deflate, inflate])));
            }
            catch (er_2) {
                Debugger_showWarning(singleton(er_2.message));
                patternInput = [(value_7) => value_7, (_arg1) => {
                    throw (new Error("Cannot inflate model"));
                }];
            }
            const inflater = patternInput[1];
            const deflater = patternInput[0];
            let connection;
            const opt = new Debugger_ConnectionOptions(0);
            const makeMsgObj = (tupledArg) => {
                const case$ = tupledArg[0];
                const fields = tupledArg[1];
                return {
                    type: case$,
                    msg: fields,
                };
            };
            const getCase = (x_3) => {
                if (isUnion(x_3)) {
                    const getCaseName = (acc_mut, x_1_1_mut) => {
                        getCaseName:
                        while (true) {
                            const acc = acc_mut, x_1_1 = x_1_1_mut;
                            const acc_1 = cons(getCaseName_1(x_1_1), acc);
                            const fields_1 = getCaseFields(x_1_1);
                            if ((fields_1.length === 1) && isUnion(fields_1[0])) {
                                acc_mut = acc_1;
                                x_1_1_mut = fields_1[0];
                                continue getCaseName;
                            }
                            else {
                                return makeMsgObj([join("/", acc_1), fields_1]);
                            }
                            break;
                        }
                    };
                    return getCaseName(empty_1(), x_3);
                }
                else {
                    return makeMsgObj(["NOT-AN-F#-UNION", x_3]);
                }
            };
            const fallback = new Options$1(true, 443, "remotedev.io", true, getCase);
            connection = connectViaExtension((opt.tag === 1) ? ((port = (opt.fields[1] | 0), (address = opt.fields[0], (inputRecord_1 = fallback, new Options$1(inputRecord_1.remote, port, address, false, inputRecord_1.getActionType))))) : ((opt.tag === 2) ? ((port_1 = (opt.fields[1] | 0), (address_1 = opt.fields[0], (inputRecord_2 = fallback, new Options$1(inputRecord_2.remote, port_1, address_1, inputRecord_2.secure, inputRecord_2.getActionType))))) : (new Options$1(false, 8000, "localhost", false, fallback.getActionType))));
            return Program_withDebuggerUsing(deflater, inflater, connection, program_4);
        }
        catch (ex) {
            Debugger_showError(ofArray(["Unable to connect to the monitor, continuing w/o debugger", ex.message]));
            return program_4;
        }
    })()));
    let hmrState = null;
    const hot = module.hot;
    if (!(hot == null)) {
        window.Elmish_HMR_Count = ((window.Elmish_HMR_Count == null) ? 0 : (window.Elmish_HMR_Count + 1));
        const value_8 = hot.accept();
        const matchValue_1 = Internal_tryRestoreState(hot);
        if (matchValue_1 == null) {
        }
        else {
            const previousState = value_9(matchValue_1);
            hmrState = previousState;
        }
    }
    const map = (tupledArg_1) => {
        const model = tupledArg_1[0];
        const cmd = tupledArg_1[1];
        return [model, Cmd_map((arg0) => (new Msg$1(0, arg0)), cmd)];
    };
    const mapUpdate = (update, msg, model_1) => {
        let msg_1, userModel, patternInput_2, newModel, cmd_2;
        const patternInput_1 = map((msg.tag === 1) ? [new Model$1(0), Cmd_none()] : ((msg_1 = msg.fields[0], (model_1.tag === 1) ? ((userModel = model_1.fields[0], (patternInput_2 = update(msg_1)(userModel), (newModel = patternInput_2[0], (cmd_2 = patternInput_2[1], [new Model$1(1, newModel), cmd_2]))))) : [model_1, Cmd_none()])));
        const newModel_1 = patternInput_1[0];
        const cmd_3 = patternInput_1[1];
        hmrState = newModel_1;
        return [newModel_1, cmd_3];
    };
    const createModel = (tupledArg_1_1) => {
        const model_2 = tupledArg_1_1[0];
        const cmd_4 = tupledArg_1_1[1];
        return [new Model$1(1, model_2), cmd_4];
    };
    const mapInit = (init) => {
        if (hmrState == null) {
            return (arg_2) => createModel(map(init(arg_2)));
        }
        else {
            return (_arg1_1) => [hmrState, Cmd_none()];
        }
    };
    const mapSetState = (setState, model_3, dispatch_2) => {
        if (model_3.tag === 1) {
            const userModel_1 = model_3.fields[0];
            setState(userModel_1)((arg_3) => dispatch_2(new Msg$1(0, arg_3)));
        }
    };
    let hmrSubscription;
    const handler = (dispatch_1_1) => {
        if (!(hot == null)) {
            hot.dispose((data) => {
                Internal_saveState(data, hmrState);
                return dispatch_1_1(new Msg$1(1));
            });
        }
    };
    hmrSubscription = singleton(handler);
    const mapSubscribe = (subscribe, model_4) => {
        if (model_4.tag === 1) {
            const userModel_2 = model_4.fields[0];
            return Cmd_batch(ofArray([Cmd_map((arg0_2) => (new Msg$1(0, arg0_2)), subscribe(userModel_2)), hmrSubscription]));
        }
        else {
            return Cmd_none();
        }
    };
    const mapView = (view_1, model_5, dispatch_2_1) => {
        if (model_5.tag === 1) {
            const userModel_3 = model_5.fields[0];
            return view_1(userModel_3)((arg_4) => dispatch_2_1(new Msg$1(0, arg_4)));
        }
        else {
            throw (new Error("\nYour are using HMR and this Elmish application has been marked as inactive.\n\nYou should not see this message\n                    "));
        }
    };
    ProgramModule_runWith(void 0, ProgramModule_map(uncurry(2, mapInit), mapUpdate, mapView, mapSetState, mapSubscribe, program_7));
}

(function () {
    let pr_2;
    const pr_1 = PromiseBuilder__Run_212F1D4B(promise, PromiseBuilder__Delay_62FBFDE1(promise, () => (pci.handleRedirectPromise().then((_arg1) => {
        const authResult = _arg1;
        let silentRequest;
        const builder$0040_1 = Fable_Msal_SilentRequestCE_msalSilentRequest;
        silentRequest = Fable_Msal_SilentRequestCE_SilentRequestBuilder__Scopes_Z1696520D(builder$0040_1, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Account_31E51057(builder$0040_1, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Yield_1505(builder$0040_1), pci.getAllAccounts()[0]), ofArray(["openid", "profile"]));
        if (authResult == null) {
            return pci.acquireTokenSilent(silentRequest).then((_arg3) => {
                const authRes_1 = _arg3;
                createProgram(authenticatedProgram(pci));
                return Promise.resolve();
            });
        }
        else {
            const authResult_1 = authResult;
            return pci.acquireTokenSilent(silentRequest).then((_arg2) => {
                const authRes = _arg2;
                createProgram(authenticatedProgram(pci));
                return Promise.resolve();
            });
        }
    }))));
    pr_2 = (pr_1.catch((e) => {
        if (((e.message.indexOf("no_account_error") >= 0) ? true : (e.message.indexOf("monitor_window_timeout") >= 0)) ? true : (e.message.indexOf("interaction_required") >= 0)) {
            let redirectRequest;
            const builder$0040_2 = Fable_Msal_RedirectRequestCE_msalRedirectRequest;
            redirectRequest = Fable_Msal_RedirectRequestCE_RedirectRequestBuilder__Prompt_644202EA(builder$0040_2, Fable_Msal_RedirectRequestCE_RedirectRequestBuilder__Scopes_Z56A4FE0(builder$0040_2, Fable_Msal_RedirectRequestCE_RedirectRequestBuilder__Yield_1505(builder$0040_2), ofArray(["openid", "profile", "api://32ebd7e2-5c5d-4e32-85d2-a5c2ed87ae66/access_as_user"])), "consent");
            const pr = pci.loginRedirect(redirectRequest);
            void pr;
        }
        else {
            window.alert(some(e.message));
            console.error(some(e.message));
        }
    }));
    void pr_2;
})();

