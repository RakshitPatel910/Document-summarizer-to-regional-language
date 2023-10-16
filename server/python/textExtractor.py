import sys
from pdfminer.high_level import extract_text

# for page_layout in extract_pages('../sample.pdf') :
#     for element in page_layout :

pdfPath = sys.stdin.read()

text = extract_text('./uploads/output.pdf')
# text = extract_text(pdfPath)
print(text)
