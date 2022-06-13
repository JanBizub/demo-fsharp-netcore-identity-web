[<RequireQualifiedAccess>]
module HttpRequests

open Fable.SimpleHttp
open Fable.SimpleJson
open Fable.Msal
open Fable.Core

open Browser.Dom

let getRequest idToken (request: HttpRequest) = 
  request
  |> Http.method GET
  |> Http.header (Headers.contentType "application/json")
  |> Http.header (Headers.authorization $"Bearer {idToken}")
  |> Http.send

let getCars (pci: PublicClientApplication)  =
  async {
    let! authResponse =
      { account = pci.getAllAccounts().[0] |> Some
        scopes = [ "api://32ebd7e2-5c5d-4e32-85d2-a5c2ed87ae66/access_as_user" ] }
      |> pci.acquireTokenSilent
      |> Async.AwaitPromise
      
    // Bearer was not authenticated. Failure message: IDW10201: Neither scope or roles claim was found in the bearer
    // token. Authentication scheme used: 'Bearer'.

    // Bearer was not authenticated. Failure message: IDW10201: Neither scope or roles claim was found in the bearer t
    // oken. Authentication scheme used: 'Bearer'.
      
    console.log "ID Token -----------"
    console.log authResponse.idToken
    console.log "Access Token -------"
    console.log authResponse.accessToken
    
    let! response =
      Http.request "https://localhost:61235/api/cars"
      |> getRequest authResponse.idToken
    
    match response.statusCode with
    | 200 -> return response.responseText |> Json.parseAs<string list>  |> Ok
    | _   -> return response.responseText |> Error
  }