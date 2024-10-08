import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent {

  error:any;

  constructor( private route:Router) {
    const naveigration = this.route.getCurrentNavigation();
    this.error = naveigration && naveigration.extras && naveigration.extras.state && naveigration.extras.state['error'];
  }
}
