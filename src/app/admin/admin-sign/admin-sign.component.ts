import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/authService';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-sign',
  templateUrl: './admin-sign.component.html',
  styleUrls: ['./admin-sign.component.css']
})
export class AdminSignComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.verifyAdmin();
  }

  verifyAdmin() {
    this.authService.verify().subscribe(res =>{
        var object = res.json();
        if (object.isAdmin || object.isModerator ){
        this.router.navigate(['admin']);
        }
        else {
        this.router.navigate(['login']);

        }
    });
  }


  sign(enter_login, enter_password) {
      this.authService.sign({login: enter_login, password: enter_password}).subscribe( res =>{
            var object = res.json();
            if (object.isAdmin || object.isModerator) {
              Swal.fire(
                'Good job!',
                'You clicked the button!',
                'success'
              )
        localStorage.setItem('token', object.token);
        this.router.navigate(['admin']);
            }
            else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'login yoki parol xato!',
                timer: 3000
              })
            }
      })
  }


}
