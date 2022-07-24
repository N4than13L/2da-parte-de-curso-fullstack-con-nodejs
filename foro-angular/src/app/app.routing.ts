// importtar los modulos del routing 
import { ModuleWithProviders } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

// importar componente
import { HomeComponent } from "./components/home/home.component"
import { LoginComponent } from "./components/login/login.component"
import { RegisterComponent } from "./components/register/register.component"

// array de rutas
const appRoutes: Routes = [
    {path: "", component: HomeComponent},
    {path: "inicio", component: HomeComponent},
    {path: "login", component: LoginComponent},
    {path: "registro", component: RegisterComponent},
    {path: "**", component: LoginComponent}
]

// exportar config
export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes)