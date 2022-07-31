import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})

export class AppComponent implements OnInit, DoCheck {
  public title = 'foro-angular';
  public identity: any
  public token: any
  public url: string

  constructor(private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router ){
    this.url = global.url
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
  }

  ngOnInit() {
    
  }

  ngDoCheck(){
    this.identity = this._userService.getIdentity()
  }
  
  logOut(){
    localStorage.clear()
    this.identity = null
    this.token = null

    this._router.navigate(['/inicio'])
  }
}
