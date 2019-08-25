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

# Root directory of the project
ROOT_DIR = os.path.abspath("../../")
sys.path.insert(1, "../../")


# Import Mask RCNN
# sys.path.append(ROOT_DIR)  # To find local version of the library
from mrcnn import utils
from mrcnn import visualize

from mrcnn.model import log
from googlegeocoder import GoogleGeocoder
from program.cat3damage import cat3damage

config = cat3damage.Cat3damageConfig()
CAT3DAMAGE_DIR = os.path.join(ROOT_DIR, "datasets/cat3damage")
# Load dataset
# Get the dataset from the releases page
# https://github.com/matterport/Mask_RCNN/releases
dataset = cat3damage.Cat3damageDataset()
dataset.load_cat3damage(CAT3DAMAGE_DIR, "val")

# Must call before using the dataset
dataset.prepare()
# Load random image and mask.
# image_id = random.choice(dataset.image_ids)

def ret_me():
	# Compute Bounding box
	bbox = utils.extract_bboxes(mask)
	bbox_dict = utils.extract_bboxes_info(image, mask)
	return bbox_dict

def ret_no_masks():
    bbox = utils.extract_bboxes(mask)
    return len(bbox)

def ret_me2(wut: str):
	# Compute Bounding box
	
	image_id = 0
	if('22' in wut):
		image_id = 1
	elif('23' in wut):
		image_id = 2
	elif('24' in wut):
		image_id = 3
	elif('26' in wut):
		image_id = 4

	image = dataset.load_image(image_id)
	mask, class_ids = dataset.load_mask(image_id)

	bbox = utils.extract_bboxes(mask)
	bbox_dict = utils.extract_bboxes_info(wut, mask)
	visualize.display_instances(image, bbox, mask, class_ids, dataset.class_names)
	return  bbox_dict,
