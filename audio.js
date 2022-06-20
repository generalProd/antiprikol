function initAudioTag (el, data) {
    if (!data || data.length <= 0 || el.getAttribute('has-reloaded') !== null) return;
    
    data.split(" ").forEach(function(item) {
        el.setAttribute(item, '');
    });
    
    el.setAttribute('has-reloaded', '');
    el.load(); // for autoplay: phpbb bbcode can't set attribute
}

function setAudioPlayed (el) {
    el.setAttribute('has-played', true);
}

// FIX: Chrome fucking <audio> autoplay feature: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes

var AudioContext = window.AudioContext // Default
    || window.webkitAudioContext // Safari and old versions of Chrome
    || false; 

if (AudioContext) {
    var audioCtx = new AudioContext();
}

var __chromeAudioInit = false;

function checkAudioAutoplay () {
    if (__chromeAudioInit) return;
    
    __chromeAudioInit = true;
    document.querySelectorAll('audio').forEach (function(el) {
        if (!el.getAttribute('has-played') && el.getAttribute('autoplay') !== null) {
            el.play();
        }
    });
}

window.onload = function() {
    document.addEventListener('click', checkAudioAutoplay);
    document.addEventListener('keypress', checkAudioAutoplay);
    document.addEventListener('select', checkAudioAutoplay);
};

