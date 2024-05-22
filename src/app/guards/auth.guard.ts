import { CanActivateFn, Router } from '@angular/router';
import { AdminAPIService } from '../adminAPIServices/admin-api.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AdminAPIService)
  const router = inject(Router)

  if(authService.isAuthorized()){
    return true
  }else{
    alert("Operation Denied...Please Login")
    router.navigateByUrl('')
    return false
  }
};
