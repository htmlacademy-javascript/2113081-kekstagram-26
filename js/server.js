async function getPhotos () {
  const response = await fetch('https://26.javascript.pages.academy/kekstagram/data');
  const json = await response.json();

  return json;
}

export { getPhotos };
