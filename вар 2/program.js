function secondSide(h, alpha) {
    return h / Math.sin(alpha * Math.PI / 180);
}

function d(a, b, alpha) {
    return Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(alpha * Math.PI / 180));
}

function S(h, a) {
    return h * a;
}

function P(a, b) {
    return (a + b) * 2;
}

function alphad(d1, d2, S) {
    return Math.asin((2 * S)/(d1 * d2));
}

let state;

function selllect() {
    let posicion = document.getElementById("seee").selectedIndex;
    let inputFieldsDiv = document.getElementById("inputFields");
    if (posicion === 0) {
        state = 1; 
        inputFieldsDiv.innerHTML = `  
        <div class="calculator"> 
            <p>
            <label>b =
                <input type="number" id="input1" min=0 max=200>
            </label>
            </p>
            <p>
            <label>h =
                <input type="number" id="input2" min=0 max=200>
            </label>
            </p>
            <p>
            <label>alpha =
                <input type="number" id="input3" min=0 max=200>
            </label>
            </p>
            <div id="errorMessage" class="error-message"></div>
        </div>`;
        document.getElementById("pic").src = "bhalpha.png";
    } else if (posicion === 1) {
        state = 2;
        inputFieldsDiv.innerHTML = `
        <div class="calculator">
            <p>
                <label>a =
                    <input type="number" id="input1" min=0 max=200>
                </label>
            </p>
            <p>
                <label>b =
                    <input type="number" id="input2" min=0 max=200>
                </label>
            </p>
            <p>
                <label>alpha =
                    <input type="number" id="input3" min=0 max=200>
                </label>
            </p> 
            <div id="errorMessage" class="error-message"></div>
        </div>`;
        document.getElementById("pic").src = "abalpha.png";
    }
}

function calc() {
    let h = document.getElementById("input2");
    let a = document.getElementById("input1");
    let alpha = document.getElementById("input3");
    const errorMessage = document.getElementById('errorMessage');
    let result='';

    let t = [
        document.getElementById("task1"),
        document.getElementById("task2"),
        document.getElementById("task3"),
        document.getElementById("task4"),
    ]
    
    let em = "Неверно заполнены или не заполнены поля:";
    let errors = 0;


    if (state === 0) {
        if (!a.value || a.value<=0) {
            em += " b";
            input1.classList.add('error');
            errors += 1;
        } else {
            input1.classList.remove('error');
        }
    
        if (!h.value || h.value<=0) {
            em += errors > 0 ? ", h" : " h";
            input2.classList.add('error');
            errors += 1;
        } else {
            input2.classList.remove('error');
        }
    } else {
        if (!a.value || a.value<=0) {
            em += " a";
            input1.classList.add('error');
            errors += 1;
        } else {
            input1.classList.remove('error');
        }
    
        if (!h.value || h.value<=0) {
            em += errors > 0 ? ", b" : " b";
            input2.classList.add('error');
            errors += 1;
        } else {
            input2.classList.remove('error');
        }
    }

    if ((!alpha.value || alpha.value<=0) && (!t[0].checked || t.slice(1, 4).some(elem => elem.checked))) {
        em += errors > 0 ? ", alpha" : " alpha";
        input3.classList.add('error');
        errors += 1;
    } else {
        input3.classList.remove('error');
    }

    if (t.every(elem => !elem.checked)) {
        em = "Пожалуйста, выберите действие (не издевайтесь надо мной)!"
        errors += 1;
    }

    if (errors > 0) {
        errorMessage.textContent = em;
        return;
    }

    errorMessage.textContent = "";

    if (t[0].checked) {
        result += "<p>Площадь: " + S(Number(h.value), Number(a.value)) + "</p>";
    }
    
    if (t[1].checked) {
        result += "<p>Периметр: " + P(Number(a.value), secondSide(Number(h.value), Number(alpha.value))) + "</p>";
    }

    let d1 = -1, d2 = -1;

    if (t[2].checked) {
        result +=  "<p>Первая диагональ: " + d(Number(a.value), secondSide(Number(h.value), Number(alpha.value)), Number(alpha.value)) + "</p>" + '<p>Вторая диагональ: ' + d(Number(a.value), secondSide(Number(h.value), Number(alpha.value)), Number(180 - alpha.value)) + "</p>";
    }

    if (t[3].checked) {
        if (d1 < 0) {
            d1 = d(Number(a.value), secondSide(Number(h.value), Number(alpha.value)), Number(alpha.value));
            d2 = d(Number(a.value), secondSide(Number(h.value), Number(alpha.value)), Number(180 - alpha.value));
        }
        result += "<p>Угол между диагоналями: " + (alphad(d1, d2, S(Number(h.value), Number(a.value)))) * 180 / Math.PI + "</p>";
    }

    if(result!='') {
        let resultt = document.getElementById("resultt");
        resultt.hidden=false;
        resultt.innerHTML = result;
    }

}
selllect();
