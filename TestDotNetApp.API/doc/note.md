# Section 2: Building a Walking Skeleton

* code . 
* dotnet watch run 
* Show all commands: Ctrl+Shift+P
* nuget add package 
* Microsoft.EntityFrameworkCore 3.0.0
* Microsoft.EntityFrameworkCore.Sqlite 3.0.0
* dotnet tool install --global dotnet-ef --version 3.0.0
* dotnet ef migrations -h
* dotnet ef migrations add InitialCreate
* 要再安裝 Microsoft.EntityFrameworkCore.Design 3.0.0
* dotnet ef database update // update the migrations
* Go to file: Ctrl + P
* test URL: http://localhost:5000/api/values 
* asynchronous 

## Angular 

> Angular CLI (\AppData\Roaming\npm\node_modules\@angular\cli\bin\ng)
  npm install -g @angular/cli 
  ng new my-dream-app (ng new TestDotNetApp-SPA)(can not use '.')
  cd my-dream-app
  ng serve

> -SPA/src/app/app.module.ts

> -SPA/src/app/app.component.ts 用 @Component 來decorate (is class, but also has Angular features?)

> extensions for Angular projects
  Angular Snippets
  Angular Files
  Angular Language Service
  Auto Rename Tag
  Bracket Pair Colorizer
  Debugger for Chrome
  Material Icon Theme
  Prettier
  TSLint
  Angular2-switcher
> Alt + O 從 value.component.ts 移到 value.component.html
  Alt + I 移到 value.component.css
  Alt + U 移到 value.component.ts
> Go to file: Ctrl + P (again)
> -SPA and .API 兩個都要執行

> BootStrap
  cd testdotnetapp-spa
  npm install bootstrap font-awesome


# Section 3: Security

Hashing a password, password -> SHA512 -> #$@#$#@ (not secure)
Hashing and Salting a password, password -> Hash+Salt -> #$#$#!@#!@
 
model and datacontext changed  

```powershell
dotnet ef migrations add AddedUserEntity # create new migration
  # go to migrations folder to see create result 
dotnet ef database update // update the migrations
```

*  debug 要先產生 launch.json, 按debug後 選擇 TestDotnetApp.API.exe

*  http://localhost:5000/api/auth/register Postman中, Body 選擇 raw & JSON 
  輸入參數
  {
	"username": "",
	"password": ""
  }

  public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
  沒有用 [ApiController] 的話 要用 if(!ModelState.IsValid) return BadRequest(ModelState) 處理
  並參數搭配 [FromBody] attribute: 
  
*  Token Authentication 
  JSON Web Tokens (JWTs) 
  self-contained and can contain: credentials, claims, other information
  不用再去data store 驗證一次user, 直接用token驗證 看是否能用 api

* 安裝 Microsoft.IdentityModel.Tokens 5.6.0
       System.IdentityModel.Tokens.Jwt 5.6.0

* injection IConfiguration 
  使用 _config.GetSection("AppSettings:Token").Value
  要在 appsettings.json 新增 "AppSettings" :{"Token": "super secret key"}

* JWT.io 可以觀看 tokens decoded的內容

* 安裝 Microsoft.AspNetCore.Authentication.JwtBearer 3.0.0
* Authentication Middleware, 在Startup.cs裡面 要設定一些東西
  還有controller 要加 attribute

* appsettings.json 不要上傳到github比較好
  git rm appsettings.json --cached

* on production: using environment variables
  或是使用 dotnet user-secrets (only for development?)
  設定語法: dotnet user-secrets set "AppSettings:Tokens" "super secret key"
  觀看語法: dotnet user-secrets list


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
dotnet ef database update # apply migration

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

* [json generator](json_generator_carmodel.txt) and [seeding data example](carmodelseeding.json)

* 課程建立 \Data\IDatingRepository 和 DatingRepository (改叫做IMatchingRepository, MatchingRepository)

* 要安裝 package Microsoft.AspNetCore.Mvc.NewtonsoftJson

* 課程建立 \Controllers\UsersController (改叫做CarModelsController)

* 在postman試API: GET http://localhost:5000/api/carmodels, 會有 JsonSerializationExcaption 因為 CarModel -> Photo -> CarModel, self reference loop, 用以下方式解決

