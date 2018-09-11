//
// document.body.addEventListener('focusin',(e)=>{
//     if(e.target.tagName==='INPUT'){
//         e.target.element.classList.add('dirty');
//     }
// });
$('body').bind('focusin', function (e) {
    if (e.target.tagName === 'INPUT') {
        e.target.classList.add('dirty');
    }
});

$('.block-switcher').click(function (e) {
    if (e.target.id === 'CSSSwitcherBlock' || e.target.parentNode.id === 'CSSSwitcherBlock') {
        $('.question-block > div').text('CSS');
        $('#CSSSwitcherBlock').addClass('question-block-active');
    }
    else if (e.target.id === 'HTMLSwitcherBlock' || e.target.parentNode.id === 'HTMLSwitcherBlock') {
        $('.question-block > div').text('HTML');
        $('#HTMLSwitcherBlock').addClass('question-block-active');
    }
    else if (e.target.id === 'JSSwitcherBlock' || e.target.parentNode.id === 'JSSwitcherBlock') {
        $('.question-block > div').text('JS');
        $('#JSSwitcherBlock').addClass('question-block-active');
    }
});