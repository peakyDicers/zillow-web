import os
import sys
import itertools
import math
import logging
import json
import re
import random
from collections import OrderedDict
import numpy as np
import matplotlib
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib.lines as lines
from matplotlib.patches import Polygon
from PIL import Image, ImageDraw

# Root directory of the project
ROOT_DIR = os.path.abspath("../../")
sys.path.insert(1, "../../")


# Import Mask RCNN
# sys.path.append(ROOT_DIR)  # To find local version of the library
from mrcnn import utils

from mrcnn.model import log
from googlegeocoder import GoogleGeocoder
from program.cat3damage import cat3damage

config = cat3damage.Cat3damageConfig()
CAT3DAMAGE_DIR = os.path.join(ROOT_DIR, "datasets/cat3damage")
# Load dataset
# Get the dataset from the releases page
# https://github.com/matterport/Mask_RCNN/releases
dataset = cat3damage.Cat3damageDataset()
dataset.load_cat3damage(CAT3DAMAGE_DIR, "train")

# Must call before using the dataset
dataset.prepare()
# Load random image and mask.
# image_id = random.choice(dataset.image_ids)
image_id = 0
image = dataset.load_image(image_id)
mask, class_ids = dataset.load_mask(image_id)


def ret_me():
	# Compute Bounding box
	bbox = utils.extract_bboxes(mask)
	bbox_dict = utils.extract_bboxes_info(mask)
	return bbox_dict