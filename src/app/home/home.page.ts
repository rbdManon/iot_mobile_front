import { Component } from '@angular/core';
import * as $ from "jquery";
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertCtrl : AlertController) { }
  public verifBook(event){
    let id:string;
    id =event.target.id;
    this.alertCtrl.create({
      header: 'Informations',
      subHeader: 'Confirmation reservation',
      message: "Voulez-vous reserver cette place de parking ?",
      inputs: [
        {
          name: 'book',
          type: 'text',
          placeholder: 'Reservation',
          value:id,
          disabled:true
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
  public book(id){
       $.ajax({
        url:'http://localhost:3000/updateSensor/'+id,
        type:'PUT',
        contentType:'application/json',
        data:JSON.stringify({"_id": "5cbf54182c339b42c8b95cd0","id": "A","is_active": true, "__v": 0,"is_booking": true  })
      });
      

  }
  ngAfterViewInit () {
    //console.log('test')
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
          //console.log($(this))
          if (array.includes(this.getAttribute('value'))) {
            $(this).removeClass('not_available')
            $(this).addClass('available')
          } else {
            $(this).removeClass('available')
            $(this).addClass('not_available')
          }
        });
      })
    }
  }
}