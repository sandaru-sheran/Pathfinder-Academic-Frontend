import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  // Inject our required tools
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if they are completely logged out
  if (!authService.isLoggedIn()) {
    console.warn('Bouncer says: You have no VIP pass! Back to login.');
    router.navigate(['/login']);
    return false;
  }

  // Look at the route they are trying to enter to see what role is required
  const expectedRole = route.data['expectedRole'];
  
  // Look at their actual token to see what role they actually have
  const currentRole = authService.getUserRole();

  console.log('Expected role:', expectedRole);
  console.log('Current role:', currentRole);

  // The final decision
  if (currentRole === expectedRole) {
    return true; // Door opens, they are allowed in
  } else {
    console.warn(`Bouncer says: You are a ${currentRole}, but this room requires ${expectedRole}!`);
    router.navigate(['/login']); 
    return false;
  }
};