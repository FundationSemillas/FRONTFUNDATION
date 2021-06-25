import { Session } from './../models/session';
import { Injectable } from '@angular/core';
import { UserInterface } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private localStorageService;
  private currentSession: Session = null;
  constructor(
    private router: Router
  ) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
    console.log("localstorage: ", localStorage)
  }


  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
    this.localStorageService.setItem('logeado', "si");
  }

  loadSessionData(): Session {
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session>JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  getCurrentUser(): UserInterface {
    var session: Session = this.getCurrentSession();
    return (session && session.user) ? session.user : null;
  };

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void {
    this.removeCurrentSession();
    this.router.navigate(['/login']);
  }
}
