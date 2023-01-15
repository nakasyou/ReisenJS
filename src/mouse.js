import Pointer from './pointer.js';
export default class Mouse extends Pointer{
  constructor(){
    super("mouse");
    this.down=false;
  }
  _down(){
    this.down=true;
  }
  _up(){
    this.down=false;
  }
}
