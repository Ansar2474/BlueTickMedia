/* Bluetick Media - form submission (shared by the home page and Contact page).
   Sends every submitted form to your Google Apps Script web app, which
   (1) adds a new row to your Google Sheet and (2) emails mr.genius2474@gmail.com.
   The visitor is taken straight to the Thank You page.

   ENDPOINT below is your Apps Script web app. If it is ever emptied, the forms fall back to
   opening the visitor's email app. */
(function () {
  'use strict';
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycbzKHtOSX-rozasQ9gBKGztYYZn5_9YJDRqaUniRL9JfXBTEGVFc2bv2xSBc5PYhRL8/exec';
  var THANKS = 'thank-you.html';

  window.btSubmit = function (data, mailto, fail) {
    var url = window.BT_FORM_ENDPOINT || ENDPOINT;

    /* Bots fill the hidden "website" field. Pretend it worked, send nothing. */
    if (data.website) { window.location.href = THANKS; return; }
    delete data.website;

    if (!url) {            /* endpoint not set yet: old behaviour so no lead is lost */
      window.location.href = mailto;
      setTimeout(function () { window.location.href = THANKS; }, 800);
      return;
    }

    data.page = window.location.href;
    var body = new URLSearchParams(data).toString();
    var queued = false;
    try {
      if (navigator.sendBeacon) {
        queued = navigator.sendBeacon(url, new Blob([body], { type: 'application/x-www-form-urlencoded' }));
      }
    } catch (e) { queued = false; }
    if (!queued) {
      try {
        fetch(url, { method: 'POST', mode: 'no-cors', keepalive: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body });
        queued = true;
      } catch (e) { queued = false; }
    }
    if (!queued) { fail('Something went wrong. Please call us on +92 311 7420474.'); return; }
    window.location.href = THANKS;   /* straight to the Thank You page */
  };
})();
