import { Component } from '@angular/core';
import * as $ from "jquery";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertCtrl: AlertController) { }
  public verifBook(event) {
    let id: string;
    id = event.target.id;
    this.alertCtrl.create({
      header: 'Informations',
      subHeader: 'Confirmation reservation',
      message: "Voulez-vous reserver cette place de parking ?",
      inputs: [
        {
          name: 'book',
          type: 'text',
          placeholder: 'Reservation',
          value: id,
          disabled: true
        }],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Réserver',
          handler: () => {
            this.book(id)
          }
        }
      ]
    }).then((alert) => alert.present());
  }
  public book(id) {

    var data = JSON.stringify({ "id": id, "is_active": true, "is_booking": true })
    $.post('http://localhost:3000/updateSensor/' + id, data, function (data) {
      $(".result").html(data);
    });
  }
  ngAfterViewInit() {
    //console.log('test')
    setInterval(requestData, 1000);

    function requestData() {
      var is_active = []
      var is_booking = []

      $.getJSON('http://localhost:3000/getAllSensor', function (data) {
        for (var element in data) {
          if (data[element].is_active) {
            is_active.push(data[element].id)
          }
          if (data[element].is_booking) {
            is_booking.push(data[element].id)
          }
        }
      }).then(function () {
        $(".ion-col").each(function () {
          if (is_active.includes(this.getAttribute('value'))) {
            $(this).removeClass('not_available')
            $(this).addClass('available')
          } else {
            $(this).removeClass('available')
            $(this).addClass('not_available')
          }

          if (is_booking.includes(this.getAttribute('value'))) {
            $(this).removeClass('available')
            $(this).addClass('is_booking')
          } else {
            $(this).removeClass('is_booking')
            $(this).addClass('available')
          }
        });
      })
    }
  }
}