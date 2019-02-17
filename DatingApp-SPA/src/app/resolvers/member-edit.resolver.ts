import { AuthService } from "./../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";
import { User } from "src/models/user";
import { MemberDetailComponent } from "../members/member-detail/member-detail.component";
import { Injectable } from "@angular/core";
import {
  Resolve,
  Router,
  ActivatedRoute,
  ActivatedRouteSnapshot
} from "@angular/router";
import { resolve } from "url";
import { observable, Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
      catchError(error => {
        this.alertify.error("Problem getting your data");
        this.router.navigate(["/members"]);
        return of(null);
      })
    );
  }
}
