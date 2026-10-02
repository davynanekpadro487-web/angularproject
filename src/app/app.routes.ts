import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { SignUp } from './pages/sign-up/sign-up';
import { Faq } from './pages/faq/faq';
import { NotFound } from './pages/not-found/not-found';
import { GenericPage, OffresPage, DestinationsPage, CommentCaMarchePage, AProposPage, ContactPage } from './pages/extra-pages';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'offres', component: OffresPage },
  { path: 'destinations', component: DestinationsPage },
  { path: 'comment-ca-marche', component: CommentCaMarchePage },
  { path: 'a-propos', component: AProposPage },
  { path: 'faq', component: Faq },
  { path: 'contact', component: ContactPage },
  { path: 'login', component: Login },
  { path: 'register', component: SignUp },
  { path: 'forgot-password', component: GenericPage, data: { title: 'Mot de passe oublié' } },

  // Pages légales
  { path: 'termes-et-conditions', component: GenericPage, data: { title: 'Termes et conditions' } },
  { path: 'politique-confidentialite', component: GenericPage, data: { title: 'Politique de confidentialité' } },
  { path: 'politique-remboursement', component: GenericPage, data: { title: 'Politique de remboursement' } },
  { path: 'cookies', component: GenericPage, data: { title: 'Cookies et Conditions d\'utilisation' } },

  { path: '**', component: NotFound }
];
