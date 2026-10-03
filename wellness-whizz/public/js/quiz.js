/* Wellness quiz: submits to /api/quiz (our Worker) instead of Webflow forms + Make.com, then opens the result page. */
(function () {
  function randomId() {
    var bytes = new Uint8Array(12);
    if (window.crypto && window.crypto.getRandomValues) {
      window.crypto.getRandomValues(bytes);
    } else {
      for (var i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    }
    var out = '';
    for (var j = 0; j < bytes.length; j++) out += ('0' + bytes[j].toString(16)).slice(-2);
    return out;
  }

  function highlightRadios(groupName, labelSelector) {
    var radios = document.querySelectorAll('input[type="radio"][data-radio-group="' + groupName + '"]');
    Array.prototype.forEach.call(radios, function (radio) {
      radio.addEventListener('change', function (event) {
        var labels = document.querySelectorAll(labelSelector);
        Array.prototype.forEach.call(labels, function (label) { label.style.backgroundColor = ''; });
        var label = event.target.closest(labelSelector);
        if (label) label.style.backgroundColor = 'white';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    highlightRadios('myRadioGroup', 'label.radio-button-field.w-radio');
    highlightRadios('myRadioGroupAge', 'label.radio-button-field.age.w-radio');

    var form = document.getElementById('quiz-form');
    if (!form) return;
    var block = form.closest('.quiz-form-block') || form.parentNode;
    var done = block.querySelector('.w-form-done');
    var fail = block.querySelector('.w-form-fail');
    var failText = fail ? fail.querySelector('div') : null;
    var submitBtn = form.querySelector('input[type="submit"]');
    var submitLabel = submitBtn ? submitBtn.value : '';
    var hidden = form.querySelector('input[name="sessionID"]');
    if (hidden) hidden.value = randomId();

    function showWaiting() {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.value = submitBtn.getAttribute('data-wait') || 'Please wait...';
      }
      form.style.display = 'none';
      if (fail) fail.style.display = 'none';
      if (done) done.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showError(message) {
      if (done) done.style.display = 'none';
      form.style.display = '';
      if (fail) fail.style.display = 'block';
      if (failText && message) failText.textContent = message;
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.value = submitLabel;
      }
      if (hidden) hidden.value = randomId(); // a retry is a new session
    }

    // Used only when the first request did not come back (network drop, proxy timeout): the Worker keeps working.
    function pollStatus(id, attempt) {
      if (attempt > 60) return showError('This is taking longer than expected. Please try again.');
      setTimeout(function () {
        fetch('/api/session/' + encodeURIComponent(id), { headers: { accept: 'application/json' } })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (j && j.status === 'ready') window.location.href = j.url;
            else if (j && j.status === 'failed') showError();
            else pollStatus(id, attempt + 1);
          })
          .catch(function () { pollStatus(id, attempt + 1); });
      }, 3000);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (typeof form.checkValidity === 'function' && !form.checkValidity()) {
        if (typeof form.reportValidity === 'function') form.reportValidity();
        return;
      }
      var payload = {};
      new FormData(form).forEach(function (value, key) { payload[key] = value; });
      var sessionId = payload.sessionID;
      showWaiting();

      fetch('/api/quiz', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (r) {
          return r.json().then(function (j) { return { ok: r.ok, body: j }; });
        })
        .then(function (res) {
          if (res.ok && res.body && res.body.url) window.location.href = res.body.url;
          else showError(res.body && res.body.error);
        })
        .catch(function () { pollStatus(sessionId, 0); });
    });
  });
})();
