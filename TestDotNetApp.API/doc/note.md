# Section 4: Client side login and register

* 在 app.module.ts 中 import FormsModule
  > import {FormsModule} from '@angular/forms';

* template form:
<form #loginForm="ngForm" class="...">
input 項目裡面 則用 [(ngModel)]="model.username" 來binding
(ngSubmit)="login()" 指定 event 跟要執行的 function 

* [] 是單向binding, 改 view model 會更新view的值 ? 
  [()] 是雙向binding?

* <pre> 可以放一些不合法的值時候的樣式

* testdotnetapp.api 執行 dotnet watch run 

* testdotnetapp-spa 執行 ng serve

# Section 5: Error Handling

* different type of error
  1. login method, code: 500
  2. register method, empty username/password, code: 400
    * error 是有格式的
  3. register method, username already exist, code: 400
    * error 只是字串
  4. 

* error.interceptor.ts 也需要是 injectable的

# Section 6: Adding 3rd part components to our app

* 安裝 [AlertifyJS](https://alertifyjs.com/)

```powershell
cd -spa
npm install alertifyjs
# npm install @types/alertifyjs
```
* create an Angular service wrapper around the methods of AlertifyJS provider, so we can inject this service to create our own componets

* 如果在 alertify.service.ts 裡面 import 有問題的話, 有去做 建立 'src/typings.d.ts' 檔, 並更新 'tsconfig.json' 加入 typeRoots

* help to manage JWT: [Angular2-JWT GitHub](https://github.com/auth0/angular2-jwt)

```powershell
cd -spa

# installation with npm
npm install @auth0/angular-jwt
```

範例程式 Usage: Standalone
```ts
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

const decodedToken = helper.decodeToken(myRawToken);
const expirationDate = helper.getTokenExpirationDate(myRawToken);
const isExpired = helper.isTokenExpired(myRawToken);
```
