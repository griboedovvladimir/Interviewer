
$('body').bind('focusin', function (e) {
    if (e.target.tagName === 'INPUT') {
        e.target.classList.add('dirty');
    }
});

$('.block-switcher').click(function (e) {
    function unActiveBlock(){
        for(let el of $('.block-switcher').children()){
            if(el.classList.contains('question-block-active')){
                el.classList.remove('question-block-active')
            }
        }
    }

    if (e.target.id === 'CSSSwitcherBlock' || e.target.parentNode.id === 'CSSSwitcherBlock') {
        unActiveBlock()
        $('.question-block > div').text('CSS');
        $('#CSSSwitcherBlock').addClass('question-block-active');
    }
    else if (e.target.id === 'HTMLSwitcherBlock' || e.target.parentNode.id === 'HTMLSwitcherBlock') {
        unActiveBlock()
        $('.question-block > div').text('HTML');
        $('#HTMLSwitcherBlock').addClass('question-block-active');
    }
    else if (e.target.id === 'JSSwitcherBlock' || e.target.parentNode.id === 'JSSwitcherBlock') {
        unActiveBlock()
        $('.question-block > div').text('JS');
        $('#JSSwitcherBlock').addClass('question-block-active');
    }
});