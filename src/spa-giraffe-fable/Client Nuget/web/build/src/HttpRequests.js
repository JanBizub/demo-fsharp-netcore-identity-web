import { Http_request, Headers_authorization, Headers_contentType, Http_header, Http_method, Http_send } from "../fable_modules/Fable.SimpleHttp.3.0.0/Http.fs.js";
import { HttpMethod } from "../fable_modules/Fable.SimpleHttp.3.0.0/Types.fs.js";
import { Fable_Msal_SilentRequestCE_msalSilentRequest, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Yield_1505, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Account_31E51057, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Scopes_Z1696520D, Fable_Msal_SilentRequestCE_SilentRequestBuilder__CorrelationId_Z21E859ED } from "../fable-msal/Fable.Msal/SilentRequestCE.js";
import { ofArray } from "../fable_modules/fable-library.3.7.11/List.js";
import { singleton } from "../fable_modules/fable-library.3.7.11/AsyncBuilder.js";
import { awaitPromise } from "../fable_modules/fable-library.3.7.11/Async.js";
import { some } from "../fable_modules/fable-library.3.7.11/Option.js";
import { SimpleJson_tryParse } from "../fable_modules/Fable.SimpleJson.3.19.0/SimpleJson.fs.js";
import { createTypeInfo } from "../fable_modules/Fable.SimpleJson.3.19.0/TypeInfo.Converter.fs.js";
import { list_type, string_type } from "../fable_modules/fable-library.3.7.11/Reflection.js";
import { Convert_fromJson } from "../fable_modules/Fable.SimpleJson.3.19.0/Json.Converter.fs.js";
import { FSharpResult$2 } from "../fable_modules/fable-library.3.7.11/Choice.js";

export function getRequest(token, request) {
    let req_2, req_1;
    return Http_send((req_2 = ((req_1 = Http_method(new HttpMethod(0), request), Http_header(Headers_contentType("application/json"), req_1))), Http_header(Headers_authorization(`Bearer ${token}`), req_2)));
}

export function getCars(pci) {
    const silentRequest = Fable_Msal_SilentRequestCE_SilentRequestBuilder__CorrelationId_Z21E859ED(Fable_Msal_SilentRequestCE_msalSilentRequest, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Scopes_Z1696520D(Fable_Msal_SilentRequestCE_msalSilentRequest, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Account_31E51057(Fable_Msal_SilentRequestCE_msalSilentRequest, Fable_Msal_SilentRequestCE_SilentRequestBuilder__Yield_1505(Fable_Msal_SilentRequestCE_msalSilentRequest), pci.getAllAccounts()[0]), ofArray(["openid", "profile"])), "00000000-0000-0000-0000-000000000000");
    return singleton.Delay(() => singleton.Bind(awaitPromise(pci.acquireTokenSilent(silentRequest)), (_arg1) => {
        const authResponse = _arg1;
        console.warn(some("BEGIN REQUEST"));
        console.log(some("ID Token -----------"));
        console.log(some(authResponse.idToken));
        console.log(some("Access Token -------"));
        console.log(some(authResponse.accessToken));
        console.warn(some("END REQUEST"));
        return singleton.Bind(getRequest(authResponse.accessToken, Http_request("https://localhost:61235/api/cars")), (_arg2) => {
            let matchValue_1, inputJson, typeInfo;
            const response = _arg2;
            return (response.statusCode === 200) ? singleton.Return(new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(response.responseText), (matchValue_1 != null) ? ((inputJson = matchValue_1, (typeInfo = createTypeInfo(list_type(string_type)), Convert_fromJson(inputJson, typeInfo)))) : (() => {
                throw (new Error("Couldn\u0027t parse the input JSON string because it seems to be invalid"));
            })()))) : singleton.Return(new FSharpResult$2(1, response.responseText));
        });
    }));
}

