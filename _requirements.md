## ====== PARTICIPANTS =====

### Import Participants:

- [x] UI: Provide menu
- [x] UI: File import button
- [x] UI: Parse the imported file data, and post to API
- [x] API: Implement an endpoint to Import Participants
- [x] API: While importing, for the given MIS ID, first delete the existing record from database, and then import the new record

### List Participants UI:

- [x] UI: List the participants in table by calling the endpoint
- [x] UI: Provide standard pagination / sorting / search
- [x] UI: Provide multi column sorting
- [x] UI: Provide filter on each column
- [x] UI: Freeze the table header
- [x] API: Implement an endpoint to get Participants

### View a Participant detail UI:

- [x] UI: On clicking participant, display that participant detail in popup

### Additional fields:

- [x] BAPS ID: add this field once added to PBI
- [x] Participation center (can be different that center of candidate)
- [ ] Checkin field

## ====== GRADING TOPICS =====:

### Skill Categories:

- [x] API: "SkillCategories" table Schema (Id, Skill Name, Category Name)
- [x] API: Implement an endpoint to return data from table SkillCategories
- [x] UI: Menu: Add "Skill Categories" menu in navigation panel
- [x] UI: List Page: Make an API call, and display data
- [x] UI: List Page: Apply standard sorting and searching

### Skill Grading Criterias:

- [x] API: "GradingCriterias" table Schema (Id, Skill, SkillCategory, Name, Description, Round, WeightageOptions[], RequiredJudges, IsActive)
- [x] API: Implement an endpoint to return list of data
- [x] API: Implement an endpoint to Add record
- [x] API: Implement an endpoint to Edit record
- [x] UI: Menu: Add "Grading Criterias" menu in navigation panel
- [x] UI: List Page: Make an API call, and display data
- [x] UI: List Page: Apply standard sorting and searching
- [x] UI: Add Page: Design UI to Add or Edit record, and call API

### Region and Centers Schema:

- [ ] API: "Center" table schema (Id, Region Name, Center Name)
- [ ] API: Implement an endpoint to return list centers from table "Centers"
- [ ] UI: Add menu in navigation panel: "Region Centers"
- [ ] UI: Make an API call and display list of region centers
- [ ] UI: Apply standard sorting and searching on list view

## ====== COMPETITION EVENTS =====:

- [x] API: "CompetitionEvents", Table schema: (Id, Event Name, Event Start Date Time, Event End Date Time, Region, Centers[], IsActive)
- [x] API: Implement an endpoint to return list of data
- [x] API: Implement an endpoint to Add record
- [x] API: Implement an endpoint to Update record
- [x] UI: Menu: Add "Events" menu in navigation panel
- [x] UI: List Page: Make an API call, and display data
- [x] UI: List Page: Apply standard sorting and searching
- [x] UI: Add Page: Design UI to Add or Edit record, and call API
- Note:
  - Judge Admins will be able to create events for judging, selecting the number of centers, and forming clusters of centers for a specific event.
  - Set Event Periods: The Judge Admin can specify the start and end time for judging events.
  - During this period, only delegates from the selected centers will be allowed to participate.
  - Regional admin can only change the time, but not the date

## ====== USER ACCESS CONTROL =====:

### Users:

- [x] API: "Users" table Schema (Id, BAPS ID, FullName, Password, Region, Center, Roles[], EventIds[], Genders[], SKILL CATEGORY IDs[], Checkin, IsActive)
- [x] API: Implement an endpoint to return list of data
- [x] API: Implement an endpoint to Add record
- [x] API: Implement an endpoint to Update record
- [x] UI: Menu: Add "Users" menu in navigation panel
- [x] UI: List Page: Make an API call, and display data
- [x] UI: List Page: Apply standard sorting and searching
- [x] UI: Add Page: Design UI to Add or Edit record, and call API
- [x] UI: Add Page: Assign Events
- Note:
  - Roles are National Admin / Regional Admin / Judges
  - National Admin: Can manage regional admin AND judges of all region of ANY genders
  - Regional Admin: Can manage judges according to THEIR gender
  - Judge: Can search and grade participant of their ASSIGNED EVENTS and ASSIGNED SKILLS and ASSIGNED GENDERS only

### Role Permissions:

