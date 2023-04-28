window.pause = false;

function startPath(bs64audio) {
    document.getElementsByClassName("uch-psvg")[0].children[1].remove();
    document.getElementsByClassName("knowledge-finance-wholepage-chart__uch-hdot")[0].remove();
    document.getElementsByClassName("T4joj")[0].children[1].textContent = "Playing";
    document.getElementsByClassName("knowledge-finance-wholepage-chart__hover-card-value")[0].remove();
    
    const pathElement = document.getElementsByClassName("uch-psvg")[0].children[1];

    const audio = new Audio();
    audio.src = `data:audio/x-wav;base64,${bs64audio}`

    const startPath = "M 0 {y}";
    const midCoord = "L {x} {y}";
    const mid = (x,y) => {return midCoord.replace("{x}", x).replace("{y}",y);}
    const endPath = "L 2000 0 L 2000 1000 L -1000 1000";

    const maxX = 256;
    const maxY = 135;

    pathElement.setAttribute(
        "d", 
        `${startPath.replace("{y}", maxY)} ${mid(250, maxY)} ${endPath}`
    );

    audio.play();
    audio.addEventListener("playing", () => {
        console.log("starting")
        play(audio, pathElement);
    })
}

function play(audio, ele) {
    const startPath = "M 0 {y}";
    const midCoord = "L {x} {y}";
    const mid = (x,y) => {return midCoord.replace("{x}", x).replace("{y}",y);}
    const endPath = "L 2000 0 L 2000 1000 L -1000 1000";

    const maxX = 256;
    const maxY = 135;
    
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let audioSource = audioCtx.createMediaElementSource(audio);
    let analyser = audioCtx.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftsize = 128;
    const bufferLength = analyser.frequencyBinCount;
    console.log(bufferLength);

    const dataArray = new Uint8Array(bufferLength);

    const viewPointStart = 0;
    const viewPointEnd = 124;

    function animate() {
        const g = (d) => {return maxY - (d / 2.5);}
        let path = startPath.replace("{y}", g(dataArray[viewPointStart])) + " ";
        analyser.getByteFrequencyData(dataArray);

        const deltaX = maxX / (viewPointEnd - viewPointStart);

        //get the max value between the start and end points
        let max = 0;
        let min = 100000;
        for (let i = viewPointStart; i < viewPointEnd; i++) {
            if (dataArray[i] > max) max = dataArray[i];
            if (dataArray[i] < min) min = dataArray[i];
        }

        //126 - (n / max) * 54

        let f = (height) => {
            return (((height - min) / (max - min)) * (maxY - 10));
        }

        for (let i = viewPointStart + 1; i < viewPointEnd; i++) {
            let height = dataArray[i];
            path += `${mid(i * deltaX, maxY - f(height))} `
            //add in a middle point between this point and the next
            path += `${mid(i * deltaX + (deltaX / 2), avg(maxY - f(height), (maxY - f(dataArray[i + 1])) * 1.05))}`
            // for (let x = i * deltaX; x < (i + 1) * deltaX; x++) {
            //     let height2 = dataArray[i + 1];
            //     let y = (f(height2) - f(height)) * smoothstep((x - i * deltaX) / deltaX, 0, 1);
            //     path += `${mid(x, maxY - y)} `
            // }
        }

        const last = dataArray[viewPointEnd - 1];

        const content = `${(Math.floor(((0.40 * ((last - min) / (max - min))) * 100)) / 100) + .98}`.substring(0,4);

        document.getElementsByClassName("DFlfde")[1].textContent = content;
        document.getElementsByClassName("lWzCpb")[1].value = content;

        path += endPath;

        ele.setAttribute(
            "d", 
            path
        );

        //get current time in seconds
        const time = audio.currentTime;
        //get the current time in the song as a percentage
        const percent = time / audio.duration;

        const maxLineX = 280;
        const linex = maxLineX * percent;

        document.getElementsByClassName("knowledge-finance-wholepage-chart__highlight-line")[0].style.transform = `translate3d(${linex}px, 0px, 0px);`

        document.getElementsByClassName("knowledge-finance-wholepage-chart__hover-card-time")[0].textContent = `${Math.floor(time / 60)}:${Math.floor(time % 60)}`;
        document.getElementsByClassName("knowledge-finance-wholepage-chart__hover-card")[0].style.transform = "translate3d(0px, 140px, 0px);"
        
        if (window.pause) return;
        requestAnimationFrame(animate);
    }
    animate();
}

function smoothstep(x, edge0, edge1) {
    // Scale, bias and saturate x to 0..1 range
    x = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    // Evaluate polynomial
    return x * x * (3 - 2 * x);
}

function avg(...a) {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum / a.length;
}

function start(time=100) {
    //File picker
    const filePicker = document.createElement("input");
    filePicker.type = "file";
    //accept any audio file
    filePicker.accept = "audio/*";

    filePicker.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", (e) => {
            setTimeout(() => {
                startPath(e.target.result.split(",")[1]);
            }, time)
        })
        reader.readAsDataURL(file);
    });

    filePicker.click();
}

function load() {
    document.getElementsByClassName("T4joj")[0].children[1].textContent = "Load";

    document.getElementsByClassName("T4joj")[0].addEventListener("click", (event) => {
        start(1000);
        event.preventDefault();
        event.stopImmediatePropagation();
    })
}

load();

/**
 * javascript:(function(){ window.m_script = document.createElement("script"); window.m_script.setAttribute("src", "https://jaideng1.github.io/currency-conversion-boombox/main.js"); document.body.appendChild(window.m_script); window.m_script.addEventListener("load", () => { alert("Script has been loaded successfully."); window.m_script.setAttribute("src", "https://raw.githubusercontent.com/jaideng1/currency-conversion-boombox/main/main.js"); document.body.appendChild(window.m_script); window.m_script.addEventListener("error", (e) => { alert("There was an error loading the script."); console.warn(e); }) }); console.log("called"); })();
 */
