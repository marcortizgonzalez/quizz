window.onload = function() {
    abirirTrivial();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function abirirTrivial() {
    document.getElementById("resultado").style.display = 'none';
    numQuestion = 0;
    correctAnswers = 0;
    results = {};


    var ajax = objetoAjax();

    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            results = respuesta.results;
            console.log(results);
            question(results);
        }
    }
    ajax.send();
}

function question(preguntas) {
    let divPreguntas = document.getElementById('preguntas');
    document.getElementById("preguntas").style.display = 'block';
    for (let i = 0; i < preguntas.length; i++) {
        if (numQuestion == i) {
            if (preguntas[i].type == "boolean") {
                divPreguntas.innerHTML = `<b>` + preguntas[i].question + `</b>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta" onclick="corregir(false); return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcioncorrecta" onclick="corregir(true); return false;" value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>
                <button class="btn btn-dark btn-lg btn-block" id='siguiente'>SIGUIENTE PREGUNTA</button>`
            } else {
                divPreguntas.innerHTML = `<b>` + preguntas[i].question + `</b>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta1" onclick="corregir(false)"; return false;" value="` + preguntas[i].incorrect_answers[0] + `">` + preguntas[i].incorrect_answers[0] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta2" onclick="corregir(false); return false;" value="` + preguntas[i].incorrect_answers[1] + `">` + preguntas[i].incorrect_answers[1] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcionincorrecta3" onclick="corregir(false); return false;" value="` + preguntas[i].incorrect_answers[2] + `">` + preguntas[i].incorrect_answers[2] + `</button>
                <button class="btn btn-primary btn-lg btn-block" id="opcioncorrecta" onclick="corregir(true)"; return false;value="` + preguntas[i].correct_answer + `">` + preguntas[i].correct_answer + `</button>
                <button class="btn btn-dark btn-lg btn-block" id='siguiente'>SIGUIENTE PREGUNTA</button>`
            }
        }
        let siguiente = document.getElementById('siguiente');
        siguiente.onclick = function() {
            if (numQuestion == 10) {
                document.getElementById("resultado").style.display = 'block';
                divPreguntas.style.display = 'none';
                document.getElementById('respuestasCorrectas').innerText = "Aciertos: " + correctAnswers;
                document.getElementById('jugarDeNuevo').onclick = function() {
                    abirirTrivial();
                }
            } else {
                question(preguntas);
            }
        }
    }

}

function corregir(correct) {
    if (correct == true) {
        correctAnswers++
        document.getElementById("opcioncorrecta").className = "btn btn-success btn-lg btn-block";
        document.getElementById("opcioncorrecta").disabled = "disabled";
        if (document.getElementById("opcionincorrecta") != null) {
            document.getElementById("opcionincorrecta").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta").disabled = "disabled";
        } else {
            document.getElementById("opcionincorrecta1").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta2").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta3").className = "btn btn-danger btn-lg btn-block disabled";
            document.getElementById("opcionincorrecta1").disabled = "disabled";
            document.getElementById("opcionincorrecta2").disabled = "disabled";
            document.getElementById("opcionincorrecta3").disabled = "disabled";
        }
    } else {
        if (document.getElementById("opcionincorrecta") != null) {
            document.getElementById("opcionincorrecta").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcioncorrecta").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("opcioncorrecta").disabled = "disabled";
            document.getElementById("opcionincorrecta").disabled = "disabled";
        } else {
            document.getElementById("opcionincorrecta1").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcionincorrecta2").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcionincorrecta3").className = "btn btn-danger btn-lg btn-block";
            document.getElementById("opcionincorrecta1").disabled = "disabled";
            document.getElementById("opcionincorrecta2").disabled = "disabled";
            document.getElementById("opcionincorrecta3").disabled = "disabled";
            document.getElementById("opcioncorrecta").className = "btn btn-success btn-lg btn-block disabled";
            document.getElementById("opcioncorrecta").disabled = "disabled";
        }
    }
    numQuestion++;
}