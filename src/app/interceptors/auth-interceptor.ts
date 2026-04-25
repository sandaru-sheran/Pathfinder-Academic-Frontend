import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  

  if (req.url.includes('/create') || req.url.includes('/login')) {
    return next(req);
  }


  const token = localStorage.getItem('jwt_token');

  if (token) {

    const stampedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Send the stamped request to the backend
    return next(stampedRequest);
  }

  // 4. If there is no token, just send it normally
  return next(req);
};