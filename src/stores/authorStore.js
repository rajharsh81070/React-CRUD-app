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

  getAuthorById(id) {
    return _authors.find(author => author.id === id);
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
    case actionTypes.DELETE_AUTHORS:
      _authors = _authors.filter(author => action.id !== author.id)
      store.emitChange();
      break;
    case actionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      store.emitChange();
      break;
    case actionTypes.UPDATE_AUTHOR:
      _authors = _authors.map(author => author.id === action.author.id ? action.author : author);
      break;
    default:
    // nothing to do here
  }
})

export default store;