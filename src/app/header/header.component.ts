import { Component, computed } from '@angular/core';
import { navbarOpenSignal } from '../utility/navbar.signals';
import { UtilityService } from '../utility/utility.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  // Computed property to reflect the signal's current state
  isOpen = computed(() => navbarOpenSignal());

  constructor(private utils: UtilityService) { }

  openNavbar() {
    navbarOpenSignal.set(true);
  }

  closeNavbar() {
    navbarOpenSignal.set(false);
  }

  navigateTo(path: string) {
      this.utils.navigate(path);
  }
}
