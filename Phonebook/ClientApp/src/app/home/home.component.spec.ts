import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {HomeComponent} from "./home.component";
import {MatListModule} from "@angular/material/list";
import {ApiService} from "../services/api.service";
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {MatExpansionModule} from "@angular/material/expansion";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let apiSpy: any;

  beforeEach(async(() => {

    apiSpy = jasmine.createSpyObj("ApiService", ["GetPhoneBooks"]);
    apiSpy.GetPhoneBooks.and.callFake(() => {
      return of(null);
    });

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        MatListModule,
        RouterTestingModule,
        MatExpansionModule,
      ],
      providers: [{provide: ApiService, useValue: apiSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(apiSpy.GetPhoneBooks).toHaveBeenCalledTimes(1);
  });
});
