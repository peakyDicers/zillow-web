# some_file.py
# import sys
# import os

# insert at 1, 0 is the script path (or '' in REPL)
# sys.path.insert(1, './Mask-RCNN - Intact Insurance/program/cat3damage/')
# sys.path.insert(1, './Mask-RCNN - Intact Insurance/')

import json
# os.chdir('./Mask-RCNN - Intact Insurance/program/cat3damage/')
from return_data import *

class DummyFile(object):
    def write(self, x): pass

save_stdout = sys.stdout
sys.stdout = DummyFile()
# print("Running ret_me")
dictr = ret_me()
# print(dictr)
sys.stdout = save_stdout
# print(dictr)
# print("Something should have printed by now...")

print(json.dumps(dictr))





