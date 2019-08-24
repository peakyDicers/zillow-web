from PIL import Image, ImageDraw
import base64
import io


def imgData(img) -> str:
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)

    data_uri = base64.b64encode(buffer.read()).decode('ascii')
    return '<img src="data:image/png;base64,{0}">'.format(data_uri)


im = Image.new('RGBA', (200, 100),  color='red')
print(imgData(im))
