import { BundleViewComponent } from './components/bundle-view/bundle-view.component';
import { BundlesComponent } from './pages/bundles/bundles.component';
import { RepositoriesTableComponent } from './components/repositories-table/repositories-table.component';
import { BundleComponent } from './components/bundle/bundle.component';
import { CreateDiscoComponent } from './components/create-disco/create-disco.component';
import { AddRoComponent } from './components/add-ro/add-ro.component';
import { MainComponent } from './layouts/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ResearchObjectsComponent } from './pages/research-objects/research-objects.component';
import { BundleResolver } from './services/bundle.resolver';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      {
        path: 'research-objects',
        component: ResearchObjectsComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'github',
            component: RepositoriesTableComponent,
            data: { source: 'github', claimable: true, animation: 'Github' },
            canActivate: [AuthGuard]
          },
          {
            path: 'orcid',
            component: RepositoriesTableComponent,
            data: { source: 'orcid', claimable: false, animation: 'Orcid' },
            canActivate: [AuthGuard]
          },
          {
            path: 'figshare',
            component: RepositoriesTableComponent,
            data: {
              source: 'figshare',
              claimable: true,
              animation: 'Figshare'
            },
            canActivate: [AuthGuard]
          },
          {
            path: '**',
            redirectTo: 'github'
          }
        ]
      },
      {
        path: 'bundles',
        component: BundlesComponent,
        canActivate: [AuthGuard]
      },
      { path: 'add', component: AddRoComponent, canActivate: [AuthGuard] },
      {
        path: 'bundle/:id',
        component: BundleComponent,
        resolve: { disco: BundleResolver },
        canActivate: [AuthGuard]
      },
      {
        path: 'bundle/view/:id',
        component: BundleViewComponent,
        resolve: { disco: BundleResolver },
        canActivate: [AuthGuard]
      },
      { path: 'bundle', component: BundleComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      {
        path: '**',
        redirectTo: '/home'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
