import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.scss']
})
export class RemoveModalComponent implements OnInit {

  @Input('modal-name') modal: any ='modal';
  @Input('content') content: any;
  @Input('item-name') itemToBeDeleted: String = "";

  @Output() eventoDoFilho = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  enviarEvento() {
    console.log('do filho');
    
    this.eventoDoFilho.emit('Este é o meu evento!');
  }


}
