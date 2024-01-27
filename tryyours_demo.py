# -*- coding: utf-8 -*-
"""TryYours_demo.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1fP5Wia4ukTp6WC5FlSa7InW7cOLXCePy

# TryYours - High Resolution Virtual Try On site using HR-VITON.
---
Demo for Virtual Try On website

# 1.Setup
- First, in the **Runtime** menu -> **Change runtime type**, make sure to have ```Hardware Accelerator = GPU```
- Clone repo and install dependencies.
- **It will take few minutes to finish installation**
"""

# Commented out IPython magic to ensure Python compatibility.
# clone repository
!git clone https://github.com/lastdefiance20/TryYours-Virtual-Try-On

# install dependencies
!pip install tensorboardX av torchgeometry flask flask-ngrok iglovikov_helper_functions cloths_segmentation albumentations
!pip install scipy==1.8.0

# %cd TryYours-Virtual-Try-On
# install detectron2
!python -m pip install 'git+https://github.com/facebookresearch/detectron2.git'

"""# 2. Download Pre-trained Models"""

# Commented out IPython magic to ensure Python compatibility.
!pip install --upgrade --no-cache-dir gdown

# %cd HR-VITON-main
!gdown https://drive.google.com/u/0/uc?id=1T5_YDUhYSSKPC_nZMk2NeC-XXUFoYeNy&export=download
!gdown https://drive.google.com/u/0/uc?id=1XJTCdRBOPVgVTmqzhVGFAgMm2NLkw5uQ&export=download
# %cd ../

# %cd Graphonomy-master
!gdown https://drive.google.com/u/0/uc?id=1eUe18HoH05p0yFUd_sN6GXdTj82aW0m9&export=download
# %cd ../

"""# 3. Upload Cloth Images
Either use sample images or upload other cloth images
"""

import os
import shutil
from google.colab import files

# Uncomment the following block if you would like to upload your own cloth images.
'''
input_dir = 'static'
uploaded = files.upload()
for filename in uploaded.keys():
  input_path = os.path.join(input_dir, filename)
  shutil.move(filename, input_path)
os.remove(input_dir+'/cloth_web.jpg')
os.rename(input_path, input_dir+'/cloth_web.jpg')
'''

"""# 4. Upload Person Images
Either use sample images or upload your images
"""

# Uncomment the following block if you would like to upload your own images.
'''
input_dir = 'static'
uploaded = files.upload()
for filename in uploaded.keys():
  input_path = os.path.join(input_dir, filename)
  shutil.move(filename, input_path)
os.remove(input_dir+'/origin_web.jpg')
os.rename(input_path, input_dir+'/origin_web.jpg')
'''

"""# 5. Check Images
check image uploaded successfully
"""

import matplotlib.pyplot as plt
import cv2

original = cv2.cvtColor(cv2.imread("./static/origin_web.jpg"), cv2.COLOR_BGR2RGB)
cloth = cv2.cvtColor(cv2.imread("./static/cloth_web.jpg"), cv2.COLOR_BGR2RGB)
## Display Images
fig, axes = plt.subplots(nrows=1, ncols=2)
dpi = fig.get_dpi()
fig.set_size_inches(900/ dpi, 448 / dpi)
plt.subplots_adjust(left=0, right=1, bottom=0, top=1)
axes[0].axis('off')
axes[0].imshow(original)
axes[1].axis('off')
axes[1].imshow(cloth)
plt.show()

"""# 6. RUN CODE
* It will take less than 2 minute
* you can remove background using --background False



"""

!python main.py #--background False

"""# 7. View Results"""

from PIL import Image
from IPython.display import Image

image1 = Image(filename="./static/finalimg.png")
display(image1)

"""# We will add Website code later. Enjoy the code!"""