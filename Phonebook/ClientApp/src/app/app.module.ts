import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import {RouterModule} from "@angular/router";

import {AppComponent} from "./app.component";
import {NavMenuComponent} from "./nav-menu/nav-menu.component";
import {HomeComponent} from "./home/home.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatToolbarModule} from "@angular/material/toolbar";
import {FooterComponent} from "./footer/footer.component";
import {ApiService} from "./services/api.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import { PhoneBookComponent } from "./phone-book/phone-book.component";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FooterComponent,
    PhoneBookComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: "ng-cli-universal"}),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: "phonebook/:id", component: PhoneBookComponent, pathMatch: "full"},
      {path: "", component: HomeComponent, pathMatch: "full"},
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule,
    MatListModule,
    MatInputModule
  ],
  providers: [{provide: ApiService, useClass: ApiService}],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function getBaseUrl() {
  return document.getElementsByTagName("base")[0].href;
}
