module TimesheetAppTypes
open System

type MonthNumber = int
type UserCode    = string

[<RequireQualifiedAccess>]
type Route =
  | Root
  | Invalid
  
type AppState = {
  CurrentRoute : Route
  }  
  with
  static member Empty = {
    CurrentRoute = Route.Root
  }

type Msg =
  | DefaultMessage