- [x] API: "RolePermissions" Schema (RoleName, Permissions[])
- [x] API: Implement an endpoint to return list of data
- [x] UI: Menu: Add "Roles" menu in navigation panel
- Note:
  1. Role: National Admin User:
     - CRUD Regional Admin Users
     - CRUD Events
     - View Judge Users
     - CRUD Skill Grading Questions
  2. Role: Regional Admin User:
     - CRUD Judge Users
     - View Skill Grading Questions
  3. Role: Judge User:
     - Search Participant
     - Grade Participant

### Authentication / Logic:

- [x] UI: Design Login screen
- [x] API: Implement an endpoint to authenticate user for given username/password
- [ ] API: Implement Jwt token approach
- [ ] Participant BAPS ID authentication API using encode/decode BAPS ID

### Authorization:

- [x] API: Implement an endpoint to return roles/permissions for login user
- [x] UI: Make the menu and action button available based on permissions

## ====== GRADING THE PARTICIPANTS =====:

### Display tabs according to the skills access to the judge:

- [x] API: Implement an endpoint to return list of judges skills
- [x] UI: Design UI to display tabs according to the procotr's skills

### Search Candidate by judge for BAPS ID and Skill Name:

- [x] API: Implement an endpoint to search candidate for the given BAPS ID and Skill name
  - Note: The delegate will only be shown if they have participated in the selected competition (based on the tab) and if the competition category aligns with the judge’s allowed access
- [x] UI: Design UI to Search Candidate for BAPS ID and Skill Name
  - Note: A text input field and QR scan option, like the satsang mukhpath, will appear on the screen

### Display list of skill topics to grade:

- [x] API: Implement an endpoint to return skill topics for the give skill
- [x] UI: Design UI to display list of topics for the givek skill
  - Note:
    - Once judge clicks start judging, the judge will be shown a series of question topics
    - Display topics along with weitage option to grade

### Grade candidate for list of skill topics:

- [x] DB: "Grades" table schema : MIS ID, SKILL CATEGORY ID, Grading Criteria Id, Grade, JudgeId
- [x] API: Implement an endpoint to add/update candidate for the given Skill topics and by given judge
- [x] UI: On clicking Submit button call endpoint to save candidate grades for the given Skill topics and by given judge

### View list of graded candidite for a judge:

- [x] API: Implement an endpoint to return grades for the given candidate/Skill/judge
- [x] UI: Design UI to display candidate grades for the given candidate/Skill/judge
      Note: - Allow edit option to change the grade - Once event time is over, NO ONE should be able to change the grade

### Candidate Status:

- [ ] API: Implement an endpoint to return status of candidate's each skill competition status (PENDING / COMPLETED)

  - Note: return COMPLETED if all the topic has been graded else PENDING

- TBD: at a time only x judges should be able to access or grade the candidate

## ====== SCHEDULING PARTICIPANTS =====:

- [ ] Generate schedule for given cluster file
- [ ] Save cluster schedule to database
- [ ] View Saved cluster schedule
- [ ] Export cluster schedule
- [ ] API: Get a schedule for a candidate (API can be called from mySatsangApp or Adhiveshan portal)

## ====== CHECK IN JUDGES AND PARTICIPANTS =====:

- [ ] UI: Menu: Add "Check In" menu in navigation panel
- [ ] UI: Page: Design UI to search by MIS ID or BAPS ID, and make an API call, and Display found result
- [ ] API: Implement an endpoint to search by MIS ID or BAPS ID from Participats AND Users
- [ ] UI: Provide a button to check in for the found participant or judge for the given MIS ID or BAPS ID
- [ ] API: Implement an endpoint to Check in by MIS ID or BAPS ID in Participats AND Users

## ===== REPORTS =====

- [ ] API: Check in report
- [ ] UI: Check in report
- [ ] API: Grading report
- [ ] UI: Grading report

## ====== DASHBOARD =====:

- [ ] Events View
  - In progress
  - up coming
- [ ] Skill Participants Count
- [ ] Regional wise judges count
- [ ] Checked in Judges
- [ ] Checked in Participants

## ====== EXPORT =====:

- [ ] Export Users
- [ ] Export Events
- [ ] Export Grading Criterias
- [ ] Export Grading

## ===== NICE to have =====:

- Icons for each skill
- Activity tracking

## ===== ACTIVITY TRACKING =====:

- DB: Schema (TableName, RecordId, Activity, Activity By, Activity On)
- API:
- UI:
