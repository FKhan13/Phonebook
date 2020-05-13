import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Entry} from "../models/entry";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: "app-phone-book",
  templateUrl: "./phone-book.component.html",
  styleUrls: ["./phone-book.component.css"]
})
export class PhoneBookComponent implements OnInit {
  public phonebookid: number;
  public wildcard = "";
  public entries: Entry[];

  public form: FormGroup;

  /**
   * Constructor
   * @param route
   * @param api
   * @param formbuilder
   * @param snackBar
   * @constructor
   */
  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private formbuilder: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  /**
   * Initialise component data
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.phonebookid = +params["id"];
      this.GetEntries();
    });

    this.form = this.formbuilder.group({
      name: "",
      number: ""
    });
  }

  /**
   * Get Entries
   */
  public GetEntries() {
    this.api.GetEntries(this.phonebookid, this.wildcard).subscribe(result => {
      if (result) {
        this.entries = result;
      }
    });
  }

  /**
   * Update wild card value and refresh Entries
   * @param value
   */
  public OnSearch(value: string) {
    this.wildcard = value;
    this.GetEntries();
  }

  /**
   * Add new Phone Book entry
   * @param data
   * @constructor
   */
  public OnSubmit(data: FormData) {
    this.form.reset();

    this.api.AddEntry(this.phonebookid, data.name, data.number).subscribe(result => {
      this.snackBar.open("New Contact Added", null, {
        duration: 2000,
      });
      this.GetEntries();
    }, error => {
      console.error(error);
    });
  }

}

export interface FormData {
  name: string;
  number: string;
}
