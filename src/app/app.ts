import { Component, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScriptsInitService } from './services/scripts-init.service';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  constructor(private scriptsInit: ScriptsInitService) { }

  ngAfterViewInit(): void {
    // Initialise les plugins jQuery APRÈS que Angular ait rendu le DOM
    setTimeout(() => {
      this.scriptsInit.initAll();
    }, 100);
  }
}
