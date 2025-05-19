## UI Repo Setup:

- [x] UI Repo and basic framework
- [x] To do files: setup.md / requirements.md / git-command.md
- [ ] UI: appSettings to store environment specific variables
- [x] Menu setup

## API Repo Setup:

- [x] API Repo and basic framework (1)

## Users / Roles / Permissions:

- [x] API: Hardcode the roles (0.5)
- [x] UI: Hardcode the roles (0.5)
- [x] API: Roles & Permissions (0.5)
- [x] UI: Roles & Permissions (0.5)
- [x] API: Users CRUDS (0.5)
- [x] UI: Users CRUDS (0.5)

## Authentication / Authorization:

- [ ] UI: Design Login screen (0.5)
- [ ] API: Implement an endpoint to authenticate user for given username/password (0.5)
- [x] API: Return roles/permissions for a given user (0.5)
- [ ] UI: Auth Guard (0.5)
- [ ] API: Implement Jwt token approach : https://www.youtube.com/watch?v=w8I32UPEvj8&t=330s
- [ ] API/UI: auto refresh token
- [ ] UI: On each page load, Reload roles/permissions for login user
- [ ] UI: And Refresh display menus/actions according to the roles/permissions
- [ ] UI: Show profile details e.g. Username / Role etc.

## Deployment Setup:

- [ ] AWS Lambda setup (1.0)
  - Refer video: https://www.youtube.com/watch?v=VKGzlXLmFmg
  - Installing the Lambda Hosting Package: dotnet add package Amazon.Lambda.AspNetCoreServer.Hosting
  - Configure lambda.json file in API with detail
  - Loading Configurations from JSON
  - Deploying ASP.NET Core Web API to AWS Lambda with CLI
  - Verify Lambda deployment
- [ ] Test Env setup in AWS for API and UI
- [ ] Prod Env setup in AWS for API and UI
- [ ] Store DB Connection and Password in AWS Lambda Environment Variables (2)

## CICI Setup:

- Configure AWS Secret Keys in GIT to inject into lambda.json

## Audit fields:

- [ ] API: Set audit fields while add/edit
- [ ] UI: Display audit fields in List and detais page

## Activity Tracking:

- DB: Schema (TableName, RecordId, Activity, Activity By, Activity On)
- API:
- UI:
