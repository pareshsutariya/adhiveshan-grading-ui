======== Install/Upgrade NPM ======
https://medium.com/@jeroenouw/upgrade-to-angular-6-4520e46c682b
rmdir /Q /S "folder with spaces in the name"
npm uninstall -g @angular/cli
npm install -g @angular/cli
npm install -g @angular/cli@9.0.2
npm install -g @angular/cli@16.2.10

npm cache clean --force
npm cache verify

ng update @angular/cli --force
npm install @angular/animations@latest @angular/common@latest @angular/compiler@latest @angular/core@latest @angular/forms@latest @angular/http@latest @angular/platform-browser@latest @angular/platform-browser-dynamic@latest @angular/platform-server@latest @angular/router@latest --save
npm install @angular-devkit/build-angular@latest @angular/compiler-cli@latest @angular/language-service --save-dev
npm install core-js@latest zone.js@latest --save
npm install @types/jasmine@latest @types/node@latest codelyzer@latest karma@latest karma-chrome-launcher@latest karma-cli@latest karma-jasmine@latest karma-jasmine-html-reporter@latest jasmine-core@latest jasmine-spec-reporter@latest protractor@latest tslint@latest --save-dev
npm install typescript@2.7.2 --save-dev
npm install rxjs@latest rxjs-compat@latest --save
npm install rxjs-tslint@latest --save-dev
rxjs-5-to-6-migrate -p src/tsconfig.app.json
npm install webpack@latest --save-dev

======== Node ===============
node -v
nvm ls
nvm use 10.13.0
nvm install 20.18.0
nvm use 20.18.0

npm cache clean --force  
npm cache verify

======== Build and Run ======
ng version
ng serve
ng build
ng build --configuration production
ng build --prod --aot
ng build --prod --output-hashing none
ng build --prod --output-hashing none --extract-css=false

======== Kill the port =======
netstat -vanp tcp | grep 4200
kill -9 523

---

## pkill -9 ng

sudo lsof -t -i tcp:4200 | xargs kill -9
======== ======== =======
