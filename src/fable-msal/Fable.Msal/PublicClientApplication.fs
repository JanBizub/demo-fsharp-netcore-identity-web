namespace Fable.Msal

open Fable.Core
open Fable.Core.JS

/// The PublicClientApplication class is the object exposed by the library to perform authentication and authorization functions in Single Page Applications
/// to obtain JWT tokens as described in the OAuth 2.0 Authorization Code Flow with PKCE specification.
[<Import("PublicClientApplication", from = "@azure/msal-browser")>]
type PublicClientApplication(conf: Configuration) =
    // abstract browserCrypto: ICrypto
    // abstract browserStorage: BrowserCacheManager
    // abstract nativeInternalStorage: BrowserCacheManager
    // abstract networkClient: INetworkModule
    // abstract navigationClient: INavigationClient with get, set
    // abstract config: BrowserConfiguration with get, set
    // abstract logger: Logger with get, set
    // abstract isBrowserEnvironment: bool with get, set
    // abstract eventHandler: EventHandler with get, set
    // abstract redirectResponse: Map<string, Promise<AuthenticationResult option>> with get, set
    // abstract nativeExtensionProvider: NativeMessageHandler option with get, set
    // abstract performanceClient: IPerformanceClient with get, set
    // abstract initialized: bool with get, set

    // BEGIN TAKEN FROM PUBLIC CLIENT APPLICATION ----------------------------------------------------------------------
    abstract loginRedirect: ?request: RedirectRequest -> Promise<unit>
    /// <summary>
    /// Use when initiating the login process by redirecting the user's browser to the authorization endpoint. This function redirects the page, so
    /// any code that follows this function will not execute.
    ///
    /// IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
    /// browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
    /// </summary>
    /// <param name="request" />
    default _.loginRedirect(?request: RedirectRequest) : Promise<unit> = jsNative

    
    // todo: loginPopup
    // /// <summary>Use when initiating the login process via opening a popup window in the user's browser</summary>
    // /// <param name="request" />
    // /// <returns>A promise that is fulfilled when this function has completed, or rejected if an error was raised.</returns>
    // abstract loginPopup: ?request: PopupRequest -> Promise<AuthenticationResult>

    
    abstract acquireTokenSilent: request: SilentRequest -> Promise<AuthenticationResult>
    /// <summary>Silently acquire an access token for a given set of scopes. Will use cached token if available, otherwise will attempt to acquire a new token from the network via refresh token.</summary>
    /// <param name="" />
    /// <param name="" />
    /// <returns>- a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the <see cref="AuthResponse" /></returns>
    default _.acquireTokenSilent(silentRequest: SilentRequest) : JS.Promise<AuthenticationResult> = jsNative

    
    abstract acquireTokenSilentAsync: request: SilentRequest * account: AccountInfo -> Promise<AuthenticationResult>
    /// <summary>Silently acquire an access token for a given set of scopes. Will use cached token if available, otherwise will attempt to acquire a new token from the network via refresh token.</summary>
    /// <param name="" />
    /// <param name="" />
    /// <returns>- a promise that is fulfilled when this function has completed, or rejected if an error was raised. Returns the <see cref="AuthResponse" /></returns>
    default _.acquireTokenSilentAsync(request: SilentRequest, account: AccountInfo) : Promise<AuthenticationResult> =
        jsNative
        
    // END TAKEN FROM PUBLIC CLIENT APPLICATION --------------------------------------------------------------

    abstract initialize: unit -> Promise<unit>
    /// Initializer function to perform async startup tasks such as connecting to WAM extension
    default _.initialize() : Promise<unit> = jsNative

    abstract handleRedirectPromise: ?hash: string -> Promise<AuthenticationResult option>
    /// <summary>
    /// Event handler function which allows users to fire events after the PublicClientApplication object
    /// has loaded during redirect flows. This should be invoked on all page loads involved in redirect
    /// auth flows.
    /// </summary>
    /// <param name="hash">Hash to process. Defaults to the current value of window.location.hash. Only needs to be provided explicitly if the response to be handled is not contained in the current value.</param>
    /// <returns>Token response or null. If the return value is null, then no auth redirect was detected.</returns>
    default _.handleRedirectPromise(?hash: string) : Promise<AuthenticationResult option> = jsNative

    abstract acquireTokenRedirect: request: RedirectRequest -> Promise<unit>
    /// <summary>
    /// Use when you want to obtain an access_token for your API by redirecting the user's browser window to the authorization endpoint. This function redirects
    /// the page, so any code that follows this function will not execute.
    ///
    /// IMPORTANT: It is NOT recommended to have code that is dependent on the resolution of the Promise. This function will navigate away from the current
    /// browser window. It currently returns a Promise in order to reflect the asynchronous nature of the code running in this function.
    /// </summary>
    /// <param name="request" />
    default _.acquireTokenRedirect(request: RedirectRequest) : Promise<unit> = jsNative

    // todo: acquireTokenPopup
    // abstract acquireTokenPopup: request: PopupRequest -> Promise<AuthenticationResult>
    // /// <summary>Use when you want to obtain an access_token for your API via opening a popup window in the user's browser</summary>
    // /// <param name="request" />
    // /// <returns>A promise that is fulfilled when this function has completed, or rejected if an error was raised.</returns>
    // default _.acquireTokenPopup (request: PopupRequest) : Promise<AuthenticationResult> = jsNative

    // todo: ssoSilent
    // abstract ssoSilent: request: SsoSilentRequest -> Promise<AuthenticationResult>
    // /// <summary>
    // /// This function uses a hidden iframe to fetch an authorization code from the eSTS. There are cases where this may not work:
    // /// - Any browser using a form of Intelligent Tracking Prevention
    // /// - If there is not an established session with the service
    // ///
    // /// In these cases, the request must be done inside a popup or full frame redirect.
    // ///
    // /// For the cases where interaction is required, you cannot send a request with prompt=none.
    // ///
    // /// If your refresh token has expired, you can use this function to fetch a new set of tokens silently as long as
    // /// you session on the server still exists.
    // /// </summary>
    // /// <param name="request" />
    // /// <returns>A promise that is fulfilled when this function has completed, or rejected if an error was raised.</returns>
    // default _.ssoSilent (request: SsoSilentRequest) : Promise<AuthenticationResult> = jsNative

    // todo: acquireTokenByCode
    // abstract acquireTokenByCode: request: AuthorizationCodeRequest -> Promise<AuthenticationResult>
    // /// <summary>
    // /// This function redeems an authorization code (passed as code) from the eSTS token endpoint.
    // /// This authorization code should be acquired server-side using a confidential client to acquire a spa_code.
    // /// This API is not indended for normal authorization code acquisition and redemption.
    // ///
    // /// Redemption of this authorization code will not require PKCE, as it was acquired by a confidential client.
    // /// </summary>
    // /// <param name="request" />
    // /// <returns>A promise that is fulfilled when this function has completed, or rejected if an error was raised.</returns>
    // default _.acquireTokenByCode (request: AuthorizationCodeRequest) : Promise<AuthenticationResult> = jsNative

    // todo: acquireTokenByRefreshToken
    // abstract acquireTokenByRefreshToken: request: CommonSilentFlowRequest -> Promise<AuthenticationResult>
    // /// <summary>
    // /// Use this function to obtain a token before every call to the API / resource provider
    // ///
    // /// MSAL return's a cached token when available
    // /// Or it send's a request to the STS to obtain a new token using a refresh token.
    // /// </summary>
    // /// <param name="" />
    // /// <returns>A promise that is fulfilled when this function has completed, or rejected if an error was raised.</returns>
    // default _.acquireTokenByRefreshToken (request: CommonSilentFlowRequest) : Promise<AuthenticationResult> = jsNative

    // todo: logoutRedirect
    // abstract logoutRedirect: ?logoutRequest: EndSessionRequest -> Promise<unit>
    // /// <summary>
    // /// Use to log out the current user, and redirect the user to the postLogoutRedirectUri.
    // /// Default behaviour is to redirect the user to <c>window.location.href</c>.
    // /// </summary>
    // /// <param name="logoutRequest" />
    // default _.logoutRedirect (?logoutRequest: EndSessionRequest) : Promise<unit> = jsNative

    // todo: logoutPopup
    // abstract logoutPopup: ?logoutRequest: EndSessionPopupRequest -> Promise<unit>
    // /// <summary>Clears local cache for the current user then opens a popup window prompting the user to sign-out of the server</summary>
    // /// <param name="logoutRequest" />
    // default _.logoutPopup (?logoutRequest: EndSessionPopupRequest) : Promise<unit> = jsNative

    abstract getAllAccounts: unit -> AccountInfo array
    /// <summary>
    /// Returns all accounts that MSAL currently has data for.
    /// (the account object is created at the time of successful login)
    /// or empty array when no accounts are found
    /// </summary>
    /// <returns>Array of account objects in cache</returns>
    default _.getAllAccounts () : AccountInfo array = jsNative

    abstract getAccountByUsername: userName: string -> AccountInfo option
    /// <summary>
    /// Returns the signed in account matching username.
    /// (the account object is created at the time of successful login)
    /// or null when no matching account is found.
    /// This API is provided for convenience but getAccountById should be used for best reliability
    /// </summary>
    /// <param name="userName" />
    /// <returns>The account object stored in MSAL</returns>
    default _.getAccountByUsername(userName: string) : AccountInfo option = jsNative

    abstract getAccountByHomeId: homeAccountId: string -> AccountInfo option
    /// <summary>
    /// Returns the signed in account matching homeAccountId.
    /// (the account object is created at the time of successful login)
    /// or null when no matching account is found
    /// </summary>
    /// <param name="homeAccountId" />
    /// <returns>The account object stored in MSAL</returns>
    default _.getAccountByHomeId(homeAccountId: string) : AccountInfo option = jsNative

    abstract getAccountByLocalId: localAccountId: string -> AccountInfo option
    /// <summary>
    /// Returns the signed in account matching localAccountId.
    /// (the account object is created at the time of successful login)
    /// or null when no matching account is found
    /// </summary>
    /// <param name="localAccountId" />
    /// <returns>The account object stored in MSAL</returns>
    default _.getAccountByLocalId(localAccountId: string) : AccountInfo option = jsNative

    abstract setActiveAccount: account: AccountInfo option -> unit
    /// <summary>Sets the account to use as the active account. If no account is passed to the acquireToken APIs, then MSAL will use this active account.</summary>
    /// <param name="account" />
    default _.setActiveAccount(account: AccountInfo option) : unit = jsNative

    abstract getActiveAccount: unit -> AccountInfo option
    /// Gets the currently active account
    default _.getActiveAccount() : AccountInfo option = jsNative

    // todo: preflightBrowserEnvironmentCheck
    /// <summary>Helper to validate app environment before making an auth request</summary>
    /// <param name="interactionType">What kind of interaction is being used</param>
    /// <param name="setInteractionInProgress">Whether to set interaction in progress temp cache flag</param>
    abstract preflightInteractiveRequest: setInteractionInProgress: bool -> unit

    /// <summary>Preflight check for interactive requests</summary>
    /// <param name="setInteractionInProgress">Whether to set interaction in progress temp cache flag</param>
    default _.preflightInteractiveRequest(setInteractionInProgress: bool) : unit = jsNative

