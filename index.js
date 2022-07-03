const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;
const gravity= 0.7;

const background =  new Sprite ({
    position:{
        x: 0,
        y: 0
    },
    imageSrc: 'sunny.png'

})



c.fillRect(0, 0, canvas.width, canvas.height);

const player = new Fighter({
    position:{
    x: 0,
    y: 0
    },
    velocity: {
        x: 0,
        y: 10 
    },
    offset: {
        x: 0,
        y: 0,
    }
})



const enemy = new Fighter({
    position:{
    x: 400,
    y: 100
    },
    velocity: {
        x: 0,
        y: 10 
    },
    color: 'green',
    offset: {
        x: -200,
        y: 0,
    }
})

const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    ArrowRight: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },

    w: {
        pressed: false
    }

}

function rectangularCollision({
    rectangel1,
    rectangel2
}) {
    return (
        rectangel1.attackBox.position.x + rectangel1.attackBox.width >= rectangel2.position.x && rectangel1.attackBox.position.x <= rectangel2.position.x + rectangel2.width
         && rectangel1.attackBox.position.y + rectangel1.attackBox.height >= rectangel2.position.y && rectangel1.attackBox.position.y <= rectangel2.position.y + rectangel2.height
    )
}

function determineWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    document.getElementById('result').style.display = 'flex'
    if(player.health === enemy.health) {
        document.getElementById('result').innerHTML = 'Tie'
        
    } else if(player.health > enemy.health || enemy.health === 0) {
        document.getElementById('result').innerHTML = 'Player 1 won!'
    
    } else if(enemy.health > player.health || player.health === 0) {
        document.getElementById('result').innerHTML = 'Player 2 Won!'

    }
}

let timer = 60
let timerId
function decreaseTimer() {
    if(timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000) 
    timer--
    document.getElementById('timer').innerHTML = timer
    }
    if(timer === 0 || player.health <= 0 || enemy.health <= 0) {
        determineWinner({player, enemy})
}
}


decreaseTimer()

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    //player movement

    
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5

    }   else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5
    } 



    if(keys.w.pressed && player.lastKey === 'w') {
        player.velocity.y != -5
    }


//enemy movement

    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5

    }   else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5
    }

// Detect for collision

    if ( rectangularCollision({
        rectangel1: player,
        rectangel2: enemy
    })
         && player.isAttacking) {
            player.isAttacking = false
            enemy.health -= 20
            document.querySelector('#enemyHealth').style.width = enemy.health + '%'
        
    }

    if ( rectangularCollision({
        rectangel1: enemy,
        rectangel2: player
    })
         && enemy.isAttacking) {
            enemy.isAttacking = false
            player.health -= 20
            document.querySelector('#playerHealth').style.width = player.health + '%'
        console.log('cringe');
    }


        if(enemy.health <= 0 || player.health <= 0) {
            determineWinner({player,enemy, timerId})
        }
}

    
    

animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
        keys.d.pressed = true
        player.lastKey = 'd'
        break
        case 'a':
        keys.a.pressed = true
        player.lastKey = 'a'
        break
        case 'w':
            player.lastKey = 'w'

            keys.w.pressed = true

            if(player.lastKey === 'w' && player.velocity.y === 0) {
                player.velocity.y = -15
            } 




    
        break
            case ' ':
            player.attack()
            break


        case 'ArrowRight':
        keys.ArrowRight.pressed = true
        enemy.lastKey = 'ArrowRight'
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
        enemy.velocity.y = -15
        break

        case 'ArrowDown':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
        keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break
        case 'w':
        keys.w.pressed = false
        break

        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
    }
})
