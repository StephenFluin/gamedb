import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyDWIXGdewsLW3967qm1yeFSzvM8NbvVqkg",
            authDomain: "gamedb-a1f85.firebaseapp.com",
            databaseURL: "https://gamedb-a1f85.firebaseio.com",
            storageBucket: "gamedb-a1f85.appspot.com",
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
