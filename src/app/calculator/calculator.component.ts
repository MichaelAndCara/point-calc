import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food';
import { Point } from 'src/app/models/point';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  public faChevronUp = faChevronUp;
  public faChevronDown = faChevronDown;
  public title = 'WW Point Calc';
  public food: Food = new Food();
  public points: Point[] = [];
  public gramsToggle = true;
  private gramIncrement = 0;

  constructor() { }

  ngOnInit() {
  }

  toggleGrams(gramsToggle: boolean) {
    this.gramsToggle = gramsToggle;
    this.food.grams = undefined;
    this.food.servings = undefined;
    this.points = [];
  }

  calculate(food: Food) {
    this.points = [];
    this.gramIncrement = 0;
    this.lockGramIncrement();

    if (food.calories == null) {
      return;
    }

    if (food.fat == null) {
      food.fat = 0;
    }

    if (food.fiber == null) {
      food.fiber = 0;
    }

    if (this.gramsToggle) {
      let tempGrams = 1;

      while (this.points.length < 13) {
        const tempIncrement = (tempGrams - food.grams) * this.gramIncrement;
        const tempCalories = food.calories + (food.calories * tempIncrement);
        const tempFat = food.fat + (food.fat * tempIncrement);
        let tempFiber = food.fiber + (food.fiber * tempIncrement);

        if (tempFiber > 4) {
          tempFiber = 4;
        }

        const point: Point = {
          grams: tempGrams,
          points: ((tempCalories / 50) + (tempFat / 12) - (tempFiber / 5)),
          servings: 0
        };

        if (this.points.length === 0) {
          this.points.push(point);
        } else {
          const lastPoints = this.points[this.points.length - 1].points;
          const index = this.points.findIndex(x => x.grams === tempGrams - 1);

          if (Math.round(point.points) === Math.round(lastPoints)) {
            this.points[index] = point;
          } else {
            this.points.push(point);
          }
        }
        tempGrams = tempGrams + 1;
      }
    } else {
      let tempServings = food.grams;

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

        this.points.push({ servings: tempServings, points: ((tempCalories / 50) + (tempFat / 12) - (tempFiber / 5)), grams: 0 });

        tempServings = tempServings - .25;
      }
    }
  }

  keytab(id: string) {
    document.getElementById(id).focus();
  }

  reset() {
    this.points = [];
    this.food = new Food();
    this.gramIncrement = 0;
    document.getElementById('calories').focus();
  }

  private lockGramIncrement(): void {
    if (this.food.grams && !this.gramIncrement) {
      // lock the gram increment to multiply the calories, fat, and fiber by it
      this.gramIncrement = (100 / this.food.grams) * .01;
    }
  }
}
