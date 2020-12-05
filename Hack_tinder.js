function hasBlacklistKeywords(bio) {
  const blacklist = [
    'ladyboy',
    'banci',
    'bencong',
    'lady boy',
    'not a lady',
    'not lady',
    'not a girl',
    'not girl',
    'trans',
    'shemale',
    'chubby',
    //' lb ',
  ];

  for (item of blacklist) {
    if (bio.toLowerCase().indexOf(item) !== -1) {
      console.log('skipping profile, matched blacklist keyword ' + item);
      return true;
    }
  }

  return false;
}

function hasValidProfile() {
  try {
    const bioContainer = document.querySelector('.profileCard .profileContent .profileCard__card .BreakWord');
    if (!bioContainer) return true;
    const bio = bioContainer.textContent;
    console.log(bio);
    return !hasBlacklistKeywords(bio);
  } catch (e) {
    return true; // possible bio vide 
  }
}

function checkTinder() {
  const base = "https://tinder.com/";
  return window.location.href.startsWith(base + "app/recs") || window.location.href.startsWith(base + "app/matches");
}

function isMatch() {
  return document.querySelector('a.active');
}

// prevent async execution
function pause(milliseconds) {
  const dt = new Date();
  while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function trickTinder() {
  const infoClassName = 'focus-button-style';
  const nbButtons = document.getElementsByClassName("button").length;
  const buttons = document.getElementsByClassName("button")

  const dislike = nbButtons === 5 ? buttons[1] : buttons[0];
  const like = nbButtons === 5 ? buttons[3] : buttons[2];

  // Open profile bio
  const info = document.getElementsByClassName(infoClassName)[0];
  if (info) {
    info.click();
  }
  pause(600);

  // Like or deslike depending on validation
  if (hasValidProfile()) {
    like.click();

    const thereIsMatch = isMatch();
    if (thereIsMatch) {
      console.log('------------- IT\'S A MATCH ! -------------');
      thereIsMatch.click();
    }
  } else {
    dislike.click();
  }

  if (document.getElementsByClassName('productButton__subscriptionButton').length > 0) {
    const hms = document.getElementsByClassName('Fz($ml)')[0].textContent;
    const a = hms.split(':');
    const seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2])

    return seconds * 1000;
  }
}

function checkOkCupid() {
  return window.location.href.startsWith("https://www.okcupid.com/doubletake");
}
function trickOkCupid() {
  document.getElementsByClassName('cardactions-action--like')[0].click();
}

function getRandomPeriod() {
  return Math.round(Math.random() * (2000 - 500)) + 500;
}

(function loopSasori() {
  let randomPeriod = getRandomPeriod();

  setTimeout(function () {
    randomPeriod = undefined;

    if (checkTinder()) {
      const delay = trickTinder();

      if (delay) {
        console.log('Too many likes for now, have to wait: ' + delay + ' ms');
        randomPeriod = delay;
      }
    } else if (checkOkCupid()) {
      trickOkCupid();
    }

    if (!randomPeriod) {
      loopSasori();
    } else {
      setTimeout(loopSasori, randomPeriod);
    }
  }, randomPeriod);
}());
