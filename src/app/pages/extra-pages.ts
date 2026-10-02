import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Navbar } from '../components/navbar/navbar';
import { Footer } from '../components/footer/footer';
import { Contact } from '../components/contact/contact';

@Component({
  selector: 'app-generic-page',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  template: `
<app-navbar></app-navbar>
<div class="main">
  <section class="ptb-100 to7-hero-bg text-white" style="padding-top: 150px;">
    <div class="container">
      <div class="row text-center justify-content-center">
        <div class="col-md-8">
          <h1 class="text-white fw-bold">{{ title }}</h1>
        </div>
      </div>
    </div>
  </section>
  <section class="ptb-100">
    <div class="container">
      <div class="row py-5">
        <div class="col-12 text-center">
          <p class="lead">Le contenu de la page <strong>{{ title }}</strong> sera détaillé lors de l'intégration finale. Structure en place (TO7 e-SIM).</p>
        </div>
      </div>
    </div>
  </section>
</div>
<app-footer></app-footer>
  `
})
export class GenericPage implements OnInit {
  title: string = '';
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.title = data['title'] || 'Page en construction';
    });
  }
}

@Component({
  selector: 'app-offres-page',
  standalone: true,
  imports: [Navbar, Footer, CommonModule, FormsModule],
  template: `
<app-navbar></app-navbar>
<div class="main">
  <section class="ptb-100 to7-hero-bg text-white" style="padding-top: 150px;">
    <div class="container text-center">
      <h1 class="text-white fw-bold mb-3">Nos offres eSIM</h1>
      <p class="lead">Choisissez le forfait adapté à votre destination et à vos besoins.</p>
    </div>
  </section>

  <section class="ptb-100 gray-light-bg">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-md-8">
          <div class="search-wrap text-center">
            <input type="text" [(ngModel)]="searchTerm" class="form-control form-control-lg border-0 shadow-sm" placeholder="Rechercher une destination...">
          </div>
          <div class="d-flex justify-content-center mt-3 gap-3 flex-wrap">
            <span class="badge bg-white text-dark border p-2">Destination ▼</span>
            <span class="badge bg-white text-dark border p-2">Quantité de données ▼</span>
            <span class="badge bg-white text-dark border p-2">Durée ▼</span>
            <span class="badge bg-white text-dark border p-2">Prix ▼</span>
          </div>
        </div>
      </div>

      <div class="row">
        <!-- Dynamic Data Cards -->
        <div class="col-md-4 mb-4" *ngFor="let offre of filteredOffres()">
          <div class="card border-0 shadow-sm rounded h-100 transition-hover outline-hover">
            <div class="card-body text-center p-4">
              <h4 class="mb-3">{{ offre.emoji }} {{ offre.country }}</h4>
              <p class="text-muted mb-2">Quantité : <strong>{{ offre.data }}</strong></p>
              <p class="text-muted mb-2">Durée : <strong>{{ offre.duration }}</strong></p>
              <h3 class="color-secondary my-3">{{ offre.price }} €</h3>
              <button class="btn solid-btn w-100">Choisir ce forfait</button>
            </div>
          </div>
        </div>
        
        <!-- No results -->
        <div class="col-12 text-center py-4" *ngIf="filteredOffres().length === 0">
            <p class="lead text-muted">Aucune offre trouvée pour "<strong>{{ termsRecherche() }}</strong>".</p>
        </div>
      </div>
    </div>
  </section>

  <section class="ptb-100">
    <div class="container text-center">
      <h2 class="mb-5">Pourquoi choisir une eSIM TO7 ?</h2>
      <div class="row">
        <div class="col-md-3 mb-4">
          <div class="icon-box p-3">
            <span class="ti-bolt text-danger h1 block mb-3"></span>
            <h5>Activation instantanée</h5>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <div class="icon-box p-3">
            <span class="ti-mobile text-danger h1 block mb-3"></span>
            <h5>100% numérique</h5>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <div class="icon-box p-3">
            <span class="ti-world text-danger h1 block mb-3"></span>
            <h5>Couverture internationale</h5>
          </div>
        </div>
        <div class="col-md-3 mb-4">
          <div class="icon-box p-3">
             <span class="ti-settings text-danger h1 block mb-3"></span>
            <h5>Gestion simple</h5>
          </div>
        </div>
      </div>
      <button class="btn solid-btn btn-lg mt-4 px-5">Trouver mon forfait</button>
      
      <div class="mt-5 payment-methods">
          <p class="text-muted mb-2">Paiement sécurisé</p>
          <div class="d-flex justify-content-center gap-3">
             <span class="badge bg-light text-dark border p-2">Apple Pay</span>
             <span class="badge bg-light text-dark border p-2">Google Pay</span>
             <span class="badge bg-light text-dark border p-2">Carte Bancaire</span>
          </div>
      </div>
    </div>
  </section>
</div>
<app-footer></app-footer>
  `
})
export class OffresPage {
  searchTerm: string = '';

