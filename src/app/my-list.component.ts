import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
    template: `
        <div *ngFor="let game of gameList | async">{{game.name}}</div>
        <div *ngIf="(gameList | async) === null">Loading games...</div>
        <div *ngIf="(gameList | async) && (gameList | async).length == 0">You have no games in your db yet.</div>

        <form #newGame="ngForm" (submit)="create(newGame.value)">
            <input name="name" ngModel>
            <button md-raised-button color="primary" type="submit">Create</button>
        </form>
    `,
})
export class MyListComponent {
    gameList: FirebaseListObservable<any[]>;
    newGame : FormGroup;
    constructor(public af: AngularFire, router: Router) {
        af.auth.subscribe(authState => {
            if (!authState) {
                router.navigate(['/']);
            }
        });
        af.auth.subscribe(authState => {
            if(authState && authState.google) {
                let uid = authState.google.uid;
                this.gameList = af.database.list(`/users/${uid}/games/`);
            }
        });
    }
    create(newGame) {
        event.preventDefault();
        let result = this.gameList.push(newGame);
    }
}