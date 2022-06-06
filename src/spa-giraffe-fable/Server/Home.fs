[<RequireQualifiedAccess>]
module Home

open Giraffe
open Giraffe.ViewEngine

type Message =
  {
    Text : string
  }


let layout (content: XmlNode list) =
  html [] [
    head [] [
      title []  [ encodedText "WebApplication" ]
      link [ _rel  "stylesheet"
             _type "text/css"
             _href "/main.css" ]
    ]
    body [] content
  ]

let partial () =
  h1 [] [ encodedText "WebApplication" ]

let index (model : Message) =
  [
    partial()
    p [] [ encodedText model.Text ]
  ] |> layout
    

let indexHandler (name : string) =
  let greetings = sprintf "Hello %s, from Giraffe!" name
  let model     = { Text = greetings }
  let view      = index model
  htmlView view