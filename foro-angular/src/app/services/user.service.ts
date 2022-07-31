import { Injectable } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { global } from "./global"
import { User } from "../models/user"

@Injectable()
export class UserService {
    public url: string
    public identity: any
    public token: any
    public user: User

    constructor(private _http: HttpClient){
        this.url = global.url
        this.user = new User("", "", "", "", "", "", "ROLE USER")
    }

    prueba(){
        return "Hola mundo desde servicio"
    }

    register(user:any): Observable<any>{
        // Convertir el objeto de usuario a un json string
        let params = JSON.stringify(user)

        // Definir las cabeceras 
        let headers = new HttpHeaders().set("Content-Type", "application/json")

        // Hacer peticion ajax
        return this._http.post(this.url + "register", params, {headers: headers})

    }

    signup(user: any, gettoken: any = null): Observable<any>{
        // Comprobar si llega el gettoken
        if (gettoken != null){
            user.getToken = gettoken
        }

        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.post(this.url + 'login', params, {headers: headers})
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity')!)
        
        if (identity && identity != null && identity != undefined && identity != "undefined"){
            this.identity = identity
          
        } else{
            this.identity = null
        }
        return this.identity
    }

    getToken(){
        let token = localStorage.getItem('token')
        
        if (token && token != null && token != undefined && token != "undefined"){
            this.token = token
        } else{
            this.token = null
        }
        return this.token
    }

    update(user: any): Observable<any>{
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", this.getToken())

        return this._http.put(this.url + "update-user", params, {headers: headers})

    }
}

