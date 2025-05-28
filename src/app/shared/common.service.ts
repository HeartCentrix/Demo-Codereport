import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  selectedSkillId: any;
  userTestIdCommon: any;
  createReportData: any = [];

  // public apiServerURL = 'https://api.codereport.com/fion/';  //Production
  public apiServerURL = 'https://api-dev.codereport.com/fion/';  //development

  //   public apiServerURL = environment.apiServerURL;
  private getQuesAPI = 'api/v1/questions';
  private savCadidateAPI = 'api/v1/candidate';
  private addQuestionAPI = 'api/v1/question/add';
  private getAllLanguagesAPI = 'api/v1/all-lang-non-version?';
  private getFilters = 'api/v2/getFilters';
  private getUserProfile = 'api/v2/userprofile';


  private getPrimarySkills = 'api/v1/primaryskill';
  private getSecondarySkills = 'api/v1/secondaryskill';
  private getSecondarySkillByPrimary = 'api/v1/secondaryskillByPrimaryId/{primaryskillId}?primarySkillId=';



  private submitMCQAnsAPI = 'api/v1/submitQuestion';

  private getTestIDAPI = 'api/v1/codereportsByUserId/{userId}?userId=';
  private getReportDataAPI = 'api/v1/codereportByTestId/{testid}?testId=';


  private verifyAuthCodeAPI = 'api/auth/verifyAuthorization';
  private generateAuthCodeAPI = 'api/auth/authorizationcode';
  private getCandidatesByFilter = 'api/v2/findReportByFilters?';
  private getLinksByTenantIdAPI = 'api/v1/getLinksByTenantId';
  private generateEmailAuthAPI = 'api/auth/sendEmail';
  private cumulativeByWeekAuthStatsAPI = 'api/auth/authCodeStatsCumulativeByWeek';
  private cumulativeByMonthAuthStatsAPI = 'api/auth/authCodeStatsCumulativeByMonth'
  private noncumulativeByWeekAuthStatsAPI = 'api/auth/authCodeStatsByWeek';
  private noncumulativeByMonthAuthStatsAPI = 'api/auth/authCodeStatsByMonth'
  private todayAuthStatsAPI = 'api/auth/authCodeStatsToday';
  private scoreManualReportAPI = 'manualReport';
  private getManualReportByEmailAPI = 'ManualReportByEmail';
  private getManualReportByTestIdAPI = 'getManualReport';
  private createLinkAPI = 'CreateLink'
  private submitJobAPI = 'v1/masterlink';
  private getProgramminglangsAPI = 'api/v1/getProgramminglangs';
  private getTenantData = 'api/v1/getTenant?';

  chunks: any[] = [];
  sectionName: String = "";
  recordingRunning = false;

  constructor(private httpClient: HttpClient) { }

  addQuestion(ques: any) {
    return this.httpClient.post(this.apiServerURL + this.addQuestionAPI, ques);
  }

  getAllPrimarySkills() {
    return this.httpClient.get(this.apiServerURL + this.getPrimarySkills);
  }
  addPrimarySkills(data: any) {
    return this.httpClient.post(this.apiServerURL + this.getPrimarySkills, data);
  }
  deletePrimarySkills(pid: any) {
    return this.httpClient.delete(this.apiServerURL + this.getPrimarySkills + '?primarySkillId=' + pid);
  }
  getSpecificSecondarySkills(pid: any) {
    return this.httpClient.get(this.apiServerURL + this.getSecondarySkillByPrimary + pid);
  }
  getAllSecondarySkills() {
    return this.httpClient.get(this.apiServerURL + this.getSecondarySkills);
  }
  addSecondarySkills(data: any) {
    return this.httpClient.post(this.apiServerURL + this.getSecondarySkills, data);
  }
  deleteSecondarySkills(sid: any) {
    return this.httpClient.delete(this.apiServerURL + this.getSecondarySkills + '?secondarySkillId=' + sid);
  }
  getAllQuestions() {
    return this.httpClient.get(this.apiServerURL + this.getQuesAPI);
  }
  submitMCQQuestions(data: any) {
    return this.httpClient.post(this.apiServerURL + this.submitMCQAnsAPI, data);
  }

  getTestIDData(uid: any) {
    return this.httpClient.get(this.apiServerURL + this.getTestIDAPI + uid);
  }
  getReportData(tid: any) {
    return this.httpClient.get(this.apiServerURL + this.getReportDataAPI + tid);
  }
  saveCandiateDetails(details: any) {
    return this.httpClient.post(this.apiServerURL + this.savCadidateAPI, details);
  }

  getCandidateFilter() {
    return this.httpClient.get(this.apiServerURL + this.getFilters);
  }

  /**
   * APi to get the user profile and test details based on email id
   * @param emailId 
   * @returns 
   */
  getUserProfileDetails(emailId: any) {
    return this.httpClient.get(this.apiServerURL + this.getUserProfile + `?email=${emailId}`);
  }

  /**
   * Method that is used in the candidate list screeen with search and filter
   * @param payload 
   * @returns observable
   */
  getCandidateLists(payload: any, params: any) {
    return this.httpClient.post(this.apiServerURL + this.getCandidatesByFilter, payload, params);
  }

  getAllLanguages() {
    return this.httpClient.get(this.apiServerURL + this.getAllLanguagesAPI);
  }

  verifyAuthCode(authCode: string) {
    let headers = new HttpHeaders();
    headers = headers.set('authCode', authCode);
    return this.httpClient.post(this.apiServerURL + this.verifyAuthCodeAPI, {}, { headers: headers });
  }

  generateAuthCode(payload: any) {
    return this.httpClient.post(this.apiServerURL + this.generateAuthCodeAPI, payload);
  }

  getProfile(emailId: any) {

    return this.httpClient.get(this.apiServerURL + `api/v1/userprofile?email=${emailId}`);
  }

  getParamValueQueryString(paramName: string) {
    const url = window.location.href;
    let paramValue;
    if (url.includes('?')) {
      const httpParams = new HttpParams({ fromString: url.split('?')[1] });
      paramValue = httpParams.get(paramName);
    }
    return paramValue;
  }

  getLinksByTenantID() {
    return this.httpClient.get(this.apiServerURL + this.getLinksByTenantIdAPI);
  }

  emailAuthorization(to: string, expiryDays: number) {
    return this.httpClient.post(this.apiServerURL + this.generateEmailAuthAPI, {
      to,
      expiryDays
    });
  }

  cumulativeByWeekAuthStats() {
    return this.httpClient.get(this.apiServerURL + this.cumulativeByWeekAuthStatsAPI)
  }

  cumulativeByMonthAuthStats() {
    return this.httpClient.get(this.apiServerURL + this.cumulativeByMonthAuthStatsAPI)
  }

  noncumulativeByWeekAuthStats() {
    return this.httpClient.get(this.apiServerURL + this.noncumulativeByWeekAuthStatsAPI)
  }

  noncumulativeByMonthAuthStats() {
    return this.httpClient.get(this.apiServerURL + this.noncumulativeByMonthAuthStatsAPI)
  }

  todayAuthStats() {
    return this.httpClient.get(this.apiServerURL + this.todayAuthStatsAPI)
  }

  submitManualReport(body: any) {
    return this.httpClient.post(this.apiServerURL + this.scoreManualReportAPI, body, { responseType: 'text' });
  }

  getmManualReportByEmail(candidateEmail: string) {
    const params = { candidateEmail };
    return this.httpClient.get(this.apiServerURL + this.getManualReportByEmailAPI, { params });
  }

  getManualReportByTestId(testID: number) {
    const params = { testID };
    return this.httpClient.get(this.apiServerURL + this.getManualReportByTestIdAPI, { params });
  }

  getCreatedLink(body: any) {
    return this.httpClient.post(this.apiServerURL + this.createLinkAPI, body);
  }

  submitJobDescription(body: any): Observable<any> {
    const requestTimeout = 300000;
    return this.httpClient.post(this.apiServerURL + this.submitJobAPI, body).pipe(
      timeout(requestTimeout),
      catchError((error) => {
        if (error.name === 'TimeoutError') {
          console.error('Request timed out');
          return throwError('Request timed out. Please try again later.');
        }
        return throwError(error);
      })
    );
  }

  getProgramminglangs() {
    return this.httpClient.get(this.apiServerURL + this.getProgramminglangsAPI);
  }

  getJobData(jobTitle: string) {
    return this.httpClient.get(this.apiServerURL + this.getTenantData + 'JobTitle=' + jobTitle);
  }
}

