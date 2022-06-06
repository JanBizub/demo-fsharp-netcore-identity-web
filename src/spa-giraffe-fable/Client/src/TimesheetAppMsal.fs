[<RequireQualifiedAccess>]
module TimesheetAppMsal
open Fable.Msal
open Elmish
open TimesheetAppTypes

//let acquireUniqueId (pci: PublicClientApplication)  =
//  let silentRequest: SilentRequest = {
//    account = pci.getAllAccounts().[0]
//    scopes  = ["openid"; "profile"]
//    }
    
//  let request () = promise {
//    let! authResponse = silentRequest |> pci.acquireTokenSilent
//    let  uniqueId     = authResponse.account.homeAccountId
//    return uniqueId
//  }
  
//  Cmd.OfPromise.either
//    request ()
//    (fun uniqueId -> ApplicationUserIdRes(uniqueId))
//    UiError