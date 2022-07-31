// Modulos
import { NgModule } from "@angular/core"

// func de un modulo con el comommodule
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http"
import { panelRoutingModule } from "./panel-routing.module"

// Componentes
import { MainComponent } from "./main/main.component"
import { AddComponent } from "./add/add.component"
import { ListComponent } from "./list/list.component"
import { EditComponent } from "./edit/edit.component"


// Servicios

// Conf. del ngModule.
@NgModule({
    declarations: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        panelRoutingModule
    ],
    exports: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    providers: []
})

export class PanelModule {

}