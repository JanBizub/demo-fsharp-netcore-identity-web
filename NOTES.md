# Azure AD
- Identity Provider
- Official docs: https://docs.microsoft.com/en-us/azure/active-directory/develop/?WT.mc_id=addemystify-blog-masoucou

# Tokens
- JWT
- JWT Decoder https://www.jstoolset.com/jwt


## Identity Token
- has information about the user

## Access Token
- is used to gain access to other resources - like a Web API

# Industry Standards
## OpenID Connect
## OAuth

# Azure AD Applications
So let's say you had a todo list application. That application has a web app, mobile app, and a web API. So let's say you had a todo list application. That application has a web app, mobile app, and a web API. Why a separate one to model the web API?

This goes back to those access tokens from before.

The user of the frontend app will authenticate with Azure AD and get an access token that will be passed to the web API to get access to it.

That access is granted by a Scope. It's a portion of the backend's functionality that is scoped out for other application's to use.

So through the Azure AD portal, you create (or expose) a scope (or API permission as it will sometimes be called) for the backend's Azure AD Application.

Then the frontend application is granted permission to that scope (again through the portal).

When the user signs in - they will be asked to Consent to the backend scope being used.

# APPLICATION AND DIRECTORY IDS
You will hear Application ID referred to as Client ID and Directory ID referred to as Tenant ID.

These terms are interchangeable and mean the same thing. Application ID is the Client ID. Directory ID is the Tenant ID.

The Application ID uniquely identities the Application within Azure AD. You can name the application whatever you want (and change it), but the ID is a system generated GUID. But know that it only refers to the application.

The Directory ID on the other hand refers to the entire Azure AD instance. Azure AD can contain many applications. But the Directory ID never changes.

# REDIRECT URIS
The second concept is Redirect URIs.

During the sign-in/authentication process, your application is giving control over to Azure AD. The user interface will look completely different (you can customize it though).

So how does Azure AD know where to send the Identity and Access tokens when it gives control back to your application?

The Redirect URIs.

And you can specify many of them. And you can even specify a special one for when a user logs out.

What I want you to do now is change the Redirect URIs from before.
