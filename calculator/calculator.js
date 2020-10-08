const calc = {
    displayVal: '0',
    first: null,
    waiting: false,
    operator: null
};

function updateScreen() {
    const screen = document.getElementById("screen");
    screen.value = calc.displayVal;
}

updateScreen();

const keys = document.getElementById("keys");
keys.addEventListener('click', (event) => {
    const target = event.target;

    if(!target.matches('button')){
        return;
    }

    if(target.classList.contains('operator')) {
        console.log('operator', target.value);
        return;
    }

    if(target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        return;
    }

    if(target.classList.contains('clear')){
        console.log('clear', target.value);
        return;
    }

    console.log('digit', target.value);
});