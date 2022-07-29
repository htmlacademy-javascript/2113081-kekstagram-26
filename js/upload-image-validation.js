const form = document.querySelector('#upload-select-image');
const hashtagsInput = document.querySelector('.text__hashtags');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-with-error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'img-upload__field-error'
});

const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const MAX_AMOUNT_HASH_TAGS = 5;

function testHashtagsLength (hashtags) {
  const hashtagArray = hashtags.toLowerCase().split(' ');

  return hashtagArray.length <= MAX_AMOUNT_HASH_TAGS;
}

function testUniqueHashtags (hashtags) {
  const hashtagArray = hashtags.toLowerCase().split(' ');

  for (const hashtag of hashtagArray) {
    if ((hashtagArray.indexOf(hashtag) !== hashtagArray.lastIndexOf(hashtag))) {
      return false;
    }
  }

  return true;
}

function testValidHashtags (hashtags) {
  if (!hashtags.length) {
    return true;
  }

  const hashtagArray = hashtags.toLowerCase().split(' ');

  for (const hashtag of hashtagArray) {
    if (!regex.test(hashtag)) {
      return false;
    }
  }

  return true;
}

pristine.addValidator(hashtagsInput, testHashtagsLength, 'Слишком много хэштегов');
pristine.addValidator(hashtagsInput, testUniqueHashtags, 'Хэштег повторяется');
pristine.addValidator(hashtagsInput, testValidHashtags, 'Неправильный хэштег');

export { pristine };
