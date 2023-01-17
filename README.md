# Translator CORE

## Description
Backend component for the Translator project.
The BE component allows transforming the translator FE app into a full admin platform.

### Requirements
1. Users must be authenticated into the platform to make changes.
2. Different users have different abilities: editing, approval, administration
3. Editors have access only to the project language interface, where they can update the translation labels for the defined keys
4. Moderators can do what editors do + see and overview of the latest changes to the translation files and approve/reject them
5. Admins can do everything moderators do + user management

### Features
1. Proxy all storage CRUD requests from FE
2. Authentication
3. Role-Based authorization
4. Translation changes approval
5. Admin user management

## Development
1. Install dependencies
```shell
 $ pnpm i
 ```
2. Log into GCP + Generate credentials
```shell
$ gcloud auth login
$ gcloud auth application-default login
```
3. Run dev server
```shell
$ npm run start:dev
```

## Roadmap
1. Moderator users can approve/reject changes (ongoing)
2. User management admin interface
3. Integrate JSON utility features (i.e. sorting)