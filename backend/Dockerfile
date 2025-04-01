# Use .NET 8 SDK for building
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

# Copy everything and build
COPY . ./
RUN dotnet restore "./Backend.csproj"
RUN dotnet publish "./Backend.csproj" -c Release -o out

# Use .NET 8 runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App
COPY --from=build /App/out .
ENTRYPOINT ["dotnet", "Backend.dll"]
