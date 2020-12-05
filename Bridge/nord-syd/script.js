var fordel, kontrakt, net, set, historik, edits
var redigerer = false,
    rundeNu = 1
var aendringer = Array(20).fill(0)


window.onload = function() {
    rundenr = document.getElementById('rundenr')
    fordel = document.getElementById('fordel')
    kontrakt = document.getElementById('kontakt')
    net = document.getElementById('net')
    set = document.getElementById('set')
    sumElm = document.getElementById('sum')
    historik = document.getElementById('historik')
    for (runde = 0; runde < 24; runde++) {
        historik.innerHTML += `<tr class="r${runde+1}"><td>${runde+1}</td><td></td><td></td><td></td><td></td><td><button class="input" onclick="edit(${runde})">Rediger</button></td></tr>`
    }

    set.onsubmit = function(e) {
        e.preventDefault()
        opdater()
        aendringer[rundenr.value - 1] = Number(net.value)

        runde = rundenr.value
        raekke = document.querySelector(`.r${runde}`)
        runde = rundenr.value
        raekke.children[1].innerHTML = fordel.value
        raekke.children[2].innerHTML = kontrakt.value
        raekke.children[3].innerHTML = net.value


        for (r = 0; r < 24; r++) {
            let sum = 0
            for (i = 0; i < aendringer.length; i++) {
                if (i >= r + 1) break
                aendring = aendringer[i]
                sum += aendring
            }
            rae = document.querySelector(`.r${r + 1}`)
            rae.children[4].innerHTML = sum
        }

        let sum = 0
        for (i = 0; i < aendringer.length; i++) {
            if (i >= 24) break
            aendring = aendringer[i]
            sum += aendring
        }
        sumElm.innerHTML = sum

        const spil = []
        for (let i = 0; i < 24; i++) {
            raekke = document.querySelector(`.r${i+1}`)
            spil.push({
                fordel: Number(raekke.children[1].innerHTML),
                kontrakt: Number(raekke.children[2].innerHTML),
                net: Number(raekke.children[3].innerHTML),
            })
        }
        setCookie('spilN', JSON.stringify(spil), 1)

        if (!redigerer) rundeNu++;
        redigerer = false
        fordel.value = ""
        kontrakt.value = ""

        rundenr.value = rundeNu
    }

    if (getCookie('spilN')) {
        const data = JSON.parse(getCookie('spilN'))
        let rn = 1

        data.forEach(function(row, i) {
            aendringer[i] = Number(row.net)

            raekke = document.querySelector(`.r${i+1}`)
            raekke.children[1].innerHTML = row.fordel ? row.fordel : ''
            raekke.children[2].innerHTML = row.kontrakt ? row.kontrakt : ''
            raekke.children[3].innerHTML = row.net ? row.net : ''
            if (row.net) rn++
        })
        for (r = 0; r < 24; r++) {
            let sum = 0
            for (i = 0; i < aendringer.length; i++) {
                if (i >= r + 1) break
                aendring = aendringer[i]
                sum += aendring
            }
            rae = document.querySelector(`.r${r + 1}`)
            rae.children[4].innerHTML = sum
        }

        let sum = 0
        for (i = 0; i < aendringer.length; i++) {
            if (i >= 24) break
            aendring = aendringer[i]
            sum += aendring
        }
        sumElm.innerHTML = 'Nord-Syd ' + sum
        rundeNu = rn
    }

    rundenr.value = rundeNu
    setInterval(opdater, 1000)
}

function edit(runde) {
    redigerer = true
    runde++
    raekke = document.querySelector(`.r${runde}`)
    rundenr.value = runde
    console.log(raekke)
    fordel.value = raekke.children[1].innerHTML
    kontrakt.value = raekke.children[2].innerHTML
    fordel.select()
}

function opdater() {
    net.value = Number(fordel.value) * 40 + Number(kontrakt.value)
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}