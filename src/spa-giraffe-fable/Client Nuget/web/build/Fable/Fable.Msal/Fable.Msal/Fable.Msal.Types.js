import { Record } from "../../../fable_modules/fable-library.3.7.11/Types.js";
import { list_type, option_type, class_type, bool_type, obj_type, array_type, record_type, string_type } from "../../../fable_modules/fable-library.3.7.11/Reflection.js";

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
    constructor(clientId, authority, knownAuthorities, cloudDiscoveryMetadata, authorityMetadata, redirectUri, postLogoutRedirectUri, navigateToLoginRequestUrl, clientCapabilities) {
        super();
        this.clientId = clientId;
        this.authority = authority;
        this.knownAuthorities = knownAuthorities;
        this.cloudDiscoveryMetadata = cloudDiscoveryMetadata;
        this.authorityMetadata = authorityMetadata;
        this.redirectUri = redirectUri;
        this.postLogoutRedirectUri = postLogoutRedirectUri;
        this.navigateToLoginRequestUrl = navigateToLoginRequestUrl;
        this.clientCapabilities = clientCapabilities;
    }
}

export function BrowserAuthOptions$reflection() {
    return record_type("Fable.Msal.BrowserAuthOptions", [], BrowserAuthOptions, () => [["clientId", string_type], ["authority", option_type(string_type)], ["knownAuthorities", option_type(list_type(string_type))], ["cloudDiscoveryMetadata", option_type(string_type)], ["authorityMetadata", option_type(string_type)], ["redirectUri", option_type(string_type)], ["postLogoutRedirectUri", option_type(string_type)], ["navigateToLoginRequestUrl", option_type(bool_type)], ["clientCapabilities", option_type(list_type(string_type))]]);
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
    return record_type("Fable.Msal.Configuration", [], Configuration, () => [["auth", BrowserAuthOptions$reflection()], ["cache", option_type(CacheOptions$reflection())]]);
}

export class SilentRequest extends Record {
    constructor(account, scopes) {
        super();
        this.account = account;
        this.scopes = scopes;
    }
}

export function SilentRequest$reflection() {
    return record_type("Fable.Msal.SilentRequest", [], SilentRequest, () => [["account", AccountInfo$reflection()], ["scopes", list_type(string_type)]]);
}

export class RedirectRequest extends Record {
    constructor(scopes) {
        super();
        this.scopes = scopes;
    }
}

export function RedirectRequest$reflection() {
    return record_type("Fable.Msal.RedirectRequest", [], RedirectRequest, () => [["scopes", list_type(string_type)]]);
}

