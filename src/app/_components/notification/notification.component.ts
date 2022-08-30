import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from './notification.service';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'notification',
    templateUrl: 'notification.component.html'
})

export class NotificationComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription;
    message: any;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.subscription = this.notificationService.getNotification()
            .subscribe(message => {
                switch (message && message.type) {
                    case 'success':
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
    }
}
