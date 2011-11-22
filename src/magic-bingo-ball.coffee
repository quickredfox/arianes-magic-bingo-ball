###
	magic-bingo-ball
###
M= Math
values= numbers:[], mappings:{}, used:[]

shuffle=-> values.numbers = values.numbers.sort ()-> M.round( M.random() )-0.5

reset=-> 
    values  = numbers:[], mappings:{}, used:[]
    for letter, range of { B: [1..10], I: [11..20], N: [21..30], G: [31..40], O: [41..50] }
        range.forEach (number)->
            values.numbers.push number
            values.mappings[number] = letter
            values.mappings[letter] = range
        
getstate=->
    if values.used.length is 0 and values.numbers.length is 50 then return 'initialized'
    else if values.used.length > 0 and values.numbers.length > 0 then return 'playing'
    else if values.used.length is 50 and values.numbers.length is 0 then return 'endgame'
    else return 'unknown'
    
start=->
    if values.used.length is 0 and values.numbers.length is 0 then reset()
    else if values.numbers.length is 0 then return { num: 0 }
    return Round
    
lastpick = (new Date()).getTime()
pick=->
    if (now = (new Date()).getTime()) - lastpick > 3000 
        lastpick = now
        if values.numbers.length is 0 then return 0
        shuffle()
        choice = values.numbers.pop()
        values.used.push choice
        return choice
    else return -1

onShake = (a)->
    value = pick()
    if value is -1 then return
    if value is 0 
        alert "all numbers cycled, going to reset."
        reset()
        return onShake()
    $('#ball').html( "#{value}<span class='letter'>#{values.mappings[value]}</span>" )
    $('#used').append( "<div class='ball'>#{value}<span class='letter'>#{values.mappings[value]}</span></div>" )        
            
            
    
init=->
    reset()

    $.shake  callback: ()-> onShake()
    
    $('#shake-btn').bind 'click', (e)-> 
        e.preventDefault()
        onShake()
        
    $('#reset-btn').bind 'click', (e)-> 
        $('#ball').empty()
        $('#used').empty()
        e.preventDefault()
        reset()
        
$ ()-> init()
