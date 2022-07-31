import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from "@angular/router"

import { Topic } from 'src/app/models/topic';
import { UserService } from 'src/app/services/user.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [UserService, TopicService]
})

export class AddComponent implements OnInit {
  public pageTitle: string
  public topic: Topic 
  public identity: any
  public token: any
  public status: any

  constructor(private _route: ActivatedRoute,
    private _router: Router, 
    private _userService: UserService,
    private _topicService: TopicService) 
    { 
      this.pageTitle = "Crear nuevo tema"
      this.identity = this._userService.getIdentity()
      this.token = this._userService.getToken()
      this.topic = new Topic('', '', '', '', '', '', this.identity._id, null)
    }

  ngOnInit(): void {
    console.log(this._topicService.prueba())
  }

  onSubmit(addTopic: any){
    console.log(this.topic)
  }

}
