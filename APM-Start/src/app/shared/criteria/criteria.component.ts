import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {  
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  @Output() valueChange: EventEmitter<string> = new EventEmitter();
  private _listFilter: string = '';
  hitMessage: string;

  @ViewChild('filterElement')
  private _filterElementRef: ElementRef;


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this._filterElementRef) {
      this._filterElementRef.nativeElement.focus();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue){
      this.hitMessage = 'No matches found!';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
    console.log(changes);
  }

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(filterValue: string) {
    this._listFilter = filterValue;
    this.valueChange.emit(filterValue);
  } 


}
