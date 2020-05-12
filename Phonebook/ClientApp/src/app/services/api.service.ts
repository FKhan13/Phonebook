import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
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
   * GetEntries
   * @param phonebookid
   * @param wildcard
   * @constructor
   */
  public GetEntries(phonebookid, wildcard): Observable<any> {
    if (!phonebookid) {
      return of(null);
    }
    const params = new HttpParams().set("phonebookid", phonebookid).set("wildCard", wildcard);
    return this.http.get(this.baseUrl + "PhoneBook/GetEntriesWithWildCard", {params: params});
  }
}
