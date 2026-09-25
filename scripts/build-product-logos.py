"""Build fixed website lockups; preserve supplied icon pixels and brand colors.

Requires fonttools and brotli. The normal site build uses the committed SVGs.
"""
import base64
import json
import math
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root = Path(__file__).resolve().parents[1]
assets = root / 'site/dist/assets'
font = instantiateVariableFont(TTFont(assets / 'fonts/Manrope-Variable.woff2'), {'wght': 700}, inplace=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()

# Project-specific optical relationship, not a universal logo-design ratio.
icon_size = 44
gap = 10
cap_height = 20
cap_pen = BoundsPen(glyphs)
glyphs[cmap[ord('H')]].draw(cap_pen)
scale = cap_height / cap_pen.bounds[3]
baseline = 30
tracking = -0.35 / scale
metadata = {}

for brand, name, ink, icon in [
    ('livaya', 'Livaya', '#165962', 'livaya-icon-v2.png'),
    ('alago', 'Alago', '#0151c5', 'alago-icon.png'),
    ('sulivo', 'Sulivo', '#0151c5', 'sulivo-icon.png'),
]:
    cursor = 0
    letters = []
    bounds = []
    for letter in name:
        glyph = glyphs[cmap[ord(letter)]]
        pen = SVGPathPen(glyphs)
        glyph.draw(pen)
        box = BoundsPen(glyphs)
        glyph.draw(box)
        left, bottom, right, top = box.bounds
        bounds.append((left + cursor, bottom, right + cursor, top))
        letters.append(f'<path d="{pen.getCommands()}" transform="translate({cursor:.4f} 0)"/>')
        cursor += glyph.width + tracking
    left = min(box[0] for box in bounds)
    right = max(box[2] for box in bounds)
    text_x = icon_size + gap - left * scale
    width = math.ceil(icon_size + gap + (right - left) * scale)
    encoded = base64.b64encode((assets / icon).read_bytes()).decode('ascii')
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{icon_size}" viewBox="0 0 {width} {icon_size}" role="img" aria-labelledby="title">
<title id="title">{name}</title>
<metadata>Supplied icon, unchanged. Manrope 700 lettering outlines, SIL OFL 1.1. Fixed website lockup.</metadata>
<image width="{icon_size}" height="{icon_size}" href="data:image/png;base64,{encoded}"/>
<g fill="{ink}" transform="translate({text_x:.4f} {baseline}) scale({scale:.8f} {-scale:.8f})">{''.join(letters)}</g>
</svg>
'''
    (assets / f'{brand}-lockup.svg').write_text(svg)
    metadata[brand] = {'width': width, 'height': icon_size, 'icon': icon}
    print(f'{name}: {width} × {icon_size}; cap height {cap_height}; gap {gap}; lettering {ink}')

(root / 'site/brand-lockups.json').write_text(json.dumps(metadata, indent=2) + '\n')
