const deck = {
    async init(){
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new');
        this.deckId = res.data.deck_id;
    },
    async shuffle(){
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/shuffle/`);
        console.log(res)
    },
    async drawCard(){
        let res = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
        console.log(res)
    }
    
}

class Pokemon {
    constructor(id){
        this.id = id;
        this.types = [];
    }

    async getInfo(){
       let res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
       this.name = res.data.name
       console.log(this.name);
        for(let type of res.data.types){
        this.types.push(type.type.name)
        console.log(this.types)
       }
    }
}