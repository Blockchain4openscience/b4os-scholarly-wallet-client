import { ResearchObjectsService } from './../../services/research-objects.service';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b4os-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  claimedResearchObjects: any;

  constructor(private storageService: StorageService, private authService: AuthService, private roService: ResearchObjectsService) { }

  ngOnInit() {
    this.roService.list().subscribe(ros => this.claimedResearchObjects = ros);
  }

}
