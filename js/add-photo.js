import { usersPhotos, fillPhoto } from './upload-photo.js';

function addPhoto (file, description, hashtags, scale, filter) {
  const newPhotoInfo = {
    scale,
    filter,
    description: `${description} ${hashtags}`,
    id: 0,
    url: URL.createObjectURL(file),
    likes: 0,
    comments: [],
  };

  fillPhoto(newPhotoInfo, scale, filter);
  usersPhotos.push(newPhotoInfo);
}

export { addPhoto };
