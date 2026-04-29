import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import { RegisterRequest } from '../models/register-request';
import { LoginRequest } from '../models/login-request';
import { CourseDTO } from '../models/course';
import { LecturerCoursesDTO } from '../models/lecturer-courses';
import { RosterDTO } from '../models/roster';
import { AssignGradeDTO } from '../models/assign-grade';
import { ProgramDTO } from '../models/program';
import { StudentCourseDTO } from '../models/student-course';
import { StudentAllCourseDTO } from '../models/student-all-course';
import { StudentEnrollDTO } from '../models/student-enroll';
import { TranscriptDTO } from '../models/transcript';
import { UserDTO } from '../models/user';
import { AllocationDTO } from '../models/allocation';


export interface ToggleStatusDTO {
  id: number;
  isEnabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userApiUrl = 'http://localhost:8080/api/user';
  private courseApiUrl = 'http://localhost:8080/api/course';
  private lecturerApiUrl = 'http://localhost:8080/api/lecturer';
  private programApiUrl = 'http://localhost:8080/api/program';
  private studentApiUrl = 'http://localhost:8080/api/student';
  private adminApiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  // ==================== USER/AUTH ENDPOINTS ====================

  login(credentials: LoginRequest): Observable<string> {
    return this.http.post(`${this.userApiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap(token => {
          console.log('Received token:', token);
          localStorage.setItem('jwt_token', token);
        })
      );
  }

  register(userData: RegisterRequest): Observable<any> {
    return this.http.post(`${this.userApiUrl}/create`, userData);
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.userApiUrl}/getall`);
  }

  toggleUserStatus(id: number): Observable<ToggleStatusDTO> {
    return this.http.post<ToggleStatusDTO>(`${this.userApiUrl}/${id}/toggle-status`, {});
  }

  // ==================== COURSE ENDPOINTS ====================

  getAllCourses(): Observable<CourseDTO[]> {
    return this.http.get<CourseDTO[]>(`${this.adminApiUrl}/all-courses`).pipe(
      map(data => data || []),
      // In case of 403, this will still error but you can add catchError if needed
    );
  }

  getCourseById(id: number): Observable<CourseDTO> {
    return this.http.get<CourseDTO>(`${this.courseApiUrl}/${id}`);
  }

  createCourse(courseDto: CourseDTO): Observable<CourseDTO> {
    return this.http.post<CourseDTO>(`${this.adminApiUrl}/create-course`, courseDto);
  }

  // ==================== LECTURER ENDPOINTS ====================

  getLecturerCourses(): Observable<LecturerCoursesDTO[]> {
    return this.http.get<LecturerCoursesDTO[]>(`${this.lecturerApiUrl}/allocated-courses`);
  }

  getCourseRoster(courseId: number): Observable<RosterDTO[]> {
    return this.http.get<RosterDTO[]>(`${this.lecturerApiUrl}/courses/${courseId}/roster`);
  }

  assignGrade(enrollmentId: number, gradeDto: AssignGradeDTO): Observable<AssignGradeDTO> {
    return this.http.post<AssignGradeDTO>(`${this.lecturerApiUrl}/enrollments/${enrollmentId}/grade`, gradeDto);
  }

  // ==================== PROGRAM ENDPOINTS ====================

  getAllPrograms(): Observable<ProgramDTO[]> {
    return this.http.get<ProgramDTO[]>(`${this.adminApiUrl}/all-programs`);
  }

  addProgram(programDto: ProgramDTO): Observable<ProgramDTO> {
    return this.http.post<ProgramDTO>(`${this.programApiUrl}/add`, programDto);
  }

  updateProgram(program: ProgramDTO): Observable<string> {
    return this.http.patch<string>(`${this.programApiUrl}`, program);
  }

  deleteProgram(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.programApiUrl}/${id}`);
  }

  // ==================== STUDENT ENDPOINTS ====================

  getStudentMyCourses(): Observable<StudentCourseDTO[]> {
    return this.http.get<StudentCourseDTO[]>(`${this.studentApiUrl}/my-courses`);
  }

  getCourseCatalog(): Observable<StudentAllCourseDTO[]> {
    return this.http.get<StudentAllCourseDTO[]>(`${this.studentApiUrl}/catalog`);
  }

  enrollInCourse(courseId: number, semester: string): Observable<StudentEnrollDTO> {
    return this.http.post<StudentEnrollDTO>(`${this.studentApiUrl}/enroll/${courseId}`, semester);
  }

  getStudentTranscript(): Observable<TranscriptDTO[]> {
    return this.http.get<TranscriptDTO[]>(`${this.studentApiUrl}/transcript`);
  }

  // ==================== ALLOCATION/LECTURER ASSIGNMENT ====================

  lectureAllocation(allocationDto: AllocationDTO): Observable<AllocationDTO> {
    return this.http.post<AllocationDTO>(`${this.adminApiUrl}/lecturer-allocation`, allocationDto);
  }

  // ==================== TOKEN & AUTH UTILITIES ====================

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  // Decode the token to read the JSON inside
  getDecodedToken(): any {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // Split the token by the dot and grab the middle section [1]
      const payload = token.split('.')[1];
      // atob() is a built-in browser function that decodes Base64 strings
      const decodedPayload = window.atob(payload);
      // Convert the raw string back into a usable JavaScript object
      return JSON.parse(decodedPayload);
    }
    return null;
  }

  // Extract just the role
  getUserRole(): string | null {
    const decodedToken = this.getDecodedToken();
    console.log('Decoded token:', decodedToken);
    if (decodedToken) {
      if (decodedToken.role) {
        return decodedToken.role;
      }
      if (decodedToken.roles && Array.isArray(decodedToken.roles)) {
        return decodedToken.roles[0];
      }
      if (decodedToken.authorities && Array.isArray(decodedToken.authorities)) {
        return decodedToken.authorities[0];
      }
    }
    return null;
  }

  // Simple check if a token exists at all
  isLoggedIn(): boolean {
    return localStorage.getItem('jwt_token') !== null;
  }
}
