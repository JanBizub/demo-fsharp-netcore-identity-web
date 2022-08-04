namespace Fable.Msal

open System
open System.Collections.Generic
open Fable.Core.JS
open Fable.Core

type AccountInfo = 
   {
   homeAccountId   : string
   environment     : string
   tenantId        : string
   username        : string
   }

type AuthenticationResult =
  {
  uniqueId       : string
  tenantId       : string
  scopes         : string array
  account        : AccountInfo
  idToken        : string
  idTokenClaims  : obj
  accessToken    : string
  fromCache      : bool
  expiresOn      : DateTime
  extExpiresOn   : DateTime
  state          : string
  familyId       : string
  }

type BrowserAuthOptions = 
  {
  clientId    : string
  authority   : string option
  redirectUri : string option
  }

[<RequireQualifiedAccess>]
module BrowserAuthOptions =
   // todo: client id should never be empty
   let empty () = {
     clientId    = ""
     authority   = "https://login.microsoft.com/common" |> Some
     redirectUri = None
     }

type CacheOptions = 
  {
  cacheLocation: string option
  storeAuthStateInCookie: bool option
  secureCookies: bool option
  }

type Configuration = 
  {
  auth  : BrowserAuthOptions
  cache : string option
  }

[<RequireQualifiedAccess>]
type AuthenticationScheme =
  | [<CompiledName("Bearer")>]   BEARER
  | [<CompiledName("pop")>]      POP
  | [<CompiledName("ssh-cert")>] SSH
  
[<RequireQualifiedAccess>]
type AzureCloudInstance =
  | [<CompiledName("0")>] None
  | [<CompiledName("https://login.microsoftonline.com")>] AzurePublic
  | [<CompiledName("https://login.windows-ppe.net")>]     AzurePpe
  | [<CompiledName("https://login.chinacloudapi.cn")>]    AzureChina
  | [<CompiledName("https://login.microsoftonline.de")>]  AzureGermany
  | [<CompiledName("https://login.microsoftonline.us")>]  AzureUsGovernment
  
type AzureCloudOptions = {
 azureCloudInstance : AzureCloudInstance
 tenant             : string option
 }

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
  | [<CompiledName("query")>]     QUERY
  | [<CompiledName("fragment")>]  FRAGMENT
  | [<CompiledName("form_post")>] FORM_POST
  
type CommonAuthorizationUrlRequest =
  inherit BaseAuthRequest
  
    abstract redirectUri: string
    abstract responseMode: ResponseMode
    abstract account: AccountInfo option
    abstract codeChallenge: string option
    abstract codeChallengeMethod: string option
    abstract domainHint: string option with get, set
    abstract extraQueryParameters: Dictionary<string,string>
    abstract tokenQueryParameters: Dictionary<string,string>
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
  {
  account              : AccountInfo option
  scopes               : string list
  authority            : string option
  correlationId        : Guid option  // todo: lepší než originál. V Typescriptu je tady string. 
  forceRefresh         : bool option
  extraQueryParameters : Dictionary<string,string> option
  }
  
[<RequireQualifiedAccess>]
module SilentRequest =
  let empty () = {
    account              = None
    scopes               = []
    authority            = None
    correlationId        = None
    forceRefresh         = None
    extraQueryParameters = None
    }

type RedirectRequest = 
  {
  prompt: string
  scopes: string list
  }

type [<AllowNullLiteral>] IPublicClientApplication =
  abstract acquireTokenSilent: silentRequest: SilentRequest -> Promise<AuthenticationResult>
  abstract getAccountByHomeId: homeAccountId: string -> AccountInfo option
  abstract getAccountByLocalId: localId: string -> AccountInfo option
  abstract getAccountByUsername: userName: string -> AccountInfo option
  abstract getAllAccounts: unit -> AccountInfo array
  abstract handleRedirectPromise: ?hash: string -> Promise<AuthenticationResult option>
  abstract loginRedirect: ?request: RedirectRequest -> Promise<unit>
  abstract setActiveAccount: account: AccountInfo option -> unit
  abstract getActiveAccount: unit -> AccountInfo option

