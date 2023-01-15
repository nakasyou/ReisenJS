export default class Pointers extends Array{
  constructor(){
    super();
    this.mouse=new Mouse();
  }
  get pointers(){
    return this.concat(this.mouse);
  }
  start(pointer){
    if(!this.includes(pointer)){
      this.push(pointer);
    }else{
      throw new TypeError("already contains the element");
    }
  }
  end(id){
    let index=0;
    for(const touch of this){
      if(touch.id===id){
        this.splice(index,1);
        break;
      }
      index++;
    }
  }
  cancel(){
    this.splice(1);
  }
  move(id,x,y){
    const index=this.search(id);
    if(index!==-1){
      this[index].x=x;
      this[index].y=y;
    }
  }
  search(id){
    let index=0;
    for(const touch of this){
      if(touch.id===id){
        return index;
      }
      index++;
    }
    return -1;
  }
  
}
