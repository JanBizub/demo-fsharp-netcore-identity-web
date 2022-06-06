[<RequireQualifiedAccess>]
module TimesheetAppView
open Fable.Core.JsInterop
open Feliz
open TimesheetAppTypes
open Elmish
    
[<ReactComponent>]
let Render (state: AppState) dispatch =
  importAll "./style.scss"

  Html.div [
    Html.p [ prop.text "AAD Demo" ]
  ]
