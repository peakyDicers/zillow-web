from PIL import Image, ImageDraw
import base64
import io

import json
import sys

def imgData(img) -> str:
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)

    data_uri = base64.b64encode(buffer.read()).decode('ascii')
    return '<img src="data:image/png;base64,{0}">'.format(data_uri)

class DummyFile(object):
    def write(self, x): pass

# save_stdout = sys.stdout
# sys.stdout = DummyFile()

from return_data import *

dictr = ret_me2(sys.argv[1])
print("Wut")

result = {
    "houses": dictr,
    "marked_image": imgData(Image.open("output.png")) if len(sys.argv) > 0 else None
}

# sys.stdout = save_stdout
print(json.dumps(result))
