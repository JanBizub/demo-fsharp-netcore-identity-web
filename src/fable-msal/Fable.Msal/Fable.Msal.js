import * as msal from "@azure/msal-browser";

// https://www.npmjs.com/package/@azure/msal-browser
// https://stackoverflow.com/questions/63347299/unable-to-acquire-token-silently-or-via-redirect-using-msal-browser
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/errors.md

export var createPublicClientApplication = (configuration) => {
  const msalInstance =
    new msal.PublicClientApplication(configuration);

  return msalInstance
}

export var handleRedirectPromise = (pci) => {
  return pci.handleRedirectPromise()
}