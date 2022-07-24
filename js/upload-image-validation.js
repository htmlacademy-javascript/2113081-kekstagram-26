const form = document.querySelector('#upload-select-image');
const hashtagsInput = document.querySelector('.text__hashtags');
const pristine = new Pristine(form);

const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

function testHashtags (hashtags) {
  if (!hashtags.length) {
    return true;
  }

  const hashtagArray = hashtags.toLowerCase().split(' ');

  if (hashtagArray.length > 5) {
    return false;
  }

  for (const hashtag of hashtagArray) {
    if (!regex.test(hashtag) || (hashtagArray.indexOf(hashtag) !== hashtagArray.lastIndexOf(hashtag))) {
      return false;
    }
  }

  return true;
}

pristine.addValidator(hashtagsInput, testHashtags, 'Invalid hashtag');

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
