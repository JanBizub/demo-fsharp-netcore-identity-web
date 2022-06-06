module WebApplication.App

open System
open System.IO
open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Hosting
open Microsoft.Extensions.Logging
open Microsoft.Extensions.DependencyInjection
open Microsoft.Identity.Web
open Microsoft.Identity.Web.UI
open Giraffe
open Microsoft.Extensions.Configuration

let webApp =
  choose [
    GET
    >=> Handler.authorize
    >=> route "/"
    >=> Home.indexHandler "Hello from F#"
  ]


let configureServices (context:WebHostBuilderContext) (services: IServiceCollection) =
  let configuration: IConfiguration =
    ConfigurationBuilder()
      .AddJsonFile("appsettings.json",false,true)
      .AddJsonFile(sprintf "appsettings.%s.json" context.HostingEnvironment.EnvironmentName,true)
      .Build()
      :> IConfiguration

  services.AddMicrosoftIdentityWebAppAuthentication(configuration) |> ignore
  services.AddGiraffe() |> ignore
  services.AddRazorPages().AddMicrosoftIdentityUI() |> ignore


let configureApp (app : IApplicationBuilder) =
  let env = app.ApplicationServices.GetService<IWebHostEnvironment>()
  (match env.IsDevelopment() with
  | true  ->
      app.UseDeveloperExceptionPage()
  | false ->
      app.UseGiraffeErrorHandler(Handler.errorHandler)
         .UseHttpsRedirection())
    .UseStaticFiles()
    .UseAuthentication()
    .UseGiraffe(webApp)


let configureLogging (builder : ILoggingBuilder) =
  builder.AddConsole().AddDebug() |> ignore


[<EntryPoint>]
let main args =
  let contentRoot = Directory.GetCurrentDirectory()
  let webRoot     = Path.Combine(contentRoot, "WebRoot")
  Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(
      fun webHostBuilder ->
        webHostBuilder
          .UseContentRoot(contentRoot)
          .UseWebRoot(webRoot)
          .Configure(Action<IApplicationBuilder> configureApp)
          .ConfigureServices(configureServices)
          .ConfigureLogging(configureLogging)
          |> ignore)
    .Build()
    .Run()
  0