namespace Fable.Msal

open System
open System.Collections.Generic
open Fable.Core.JS
open Fable.Core

type AccountInfo =
    { homeAccountId: string
      environment: string
      tenantId: string
      username: string }

type AuthenticationResult =
    { uniqueId: string
      tenantId: string
      scopes: string array
      account: AccountInfo
      idToken: string
      idTokenClaims: obj
      accessToken: string
      fromCache: bool
      expiresOn: DateTime
      extExpiresOn: DateTime
      state: string
      familyId: string }

type BrowserAuthOptions =
    { clientId: string
      authority: string option
      redirectUri: string option }

[<RequireQualifiedAccess>]
module BrowserAuthOptions =
    // todo: client id should never be empty
    let empty () =
        { clientId = ""
          authority = "https://login.microsoft.com/common" |> Some
          redirectUri = None }

type CacheOptions =
    { cacheLocation: string option
      storeAuthStateInCookie: bool option
      secureCookies: bool option }

type Configuration =
    { auth: BrowserAuthOptions
      cache: string option }

[<RequireQualifiedAccess>]
type AuthenticationScheme =
    | [<CompiledName("Bearer")>] BEARER
    | [<CompiledName("pop")>] POP
    | [<CompiledName("ssh-cert")>] SSH

[<RequireQualifiedAccess>]
type AzureCloudInstance =
    | [<CompiledName("0")>] None
    | [<CompiledName("https://login.microsoftonline.com")>] AzurePublic
    | [<CompiledName("https://login.windows-ppe.net")>] AzurePpe
    | [<CompiledName("https://login.chinacloudapi.cn")>] AzureChina
    | [<CompiledName("https://login.microsoftonline.de")>] AzureGermany
    | [<CompiledName("https://login.microsoftonline.us")>] AzureUsGovernment

type AzureCloudOptions =
    { azureCloudInstance: AzureCloudInstance
      tenant: string option }

type BaseAuthRequest =
    abstract authority: string
    abstract correlationId: string
    abstract scopes: string array
    abstract authenticationScheme: AuthenticationScheme option
    abstract claims: string option
    abstract shrClaims: string option
    abstract shrNonce: string option
    abstract resourceRequestMethod: string option
    abstract resourceRequestUri: string option
    abstract sshJwk: string option
    abstract sshKid: string option
    abstract azureCloudOptions: AzureCloudOptions option
    abstract requestedClaimsHash: string option

type ResponseMode =
    | [<CompiledName("query")>] QUERY
    | [<CompiledName("fragment")>] FRAGMENT
    | [<CompiledName("form_post")>] FORM_POST

type CommonAuthorizationUrlRequest =
    inherit BaseAuthRequest

    abstract redirectUri: string
    abstract responseMode: ResponseMode
    abstract account: AccountInfo option
    abstract codeChallenge: string option
    abstract codeChallengeMethod: string option
    abstract domainHint: string option with get, set
    abstract extraQueryParameters: Dictionary<string, string>
    abstract tokenQueryParameters: Dictionary<string, string>
    abstract extraScopesToConsent: string array
    abstract loginHint: string option
    abstract nonce: string option
    abstract prompt: string option
    abstract sid: string option
    abstract state: string option
    abstract nativeBroker: bool option

// type RedirectRequest =
//   inherit CommonAuthorizationUrlRequest
//
//   abstract scopes: string array
//   abstract redirectStartPage: string option
// onRedirectNavigate?: (url: string) => boolean | void;

/// SilentRequest: Request object passed by user to retrieve tokens from the
/// cache, renew an expired token with a refresh token, or retrieve a code (first leg of authorization code grant flow)
/// in a hidden iframe.
///
/// - scopes                 - Array of scopes the application is requesting access to.
/// - authority              - Url of the authority which the application acquires tokens from.
/// - correlationId          - Unique GUID set per request to trace a request end-to-end for telemetry purposes.
/// - account                - Account entity to lookup the credentials.
/// - forceRefresh           - Forces silent requests to make network calls if true.
/// - extraQueryParameters   - String to string map of custom query parameters added to the /authorize call. Only used when renewing the refresh token.
/// - tokenQueryParameters   - String to string map of custom query parameters added to the /token call. Only used when renewing access tokens.
/// - redirectUri            - The redirect URI where authentication responses can be received by your application. It must exactly match one of the redirect URIs registered in the Azure portal. Only used for cases where refresh token is expired.
type SilentRequest =
    { account: AccountInfo option
      scopes: string list
      authority: string option
      correlationId: Guid option // todo: lepší než originál. V Typescriptu je tady string.
      forceRefresh: bool option
      extraQueryParameters: Dictionary<string, string> option }

[<RequireQualifiedAccess>]
module SilentRequest =
    let empty () =
        { account = None
          scopes = []
          authority = None
          correlationId = None
          forceRefresh = None
          extraQueryParameters = None }

type RedirectRequest = { prompt: string; scopes: string list }

[<RequireQualifiedAccess>]
module RedirectRequest =
    let empty () = { prompt = ""; scopes = [] }

[<AllowNullLiteral>]
type IPublicClientApplication =
    abstract acquireTokenSilent: silentRequest: SilentRequest -> Promise<AuthenticationResult>
    abstract getAccountByHomeId: homeAccountId: string -> AccountInfo option
    abstract getAccountByLocalId: localId: string -> AccountInfo option
    abstract getAccountByUsername: userName: string -> AccountInfo option
    abstract getAllAccounts: unit -> AccountInfo array
    abstract handleRedirectPromise: ?hash: string -> Promise<AuthenticationResult option>
    abstract loginRedirect: ?request: RedirectRequest -> Promise<unit>
    abstract setActiveAccount: account: AccountInfo option -> unit
    abstract getActiveAccount: unit -> AccountInfo option


