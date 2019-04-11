import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FacturaService } from '../factura.service';
import { Factura } from '../factura';

@Component({
    selector: 'app-factura-create',
    templateUrl: './factura-create.component.html',
    styleUrls: ['./factura-create.component.css'],
    providers: [DatePipe]
})
export class FacturaCreateComponent implements OnInit {

    /**
    * Constructor for the component
    * @param dp DatePipe to format the date.
    * @param facturaService The factura's services provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private dp: DatePipe,
        private facturaService: FacturaService,
        private toastrService: ToastrService
    ) { }

    /**
    * The new factura
    */
    factura: Factura;

    /**
    * The output which tells the parent component
    * that the user no longer wants to create an calificacion
    */
    @Output() cancel = new EventEmitter();

    /**
    * The output which tells the parent component
    * that the user created a new calificacion
    */
    @Output() create = new EventEmitter();

    /**
    * Creates a factura
    */
    createFactura(): Factura {
        let dateB: Date = new Date(this.factura.fechaCompra.year, this.factura.fechaCompra.month - 1, this.factura.fechaCompra.day);
        this.factura.fechaCompra = this.dp.transform(dateB, 'yyyy-MM-dd');

        this.facturaService.createFactura(this.factura)
            .subscribe((factura) => {
                this.factura = factura;
                this.create.emit();
                this.toastrService.success("The factura was created", "factura creation");
            });
        return this.factura;
    }

    /**
    * Emits the signal to tell the parent component that the
    * user no longer wants to create an user
    */
    cancelCreation(): void {
        this.cancel.emit();
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.factura = new Factura();
    }

}