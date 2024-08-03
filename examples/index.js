import GiiKER from '../index.js';

const button = document.querySelector('button');

const colours = {
    'U': 'lightgrey',
    "U'": 'gray',
    'D': 'yellow',
    "D'": 'darkgoldenrod',
    'F': 'blue',
    "F'": 'darkblue',
    'B': 'green',
    "B'": 'darkgreen',
    'R': 'orange',
    "R'": 'brown',
    'L': 'red',
    "L'": 'darkred',
}

button.addEventListener('click', async () => {
    button.classList.add('is-loading');
    button.disabled = true;

    const giiker = await GiiKER.connect();
    button.classList.remove('is-loading');
    button.textContent = 'Connected!';

    giiker.on('move', (move) => {
        console.log(move);
        const square = document.getElementById(`colour-${move.face}`)
        square.style.backgroundColor = colours[`${move.face}${move.amount < 0 ? "'" : ''}`];
        setTimeout(() => {
            square.style.backgroundColor = 'white'
        }, 500)
        const audio = document.getElementById(`audio-${move.face}${move.amount < 0 ? '-' : ''}`)
        audio.currentTime = 0
        audio.play()
    });

    // Expose giiker object for testing on console
    window.giiker = giiker;
});
