
export function download(capturedFrame) {
  const a = document.createElement('a')
  a.download = `${Date.now().toString()}.png`
  a.href = capturedFrame
  document.body.appendChild(a)
  a.click()
  a.remove()
}