```csharp
// 原本是這樣
services.AddControllers().AddNewtonsoftJson(); 

// 改成這樣
services.AddControllers().AddNewtonsoftJson( opt => {
    opt.SerializerSettings.ReferenceLoopHandling = 
    Newtonsoft.Json.ReferenceLoopHandling.Ignore;
}); 
```

## Section 77. Shaping the data to return with DTOs

* 建立Dto類別: UserForListDto(CarModel), UserForDetailedDto(CarModel), 避免傳入太多資料, 或傳入不需要的資料

## Section 78. Using AutoMapper Part 1

* ctrl+shift+p, Add Package 安裝 AutoMapper.Extension.Microsoft.DependencyInjection 7.0.0

* tell service container about automapper, 在 Startup.cs 的 ConfigureServices function 中加入

```csharp
services.AddAutoMapper(typeof(MatchingRepository).Assembly);
```

* 修改 CarModelsController 中 回傳的物件, 變成 Dto class的物件

* 還要告訴mapper 要如何對應 Dto 類別 跟 Model 類別, 建立一個 Helpers\AutoMapperProfiles 類別

## Section 79. Using AutoMapper Part 2

* mapper 裡面可以再設定各 member 要如何對應(轉換)
```csharp
CreateMap<CarModel, CarModelForListDto>()
    .ForMember(dest => dest.PhotoUrl, opt => 
      opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
```
    
# Section 9: Building a great looking User Interface

## Section 82. Introduction to Interfaces in Typescript

```typescript
// OK
let name = "daffy"
name = 10

// OK 
let name: any = "daffy"
name = 10

// compile failed
let name: string = "daffy"
name = 10

interface Duck{
  name: string
  hasWings: boolean
}

// both properties are needed 
let daffy:Duck
daffy = {
  name: 'Daffy'
  hasWings: true
}

// 如果要property 是 optional, 那就要在宣告加 '?' 符號
// 例如 hasWings?: boolean 
```

* An interface is only used by TypeScript at __compile itme__, and is then removed. Interfaces 不會出現在最後的 JavaScript 輸出。

* Interfaces 優點:
  * Compile time checking
  * Intellisense
  * Auto Completion

## Section 83. Adding Interfaces to our Typescript code

* optional 的 property要擺在 必要的property後面

## Section 84. Creating another Angular service

* 再建一個service 用來取得 carmodel (user)

* environment.ts 檔案 設定 base url, 之前 AuthService 是在 class 裡面自己設定

```typescript
// carmodel.service.ts 用下列方式來設定 baseurl
baseUrl = environment.apiurl;
```

* production的時候可以用另外一個 environment.prod.ts 來設定 url

* 在 carmodel.service 內 建立一個 httpOption 裡面包含 token 用來傳入 get function 

## Section 85. Retrieving the Members into the Member List Component 

* MemberListComponent 即是 CarListComponent

* 在 component 中使用 service 來取得資料, 並在 html 中列出來

## Section 86. Creating Member Cards to display on our Member list page

* 建立資料夾 members (即carmodels), 把 car-list componet 放進去, 然後要refactor 引入路徑

* 建立 CarCardComponent 也放在 carmodels 資料夾中

