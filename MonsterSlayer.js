console.log("--Monster Slayer");
new Vue({
    el: "#app",
    data:{
        newgame: true,
        playerHealth: 100,
        monsterHealth: 100,
        list: []
    },
    watch:{
        playerHealth: function(){
            if(this.playerHealth <= 0){
                if(window.confirm('You lost! Play again?')){
                    this.startNewGame();
                }
            }
        },
        monsterHealth: function(){
            if(this.monsterHealth <= 0){                
                if(window.confirm('You won! Play again?')){
                    this.startNewGame();
                }
            }
        }
    },
    methods:{
        calculateDmg: function(min,max){
            return Math.max(Math.floor(Math.random() * max + 1), min);
        },
        playerAttack: function(){            
            let attack = this.calculateDmg(1,10);
            this.monsterHealth -= attack;            
            this.list.unshift({isPlayer: true, text: `Player hits monster for ${attack} points`});
            
            this.monsterAttack();            
        },
        playerSpecial: function(){
            let special = this.calculateDmg(10,20);
            this.monsterHealth -= special;            
            this.list.unshift({isPlayer: true, text: `Player hits monster hard for ${special} points`});
            
            this.monsterAttack();
        },
        playerHeal: function(){
            let heal = this.calculateDmg(5,12);
            this.playerHealth += heal;            
            this.list.unshift({isPlayer: true, text: `Player heals himself for ${heal} points`})
            
            this.monsterAttack();            
        },
        monsterAttack: function(){            
            let attack = this.calculateDmg(3,12);            
            this.playerHealth -= attack;             
            this.list.unshift({isPlayer: false, text: `Monster hits player for ${attack} points`});
        },
        startNewGame: function(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.newgame = false;
            this.list = [];
        }
    }
})