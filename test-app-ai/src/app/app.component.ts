import { DataSource } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppComponentService } from './app.component.service';

export interface PeriodicElement {
  title: string;
  url: number;
  created_at: number;
  author: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['title', 'url', 'created_at', 'author'];
  public dataSource = [];
  constructor(public dialog: MatDialog, public dataService: AppComponentService) { }
  ngOnInit() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 10000
    );
  }
  getData() {
    this.dataService.getNewPosts('story').subscribe(
      (response) => {
        console.log(JSON.stringify(response));
        this.dataSource = [...response.hits];
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  openDialog(data): void {
    const dialogRef = this.dialog.open(DataDialogComponent, {
      width: '50%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


export class ExampleDataSource extends DataSource<PeriodicElement> {
  data = new BehaviorSubject<PeriodicElement[]>([]);
  connect(): Observable<PeriodicElement[]> {
    return this.data;
  }

  disconnect() { }
}


@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal/data-modal.html',
  styleUrls: ['./data-modal/data-modal.css'],
})
export class DataDialogComponent {
  public data: any;
  constructor(
    public dialogRef: MatDialogRef<DataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public info: any) {
    this.data = info;
  }

  close(): void {
    this.dialogRef.close();
  }
}
