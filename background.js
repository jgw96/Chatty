chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create('build.html', {
        'outerBounds': {
            'width': 650,
            'height': 600
        }
    });
});