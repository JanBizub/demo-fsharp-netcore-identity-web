import * as msal from "@azure/msal-browser";

// https://www.npmjs.com/package/@azure/msal-browser
// https://stackoverflow.com/questions/63347299/unable-to-acquire-token-silently-or-via-redirect-using-msal-browser
// https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/errors.md

export var createMsalInstance = (clientId,authority) => {
  const msalConfig = {
    auth: {
      clientId: clientId,
      authority: 'https://login.microsoftonline.com/' + authority
    },
    cache: {
      cacheLocation: "localStorage",
    },
  };

  const msalInstance =
    new msal.PublicClientApplication(msalConfig);

  return msalInstance
}

export var handleRedirectPromise = (pci) => {
  return pci.handleRedirectPromise()
}