import { EventEmitter } from "events";
import actionTypes from '../actions/actionTypes';
import Dispatcher from '../appDispatcher';

const CHANGE_EVENT = "change";

let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

}

const store = new AuthorStore();

Dispatcher.register(action => {
  switch (action.actionType) {
    case actionTypes.LOAD_AUTHORS:
      // debugger;
      // console.log(action.authors);
      _authors = action.authors;
      store.emitChange();
      break;
    default:
    // nothing to do here
  }
})

export default store;