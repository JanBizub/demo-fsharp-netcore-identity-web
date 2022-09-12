﻿namespace Fable.Msal

open System
open System.Collections.Generic

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

type ResponseMode =
    | [<CompiledName("query")>] QUERY
    | [<CompiledName("fragment")>] FRAGMENT
    | [<CompiledName("form_post")>] FORM_POST

type AzureCloudOptions =
    { azureCloudInstance: AzureCloudInstance
      tenant: string option }

type SilentRequest =
    { account: AccountInfo option
      scopes: string list
      authority: string option
      correlationId: Guid option
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
