import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { SignupComponent } from './signup/signup.component';
import {PendingComponent} from './pending/pending.component'
import { AddHabitComponent } from './add-habit/add-habit.component';
import { HabitManageComponent } from './habit/habit-manage/habit-manage.component';
import {UserDetailsComponent }from './user-details/user-details.component'
import {EditProfileComponent} from './edit-profile/edit-profile.component'
import { UserDetailsPublicComponent } from './user-details-public/user-details-public.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { StatisticsComponent } from './statistics/statistics.component';

const routes: Routes = [
   {path:"",component:PendingComponent,pathMatch:"full"},
   {path:'login',component:LoginComponent},
   {path:'signup',component:SignupComponent},
   {path:'habits/:habitId',component:HabitManageComponent},
   {path:'profile',component:UserDetailsComponent},
   {path:'edit-profile',component:EditProfileComponent},
   {path: 'users/:userId',component:UserDetailsPublicComponent},
   {path: 'leaderboard',component:LeaderboardComponent},
   {path: 'statistics',component:StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
