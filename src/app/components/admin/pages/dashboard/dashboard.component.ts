import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Import Chart from the correct path
import { Client } from './../../../../core/models/Client';


Chart.register(...registerables)


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  clientCount!: number;
  freelancerCount!:number;
  contractCount!:number;
  postCount!:number;
  chart: any;

  // Configuration du graphique
  public conf: any = {
    data: {
      datasets: [{
        type: 'bar',
        label: 'Bar Dataset',
        data: [], // Initialisation des données vides
      }, {
        type: 'line',
        label: 'Line Dataset',
        data: [10, 10, 10, 10], // Données statiques
      }],
      labels: ['Clients', 'freelancers', 'Contarcts', 'Posts']
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  };

  ngOnInit(): void {
    // Initialiser le graphique à la première exécution
    this.chart = new Chart('mychart', this.conf);
  }

  // Méthode pour mettre à jour les données et redessiner le graphique
  updateChart(): void {
    this.chart.data.datasets[0].data = [this.clientCount,this.freelancerCount,this.contractCount,this.postCount]; // Mise à jour des données
    this.chart.update(); // Redessiner le graphique
  }

  // Méthode appelée par l'événement `dataclient`
  trackdata(clientdata: number): void {
    this.clientCount = clientdata;
    this.updateChart(); // Mettre à jour le graphique à chaque changement de données
  }

  trackdatafreelancer(clientdata: number): void {
    this.freelancerCount = clientdata;
    this.updateChart(); // Mettre à jour le graphique à chaque changement de données
  }
  trackdatacontract(clientdata: number): void {
    this.contractCount = clientdata;
    this.updateChart(); // Mettre à jour le graphique à chaque changement de données
  }
  trackdatapost(clientdata: number): void {
    this.postCount = clientdata;
    this.updateChart(); // Mettre à jour le graphique à chaque changement de données
  }
}
