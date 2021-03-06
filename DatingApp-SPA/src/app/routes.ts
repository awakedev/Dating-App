import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { AuthGuard } from "./_guards/auth.guard";
import { ListsComponent } from "./lists/lists.component";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { MessagesComponent } from "./messages/messages.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AuthGuard],
    children: [
      { path: "members", component: MemberListComponent, resolve: {users: MemberListResolver}},
      { path: "members/:id", component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
      { path: "member/edit", component: MemberEditComponent, resolve: {user: MemberEditResolver}},
      { path: "messages", component: MessagesComponent },
      { path: "lists", component: ListsComponent }
    ]
  },
  { path: "**", redirectTo: "", pathMatch: "full" }
];
