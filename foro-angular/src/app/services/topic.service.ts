import { Injectable } from "@angular/core"
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Observable } from "rxjs"
import { global } from "./global"

@Injectable()
export class TopicService{
    public url: string

    constructor(
        private _http: HttpClient
    ){
        this.url = global.url
    }

    prueba(){
        return "Soy la polla"
    }
}