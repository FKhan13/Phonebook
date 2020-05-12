import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../services/api.service";
import {Entry} from "../models/entry";

@Component({
  selector: "app-phone-book",
  templateUrl: "./phone-book.component.html",
  styleUrls: ["./phone-book.component.css"]
})
export class PhoneBookComponent implements OnInit {
  public phonebookid: number;
  public wildcard = "";
  public entries: Entry[];

  /**
   * Constructor
   * @param route
   * @param api
   */
  constructor(private route: ActivatedRoute, private api: ApiService) {
  }

  /**
   * Initialise component data
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.phonebookid = params["id"];
      this.GetEntries();
    });
  }

  /**
   * Get Entries
   * @constructor
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

}
