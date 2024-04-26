import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

var opt = { headers: new HttpHeaders({ "content-type": "application/json" }) }

export abstract class GlobalService<T> {

    protected readonly url = `${environment.url}`;
    constructor(
        protected http: HttpClient, path: String
    ) {
        this.url = `${this.url}/${path}`;
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(this.url);
    }
    getById(id: Number): Observable<T> {
        return this.http.get<T>(`${this.url}/${id}`)
    }
    create(resource: T): Observable<T> {
        console.log(resource);
        
        return this.http.post<T>(`${this.url}`, resource, opt)
    }
    update(resource: T, id: Number): Observable<T> {
        return this.http.put<T>(`${this.url}/${id}`, resource, opt);
    }
    remove(id: Number): Observable<T> {
        return this.http.delete<T>(`${this.url}/${id}`, opt);
    }
}