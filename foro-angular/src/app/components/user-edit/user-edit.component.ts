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
      replaceTexts: {
        selectFileBtn: 'Select Files',
        resetBtn: 'Reset',
        uploadBtn: 'Upload',
        dragNDropBox: 'Drag N Drop',
        attachPinBtn: 'Sube tu foto aquí',
        afterUploadMsg_success: 'Successfully Uploaded !',
        afterUploadMsg_error: 'Upload Failed !',
        sizeLimit: 'Size Limit'
      }
  
    }
  }

  ngOnInit(): void {

  }

  onSubmit(form: any){
    this._userService.update(this.user).subscribe(
      response => {
        if (!response.user){
          this.status = "error"
        }else{
          this.status = "success"
          localStorage.setItem('identity', JSON.stringify(this.user))

        }
      }, 
      error =>{
        this.status = "error"
        console.log(error)
      }
    )
  }

  avatarUpload(data: any){
    let file = data.body.user.image
    this.user.image = file
    console.log(this.user)
  
  }

}
