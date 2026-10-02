import { Component, AfterViewInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Hero } from '../../components/hero/hero';
import { Promo } from '../../components/promo/promo';
import { About } from '../../components/about/about';
import { Features } from '../../components/features/features';
import { Pricing } from '../../components/pricing/pricing';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';
import { ScriptsInitService } from '../../services/scripts-init.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Navbar, Hero, Promo, About, Features, Pricing, Contact, Footer],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements AfterViewInit {
  constructor(private scriptsInit: ScriptsInitService) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scriptsInit.initAll();
    }, 200);
  }
}
