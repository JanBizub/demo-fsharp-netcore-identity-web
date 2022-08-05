namespace Fable.Msal

[<RequireQualifiedAccess>]
module Msal =
  open Fable.Core
  open Fable.Core.JsInterop
  open Fable.Core.JS

  // todo: remove dependency on ./Fable.Msal.js file
  let createPublicClientApplication (configuration: Configuration) : PublicClientApplication =
    importMember "./Fable.Msal.js"

[<AutoOpen>]
module MsalBuilders =
  type SilentRequestBuilder() =
    member _.Yield(_) = SilentRequest.empty ()

    /// Account entity to lookup the credentials.
    [<CustomOperation("account")>]
    member _.Account(state: SilentRequest, v) = { state with account = Some v }

    /// Array of scopes the application is requesting access to.
    [<CustomOperation("scopes")>]
    member _.Scopes(state: SilentRequest, v) = { state with scopes = v }

    /// Url of the authority which the application acquires tokens from.
    [<CustomOperation("authority")>]
    member _.Authority(state: SilentRequest, v) = { state with authority = Some v }

    /// Unique GUID set per request to trace a request end-to-end for telemetry purposes.
    [<CustomOperation("correlationId")>]
    member _.CorrelationId(state: SilentRequest, v) = { state with correlationId = Some v }

    /// Forces silent requests to make network calls if true.
    [<CustomOperation("forceRefresh")>]
    member _.ForceRefresh(state: SilentRequest, v) = { state with forceRefresh = Some v }

  let silentRequest = SilentRequestBuilder()


  type ConfigurationBuilder() =
    // todo: client id should never be empty
    member _.Yield(_) = {
      auth  = BrowserAuthOptions.empty ()
      cache = None
      }

    [<CustomOperation("auth")>]
    member _.Auth(state: Configuration, auth) = { state with auth = auth }

  let configuration = ConfigurationBuilder()


  type BrowserAuthOptionsBuilder() =
    // todo: client id should never be empty
    member _.Yield(_) = BrowserAuthOptions.empty ()

    /// Client ID of your app registered with our Application registration portal : https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredAppsPreview in Microsoft Identity Platform
    [<CustomOperation("clientId")>]
    member _.ClientId(state: BrowserAuthOptions, clientId) = { state with clientId = clientId }

    /// You can configure a specific authority, defaults to " " or "https://login.microsoftonline.com/common"
    [<CustomOperation("authority")>]
    member _.Authority(state: BrowserAuthOptions, authority) = { state with authority = Some authority }

    /// The redirect URI where authentication responses can be received by your application. It must exactly match one of the redirect URIs registered in the Azure portal.
    [<CustomOperation("redirectUri")>]
    member _.RedirectUri(state: BrowserAuthOptions, redirectUri) = { state with redirectUri = Some redirectUri }

  let browserAuthOptions = BrowserAuthOptionsBuilder()
  
  type RedirectRequestBuilder() =
    member _.Yield(_) = RedirectRequest.empty ()

    /// prompt - Indicates the type of user interaction that is required.
    /// login: will force the user to enter their credentials on that request, negating single-sign on
    /// none:  will ensure that the user isn't presented with any interactive prompt. if request can't be completed via single-sign on, the endpoint will return an interaction_required error
    /// consent: will the trigger the OAuth consent dialog after the user signs in, asking the user to grant permissions to the app
    /// select_account: will interrupt single sign-=on providing account selection experience listing all the accounts in session or any remembered accounts or an option to choose to use a different account
    /// create: will direct the user to the account creation experience instead of the log in experience
    [<CustomOperation("prompt")>]
    member _.Prompt(state: RedirectRequest, prompt) = { state with prompt = prompt }

    /// scopes: Array of scopes the application is requesting access to.
    [<CustomOperation("scopes")>]
    member _.Scopes(state: RedirectRequest, scopes) = { state with scopes = scopes }
    
  let redirectRequest = RedirectRequestBuilder()
