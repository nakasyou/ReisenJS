export default class Pointer{
  constructor(id){
    if(id){
      this.id=id;
    }
    this.down=true;
    Object.defineProperty(this,'_x',{value:0,writable:true});
    Object.defineProperty(this,'_y',{value:0,writable:true
    });
    Object.defineProperty(this,'_delta',{
      value:{x:0,y:0}
    });
    Object.defineProperty(this,'_last',{
      value:{x:0,y:0,time:new Date().getTime()}
    });
  }
  _deltaCalc(){
    const time=new Date().getTime();
    const deltaTime=time-this._last.time;
    if(deltaTime===0){
      return;
    }
    this._delta.x=(this.x-this._last.x)/deltaTime;
    this._delta.y=(this.y-this._last.y)/deltaTime;
    this._last.x=this.x;
    this._last.y=this.y;
    this._last.time=time;
  }
  get delta(){
    this._deltaCalc();
    return this._delta;
  }
  setXY(x,y){
    if(x){
      this._x=x;
    }
    if(y){
      this._y=y;
    }
    this._deltaCalc();
  }
  set x(x){
    this.setXY(x);
  }
  get x(){
    return this._x;
  }
  set y(y){
    this.setXY(null,y);
  }
  get y(){
    return this._y;
  }
}
