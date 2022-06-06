module TimesheetAppState
open System
open Elmish
open Elmish.Navigation
open TimesheetAppTypes
open TimesheetAppRouter
open Fable.Msal

let init result =
  let state, cmd = urlUpdate result AppState.Empty
  state,
  Cmd.batch [
  ]
  
let update (pci: PublicClientApplication) msg (state: AppState) =
  match msg with
  | DefaultMessage ->
    state, Cmd.none