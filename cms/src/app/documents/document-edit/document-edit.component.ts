import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.scss']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document?: Document; 
  editMode: boolean = false;
  id: string;

  constructor( private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params.id;
        if (!this.id){
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
    
        if(!this.originalDocument)
            return;
        this.editMode = true;
        this.document = this.originalDocument;
    }) 
  }

  onCancel(){

  }

  onSubmit(form: NgForm): void{
    const value = form.value;
    const newDocument = new Document(value.id, value.name, value.description, value.url, []);

  }

}
