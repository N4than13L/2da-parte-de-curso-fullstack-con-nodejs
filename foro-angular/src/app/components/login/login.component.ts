import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  public pageTitle: string
  public user: User
  public status: any
  public identity: any
  public token: any

  constructor(private _userService: UserService) {
    this.pageTitle = "Registrate aquí"
    this.user = new User("", "", "", "", "", "", "ROLE USER")
   }

  ngOnInit(): void {

  }

  onSubmit(form:any){
    // Conseguir objeto de objeto de usuario
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.user && response.user._id){
          
          // Guardamos el usuario en una propiedad.
          this.identity = response.user

          // Consgeuir el token de usuaio 
          this._userService.signup(this.user, true).subscribe(
            response => {
              if (response.token){  
                console.log(response)
              }else{  
                this.status = "error"
              }
            },
            error => {
              this.status = "error"
              console.log(<any>error)
            })

        }else{  
          this.status = "error"
        }
      },
      error => {
        this.status = "error"
        console.log(<any>error)
      })
  }

}
