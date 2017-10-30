/*
 Creating an action creator for our action.
 SelectLibrary is an action creator
*/
export const selectLibrary = (libraryID) => {

  return {
    type: 'select_library',  // instruction to our reducer
    payload: libraryID  
  };
};
