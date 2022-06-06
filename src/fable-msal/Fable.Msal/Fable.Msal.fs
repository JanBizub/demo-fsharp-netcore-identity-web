namespace Fable.Msal

[<RequireQualifiedAccess>]
module Msal =
  open Fable.Core.JsInterop
  open Fable.Core.JS

  let createMsalInstance (clientId: string, authority: string) : PublicClientApplication = 
    importMember "./Fable.Msal.js"
    
  let handleRedirectPromise (pci: PublicClientApplication) : Promise<unit> =
    importMember "./Fable.Msal.js"

  let createSilentRequest (pci: PublicClientApplication) = {
    account = pci.getAllAccounts().[0]
    scopes  = ["openid"; "profile"]
    }