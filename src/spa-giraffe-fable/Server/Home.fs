[<RequireQualifiedAccess>]
module CarsHandler

open Microsoft.AspNetCore.Http
open Giraffe

let get () = fun (next : HttpFunc) (ctx : HttpContext) -> task {
  let cars = [ "Honda Accord"; "Honda Legend"; "Honda Civic"; "BMW 7" ]
  
  return! json cars next ctx
  }

