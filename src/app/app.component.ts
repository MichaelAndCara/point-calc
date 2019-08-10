import { Component } from '@angular/core';
import { Food } from './food';
import { Point } from './point';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title = 'WW Point Calc';
  public food: Food = new Food();
  public points: Point[] = [];

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
      let tempCalories = food.calories * tempServings;
      let tempFat = food.fat * tempServings;
      let tempFiber = food.fiber * tempServings;

      if (tempFiber > 0 && tempFiber < 1) {
        tempFiber = 1;
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
    document.getElementById("calories").focus();
  }
}
