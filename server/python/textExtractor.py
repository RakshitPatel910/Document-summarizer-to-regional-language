from pdfminer.high_level import extract_text

# for page_layout in extract_pages('../sample.pdf') :
#     for element in page_layout :

text = extract_text('../sample.pdf')
print(text)