import { Component } from '@angular/core';
import * as $ from "jquery";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }

  ngAfterViewInit () {
    console.log('test')
      setInterval(requestData, 1000);

    function requestData() {
      var array = []
      $.getJSON('http://localhost:3000/getAllSensor', function (data) {
        for (var element in data) {
          if (data[element].is_active) {
            array.push(data[element].id)
          }
        }
      }).then(function () {
        $(".ion-col").each(function () {
          console.log($(this))
          if (array.includes(this.getAttribute('value'))) {
            $(this).addClass('available')
          } else {
            $(this).addClass('not_available')
          }
        });
      })
    }
  }
}