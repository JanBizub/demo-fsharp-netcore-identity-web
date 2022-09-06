import { singleton } from "../../fable_modules/fable-library.3.7.11/AsyncBuilder.js";
import { awaitPromise } from "../../fable_modules/fable-library.3.7.11/Async.js";
import { createSilentRequest } from "../../Fable/Fable.Msal/Fable.Msal/Fable.Msal.js";
import { getRequest } from "../FableApp.js";
import { Http_request } from "../../fable_modules/Fable.SimpleHttp.3.0.0/Http.fs.js";
import { apiAddress } from "../AppConfig.js";
import { SimpleJson_tryParse } from "../../fable_modules/Fable.SimpleJson.3.19.0/SimpleJson.fs.js";
import { createTypeInfo } from "../../fable_modules/Fable.SimpleJson.3.19.0/TypeInfo.Converter.fs.js";
import { Timesheet$reflection, EntityReference$reflection, User$reflection } from "../../Aimtec.WRK.Domain/Aimtec.Timesheet.js";
import { Convert_fromJson } from "../../fable_modules/Fable.SimpleJson.3.19.0/Json.Converter.fs.js";
import { FSharpResult$2 } from "../../fable_modules/fable-library.3.7.11/Choice.js";
import { class_type, list_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";

export function getUserByOid(pci) {
    return singleton.Delay(() => {
        let arg00;
        return singleton.Bind(awaitPromise((arg00 = createSilentRequest(pci), pci.acquireTokenSilent(arg00))), (_arg1) => {
            const authResponse = _arg1;
            const idToken = authResponse.idToken;
            const uniqueId_1 = authResponse.account.homeAccountId.split(".")[0];
            return singleton.Bind(getRequest(idToken, Http_request(`${apiAddress}/api/user/getbyazureobjectid/${uniqueId_1}`)), (_arg2) => {
                let matchValue_1, inputJson, typeInfo;
                const response = _arg2;
                const matchValue = response.statusCode | 0;
                switch (matchValue) {
                    case 200: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(response.responseText), (matchValue_1 != null) ? ((inputJson = matchValue_1, (typeInfo = createTypeInfo(User$reflection()), Convert_fromJson(inputJson, typeInfo)))) : (() => {
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

export function getActiveUsers(pci) {
    return singleton.Delay(() => {
        let arg00;
        return singleton.Bind(awaitPromise((arg00 = createSilentRequest(pci), pci.acquireTokenSilent(arg00))), (_arg1) => {
            const authResponse = _arg1;
            const idToken = authResponse.idToken;
            return singleton.Bind(getRequest(idToken, Http_request(`${apiAddress}/api/user/activeusers/`)), (_arg2) => {
                let matchValue_1, inputJson, typeInfo;
                const response = _arg2;
                const matchValue = response.statusCode | 0;
                switch (matchValue) {
                    case 200: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(response.responseText), (matchValue_1 != null) ? ((inputJson = matchValue_1, (typeInfo = createTypeInfo(list_type(EntityReference$reflection())), Convert_fromJson(inputJson, typeInfo)))) : (() => {
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

export function getMonthTimesheets(pci, month) {
    return singleton.Delay(() => {
        let arg00;
        return singleton.Bind(awaitPromise((arg00 = createSilentRequest(pci), pci.acquireTokenSilent(arg00))), (_arg1) => {
            const authResponse = _arg1;
            const idToken = authResponse.idToken;
            return singleton.Bind(getRequest(idToken, Http_request(`${apiAddress}/api/timesheet/month/${month}`)), (_arg2) => {
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

export function unlockTimesheet(pci, timesheetId) {
    return singleton.Delay(() => {
        let arg00;
        return singleton.Bind(awaitPromise((arg00 = createSilentRequest(pci), pci.acquireTokenSilent(arg00))), (_arg1) => {
            const authResponse = _arg1;
            const idToken = authResponse.idToken;
            return singleton.Bind(getRequest(idToken, Http_request(`${apiAddress}/api/timesheet/unlocktimesheet/${timesheetId}`)), (_arg2) => {
                let matchValue_1, inputJson, typeInfo, matchValue_2, inputJson_1, typeInfo_1;
                const response = _arg2;
                const matchValue = response.statusCode | 0;
                switch (matchValue) {
                    case 200: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(response.responseText), (matchValue_1 != null) ? ((inputJson = matchValue_1, (typeInfo = createTypeInfo(class_type("System.Guid")), Convert_fromJson(inputJson, typeInfo)))) : (() => {
                            throw (new Error("Couldn\u0027t parse the input JSON string because it seems to be invalid"));
                        })())));
                    }
                    case 204: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_2 = SimpleJson_tryParse(response.responseText), (matchValue_2 != null) ? ((inputJson_1 = matchValue_2, (typeInfo_1 = createTypeInfo(class_type("System.Guid")), Convert_fromJson(inputJson_1, typeInfo_1)))) : (() => {
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

export function closeTimesheet(pci, timesheetId) {
    return singleton.Delay(() => {
        let arg00;
        return singleton.Bind(awaitPromise((arg00 = createSilentRequest(pci), pci.acquireTokenSilent(arg00))), (_arg1) => {
            const authResponse = _arg1;
            const idToken = authResponse.idToken;
            return singleton.Bind(getRequest(idToken, Http_request(`${apiAddress}/api/timesheet/closetimesheet/${timesheetId}`)), (_arg2) => {
                let matchValue_1, inputJson, typeInfo, matchValue_2, inputJson_1, typeInfo_1;
                const response = _arg2;
                const matchValue = response.statusCode | 0;
                switch (matchValue) {
                    case 200: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(response.responseText), (matchValue_1 != null) ? ((inputJson = matchValue_1, (typeInfo = createTypeInfo(class_type("System.Guid")), Convert_fromJson(inputJson, typeInfo)))) : (() => {
                            throw (new Error("Couldn\u0027t parse the input JSON string because it seems to be invalid"));
                        })())));
                    }
                    case 204: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_2 = SimpleJson_tryParse(response.responseText), (matchValue_2 != null) ? ((inputJson_1 = matchValue_2, (typeInfo_1 = createTypeInfo(class_type("System.Guid")), Convert_fromJson(inputJson_1, typeInfo_1)))) : (() => {
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

export function openTimesheet(pci, timesheetId) {
    return singleton.Delay(() => {
        let arg00;
        return singleton.Bind(awaitPromise((arg00 = createSilentRequest(pci), pci.acquireTokenSilent(arg00))), (_arg1) => {
            const authResponse = _arg1;
            const idToken = authResponse.idToken;
            return singleton.Bind(getRequest(idToken, Http_request(`${apiAddress}/api/timesheet/opentimesheet/${timesheetId}`)), (_arg2) => {
                let matchValue_1, inputJson, typeInfo, matchValue_2, inputJson_1, typeInfo_1;
                const response = _arg2;
                const matchValue = response.statusCode | 0;
                switch (matchValue) {
                    case 200: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_1 = SimpleJson_tryParse(response.responseText), (matchValue_1 != null) ? ((inputJson = matchValue_1, (typeInfo = createTypeInfo(class_type("System.Guid")), Convert_fromJson(inputJson, typeInfo)))) : (() => {
                            throw (new Error("Couldn\u0027t parse the input JSON string because it seems to be invalid"));
                        })())));
                    }
                    case 204: {
                        return singleton.Return(new FSharpResult$2(0, (matchValue_2 = SimpleJson_tryParse(response.responseText), (matchValue_2 != null) ? ((inputJson_1 = matchValue_2, (typeInfo_1 = createTypeInfo(class_type("System.Guid")), Convert_fromJson(inputJson_1, typeInfo_1)))) : (() => {
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

