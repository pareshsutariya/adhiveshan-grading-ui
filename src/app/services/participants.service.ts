import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { Constants } from "./_constants";
import { Participant, ParticipantUpdateHostCenter } from "../models/_index";

@Injectable({providedIn: 'root'})
export class ParticipantsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<Array<Participant>> {
    return this.http.get<Array<Participant>>(Constants.WebApiBaseUrl + "/Participants");
  }

  GetByMisId(misId: number): Observable<Participant> {
    return this.http.get<Participant>(Constants.WebApiBaseUrl + `/Participants/getByMisId/${misId}`);
  }

  GetParticipantForJudging(bapsId: string, loginUserId: number) {
    return this.http.get(Constants.WebApiBaseUrl + `/Participants/GetParticipantForJudging/${bapsId}/${loginUserId}`, {responseType: 'text'})
    .pipe(
      catchError((error: any) => {

        throw error;

        //console.log(error);

        if (error.error instanceof ErrorEvent) {
          // Client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // Backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`
          );
          // Access the response body here
          console.log(error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
          'Something bad happened; please try again later.'
        );
      })
    )
  }

  UpdateHostCenter(item: ParticipantUpdateHostCenter) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
      .post(Constants.WebApiBaseUrl + "/Participants/UpdateHostCenter", JSON.stringify(item), { headers: headers })
      .pipe();
  }

  Import(items: Participant[]) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    console.log(items);

    return this.http
      .post(Constants.WebApiBaseUrl + "/Participants/import", JSON.stringify(items), { headers: headers })
      .pipe();
  }
}
