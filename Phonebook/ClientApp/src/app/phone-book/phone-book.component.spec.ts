import {async, ComponentFixture, TestBed} from "@angular/core/testing";

import {PhoneBookComponent} from "./phone-book.component";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {ApiService} from "../services/api.service";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Entry} from "../models/entry";

describe("PhoneBookComponent", () => {
  let component: PhoneBookComponent;
  let fixture: ComponentFixture<PhoneBookComponent>;

  let apiSpy: any;
  let snackBarSpy: any;
  const phoneBookId = 1;

  beforeEach(async(() => {
    const entries: Entry[] = [
      {
        id: 1,
        name: "Test 1",
        phoneNumber: "0123456789",
        phoneBookID: phoneBookId
      },
      {
        id: 2,
        name: "Test 2",
        phoneNumber: "0123456789",
        phoneBookID: phoneBookId
      },
      {
        id: 3,
        name: "Test 3",
        phoneNumber: "0123456789",
        phoneBookID: phoneBookId
      }
    ];

    apiSpy = jasmine.createSpyObj("ApiService", ["GetEntries", "AddEntry"]);
    apiSpy.GetEntries.and.callFake(() => {
      return of(entries);
    });
    apiSpy.AddEntry.and.callFake(() => {
      return of(null);
    });

    snackBarSpy = jasmine.createSpyObj("MatSnackBar", ["open"]);

    TestBed.configureTestingModule({
      declarations: [PhoneBookComponent],
      imports: [
        MatListModule,
        MatInputModule,
        MatExpansionModule,
        MatButtonModule,
        MatSnackBarModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [{provide: ApiService, useValue: apiSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: phoneBookId})
          }
        },
        {provide: MatSnackBar, useValue: snackBarSpy}]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();

    expect(component.phonebookid).toEqual(phoneBookId);
    expect(apiSpy.GetEntries).toHaveBeenCalledTimes(1);
    expect(component.form).toBeTruthy();
  });

  it("should search entries when text entered within search input", function () {
    expect(apiSpy.GetEntries).toHaveBeenCalledTimes(1);
    component.OnSearch("val");
    expect(apiSpy.GetEntries).toHaveBeenCalledTimes(2);
  });

  it("should create a new entry when add entry button is clicked", function () {
    const data = {
      name: "name",
      number: "0123456789"
    };

    component.OnSubmit(data);

    expect(apiSpy.AddEntry).toHaveBeenCalledWith(component.phonebookid, data.name, data.number);
  });
});
