namespace Fable.Msal

open System
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
  clientId: string
  authority: string option
  knownAuthorities: string list option
  cloudDiscoveryMetadata: string option
  authorityMetadata: string option
  redirectUri: string option
  postLogoutRedirectUri: string option
  navigateToLoginRequestUrl: bool option
  clientCapabilities: string list option
  //protocolMode?: ProtocolMode;
  }

type CacheOptions = 
  {
  cacheLocation: string option
  storeAuthStateInCookie: bool option
  secureCookies: bool option
  }

type Configuration = 
  {
  auth: BrowserAuthOptions
  cache: CacheOptions option
  //system?: BrowserSystemOptions
  }

type SilentRequest = 
  {
  account : AccountInfo
  scopes  : string list
  }

type RedirectRequest = 
  {
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

