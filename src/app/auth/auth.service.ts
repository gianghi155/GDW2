import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router
import { LoginForm, RegisterForm, User } from './auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isloading: boolean = false;
  private baseURL = `http://localhost:3000/User`;

  protected userList: User[] = []
  constructor(private router: Router, private http: HttpClient) {
    this.getAllUserList().subscribe((res: any) => {
      this.userList = res
    })
  }

  getAllUserList(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}`)
  }

  login(form: LoginForm) {

    for (let user of this.userList) {
      if (form.email == user.email && form.password == user.pass) {
        this.isAuthenticated = true;
        this.router.navigate(['']);
        return;
      }
    }
    alert('Login not success');
    this.isAuthenticated = false;
  }

  AutoId() {
    if (this.userList.length > 0)
      return this.userList[this.userList.length - 1].id + 1;
    else
      return 1;
  }

  register(form: RegisterForm) {
    if (form.password != form.confirm_password) {
      return;
    }
    else {
      let temp: User = {
        id: this.AutoId(),
        email: form.email,
        pass: form.password
      }

      this.http.post<User[]>(`${this.baseURL}`, temp).subscribe(
        (response) => {
          // Handle the response if needed
          console.log('User created successfully:', response);
          this.refreshData();
          this.router.navigate(['login']);
          alert('User created successfully')
        },
        (error) => {
          // Handle errors
          console.error('Error creating user:', error);
        }
      );
    }
    console.log(this.userList);
  }

  logout() {
    confirm('Do you want exit?')
    this.router.navigate(['login']);
    this.isAuthenticated = false;
  }

  refreshData() {
    this.getAllUserList().subscribe((res: any) => {
      this.userList = res
    })
  }
}
