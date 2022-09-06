import { Union, Record } from "../../fable_modules/fable-library.3.7.11/Types.js";
import { list_type, union_type, option_type, class_type, bool_type, obj_type, array_type, record_type, string_type } from "../../fable_modules/fable-library.3.7.11/Reflection.js";
import { empty } from "../../fable_modules/fable-library.3.7.11/List.js";

export class AccountInfo extends Record {
    constructor(homeAccountId, environment, tenantId, username) {
        super();
        this.homeAccountId = homeAccountId;
        this.environment = environment;
        this.tenantId = tenantId;
        this.username = username;
    }
}

export function AccountInfo$reflection() {
    return record_type("Fable.Msal.AccountInfo", [], AccountInfo, () => [["homeAccountId", string_type], ["environment", string_type], ["tenantId", string_type], ["username", string_type]]);
}

export class AuthenticationResult extends Record {
    constructor(uniqueId, tenantId, scopes, account, idToken, idTokenClaims, accessToken, fromCache, expiresOn, extExpiresOn, state, familyId) {
        super();
        this.uniqueId = uniqueId;
        this.tenantId = tenantId;
        this.scopes = scopes;
        this.account = account;
        this.idToken = idToken;
        this.idTokenClaims = idTokenClaims;
        this.accessToken = accessToken;
        this.fromCache = fromCache;
        this.expiresOn = expiresOn;
        this.extExpiresOn = extExpiresOn;
        this.state = state;
        this.familyId = familyId;
    }
}

export function AuthenticationResult$reflection() {
    return record_type("Fable.Msal.AuthenticationResult", [], AuthenticationResult, () => [["uniqueId", string_type], ["tenantId", string_type], ["scopes", array_type(string_type)], ["account", AccountInfo$reflection()], ["idToken", string_type], ["idTokenClaims", obj_type], ["accessToken", string_type], ["fromCache", bool_type], ["expiresOn", class_type("System.DateTime")], ["extExpiresOn", class_type("System.DateTime")], ["state", string_type], ["familyId", string_type]]);
}

export class BrowserAuthOptions extends Record {
    constructor(clientId, authority, redirectUri) {
        super();
        this.clientId = clientId;
        this.authority = authority;
        this.redirectUri = redirectUri;
    }
}

export function BrowserAuthOptions$reflection() {
    return record_type("Fable.Msal.BrowserAuthOptions", [], BrowserAuthOptions, () => [["clientId", string_type], ["authority", option_type(string_type)], ["redirectUri", option_type(string_type)]]);
}

export function BrowserAuthOptionsModule_empty() {
    return new BrowserAuthOptions("", "https://login.microsoft.com/common", void 0);
}

export class CacheOptions extends Record {
    constructor(cacheLocation, storeAuthStateInCookie, secureCookies) {
        super();
        this.cacheLocation = cacheLocation;
        this.storeAuthStateInCookie = storeAuthStateInCookie;
        this.secureCookies = secureCookies;
    }
}

export function CacheOptions$reflection() {
    return record_type("Fable.Msal.CacheOptions", [], CacheOptions, () => [["cacheLocation", option_type(string_type)], ["storeAuthStateInCookie", option_type(bool_type)], ["secureCookies", option_type(bool_type)]]);
}

export class Configuration extends Record {
    constructor(auth, cache) {
        super();
        this.auth = auth;
        this.cache = cache;
    }
}

export function Configuration$reflection() {
    return record_type("Fable.Msal.Configuration", [], Configuration, () => [["auth", BrowserAuthOptions$reflection()], ["cache", option_type(string_type)]]);
}

export class AuthenticationScheme extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["Bearer", "pop", "ssh-cert"];
    }
}

export function AuthenticationScheme$reflection() {
    return union_type("Fable.Msal.AuthenticationScheme", [], AuthenticationScheme, () => [[], [], []]);
}

export class AzureCloudInstance extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["0", "https://login.microsoftonline.com", "https://login.windows-ppe.net", "https://login.chinacloudapi.cn", "https://login.microsoftonline.de", "https://login.microsoftonline.us"];
    }
}

export function AzureCloudInstance$reflection() {
    return union_type("Fable.Msal.AzureCloudInstance", [], AzureCloudInstance, () => [[], [], [], [], [], []]);
}

export class AzureCloudOptions extends Record {
    constructor(azureCloudInstance, tenant) {
        super();
        this.azureCloudInstance = azureCloudInstance;
        this.tenant = tenant;
    }
}

export function AzureCloudOptions$reflection() {
    return record_type("Fable.Msal.AzureCloudOptions", [], AzureCloudOptions, () => [["azureCloudInstance", AzureCloudInstance$reflection()], ["tenant", option_type(string_type)]]);
}

export class ResponseMode extends Union {
    constructor(tag, ...fields) {
        super();
        this.tag = (tag | 0);
        this.fields = fields;
    }
    cases() {
        return ["query", "fragment", "form_post"];
    }
}

export function ResponseMode$reflection() {
    return union_type("Fable.Msal.ResponseMode", [], ResponseMode, () => [[], [], []]);
}

export class SilentRequest extends Record {
    constructor(account, scopes, authority, correlationId, forceRefresh, extraQueryParameters) {
        super();
        this.account = account;
        this.scopes = scopes;
        this.authority = authority;
        this.correlationId = correlationId;
        this.forceRefresh = forceRefresh;
        this.extraQueryParameters = extraQueryParameters;
    }
}

export function SilentRequest$reflection() {
    return record_type("Fable.Msal.SilentRequest", [], SilentRequest, () => [["account", option_type(AccountInfo$reflection())], ["scopes", list_type(string_type)], ["authority", option_type(string_type)], ["correlationId", option_type(class_type("System.Guid"))], ["forceRefresh", option_type(bool_type)], ["extraQueryParameters", option_type(class_type("System.Collections.Generic.Dictionary`2", [string_type, string_type]))]]);
}

export function SilentRequestModule_empty() {
    return new SilentRequest(void 0, empty(), void 0, void 0, void 0, void 0);
}

export class RedirectRequest extends Record {
    constructor(prompt, scopes) {
        super();
        this.prompt = prompt;
        this.scopes = scopes;
    }
}

export function RedirectRequest$reflection() {
    return record_type("Fable.Msal.RedirectRequest", [], RedirectRequest, () => [["prompt", string_type], ["scopes", list_type(string_type)]]);
}

export function RedirectRequestModule_empty() {
    return new RedirectRequest("", empty());
}