* 用 bootstrap 的 [card](https://getbootstrap.com/docs/4.4/components/card/) component

* 在 car-list component 中 "[carmodel]" 當成 input property

## Section 87. Giving our Members some style with CSS

* car-card.component.css 中 加入針對 image的動畫效果

## Section 88. Adding animated buttons to the member cards

* ul.list-inline.member-icons.animate.text-center
* unorder list, inline list, 按鈕會出現在每行水平
* member-icons: class for ability to style 
* animate: class for apply animation styles to button
* text-center: buttons are centrally aligned inside each member card

## Section 89. Using Auth0 jwtModule to send up jwt tokens automatically

* https://github.com/auth0/angular2-jwt, 看 Usage: Injection 章節

* This library provides an HttpInterceptor which automatically attaches a JSON Web Token to HttpClient requests.

* 不只有 login, 幾乎所有的http request 都應該要有 jwt token

* 在 app.module.ts 中加入JwtModule 控制白名單跟黑名單

## Section 90. Creating the Member Detailed View component class

* 建立 car-detail component 

* 在 route.ts 中 增加 網址路徑 規則: { path: 'cars/:id', component: CarDetailComponent}

* 在 car-card component 中, 要設定button 連去 car-detail component: [routerLink]="['/car/', carmodel.id]"

## Section 91. Designing the Member detailed view template - left hand side

* put more componet to car-detail component 

## Section 92. Adding a tabbed panel for the right hand side of the Member detailed page

* 用 ngx-bootstrap 的 TabModule, 在 app.module.ts 中 加入 imports

* import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';

## Section 93. Using Route Resolver to retrieve data

* to avoid using safe navigation operator "?" in side our member

* 新建立 _resolvers 資料夾 跟 car-detail.resolver.ts 檔案

* 找不到 carmodel(user) 的話, 導回 /cars (/members)

* 在 app.module.ts 中的 providers 中, 加入 car-detail resolver
          
* route.ts 檔案中也要加  { path: 'cars/:id', component: CarDetailComponent, __resolve: {carmodel: CarDetailResolver}}__

* car-detail component ts 檔中, 變成不是呼叫 this.loadCarmodel() 來取得物件. 變成用 this.carmodel = data['carmodel'] 來取得, 其中 'carmodel' 這個字串是在 route.ts 中 上一項定義的

* 在 html 檔案中, 就可以把 "?" operator 拿掉

* 在建立另外一個 car-list.resolver.ts

* 找不到carmodel 還是沒導回@@

## Section 94. Adding a photo gallery to our application

* 用 [ngx-gallery](https://www.npmjs.com/package/ngx-gallery), npm install ngx-gallery --save

* npm audit fix

* 只用後會有問題, 還要另外在 app.module.ts 中 加CustomHammerConfig, 這是別人提供的解法

# Section 10: Updating Resources

## Section 96. Introduction

* nothing 

## Section 97. Creating a Member Edit Component

* 建一個新的 car-edit component (member-edit component), 在 app.module.ts declarations 要加入

* routes.ts 中, 原本課程是 {path: 'member/edit', component: MemberEditComponent}, 因為只能編輯自己的資料

* 可能改成 member/edit/id 這邊開始會差異比較多

* { path: 'cars/edit/:id', component: CarEditComponent},

* 課程中要再用一個resolver 來取得目前登入的 user, 才能決定要edit 哪個user的資料, 先照樣建立一個 car-edit resolver

* 在 routes.ts 裡面 { path: 'cars/edit/:id', component: CarEditComponent, resolve: {carmodel: CarEditResolver}},

## Section 98. Designing the template for the member profile edit page - part 1

## Section 99. Designing the Member Edit Template - part 2

* @ViewChild('editForm', {static: true}) editForm: NgForm;
* 用ViewChild 可以取得 html 中的元件 

## Section 100. Adding a CanDeactive route guard

* 增加 guard 避免使用者未儲存就跳離開網頁: PreventUnsavedChanges

* 但是用 這個還有問題是, 從瀏覽器 "關閉" 分頁無法得知, 所以還要另外加 listener

* HostListener: 就是瀏覽器, 接收event 來處理 關閉分頁的情況

## Section 101. Persisting the Member updates

* 建立一個新的 UpdateDto 類別

* 在 CarModelsController 增加一個 UpdateCarModel function 是 'HttpPut'

* 實務上還要注意 哪些是 要放在 UpdateDto裡面的, 如果 Dto 的 property有, 但是 postman 那邊沒有的話, 好像會給預設值

## Section 102. Finishing off the Member edit component

* 在 car-model service (user-service) 中, 建立 update 的 function 連結 API, updateCarModel

* car-edit component 中, 修改 updateCarmodel function

# Section 11: Adding Photo upload functionality to the application

## Section 105. Where should we store the photos?

* DB: least efficitent place to store objects such as photographs

* File System

* Cloud provider

* Use Cloudinary


## Section 106. Using Cloudinary as a photo storage solution

## Section 107. Creating the Photos Controller Part 1

## Section 108. Creating the Photos Controller Part 2

## Section 109. Testing the Photo upload with Postman

## Section 110. Creating the Photo upload component in Angular

## Section 111. Adding a 3rd Party File Uploader

## Section 112. Configuring the 3rd Party File Uploader

## Section 113. Adding the Set Main photo functionality to the API

## Section 114. Adding the Set Main photo functionality to the SPA

## Section 115. Using the array filter method to provide instant feedback in the SPA
