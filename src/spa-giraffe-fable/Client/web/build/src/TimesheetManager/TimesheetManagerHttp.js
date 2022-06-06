import { singleton } from "../../fable_modules/fable-library.3.7.11/AsyncBuilder.js";
import { awaitPromise } from "../../fable_modules/fable-library.3.7.11/Async.js";
import { createSilentRequest } from "../../Fable/Fable.Msal/Fable.Msal/Fable.Msal.js";
import { getRequest } from "../FableApp.js";
import { Http_request } from "../../fable_modules/Fable.SimpleHttp.3.0.0/Http.fs.js";
import { apiAddress } from "../AppConfig.js";
import { SimpleJson_tryParse } from "../../fable_modules/Fable.SimpleJson.3.19.0/SimpleJson.fs.js";
import { createTypeInfo } from "../../fable_modules/Fable.SimpleJson.3.19.0/TypeInfo.Converter.fs.js";
import { Timesheet$reflection } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { list_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { Convert_fromJson } from "../../fable_modules/Fable.SimpleJson.3.19.0/Json.Converter.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.3.7.11/Choice.js";

export function getTimesheetsByUSerCode(pci, userCode) {
    return singleton.Delay(() => {
        let arg00;
        return singleton.Bind(awaitPromise((arg00 = createSilentRequest(pci), pci.acquireTokenSilent(arg00))), (_arg1) => {
            const authResponse = _arg1;
            const idToken = authResponse.idToken;
            return singleton.Bind(getRequest(idToken, Http_request(`${apiAddress}/api/timesheet/timesheetsbyusercode/${userCode}`)), (_arg2) => {
                let matchValue_1, inputJson, typeInfo;
                const response = _arg2;
                const matchValue = response.statusCode | 0;
                switch (matchValue) {
                    case 200: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(response.responseText), (matchValue_1 != null) ? ((inputJson = matchValue_1, (typeInfo = createTypeInfo(list_type(Timesheet$reflection())), Convert_fromJson(inputJson, typeInfo)))) : (() => {
                            throw (new Error("Couldn\u0027t parse the input JSON string because it seems to be invalid"));
                        })())));
                    }
                    case 500: {
                        return singleton.Return(new FSharpResult$2(1, [response.statusCode, response.responseText]));
                    }
                    default: {
                        return singleton.Return(new FSharpResult$2(1, [response.statusCode, response.responseText]));
                    }
                }
            });
        });
    });
}

