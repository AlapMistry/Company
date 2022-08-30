import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public userToken: string;

  constructor(private authService: AuthService) {
    this.userToken = this.authService.currentUserValue.token;
  }

  ngOnInit(): void { }
}
