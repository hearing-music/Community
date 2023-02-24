import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';

// import { LayersComponent } from './layers/layers.component';
const routes: Routes = [
	{
		path: '',
		component: LoginComponent,
	},
	// {
	// 	path: 'layers',
	// 	component: LayersComponent,
	// }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {
}
