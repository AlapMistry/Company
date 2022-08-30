import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NotificationService } from '../_components/notification/notification.service';

import { AuthService } from '../_services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService,
        private notificationService: NotificationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authService.currentUserValue;
        if (currentUser && currentUser.role === 'admin') {
            return true;
        }

        this.notificationService.error("You don't have access.");
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
