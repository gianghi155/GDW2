import { Component, Input } from '@angular/core';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() 

  userList: User[] = [];
  formUser=new FormGroup({
    id: new FormControl<number>(1),
    email: new FormControl<string>(''),
    pass: new FormControl<string>(''),
  })
  file: string = '';
  IsAdd: number = 1;
  IsUpdate: number = 0;
  
  constructor(private user: UserService) {
   
  }

  ngOnInit(): void {
    this.user.getAllUserList().subscribe((data) => {
      this.userList = data
    })
  }

  
  Add() {
    this.user.AddUser(this.formUser.value).subscribe(res => {
      this.ngOnInit()
    })
  }
  id: any;
  Edit(index: number) {
    this.id = this.userList[index].id
    this.formUser.controls['email'].setValue(this.userList[index].email)
    this.formUser.controls['pass'].setValue(this.userList[index].pass)
  }

  Update() {
    this.user.UpdateUser(this.id,this.formUser.value).subscribe(res => {
      this.ngOnInit()
    })
  }
  Delete(index: number) {
    this.id = this.userList[index].id
    this.user.DeleteUser(this.id).subscribe(res => {
      this.ngOnInit()
    })
  }
}