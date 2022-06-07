[<RequireQualifiedAccess>]
module HttpRequests

open Fable.SimpleHttp
open Fable.SimpleJson
open Fable.Msal
open Fable.Core

let getRequest idToken (request: HttpRequest) = 
  request
  |> Http.method GET
  |> Http.header (Headers.contentType "application/json")
  |> Http.header (Headers.authorization $"Bearer {idToken}")
  |> Http.send

let getCars (pci: PublicClientApplication)  =
  async {
    let! authResponse = pci |> Msal.createSilentRequest |> pci.acquireTokenSilent |> Async.AwaitPromise
    let  idToken = authResponse.idToken
    let! response =
      Http.request "https://localhost:61235/api/cars" |> getRequest idToken
    
    match response.statusCode with
    | 200 -> return response.responseText |> Json.parseAs<string list>  |> Ok
    | _   -> return response.responseText |> Error
  }