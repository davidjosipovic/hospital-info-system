FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /App

COPY appsettings.json /App/
COPY appsettings.Production.json /App/

COPY . ./
RUN dotnet restore "./Backend.csproj"
RUN dotnet publish "./Backend.csproj" -c Release -o out
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App
COPY --from=build /App/out .

COPY appsettings.json ./
COPY appsettings.Production.json ./

ENTRYPOINT ["dotnet", "Backend.dll"]
