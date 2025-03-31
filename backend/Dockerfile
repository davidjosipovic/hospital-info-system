# Use official .NET SDK image for building the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

# Copy project files and restore dependencies
COPY /*.csproj backend/
RUN dotnet restore backend/Backend.csproj

# Copy the entire project and build it
COPY . .
RUN dotnet publish backend/Backend.csproj -c Release -o /publish

# Use the appropriate runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Copy built files from the builder image
COPY --from=build /publish .

# Expose the port that the app will run on
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# Set the entry point for the application
CMD ["dotnet", "Backend.dll"]
