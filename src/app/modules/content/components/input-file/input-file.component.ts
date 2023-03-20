import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss']
})
export class InputFileComponent implements OnInit{

  @Output() fileDataEvent = new EventEmitter<string>();
  file: any;
  // // Inject service 
  constructor() { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event: any) {
      this.file = event.target.files[0];
  }
  
 
  fileChanged(e:any) {
    this.file = e.target.files[0];
    this.uploadDocument();
  }


  public fileData: any;
  uploadDocument() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(typeof(fileReader.result));
      this.fileData = fileReader.result;
      this.fileDataEvent.emit(this.fileData);
    }
    fileReader.readAsText(this.file);
  }






  onFileSelected(event: any) {
    // console.log(this.fileData);
    let fileReader: FileReader = new FileReader();
    if(event.target.files.length > 0) 
     {
      console.log(event.target.files[0].name);
      console.log((event.target.files[0]));
     }
     fileReader.readAsText(event.target.files[0]);
  }


}