import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public pageTitle: string
  public user: User
  
  constructor() {
    this.pageTitle = "Registrate aqui"
    this.user = new User("", "", "", "", "", "", "ROLE USER")
   }

  ngOnInit(): void {
  }

}
