import { NgModule } from "@angular/core"
import { RouterModule ,Routes } from "@angular/router"

// importar los componentes
import { MainComponent } from "./main/main.component"
import { AddComponent } from "./add/add.component"
import { EditComponent} from "./edit/edit.component"
import { ListComponent } from "./list/list.component"

const panelRoutes: Routes = [
    {
        path: 'panel', component: MainComponent,
        children: [
            {path: '', component: ListComponent},
            {path: 'listado', component: ListComponent},
            {path: 'crear', component: AddComponent},
            {path: 'editar/:id', component: EditComponent}
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(panelRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class panelRoutingModule{
    
}
