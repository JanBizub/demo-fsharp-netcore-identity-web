module Main
open TimesheetAppRouter
open Elmish
open Elmish.Debug
open Elmish.React
open Elmish.Navigation
open Elmish.UrlParser
open Fable.Msal
open Elmish.HMR // Elmish.HMR must be last open statement in order to HMR works correctly. 

let pciConfig = configuration {
  auth (browserAuthOptions {
    clientId  "4a84817c-572d-4769-9327-a60502b1d938"
    authority "https://login.microsoftonline.com/a6f31cb4-f0fc-4936-8c48-b9c915f41547"
    })
  }

let pci = 
  pciConfig
  |> Msal.createPublicClientApplication

let authenticatedProgram pci = 
  Program.mkProgram State.init (State.update pci) View.Render
  
let createProgram program =
  program
  |> Program.toNavigable (parseHash pageParser) urlUpdate
  #if DEBUG
  |> Program.withDebugger
  #endif
  |> Program.withReactSynchronous "elmish-app"
  |> Program.run

promise {
  let! authResult = pci.handleRedirectPromise()
  
  let silentRequest  = silentRequest {
     account (pci.getAllAccounts().[0])
     scopes  [ "openid"; "profile"; ]
  }

  match authResult with
  | Some authResult ->
    let! authRes =
      silentRequest
      |> pci.acquireTokenSilent
    
    pci
    |> authenticatedProgram 
    |> createProgram
    
  | None ->
    let! authRes =
      silentRequest
      |> pci.acquireTokenSilent

    pci
    |> authenticatedProgram 
    |> createProgram
  }
  |> Promise.catch (fun e -> 
    // todo: do this smarter
    if    e.Message.Contains("no_account_error")
       || e.Message.Contains("monitor_window_timeout")
       || e.Message.Contains("interaction_required")
       
      then pci.loginRedirect { scopes = [ "openid"; "profile"; "api://32ebd7e2-5c5d-4e32-85d2-a5c2ed87ae66/access_as_user" ]; prompt = "consent" } |> Promise.start
      else Browser.Dom.window.alert e.Message; Browser.Dom.console.error e.Message
    )
  |> Promise.start