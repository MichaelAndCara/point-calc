import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { Point } from 'src/app/models/point';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  public title = 'WW Point Calc';
  public food: Food = new Food();
  public points: Point[] = [];

  constructor() { }

  ngOnInit() {
    this.food.servings = 1;
  }

  calculate(food: Food) {
    this.points = [];

    if (food.calories == null) {
      return;
    }

    if (food.fat == null) {
      food.fat = 0;
    }

    if (food.fiber == null) {
      food.fiber = 0;
    }

    let tempServings = food.servings;

    while (tempServings > 0) {
      const tempCalories = food.calories * tempServings;
      const tempFat = food.fat * tempServings;
      let tempFiber = food.fiber * tempServings;

      if (tempFiber > 0 && tempFiber < 1) {
        tempFiber = 1;
      }

      if (tempFiber > 4) {
        tempFiber = 4;
      }

      this.points.push({ servings: tempServings, points: ((tempCalories / 50) + (tempFat / 12) - (tempFiber / 5)) });

      tempServings = tempServings - .25;
    }
  }

  keytab(id: string) {
    document.getElementById(id).focus();
  }

  reset() {
    this.points = [];
    this.food = new Food();
    this.food.servings = 1;
    document.getElementById('calories').focus();
  }
}
