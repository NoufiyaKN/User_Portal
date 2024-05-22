import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminAPIService } from '../adminAPIServices/admin-api.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  @Output () onAdminChange = new EventEmitter()
  editAdminStatus:boolean = false
  adminDetails:any = {}
  adminProfile:string = 'https://us.123rf.com/450wm/antoinepham2903/antoinepham29032307/antoinepham2903230703868/214474148-cute-little-girl-with-curly-hair-vector-illustration-of-a-cartoon-character.jpg?ver=6'

  constructor(private adminAPI:AdminAPIService){}
    ngOnInit(): void {
      this.adminAPI.getadminDetails().subscribe((result:any)=>{
        this.adminDetails = result
        if(result.picture){
          this.adminProfile = result.picture
        }
    })
  }

  editAdminBtn(){
    this.editAdminStatus = true
  }

  cancel(){
    this.editAdminStatus = false
  }

  // getFile(event:any){
  //   let uploadFile = event.target.files[0]
  //   this.adminProfile = URL.createObjectURL(uploadFile)  //This approach is done by js for image upload
  //   this.adminDetails.picture = this.adminProfile
  //   console.log(this.adminDetails);
  // }

  getFile(event:any){
    let uploadFile = event.target.files[0]
    let fr = new FileReader()
    fr.readAsDataURL(uploadFile)
    fr.onload = (event:any)=>{
      this.adminProfile = event.target.result
      this.adminDetails.picture = this.adminProfile
    }
    console.log(this.adminDetails);
  }

  updateAdmin(){
    this.adminAPI.updatedAdminDetails(this.adminDetails).subscribe({
      next:(result:any)=>{
        this.editAdminStatus = false
        alert("Updated Successfully!!!")
        sessionStorage.setItem("adminDetails",JSON.stringify(result))
        this.onAdminChange.emit(result.name)
      },
      error:(reason:any)=>{
        console.log(reason);
        alert("Updation failed...Please try after sometimes!!!")
      }
    })
  }
}
