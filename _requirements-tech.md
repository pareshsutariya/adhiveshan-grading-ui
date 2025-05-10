## ===== Queue =====

- [ ] VS Extension for dotnet
- [ ] AWS Lambda setup

- [ ] UI: On each page load, Reload roles/permissions for login user (0.5)
- [ ] UI: And Refresh display menus/actions according to the roles/permissions (0.5)
- [ ] API: Return roles/permissions for a given user (0.5)
- [ ] API: Consider different time zone
- [ ] API: Implement Jwt token approach

- API: throw error as object/json so no need to do JSON.parse (0.5)

## ====== INFRASTRUCTURE ======

### Repo Setup:

- [x] UI Repo and basic framework
- [x] API Repo and basic framework
- [x] Steps to run the projects
- [x] Apply Repo restriction
- [x] UI: Auth Guard

- [ ] Code merging approach
- [ ] Test Env setup in AWS
- [ ] Prod Env setup in AWS
- [ ] DB Connection and Password protection/injection

## ====== PARTICIPANTS =====

### Authentication / Logic:

- [x] UI: Design Login screen
- [x] API: Implement an endpoint to authenticate user for given username/password
- [ ] API: Implement Jwt token approach

### Authorization:

- [x] API: Implement an endpoint to return roles/permissions for login user
- [x] UI: Make the menu and action button available based on permissions

### Audit fields:

- [ ] API: Set audit fields while add/edit
- [ ] UI: Display audit fields in List and detais page

## ===== ACTIVITY TRACKING =====:

- DB: Schema (TableName, RecordId, Activity, Activity By, Activity On)
- API:
- UI:
