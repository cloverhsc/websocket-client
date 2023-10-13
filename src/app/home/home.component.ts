import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


const CLOUD_POD_VIEW_SOCKET = {
  NAMESPACE: 'cloudPodViewContent',
  ROOM: 'cloudPodView',
  CHANNEL: {
    DRAWER_CONFIG: 'drawerConfig_update_channel',
    TREE_VIEW: 'tree_view_update_channel',
    DISCOVERY: 'discovery_channel',
    MANUAL: 'manual_channel',
    DRAWER_CONFIG_PROCESS_STATUS: 'drawerConfig_status_channel', // For import Rack config
    EDIT_MODE_PEOPLE_COUNT: 'editMode_peopleCount_channel', // how many ppl in editor mode
  },
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  wsUrl = 'http://localhost:3000';


  private socket: Socket | undefined;

  constructor(private http: HttpClient) {}

  onButtonClick() {
    this.http.get('http://localhost:3000').subscribe((res) => console.log(res));
  }

  connectWS() {
    this.socket = io(this.wsUrl + '/' + CLOUD_POD_VIEW_SOCKET.NAMESPACE);
    this.socket.on('room2', (arg: string) => {
      console.log('room2', arg);
    });
  }
}