// todo: rest of functions:
// /// <summary>Acquire a token from native device (e.g. WAM)</summary>
// /// <param name="request" />
// abstract acquireTokenNative:
//     request: U3<PopupRequest, SilentRequest, SsoSilentRequest> * apiId: ApiId * ?accountId: string ->
//         Promise<AuthenticationResult>
//
// /// <summary>Returns boolean indicating if this request can use the native broker</summary>
// /// <param name="request" />
// abstract canUseNative: request: U3<RedirectRequest, PopupRequest, SsoSilentRequest> * ?accountId: string -> bool
//
// /// <summary>Get the native accountId from the account</summary>
// /// <param name="request" />
// /// <returns />
// abstract getNativeAccountId: request: U3<RedirectRequest, PopupRequest, SsoSilentRequest> -> string
//
// /// <summary>Returns new instance of the Popup Interaction Client</summary>
// /// <param name="correlationId" />
// abstract createPopupClient: ?correlationId: string -> PopupClient
//
// /// <summary>Returns new instance of the Redirect Interaction Client</summary>
// /// <param name="correlationId" />
// abstract createRedirectClient: ?correlationId: string -> RedirectClient
//
// /// <summary>Returns new instance of the Silent Iframe Interaction Client</summary>
// /// <param name="correlationId" />
// abstract createSilentIframeClient: ?correlationId: string -> SilentIframeClient
//
// /// Returns new instance of the Silent Cache Interaction Client
// abstract createSilentCacheClient: ?correlationId: string -> SilentCacheClient
// /// Returns new instance of the Silent Refresh Interaction Client
// abstract createSilentRefreshClient: ?correlationId: string -> SilentRefreshClient
// /// Returns new instance of the Silent AuthCode Interaction Client
// abstract createSilentAuthCodeClient: ?correlationId: string -> SilentAuthCodeClient
//
// /// <summary>Adds event callbacks to array</summary>
// /// <param name="callback" />
// abstract addEventCallback: callback: EventCallbackFunction -> string option
//
// /// <summary>Removes callback with provided id from callback array</summary>
// /// <param name="callbackId" />
// abstract removeEventCallback: callbackId: string -> unit
//
// /// <summary>Registers a callback to receive performance events.</summary>
// /// <param name="callback" />
// /// <returns />
// abstract addPerformanceCallback: callback: PerformanceCallbackFunction -> string
//
// /// <summary>Removes a callback registered with addPerformanceCallback.</summary>
// /// <param name="callbackId" />
// /// <returns />
// abstract removePerformanceCallback: callbackId: string -> bool
//
// /// Adds event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
// abstract enableAccountStorageEvents: unit -> unit
// /// Removes event listener that emits an event when a user account is added or removed from localstorage in a different browser tab or window
// abstract disableAccountStorageEvents: unit -> unit
// /// Gets the token cache for the application.
// abstract getTokenCache: unit -> ITokenCache
// /// Returns the logger instance
// abstract getLogger: unit -> Logger
//
// /// <summary>Replaces the default logger set in configurations with new Logger with new configurations</summary>
// /// <param name="logger">Logger instance</param>
// abstract setLogger: logger: Logger -> unit
//
// /// <summary>Called by wrapper libraries (Angular &amp; React) to set SKU and Version passed down to telemetry, logger, etc.</summary>
// /// <param name="sku" />
// /// <param name="version" />
// abstract initializeWrapperLibrary: sku: WrapperSKU * version: string -> unit
//
// /// <summary>Sets navigation client</summary>
// /// <param name="navigationClient" />
// abstract setNavigationClient: navigationClient: INavigationClient -> unit
//
// /// Returns the configuration object
// abstract getConfiguration: unit -> BrowserConfiguration
//
// /// <summary>Generates a correlation id for a request if none is provided.</summary>
// /// <param name="request" />
// /// <returns />
// abstract getRequestCorrelationId: ?request: obj -> string