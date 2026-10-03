# Multi-stage build for ASP.NET Core 9 Web API
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

COPY ["LuxuryMachupicchu.sln", "./"]
COPY ["src/LuxuryMachupicchu.Domain/LuxuryMachupicchu.Domain.csproj", "src/LuxuryMachupicchu.Domain/"]
COPY ["src/LuxuryMachupicchu.Infrastructure/LuxuryMachupicchu.Infrastructure.csproj", "src/LuxuryMachupicchu.Infrastructure/"]
COPY ["src/LuxuryMachupicchu.API/LuxuryMachupicchu.API.csproj", "src/LuxuryMachupicchu.API/"]

RUN dotnet restore "LuxuryMachupicchu.sln"

COPY . .
WORKDIR "/src/src/LuxuryMachupicchu.API"
RUN dotnet publish "LuxuryMachupicchu.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

EXPOSE 5000

ENTRYPOINT ["dotnet", "LuxuryMachupicchu.API.dll"]
