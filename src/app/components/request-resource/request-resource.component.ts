import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonService } from '../../shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-request-resource',
  imports: [HeaderComponent, CommonModule, FormsModule, NgxSpinnerModule],
  templateUrl: './request-resource.component.html',
  styleUrl: './request-resource.component.scss'
})
export class RequestResourceComponent implements OnInit {
  primarySkill: string = '';
  jobDescription: string = '';
  evalName: string = '';
  seniorityLevel: string = '';
  authCode: string = '';
  programming: string = '';
  programmingLanguage: string = '';
  location: string = '';
  rate: string = '';
  mcqCountPerSection: number | null = null;
  additionalDetails: string = '';
  quantityOptions: number[] = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  mode: string = 'normal';
  isEditMode: boolean = false;
  spinner1 = 'sp1';
  generatedUrl: string | null = null;
  showModal: boolean = false;
  programmingLanguages: any[] = [];
  selectedFile: File | null = null;
  constructor(private commonService: CommonService, private route: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.fetchProgrammingLanguages();
    this.route.queryParams.subscribe(params => {
      const jobTitle = params['jobTitle'];
      const state = history.state;
      this.mode = state?.mode || 'normal';

      if (jobTitle) {
        this.commonService.getJobData(jobTitle).subscribe((res: any) => {
          const data = res.data;
          if (data) {
            this.primarySkill = data.primarySkill || '';
            this.jobDescription = data.jobDescription || '';
            this.seniorityLevel = data.seniorityLevel || '';
            this.programmingLanguage = data.programmingLanguage || '';
            this.location = data.location || '';
            this.rate = data.rate || '';
            this.mcqCountPerSection = data.mcqCountPerSection || '';
            this.additionalDetails = data.additionalDetails || '';

            if (this.mode === 'edit') {
              this.isEditMode = true;
            }
          }
        });
      }
    });
  }

  fetchProgrammingLanguages(): void {
    this.commonService.getProgramminglangs().subscribe(
      (response: any) => {
        if (response.status === 200 && response.data) {
          this.programmingLanguages = response.data;
        } else {
          this.toastr.error('Failed to fetch programming languages.');
        }
      },
      (error) => {
        this.toastr.error('Something went wrong while fetching programming languages.');
      }
    );
  }

  isFormValid(): boolean {
    return this.primarySkill.trim() !== '' &&
      this.jobDescription.trim() !== '' &&
      this.seniorityLevel.trim() !== '' &&
      this.programmingLanguage.trim() !== '' &&
      this.location.trim() !== '' &&
      this.rate.trim() !== '' &&
      this.mcqCountPerSection !== null &&
      this.additionalDetails.trim() !== ''
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0] || null;
    console.log('File selected:', this.selectedFile);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File dropped:', this.selectedFile);
    }
  }

  clearSelectedFile(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
  }

  submitJob() {
    if (this.isFormValid()) {
      this.showSpinner(this.spinner1);
      const formData = {
        primarySkill: this.primarySkill,
        jobDescription: this.jobDescription,
        seniorityLevel: this.seniorityLevel,
        programming: true,
        programmingLanguage: this.programmingLanguage,
        location: this.location,
        rate: this.rate,
        mcqCountPerSection: this.mcqCountPerSection,
        additionalDetails: this.additionalDetails,
        operation: this.mode
      };
      this.commonService.submitJobDescription(formData).subscribe(
        (response: any) => {
          this.hideSpinner(this.spinner1);
          if (response.mgs && response.mgs === 'Link already present') {
            this.toastr.error('Link already present');
          } else if (response.error) {
            this.toastr.error(response.error);
          } else {
            if (this.mode === 'edit') {
              this.toastr.success(response.mgs);
              this.clearForm();
            } else {
              this.toastr.success('Job description submitted successfully.');
              this.generatedUrl = response.data;
              this.showModal = true;
              this.clearForm();
            }
          }
        },
        (error) => {
          this.hideSpinner(this.spinner1);
          this.toastr.error('Something went wrong, please try again later.');
        }
      );
    } else {
      alert("Please fill in all required fields.");
    }
  }

  showSpinner(name: string) {
    this.spinner.show(name);
  }

  hideSpinner(name: string) {
    this.spinner.hide(name);
  }

  copyUrlToClipboard() {
    if (this.generatedUrl) {
      navigator.clipboard.writeText(this.generatedUrl).then(() => {
        this.toastr.success('URL copied to clipboard!');
        this.showModal = false;
      }).catch(err => {
        this.toastr.error('Failed to copy URL.');
      });
    }
  }

  clearForm() {
    this.primarySkill = '';
    this.jobDescription = '';
    this.seniorityLevel = '';
    this.programmingLanguage = '';
    this.location = '';
    this.rate = '';
    this.mcqCountPerSection = null;
    this.additionalDetails = '';
  }
}
