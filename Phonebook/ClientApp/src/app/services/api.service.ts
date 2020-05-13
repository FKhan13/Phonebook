import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {

  /**
   * constructor
   * @param http
   * @param baseUrl
   */
  constructor(private http: HttpClient,
              @Inject("BASE_URL") private baseUrl: string) {
  }

  /**
   * GetPhoneBooks
   */
  public GetPhoneBooks(): Observable<any> {
    return this.http.get(this.baseUrl + "PhoneBook/GetPhoneBooks");
  }

  /**
   * Get Entries for specified phone book using wildcard
   * @param phonebookid
   * @param wildcard
   * @constructor
   */
  public GetEntries(phonebookid: number, wildcard: string): Observable<any> {
    if (!phonebookid) {
      return of(null);
    }
    const params = new HttpParams().set("phonebookid", String(phonebookid)).set("wildCard", wildcard);
    return this.http.get(this.baseUrl + "PhoneBook/GetEntriesWithWildCard", {params: params});
  }


  /**
   * AddEntry for specified phone book
   * @param phonebookid
   * @param name
   * @param number
   * @constructor
   */
  public AddEntry(phonebookid: number, name: string, number: string) {
    if (!phonebookid || !name || !number) {
      return of(null);
    }

    if (typeof phonebookid === "number") {
      console.log("NUMBER");
    }

    const entry = {
      Name: name,
      PhoneNumber: number,
      PhoneBookID: phonebookid
    };

    console.log(entry);

    const headers: HttpHeaders = new HttpHeaders();
    headers.set("Content-Type", "application/json; charset=utf-8");

    return this.http.post(this.baseUrl + "PhoneBook/AddEntry", entry, {headers: headers});
  }
}
