import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface JobDetail {
  jobTitle: string;
  evaluation: string;
  seniority: string;
  authCode: string;
  programming: string;
  location: string;
  rate: string;
  qty: number;
}

interface Candidate {
  availability: string;
  name: string;
  primarySkill: string;
  evaluation: string;
  score: number;
  workAuth: string;
  yearsExp: number;
}


@Component({
  selector: 'app-manage-request',
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './manage-request.component.html',
  styleUrl: './manage-request.component.scss'
})
export class ManageRequestComponent implements OnInit {

  job: JobDetail = {
    jobTitle: 'Senior Visualization Engineer',
    evaluation: 'Python 9.5',
    seniority: 'Senior',
    authCode: 'None',
    programming: 'Python',
    location: 'St. Louis, MO (USA / Hybrid)',
    rate: '$65/hr',
    qty: 4
  };

  description = `We are seeking a highly skilled and experienced Senior Virtualization Engineer with extensive hands-on experience to join our global Citrix team. The ideal candidate will be a Virtualization expert with a proven track record of designing, implementing, and maintaining complex Citrix farms and should also have expertise in managing the VMware...`;

  moreDetails = ` Must speak fluent German. Job requires <10%, International and Domestic travel.`;

  candidates: Candidate[] = [
    { availability: 'Exclusive', name: 'Amulya Singh', primarySkill: 'Python', evaluation: 'Python 9.5', score: 93.34, workAuth: 'H1B Visa', yearsExp: 0 },
    { availability: 'Pending', name: 'Yahvi Sachdeva', primarySkill: 'Java', evaluation: 'Java 9.5', score: 18.66, workAuth: 'Other', yearsExp: 4 },
    { availability: 'Exclusive', name: 'Bratai Mandal', primarySkill: 'C#', evaluation: 'C# 9.5', score: 93.34, workAuth: 'EAD-H4', yearsExp: 6 },
    { availability: 'On Contract', name: 'Amit Mishra', primarySkill: 'Golang', evaluation: 'Golang 9.5', score: 86, workAuth: 'U.S.citizen', yearsExp: 5 }
  ];

  constructor() { }

  ngOnInit(): void { }

}
