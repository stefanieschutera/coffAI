import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-training',
  templateUrl: './model-training.component.html',
  styleUrls: ['./model-training.component.scss'],
})
export class ModelTrainingComponent implements OnInit {
  images: File[] = [];

  constructor() {}

  ngOnInit(): void {}
}
