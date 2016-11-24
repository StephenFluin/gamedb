import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Component({
    template: `
    <p>Get started by logging in:</p>
    <button md-raised-button color="primary" (click)="af.auth.login()">Login</button>
    `,
})
export class LoginComponent {
    constructor(public af: AngularFire, router: Router) {
        af.auth.subscribe(authState => {
            if(authState) {
                router.navigate(['/my-list']);
            }
        });
    }

}