import { Injectable } from '@angular/core';
import { ComboListType } from '../Interfaces/comboListType';

const us_states: ComboListType[] = [
  { code: "AL", label: "Alabama" },
  { code: "AK", label: "Alaska" },
  { code: "AZ", label: "Arizona" },
  { code: "AR", label: "Arkansas" },
  { code: "CA", label: "California" },
  { code: "CO", label: "Colorado" },
  { code: "CT", label: "Connecticut" },
  { code: "DE", label: "Delaware" },
  { code: "DC", label: "District Of Columbia" },
  { code: "FL", label: "Florida" },
  { code: "GA", label: "Georgia" },
  { code: "HI", label: "Hawaii" },
  { code: "ID", label: "Idaho" },
  { code: "IL", label: "Illinois" },
  { code: "IN", label: "Indiana" },
  { code: "IA", label: "Iowa" },
  { code: "KS", label: "Kansas" },
  { code: "KY", label: "Kentucky" },
  { code: "LA", label: "Louisiana" },
  { code: "ME", label: "Maine" },
  { code: "MD", label: "Maryland" },
  { code: "MA", label: "Massachusetts" },
  { code: "MI", label: "Michigan" },
  { code: "MN", label: "Minnesota" },
  { code: "MS", label: "Mississippi" },
  { code: "MO", label: "Missouri" },
  { code: "MT", label: "Montana" },
  { code: "NE", label: "Nebraska" },
  { code: "NV", label: "Nevada" },
  { code: "NH", label: "New Hampshire" },
  { code: "NJ", label: "New Jersey" },
  { code: "NM", label: "New Mexico" },
  { code: "NY", label: "New York" },
  { code: "NC", label: "North Carolina" },
  { code: "ND", label: "North Dakota" },
  { code: "OH", label: "Ohio" },
  { code: "OK", label: "Oklahoma" },
  { code: "OR", label: "Oregon" },
  { code: "PA", label: "Pennsylvania" },
  { code: "RI", label: "Rhode Island" },
  { code: "SC", label: "South Carolina" },
  { code: "SD", label: "South Dakota" },
  { code: "TN", label: "Tennessee" },
  { code: "TX", label: "Texas" },
  { code: "UT", label: "Utah" },
  { code: "VT", label: "Vermont" },
  { code: "VA", label: "Virginia" },
  { code: "WA", label: "Washington" },
  { code: "WV", label: "West Virginia" },
  { code: "WI", label: "Wisconsin" },
  { code: "WY", label: "Wyoming" }];


const work_auth_status_list = [{ code: "U.S. citizen", label: "U.S. Citizen" },
{ code: "Green Card", label: "Green Card" },
{ code: "H1B Visa", label: "H1B Visa" },
{ code: "EAD-CPT", label: "EAD-CPT" },
{ code: "EAD-H4", label: "EAD-H4" },
{ code: "EAD-OPT", label: "EAD-OPT" },
{ code: "EAD-Asylee", label: "EAD-Asylee" },
{ code: "TN Visa", label: "TN Visa" },
{ code: "T4(Canadian)", label: "T4(Canadian)" },
{ code: "F1 Visa", label: "F1 Visa" }];

const work_location_list = [{ code: "Onsite", label: "Onsite" },
{ code: "Remote", label: "Remote" },
{ code: "Hybrid", label: "Hybrid" }];


const experience_list = [{ code: "0", label: "<1" },
{ code: "1", label: "1" },
{ code: "2", label: "2" },
{ code: "3", label: "3" },
{ code: "4", label: "4" },
{ code: "5", label: "5" },
{ code: "6", label: "6" },
{ code: "7", label: "7" },
{ code: "8", label: "8" },
{ code: "9", label: "9" },
{ code: "10", label: "10" },
{ code: "11", label: "10+" }
]

const language_list = [
  { code: "8135", label: "Java" },
  { code: "7248", label: "JavaScript" },
  { code: "8240", label: "C#" },
  { code: "1124", label: "Python" },
  { code: "8282", label: "NA" },
  { code: "46", label: "Bash Scripting" },
  { code: "8182", label: "Power BI" },
  { code: "8183", label: "Tableau BI" },
  { code: "8184", label: "Cyber Security" },
  { code: "1125", label: "Data Engineering" },
  { code: "7249", label: "Salesforce" }
]

const DEFAULT_PARTNER_ID = "100001";
const DEFAULT_LANG_ID = "8135";

@Injectable({
  providedIn: 'root'
})
export class StaticApiService {

  constructor() { }

  /**
   * 
   * @description this method returns Array of type State
   * @returns Array of States. 
   */
  public static fetchState(): ComboListType[] {
    return us_states;
  }

  /**
   * @description This method return Array of work authorization type like H1b, Citizen, etc. 
   * @returns Array of work authorization status types list
   */
  public static fetchWorkStatusList(): ComboListType[] {
    return work_auth_status_list;
  }

  public static fetchWorkLocationPreferenceList(): ComboListType[] {
    return work_location_list;
  }

  public static fetchExperienceList(): ComboListType[] {
    return experience_list;
  }

  public static fetchLanguageList(): ComboListType[] {
    return language_list;
  }

  public static fetchDefaultPartnerId(): string {
    return DEFAULT_PARTNER_ID;
  }

  public static fetchDefaultLangId(): string {
    return DEFAULT_LANG_ID;
  }

}