type [<AllowNullLiteral>] ClientApplication =
    abstract isBrowserEnvironment: bool with get, set
    /// <summary>
    /// Event handler function which allows users to fire events after the PublicClientApplication object
    /// has loaded during redirect flows. This should be invoked on all page loads involved in redirect
    /// auth flows.
    /// </summary>
    /// <param name="hash">Hash to process. Defaults to the current value of window.location.hash. Only needs to be provided explicitly if the response to be handled is not contained in the current value.</param>
    /// <returns>Token response or null. If the return value is null, then no auth redirect was detected.</returns>
    abstract handleRedirectPromise: ?hash: string -> Promise<AuthenticationResult option>

    abstract getAllAccounts: unit -> ResizeArray<AccountInfo>
    /// <summary>
    /// Returns the signed in account matching username.
    /// (the account object is created at the time of successful login)
    /// or null when no matching account is found.
    /// This API is provided for convenience but getAccountById should be used for best reliability
    /// </summary>
    /// <param name="userName" />
    /// <returns>The account object stored in MSAL</returns>
    abstract getAccountByUsername: userName: string -> AccountInfo option
    /// <summary>
    /// Returns the signed in account matching homeAccountId.
    /// (the account object is created at the time of successful login)
    /// or null when no matching account is found
    /// </summary>
    /// <param name="homeAccountId" />
    /// <returns>The account object stored in MSAL</returns>
    abstract getAccountByHomeId: homeAccountId: string -> AccountInfo option
    /// <summary>
    /// Returns the signed in account matching localAccountId.
    /// (the account object is created at the time of successful login)
    /// or null when no matching account is found
    /// </summary>
    /// <param name="localAccountId" />
    /// <returns>The account object stored in MSAL</returns>
    abstract getAccountByLocalId: localAccountId: string -> AccountInfo option
    /// <summary>Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.</summary>
    /// <param name="account" />
    abstract setActiveAccount: account: AccountInfo option -> unit
    /// Gets the currently active account
    abstract getActiveAccount: unit -> AccountInfo option
    /// <summary>Use to get the redirect uri configured in MSAL or null.</summary>
    /// <param name="requestRedirectUri" />
    /// <returns>Redirect URL</returns>
    abstract getRedirectUri: ?requestRedirectUri: string -> string
    /// <summary>Use to get the redirectStartPage either from request or use current window</summary>
    /// <param name="requestStartPage" />
    abstract getRedirectStartPage: ?requestStartPage: string -> string
    /// Helper to check whether interaction is in progress.
    abstract interactionInProgress: unit -> bool

type [<AllowNullLiteral>] ClientApplicationStatic =
    /// <param name="configuration">Object for the MSAL PublicClientApplication instance</param>
    [<EmitConstructor>] abstract Create: configuration: Configuration -> ClientApplication

type [<AllowNullLiteral>] PublicClientApplication =
  inherit ClientApplication
  inherit IPublicClientApplication
  /// <summary>
  /// Use when initiating the login process by redirecting the user's browser to the authorization endpoint. This function redirects the page, so
  /// any code that follows this function will not execute.
  /// 
  /// IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
  /// browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
  /// </summary>
  /// <param name="request" />
  abstract loginRedirect: ?request: RedirectRequest -> Promise<unit>
  /// <summary>Silently acquire an access token for a given set of scopes. Will use cached token if available, otherwise will attempt to acquire a new token from the network via refresh token.</summary>
  /// <param name= "request" />
  /// <returns>- a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the <see cref="AuthResponse" /> object</returns>
  abstract acquireTokenSilent: request: SilentRequest -> Promise<AuthenticationResult>

type [<AllowNullLiteral>] PublicClientApplicationStatic =
  /// <param name="configuration">object for the MSAL PublicClientApplication instance</param>
  [<EmitConstructor>] abstract Create: configuration: Configuration -> PublicClientApplication

