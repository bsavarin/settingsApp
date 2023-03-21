export function assets(type) {
  return (path) => type + '/' + path
}

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Format numbers with thousands separator
export function addSeparator(i,j) {
  k = i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, j)
  return k;
}

/*export function isHmTimerDefined() {
  return typeof timer !== 'undefined'
}*/