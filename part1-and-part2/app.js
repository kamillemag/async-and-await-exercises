// PART I
let numberURL = 'http://numbersapi.com'

async function getFaveNum(){
    res = await axios.get(`${numberURL}/4`)
    console.log(res.data)
}

async function getMultipleNums(){
    let numResponses = await Promise.all([axios.get(`${numberURL}/1`), axios.get(`${numberURL}/2`), axios.get(`${numberURL}/3`), axios.get(`${numberURL}/4`)]);
    numResponses.forEach(res => {
        p = document.createElement('p');
        p.innerText = res.data;
        document.body.appendChild(p)
    })
    }

async function getFaveNumFacts(){
    let numResponses = await Promise.all([axios.get(`${numberURL}/4`), axios.get(`${numberURL}/4`), axios.get(`${numberURL}/4`), axios.get(`${numberURL}/4`)]);
    numResponses.forEach(res => {
        p = document.createElement('p');
        p.innerText = res.data;
        document.body.appendChild(p)
    })
    }

    // PART II 
    $(function() {
        let cardURL = 'https://deckofcardsapi.com/api/deck';
      
        // 1.
        async function part1() {
          let data = await $.getJSON(`${cardURL}/new/draw/`);
          let { suit, value } = data.cards[0];
          console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
        }
      
        // 2.
        async function part2() {
          let firstCardData = await $.getJSON(`${cardURL}/new/draw/`);
          let deckId = firstCardData.deck_id;
          let secondCardData = await $.getJSON(`${cardURL}/${deckId}/draw/`);
          [firstCardData, secondCardData].forEach(card => {
            let { suit, value } = card.cards[0];
            console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
          });
        }
      
        // 3.
        async function setup() {
          let $btn = $('button');
          let $cardArea = $('#card-area');
      
          let deckData = await $.getJSON(`${cardURL}/new/shuffle/`);
          $btn.show().on('click', async function() {
            let cardData = await $.getJSON(`${cardURL}/${deckData.deck_id}/draw/`);
            let cardSrc = cardData.cards[0].image;
            let angle = Math.random() * 90 - 45;
            let randomX = Math.random() * 40 - 20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
              $('<img>', {
                src: cardSrc,
                css: {
                  transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }
              })
            );
            if (cardData.remaining === 0) $btn.remove();
          });
        }
        setup();
      });