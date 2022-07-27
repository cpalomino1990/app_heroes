

export interface AuthResponse{
    ok:    boolean;
    uid?:  string;
    name?: string;
    token?:string;
    msg?:  string;
    ultimo_logueo?: string;

}

export interface Usuario{
    uid: string;
    name: string;
    ultimo_logueo:string;
    
}

export interface Actividad{
   
}