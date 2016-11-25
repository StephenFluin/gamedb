import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
    template: `
        <div class="card-list">
            <md-card *ngFor="let game of gameList | async">
                <md-card-header>{{game.name}}</md-card-header>
                <md-card-content>
                    <div *ngIf="game.peakYear">{{game.peakYear}}</div>
                    <div *ngIf="game.hours">{{game.hours}}h estimated</div>
                </md-card-content>
                <md-card-actions>
                    <button md-raised-button (click)="edit(game)">Edit</button>
                    <button md-raised-button (click)="delete(game)">x</button>
                </md-card-actions>

            </md-card>
        </div>
        <div *ngIf="(gameList | async) === null">Loading games...</div>
        <div *ngIf="(gameList | async) && (gameList | async).length == 0">You have no games in your db yet.</div>

        <form #newGame="ngForm" (submit)="create(newGame)">
            <input type="hidden" name="$key" [ngModel]="gameEdit.$key">
            <md-input name="name" [ngModel]="gameEdit.name" placeholder="Game Name"></md-input>
            <md-input name="peakYear" [ngModel]="gameEdit.peakYear" placeholder="Peak Year" type="number"></md-input>
            <md-input name="hours" [ngModel]="gameEdit.hours" placeholder="Estimated Hours" type="number"></md-input>
            <button md-raised-button color="primary" type="submit">Create</button>
        </form>
    `,
})
export class MyListComponent {
    gameList: FirebaseListObservable<any[]>;
    gameEdit = {name: null, peakYear: null, hours: null, $key: null};

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
    create(newGame: FormGroup) {
        event.preventDefault();
        if(newGame.value.$key) {
            let key = newGame.value.$key;
            delete newGame.value.$key;
            this.gameList.update(key, newGame.value);
        } else {
            delete newGame.value.$key;
            let result = this.gameList.push(newGame.value);
        }
        newGame.reset();
        this.gameEdit = {name: null, peakYear: null, hours: null, $key: null};
    }
    delete(game) {
        this.gameList.remove(game);
    }
    edit(game) {
        this.gameEdit = game;
    }
}