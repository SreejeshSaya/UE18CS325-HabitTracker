import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { PublicService } from '../public.service';

@Component({
   selector: 'app-user-details-public',
   templateUrl: './user-details-public.component.html',
   styleUrls: ['./user-details-public.component.css'],
})
export class UserDetailsPublicComponent implements OnInit {
   isLoading=true;
   publicProfile;
   joinDateYear;
   bestStreak=0;
   habitScore=0;
   constructor(private publicData: PublicService,private router: Router,private route: ActivatedRoute ) {

   }

   ngOnInit(): void {
      this.route.params.pipe(
         switchMap((r)=>{
            return this.publicData.getPublicProfile(r.userId)
         })
      ).subscribe(publicProfile=>{
         console.log(publicProfile)
         this.isLoading = false
         this.publicProfile = publicProfile
         this.joinDateYear = (new Date(this.publicProfile.createdAt)).getFullYear()
         this.getStats()
      },(err)=>{
         this.isLoading = false
      })
   }
   getStats(){
      this.publicProfile.habits.forEach(h=>{
         this.habitScore+=h.maxStreak;
         this.bestStreak = Math.max(this.bestStreak,h.maxStreak)
      })
   }
}
