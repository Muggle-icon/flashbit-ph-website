"""Build repository-native SVG logos from an original F mark and licensed Manrope outlines."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen

root = Path(__file__).resolve().parents[1]
font = instantiateVariableFont(TTFont(root / 'site/dist/assets/fonts/Manrope-Variable.woff2'), {'wght': 750}, inplace=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
scale = 37 / font['head'].unitsPerEm
cursor = 0
letters = []
for letter in 'Flashbit':
    name = cmap[ord(letter)]
    pen = SVGPathPen(glyphs)
    glyphs[name].draw(pen)
    letters.append(f'<path d="{pen.getCommands()}" transform="translate({cursor:.3f} 0)"/>')
    cursor += glyphs[name].width - 10 / scale / 37
width = round(59 + cursor * scale + 1)
mark = '<path d="M5 42V14a8 8 0 0 1 8-8h17v10H17v8h16v10H17v8Z" fill="{ink}"/><rect x="33" y="6" width="10" height="10" rx="2" fill="{accent}"/>'
for filename, ink, accent in [('flashbit-logo.svg', '#124f58', '#36a2af'), ('flashbit-logo-reverse.svg', '#ffffff', '#85d4df')]:
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 48" role="img" aria-label="Flashbit">{mark.format(ink=ink,accent=accent)}<g transform="translate(57 37) scale({scale:.8f} {-scale:.8f})" fill="{ink}">{"".join(letters)}</g></svg>\n'
    (root / 'site/dist/assets' / filename).write_text(svg)
(root / 'site/dist/assets/flashbit-symbol.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">' + mark.format(ink='#124f58',accent='#36a2af') + '</svg>\n')
print(f'Flashbit logo SVG: {width} x 48; symbol: 48 x 48')