  offres = [
    { country: 'Europe', emoji: '🌍', data: '5 Go', duration: '30 Jours', price: 15 },
    { country: 'États-Unis', emoji: '🇺🇸', data: '10 Go', duration: '30 Jours', price: 22 },
    { country: 'Japon', emoji: '🇯🇵', data: '3 Go', duration: '15 Jours', price: 10 },
    { country: 'Turquie', emoji: '🇹🇷', data: '5 Go', duration: '15 Jours', price: 12 },
    { country: 'Suisse', emoji: '🇨🇭', data: '2 Go', duration: '7 Jours', price: 6 },
    { country: 'Royaume-Uni', emoji: '🇬🇧', data: '10 Go', duration: '30 Jours', price: 18 },
    { type: 'Monde', country: 'Monde (Global)', emoji: '🌐', data: '20 Go', duration: '30 Jours', price: 40 }
  ];

  filteredOffres() {
    if (!this.searchTerm.trim()) return this.offres;
    return this.offres.filter(o => o.country.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  termsRecherche() {
    return this.searchTerm;
  }
}

@Component({
  selector: 'app-destinations-page',
  standalone: true,
  imports: [Navbar, Footer, CommonModule, FormsModule],
  template: `
<app-navbar></app-navbar>
<div class="main">
  <section class="ptb-100 to7-hero-bg text-white" style="padding-top: 150px;">
    <div class="container text-center">
      <h1 class="text-white fw-bold mb-3">Voyagez connecté dans le monde entier</h1>
      <p class="lead">Découvrez les destinations couvertes par TO7 e-SIM et trouvez facilement le forfait adapté à votre voyage.</p>
      <div class="mt-4"><span class="badge bg-white text-danger fs-5 px-3 py-2 rounded-pill">150+ pays couverts</span></div>
    </div>
  </section>

  <section class="ptb-100 gray-light-bg">
    <div class="container">
      <div class="row justify-content-center mb-5">
        <div class="col-md-8 text-center">
            <input type="text" [(ngModel)]="searchTerm" class="form-control form-control-lg border-0 shadow-sm" placeholder="Rechercher un pays ou une région...">
        </div>
      </div>

      <div class="row">
         <div class="col-md-3 mb-4" *ngFor="let dest of filteredDest()">
            <div class="card border-0 shadow-sm rounded text-center p-4 text-decoration-none text-dark d-block h-100 transition-hover">
               <h4 class="mb-2">{{ dest.emoji }} {{ dest.name }}</h4>
               <p class="text-muted small">{{ dest.type }}</p>
               <button class="btn outline-btn mt-2 w-100" style="color:var(--to7-red)!important; border-color:var(--to7-red)!important">Voir les offres</button>
            </div>
         </div>
         
         <div class="col-12 text-center py-4" *ngIf="filteredDest().length === 0">
            <p class="lead text-muted">Aïe, aucune destination trouvée pour "<strong>{{ termsRecherche() }}</strong>".</p>
         </div>
      </div>
    </div>
  </section>
</div>
<app-footer></app-footer>
  `
})
export class DestinationsPage {
  searchTerm: string = '';

  destinations = [
    { name: 'Europe', emoji: '🇪🇺', type: 'Multi-pays' },
    { name: 'France', emoji: '🇫🇷', type: 'Locale' },
    { name: 'USA', emoji: '🇺🇸', type: 'Locale' },
    { name: 'Asie', emoji: '🌏', type: 'Régionale' },
    { name: 'Afrique', emoji: '🌍', type: 'Régionale' },
    { name: 'Émirats Arabes Unis', emoji: '🇦🇪', type: 'Locale' },
    { name: 'Amérique du Sud', emoji: '🌎', type: 'Multi-pays' },
    { name: 'Royaume-Uni', emoji: '🇬🇧', type: 'Locale' },
    { name: 'Japon', emoji: '🇯🇵', type: 'Locale' },
    { name: 'Turquie', emoji: '🇹🇷', type: 'Locale' }
  ];

  filteredDest() {
    if (!this.searchTerm.trim()) return this.destinations;
    return this.destinations.filter(d => d.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  termsRecherche() {
    return this.searchTerm;
  }
}

@Component({
  selector: 'app-comment-ca-marche-page',
  standalone: true,
  imports: [Navbar, Footer],
  template: `
<app-navbar></app-navbar>
<div class="main">
  <section class="ptb-100 to7-hero-bg text-white" style="padding-top: 150px;">
    <div class="container text-center">
      <h1 class="text-white fw-bold mb-3">Comment ça marche ?</h1>
      <p class="lead">Une eSIM, trois étapes simples pour rester connecté.</p>
    </div>
  </section>

  <section class="ptb-100">
    <div class="container">
      <div class="row text-center">
         <div class="col-md-4 mb-5">
            <h1 class="color-secondary mb-3">01</h1>
            <h4 class="mb-3">Choisissez votre forfait</h4>
            <p>Sélectionnez votre destination et le forfait de données qui correspond à votre voyage.</p>
         </div>
         <div class="col-md-4 mb-5">
            <h1 class="color-secondary mb-3">02</h1>
            <h4 class="mb-3">Recevez votre eSIM</h4>
            <p>Après votre achat sécurisé, recevez votre QR code par e-mail immédiatement.</p>
         </div>
         <div class="col-md-4 mb-5">
            <h1 class="color-secondary mb-3">03</h1>
            <h4 class="mb-3">Scannez et activez</h4>
            <p>Scannez le QR code depuis votre téléphone et profitez instantanément de votre connexion locale.</p>
         </div>
      </div>
    </div>
  </section>

  <section class="ptb-100 gray-light-bg">
     <div class="container">
         <div class="row align-items-center">
             <div class="col-md-6 mb-4">
                 <h2 class="mb-4">Avant de commencer</h2>
                 <ul class="list-unstyled">
                    <li class="mb-3"><span class="ti-check color-secondary me-2"></span> Vérifier que votre téléphone est compatible eSIM</li>
                    <li class="mb-3"><span class="ti-check color-secondary me-2"></span> Disposer d'une connexion Internet pour lancer l'installation</li>
                    <li class="mb-3"><span class="ti-check color-secondary me-2"></span> Suivre les instructions envoyées par e-mail après l'achat</li>
                 </ul>
             </div>
             <div class="col-md-6 mb-4">
                 <div class="p-5 bg-white shadow-sm rounded text-center border-top border-danger border-4">
                     <h2 class="mb-4">Une solution 100% numérique</h2>
                     <p>L'eSIM élimine complètement le besoin d'une carte SIM physique en plastique. Tout se gère depuis l'interface native de votre smartphone. Aucune épingle d'éjection ou manipulation minutieuse : une installation logicielle ultra-rapide et sécurisée.</p>
                 </div>
             </div>
         </div>
     </div>
  </section>
</div>
<app-footer></app-footer>
  `
})
export class CommentCaMarchePage { }

@Component({
  selector: 'app-a-propos-page',
  standalone: true,
  imports: [Navbar, Footer],
  template: `
<app-navbar></app-navbar>
<div class="main">
  <section class="ptb-100 to7-hero-bg text-white" style="padding-top: 150px;">
    <div class="container text-center">
      <h1 class="text-white fw-bold mb-3">À propos de TO7 e-SIM</h1>
      <p class="lead">TO7 e-SIM a pour mission de simplifier l'accès à la connectivité mobile lorsque vous voyagez.</p>
    </div>
  </section>

  <section class="ptb-100">
    <div class="container text-center">
      <div class="row">
         <div class="col-md-4 mb-4">
            <h3 class="color-secondary mb-3">Connectivité</h3>
            <p>Restez connecté dans plus de 150 pays à travers le monde avec des réseaux locaux fiables.</p>
         </div>
         <div class="col-md-4 mb-4">
            <h3 class="color-secondary mb-3">Simplicité</h3>
            <p>Une solution numérique repensée de A à Z pour être activée et acquise en un temps record.</p>
         </div>
         <div class="col-md-4 mb-4">
            <h3 class="color-secondary mb-3">Mobilité</h3>
            <p>Choisissez votre forfait, téléchargez votre QR code et voyagez librement, sans changer de SIM physique.</p>
         </div>
      </div>
    </div>
  </section>

  <section class="ptb-100 gray-light-bg text-center">
     <div class="container border-top border-bottom py-5 border-danger">
        <h2 class="mb-4">Notre mission</h2>
        <p class="lead w-75 mx-auto">"Rendre la connectivité internationale beaucoup plus simple, plus accessible et plus pratique pour chaque voyageur."</p>
     </div>
  </section>

  <section class="ptb-100">
     <div class="container text-center">
        <h2 class="mb-5">TO7 en quelques chiffres</h2>
        <div class="row">
            <div class="col-md-4 mb-4">
                <h1 class="fw-bold color-secondary" style="font-size:3.5rem;">50K+</h1>
                <h5>Utilisateurs satisfaits</h5>
            </div>
            <div class="col-md-4 mb-4">
                <h1 class="fw-bold color-secondary" style="font-size:3.5rem;">150+</h1>
                <h5>Pays couverts</h5>
            </div>
            <div class="col-md-4 mb-4">
                <h1 class="fw-bold color-secondary" style="font-size:3.5rem;">~ 2m</h1>
                <h5>Installation chrono</h5>
            </div>
        </div>
     </div>
  </section>
</div>
<app-footer></app-footer>
  `
})
export class AProposPage { }

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [Navbar, Footer],
  template: `
<app-navbar></app-navbar>
<div class="main">
  <section class="ptb-100 to7-hero-bg text-white" style="padding-top: 150px;">
    <div class="container text-center">
      <h1 class="text-white fw-bold mb-3">Besoin d'aide ?</h1>
      <p class="lead">Notre équipe spécialisée est là pour vous accompagner partout.</p>
    </div>
  </section>

  <section class="ptb-100 gray-light-bg">
    <div class="container">
      <div class="row">
        <div class="col-md-5 mb-5 mb-md-0">
           <h3 class="mb-4">Coordonnées de l'assistance</h3>
           <div class="p-4 bg-white shadow-sm rounded border-start border-danger border-4">
              <h5 class="mb-1">Email :</h5>
              <p class="text-muted"><a href="mailto:contact@to7esim.com">contact@to7esim.com</a></p>
              
              <h5 class="mb-1 mt-4">Téléphone :</h5>
              <p class="text-muted">(+253) 21-349-999</p>

              <h5 class="mb-1 mt-4">Adresse Siège, TO7 e-SIM :</h5>
              <p class="text-muted mb-0">Jean Jaures Street - HEEGO Building - Floor 4<br>Plateau du Serpent - Djibouti</p>
           </div>
        </div>
        <div class="col-md-7">
           <div class="p-5 bg-white shadow-sm rounded">
              <h3 class="mb-4">Nous envoyer un message</h3>
              <form>
                 <div class="row">
                    <div class="col-md-6 mb-3">
                       <label class="form-label">Nom complet</label>
                       <input type="text" class="form-control" placeholder="Entrez votre nom">
                    </div>
                    <div class="col-md-6 mb-3">
                       <label class="form-label">Adresse e-mail</label>
                       <input type="email" class="form-control" placeholder="Veuillez renseigner votre courriel">
                    </div>
                 </div>
                 <div class="mb-3">
                    <label class="form-label">Sujet de votre demande</label>
                    <input type="text" class="form-control" placeholder="Entrez le sujet">
                 </div>
                 <div class="mb-4">
                    <label class="form-label">Message</label>
                    <textarea class="form-control" rows="5" placeholder="Écrivez votre message ou vos interrogations ici..."></textarea>
                 </div>
                 <button class="btn btn-lg w-100 solid-btn">Envoyer le message</button>
              </form>
           </div>
        </div>
      </div>
    </div>
  </section>
</div>
<app-footer></app-footer>
  `
})
export class ContactPage { }
