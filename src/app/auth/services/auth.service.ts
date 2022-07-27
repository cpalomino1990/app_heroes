import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap,  } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Actividad, AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario! :Usuario;
  

  get usuario(){
    return {...this._usuario};
  }

  constructor( private http: HttpClient) { }

   login(email:string,password:string){

      const url = `${this.baseUrl}/auth`;
      const body = {email, password}

      return this.http.post<AuthResponse>(url, body)
        .pipe(
          tap(resp=>{
            if (resp.ok ){
              localStorage.setItem('token', resp.token!)
              console.log(resp.token)
              this._usuario={
                name: resp.name!,
                uid: resp.uid!,
                ultimo_logueo: resp.ultimo_logueo!!,

              }
            }
          }),
          map( resp=> resp.ok),
          catchError(err=> of(err.error.msj))
        )

  }

  registro(name:string, email:string,password:string){
    const url = `${this.baseUrl}/auth/new`;
      const body = {email, password, name}
      return this.http.post<AuthResponse>(url, body)
        .pipe(
          tap(resp=>{
            if (resp.ok ){
              localStorage.setItem('token', resp.token!)
              console.log(resp.token)
              this._usuario={
                name: resp.name!,
                uid: resp.uid!,
                ultimo_logueo: resp.ultimo_logueo!!
              }
            }
          }),
          map( resp=> resp.ok),
          catchError(err=> of(err.error.msj))
        )
  }



  validarToken():Observable<boolean>{
    const url = `${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '')

  return this.http.get<AuthResponse>(url,{headers})
    .pipe(
      map(resp => {
        //  console.log(resp.token)
        localStorage.setItem('token',resp.token!);
        this._usuario={
          name: resp.name!,
          uid: resp.uid!,
          ultimo_logueo: resp.ultimo_logueo!
        }
      
        return resp.ok;
      }),
      catchError(err => of(false))
  // )
  
    )

}


logout(){
  console.log('1')
localStorage.clear();

}
actividad(){


}

}
