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
      
    console.warn "BEGIN REQUEST"  
    console.log "ID Token -----------"
    console.log authResponse.idToken
    console.log "Access Token -------"
    console.log authResponse.accessToken
    console.warn "END REQUEST"
    
    let! response =
      Http.request "https://localhost:61235/api/cars"
      |> getRequest authResponse.accessToken
    
    match response.statusCode with
    | 200 -> return response.responseText |> Json.parseAs<string list>  |> Ok
    | _   -> return response.responseText |> Error
  }