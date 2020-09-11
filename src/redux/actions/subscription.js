// import { FETCH } from "hey-mocks";

// export const subscribeToPage = (pageID) => (dispatch, getState) => {
//   return new Promise(resolve => {
//     FETCH(`POST /v1/givers/pages/${pageID}/subscribe`, {
//       dispatch,
//       token: getState().authentication.token,
//     }).then(r => {
//       console.log("----subscribe to Page result----", r);
//       if (r.success) {
//         try {
//           dispatch(CreatePageSuccess(r.result));
//           resolve();
//         } catch (error) {
//           dispatch(CreatePageFailure(error));
//           resolve();
//         }
//       } else {
//         dispatch(CreatePageFailure(r.error));
//         resolve();
//       }
//     });
//   });
// };
