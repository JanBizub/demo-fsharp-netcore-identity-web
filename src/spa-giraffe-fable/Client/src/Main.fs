module Main
open TimesheetAppRouter
open Elmish
open Elmish.Debug
open Elmish.React
open Elmish.Navigation
open Elmish.UrlParser
open Fable.Msal
open Elmish.HMR // Elmish.HMR must be last open statement in order to HMR works correctly. 

let clientId  = "4a84817c-572d-4769-9327-a60502b1d938"
let authority = "a6f31cb4-f0fc-4936-8c48-b9c915f41547"

let pci = 
  (clientId, authority)
  |> Msal.createMsalInstance

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
  
  match authResult with
  | Some authResult ->
    let! authRes = pci |> Msal.createSilentRequest |> pci.acquireTokenSilent

    pci
    |> authenticatedProgram 
    |> createProgram
    
  | None ->
    let! authRes = pci |> Msal.createSilentRequest |> pci.acquireTokenSilent

    pci
    |> authenticatedProgram 
    |> createProgram
  }
  |> Promise.catch (fun e -> 
    // todo: do this smarter
    if    e.Message.Contains("no_account_error")
       || e.Message.Contains("monitor_window_timeout")
       || e.Message.Contains("interaction_required")
       
      then pci.loginRedirect { scopes = [ "openid"; "profile"; ]; prompt = "consent" } |> Promise.start
      else Browser.Dom.window.alert e.Message; Browser.Dom.console.error e.Message
    )
  |> Promise.start