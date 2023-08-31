import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
@Component({
  selector: 'ngx-artist-visualization',
  templateUrl: './artist-visualization.component.html',
  styleUrls: ['./artist-visualization.component.scss']
})
export class ArtistVisualizationComponent implements OnInit {
  constructor(public api: ApiService) { }
  loading:boolean=false
 
  option:any= {
    "title": {
        "text": "人物关系图",
        "left": "3%",
        "top": "3%",
        "textStyle": {
            "color": "#000",
            "fontSize": "18"
        }
    },
    "tooltip": {},
    "series": [
        {
            "type": "graph",
            "top": "10%",
            "roam": true,
            "focusNodeAdjacency": true,
            "force": {
                "repulsion": 1000,
                "edgeLength": [
                    150,
                    100
                ]
            },
            "layout": "force",
            "label": {
                "normal": {
                    "show": true,
                    "position": "inside",
                    "textStyle": {
                        "fontSize": 14
                    }
                }
            },
            "data": [
            ],
            "links": [
              
            ]
        }
    ],
    "animationEasingUpdate": "quinticInOut",
    "animationDurationUpdate": 100
}
  _artists:any=false
  @Input() 
  set artists(value: any) {
    this.option={
      "title": {
          "text": "人物关系图",
          "left": "3%",
          "top": "3%",
          "textStyle": {
              "color": "#000",
              "fontSize": "18"
          }
      },
      "tooltip": {},
      "series": [
          {
              "type": "graph",
              "top": "10%",
              "roam": true,
              "focusNodeAdjacency": true,
              "force": {
                  "repulsion": 1000,
                  "edgeLength": [
                      150,
                      100
                  ]
              },
              "layout": "force",
              "label": {
                  "normal": {
                      "show": true,
                      "position": "inside",
                      "textStyle": {
                          "fontSize": 14
                      }
                  }
              },
              "data": [
              ],
              "links": [
                
              ]
          }
      ],
      "animationEasingUpdate": "quinticInOut",
      "animationDurationUpdate": 100
  }
     this._artists = value;
     this.getFirst(value)
     this.getContacts(value)
     // 在这里可以对数据进行进一步处理 
    } 
  

  
  ngOnInit(): void {
  }

  getFirst(item:any){
    if(item){
      // let data={
      //   name: item.name,
      //   symbol:"image://"+item.pic,
      //   draggable: true,                // 节点是否可拖拽，只在使用力引导布局的时候有用。
      //   symbolSize:60,         // 关系图节点标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
      //   mid:item.singer_mid
      // }
      let option = {...this.option}
      option.series[0].data.map((item:any)=>{
        item.symbolSize=60
      })
      item.Contacts.push({
        "pic_mid":item.singer_pmid,
        "singerId": item.singer_id,
        "singerMid": item.singer_mid,
        "singerName": item.name,
        "singerPic": item.pic,
        "symbolSize":80,
        "trace":'',
      })
      item.Contacts.map((items:any)=>{
        let links={
          "name": items.singerName,
          symbol:"image://"+items.singerPic,
          symbolSize:items.symbolSize||60,         // 关系图节点标记的大小，可以设置成诸如 10 这样单一的数字，也可以用数组分开表示宽和高，例如 [20, 10] 表示标记宽为20，高为10。
          mid:items.singerMid,
		  draggable: true,  
        }
        let index=this.option.series[0].data.findIndex((e:any)=>e.mid==items.singerMid)
        
        if(index!=-1){
          option.series[0].data.splice(index,1)
        }
        option.series[0].data.push(links)
      })
      this.option = option;
    }
    
  }
  getContacts(item:any){
    if(item){
      let option = {...this.option}
      option.series[0].links.map((item:any)=>{
        item.lineStyle={
          "normal": {
            "color": "#000",
            "width": 1,
        }
        }
      })
      item.Contacts.map((items:any)=>{
        let links={
          target:item.name,
          source:items.singerName,
          "lineStyle": {
            "normal": {
                "color": "red",
                "width": 5,
            }
        },
        }
      option.series[0].links.push(links)
      })
      this.option=option
    }
  // this.option.series[0].data.push(data)
  }
  GetArt(item:any){
      this.GetAnotherArt(item.data.mid)
  }

  GetAnotherArt(mid:any){
    this.api.getArtiest({singerMid:mid}).subscribe((res:any)=>{
			if(res.success){
        this.getFirst(res.result)
        this.getContacts(res.result)
			}
			this.loading=false
		})
  }
}
