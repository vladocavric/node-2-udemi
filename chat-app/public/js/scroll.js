// Elements
const $manualscroll = document.getElementById('manualscroll')


//===================================================================================================================
$manualscroll.addEventListener(`click`, () => {
    $messages.scrollTop = $messages.scrollHeight
})
// window.addEventListener("load", () => {
//     if ($messages.scrollTop + $messages.offsetHeight === $messages.scrollHeight) {
//         $manualscroll.classList.toggle('d-none')
//     }
// })


$messages.addEventListener('scroll', () => {
    if ($messages.scrollTop + $messages.offsetHeight !== $messages.scrollHeight) {
        $manualscroll.classList.remove('d-none')
    } else {
        $manualscroll.classList.add('d-none')
    }
})

//===================================================================================================================


const autoscroll = () => {
    //new message element
    const $newMessage = $messages.lastElementChild
    // height of new message
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

    // visible height
    const visibleHeight = $messages.offsetHeight

    // height of messages container
    const containerHeight = $messages.scrollHeight

    // haw far hav i scrolled
    const scrollOffset = $messages.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }

}

