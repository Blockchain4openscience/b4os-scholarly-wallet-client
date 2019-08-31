import { JwtInterceptor } from './services/auth-jwt.interceptor';
import { AuthErrorInterceptor } from './services/auth-error.interceptor';
import { BundleResolver } from './services/bundle.resolver';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatGridListModule,
  MatCardModule,
  MatDialogModule,
  MatStepperModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatTabsModule,
  MatTooltipModule,
  MatBadgeModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './layouts/main/main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddRoComponent } from './components/add-ro/add-ro.component';
import { RepositoriesTableComponent } from './components/repositories-table/repositories-table.component';
import { CreateDiscoComponent } from './components/create-disco/create-disco.component';
import { RoTableComponent } from './components/ro-table/ro-table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BundleComponent } from './components/bundle/bundle.component';
import { ResearchObjectsComponent } from './pages/research-objects/research-objects.component';
import { RepositoryCardComponent } from './components/repository-card/repository-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PublicationCardComponent } from './components/publication-card/publication-card.component';
import { RoCardComponent } from './components/ro-card/ro-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClaimResearchObjectComponent } from './components/claim-research-object/claim-research-object.component';
import { ArticleCardComponent } from './components/article-card/article-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BundlesComponent } from './pages/bundles/bundles.component';
import { BundleCardComponent } from './components/bundle-card/bundle-card.component';
import { BundleViewComponent } from './components/bundle-view/bundle-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    AddRoComponent,
    RepositoriesTableComponent,
    CreateDiscoComponent,
    RoTableComponent,
    BundleComponent,
    ResearchObjectsComponent,
    RepositoryCardComponent,
    PublicationCardComponent,
    RoCardComponent,
    ClaimResearchObjectComponent,
    ArticleCardComponent,
    BundlesComponent,
    BundleCardComponent,
    BundleViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatStepperModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatBadgeModule,
    DragDropModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [AddRoComponent, ClaimResearchObjectComponent],
  providers: [
    AuthService,
    BundleResolver,
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
