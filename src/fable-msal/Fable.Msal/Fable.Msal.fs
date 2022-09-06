namespace Fable.Msal

open Fable.Core

[<Import("PublicClientApplication", from = "@azure/msal-browser")>]
type PublicClientApplication(conf: Configuration) =
    class

        // todo: How about this one:
        // todo: request is optional here
        // todo: abstract loginRedirect: ?request: RedirectRequest -> JSPromise<unit>
        abstract member loginRedirect: redirectRequest: RedirectRequest -> JS.Promise<unit>
        default _.loginRedirect(redirectRequest: RedirectRequest) : JS.Promise<unit> = jsNative

        abstract member acquireTokenSilent: silentRequest: SilentRequest -> JS.Promise<AuthenticationResult>
        default _.acquireTokenSilent(silentRequest: SilentRequest) : JS.Promise<AuthenticationResult> = jsNative

        abstract member getAllAccounts: unit -> AccountInfo array
        default _.getAllAccounts() : AccountInfo array = jsNative


        abstract member handleRedirectPromise: unit -> JS.Promise<AuthenticationResult option>
        default _.handleRedirectPromise() : JS.Promise<AuthenticationResult option> = jsNative

        // abstract member handleRedirectPromise: ?hash: string -> JS.Promise<AuthenticationResult option>

        // abstract member getAccountByHomeId: homeAccountId: string -> AccountInfo option
        // abstract member getAccountByLocalId: localId: string -> AccountInfo option
        // abstract member getAccountByUsername: userName: string -> AccountInfo option

        // abstract member setActiveAccount: account: AccountInfo option -> unit
        // abstract member getActiveAccount: unit -> AccountInfo option
    end
