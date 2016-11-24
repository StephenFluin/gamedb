import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { MyListComponent } from './my-list.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        MyListComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AngularFireModule.initializeApp(
            {
                apiKey: "AIzaSyDWIXGdewsLW3967qm1yeFSzvM8NbvVqkg",
                authDomain: "gamedb-a1f85.firebaseapp.com",
                databaseURL: "https://gamedb-a1f85.firebaseio.com",
                storageBucket: "gamedb-a1f85.appspot.com",
            }, 
            {
                provider: AuthProviders.Google,
                method: AuthMethods.Popup
            }
        ),
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
            { path: 'my-list', component: MyListComponent },
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
