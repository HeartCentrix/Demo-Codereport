import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../shared/common.service';
import { Router, RouterModule } from '@angular/router'

interface ResourceRequest {
  date: string;
  jobTitle: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  requests: ResourceRequest[] = [];

  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit(): void {
    this.getLinksByTenant();
  }

  goToManageRequest() {
    this.router.navigate(['/manage-request']);
  }

  goToRequestResource() {
    this.router.navigate(['/request-resource']);
  }

  getLinksByTenant() {
    this.commonService.getLinksByTenantID().subscribe(
      (response: any) => {
        if (response.status === 200 && response.data) {
          this.requests = response.data.map((item: any) => {
            const jobTitle = item.pragramName;
            const parts = jobTitle.split('_');
            const lastPart = parts[parts.length - 1];
            const trimmedTitle = /^\d+$/.test(lastPart)
              ? parts.slice(0, -1).join('_')
              : jobTitle;
            return {
              date: item.createdAt,
              jobTitle: trimmedTitle,
            };
          });
        } else {
          console.error('Failed to fetch resource links');
        }
      },
      (error) => {
        console.error('API error:', error);
      }
    );
  }
}
