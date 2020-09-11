import { FETCH } from "hey-mocks";

export const post = ({ file, token, cb }) => {
  var formData = new FormData();
  formData.append("file", file);

  FETCH("POST /v1/file", {
    body: formData,
    token
  }).then(r => {
    if (r.success) {
      cb(r.result);
    }
  });
};

export const userPicture = ({ file, token, cb }) => {
  var formData = new FormData();
  formData.append("file", file);

  FETCH("POST /v1/pictures/users", {
    body: formData,
    token
  }).then(r => {
    if (r.success) {
      cb(r.result);
    }
  });
};

export const buildFileSelector = cb => {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.onchange = cb;
  // fileSelector.setAttribute("multiple", "multiple");
  return fileSelector;
};
