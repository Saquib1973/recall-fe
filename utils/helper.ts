function getYoutubeURL(link: string): string {
  if (!link) return ''

  // youtu.be links
  if (link.includes('youtu.be')) {
    const videoId = link.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  // watch?v= links
  if (link.includes('watch?v=')) {
    const videoId = link.split('v=')[1].split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }

  // embed links
  if (link.includes('embed')) {
    return link
  }

  return link
}

function getTwitterURL(link: string): string {
  if (!link) return ''

  return link.replace('x.com', 'twitter.com')
}

function getPinterestURL(link: string): string {
  if (!link) return ''

  if (link.includes('pinterest.com/pin/')) {
    let pinId = link.split('https://in.pinterest.com/pin/')[1].split('/')[0]
    pinId = 'https://assets.pinterest.com/ext/embed.html?id=' + pinId
    return pinId
  }

  return link
}
function getInstagramURL(link: string): string {
  if (!link) return ''
  let id = link.split('/p/')[1].split('/')[0]
  return 'https://www.instagram.com/p/' + id
}
const LS = {
  getItem: function (key: string): string | null {
    return localStorage.getItem(key)
  },
  setItem: function (key: string, value: string): void {
    localStorage.setItem(key, value)
  },
  removeItem: function (key: string): void {
    localStorage.removeItem(key)
  },
}
function calculateColumns(width: number) {
  if (width < 640) return 1
  if (width < 768) return 2
  if (width < 1024) return 3
  if (width < 1280) return 4
  if (width < 1536) return 5
  return 6
}

export {calculateColumns, getYoutubeURL, getTwitterURL, getPinterestURL, getInstagramURL, LS }
