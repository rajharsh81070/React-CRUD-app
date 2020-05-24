import dispatcher from '../appDispatcher';
import actionTypes from './actionTypes';
import * as authorApi from '../api/authorApi';


export function loadAuthors() {
  // debugger;
  return authorApi.getAuthors().then(authors => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors: authors
    });
  });
}
export function deleteAuthor(id) {
  return authorApi.deleteAuthor(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_AUTHORS,
      id: id
    });
  });
}

export function saveAuthor(author) {
  return authorApi.saveAuthor(author).then(savedAuthor => {
    dispatcher.dispatch({
      actionType: author.id ? actionTypes.UPDATE_AUTHOR : actionTypes.CREATE_AUTHOR,
      author: savedAuthor
    });
  });
}