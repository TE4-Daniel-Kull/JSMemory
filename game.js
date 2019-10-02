let cards = [
    {
        id: 1,
        animalId: 1,
        img: "1_pig.png",
        flipped: false,
        paired: false
    },
    {
        id: 2,
       animalId: 2,
        img: "2_squirrel.png",
        flipped: false,
        paired: false
    },
    {
        id: 3,
        animalId: 3,
        img: "3_rabbit.png",
        flipped: false,
        paired: false
    },
    {
        id: 4,
        animalId: 4,
        img: "4_frog.png",
        flipped: false,
        paired: false
    },
    {
        id: 5,
        animalId: 5,
        img: "5_fox.png",
        flipped: false,
        paired: false
    },
    {
        id: 6,
        animalId: 6,
        img: "6_bear.png",
        flipped: false,
        paired: false
    },
    {
        id: 7,
        animalId: 7,
        img: "7_monkey.png",
        flipped: false,
        paired: false
    },
    {
        id: 8,
        animalId: 8,
        img: "8_panda.png",
        flipped: false,
        paired: false
    },
    {
        id: 9,
        animalId: 9,
        img: "9_chick.png",
        flipped: false,
        paired: false
    },
    {
        id: 10,
        animalId: 10,
        img: "10_tiger.png",
        flipped: false,
        paired: false
    },
    {
        id: 11,
        animalId: 11,
        img: "11_penguin.png",
        flipped: false,
        paired: false
    },
    {
        id: 12,
        animalId: 12,
        img: "12_racoon.png",
        flipped: false,
        paired: false
    }   
]



function duplicate_cards() {
    let duplicates = JSON.parse(JSON.stringify(cards))
    for (i = 0; i < duplicates.length; i++) {
        duplicates[i].id = cards[i].id + cards.length
    }
    cards = cards.concat(duplicates)

}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function render_cards() {
    
    for (card_obj of cards) {
        let card = card_template.cloneNode(true)
        card.dataset.guid = card_obj.id

        document.querySelector('.card-wrapper').append(card)
        card.addEventListener("click", flip_card)
    }
}

function flipped_cards() {
    let list = []
    for (let i = 0; i < cards.length; i++ ) {
        if ( !cards[i].paired && cards[i].flipped) {
            list.push(cards[i])
        }
    }
    return list
}

function is_game_over() {
    for(let i = 0; i < cards.length; i++) {
        if(!cards[i].paired) {
            return false
        }
    }
    return true
}

function count_flipped() {
    return flipped_cards().length
}

function match(cards) {
    let match = true

    for(let i = 1; i < cards.length; i++) {
        match = cards[i].animalId == cards[0].animalId
        if(!match) {
            return match;
        }
    }
    return match
}

function flip_card(e) {
    let image_div = e.target.parentElement
    let card_id = image_div.dataset.guid

    if(image_div.classList.contains("card")) {
        let card_obj = cards.filter(card => card.id == card_id)[0]

        if (!card_obj.paired) {
            if (card_obj.flipped) {
                card_obj.flipped = false
                image_div.classList.remove("flipped")
                setTimeout(() => e.target.src = "img/back.png", 150)
            } else if (count_flipped() < max_flipped) {
                total_flips++
                card_obj.flipped = true
                image_div.classList.add("flipped")
                setTimeout(() => e.target.src = "img/" + card_obj.img, 150)
            }

            let flipped = flipped_cards()
            if(flipped.length >= max_flipped) {
                if(match(flipped)) {
                    matched_pairs++
                    flipped.forEach((flipped_card) => {
                        flipped_card.paired = true
                        document.querySelector(`[data-guid='${flipped_card.id}']`).classList.add("paired")
                    })
                    
                    if(is_game_over()) {
                        setTimeout(() => alert("Game Completed!"), 300)
                    }
                }
            }
        }
    }
    document.querySelector('.flip_counter').textContent = total_flips
    document.querySelector('.match_counter').textContent = matched_pairs
}

let matched_pairs = 0
let total_flips = 0

let amount_of_cards = 12
cards = cards.splice(0, amount_of_cards) // amount of cards
duplicate_cards()
let max_flipped = cards.length / amount_of_cards
cards = shuffle(cards)

const template = document.importNode(document.querySelector('template').content, true)
const card_template = template.querySelector(".card")
render_cards()






