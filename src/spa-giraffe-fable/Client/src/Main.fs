module Main
open TimesheetAppRouter
open Elmish
open Elmish.Debug
open Elmish.React
open Elmish.Navigation
open Elmish.UrlParser
open Fable.Msal
open Elmish.HMR // Elmish.HMR must be last open statement in order to HMR works correctly. 

let clientId = "xxx-xxxxx"
let authority = "xxxx-xxxx"

let pci = 
  (clientId, authority)
  |> Msal.createMsalInstance

let authenticatedProgram pci = 
  Program.mkProgram TimesheetAppState.init (TimesheetAppState.update pci) TimesheetAppView.Render
  
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
      then pci.loginRedirect {scopes = []} |> Promise.start
      else Browser.Dom.window.alert e.Message
    )
  |> Promise.start