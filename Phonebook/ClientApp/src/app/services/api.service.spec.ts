import {TestBed} from "@angular/core/testing";

import {ApiService} from "./api.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {getBaseUrl} from "../app.module";

describe("ApiService", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {provide: "BASE_URL", useValue: getBaseUrl()}
    ]
  }));

  it("should be created", () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
