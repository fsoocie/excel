import $ from '@core/Dom';

export const resizingHandler = function($root, event) {
  const RESIZABLE_CEIL_VALUE = 4
  const $resizable = $(event.target)
  const $parent = $resizable.closest('[data-type="resizable"]')
  const index = $parent.data.col
  const type = event.target.dataset.resize
  const cells = $root.findAll(`[data-col="${index}"]`)
  const coords = $parent.getCoords()
  let delta
  const sideProp = type === 'col' ? 'bottom' : 'right'
  $resizable.$el.style.opacity = '1'
  $resizable.css({
    opacity: '1',
    zIndex: '1000',
    [sideProp]: '-5000px'
  })
  document.onmousemove = e => {
    if (type === 'col') {
      delta = e.pageX - coords.right + RESIZABLE_CEIL_VALUE
      $resizable.css({right: -delta + 'px'})
    } else {
      delta = e.pageY - coords.bottom + RESIZABLE_CEIL_VALUE
      $resizable.css({bottom: -delta + 'px'})
    }
  }
  document.onmouseup = e => {
    document.onmousemove = null
    $resizable.css({
      opacity: '',
      zIndex: 'auto',
      [sideProp]: 0
    })
    if (type === 'col') {
      $resizable.css({right: 0})
      const value = delta + coords.width
      $parent.css({width: value + 'px'})
      cells.forEach(cell => {
        cell.style.width = value + 'px'
      })
    } else {
      $resizable.css({bottom: 0})
      const value = delta + coords.height
      $parent.css({height: value + 'px'})
    }
  }
}
