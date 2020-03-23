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

## 安裝 [AlertifyJS](https://alertifyjs.com/)

```powershell
cd -spa
npm install alertifyjs
# npm install @types/alertifyjs
```
* create an Angular service wrapper around the methods of AlertifyJS provider, so we can inject this service to create our own componets

* 如果在 alertify.service.ts 裡面 import 有問題的話, 有去做 建立 'src/typings.d.ts' 檔, 並更新 'tsconfig.json' 加入 typeRoots

## Agular2-JWT

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

## ngx-bootstrap

* ngx bootstrap by Valor Software, to improve Dropdown
```powershell
cd -spa

# installation with npm
npm install ngx-bootstrap --save
```

## bootswatch

```powershell
cd -spa

# installation with npm, to use free themes
npm install bootswatch
```

# Section 7: Routing in Angular 

* Traditional websites vs. Single Page Application 

http://localhost/index.html 
http://localhost/foo.html

http://localhost
http://localhost/foo

* in order to achieve this, we need to tell our application about how to find the different pars of our application

* member-list -> car-list

* 在 componet.html 裡面 輸入 a-routerlink 快速填寫

* guard, 產生 auth.guard.ts 檔案
```powershell
cd -spa

cd src/app/_guards/

ng g guard auth --skipTests
```

# Section 8: Extending the API

* 另外建一個 CarModel class, 原本是在User內做擴充

* DataContext class 加入兩個新的 DbSet, CarModels 和 Photos

```powershell
dotnet ef migrations add NewCarModelClass
```

```powershell
dotnet ef --help
dotnet ef migrations -h
dotnet ef migraitons list
```

* 打開 DB Browser, 有個table叫做 _EFMigrationsHistory, 可以知道有哪些migration已經影響db了

```powershell
# 因為 先前建立的 migrations 中
# Photo的 onDelete: ReferentialAction.Restrict 我們不想要
dotnet ef migraitons remove # 移除最後一個migration

# recover
dotnet ef migrations add NewCarModelClass
dotnet ef database update # reply migration

# 如果這時候執行 migration remove 會跳出 error, 因為已經apply到db
dotnet ef migrations remove 

# 所以要go back early migrations
dotnet ef database update AddedUserEntity # update 前一個 migrations的名稱, 但是會失敗, 因為有一些 limitations, 要去看網站, 有些沒支援

# 正確方式: drop/remove last migrations, recreate by update
dotnet ef database drop # 會清空...
dotnet ef migrations remove 
dotnet ef database update # recreate database

# 那要如何保存資料?

```

* 修改 CarModel(User) 跟 Photo 的 relationship 再建立一次 migrations.
在Photo中 加入 CarModel 和 CarModelId properties, 當User砍掉的時候, 相對應的Photo 也會砍掉 Cascade(變成 onDelete: ReferentialAction.Cascade)


