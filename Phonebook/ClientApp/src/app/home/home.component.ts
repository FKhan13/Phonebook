import {Component, OnInit} from "@angular/core";
import {ApiService} from "../services/api.service";
import {PhoneBook} from "../models/phone-book";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent  implements OnInit {
  public phonebooks: PhoneBook[];

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.GetPhoneBooks().subscribe((result) => {
      if (result) {
        this.phonebooks = result;
      }
    }, error => {
      console.error(error);
    });
  }

}
