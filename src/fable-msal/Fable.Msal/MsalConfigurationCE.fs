namespace Fable.Msal

[<AutoOpen>]
module MsalConfigurationCE =
    type ConfigurationBuilder() =
        // todo: client id should never be empty
        member _.Yield(_) =
            { auth = BrowserAuthOptions.empty ()
              cache = None }

        [<CustomOperation("auth")>]
        member _.Auth(state: Configuration, auth) = { state with auth = auth }

    let msalConfiguration =
        ConfigurationBuilder()