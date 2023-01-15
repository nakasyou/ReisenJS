export default class Reisen{
  constructor(element,options={}){
    const safeOption={
      
    };
    Object.keys(safeOption).forEach(key=>{
      if(!Object.keys(options).includes(key)){
        options[key]=safeOption[key];
      }
    });
    Object.defineProperty(this,'_pointers', {
      value: new Pointers(),
      writable:false,
      enumerable:false,
    });
    Object.defineProperty(this,'_events',{value:{}});
    this.element=element;
    element.addEventListener("touchstart",e=>{
      const elemRect=element.getBoundingClientRect();
      Object.values(e.changedTouches).forEach(touch=>{
        const pointer=new Pointer(touch.identifier);
        pointer.x=touch.clientX-elemRect.x;
        pointer.y=touch.clientY-elemRect.y;
        pointer.id=touch.identifier;
        this._pointers.start(pointer);
      });
    });
    element.addEventListener("touchend",e=>{
      Object.values(e.changedTouches).forEach(touch=>{
        this._pointers.end(touch.identifier);
      });
    });
    element.addEventListener("touchcancel",e=>{
      this._pointers.cancel();
    });
    element.addEventListener("touchmove",e=>{
      const elemRect=element.getBoundingClientRect();
      Object.values(e.changedTouches).forEach(touch=>{
        const x=touch.clientX-elemRect.x;
        const y=touch.clientY-elemRect.y;
        this._pointers.move(touch.identifier,x,y);
      });
    });
    element.addEventListener("mousedown",e=>{
      this._pointers.mouse._down();
      const elemRect=element.getBoundingClientRect();
      const x=e.clientX-elemRect.x;
      const y=e.clientY-elemRect.y;
      this._pointers.mouse.x=x;
      this._pointers.mouse.y=y;
    });
    element.addEventListener("mouseup",e=>{
      this._pointers.mouse._up();
    });
    element.addEventListener("mousemove",e=>{
      const elemRect=element.getBoundingClientRect();
      const x=e.clientX-elemRect.x;
      const y=e.clientY-elemRect.y;
      this._pointers.mouse.x=x;
      this._pointers.mouse.y=y;
    });
  }
  get pointers(){
    return this._pointers.pointers;
  }
  get pointer(){
    return this._pointers.pointers.at(0);
  }
  addEvent(name,func){
    if(!this._events[name]){
      this._events[name]=[];
    }
    this._events[name].push(func);
  }
  clearEvent(name){
    this._events[name]=[];
  }
  callEvent(name,...arg){
    if(this._events[name]){
      this._events[name].forEach(fn=>{
        fn(...arg);
      });
    }
  }
}
