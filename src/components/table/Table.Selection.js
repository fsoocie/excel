export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }
  select($cell) {
    this.clear()
    $cell.focus()
    this.current = $cell
    this.group.push($cell)
    $cell.addClass(TableSelection.className)
  }
  clear() {
    this.group.forEach($c => $c.removeClass(TableSelection.className))
    this.group = []
  }
  addSelect($cell) {
    this.group.push($cell)
    $cell.addClass(TableSelection.className)
  }
  selectGroup($cells) {
    this.clear()
    this.group = $cells
    this.group.forEach($cell => $cell.addClass(TableSelection.className))
  }
  applyStyles(styles) {
    this.group.forEach($cell => {
      $cell.css(styles)
    })
  }
  get selectedIds() {
    return this.group.map($el => $el.id())
  }
}
