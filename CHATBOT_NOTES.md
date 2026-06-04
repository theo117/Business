# Chatbot Notes

The chatbot on this site is a hosted Noupe/Jotform embed, not custom AI code in the repo.

Simplest option for `www.teodordev.co.za`: paste this near the bottom of the page, just before `</body>`.

```html
<script>
(function(){
  var loaded = false;
  function loadChat(){
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = 'https://www.noupe.com/embed/019e92f1de137d4bb951d9c091263d33ae72.js';
    document.body.appendChild(s);
  }
  setTimeout(loadChat, 3000);
})();
</script>
```

This reuses the existing hosted chatbot. If a dedicated Teodor Dev chatbot is created later in Noupe/Jotform, only swap the embed URL/id.
