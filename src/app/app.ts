import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';
import { EarnivoRewardComponent } from './components/earnivo-reward/earnivo-reward.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    CookieConsentComponent,
    EarnivoRewardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
