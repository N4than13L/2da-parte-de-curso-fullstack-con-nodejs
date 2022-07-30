import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import {Router, ActivatedRoute, Params} from "@angular/router"
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})

export class UserEditComponent implements OnInit {
  public pageTitle: string
  public status: any
  public user: User
  public token: any
  public identity: any

  public url:any

  public afuConfig: any
  
  constructor( private _router: Router, private _route: ActivatedRoute,
    private _userService: UserService
  ) {
    this.pageTitle = "Edita tus datos aquí"
    this.user = new User("", "", "", "", "", "", "ROLE USER")
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user = this.identity
    this.url = global.url
    
    this.afuConfig = {
      multiple: false,
      formatAllowed: ".jpg, .png, .jpeg, .gif",
      maxSize: "50",
      uploadAPI: {
        url: this.url + "avatar",
        headers: {
          "Authorization": this.token
        }
      },
      theme: "attachPin",
      hideProgressBar: false,
      hideResetBtn: true,
      attachPinText: "sube tu foto"
    }
  }

  ngOnInit(): void {

  }

  onSubmit(form: any){

  }

  avatarUpload(data: any){
    let data_obj = JSON.parse(data.response.user)
    this.user.image = data_obj.body.image
    console.log(this.user)
  }

}
