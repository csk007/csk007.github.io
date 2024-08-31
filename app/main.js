/*global ReadAlong */
window.addEventListener('load', function (e) {
    try {
        var args = {
            text_element: document.getElementById('passage-text'),
            audio_element: document.getElementById('passage-audio'),
			autopause_learn_mode_element: document.getElementById('autopause-learn-mode'),
			learn_mode_btn_element: document.getElementById('learn-mode-btn'),
			play_pause_btn_element: document.getElementById('play-pause-btn'),
            random_shlok_btn_element: document.getElementById('random-shlok-btn'),
            autofocus_current_word: document.getElementById('autofocus-current-word').checked,
			autopause_learn_mode: document.getElementById('autopause-learn-mode').checked
        };

        if (!args.audio_element.canPlayType) {
            // No error messaging is needed because error message appears in <audio> fallback
            throw new Error('HTML5 Audio not supported');
        }
        if (args.audio_element.networkState === args.audio_element.NETWORK_NO_SOURCE) {
            document.querySelector('.passage-audio-unavailable').hidden = false;
            throw new Error('Cannot play any of the available sources');
        }

        var supports_playback_rate = (function (audio) {
            if (typeof audio.playbackRate !== 'number' || isNaN(audio.playbackRate)) {
                return false;
            }

            // For Opera, since it doesn't currently support playbackRate and yet
            // has it defined as 1.0, we can detect Opera support by changing
            // the playbackRate and see if the change sticks.
            var original_playback_rate = audio.playbackRate;
            audio.playbackRate += 1.0;
            var is_playback_rate_changed = (original_playback_rate !== audio.playbackRate);
            audio.playbackRate = original_playback_rate;
            return is_playback_rate_changed;
        }(args.audio_element));

        if (supports_playback_rate) {
            var rate_range_element = document.getElementById('playback-rate');
            rate_range_element.disabled = false;
            rate_range_element.addEventListener('change', function (e) {
                args.audio_element.playbackRate = this.valueAsNumber;
            }, false);
        }
        else {
            document.querySelector('.playback-rate-unavailable').hidden = false;
        }

        ReadAlong.init(args);

        document.getElementById('autofocus-current-word').addEventListener('change', function (e) {
            ReadAlong.autofocus_current_word = this.checked;
        }, false);

		document.querySelector('.passage-audio').hidden = false;

        if (supports_playback_rate) {
            document.querySelector('.playback-rate').hidden = false;
        }
        document.querySelector('.autofocus-current-word').hidden = false;
		
			// Create the root video element
			var video = document.createElement('video');
			video.setAttribute('loop', '');
			// Add some styles if needed
			video.setAttribute('style', 'position: fixed;');

			// A helper to add sources to video
			function addSourceToVideo(element, type, dataURI) {
				var source = document.createElement('source');
				source.src = dataURI;
				source.type = 'video/' + type;
				element.appendChild(source);
			}

			// A helper to concat base64
			var base64 = function(mimeType, base64) {
				return 'data:' + mimeType + ';base64,' + base64;
			};

			// Add Fake sourced
			addSourceToVideo(video,'webm', base64('video/webm', 'GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA='));
			addSourceToVideo(video, 'mp4', base64('video/mp4', 'AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAAG21kYXQAAAGzABAHAAABthADAowdbb9/AAAC6W1vb3YAAABsbXZoZAAAAAB8JbCAfCWwgAAAA+gAAAAAAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAIVdHJhawAAAFx0a2hkAAAAD3wlsIB8JbCAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAIAAAACAAAAAABsW1kaWEAAAAgbWRoZAAAAAB8JbCAfCWwgAAAA+gAAAAAVcQAAAAAAC1oZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAVmlkZW9IYW5kbGVyAAAAAVxtaW5mAAAAFHZtaGQAAAABAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAAEcc3RibAAAALhzdHNkAAAAAAAAAAEAAACobXA0dgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAIAAgASAAAAEgAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj//wAAAFJlc2RzAAAAAANEAAEABDwgEQAAAAADDUAAAAAABS0AAAGwAQAAAbWJEwAAAQAAAAEgAMSNiB9FAEQBFGMAAAGyTGF2YzUyLjg3LjQGAQIAAAAYc3R0cwAAAAAAAAABAAAAAQAAAAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAEAAAABAAAAFHN0c3oAAAAAAAAAEwAAAAEAAAAUc3RjbwAAAAAAAAABAAAALAAAAGB1ZHRhAAAAWG1ldGEAAAAAAAAAIWhkbHIAAAAAAAAAAG1kaXJhcHBsAAAAAAAAAAAAAAAAK2lsc3QAAAAjqXRvbwAAABtkYXRhAAAAAQAAAABMYXZmNTIuNzguMw=='));

			// Append the video to where ever you need
			document.body.appendChild(video);

			// Start playing video after any user interaction.
			// NOTE: Running video.play() handler without a user action may be blocked by browser.
			var playFn = function() {
				video.play();
				document.body.removeEventListener('touchend', playFn);
			};
			document.body.addEventListener('touchend', playFn);
    }
    catch (err) {
        console.error(err);
    }
    document.body.classList.add('initialized');
    document.querySelector('.loading').hidden = true;
	
	

	
	
}, false);
